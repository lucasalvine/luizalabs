import { Client } from "../enitities/Client";
import { IClientRepositories } from "./IClientRepositories";
import { getMongoRepository } from "typeorm";

export class MongoClientRepository implements IClientRepositories {
  private repository = getMongoRepository(Client);

  async create(client: Client): Promise<Client | undefined> {
    try {
      return this.repository.save(client);
    } catch (e) {
      console.log(e);
    }
  }

  async findByEmail(email: string): Promise<Client | null> {
    return this.repository.findOne({ where: { email } });
  }
}