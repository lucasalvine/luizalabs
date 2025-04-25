import { Column, Entity, Index, ObjectId, ObjectIdColumn } from 'typeorm';

@Entity('clients')
export class Client {
  @ObjectIdColumn()
  id: ObjectId | undefined;

  @Column()
  name: string = '';

  @Column()
  @Index({ unique: true })
  email: string = '';
}