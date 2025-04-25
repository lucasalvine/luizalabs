import { Request, Response } from "express";

import { DeleteClientUseCase } from "./DeleteClientUseCase";
import { MongoClientRepository } from "../../../repositories/client/MongoClientRepository";

export class DeleteClientController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "Client ID is required" });
    }

    try {
      const repository = new MongoClientRepository();
      const useCase = new DeleteClientUseCase(repository);

      await useCase.execute(id);
      return res.status(204).send(); // No content
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
