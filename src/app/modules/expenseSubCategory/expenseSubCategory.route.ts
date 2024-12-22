import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { SubCategoryController } from './expenseSubCategory.controller';
import { SubCategoryValidation } from './expenseSubCategory.validation';

const router = express.Router();

//GET ALL subcategory
router.get(
    '/',
    auth("get-all-expense-subcategory"),
    SubCategoryController.getAllSubCategories
);

// CREATE SINGLE category
router.post(
    '/create-expense-subcategory',
    validateRequest(
        SubCategoryValidation.createSubCategoryZodSchema
    ),
    auth("create-expense-subcategory"),
    SubCategoryController.createSubCategory
);

// DELETE ALL subcategory
router.delete(
    '/all',
    auth("delete-all-expense-subcategory"),
    SubCategoryController.deleteAllSubCategories
);

// UPDATE SINGLE category
router.patch(
    '/:id',
    validateRequest(
        SubCategoryValidation.createSubCategoryZodSchema
    ),
    auth("update-expense-subcategory"),
    SubCategoryController.updateSubCategory
);

// DELETE SINGLE category
router.delete(
    '/:id',
    auth("delete-expense-subcategory"),
    SubCategoryController.deleteSubCategory
);

// GET SINGLE category
router.get(
    '/:id',
    auth("get-expense-subcategory"),
    SubCategoryController.getSubCategory
);



export const ExpenseSubCategoryRoutes = router;
