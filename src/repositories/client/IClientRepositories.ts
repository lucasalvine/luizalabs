import { Client } from "../../enitities/Client";
import { IClientParams } from "../../useCase/Client/interface";

export interface IClientRepositories {
  create(client: Client): Promise<Client>;
  findByEmail(email: string): Promise<Client | null>;
  find(params: IClientParams): Promise<Client[]>
}