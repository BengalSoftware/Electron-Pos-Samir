import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { BalanceTransferController } from './balanceTransfer.controller';
import { BalanceTransferValidation } from './balanceTransfer.validation';

const router = express.Router();

//GET ALL BalanceTransferS
router.get(
    '/',
    auth("get-all-balanceTransfer"),
    BalanceTransferController.getAllBalanceTransfer
);

// CREATE SINGLE BalanceTransfer
router.post(
    '/create-balanceTransfer',
    validateRequest(
        BalanceTransferValidation.createBalanceTransferZodSchema
    ),
    auth("create-balanceTransfer"),
    BalanceTransferController.createBalanceTransfer
);

// DELETE ALL BalanceTransferS
router.delete(
    '/all',
    auth("delete-all-balanceTransfer"),
    BalanceTransferController.deleteAllBalanceTransfer
);

// UPDATE SINGLE BalanceTransfer
router.patch(
    '/:id',
    validateRequest(
        BalanceTransferValidation.createBalanceTransferZodSchema
    ),
    auth("update-balanceTransfer"),
    BalanceTransferController.updateBalanceTransfer
);

// DELETE SINGLE BalanceTransfer
router.delete(
    '/:id',
    auth("delete-balanceTransfer"),
    BalanceTransferController.deleteBalanceTransfer
);

// GET SINGLE BalanceTransfer
router.get(
    '/:id',
    auth("get-balanceTransfer"),
    BalanceTransferController.getBalanceTransfer
);



export const BalanceTransferRoutes = router;
