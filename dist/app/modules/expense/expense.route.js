"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const expense_controller_1 = require("./expense.controller");
const expense_validation_1 = require("./expense.validation");
const router = express_1.default.Router();
//GET ALL ExpenseS
router.get('/', (0, auth_1.default)("get-all-expense"), expense_controller_1.ExpenseController.getAllCategories);
// CREATE SINGLE Expense
router.post('/create-expense', (0, validateRequest_1.default)(expense_validation_1.ExpenseValidation.createExpenseZodSchema), (0, auth_1.default)("create-expense"), expense_controller_1.ExpenseController.createExpense);
// DELETE ALL ExpenseS
router.delete('/all', (0, auth_1.default)("delete-all-expense"), expense_controller_1.ExpenseController.deleteAllCategories);
// UPDATE SINGLE Expense
router.patch('/:id', (0, validateRequest_1.default)(expense_validation_1.ExpenseValidation.createExpenseZodSchema), (0, auth_1.default)("update-expense"), expense_controller_1.ExpenseController.updateExpense);
// DELETE SINGLE Expense
router.delete('/:id', (0, auth_1.default)("delete-expense"), expense_controller_1.ExpenseController.deleteExpense);
// GET SINGLE Expense
router.get('/:id', (0, auth_1.default)("get-expense"), expense_controller_1.ExpenseController.getExpense);
exports.ExpenseRoutes = router;
