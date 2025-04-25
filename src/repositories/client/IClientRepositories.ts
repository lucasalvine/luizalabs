import { Client } from "../../enitities/Client";

export interface IClientRepositories {
  create(client: Client): Promise<Client>;
  findByEmail(email: string): Promise<Client | null>;
}