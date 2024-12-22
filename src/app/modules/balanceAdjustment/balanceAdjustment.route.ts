import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { BalanceAdjustmentController } from './balanceAdjustment.controller';
import { BalanceAdjustmentValidation } from './balanceAdjustment.validation';

const router = express.Router();

//GET ALL BalanceAdjustmentS
router.get(
    '/',
    auth("get-all-balanceAdjustment"),
    BalanceAdjustmentController.getAllCategories
);

// CREATE SINGLE BalanceAdjustment
router.post(
    '/create-balanceAdjustment',
    validateRequest(
        BalanceAdjustmentValidation.createBalanceAdjustmentZodSchema
    ),
    auth("create-balanceAdjustment"),
    BalanceAdjustmentController.createBalanceAdjustment
);

// DELETE ALL BalanceAdjustmentS
router.delete(
    '/all',
    auth("delete-all-balanceAdjustment"),
    BalanceAdjustmentController.deleteAllCategories
);

// UPDATE SINGLE BalanceAdjustment
router.patch(
    '/:id',
    validateRequest(
        BalanceAdjustmentValidation.createBalanceAdjustmentZodSchema
    ),
    auth("update-balanceAdjustment"),
    BalanceAdjustmentController.updateBalanceAdjustment
);

// DELETE SINGLE BalanceAdjustment
router.delete(
    '/:id',
    auth("delete-balanceAdjustment"),
    BalanceAdjustmentController.deleteBalanceAdjustment
);

// GET SINGLE BalanceAdjustment
router.get(
    '/:id',
    auth("get-balanceAdjustment"),
    BalanceAdjustmentController.getBalanceAdjustment
);



export const BalanceAdjustmentRoutes = router;
