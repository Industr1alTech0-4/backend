import { Request, Response } from "express";
import { db } from "../database/db";
import { stories } from "../database/schema";
import { eq } from "drizzle-orm";
import { Record } from '../types/record.type';

class StoryController {
    async addRecord(req: Request, res: Response) {
        try {
            const { PompId, StorageId, Matrix, ResultStatus, TimeToBreakdown } = req.body as Record;

            if (!PompId || !Matrix || !ResultStatus || !TimeToBreakdown) {
                return res.status(400).json({ error: "Не все поля записи (Record) заполнены" });
            }

            const newRecord = await db.insert(stories).values({
                pompId: PompId,
                storageId: StorageId,
                matrix: Matrix,
                resultStatus: ResultStatus,
                timeToBreakdown: TimeToBreakdown
            }).returning();

            return res.status(201).json(newRecord[0]);
        }
        catch (err) {
            console.error("Ошибка в StoryController (addRecord):", err);
            return res.status(500).json({ error: "Ошибка при сохранении в базу" });
        }
    }

    // Изменено: теперь GET запрос через params
    async getAllStoryByUserId(req: Request, res: Response) {
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