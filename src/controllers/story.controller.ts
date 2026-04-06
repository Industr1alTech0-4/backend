import { Request, Response } from "express";
import { Record } from '../types/record.type'

class Story {
    //создание пользователя 
    async addRecord(req: Request, res: Response) {
        try {
            const { UserId, Matrix, ResultStatus, TimeToBreakdown }
            = req.body as Record; 

        
            //=========================
            //логика добавления записи (которую реализует Тигран) в бд через ORM
            //функция должна быть описана где-то в /database и имортироваться сюда 
            // передаём  UserId, Matrix, ResultStatus, TimeToBreakdown и получаем новую запись в бд
            //=========================

            return res.status(200);
        }
        catch(err) {
            console.error(err); 
            return res.status(400); 
        }
    }

    //залогиниться 

     async getAllStoryByUserId (req: Request, res: Response){
        try{
            const {UserId} = req.body as { UserId: number};

            // ф-ия которая возвращает массив всех запписей (историю) данного пользователя
            //т.е. получает из бд { UserId, StorageId,  Matrix, ResultStatus, TimeToBreakdown }
        }
        catch (err){
            console.error(err);
            res.status(400).send("Ошибка ввода данных");
        }
    }
}