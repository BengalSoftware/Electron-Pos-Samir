"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryAdjustmentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const inventoryAdjustment_controller_1 = require("./inventoryAdjustment.controller");
const inventoryAdjustment_validation_1 = require("./inventoryAdjustment.validation");
const router = express_1.default.Router();
//GET ALL InventoryAdjustmentS
router.get('/', (0, auth_1.default)("get-all-inventoryAdjustment"), inventoryAdjustment_controller_1.InventoryAdjustmentController.getAllCategories);
// CREATE SINGLE InventoryAdjustment
router.post('/create-inventoryAdjustment', (0, validateRequest_1.default)(inventoryAdjustment_validation_1.InventoryAdjustmentValidation.createInventoryAdjustmentZodSchema), (0, auth_1.default)("create-inventoryAdjustment"), inventoryAdjustment_controller_1.InventoryAdjustmentController.createInventoryAdjustment);
// DELETE ALL InventoryAdjustmentS
router.delete('/all', (0, auth_1.default)("delete-all-inventoryAdjustment"), inventoryAdjustment_controller_1.InventoryAdjustmentController.deleteAllCategories);
// UPDATE SINGLE InventoryAdjustment
router.patch('/:id', (0, validateRequest_1.default)(inventoryAdjustment_validation_1.InventoryAdjustmentValidation.createInventoryAdjustmentZodSchema), (0, auth_1.default)("update-inventoryAdjustment"), inventoryAdjustment_controller_1.InventoryAdjustmentController.updateInventoryAdjustment);
// DELETE SINGLE InventoryAdjustment
router.delete('/:id', (0, auth_1.default)("delete-inventoryAdjustment"), inventoryAdjustment_controller_1.InventoryAdjustmentController.deleteInventoryAdjustment);
// GET SINGLE InventoryAdjustment
router.get('/:id', (0, auth_1.default)("get-inventoryAdjustment"), inventoryAdjustment_controller_1.InventoryAdjustmentController.getInventoryAdjustment);
exports.InventoryAdjustmentRoutes = router;
