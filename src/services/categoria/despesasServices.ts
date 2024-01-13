import prismaClient from "../../prisma";

interface categoriaRequest{
    valor: number;
    idUsuario: string;
    idConta:  string
}

class despesasService {
    async execute({ valor, idUsuario, idConta }: categoriaRequest){
         
        // Busca o usuário remetente no banco de dados usando o ID e inclui informações da conta
         const users = await prismaClient.user.findFirst({
            where: { 
                id: idUsuario,   
            },
        });

        const contaDoUsuario = await prismaClient.contaBancaria.findFirst({
            where:{
                id: idConta,
            }
        })
       
        // Verifica se o contaDoUsuario/remetente foi encontrado
        if (!contaDoUsuario || !users) {
            throw new Error("Usuário remetente ou destinatário não encontrado.");
        }

        
         // Verifica se o saldo do usuário  é suficiente para realizar pagamento
         if (contaDoUsuario.saldo < valor) {
            throw new Error("Saldo insuficiente para realizar a transferência.");
        }

        //------- ATENÇÃO  só o usuário logado que pode fazer pagamentos. --------
        console.log("Verifica id do usuario e da conta:", users.id, contaDoUsuario.user_id)
        if(users.id == contaDoUsuario.user_id){
            // Atualiza o saldo do usuário destinatário após creditar o valor do pagamento
            await prismaClient.contaBancaria.update({
                where: { id: contaDoUsuario.id }, 
                data: { saldo: contaDoUsuario.saldo - valor },
            });
         

        } else {
            throw new Error("Você só pode fazer pagamento usando sua própria conta.");
        }

         const pagamento =  await prismaClient.transacao.create({
            data: {
                descricao: "Pagamento",
                valor: valor,
                conta_id: contaDoUsuario.id,
            },

            select:{
                id:true,
                descricao: true,
                valor:true,
                data: true
            }
        });

         
         const despesas =  await prismaClient.categoria.create({
            data: {
                nome: "Pagamento de despesas",   
            }
        });

        return {despesas, pagamento}
    }
}

export {despesasService}