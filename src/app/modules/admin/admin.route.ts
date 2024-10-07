import express from 'express';
const router = express.Router();
import { CustomerController } from '../customer/customer.controller';
import { UserController } from '../users/user.controller';
import { UserValidation } from '../users/user.validation';
import validateRequest from '../../middlewares/validateRequest';

router.post(
  '/create',
  validateRequest(UserValidation.createAdminZodSchema),
  UserController.createAdmin,
);



export const AdminRoutes = router;
