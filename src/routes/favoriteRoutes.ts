import { CreateFavoriteController } from "../useCase/Favorite/CreateFavorite/CreateFavoriteController";
import { RemoveFavoriteController } from "../useCase/Favorite/RemoveFavorite/RemoveFavoriteController";
import { Router } from "express";

const favoriteRoute = Router();
const createFavorite = new CreateFavoriteController();
const removeFavorite = new RemoveFavoriteController();

favoriteRoute.post('/', async (req, res) => {
	try {
		await createFavorite.handle(req, res);
	} catch (err) {
		res.status(500).send({ err: 'Internal Server Error' });
	}
});

favoriteRoute.post("/remove", async (req, res) => {
	try {
		await removeFavorite.handle(req, res);
	} catch (err) {
		res.status(500).send({ err: 'Internal Server Error' });
	}
});


export default favoriteRoute;
