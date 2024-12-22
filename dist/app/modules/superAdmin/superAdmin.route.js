"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuperAdminRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const superAdmin_controller_1 = require("./superAdmin.controller");
const superAdmin_validation_1 = require("./superAdmin.validation");
const router = express_1.default.Router();
router.get('/:id', (0, auth_1.default)("get-superAdmin"), superAdmin_controller_1.SuperAdminController.getSingleSuperAdmin);
router.get('/', (0, auth_1.default)("get-all-superAdmin"), superAdmin_controller_1.SuperAdminController.getAllSuperAdmins);
router.patch('/:id', (0, validateRequest_1.default)(superAdmin_validation_1.SuperAdminValidation.updateSuperAdmin), (0, auth_1.default)("update-superAdmin"), superAdmin_controller_1.SuperAdminController.updateSuperAdmin);
router.delete('/:id', (0, auth_1.default)("delete-superAdmin"), superAdmin_controller_1.SuperAdminController.deleteSuperAdmin);
exports.SuperAdminRoutes = router;
