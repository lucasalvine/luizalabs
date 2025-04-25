import { Favorite } from "../../../enitities/Favorite";
import { IFavoriteRepositories } from "../../../repositories/favorite/IFavoriteRepositories";
import { ObjectId } from "typeorm";
import { Product } from "../../../utils/types/products";

interface IFavoriteRequest {
  clientId: ObjectId;
  products: Product[];
}

export class CreateFavoriteUseCase {
  constructor(private favoriteRepository: IFavoriteRepositories) {}

  async execute({ clientId, products }: IFavoriteRequest): Promise<Favorite | undefined> {
    const alreadyExist = await this.favoriteRepository.findByClientId(clientId);

    if (alreadyExist) {
      throw new Error(`Favority already exist for this client ${clientId}`);
    }

    const favorite = new Favorite();
    favorite.clientId = clientId;
    favorite.products = products;

    return this.favoriteRepository.create(favorite);
  }
}