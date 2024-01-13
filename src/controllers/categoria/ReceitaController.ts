import { Request, Response } from "express";
import { ReceitaService } from "../../services/categoria/ReceitaServices";

class ReceitaController {
    async handle(req: Request, res: Response){

        const { valor, idRemetente, idConta } = req.body
        
        const receitaServise = new ReceitaService()

        const receita = await receitaServise.execute({
            valor, 
            idRemetente,
            idConta
        })

        res.json(receita)
    }
}

export {ReceitaController}