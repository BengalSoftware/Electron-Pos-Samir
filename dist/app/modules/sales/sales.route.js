"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const sales_controller_1 = require("./sales.controller");
const sales_validation_1 = require("./sales.validation");
const router = express_1.default.Router();
//GET ALL Sales
router.get('/', (0, auth_1.default)("get-all-sales"), sales_controller_1.SalesController.getAllAllSales);
// CREATE SINGLE Sales
router.post('/create-sale', (0, validateRequest_1.default)(sales_validation_1.SalesValidation.createSalesZodSchema), (0, auth_1.default)("create-sales"), sales_controller_1.SalesController.createSales);
// DELETE ALL SalesS
router.delete('/all', (0, auth_1.default)("delete-all-sale"), sales_controller_1.SalesController.deleteAllSaless);
// UPDATE SINGLE Sales
router.patch('/:id', 
// validateRequest(
//     SalesValidation.createSalesZodSchema
// ),
(0, auth_1.default)("update-sale"), sales_controller_1.SalesController.updateSales);
// UPDATE SINGLE Sales
router.patch('/payment/:id', 
// validateRequest(
//     SalesValidation.createSalesZodSchema
// ),
(0, auth_1.default)("add-sale-payment"), sales_controller_1.SalesController.addPayment);
// DELETE SINGLE Sales
router.delete('/:id', (0, auth_1.default)("delete-sale"), sales_controller_1.SalesController.deleteSales);
// GET SINGLE Sales
router.get('/:id', (0, auth_1.default)("get-sale"), sales_controller_1.SalesController.getSales);
exports.SalesRoutes = router;
