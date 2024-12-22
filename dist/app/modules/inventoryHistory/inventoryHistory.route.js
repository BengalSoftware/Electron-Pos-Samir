"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryHistoryRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const inventoryHistory_controller_1 = require("./inventoryHistory.controller");
const inventoryHistory_validation_1 = require("./inventoryHistory.validation");
const router = express_1.default.Router();
//GET ALL InventoryHistoryS
router.get('/', (0, auth_1.default)("get-all-inventoryHistory"), inventoryHistory_controller_1.InventoryHistoryController.getAllInventoryHistories);
// CREATE SINGLE InventoryHistory
router.post('/create-inventoryHistory', (0, validateRequest_1.default)(inventoryHistory_validation_1.InventoryHistoryValidation.createInventoryHistoryZodSchema), (0, auth_1.default)("create-inventoryHistory"), inventoryHistory_controller_1.InventoryHistoryController.createInventoryHistory);
// DELETE ALL InventoryHistoryS
router.delete('/all', (0, auth_1.default)("delete-all-inventoryHistory"), inventoryHistory_controller_1.InventoryHistoryController.deleteAllInventoryHistories);
// UPDATE SINGLE InventoryHistory
router.patch('/:id', 
// validateRequest(
//     InventoryHistoryValidation.createInventoryHistoryZodSchema
// ),
(0, auth_1.default)("update-inventoryHistory"), inventoryHistory_controller_1.InventoryHistoryController.updateInventoryHistory);
// DELETE SINGLE InventoryHistory
router.delete('/:id', (0, auth_1.default)("delete-inventoryHistory"), inventoryHistory_controller_1.InventoryHistoryController.deleteInventoryHistory);
// GET SINGLE InventoryHistory
router.get('/:id', (0, auth_1.default)("get-inventoryHistory"), inventoryHistory_controller_1.InventoryHistoryController.getInventoryHistory);
exports.InventoryHistoryRoutes = router;
