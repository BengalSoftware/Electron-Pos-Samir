"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const category_controller_1 = require("../category/category.controller");
const category_validation_1 = require("./category.validation");
const router = express_1.default.Router();
//GET ALL categoryS
router.get('/', (0, auth_1.default)("get-all-category"), category_controller_1.CategoryController.getAllCategories);
// CREATE SINGLE category
router.post('/create-category', (0, validateRequest_1.default)(category_validation_1.CategoryValidation.createCategoryZodSchema), (0, auth_1.default)("create-category"), category_controller_1.CategoryController.createCategory);
// DELETE ALL categoryS
router.delete('/all', (0, auth_1.default)("delete-all-category"), category_controller_1.CategoryController.deleteAllCategories);
// UPDATE SINGLE category
router.patch('/:id', (0, validateRequest_1.default)(category_validation_1.CategoryValidation.createCategoryZodSchema), (0, auth_1.default)("update-category"), category_controller_1.CategoryController.updateCategory);
// DELETE SINGLE category
router.delete('/:id', (0, auth_1.default)("delete-category"), category_controller_1.CategoryController.deleteCategory);
// GET SINGLE category
router.get('/:id', (0, auth_1.default)("get-category"), category_controller_1.CategoryController.getCategory);
exports.CategoryRoutes = router;
