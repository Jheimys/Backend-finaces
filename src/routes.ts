import { Router } from 'express';
import { CreateUserController } from './controllers/user/CreateUserController';
import { AuthUserController } from './controllers/user/AuthUserController';
import { DetailUserController } from './controllers/user/DetailUserController';
import { isAuthenticated } from './middlewares/isAuthenticated';
import { CreateContaController } from './controllers/conta/CreateContaController';
import { CreateTransacaoController } from './controllers/transacao/CreateTransacaoController';
import { TransferenciaController } from './controllers/transacao/TransferenciaController';
import { ReceitaController } from './controllers/categoria/ReceitaController';
import { despesasController } from './controllers/categoria/despesasControllers';
import { LogoutUserController } from './controllers/user/LogoutUserController';
import { ListaReceitaController } from './controllers/categoria/ListaReceitaController';
import { ListaDespesasControler } from './controllers/categoria/ListaDespesasController';
import { DeletarDespesasController } from './controllers/categoria/deletarDespesasController';
import { DeleteReceitaController } from './controllers/categoria/DeletarReceitaController';


const router = Router()

//-- Rotas User --
router.post('/users', new CreateUserController().handle)

router.post('/session', new AuthUserController().handle)

router.post('/logout', isAuthenticated, new LogoutUserController().handle)

router.get('/me', isAuthenticated, new DetailUserController().handle )

//--Rotas Contas --
router.post('/conta', isAuthenticated, new CreateContaController().handle)

//--Rotas Transacao
router.post('/transacao', isAuthenticated, new CreateTransacaoController().handle)

router.put('/transferencia', isAuthenticated, new TransferenciaController().handle)

//--Rotas Categorias
router.put('/receita',isAuthenticated, new ReceitaController().handle )

router.put('/despesas',isAuthenticated, new despesasController().handle )

router.get('/listar-receitas/:id', isAuthenticated, new ListaReceitaController().handle)

router.get('/listar-pagamentos/:id', isAuthenticated, new ListaDespesasControler().handle)

router.delete('/deleta-despesas', isAuthenticated, new DeletarDespesasController().handle)

router.delete('/deleta-receitas', isAuthenticated, new DeleteReceitaController().handle)



export {router}