import { Request, Response, request } from "express";
import { LogoutUserServise } from "../../services/user/LogoutUserServce";

class LogoutUserController {

    async handle(req: Request, res: Response) {

        const logoutUserServise = new LogoutUserServise()

        const logout = await logoutUserServise.execute(req)

        return res.json(logout)
    }
}

export { LogoutUserController }