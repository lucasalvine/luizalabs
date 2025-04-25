import { CreateFavoriteController } from "../useCase/Favorite/CreateFavorite/CreateFavoriteController";
import { Router } from "express";

const favoriteRoute = Router();
const createFavorite = new CreateFavoriteController();

favoriteRoute.post('/', async (req, res) => {
	try {
		await createFavorite.handle(req, res);
	} catch (err) {
		res.status(500).send({ err: 'Internal Server Error' });
	}
});

export default favoriteRoute;
