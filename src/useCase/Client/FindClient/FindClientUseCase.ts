import { Client } from "../../../enitities/Client";
import { IClientParams } from "../interface";
import { IClientRepositories } from "../../../repositories/client/IClientRepositories";

export class FindClientUseCase {
  constructor(private clientRepository: IClientRepositories) {}

  async find(params: IClientParams): Promise<Client[]> {
    return this.clientRepository.find(params);
  }
}