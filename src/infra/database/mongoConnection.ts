import { AppDataSource } from './dataSource';
import dotenv from 'dotenv';
dotenv.config();


export const connectDatabase = async () => {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }

  const mongoManager = AppDataSource.mongoManager;

  await mongoManager.createCollectionIndex('favorites', {
    'products.id': 1,
  });

  console.log('Connected to MongoDB with indexes');
};