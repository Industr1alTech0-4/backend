import express from 'express';
import cors from 'cors';

import pompRoutes from './routes/pomps.route';
import storyRoutes from './routes/story.route'; 
import modelRoute from './routes/model.route';


const app = express();
const port = 3000;

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(express.json());


app.use('/api/pomps', pompRoutes);
app.use('/api/story', storyRoutes);
app.use ('/api', modelRoute); 

app.listen(port, () => {
    console.log('🚀 Сервер запущен на:');
    console.log(`http://localhost:${port}`);
});