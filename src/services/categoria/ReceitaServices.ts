import prismaClient from "../../prisma";

interface categoriaRequest{
    valor: number;
    idRemetente: string;
    idConta:  string
}

class ReceitaService {
    async execute({ valor, idRemetente, idConta }: categoriaRequest){
         
        // Busca o usuário remetente no banco de dados usando o ID e inclui informações da conta
         const remetente = await prismaClient.user.findFirst({
            where: { 
                id: idRemetente,   
            },
        });

        const contaDestino = await prismaClient.contaBancaria.findFirst({
            where:{
                id: idConta,
            }
        })
       
        // Verifica se o contaDestino/remetente foi encontrado
        if (!contaDestino || !remetente) {
            throw new Error("Usuário remetente ou destinatário não encontrado.");
        }

        // Atualiza o saldo do usuário destinatário após creditar o valor do pagamento
        await prismaClient.contaBancaria.update({
            where: { id: contaDestino.id }, 
            data: { saldo: contaDestino.saldo + valor },
        });

         const deposito =  await prismaClient.transacao.create({
            data: {
                descricao: "Deposito",
                valor: valor,
                conta_id: contaDestino.id,
            },

            select:{
                id:true,
                descricao: true,
                valor:true,
                data: true
            }
        });

         
         const receita =  await prismaClient.categoria.create({
            data: {
                nome: "Recebimento de Receitas",   
            }
        });

        return {receita, deposito}
    }
}

export {ReceitaService}