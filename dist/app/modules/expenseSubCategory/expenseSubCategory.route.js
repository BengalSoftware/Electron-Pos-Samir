"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseSubCategoryRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const expenseSubCategory_controller_1 = require("./expenseSubCategory.controller");
const expenseSubCategory_validation_1 = require("./expenseSubCategory.validation");
const router = express_1.default.Router();
//GET ALL subcategory
router.get('/', (0, auth_1.default)("get-all-expense-subcategory"), expenseSubCategory_controller_1.SubCategoryController.getAllSubCategories);
// CREATE SINGLE category
router.post('/create-expense-subcategory', (0, validateRequest_1.default)(expenseSubCategory_validation_1.SubCategoryValidation.createSubCategoryZodSchema), (0, auth_1.default)("create-expense-subcategory"), expenseSubCategory_controller_1.SubCategoryController.createSubCategory);
// DELETE ALL subcategory
router.delete('/all', (0, auth_1.default)("delete-all-expense-subcategory"), expenseSubCategory_controller_1.SubCategoryController.deleteAllSubCategories);
// UPDATE SINGLE category
router.patch('/:id', (0, validateRequest_1.default)(expenseSubCategory_validation_1.SubCategoryValidation.createSubCategoryZodSchema), (0, auth_1.default)("update-expense-subcategory"), expenseSubCategory_controller_1.SubCategoryController.updateSubCategory);
// DELETE SINGLE category
router.delete('/:id', (0, auth_1.default)("delete-expense-subcategory"), expenseSubCategory_controller_1.SubCategoryController.deleteSubCategory);
// GET SINGLE category
router.get('/:id', (0, auth_1.default)("get-expense-subcategory"), expenseSubCategory_controller_1.SubCategoryController.getSubCategory);
exports.ExpenseSubCategoryRoutes = router;
