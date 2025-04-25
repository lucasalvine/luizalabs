import { Client } from "../../entities/Client";
import { IClientParams } from "../../useCase/Client/interface";

export interface IClientRepositories {
  create(client: Client): Promise<Client>;
  findByEmail(email: string): Promise<Client | null>;
  find(params: IClientParams): Promise<Client[]>
  deleteById(id: string): Promise<void>;
  findById(id: string): Promise<Client | null>;
  update(client: Client): Promise<Client>;
}