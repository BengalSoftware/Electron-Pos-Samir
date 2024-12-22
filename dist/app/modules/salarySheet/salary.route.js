"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalaryRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const salary_controller_1 = require("./salary.controller");
const salary_validation_1 = require("./salary.validation");
const router = express_1.default.Router();
// salary create route defined on user folder
router.post('/create-salary', (0, auth_1.default)("create-salary"), salary_controller_1.SalaryController.createSalary);
router.get('/', (0, auth_1.default)("get-all-salary"), salary_controller_1.SalaryController.getAllSalarySheet);
router.get('/:id', (0, auth_1.default)("get-salary"), salary_controller_1.SalaryController.getSingleSalarySheet);
router.delete('/:id', (0, auth_1.default)("delete-salary"), salary_controller_1.SalaryController.deleteSalarySheet);
router.patch('/:id', (0, validateRequest_1.default)(salary_validation_1.SalaryValidation.updateSalaryZodSchema), (0, auth_1.default)("update-salary"), salary_controller_1.SalaryController.updateSalarySheet);
exports.SalaryRoutes = router;
