import { Favorite } from "../../../entities/Favorite";
import { IFavoriteRepositories } from "../../../repositories/favorite/IFavoriteRepositories";
import { ObjectId } from "typeorm";

interface IRemoveFavoritesRequest {
  clientId: ObjectId;
  productIds: string[];
}

export class RemoveFavoriteUseCase {
  constructor(private favoriteRepository: IFavoriteRepositories) {}

  async execute({ clientId, productIds }: IRemoveFavoritesRequest): Promise<Favorite> {
    const favorite = await this.favoriteRepository.findByClientId(clientId);

    if (!favorite) {
      throw new Error("Favorite list not found for this client.");
    }

    favorite.favorites = favorite.favorites.filter(
      (product) => !productIds.includes(product.id)
    );

    return this.favoriteRepository.update(favorite);
  }
}
