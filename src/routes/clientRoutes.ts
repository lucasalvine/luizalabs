import { CreateClientController } from "../useCase/CreateClient/CreateClientController";
import { Router } from "express";

const route = Router();
const createClient = new CreateClientController();

route.post('/clients', async (req, res) => {
	try {
		await createClient.handle(req, res);
	} catch (err) {
		res.status(500).send({ err: 'Internal Server Error' });
	}
});

export default route;