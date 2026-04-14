import { Request, Response } from "express";
import { db } from "../database/db";
import { pomps } from "../database/schema";
import { eq } from "drizzle-orm";

class PompsController {
    async createPomp(req: Request, res: Response) {
        try {
            const { Name } = req.body as { Name: string };

            if (!Name) {
                return res.status(400).json({ error: "Имя (Name) обязательно" });
            }

            // Добавляем в БД через Drizzle
            const result = await db.insert(pomps).values({ name: Name }).returning();

            return res.status(201).json(result[0]);
        }
        catch (err) {
            console.error(err);
            return res.status(500).json({ error: "Ошибка при создании записи" });
        }
    }

    // 2. "Логин" (поиск по имени)
    async loginPomp(req: Request, res: Response) {
        try {
            const { Name } = req.body as { Name: string };

            const result = await db.select().from(pomps).where(eq(pomps.name, Name));
            const foundPomp = result[0];

            if (foundPomp) {
                return res.json({ id: foundPomp.pompId });
            } else {
                return res.status(404).json({ error: "Насос с таким именем не найден" });
            }
        }
        catch (err) {
            console.error(err);
            return res.status(500).send("Ошибка сервера при авторизации");
        }
    }
}

export const pompsController = new PompsController();