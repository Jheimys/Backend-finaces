import { Request, Response } from "express";
import { DeletarReceitaService } from "../../services/categoria/DeletarReceitaService";

class DeleteReceitaController {
    async handle(req: Request, res: Response){

        const { idDeposito } = req.body

        const deletarReceitaService = new DeletarReceitaService()

        const deleteReceita = await deletarReceitaService.execute(idDeposito)

        return res.json(deleteReceita)
    }
}

export { DeleteReceitaController }