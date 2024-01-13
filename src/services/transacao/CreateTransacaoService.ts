import prismaClient from "../../prisma";

interface TransacaoRequest{
    descricao: string;
    valor: number;
    conta_id: string;
}

class CreateTransacaoService{
    async execute({descricao, valor, conta_id}: TransacaoRequest){

        const transacao = await prismaClient.transacao.create({
            data:{
                descricao: descricao,
                valor: valor,
                conta_id: conta_id
            }
        })

        return transacao
    }
}

export {CreateTransacaoService}