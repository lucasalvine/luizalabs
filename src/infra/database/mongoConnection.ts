import { Client } from '../../enitities/Client';
import { createConnection } from 'typeorm';
import dotenv from 'dotenv';
dotenv.config();


console.log('URL', process.env.MONGO_URL)

export const connectDatabase = async () => {
  await createConnection({
    type: 'mongodb',
    url: process.env.MONGO_URL,
    entities: [Client],
    database: 'local',
  });

  console.log('Connected to MongoDB');
};