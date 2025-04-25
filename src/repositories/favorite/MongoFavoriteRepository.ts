import { AppDataSource } from "../../infra/database/dataSource";
import { Favorite } from "../../enitities/Favorite";
import { IFavoriteRepositories } from "./IFavoriteRepositories";
import { ObjectId } from "typeorm";

export class MongoFavoriteRepository implements IFavoriteRepositories {
  private repository = AppDataSource.getMongoRepository(Favorite);

  async create(favorite: Favorite): Promise<Favorite> {
    return this.repository.save(favorite);
  };

  async findByClientId(clientId: ObjectId): Promise<Favorite | null> {
    return this.repository.findOne({ where: { clientId } });
  };

  async update(favorite: Favorite): Promise<Favorite> {
      return this.repository.save(favorite);
  };
};
