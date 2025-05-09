import { CreateFavoriteController } from "../useCase/Favorite/CreateFavorite/CreateFavoriteController";
import { FindFavoriteController } from "../useCase/Favorite/FindFavorite/FindFavoriteController";
import { RemoveFavoriteController } from "../useCase/Favorite/RemoveFavorite/RemoveFavoriteController";
import { Router } from "express";
// import { ensureAuthenticated } from "../middleware/ensureAuthenticated";

const favoriteRoute = Router();
const createFavorite = new CreateFavoriteController();
const removeFavorite = new RemoveFavoriteController();
const findFavorite = new FindFavoriteController();
// favoriteRoute.use(ensureAuthenticated);

/**
 * @swagger
 * /favorites:
 *   post:
 *     summary: Cria uma lista de favoritos para um cliente
 *     tags: [Favorites]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - clientId
 *               - products
 *             properties:
 *               clientId:
 *                 type: string
 *               products:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     title:
 *                       type: string
 *                     price:
 *                       type: number
 *                     image:
 *                       type: string
 *                     brand:
 *                       type: string
 *                     reviewScore:
 *                       type: number
 *     responses:
 *       201:
 *         description: Lista de favoritos criada com sucesso
 *       400:
 *         description: Erro ao adicionar favoritos
 */
favoriteRoute.post('/', async (req, res) => {
	try {
		await createFavorite.handle(req, res);
	} catch (err) {
		res.status(500).send({ err: 'Internal Server Error' });
	}
});

/**
 * @swagger
 * /favorites/remove:
 *   post:
 *     summary: Remove um produto da lista de favoritos de um cliente
 *     tags: [Favorites]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - clientId
 *               - productId
 *             properties:
 *               clientId:
 *                 type: string
 *                 description: ID do cliente
 *               productId:
 *                 type: string
 *                 description: ID do produto a ser removido da lista de favoritos
 *     responses:
 *       200:
 *         description: Produto removido com sucesso da lista de favoritos
 *       400:
 *         description: Erro ao tentar remover o produto (por exemplo, produto não encontrado na lista de favoritos)
 *       404:
 *         description: Cliente não encontrado
 *       500:
 *         description: Erro interno no servidor
 */
favoriteRoute.post("/remove", async (req, res) => {
	try {
		await removeFavorite.handle(req, res);
	} catch (err) {
		res.status(500).send({ err: 'Internal Server Error' });
	}
});

/**
 * @swagger
 * /favorites:
 *   get:
 *     summary: Lista os produtos favoritos de um cliente
 *     tags:
 *       - Favoritos
 *     parameters:
 *       - in: query
 *         name: clientId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do cliente
 *     responses:
 *       200:
 *         description: Lista de produtos favoritos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 clientId:
 *                   type: string
 *                   description: ID do cliente
 *                 favorites:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       title:
 *                         type: string
 *                       price:
 *                         type: number
 *                       image:
 *                         type: string
 *                       brand:
 *                         type: string
 *                       reviewScore:
 *                         type: number
 *       400:
 *         description: Parâmetro clientId ausente ou inválido
 *       404:
 *         description: Nenhuma lista de favoritos encontrada
 *       500:
 *         description: Erro interno do servidor
 */
favoriteRoute.get("/", async (req, res) => {
	try {
		await findFavorite.handle(req, res);
	} catch (err) {
		res.status(500).send({ err: 'Internal Server Error' });
	}
});
export default favoriteRoute;
