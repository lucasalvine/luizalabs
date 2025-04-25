import { Request, Response } from "express";

import { MongoClientRepository } from "../../../repositories/client/MongoClientRepository";
import { UpdateClientUseCase } from "./UpdateClientUseCase";

export class UpdateClientController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { name, email } = req.body;

    const repository = new MongoClientRepository();
    const updateClientUseCase = new UpdateClientUseCase(repository);

    try {
      const updatedClient = await updateClientUseCase.execute(id, { name, email });
      return res.json(updatedClient);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ error: err.message });
      }
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
