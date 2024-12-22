"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const employee_controller_1 = require("./employee.controller");
const employee_validation_1 = require("./employee.validation");
const router = express_1.default.Router();
// employee create route defined on user folder
router.get('/', (0, auth_1.default)("get-all-employee"), employee_controller_1.EmployeeController.getAllEmployees);
router.get('/:id', (0, auth_1.default)("get-employee"), employee_controller_1.EmployeeController.getSingleEmployee);
router.delete('/:id', (0, auth_1.default)("delete-employee"), employee_controller_1.EmployeeController.deleteEmployee);
router.patch('/:id', (0, validateRequest_1.default)(employee_validation_1.EmployeeValidation.updateEmployeeZodSchema), (0, auth_1.default)("update-employee"), employee_controller_1.EmployeeController.updateEmployee);
exports.EmployeeRoutes = router;
