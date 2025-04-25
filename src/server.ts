import 'reflect-metadata';

import { connectDatabase } from './infra/database/mongoConnection';
import dotenv from 'dotenv';
import express from 'express';
import routes from './routes';

dotenv.config();

const app = express();
app.use(express.json());
app.use(routes);


connectDatabase();

app.listen(3000, () => {
  console.log('🔥 Server running on http://localhost:3000');
});