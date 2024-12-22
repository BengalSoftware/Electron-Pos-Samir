import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { SalaryController } from './salary.controller';
import { SalaryValidation } from './salary.validation';
const router = express.Router();


// salary create route defined on user folder
router.post(
  '/create-salary',
  auth("create-salary"),
  SalaryController.createSalary
);

router.get(
  '/',
  auth("get-all-salary"),
  SalaryController.getAllSalarySheet
);
router.get(
  '/:id',
  auth("get-salary"),
  SalaryController.getSingleSalarySheet
);
router.delete(
  '/:id',
  auth("delete-salary"),
  SalaryController.deleteSalarySheet
);

router.patch(
  '/:id',
  validateRequest(SalaryValidation.updateSalaryZodSchema),
  auth("update-salary"),
  SalaryController.updateSalarySheet
);

export const SalaryRoutes = router;
