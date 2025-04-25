import { Client } from "../../../enitities/Client";
import { IClient } from "../interface";
import { IClientRepositories } from "../../../repositories/client/IClientRepositories";

export class CreateClientUseCase {
  constructor(private clientRepository: IClientRepositories) {}

  async execute({name, email}: IClient): Promise<Client | undefined> {
    const alreadyExist = await this.clientRepository.findByEmail(email);

    if (alreadyExist) {
      throw new Error('Client already exist');
    }

    const client = new Client();
    client.name = name;
    client.email = email;

    return this.clientRepository.create(client);
  }
}