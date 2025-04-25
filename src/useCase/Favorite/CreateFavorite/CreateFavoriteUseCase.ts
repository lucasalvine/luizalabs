import { Favorite } from "../../../enitities/Favorite";
import { IFavoriteRepositories } from "../../../repositories/favorite/IFavoriteRepositories";
import { ObjectId } from "typeorm";
import { Product } from "../../../utils/types/products";
import { productsMock } from "../../../mocks/productMock";

interface IFavoriteRequest {
  clientId: ObjectId;
  products: Product[];
}

export class CreateFavoriteUseCase {
  constructor(private favoriteRepository: IFavoriteRepositories) {}

  async execute({ clientId, products }: IFavoriteRequest): Promise<Favorite | undefined> {
    const existFavorites = await this.favoriteRepository.findByClientId(clientId);
    const validateProducts = this.checkProducts(products);

    if (validateProducts.length === 0) {
      throw new Error('Products not found');
    }

    if (existFavorites) {
      const existingProductIds = new Set(existFavorites.favorites.map(p => p.id));
      const newProducts = products.filter(p => !existingProductIds.has(p.id));

      if (newProducts.length === 0) {
        throw new Error("No new products to add or products already exist");
      }

      existFavorites.favorites.push(...newProducts);

      return this.favoriteRepository.update(existFavorites);
    }

    const favorites = new Favorite();
    favorites.clientId = clientId;
    favorites.favorites = products;

    return this.favoriteRepository.create(favorites); 
  };

  private checkProducts(products: Product[]): Product[] {
    const idsSet = new Set(products.map(item => String(item.id)));
  
    return productsMock.filter(product =>
      idsSet.has(String(product.id))
    );
  };
}
