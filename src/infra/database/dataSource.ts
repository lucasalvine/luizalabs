import { Client } from '../../entities/Client';
import { DataSource } from 'typeorm';
import { Favorite } from '../../entities/Favorite';
import dotenv from 'dotenv';
dotenv.config();


export const AppDataSource = new DataSource({
  type: 'mongodb',
  url: process.env.MONGO_URL,
  database: 'local',
  entities: [Client, Favorite],
  migrations: ['src/migrations/*.ts'],
});