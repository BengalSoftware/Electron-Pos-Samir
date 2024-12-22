"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseCategoryRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const expenseCategory_controller_1 = require("./expenseCategory.controller");
const expenseCategory_validation_1 = require("./expenseCategory.validation");
const router = express_1.default.Router();
//GET ALL categoryS
router.get('/', (0, auth_1.default)("get-all-expense-category"), expenseCategory_controller_1.ExpenseCategoryController.getAllCategories);
// CREATE SINGLE category
router.post('/create-expense-category', (0, validateRequest_1.default)(expenseCategory_validation_1.CategoryValidation.createCategoryZodSchema), (0, auth_1.default)("create-expense-category"), expenseCategory_controller_1.ExpenseCategoryController.createCategory);
// DELETE ALL categoryS
router.delete('/all', (0, auth_1.default)("delete-all-expense-category"), expenseCategory_controller_1.ExpenseCategoryController.deleteAllCategories);
// UPDATE SINGLE category
router.patch('/:id', (0, validateRequest_1.default)(expenseCategory_validation_1.CategoryValidation.createCategoryZodSchema), (0, auth_1.default)("update-expense-category"), expenseCategory_controller_1.ExpenseCategoryController.updateCategory);
// DELETE SINGLE category
router.delete('/:id', (0, auth_1.default)("delete-expense-category"), expenseCategory_controller_1.ExpenseCategoryController.deleteCategory);
// GET SINGLE category
router.get('/:id', (0, auth_1.default)("get-expense-category"), expenseCategory_controller_1.ExpenseCategoryController.getCategory);
exports.ExpenseCategoryRoutes = router;
