import prismaClient from "../../prisma";
import { hash } from "bcryptjs"

interface UseRequest{
    name: string;
    email: string;
    password: string;
}

class CreateUserServise{
    async execute({name, email, password}: UseRequest){
        
        //Verificar se o email foi enviado
        if(!email){
            throw new Error("Email incorrect")
        }

        //Verificar se o email já está cadastrado
        const userAlreadyExists = await prismaClient.user.findFirst({
            where:{
                email: email
            }
        }) 

        if(userAlreadyExists){
            throw new Error("User already exits")
        }
        
        const passwordHash = await hash(password, 8)

        const user = await prismaClient.user.create({
            data:{
                name:name,
                email:email,
                password: passwordHash,
            },
            select:{
                id:true,
                name: true,
                email:true,
            }
        })

        return user
    }
}

export { CreateUserServise }