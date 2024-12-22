import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { PaymentHistoryController } from './paymentHistory.controller';
import { PaymentHistoryValidation } from './paymentHistory.validation';

const router = express.Router();

//GET ALL PaymentHistoryS
router.get(
    '/',
    auth("get-all-paymentHistory"),
    PaymentHistoryController.getAllPaymentHistories
);

// CREATE SINGLE PaymentHistory
router.post(
    '/create-paymentHistory',
    validateRequest(
        PaymentHistoryValidation.createPaymentHistoryZodSchema
    ),
    auth("create-paymentHistory"),
    PaymentHistoryController.createPaymentHistory
);

// DELETE ALL PaymentHistoryS
router.delete(
    '/all',
    auth("delete-all-paymentHistory"),
    PaymentHistoryController.deleteAllPaymentHistories
);

// UPDATE SINGLE PaymentHistory
router.patch(
    '/:id',
    // validateRequest(
    //     PaymentHistoryValidation.createPaymentHistoryZodSchema
    // ),
    auth("update-paymentHistory"),
    PaymentHistoryController.updatePaymentHistory
);

// DELETE SINGLE PaymentHistory
router.delete(
    '/:id',
    auth("delete-paymentHistory"),
    PaymentHistoryController.deletePaymentHistory
);

// GET SINGLE PaymentHistory
router.get(
    '/:id',
    auth("get-paymentHistory"),
    PaymentHistoryController.getPaymentHistory
);



export const PaymentHistoryRoutes = router;
