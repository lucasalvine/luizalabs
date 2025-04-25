import { IFavoriteParams, PaginatedFavorites } from "../../useCase/Favorite/interface";

import { Favorite } from "../../entities/Favorite";

export interface IFavoriteRepositories {
  create(favorite: Favorite): Promise<Favorite>;
  findByClientId(clientId: string): Promise<Favorite | null>;
  update(products: Favorite): Promise<Favorite>;
  find(params: IFavoriteParams): Promise<Favorite[]>
  findPaginatedFavorites(page: number, limit: number, clientId?: string): Promise<PaginatedFavorites | null>
}
