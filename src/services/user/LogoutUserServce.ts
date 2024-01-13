import prismaClient from "../../prisma";
import { verify } from 'jsonwebtoken';
import { Request } from 'express';

class LogoutUserServise{
    async execute(req: Request){
        try {
             // Obtenha o token do cabeçalho da solicitação
             const token = req.headers.authorization?.replace('Bearer ', '');

            if (!token) {
                throw new Error('Token not provided');
            }
            
            // Adicione lógica adicional para verificar se o token está na lista negra
            const isTokenRevoked = await this.checkTokenRevocation(token);

            if (isTokenRevoked) {
                throw new Error('Token has already been revoked');
            }

            // Verifique se o token é válido
            const decodedToken = verify(token, process.env.JWT_SECRET);

            return { message: 'User logged out successfully' };

        } catch (error) {
            console.error(error);
            throw new Error('Logout failed');
        }

    }
    
    private async checkTokenRevocation(token: string): Promise<boolean> {
        // Lógica para verificar se o token está na lista negra (por exemplo, consultando um banco de dados)
        // Retorne true se estiver na lista negra, false caso contrário
        return false;
    }
    
}

export { LogoutUserServise }
