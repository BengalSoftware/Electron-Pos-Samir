import express from 'express';
import upload from '../../../utils/uploadFile';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { SettingsController } from './settings.controller';
import { SettingsValidation } from './settings.validation';

const router = express.Router();


router.post(
  '/create-settings',
  auth("create-settings"),
  upload.fields([
    { name: "whiteLogo", maxCount: 1 },
    { name: "blackLogo", maxCount: 1 },
    { name: "favIcon", maxCount: 1 },
    { name: "smallLogo", maxCount: 1 },
  ]),
  //multer middleware body is empty so after multer use this validation.
  validateRequest(
    SettingsValidation.createSettingsZodSchema
  ),
  SettingsController.createSettings
);

router.patch(
  '/:id',
  auth("update-settings"),
  upload.fields([
    { name: "whiteLogo", maxCount: 1 },
    { name: "blackLogo", maxCount: 1 },
    { name: "favIcon", maxCount: 1 },
    { name: "smallLogo", maxCount: 1 },
  ]),
  validateRequest(
    SettingsValidation.createSettingsZodSchema
  ),
  SettingsController.updateSettings
);

router.delete(
  '/:id',
  auth("delete-settings"),
  SettingsController.deleteSettings
);

router.get(
  '/',
  // auth("get-all-settings"),
  SettingsController.getAllSettings
);

export const SettingsRoutes = router;
