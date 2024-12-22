"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrandsRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const brand_controller_1 = require("./brand.controller");
const brand_validation_1 = require("./brand.validation");
const router = express_1.default.Router();
//GET ALL brand
router.get('/', (0, auth_1.default)("get-all-brand"), brand_controller_1.BrandsController.getAllBrand);
// CREATE SINGLE brand
router.post('/create-brand', (0, validateRequest_1.default)(brand_validation_1.BrandValidation.createBrandZodSchema), (0, auth_1.default)("create-brand"), brand_controller_1.BrandsController.createBrand);
// DELETE ALL brandS
router.delete('/all', (0, auth_1.default)("delete-all-brand"), brand_controller_1.BrandsController.deleteAllBrand);
// UPDATE SINGLE brand
router.patch('/:id', (0, validateRequest_1.default)(brand_validation_1.BrandValidation.createBrandZodSchema), (0, auth_1.default)("update-brand"), brand_controller_1.BrandsController.updateBrand);
// DELETE SINGLE brand
router.delete('/:id', (0, auth_1.default)("delete-brand"), brand_controller_1.BrandsController.deleteBrand);
// GET SINGLE brand
router.get('/:id', (0, auth_1.default)("get-brand"), brand_controller_1.BrandsController.getSingleBrand);
exports.BrandsRoutes = router;
