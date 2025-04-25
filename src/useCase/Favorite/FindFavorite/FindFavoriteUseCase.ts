import { IFavoriteRepositories } from "../../../repositories/favorite/IFavoriteRepositories";
import { ObjectId } from "mongodb";
import { PaginatedFavorites } from "../interface";

export class FindFavoriteUseCase {
  constructor(private favoriteRepository: IFavoriteRepositories) {}

  async find(page: number, limit: number, clientId?: string): Promise<PaginatedFavorites[] | null> {
    const validClientId = clientId ? clientId : undefined;
    const result = await this.favoriteRepository.findPaginatedFavorites(page, limit, validClientId);
    return result ? [result] : null;
  }
}