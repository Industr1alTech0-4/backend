import { pgTable, serial, text, integer, primaryKey, jsonb, index, unique, uniqueIndex} from 'drizzle-orm/pg-core';

export const pomps = pgTable('pomps', {
    pompId: serial('pomp_id').primaryKey(),
    name: text('name').notNull(),
});


export const stories = pgTable('stories', {
    storageId: serial('storage_id').primaryKey(),
    
    pompId: integer('pomp_id')
        .references(() => pomps.pompId)
        .notNull(),

    csvData: text('csv_data').notNull(),  // 👈 содержимое CSV файла
    
    resultStatus: text('result_status').notNull(),
    timeToBreakdown: text('time_to_breakdown').notNull(),
});