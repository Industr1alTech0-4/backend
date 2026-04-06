import { Request, Response } from "express";

class Users {
    //создание пользователя 
    async createUser(req: Request, res: Response) {
        try {
            const { Login, Password } = req.body as { Login: string, Password: string };

            //=========================
            //логика добавления юзера (которую реализуует Тигран) в бд через ORM
            //функция должна быть описана где-то в /database и имортироваться сюда 
            //=========================

            return res.status(200);
        }
        catch(err) {
            console.error(err); 
            return res.status(400); 
        }
    }

    //залогиниться 

     async loginUser (req: Request, res: Response){
        try{
            const { Login, Password} = req.body;


            //const UserId = await ....

            //.... - должна быть функция которая сверяет с бд 
            // если пользователь есть то возврщает его id, иначе null

            // if (isLogin){
            //     res.json({"id" : UserId});
            // }
            // else{
            //     res.json({error: "Ошибка ввода данных"});
            // }
        }
        catch (err){
            console.error(err);
            res.status(400).send("Ошибка ввода данных");
        }
    }
}