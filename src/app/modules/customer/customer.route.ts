import express from 'express';
const router = express.Router();
import { CustomerController } from '../customer/customer.controller';
import { UserController } from '../users/user.controller';
import { UserValidation } from '../users/user.validation';
import { CustomerValidation } from './customer.validation';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

// Signup Customer Himself/Herself
router.post(
  '/register',
  validateRequest(UserValidation.createUserZodSchema),
  UserController.createCustomer,
);

// Get All Customers Info (Admin Route)
router.get('/', auth(ENUM_USER_ROLE.ADMIN), CustomerController.getAllCustomers);

// Get Customer Info Himself/Herself
router.get('/:id', CustomerController.getCustomer);

// Update Customer Info Himself/Herself
router.patch(
  '/:id',
  validateRequest(CustomerValidation.updateCustomerZodSchema),
  CustomerController.updateCustomer,
);

// // Delete Customer Info (Admin Route)
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  CustomerController.removeCustomer,
);

export const CustomerRoutes = router;
