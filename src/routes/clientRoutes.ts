import { CreateClientController } from "../useCase/Client/CreateClient/CreateClientController";
import { FindClientsController } from "../useCase/Client/FindClient/FindClientController";
import { Router } from "express";

const clientRoute = Router();
const createClient = new CreateClientController();
const findClients = new FindClientsController()

clientRoute.post('/', async (req, res) => {
	try {
		await createClient.handle(req, res);
	} catch (err) {
		res.status(500).send({ err: 'Internal Server Error' });
	}
});

clientRoute.get('/', async (req, res) => {
	try {
		await findClients.handle(req, res);
	} catch (err) {
		res.status(500).send({ err: 'Internal Server Error' });
	}
});


export default clientRoute;
