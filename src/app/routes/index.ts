import express from 'express';
import { UserRoutes } from '../modules/users/user.route';
import { DalaRoutes } from '../modules/products/ProductItems/GiftDala/dala.route';
const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/watch',
    route: DalaRoutes,
  },
  {
    path: '/dala',
    route: DalaRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
