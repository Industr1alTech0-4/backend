import { Request, Response } from "express";
import { db } from "../database/db";
import { stories } from "../database/schema";
import { eq } from "drizzle-orm";
import { pomps } from "../database/schema";


class StoryController {
    // story.controller.ts
    async addRecord(req: Request, res: Response) {
        try {
            console.log("=== addRecord ===");
            console.log("Request body:", req.body);
            console.log("Request body keys:", Object.keys(req.body));
            
            // Поддержка обоих вариантов (большие и маленькие буквы)
            const pompId = req.body.PompId ; 
            const csvData = req.body.CsvData;
            const resultStatus =  req.body.ResultStatus;
            const timeToBreakdown = req.body.TimeToBreakdown;

            

            console.log("Extracted values:", { 
                pompId, 
                csvDataLength: csvData?.length, 
                resultStatus, 
                timeToBreakdown 
            });

            // Детальная валидация - ИСПРАВЛЕНО с явной типизацией
            const errors: string[] = []; // 👈 ЯВНО УКАЗЫВАЕМ ТИП
            if (!pompId) errors.push("pompId");
            if (!csvData) errors.push("csvData");
            if (!resultStatus) errors.push("resultStatus");
            if (!timeToBreakdown) errors.push("timeToBreakdown");
            
            if (errors.length > 0) {
                return res.status(400).json({ 
                    error: `Не все поля записи (Record) заполнены. Отсутствуют: ${errors.join(", ")}`,
                    received: { pompId, resultStatus, timeToBreakdown, csvDataLength: csvData?.length }
                });
            }

            // Проверка существования помпы
            const pompExists = await db.select().from(pomps).where(eq(pomps.pompId, Number(pompId)));
            if (pompExists.length === 0) {
                return res.status(404).json({ error: "Помпа с таким ID не существует" });
            }

            const newRecord = await db.insert(stories).values({
                pompId: Number(pompId),
                csvData: csvData,
                resultStatus: resultStatus,
                timeToBreakdown: timeToBreakdown
            }).returning();

            console.log("Record saved:", newRecord[0]);
            return res.status(201).json(newRecord[0]);
        }
        catch (err) {
            console.error("Ошибка в addRecord:", err);
            return res.status(500).json({ 
                error: "Ошибка при сохранении в базу",
                details: err instanceof Error ? err.message : String(err)
            });
        }
    }


    // Изменено: теперь GET запрос через params
    async getAllStoryByPompId(req: Request, res: Response) {
    try {
        // Явно типизируем параметры, чтобы избежать ошибок TS
        const { PompId } = req.params as { PompId: string };
        const parsedPompId = parseInt(PompId);

        if (isNaN(parsedPompId)) {
            return res.status(400).json({ error: "Некорректный PompId" });
        }

        const history = await db.select()
            .from(stories)
            .where(eq(stories.pompId, parsedPompId));

        return res.status(200).json(history);
    }
    catch (err) {
        console.error("Ошибка в StoryController (getAllStoryByUserId):", err);
        return res.status(500).json({ error: "Ошибка сервера при чтении истории" });
    }
}

    async getAllStories(req: Request, res: Response) {
    try {
        const allStories = await db.select().from(stories);
        return res.status(200).json(allStories);
    }
    catch (err) {
        console.error("Ошибка в StoryController (getAllStories):", err);
        return res.status(500).json({ error: "Ошибка сервера при получении всех записей" });
    }
}

}

export const storyController = new StoryController();

