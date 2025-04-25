import { CreateClientController } from "../useCase/Client/CreateClient/CreateClientController";
import { DeleteClientController } from "../useCase/Client/DeleteClient/DeleteClientController";
import { FindClientsController } from "../useCase/Client/FindClient/FindClientController";
import { Router } from "express";
import { UpdateClientController } from "../useCase/Client/UpdateClient/UpdateClientController";

const clientRoute = Router();
const createClient = new CreateClientController();
const findClients = new FindClientsController();
const deleteClient = new DeleteClientController();
const updateClient = new UpdateClientController();

/**
 * @swagger
 * /clients:
 *   post:
 *     summary: Cria um novo cliente
 *     tags: [Clients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: Cliente criado com sucesso
 *       400:
 *         description: Erro de validação ou cliente já existe
 */
clientRoute.post('/', async (req, res) => {
	try {
		await createClient.handle(req, res);
	} catch (err) {
		res.status(500).send({ err: 'Internal Server Error' });
	}
});

/**
 * @swagger
 * /clients:
 *   get:
 *     summary: Lista todos os clientes
 *     tags: [Clients]
 *     responses:
 *       200:
 *         description: Lista de clientes
 */
clientRoute.get('/', async (req, res) => {
	try {
		await findClients.handle(req, res);
	} catch (err) {
		res.status(500).send({ err: 'Internal Server Error' });
	}
});

/**
 * @swagger
 * /clients:
 *   delete:
 *     summary: Exclui um cliente da base de dados
 *     tags: [Clients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: string
 *                 description: ID do cliente a ser removido
 *     responses:
 *       200:
 *         description: Cliente removido com sucesso
 *       400:
 *         description: Erro ao tentar excluir o cliente (por exemplo, cliente não encontrado)
 *       404:
 *         description: Cliente não encontrado
 *       500:
 *         description: Erro interno no servidor
 */
clientRoute.delete('/', async (req, res) => {
	try {
		await deleteClient.handle(req, res);
	} catch (err) {
		res.status(500).send({ err: 'Internal Server Error' });
	}
});

/**
 * @swagger
 * /clients/{id}:
 *   put:
 *     summary: Atualiza os dados de um cliente
 *     tags: [Clients]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do cliente que será atualizado
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cliente atualizado com sucesso
 *       400:
 *         description: Erro ao tentar atualizar o cliente (por exemplo, dados inválidos)
 *       404:
 *         description: Cliente não encontrado
 *       500:
 *         description: Erro interno no servidor
 */
clientRoute.put('/:id', async (req, res) => {
	try {
		await updateClient.handle(req, res);
	} catch (err) {
		res.status(500).send({ err: 'Internal Server Error' });
	}
});

export default clientRoute;
