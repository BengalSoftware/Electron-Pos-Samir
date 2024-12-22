"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const product_controller_1 = require("./product.controller");
const product_validation_1 = require("./product.validation");
const router = express_1.default.Router();
//GET ALL ProductS
router.get('/', (0, auth_1.default)("get-all-product"), product_controller_1.ProductController.getAllProducts);
//GET Pos Product
router.get('/pos/:productCode', (0, auth_1.default)("get-all-product"), product_controller_1.ProductController.getPosProducts);
//GET Stock Limit Product
router.get('/stockAlert', (0, auth_1.default)("get-stock-limit-product"), product_controller_1.ProductController.getStockLimitProducts);
// CREATE SINGLE Product
router.post('/create-product', (0, validateRequest_1.default)(product_validation_1.ProductValidation.createProductZodSchema), (0, auth_1.default)("create-product"), product_controller_1.ProductController.createProduct);
// DELETE ALL ProductS
router.delete('/all', (0, auth_1.default)("delete-all-product"), product_controller_1.ProductController.deleteAllProducts);
// UPDATE SINGLE Product
router.patch('/:id', 
// validateRequest(
//     ProductValidation.createProductZodSchema
// ),
(0, auth_1.default)("update-product"), product_controller_1.ProductController.updateProduct);
// DELETE SINGLE Product
router.delete('/:id', (0, auth_1.default)("delete-product"), product_controller_1.ProductController.deleteProduct);
// GET SINGLE Product
router.get('/:id', (0, auth_1.default)("get-product"), product_controller_1.ProductController.getProduct);
exports.ProductRoutes = router;
