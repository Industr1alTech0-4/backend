import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';
import 'dotenv/config';

// Создаем пул соединений с БД
// Он берет строку подключения из твоего файла .env
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

// Инициализируем объект db, который ты импортируешь в контроллеры
// Мы передаем сюда schema, чтобы работал автокомплит и типизация таблиц
export const db = drizzle(pool, { schema });