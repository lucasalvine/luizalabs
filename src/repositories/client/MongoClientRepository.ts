import { AppDataSource } from "../../infra/database/dataSource";
import { Client } from "../../enitities/Client";
import { IClientParams } from "../../useCase/Client/interface";
import { IClientRepositories } from "./IClientRepositories";
import { ObjectId } from "typeorm";

export class MongoClientRepository implements IClientRepositories {
  private repository = AppDataSource.getMongoRepository(Client);

  async create(client: Client): Promise<Client> {
    return this.repository.save(client);
  }

  async findByEmail(email: string): Promise<Client | null> {
    return this.repository.findOne({ where: { email } });
  }

  async find(params: IClientParams): Promise<Client[]> {
    const { id, name, email } = params;
    const query: { _id?: ObjectId; name?: { $regex: RegExp }; email?: { $regex: RegExp } } = {};

    if (id) {
      try {
        query._id = new ObjectId(id);
      } catch (error) {
        return [];
      }
    }

    if (name) {
      query.name = { $regex: new RegExp(name, 'i') };
    }

    if (email) {
      query.email = { $regex: new RegExp(email, 'i') };
    }

    return this.repository.find({ where: query });
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.deleteOne({ _id: new ObjectId(id) });
  }

  async findById(id: string): Promise<Client | null> {
    try {
      return this.repository.findOne({ where: { id: new ObjectId(id) } });
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  async update(client: Client): Promise<Client> {
    try {
      return this.repository.save(client);
    } catch (e) {
      console.error(e);
      throw new Error("Failed to update client");
    }
  }
}