import { CreateClientController } from "../useCase/Client/CreateClient/CreateClientController";
import { Router } from "express";

const clientRoute = Router();
const createClient = new CreateClientController();

clientRoute.post('/', async (req, res) => {
	try {
		await createClient.handle(req, res);
	} catch (err) {
		res.status(500).send({ err: 'Internal Server Error' });
	}
});

export default clientRoute;
