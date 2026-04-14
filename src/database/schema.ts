import { pgTable, serial, text, integer, primaryKey, real } from 'drizzle-orm/pg-core';

// “аблица насосов (Pomps)
export const pomps = pgTable('pomps', {
    pompId: serial('pomp_id').primaryKey(),
    name: text('name').notNull(),
});

// “аблица историй (Story)
export const stories = pgTable('stories', {
    // pompId задаем вручную (обычно это ID текущего насоса)
    pompId: integer('pomp_id')
        .references(() => pomps.pompId)
        .notNull(),

    // StorageId инкрементируетс€ базой автоматически
    storageId: serial('storage_id').notNull(),

    // Matrix: массив чисел (float)
    matrix: real('matrix').array().notNull(),

    resultStatus: text('result_status').notNull(),
    timeToBreakdown: text('time_to_breakdown').notNull(),
}, (table) => {
    return {
        // —оставной ключ: (pompId, storageId)
        pk: primaryKey({ columns: [table.pompId, table.storageId] }),
    };
});