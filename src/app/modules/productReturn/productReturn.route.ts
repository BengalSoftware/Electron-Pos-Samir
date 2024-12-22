import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { ProductReturnController } from './productReturn.controller';
import { ProductReturnValidation } from './productReturn.validation';

const router = express.Router();

//GET ALL ProductReturnS
router.get(
    '/',
    auth("get-all-productReturn"),
    ProductReturnController.getAllProductReturns
);

// CREATE SINGLE ProductReturn
router.post(
    '/create-productReturn',
    validateRequest(
        ProductReturnValidation.createProductReturnZodSchema
    ),
    auth("create-productReturn"),
    ProductReturnController.createProductReturn
);

// DELETE ALL ProductReturnS
router.delete(
    '/all',
    auth("delete-all-productReturn"),
    ProductReturnController.deleteAllProductReturns
);

// UPDATE SINGLE ProductReturn
router.patch(
    '/:id',
    // validateRequest(
    //     ProductReturnValidation.createProductReturnZodSchema
    // ),
    auth("update-productReturn"),
    ProductReturnController.updateProductReturn
);

// DELETE SINGLE ProductReturn
router.delete(
    '/:id',
    auth("delete-productReturn"),
    ProductReturnController.deleteProductReturn
);

// GET SINGLE ProductReturn
router.get(
    '/:id',
    auth("get-productReturn"),
    ProductReturnController.getProductReturn
);



export const ProductReturnRoutes = router;
