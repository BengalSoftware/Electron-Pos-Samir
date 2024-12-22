import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { EmployeeController } from './employee.controller';
import { EmployeeValidation } from './employee.validation';
const router = express.Router();


// employee create route defined on user folder

router.get(
  '/',
  auth("get-all-employee"),
  EmployeeController.getAllEmployees
);
router.get(
  '/:id',
  auth("get-employee"),
  EmployeeController.getSingleEmployee
);
router.delete(
  '/:id',
  auth("delete-employee"),
  EmployeeController.deleteEmployee
);

router.patch(
  '/:id',
  validateRequest(EmployeeValidation.updateEmployeeZodSchema),
  auth("update-employee"),
  EmployeeController.updateEmployee
);

export const EmployeeRoutes = router;
