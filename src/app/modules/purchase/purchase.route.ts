import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { PurchaseController } from './purchase.controller';
import { PurchaseValidation } from './purchase.validation';

const router = express.Router();

//GET ALL PurchaseS
router.get(
    '/',
    auth("get-all-purchase"),
    PurchaseController.getAllPurchases
);

// CREATE SINGLE Purchase
router.post(
    '/create-purchase',
    validateRequest(
        PurchaseValidation.createPurchaseZodSchema
    ),
    auth("create-purchase"),
    PurchaseController.createPurchase
);

// DELETE ALL PurchaseS
router.delete(
    '/all',
    auth("delete-all-purchase"),
    PurchaseController.deleteAllPurchases
);

// UPDATE SINGLE Purchase
router.patch(
    '/:id',
    // validateRequest(
    //     PurchaseValidation.createPurchaseZodSchema
    // ),
    auth("update-purchase"),
    PurchaseController.updatePurchase
);

// UPDATE SINGLE Purchase
router.patch(
    '/payment/:id',
    // validateRequest(
    //     PurchaseValidation.createPurchaseZodSchema
    // ),
    auth("payment-purchase"),
    PurchaseController.addPayment
);

// DELETE SINGLE Purchase
router.delete(
    '/:id',
    auth("delete-purchase"),
    PurchaseController.deletePurchase
);

// GET SINGLE Purchase
router.get(
    '/:id',
    auth("get-purchase"),
    PurchaseController.getPurchase
);



export const PurchaseRoutes = router;
