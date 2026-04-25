import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

// import './src/database/schema'

export default defineConfig({
    out: './drizzle', 
    schema: './src/database/schema.ts', 
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
});

