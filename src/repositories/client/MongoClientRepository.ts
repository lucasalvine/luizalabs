import { AppDataSource } from "../../infra/database/dataSource";
import { Client } from "../../enitities/Client";
import { IClientRepositories } from "./IClientRepositories";

export class MongoClientRepository implements IClientRepositories {
  private repository = AppDataSource.getMongoRepository(Client);

  async create(client: Client): Promise<Client> {
    return this.repository.save(client);
  }

  async findByEmail(email: string): Promise<Client | null> {
    return this.repository.findOne({ where: { email } });
  }
}