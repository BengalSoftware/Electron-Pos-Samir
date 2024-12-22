"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionHistoryRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const transactionHistory_controller_1 = require("./transactionHistory.controller");
const transactionHistory_validation_1 = require("./transactionHistory.validation");
const router = express_1.default.Router();
//GET ALL TransactionHistoryS
router.get('/', (0, auth_1.default)("get-all-transactionHistory"), transactionHistory_controller_1.TransactionHistoryController.getAllTransactionHistory);
// CREATE SINGLE TransactionHistory
router.post('/create-transactionHistory', (0, validateRequest_1.default)(transactionHistory_validation_1.TransactionHistoryValidation.createTransactionHistoryZodSchema), (0, auth_1.default)("create-transactionHistory"), transactionHistory_controller_1.TransactionHistoryController.createTransactionHistory);
// DELETE ALL TransactionHistoryS
router.delete('/all', (0, auth_1.default)("delete-all-transactionHistory"), transactionHistory_controller_1.TransactionHistoryController.deleteAllTransactionHistory);
// UPDATE SINGLE TransactionHistory
router.patch('/:id', (0, validateRequest_1.default)(transactionHistory_validation_1.TransactionHistoryValidation.createTransactionHistoryZodSchema), (0, auth_1.default)("update-transactionHistory"), transactionHistory_controller_1.TransactionHistoryController.updateTransactionHistory);
// DELETE SINGLE TransactionHistory
router.delete('/:id', (0, auth_1.default)("delete-transactionHistory"), transactionHistory_controller_1.TransactionHistoryController.deleteTransactionHistory);
// GET SINGLE TransactionHistory
router.get('/:id', (0, auth_1.default)("get-transactionHistory"), transactionHistory_controller_1.TransactionHistoryController.getTransactionHistory);
exports.TransactionHistoryRoutes = router;
