"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseReturnRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const purchaseReturn_controller_1 = require("./purchaseReturn.controller");
const purchaseReturn_validation_1 = require("./purchaseReturn.validation");
const router = express_1.default.Router();
//GET ALL PurchaseReturnS
router.get('/', (0, auth_1.default)("get-all-purchaseReturn"), purchaseReturn_controller_1.PurchaseReturnController.getAllPurchaseReturns);
// CREATE SINGLE PurchaseReturn
router.post('/create-purchaseReturn', (0, validateRequest_1.default)(purchaseReturn_validation_1.PurchaseReturnValidation.createPurchaseReturnZodSchema), (0, auth_1.default)("create-purchaseReturn"), purchaseReturn_controller_1.PurchaseReturnController.createPurchaseReturn);
// DELETE ALL PurchaseReturnS
router.delete('/all', (0, auth_1.default)("delete-all-purchaseReturn"), purchaseReturn_controller_1.PurchaseReturnController.deleteAllPurchaseReturns);
// UPDATE SINGLE PurchaseReturn
router.patch('/:id', 
// validateRequest(
//     PurchaseReturnValidation.createPurchaseReturnZodSchema
// ),
(0, auth_1.default)("update-purchaseReturn"), purchaseReturn_controller_1.PurchaseReturnController.updatePurchaseReturn);
// DELETE SINGLE PurchaseReturn
router.delete('/:id', (0, auth_1.default)("delete-purchaseReturn"), purchaseReturn_controller_1.PurchaseReturnController.deletePurchaseReturn);
// GET SINGLE PurchaseReturn
router.get('/:id', (0, auth_1.default)("get-purchaseReturn"), purchaseReturn_controller_1.PurchaseReturnController.getPurchaseReturn);
exports.PurchaseReturnRoutes = router;
