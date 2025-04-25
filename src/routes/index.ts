import { Router } from 'express';
// import authRoutes from './authRoutes';
import clientRoutes from './clientRoutes';
import favoriteRoutes from './favoriteRoutes';

const routes = Router();

routes.use('/clients', clientRoutes);
routes.use('/favorites', favoriteRoutes);
// routes.use('/auth', authRoutes);

export default routes;
