"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const role_controller_1 = require("./role.controller");
const role_validation_1 = require("./role.validation");
const router = express_1.default.Router();
//GET ALL ROLES
router.get('/', (0, auth_1.default)("get-all-role"), role_controller_1.RoleController.getAllRoles);
// CREATE SINGLE ROLE
router.post('/create-role', (0, validateRequest_1.default)(role_validation_1.RoleValidation.createRoleZodSchema), (0, auth_1.default)("create-role"), role_controller_1.RoleController.createRole);
// DELETE ALL ROLES
router.delete('/all', (0, auth_1.default)("delete-all-role"), role_controller_1.RoleController.deleteAllRoles);
// UPDATE SINGLE ROLE
router.patch('/:id', (0, validateRequest_1.default)(role_validation_1.RoleValidation.createRoleZodSchema), (0, auth_1.default)("update-role"), role_controller_1.RoleController.updateRole);
// DELETE SINGLE ROLE
router.delete('/:id', (0, auth_1.default)("delete-role"), role_controller_1.RoleController.deleteRole);
// GET SINGLE ROLE
router.get('/:id', (0, auth_1.default)("get-role"), role_controller_1.RoleController.getRole);
exports.RoleRoutes = router;
