import express from 'express';
const router = express.Router();
import { CustomerController } from '../customer/customer.controller';
import { UserController } from '../users/user.controller';
import { UserValidation } from '../users/user.validation';
import { CustomerValidation } from './customer.validation';
import validateRequest from '../../middlewares/validateRequest';

router.post(
  '/register',
  validateRequest(UserValidation.createUserZodSchema),
  UserController.createCustomer,
);

router.get('/', CustomerController.getAllCustomers);

router.get('/:id', CustomerController.getCustomer);

router.patch(
  '/:id',
  validateRequest(CustomerValidation.updateCustomerZodSchema),
  CustomerController.updateCustomer,
);

router.delete('/:id', CustomerController.removeCustomer);


export const CustomerRoutes = router;
