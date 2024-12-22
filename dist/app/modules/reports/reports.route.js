"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportsRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const reports_controller_1 = require("./reports.controller");
const reports_validation_1 = require("./reports.validation");
const router = express_1.default.Router();
//GET balance sheet reports
router.get('/balance-sheet', (0, auth_1.default)("balance-sheet"), reports_controller_1.ReportsController.getBalanceSheetReport);
// POST summery report
router.post('/summary-report', (0, validateRequest_1.default)(reports_validation_1.ReportsValidation.createReportsZodSchema), (0, auth_1.default)("summary-report"), reports_controller_1.ReportsController.summeryReport);
// GET SINGLE Reports
router.post('/product', (0, auth_1.default)("item-reports"), reports_controller_1.ReportsController.getSingleProductReports);
// GET SINGLE Reports
router.get('/statistics', 
// auth("statistics-reports"),
reports_controller_1.ReportsController.getDashboardStatistics);
// GET SINGLE Reports
router.get('/paymentVsPurchase', 
// auth("statistics-reports"),
reports_controller_1.ReportsController.paymentSentVsPaymentReceived);
// GET SINGLE Reports
router.get('/saleVsPurchase', 
// auth("statistics-reports"),
reports_controller_1.ReportsController.saleVsPurchase);
router.post('/saleVsPurchase', 
// auth("statistics-reports"),
reports_controller_1.ReportsController.saleVsPurchaseDaily);
exports.ReportsRoutes = router;
