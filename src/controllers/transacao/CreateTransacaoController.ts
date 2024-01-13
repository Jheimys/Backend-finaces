import { Request, Response } from "express";
import { CreateTransacaoService } from "../../services/transacao/CreateTransacaoService";

class CreateTransacaoController{
    async handle(req: Request, res: Response){
        const { descricao, valor, conta_id } = req.body

        const createTransacaoService = new CreateTransacaoService()

        const transacao = await createTransacaoService.execute({
            descricao,
            valor,
            conta_id
        })

        return res.json(transacao)
    }
}

export {CreateTransacaoController}