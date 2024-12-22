"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManagementOutletRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const outlet_controller_1 = require("./outlet.controller");
const outlet_validation_1 = require("./outlet.validation");
const router = express_1.default.Router();
router.post('/create-outlet', (0, validateRequest_1.default)(outlet_validation_1.ManagementOutletValidation.createManagementOutletZodSchema), 
// auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
outlet_controller_1.ManagementOutletController.createOutlet);
router.get('/:id', (0, auth_1.default)("get-outlet"), outlet_controller_1.ManagementOutletController.getSingleOutlet);
router.patch('/:id', (0, validateRequest_1.default)(outlet_validation_1.ManagementOutletValidation.updateManagementOutletZodSchema), (0, auth_1.default)("update-outlet"), outlet_controller_1.ManagementOutletController.updateOutlet);
router.delete('/:id', (0, auth_1.default)("delete-outlet"), outlet_controller_1.ManagementOutletController.deleteOutlet);
router.get('/', (0, auth_1.default)("get-all-outlet"), outlet_controller_1.ManagementOutletController.getAllOutlets);
exports.ManagementOutletRoutes = router;
