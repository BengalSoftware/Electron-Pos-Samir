"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const admin_controller_1 = require("./admin.controller");
const admin_validation_1 = require("./admin.validation");
const router = express_1.default.Router();
router.get('/:id', (0, auth_1.default)("get-admin"), admin_controller_1.AdminController.getSingleAdmin);
router.get('/', (0, auth_1.default)("get-all-admin"), admin_controller_1.AdminController.getAllAdmins);
router.patch('/:id', (0, validateRequest_1.default)(admin_validation_1.AdminValidation.updateAdmin), (0, auth_1.default)("update-admin"), admin_controller_1.AdminController.updateAdmin);
router.delete('/:id', (0, auth_1.default)("delete-admin"), admin_controller_1.AdminController.deleteAdmin);
exports.AdminRoutes = router;
