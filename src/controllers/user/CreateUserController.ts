import { Request, Response } from "express";
import { CreateUserServise } from "../../services/user/CreateUserService";

class CreateUserController {
    async handle(req: Request, res: Response){
        const { name, email, password } = req.body

        const createUserServise = new CreateUserServise()
        
        const user = await createUserServise.execute({
            name,
            email,
            password
        })

        return res.json(user)
    }
}

export {CreateUserController}