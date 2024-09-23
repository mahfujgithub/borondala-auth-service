import express from 'express'
import { UserRoutes } from '../modules/users/common/user.route'
import { CustomerRoutes } from '../modules/users/customer/customer.route'
import { WatchRoutes } from '../modules/products/watch/watch.route'
const router = express.Router()

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/customers',
    route: CustomerRoutes,
  },
  {
    path: '/products',
    route: WatchRoutes,
  },
]

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router
