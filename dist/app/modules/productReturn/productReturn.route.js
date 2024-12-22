"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductReturnRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const productReturn_controller_1 = require("./productReturn.controller");
const productReturn_validation_1 = require("./productReturn.validation");
const router = express_1.default.Router();
//GET ALL ProductReturnS
router.get('/', (0, auth_1.default)("get-all-productReturn"), productReturn_controller_1.ProductReturnController.getAllProductReturns);
// CREATE SINGLE ProductReturn
router.post('/create-productReturn', (0, validateRequest_1.default)(productReturn_validation_1.ProductReturnValidation.createProductReturnZodSchema), (0, auth_1.default)("create-productReturn"), productReturn_controller_1.ProductReturnController.createProductReturn);
// DELETE ALL ProductReturnS
router.delete('/all', (0, auth_1.default)("delete-all-productReturn"), productReturn_controller_1.ProductReturnController.deleteAllProductReturns);
// UPDATE SINGLE ProductReturn
router.patch('/:id', 
// validateRequest(
//     ProductReturnValidation.createProductReturnZodSchema
// ),
(0, auth_1.default)("update-productReturn"), productReturn_controller_1.ProductReturnController.updateProductReturn);
// DELETE SINGLE ProductReturn
router.delete('/:id', (0, auth_1.default)("delete-productReturn"), productReturn_controller_1.ProductReturnController.deleteProductReturn);
// GET SINGLE ProductReturn
router.get('/:id', (0, auth_1.default)("get-productReturn"), productReturn_controller_1.ProductReturnController.getProductReturn);
exports.ProductReturnRoutes = router;
