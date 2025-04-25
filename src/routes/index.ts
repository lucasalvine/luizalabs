import { Router } from 'express';
import clientRoutes from './clientRoutes';
import favoriteRoutes from './favoriteRoutes';

const routes = Router();

routes.use('/clients', clientRoutes);
routes.use('/favorites', favoriteRoutes);

export default routes;
