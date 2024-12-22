"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupplierRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const supplier_controller_1 = require("../supplier/supplier.controller");
const supplier_validation_1 = require("./supplier.validation");
const router = express_1.default.Router();
//GET ALL SupplierS
router.get('/', (0, auth_1.default)("get-all-supplier"), supplier_controller_1.SupplierController.getAllCategories);
// CREATE SINGLE Supplier
router.post('/create-supplier', (0, validateRequest_1.default)(supplier_validation_1.SupplierValidation.createSupplierZodSchema), (0, auth_1.default)("create-supplier"), supplier_controller_1.SupplierController.createSupplier);
// DELETE ALL SupplierS
router.delete('/all', (0, auth_1.default)("delete-all-supplier"), supplier_controller_1.SupplierController.deleteAllSuppliers);
// UPDATE SINGLE Supplier
router.patch('/:id', (0, validateRequest_1.default)(supplier_validation_1.SupplierValidation.createSupplierZodSchema), (0, auth_1.default)("update-supplier"), supplier_controller_1.SupplierController.updateSupplier);
// DELETE SINGLE Supplier
router.delete('/:id', (0, auth_1.default)("delete-supplier"), supplier_controller_1.SupplierController.deleteSupplier);
// GET SINGLE Supplier
router.get('/:id', (0, auth_1.default)("get-supplier"), supplier_controller_1.SupplierController.getSupplier);
exports.SupplierRoutes = router;
