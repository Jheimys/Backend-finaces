import prismaClient from "../../prisma";

interface contaRequest{
    nome: string;
    saldo: number;
    user_id: string
}

class CreateContaService {
    async execute({nome, saldo, user_id}: contaRequest){
        if(nome == ''){
            throw new Error('Name invalid')
        }

        const contas = await prismaClient.contaBancaria.create({
            data:{
                nome: nome,
                saldo: saldo,
                user_id: user_id
            },
            select:{
                id:true, 
                nome: true,
                saldo: true
            }
        })

        return contas
    }
}

export {CreateContaService}