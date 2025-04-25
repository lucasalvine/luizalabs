import { Request, Response } from 'express';

import { MongoFavoriteRepository } from '../../../repositories/favorite/MongoFavoriteRepository';
import { RemoveFavoriteUseCase } from './RemoveFavoriteUseCase';

export class RemoveFavoriteController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { clientId, productIds } = req.body;

    const repository = new MongoFavoriteRepository();
    const useCase = new RemoveFavoriteUseCase(repository);

    try {
      const updatedFavorite = await useCase.execute({ clientId, productIds });
      return res.json(updatedFavorite);
    } catch (err) {
      return res.status(400).json({ error: err instanceof Error ? err.message : 'Unknown error' });
    }
  }
}
