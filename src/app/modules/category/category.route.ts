import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { CategoryController } from '../category/category.controller';
import { CategoryValidation } from './category.validation';

const router = express.Router();

//GET ALL categoryS
router.get(
    '/',
    auth("get-all-category"),
    CategoryController.getAllCategories
);

// CREATE SINGLE category
router.post(
    '/create-category',
    validateRequest(
        CategoryValidation.createCategoryZodSchema
    ),
    auth("create-category"),
    CategoryController.createCategory
);

// DELETE ALL categoryS
router.delete(
    '/all',
    auth("delete-all-category"),
    CategoryController.deleteAllCategories
);

// UPDATE SINGLE category
router.patch(
    '/:id',
    validateRequest(
        CategoryValidation.createCategoryZodSchema
    ),
    auth("update-category"),
    CategoryController.updateCategory
);

// DELETE SINGLE category
router.delete(
    '/:id',
    auth("delete-category"),
    CategoryController.deleteCategory
);

// GET SINGLE category
router.get(
    '/:id',
    auth("get-category"),
    CategoryController.getCategory
);



export const CategoryRoutes = router;
