import { Column, Entity, Index, ObjectIdColumn } from "typeorm";

import { ObjectId } from "mongodb";
import { Product } from "../utils/types/products";

@Entity('favorites')
@Index('IDX_CLIENT_ID', ['clientId'])
export class Favorite {
  @ObjectIdColumn()
  id: ObjectId | undefined;

  @Column()
  clientId: string | undefined;

  @Column()
  favorites: Product[] = [];
}