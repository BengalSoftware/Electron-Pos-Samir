import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { AdminController } from './admin.controller';
import { AdminValidation } from './admin.validation';
const router = express.Router();

router.get(
  '/:id',
  auth("get-admin"),
  AdminController.getSingleAdmin
);
router.get(
  '/',
  auth("get-all-admin"),
  AdminController.getAllAdmins
);

router.patch(
  '/:id',
  validateRequest(AdminValidation.updateAdmin),
  auth("update-admin"),
  AdminController.updateAdmin
);

router.delete(
  '/:id',
  auth("delete-admin"),
  AdminController.deleteAdmin
);

export const AdminRoutes = router;
