import 'reflect-metadata';

import clientRoutes from './routes/clientRoutes';
import { connectDatabase } from './infra/database/mongoConnection';
import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

console.log('MONGO_URL:', process.env.MONGO_URL); // <- teste aqui

const app = express();
app.use(express.json());
app.use(clientRoutes);

connectDatabase();

app.listen(3000, () => {
  console.log('🔥 Server running on http://localhost:3000');
});