import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import pompRoutes from './routes/pomps.route';
import storyRoutes from './routes/story.route'; 

const app = express();
const port = 3000;

app.use(cors()); 
app.use(express.json());


app.use('/api/pomps', pompRoutes);
app.use('/api/story', storyRoutes);

app.listen(port, () => {
    console.log('🚀 Сервер запущен на:');
    console.log(`http://localhost:${port}/`);
});