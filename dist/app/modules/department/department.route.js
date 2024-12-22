"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepartmentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const department_controller_1 = require("../department/department.controller");
const department_validation_1 = require("./department.validation");
const router = express_1.default.Router();
//GET ALL DepartmentS
router.get('/', (0, auth_1.default)("get-all-department"), department_controller_1.DepartmentController.getAllDepartments);
// CREATE SINGLE Department
router.post('/create-department', (0, validateRequest_1.default)(department_validation_1.DepartmentValidation.createDepartmentZodSchema), (0, auth_1.default)("create-department"), department_controller_1.DepartmentController.createDepartment);
// DELETE ALL DepartmentS
router.delete('/all', (0, auth_1.default)("delete-all-department"), department_controller_1.DepartmentController.deleteAllDepartments);
// UPDATE SINGLE Department
router.patch('/:id', (0, validateRequest_1.default)(department_validation_1.DepartmentValidation.createDepartmentZodSchema), (0, auth_1.default)("update-department"), department_controller_1.DepartmentController.updateDepartment);
// DELETE SINGLE Department
router.delete('/:id', (0, auth_1.default)("delete-department"), department_controller_1.DepartmentController.deleteDepartment);
// GET SINGLE Department
router.get('/:id', (0, auth_1.default)("get-department"), department_controller_1.DepartmentController.getDepartment);
exports.DepartmentRoutes = router;
