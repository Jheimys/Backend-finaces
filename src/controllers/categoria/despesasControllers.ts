import { Request, Response } from "express";
import { despesasService } from "../../services/categoria/despesasServices";


class despesasController {
    async handle(req: Request, res: Response){

        const { valor, idUsuario, idConta } = req.body
        
        const despesasServise = new despesasService

        const despesas = await despesasServise.execute({
            valor, 
            idUsuario,
            idConta
        })

        res.json(despesas)
    }
}

export {despesasController}