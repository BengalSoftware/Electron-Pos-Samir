"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BalanceAdjustmentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const balanceAdjustment_controller_1 = require("./balanceAdjustment.controller");
const balanceAdjustment_validation_1 = require("./balanceAdjustment.validation");
const router = express_1.default.Router();
//GET ALL BalanceAdjustmentS
router.get('/', (0, auth_1.default)("get-all-balanceAdjustment"), balanceAdjustment_controller_1.BalanceAdjustmentController.getAllCategories);
// CREATE SINGLE BalanceAdjustment
router.post('/create-balanceAdjustment', (0, validateRequest_1.default)(balanceAdjustment_validation_1.BalanceAdjustmentValidation.createBalanceAdjustmentZodSchema), (0, auth_1.default)("create-balanceAdjustment"), balanceAdjustment_controller_1.BalanceAdjustmentController.createBalanceAdjustment);
// DELETE ALL BalanceAdjustmentS
router.delete('/all', (0, auth_1.default)("delete-all-balanceAdjustment"), balanceAdjustment_controller_1.BalanceAdjustmentController.deleteAllCategories);
// UPDATE SINGLE BalanceAdjustment
router.patch('/:id', (0, validateRequest_1.default)(balanceAdjustment_validation_1.BalanceAdjustmentValidation.createBalanceAdjustmentZodSchema), (0, auth_1.default)("update-balanceAdjustment"), balanceAdjustment_controller_1.BalanceAdjustmentController.updateBalanceAdjustment);
// DELETE SINGLE BalanceAdjustment
router.delete('/:id', (0, auth_1.default)("delete-balanceAdjustment"), balanceAdjustment_controller_1.BalanceAdjustmentController.deleteBalanceAdjustment);
// GET SINGLE BalanceAdjustment
router.get('/:id', (0, auth_1.default)("get-balanceAdjustment"), balanceAdjustment_controller_1.BalanceAdjustmentController.getBalanceAdjustment);
exports.BalanceAdjustmentRoutes = router;
