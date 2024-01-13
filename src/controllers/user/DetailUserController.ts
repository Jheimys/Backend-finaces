import { Request, Response } from "express";
import { DetailUserServise } from "../../services/user/DetailUserServise";

class DetailUserController{
    async handle(req: Request, res: Response){

        const user_id = req.user_id
        //console.log("ID DO USER:", user_id)

        const detailUserServise = new DetailUserServise()

        const user = await detailUserServise.execute(user_id)

        return res.json(user)
    }
}

export {DetailUserController}