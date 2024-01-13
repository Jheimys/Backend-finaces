import { Request, Response } from "express";
import { ListaReceitaService } from "../../services/categoria/ListaReceitaServise";

class ListaReceitaController {
    async handle(req: Request, res: Response){

        const { idConta } = req.body

        const listaReceitaServise = new ListaReceitaService()

        const listaReceita = await listaReceitaServise.execute(idConta)

        return res.json(listaReceita)
    }
}

export { ListaReceitaController }