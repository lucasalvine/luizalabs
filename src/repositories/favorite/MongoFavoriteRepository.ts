import { IFavoriteParams, PaginatedFavorites } from "../../useCase/Favorite/interface";

import { AppDataSource } from "../../infra/database/dataSource";
import { Favorite } from "../../entities/Favorite";
import { IFavoriteRepositories } from "./IFavoriteRepositories";
import { ObjectId } from "mongodb";

export class MongoFavoriteRepository implements IFavoriteRepositories {
  private repository = AppDataSource.getMongoRepository(Favorite);

  async create(favorite: Favorite): Promise<Favorite> {
    return this.repository.save(favorite);
  };

  async findByClientId(clientId: string): Promise<Favorite | null> {
    return this.repository.findOne({ where: { clientId } });
  };

  async update(favorite: Favorite): Promise<Favorite> {
    return this.repository.save(favorite);
  };

  async find(params: IFavoriteParams): Promise<Favorite[]> {
    let requestParams = {};

    if (params.clientId) {
      requestParams = { clientId: params.clientId };
    }

    return this.repository.find({ where: requestParams });
  }
  
  async findPaginatedFavorites(
    page: number = 1,
    limit: number = 10,
    clientId?: string,
  ): Promise<PaginatedFavorites | null> {
    const favorite = await this.repository.findOne({
      where: { clientId },
    });
  
    if (!favorite) return null;
  
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
  
    const paginatedFavorites = favorite.favorites.slice(startIndex, endIndex);
  
    return {
      _id: favorite.id ? favorite.id : new ObjectId(),
      clientId: favorite.clientId ? new ObjectId(favorite.clientId) : new ObjectId(),
      favorites: paginatedFavorites,
      total: favorite.favorites.length,
      page,
      limit,
    };
  }
};
