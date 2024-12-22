"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoanAuthorityRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const loanAuthority_controller_1 = require("./loanAuthority.controller");
const loanAuthority_validation_1 = require("./loanAuthority.validation");
const router = express_1.default.Router();
//GET ALL LoanAuthorityS
router.get('/', (0, auth_1.default)("get-all-loanAuthority"), loanAuthority_controller_1.LoanAuthorityController.getAllLoanAuthority);
// CREATE SINGLE LoanAuthority
router.post('/create-loanAuthority', (0, validateRequest_1.default)(loanAuthority_validation_1.LoanAuthorityValidation.createLoanAuthorityZodSchema), (0, auth_1.default)("create-loanAuthority"), loanAuthority_controller_1.LoanAuthorityController.createLoanAuthority);
// DELETE ALL LoanAuthorityS
router.delete('/all', (0, auth_1.default)("delete-all-loanAuthority"), loanAuthority_controller_1.LoanAuthorityController.deleteAllLoanAuthority);
// UPDATE SINGLE LoanAuthority
router.patch('/:id', (0, validateRequest_1.default)(loanAuthority_validation_1.LoanAuthorityValidation.createLoanAuthorityZodSchema), (0, auth_1.default)("update-loanAuthority"), loanAuthority_controller_1.LoanAuthorityController.updateLoanAuthority);
// DELETE SINGLE LoanAuthority
router.delete('/:id', (0, auth_1.default)("delete-loanAuthority"), loanAuthority_controller_1.LoanAuthorityController.deleteLoanAuthority);
// GET SINGLE LoanAuthority
router.get('/:id', (0, auth_1.default)("get-loanAuthority"), loanAuthority_controller_1.LoanAuthorityController.getLoanAuthority);
exports.LoanAuthorityRoutes = router;
