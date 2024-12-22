"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_controller_1 = require("./user.controller");
const user_validation_1 = require("./user.validation");
const router = express_1.default.Router();
router.post('/create-employee', (0, validateRequest_1.default)(user_validation_1.UserValidation.createEmployeeZodSchema), (0, auth_1.default)("create-employee"), user_controller_1.UserController.createEmployee);
router.post('/create-admin', (0, validateRequest_1.default)(user_validation_1.UserValidation.createAdminZodSchema), (0, auth_1.default)("create-admin"), user_controller_1.UserController.createAdmin);
router.post('/create-superadmin', (0, validateRequest_1.default)(user_validation_1.UserValidation.createSuperAdminZodSchema), (0, auth_1.default)("create-superAdmin"), user_controller_1.UserController.createSuperAdmin);
exports.UserRoutes = router;
