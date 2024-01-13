import prismaClient from "../../prisma";

class DeletarDespesasServise{
    async execute(idPagamento: string){
      
        const pagamento = await prismaClient.transacao.findUnique({
            where: {
                id: idPagamento,
                descricao: "Pagamento"
            },

            select: {
                id: true
            }  
        })   
        
        if(!pagamento) {
            throw new Error('Payment not found');
        }

        // Deleta o pagamento
        await prismaClient.transacao.delete({
            where: {
                id: idPagamento
            }
        });

        return { message: 'Payment deleted successfully' };
        
    }
}

export { DeletarDespesasServise }