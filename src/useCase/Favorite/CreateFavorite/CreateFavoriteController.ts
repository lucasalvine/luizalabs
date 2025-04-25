import { Request, Response } from 'express';

import { CreateFavoriteUseCase } from './CreateFavoriteUseCase';
import { MongoFavoriteRepository } from '../../../repositories/favorite/MongoFavoriteRepository';

export class CreateFavoriteController {
  async handle(req: Request, res: Response) {
    const { clientId, products } = req.body;
    const repository = new MongoFavoriteRepository();
    const favoriteUseCase = new CreateFavoriteUseCase(repository);

    try {
      const favorite = await favoriteUseCase.execute({clientId, products});
      return res.status(201).json(favorite);
    } catch(err) {
      if (err instanceof Error) {
        return res.status(400).json({ error: err.message });
      }
      return res.status(400).json({ error: "An unknown error occurred" });
    }
  }
}