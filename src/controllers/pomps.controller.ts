import { Request, Response } from "express";
import { db } from "../database/db";
import { pomps } from "../database/schema";
import { eq } from "drizzle-orm";

class PompsController {
    // POST: Создание
    async createPomp(req: Request, res: Response) {
        try {
            const { Name } = req.body as { Name: string };
            if (!Name) return res.status(400).json({ error: "Имя (Name) обязательно" });

            const result = await db.insert(pomps).values({ name: Name }).returning();
            return res.status(201).json(result[0]);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: "Ошибка при создании записи" });
        }
    }

    // POST: "Логин" по имени
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
        } catch (err) {
            console.error(err);
            return res.status(500).send("Ошибка сервера при авторизации");
        }
    }

    // GET: Получить все насосы
    async getAllPomps(req: Request, res: Response) {
        try {
            const allPomps = await db.select().from(pomps);
            return res.json(allPomps);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: "Ошибка при получении списка" });
        }
    }

    // GET: Получить один насос по ID
    async getPompById(req: Request, res: Response) {
        try {
            const { id } = req.params as { id: string };

            const parsedId = parseInt(id);

            if (isNaN(parsedId)) {
                return res.status(400).json({ error: "Некорректный ID" });
            }

            const result = await db.select().from(pomps).where(eq(pomps.pompId, parsedId));

            if (result.length === 0) {
                return res.status(404).json({ error: "Насос не найден" });
            }

            return res.json(result[0]);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: "Ошибка при получении насоса" });
        }
    }
}

export const pompsController = new PompsController();