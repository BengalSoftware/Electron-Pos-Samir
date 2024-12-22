import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { SalesController } from './sales.controller';
import { SalesValidation } from './sales.validation';

const router = express.Router();

//GET ALL Sales
router.get(
    '/',
    auth("get-all-sales"),
    SalesController.getAllAllSales
);

// CREATE SINGLE Sales
router.post(
    '/create-sale',
    validateRequest(
        SalesValidation.createSalesZodSchema
    ),
    auth("create-sales"),
    SalesController.createSales
);

// DELETE ALL SalesS
router.delete(
    '/all',
    auth("delete-all-sale"),
    SalesController.deleteAllSaless
);

// UPDATE SINGLE Sales
router.patch(
    '/:id',
    // validateRequest(
    //     SalesValidation.createSalesZodSchema
    // ),
    auth("update-sale"),
    SalesController.updateSales
);

// UPDATE SINGLE Sales
router.patch(
    '/payment/:id',
    // validateRequest(
    //     SalesValidation.createSalesZodSchema
    // ),
    auth("add-sale-payment"),
    SalesController.addPayment
);

// DELETE SINGLE Sales
router.delete(
    '/:id',
    auth("delete-sale"),
    SalesController.deleteSales
);

// GET SINGLE Sales
router.get(
    '/:id',
    auth("get-sale"),
    SalesController.getSales
);



export const SalesRoutes = router;
