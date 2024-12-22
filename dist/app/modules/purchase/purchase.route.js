"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const purchase_controller_1 = require("./purchase.controller");
const purchase_validation_1 = require("./purchase.validation");
const router = express_1.default.Router();
//GET ALL PurchaseS
router.get('/', (0, auth_1.default)("get-all-purchase"), purchase_controller_1.PurchaseController.getAllPurchases);
// CREATE SINGLE Purchase
router.post('/create-purchase', (0, validateRequest_1.default)(purchase_validation_1.PurchaseValidation.createPurchaseZodSchema), (0, auth_1.default)("create-purchase"), purchase_controller_1.PurchaseController.createPurchase);
// DELETE ALL PurchaseS
router.delete('/all', (0, auth_1.default)("delete-all-purchase"), purchase_controller_1.PurchaseController.deleteAllPurchases);
// UPDATE SINGLE Purchase
router.patch('/:id', 
// validateRequest(
//     PurchaseValidation.createPurchaseZodSchema
// ),
(0, auth_1.default)("update-purchase"), purchase_controller_1.PurchaseController.updatePurchase);
// UPDATE SINGLE Purchase
router.patch('/payment/:id', 
// validateRequest(
//     PurchaseValidation.createPurchaseZodSchema
// ),
(0, auth_1.default)("payment-purchase"), purchase_controller_1.PurchaseController.addPayment);
// DELETE SINGLE Purchase
router.delete('/:id', (0, auth_1.default)("delete-purchase"), purchase_controller_1.PurchaseController.deletePurchase);
// GET SINGLE Purchase
router.get('/:id', (0, auth_1.default)("get-purchase"), purchase_controller_1.PurchaseController.getPurchase);
exports.PurchaseRoutes = router;
