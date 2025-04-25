import { Column, Entity, Index, ObjectId, ObjectIdColumn } from 'typeorm';

import { IsEmail } from 'class-validator';

@Entity('clients')
export class Client {
  @ObjectIdColumn()
  id: ObjectId | undefined;

  @Column()
  name: string = '';

  @Column()
  @Index({ unique: true })
  @IsEmail()
  email: string = '';
}