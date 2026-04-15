import { pgTable, serial, text, integer, primaryKey, jsonb } from 'drizzle-orm/pg-core';

export const pomps = pgTable('pomps', {
    pompId: serial('pomp_id').primaryKey(),
    name: text('name').notNull(),
});

// Таблица историй (Story)
export const stories = pgTable('stories', {
    pompId: integer('pomp_id')
        .references(() => pomps.pompId)
        .notNull(),

    storageId: serial('storage_id').notNull(),

    // Используем jsonb для хранения двумерного массива number[][4]
    matrix: jsonb('matrix').notNull(),

    resultStatus: text('result_status').notNull(),
    timeToBreakdown: text('time_to_breakdown').notNull(),
}, (table) => [

    primaryKey({ columns: [table.pompId, table.storageId] })
]);