"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const account_controller_1 = require("./account.controller");
const account_validation_1 = require("./account.validation");
const router = express_1.default.Router();
//GET ALL AccountS
router.get('/', (0, auth_1.default)("get-all-account"), account_controller_1.AccountController.getAllCategories);
// CREATE SINGLE Account
router.post('/create-account', (0, validateRequest_1.default)(account_validation_1.AccountValidation.createAccountZodSchema), (0, auth_1.default)("create-account"), account_controller_1.AccountController.createAccount);
// DELETE ALL AccountS
router.delete('/all', (0, auth_1.default)("delete-all-account"), account_controller_1.AccountController.deleteAllCategories);
// UPDATE SINGLE Account
router.patch('/:id', (0, validateRequest_1.default)(account_validation_1.AccountValidation.createAccountZodSchema), (0, auth_1.default)("update-account"), account_controller_1.AccountController.updateAccount);
// DELETE SINGLE Account
router.delete('/:id', (0, auth_1.default)("delete-account"), account_controller_1.AccountController.deleteAccount);
// GET SINGLE Account
router.get('/:id', (0, auth_1.default)("get-account"), account_controller_1.AccountController.getAccount);
exports.AccountRoutes = router;
