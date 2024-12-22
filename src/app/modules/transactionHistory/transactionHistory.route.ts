import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { TransactionHistoryController } from './transactionHistory.controller';
import { TransactionHistoryValidation } from './transactionHistory.validation';

const router = express.Router();

//GET ALL TransactionHistoryS
router.get(
    '/',
    auth("get-all-transactionHistory"),
    TransactionHistoryController.getAllTransactionHistory
);

// CREATE SINGLE TransactionHistory
router.post(
    '/create-transactionHistory',
    validateRequest(
        TransactionHistoryValidation.createTransactionHistoryZodSchema
    ),
    auth("create-transactionHistory"),
    TransactionHistoryController.createTransactionHistory
);

// DELETE ALL TransactionHistoryS
router.delete(
    '/all',
    auth("delete-all-transactionHistory"),
    TransactionHistoryController.deleteAllTransactionHistory
);

// UPDATE SINGLE TransactionHistory
router.patch(
    '/:id',
    validateRequest(
        TransactionHistoryValidation.createTransactionHistoryZodSchema
    ),
    auth("update-transactionHistory"),
    TransactionHistoryController.updateTransactionHistory
);

// DELETE SINGLE TransactionHistory
router.delete(
    '/:id',
    auth("delete-transactionHistory"),
    TransactionHistoryController.deleteTransactionHistory
);

// GET SINGLE TransactionHistory
router.get(
    '/:id',
    auth("get-transactionHistory"),
    TransactionHistoryController.getTransactionHistory
);



export const TransactionHistoryRoutes = router;
