import { Request, Response } from "express";
import { AuthUserServise } from "../../services/user/AuthUserServise";

class AuthUserController {
    async handle(req: Request, res: Response){
        const {email, password} = req.body

        const authUserServise = new AuthUserServise()

        const auth = await authUserServise.execute({
            email,
            password
        })

        return res.json(auth)
    }
}

export { AuthUserController }