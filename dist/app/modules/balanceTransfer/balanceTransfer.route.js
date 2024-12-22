"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BalanceTransferRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const balanceTransfer_controller_1 = require("./balanceTransfer.controller");
const balanceTransfer_validation_1 = require("./balanceTransfer.validation");
const router = express_1.default.Router();
//GET ALL BalanceTransferS
router.get('/', (0, auth_1.default)("get-all-balanceTransfer"), balanceTransfer_controller_1.BalanceTransferController.getAllBalanceTransfer);
// CREATE SINGLE BalanceTransfer
router.post('/create-balanceTransfer', (0, validateRequest_1.default)(balanceTransfer_validation_1.BalanceTransferValidation.createBalanceTransferZodSchema), (0, auth_1.default)("create-balanceTransfer"), balanceTransfer_controller_1.BalanceTransferController.createBalanceTransfer);
// DELETE ALL BalanceTransferS
router.delete('/all', (0, auth_1.default)("delete-all-balanceTransfer"), balanceTransfer_controller_1.BalanceTransferController.deleteAllBalanceTransfer);
// UPDATE SINGLE BalanceTransfer
router.patch('/:id', (0, validateRequest_1.default)(balanceTransfer_validation_1.BalanceTransferValidation.createBalanceTransferZodSchema), (0, auth_1.default)("update-balanceTransfer"), balanceTransfer_controller_1.BalanceTransferController.updateBalanceTransfer);
// DELETE SINGLE BalanceTransfer
router.delete('/:id', (0, auth_1.default)("delete-balanceTransfer"), balanceTransfer_controller_1.BalanceTransferController.deleteBalanceTransfer);
// GET SINGLE BalanceTransfer
router.get('/:id', (0, auth_1.default)("get-balanceTransfer"), balanceTransfer_controller_1.BalanceTransferController.getBalanceTransfer);
exports.BalanceTransferRoutes = router;
