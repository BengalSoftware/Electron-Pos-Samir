import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { ExpenseCategoryController } from './expenseCategory.controller';
import { CategoryValidation } from './expenseCategory.validation';

const router = express.Router();

//GET ALL categoryS
router.get(
    '/',
    auth("get-all-expense-category"),
    ExpenseCategoryController.getAllCategories
);

// CREATE SINGLE category
router.post(
    '/create-expense-category',
    validateRequest(
        CategoryValidation.createCategoryZodSchema
    ),
    auth("create-expense-category"),
    ExpenseCategoryController.createCategory
);

// DELETE ALL categoryS
router.delete(
    '/all',
    auth("delete-all-expense-category"),
    ExpenseCategoryController.deleteAllCategories
);

// UPDATE SINGLE category
router.patch(
    '/:id',
    validateRequest(
        CategoryValidation.createCategoryZodSchema
    ),
    auth("update-expense-category"),
    ExpenseCategoryController.updateCategory
);

// DELETE SINGLE category
router.delete(
    '/:id',
    auth("delete-expense-category"),
    ExpenseCategoryController.deleteCategory
);

// GET SINGLE category
router.get(
    '/:id',
    auth("get-expense-category"),
    ExpenseCategoryController.getCategory
);



export const ExpenseCategoryRoutes = router;
