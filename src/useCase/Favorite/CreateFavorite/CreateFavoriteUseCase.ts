import { Favorite } from "../../../entities/Favorite";
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
    const validatedProducts = this.checkProducts(products);

    if (validatedProducts.length === 0) {
      throw new Error('Products not found');
    }

    if (existFavorites) {
      const existingProductIds = new Set(existFavorites.favorites.map(p => p.id));
      
      const newProducts = validatedProducts.filter(p => !existingProductIds.has(p.id));

      if (newProducts.length === 0) {
        throw new Error("No new products to add or products already exist");
      }

      existFavorites.favorites.push(...newProducts);

      return this.favoriteRepository.update(existFavorites);
    }

    const favorites = new Favorite();
    favorites.clientId = clientId;
    favorites.favorites = validatedProducts;

    return this.favoriteRepository.create(favorites); 
  };

  private checkProducts(products: Product[]): Product[] {
    const requestedIds = new Set(products.map(p => String(p.id)));

    return productsMock.filter(product =>
      requestedIds.has(String(product.id))
    );
  }
}
