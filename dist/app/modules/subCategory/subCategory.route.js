"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubCategoryRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const subCategory_controller_1 = require("./subCategory.controller");
const subCategory_validation_1 = require("./subCategory.validation");
const router = express_1.default.Router();
//GET ALL subcategory
router.get('/', (0, auth_1.default)("get-all-subcategory"), subCategory_controller_1.SubCategoryController.getAllSubCategories);
// CREATE SINGLE category
router.post('/create-subcategory', (0, validateRequest_1.default)(subCategory_validation_1.SubCategoryValidation.createSubCategoryZodSchema), (0, auth_1.default)("create-subcategory"), subCategory_controller_1.SubCategoryController.createSubCategory);
// DELETE ALL subcategory
router.delete('/all', (0, auth_1.default)("delete-all-subcategory"), subCategory_controller_1.SubCategoryController.deleteAllSubCategories);
// UPDATE SINGLE category
router.patch('/:id', (0, validateRequest_1.default)(subCategory_validation_1.SubCategoryValidation.createSubCategoryZodSchema), (0, auth_1.default)("update-subcategory"), subCategory_controller_1.SubCategoryController.updateSubCategory);
// DELETE SINGLE category
router.delete('/:id', (0, auth_1.default)("delete-subcategory"), subCategory_controller_1.SubCategoryController.deleteSubCategory);
// GET SINGLE category
router.get('/:id', (0, auth_1.default)("get-subcategory"), subCategory_controller_1.SubCategoryController.getSubCategory);
exports.SubCategoryRoutes = router;
