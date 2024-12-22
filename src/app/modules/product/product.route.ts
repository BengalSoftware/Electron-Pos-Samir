import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { ProductController } from './product.controller';
import { ProductValidation } from './product.validation';

const router = express.Router();

//GET ALL ProductS
router.get(
    '/',
    auth("get-all-product"),
    ProductController.getAllProducts
);

//GET Pos Product
router.get(
    '/pos/:productCode',
    auth("get-all-product"),
    ProductController.getPosProducts
);

//GET Stock Limit Product
router.get(
    '/stockAlert',
    auth("get-stock-limit-product"),
    ProductController.getStockLimitProducts
);

// CREATE SINGLE Product
router.post(
    '/create-product',
    validateRequest(
        ProductValidation.createProductZodSchema
    ),
    auth("create-product"),
    ProductController.createProduct
);

// DELETE ALL ProductS
router.delete(
    '/all',
    auth("delete-all-product"),
    ProductController.deleteAllProducts
);

// UPDATE SINGLE Product
router.patch(
    '/:id',
    // validateRequest(
    //     ProductValidation.createProductZodSchema
    // ),
    auth("update-product"),
    ProductController.updateProduct
);

// DELETE SINGLE Product
router.delete(
    '/:id',
    auth("delete-product"),
    ProductController.deleteProduct
);

// GET SINGLE Product
router.get(
    '/:id',
    auth("get-product"),
    ProductController.getProduct
);



export const ProductRoutes = router;
