import { Request, Response } from 'express';

import { CreateClientUseCase } from "./CreateClientUseCase";
import { MongoClientRepository } from "../../repositories/MongoClientRepository";

export class CreateClientController {
  async handle(req: Request, res: Response) {
    const { name, email } = req.body;
    const repository = new MongoClientRepository();
    const clientUseCase = new CreateClientUseCase(repository);

    try {
      const client = await clientUseCase.execute({name, email});
      return res.status(201).json(client);
    } catch(err) {
      if (err instanceof Error) {
        return res.status(400).json({ error: err.message });
      }
      return res.status(400).json({ error: "An unknown error occurred" });
    }
  }
}