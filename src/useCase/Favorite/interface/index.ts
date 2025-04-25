import { ObjectId } from "typeorm";
import { Product } from "../../../utils/types/products";

export interface IFavoriteParams {
  clientId?: string;
  page: number;
  number: number;
}

export interface PaginatedFavorites {
  _id: ObjectId;
  clientId: ObjectId;
  favorites: Product[];
  total: number;
  page: number;
  limit: number;
}