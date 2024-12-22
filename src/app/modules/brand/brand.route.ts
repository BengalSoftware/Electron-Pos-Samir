import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { BrandsController } from './brand.controller';
import { BrandValidation } from './brand.validation';

const router = express.Router();

//GET ALL brand
router.get(
    '/',
    auth("get-all-brand"),
    BrandsController.getAllBrand
);

// CREATE SINGLE brand
router.post(
    '/create-brand',
    validateRequest(
        BrandValidation.createBrandZodSchema
    ),
    auth("create-brand"),
    BrandsController.createBrand
);

// DELETE ALL brandS
router.delete(
    '/all',
    auth("delete-all-brand"),
    BrandsController.deleteAllBrand
);

// UPDATE SINGLE brand
router.patch(
    '/:id',
    validateRequest(
        BrandValidation.createBrandZodSchema
    ),
    auth("update-brand"),
    BrandsController.updateBrand
);

// DELETE SINGLE brand
router.delete(
    '/:id',
    auth("delete-brand"),
    BrandsController.deleteBrand
);

// GET SINGLE brand
router.get(
    '/:id',
    auth("get-brand"),
    BrandsController.getSingleBrand
);



export const BrandsRoutes = router;
