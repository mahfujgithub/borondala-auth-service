import express from 'express';
const router = express.Router();
import { UserController } from '../users/user.controller';
import { AdminController } from '../admin/admin.controller';
import { UserValidation } from '../users/user.validation';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

// Creating an Admin (Admin Route)
router.post(
  '/create',
  validateRequest(UserValidation.createAdminZodSchema),
  auth(ENUM_USER_ROLE.ADMIN),
  UserController.createAdmin,
);

// Get All Admins Info (Admin Route)
router.get('/', auth(ENUM_USER_ROLE.ADMIN), AdminController.getAllAdmins);



export const AdminRoutes = router;
