import express from 'express';  
import cors from 'cors'; 

const app = express(); 
const port = 3000; 

// app.use(cors({
//     origin: 'http://localhost:5173',
//     credentials: true
// }))
//пока что не нужен 

app.listen(port, () => {
    console.log('сервер запущен на:')
    console.log(`http://localhost:${port}/`)
}); 