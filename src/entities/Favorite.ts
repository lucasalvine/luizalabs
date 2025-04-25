import { Column, Entity, Index, ObjectId, ObjectIdColumn } from "typeorm";

import { Product } from "../utils/types/products";

@Entity('favorites')
@Index('IDX_CLIENT_ID', ['clientId'])
export class Favorite {
  @ObjectIdColumn()
  id: ObjectId | undefined;

  @Column()
  clientId: ObjectId | undefined;

  @Column()
  favorites: Product[] = [];
}