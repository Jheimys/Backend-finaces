import { Request, Response } from "express";
import { TransferenciaService } from "../../services/transacao/TransferenciaService";

class TransferenciaController{
    async handle(req: Request, res: Response){

        const { idRemetente, emailDestinatario, descricao, valor } = req.body
        
        const transferenciaService = new TransferenciaService()

        const transferencia = await transferenciaService.execute({
            idRemetente,
            emailDestinatario, 
            descricao,
            valor
        })

        return res.json(transferencia)
    }
}

export {TransferenciaController}