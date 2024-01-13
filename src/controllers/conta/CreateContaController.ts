import { Response, Request } from "express";
import { CreateContaService } from "../../services/conta/CreateContaService";

class CreateContaController {
    async handle(req: Request, res: Response){
        const { nome, saldo, user_id } = req.body

        const createContaService = new CreateContaService()

        const conta = await createContaService.execute({nome, saldo, user_id})

        return res.json(conta)
    }
}

export {CreateContaController}