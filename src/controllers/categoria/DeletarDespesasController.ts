import { Request, Response } from "express";
import { DeletarDespesasServise } from "../../services/categoria/deletarDespesasServise";

class DeletarDespesasController {
    async handle(req: Request,res: Response){

        const { idPagamento } = req.body

        const deletarDespesasServise = new DeletarDespesasServise()

        const deleteDespesas = await deletarDespesasServise.execute(idPagamento)

        return res.json(deleteDespesas)
    }
}

export { DeletarDespesasController }