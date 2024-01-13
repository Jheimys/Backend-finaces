import prismaClient from "../../prisma";

class ListaReceitaService {
    async execute(idConta: string){
        
        const depositos = await prismaClient.transacao.findMany({
            where:{
                conta_id: idConta,
                descricao: "Deposito"
            },
            select: {
                id:true,
                descricao:true,
                valor:true,
                data: true
            }
        })

        return depositos
    }
}

export { ListaReceitaService }