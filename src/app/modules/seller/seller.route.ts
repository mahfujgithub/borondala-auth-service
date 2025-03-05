import express from 'express';
const router = express.Router();
import { SellerController } from '../seller/seller.controller';
import { UserController } from '../users/user.controller';
import { UserValidation } from '../users/user.validation';
import { SellerValidation } from './seller.validation';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

// Signup Seller Himself/Herself
router.post(
  '/create',
  validateRequest(UserValidation.createSellerZodSchema),
  UserController.createSeller,
);

// Get All Sellers Info (Admin Route)
router.get(
  '/',
  auth(ENUM_USER_ROLE.SELLER),
  SellerController.getAllSellers,
);

// Get Seller Info Himself/Herself
router.get('/:id', SellerController.getSeller);

// Update Seller Info Himself/Herself
router.patch(
  '/:id',
  validateRequest(SellerValidation.updateSellerZodSchema),
  SellerController.updateSeller,
);

// // Delete Seller Info (Admin Route)
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  SellerController.removeSeller,
);

export const SellerRoutes = router;
