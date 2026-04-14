import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import pompRoutes from './routes/pomps.route';

const app = express();
const port = 3000;

app.use(express.json());

// Все роуты из файла pompRoutes теперь доступны по пути /api/pomps
app.use('/api/pomps', pompRoutes);

app.listen(port, () => {
    console.log('🚀 Сервер запущен на:');
    console.log(`http://localhost:${port}/`);
});