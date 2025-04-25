import { Request, Response } from 'express';

import { FindClientUseCase } from './FindClientUseCase';
import { MongoClientRepository } from '../../../repositories/client/MongoClientRepository';

export class FindClientsController {
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { id, name, email } = req.query;

      const repository = new MongoClientRepository();
      const findClientUseCase = new FindClientUseCase(repository);

      const clients = await findClientUseCase.find({
        id: id as string,
        name: name as string,
        email: email as string,
      });

      return res.json(clients);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
