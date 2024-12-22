import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { PurchaseReturnController } from './purchaseReturn.controller';
import { PurchaseReturnValidation } from './purchaseReturn.validation';

const router = express.Router();

//GET ALL PurchaseReturnS
router.get(
    '/',
    auth("get-all-purchaseReturn"),
    PurchaseReturnController.getAllPurchaseReturns
);

// CREATE SINGLE PurchaseReturn
router.post(
    '/create-purchaseReturn',
    validateRequest(
        PurchaseReturnValidation.createPurchaseReturnZodSchema
    ),
    auth("create-purchaseReturn"),
    PurchaseReturnController.createPurchaseReturn
);

// DELETE ALL PurchaseReturnS
router.delete(
    '/all',
    auth("delete-all-purchaseReturn"),
    PurchaseReturnController.deleteAllPurchaseReturns
);

// UPDATE SINGLE PurchaseReturn
router.patch(
    '/:id',
    // validateRequest(
    //     PurchaseReturnValidation.createPurchaseReturnZodSchema
    // ),
    auth("update-purchaseReturn"),
    PurchaseReturnController.updatePurchaseReturn
);

// DELETE SINGLE PurchaseReturn
router.delete(
    '/:id',
    auth("delete-purchaseReturn"),
    PurchaseReturnController.deletePurchaseReturn
);

// GET SINGLE PurchaseReturn
router.get(
    '/:id',
    auth("get-purchaseReturn"),
    PurchaseReturnController.getPurchaseReturn
);



export const PurchaseReturnRoutes = router;
