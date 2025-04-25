import { Client } from '../../enitities/Client';
import { DataSource } from 'typeorm';
import { Favorite } from '../../enitities/Favorite';
import dotenv from 'dotenv';
dotenv.config();


export const AppDataSource = new DataSource({
  type: 'mongodb',
  url: process.env.MONGO_URL,
  database: 'local',
  entities: [Client, Favorite],
});