import express from 'express';
const router = express.Router();
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';
import validateRequest from '../../middlewares/validateRequest';

router.post(
  '/create-customer',
  validateRequest(UserValidation.createUserZodSchema),
  UserController.createCustomer,
);

export const UserRoutes = router;
