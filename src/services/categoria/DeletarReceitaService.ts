import prismaClient from "../../prisma";

class DeletarReceitaService{
    async execute(idDeposito: string){
        
        const deposito = await prismaClient.transacao.findUnique({
            where: {
                id: idDeposito,
                descricao: "Deposito"
            },

            select: {
                id: true
            }  
        })

        if(!deposito) {
            throw new Error('Payment not found');
        }

        // Deleta o pagamento
        await prismaClient.transacao.delete({
            where: {
                id: idDeposito
            }
        });

        return { message: 'deposit deleted successfully' };

        return deposito
    }
}

export { DeletarReceitaService }