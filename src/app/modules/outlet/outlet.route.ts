import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { ManagementOutletController } from './outlet.controller';
import { ManagementOutletValidation } from './outlet.validation';

const router = express.Router();

router.post(
  '/create-outlet',
  validateRequest(
    ManagementOutletValidation.createManagementOutletZodSchema
  ),
  // auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  ManagementOutletController.createOutlet
);

router.get(
  '/:id',
  auth("get-outlet"),
  ManagementOutletController.getSingleOutlet
);

router.patch(
  '/:id',
  validateRequest(
    ManagementOutletValidation.updateManagementOutletZodSchema
  ),
  auth("update-outlet"),
  ManagementOutletController.updateOutlet
);

router.delete(
  '/:id',
  auth("delete-outlet"),
  ManagementOutletController.deleteOutlet
);

router.get(
  '/',
  auth("get-all-outlet"),
  ManagementOutletController.getAllOutlets
);

export const ManagementOutletRoutes = router;
