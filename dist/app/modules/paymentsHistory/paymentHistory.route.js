"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentHistoryRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const paymentHistory_controller_1 = require("./paymentHistory.controller");
const paymentHistory_validation_1 = require("./paymentHistory.validation");
const router = express_1.default.Router();
//GET ALL PaymentHistoryS
router.get('/', (0, auth_1.default)("get-all-paymentHistory"), paymentHistory_controller_1.PaymentHistoryController.getAllPaymentHistories);
// CREATE SINGLE PaymentHistory
router.post('/create-paymentHistory', (0, validateRequest_1.default)(paymentHistory_validation_1.PaymentHistoryValidation.createPaymentHistoryZodSchema), (0, auth_1.default)("create-paymentHistory"), paymentHistory_controller_1.PaymentHistoryController.createPaymentHistory);
// DELETE ALL PaymentHistoryS
router.delete('/all', (0, auth_1.default)("delete-all-paymentHistory"), paymentHistory_controller_1.PaymentHistoryController.deleteAllPaymentHistories);
// UPDATE SINGLE PaymentHistory
router.patch('/:id', 
// validateRequest(
//     PaymentHistoryValidation.createPaymentHistoryZodSchema
// ),
(0, auth_1.default)("update-paymentHistory"), paymentHistory_controller_1.PaymentHistoryController.updatePaymentHistory);
// DELETE SINGLE PaymentHistory
router.delete('/:id', (0, auth_1.default)("delete-paymentHistory"), paymentHistory_controller_1.PaymentHistoryController.deletePaymentHistory);
// GET SINGLE PaymentHistory
router.get('/:id', (0, auth_1.default)("get-paymentHistory"), paymentHistory_controller_1.PaymentHistoryController.getPaymentHistory);
exports.PaymentHistoryRoutes = router;
