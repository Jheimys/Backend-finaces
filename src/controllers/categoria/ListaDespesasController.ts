import { Request, Response } from "express";
import { ListaDespesasServise } from "../../services/categoria/ListadespesasServices";


class ListaDespesasControler{
    async handle(req: Request, res: Response){

        const { idConta } = req.body

        const listaDespesaServise = new ListaDespesasServise()

        const listaDespesa = await listaDespesaServise.execute(idConta)

        return res.json(listaDespesa)
    }
}

export { ListaDespesasControler }