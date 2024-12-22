import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { DepartmentController } from '../department/department.controller';
import { DepartmentValidation } from './department.validation';

const router = express.Router();

//GET ALL DepartmentS
router.get(
    '/',
    auth("get-all-department"),
    DepartmentController.getAllDepartments
);

// CREATE SINGLE Department
router.post(
    '/create-department',
    validateRequest(
        DepartmentValidation.createDepartmentZodSchema
    ),
    auth("create-department"),
    DepartmentController.createDepartment
);

// DELETE ALL DepartmentS
router.delete(
    '/all',
    auth("delete-all-department"),
    DepartmentController.deleteAllDepartments
);

// UPDATE SINGLE Department
router.patch(
    '/:id',
    validateRequest(
        DepartmentValidation.createDepartmentZodSchema
    ),
    auth("update-department"),
    DepartmentController.updateDepartment
);

// DELETE SINGLE Department
router.delete(
    '/:id',
    auth("delete-department"),
    DepartmentController.deleteDepartment
);

// GET SINGLE Department
router.get(
    '/:id',
    auth("get-department"),
    DepartmentController.getDepartment
);



export const DepartmentRoutes = router;
