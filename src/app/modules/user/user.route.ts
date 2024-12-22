import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';
const router = express.Router();

router.post(
  '/create-employee',
  validateRequest(UserValidation.createEmployeeZodSchema),
  auth("create-employee"),
  UserController.createEmployee
);

router.post(
  '/create-admin',
  validateRequest(UserValidation.createAdminZodSchema),
  auth("create-admin"),
  UserController.createAdmin
);
router.post(
  '/create-superadmin',
  validateRequest(UserValidation.createSuperAdminZodSchema),
  auth("create-superAdmin"),
  UserController.createSuperAdmin
);

export const UserRoutes = router;
