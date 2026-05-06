import { Request, Response } from 'express';
import { modelFetch } from '../model/model';

// Импортируем тип из multer
import { Multer } from 'multer';

// Правильное расширение Request с типами из multer
interface RequestWithFile extends Request {
    file?: Express.Multer.File;
}

class ModelController {
    async modelFetch(req: RequestWithFile, res: Response) {
        try {
           
            if (!req.file) {
                return res.status(400).json({ 
                    error: 'Файл не загружен',
                    message: 'Убедитесь, что вы отправляете файл с ключом "file" в FormData'
                });
            }

            console.log('Файл получен:', {
                name: req.file.originalname,
                size: req.file.size,
                mimetype: req.file.mimetype
            });

            // Создаем File объект
            const file = new File(
                [new Uint8Array(req.file.buffer)], 
                req.file.originalname, 
                { type: req.file.mimetype }
            );

            const result = await modelFetch(file);
            
            return res.status(200).json(result);
        } catch (error) {
            console.error('Ошибка в контроллере modelFetch:', error);
            return res.status(500).json({ error: 'Внутренняя ошибка сервера' });
        }
    }
}

export const modController = new ModelController();