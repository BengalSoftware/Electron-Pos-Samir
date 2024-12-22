import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { ReportsController } from './reports.controller';
import { ReportsValidation } from './reports.validation';

const router = express.Router();

//GET balance sheet reports
router.get(
    '/balance-sheet',
    auth("balance-sheet"),
    ReportsController.getBalanceSheetReport
);

// POST summery report
router.post(
    '/summary-report',
    validateRequest(
        ReportsValidation.createReportsZodSchema
    ),
    auth("summary-report"),
    ReportsController.summeryReport
);

// GET SINGLE Reports
router.post(
    '/product',
    auth("item-reports"),
    ReportsController.getSingleProductReports
);

// GET SINGLE Reports
router.get(
    '/statistics',
    // auth("statistics-reports"),
    ReportsController.getDashboardStatistics
);
// GET SINGLE Reports
router.get(
    '/paymentVsPurchase',
    // auth("statistics-reports"),
    ReportsController.paymentSentVsPaymentReceived
);
// GET SINGLE Reports
router.get(
    '/saleVsPurchase',
    // auth("statistics-reports"),
    ReportsController.saleVsPurchase
);
router.post(
    '/saleVsPurchase',
    // auth("statistics-reports"),
    ReportsController.saleVsPurchaseDaily
);

export const ReportsRoutes = router;
