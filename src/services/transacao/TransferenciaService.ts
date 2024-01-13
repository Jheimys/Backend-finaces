import prismaClient from "../../prisma";

interface transferenciaRequest{
    idRemetente: string;
    emailDestinatario: string;
    descricao: string
    valor: number;
}

class TransferenciaService {
    async execute({ idRemetente, emailDestinatario, descricao, valor }: transferenciaRequest){

        // Busca o usuário remetente no banco de dados usando o ID e inclui informações da conta
        const remetente = await prismaClient.contaBancaria.findFirst({
            where: { 
                user_id: idRemetente,   
            },
        });

        // Busca o usuário destinatário no banco de dados usando o email e inclui informações da conta
        const destinatario = await prismaClient.user.findFirst({
            where:{
                email: emailDestinatario,
            },

            include: {
                contasBancarias: true,
            }
        })

        // Verifica se os usuários remetente e destinatário foram encontrados
        if (!remetente || !destinatario) {
            throw new Error("Usuário remetente ou destinatário não encontrado.");
        }

         // Verifica se o saldo do usuário remetente é suficiente para realizar a transferência
         if (remetente.saldo < valor) {
            throw new Error("Saldo insuficiente para realizar a transferência.");
        }

        // Atualiza o saldo do usuário remetente após debitar o valor da transferência
        await prismaClient.contaBancaria.update({
            where: { id: remetente.id },
            data: { saldo: remetente.saldo - valor },
        });
        
        // Atualiza o saldo do usuário destinatário após creditar o valor da transferência
        await prismaClient.contaBancaria.update({
            where: { id: destinatario.contasBancarias[0].id }, // Assumindo que um usuário pode ter várias contas e pegamos a primeira
            data: { saldo: destinatario.contasBancarias[0].saldo + valor },
        });

         // Atualiza o saldo do usuário destinatário após creditar o valor da transferência
        // await prismaClient.contaBancaria.update({
        //     where: { id: destinatario.contasBancarias[0].id },
        //     data: { saldo: destinatario.contasBancarias[0].saldo + valor },
        // });

        // Registra uma transação para o usuário remetente
        const transferencia =  await prismaClient.transacao.create({
            data: {
                descricao: "Transferência",
                valor: valor,
                conta_id: remetente.id,
            },

            select:{
                id:true,
                descricao: true,
                valor:true,
                data: true
            }
        });

        // Registra uma transação para o usuário destinatário
        const deposito =  await prismaClient.transacao.create({
            data: {
                descricao: "Recebimento de Transferência",
                valor: valor,
                conta_id: destinatario.contasBancarias[0].id,
            },
            select:{
                id:true,
                descricao: true,
                valor:true,
                data: true
            }
        });
        
        return { transferencia, deposito}

    }
}

export {TransferenciaService}