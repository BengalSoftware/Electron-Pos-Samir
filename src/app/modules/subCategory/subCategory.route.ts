import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { SubCategoryController } from './subCategory.controller';
import { SubCategoryValidation } from './subCategory.validation';

const router = express.Router();

//GET ALL subcategory
router.get(
    '/',
    auth("get-all-subcategory"),
    SubCategoryController.getAllSubCategories
);

// CREATE SINGLE category
router.post(
    '/create-subcategory',
    validateRequest(
        SubCategoryValidation.createSubCategoryZodSchema
    ),
    auth("create-subcategory"),
    SubCategoryController.createSubCategory
);

// DELETE ALL subcategory
router.delete(
    '/all',
    auth("delete-all-subcategory"),
    SubCategoryController.deleteAllSubCategories
);

// UPDATE SINGLE category
router.patch(
    '/:id',
    validateRequest(
        SubCategoryValidation.createSubCategoryZodSchema
    ),
    auth("update-subcategory"),
    SubCategoryController.updateSubCategory
);

// DELETE SINGLE category
router.delete(
    '/:id',
    auth("delete-subcategory"),
    SubCategoryController.deleteSubCategory
);

// GET SINGLE category
router.get(
    '/:id',
    auth("get-subcategory"),
    SubCategoryController.getSubCategory
);



export const SubCategoryRoutes = router;
