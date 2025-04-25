import { Client } from "../../../enitities/Client";
import { IClientRepositories } from "../../../repositories/client/IClientRepositories";
import { IUpdateClient } from "../interface";

export class UpdateClientUseCase {
  constructor(private clientRepository: IClientRepositories) {}

  async execute(id: string, data: IUpdateClient): Promise<Client | null> {
    const client = await this.clientRepository.findById(id);
    
    if (!client) {
      throw new Error("Client not found");
    }

    if (data.name) {
      client.name = data.name;
    }

    if (data.email) {
      client.email = data.email;
    }

    return this.clientRepository.update(client);
  }
}
