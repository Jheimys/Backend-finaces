import prismaClient from "../../prisma";

class ListaDespesasServise{
    async execute(idConta: string){
        
        const pagamentos = await prismaClient.transacao.findMany({
            where: {
                conta_id: idConta,
                descricao: "Pagamento"
            },

            select: {
                id:true,
                descricao:true,
                valor:true,
                data: true
            }

        })

        return pagamentos
    }

}

export {ListaDespesasServise}