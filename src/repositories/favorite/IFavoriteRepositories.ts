import { Favorite } from "../../entities/Favorite";
import { ObjectId } from "typeorm";

export interface IFavoriteRepositories {
  create(favorite: Favorite): Promise<Favorite>;
  findByClientId(clientId: ObjectId): Promise<Favorite | null>;
  update(products: Favorite): Promise<Favorite>;
}
