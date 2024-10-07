import express from 'express';
import { UserRoutes } from '../modules/users/user.route';
import { CustomerRoutes } from '../modules/customer/customer.route';
import { DalaRoutes } from '../modules/products/ProductItems/GiftDala/dala.route';
import { AdminRoutes } from '../modules/admin/admin.route';
import { AuthRoutes } from '../modules/auth/auth.route';
const router = express.Router();

const moduleRoutes = [
  {
    path: '/',
    route: CustomerRoutes,
  },
  {
    path: '/admins',
    route: AdminRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
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
