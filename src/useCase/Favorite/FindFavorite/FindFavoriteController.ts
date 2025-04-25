import { Request, Response } from 'express';

import { FindFavoriteUseCase } from './FindFavoriteUseCase';
import { MongoFavoriteRepository } from '../../../repositories/favorite/MongoFavoriteRepository';

export class FindFavoriteController {
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { clientId } = req.query;

      const repository = new MongoFavoriteRepository();
      const findFavoriteUseCase = new FindFavoriteUseCase(repository);

      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const favorites = await findFavoriteUseCase.find(
        page,
        limit,
        typeof clientId === 'string' ? clientId : undefined
      );

      return res.json(favorites);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
