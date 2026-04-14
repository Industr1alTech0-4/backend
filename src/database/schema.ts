import { pgTable, serial, text, integer, primaryKey, real } from 'drizzle-orm/pg-core';

export const pomps = pgTable('pomps', {
    pompId: serial('pomp_id').primaryKey(),
    name: text('name').notNull(),
});

// Таблица историй (Story)
export const stories = pgTable('stories', {
    // pompId задаем вручную 
    pompId: integer('pomp_id')
        .references(() => pomps.pompId)
        .notNull(),

    // StorageId инкрементируется базой автоматически
    storageId: serial('storage_id').notNull(),

    // Matrix: массив чисел (float)
    matrix: real('matrix').array().notNull(),

    resultStatus: text('result_status').notNull(),
    timeToBreakdown: text('time_to_breakdown').notNull(),
}, (table) => [
    primaryKey({ columns: [table.pompId, table.storageId] })
]);