import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { SuperAdminController } from './superAdmin.controller';
import { SuperAdminValidation } from './superAdmin.validation';
const router = express.Router();

router.get(
  '/:id',
  auth("get-superAdmin"),
  SuperAdminController.getSingleSuperAdmin
);
router.get(
  '/',
  auth("get-all-superAdmin"),
  SuperAdminController.getAllSuperAdmins
);

router.patch(
  '/:id',
  validateRequest(SuperAdminValidation.updateSuperAdmin),
  auth("update-superAdmin"),
  SuperAdminController.updateSuperAdmin
);

router.delete(
  '/:id',
  auth("delete-superAdmin"),
  SuperAdminController.deleteSuperAdmin
);

export const SuperAdminRoutes = router;
