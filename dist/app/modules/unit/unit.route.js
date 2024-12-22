"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnitRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const unit_controller_1 = require("./unit.controller");
const unit_validation_1 = require("./unit.validation");
const router = express_1.default.Router();
//GET ALL UnitS
router.get('/', (0, auth_1.default)("get-all-unit"), unit_controller_1.UnitController.getAllCategories);
// CREATE SINGLE Unit
router.post('/create-unit', (0, validateRequest_1.default)(unit_validation_1.UnitValidation.createUnitZodSchema), (0, auth_1.default)("create-unit"), unit_controller_1.UnitController.createUnit);
// DELETE ALL UnitS
router.delete('/all', (0, auth_1.default)("delete-all-unit"), unit_controller_1.UnitController.deleteAllCategories);
// UPDATE SINGLE Unit
router.patch('/:id', (0, validateRequest_1.default)(unit_validation_1.UnitValidation.createUnitZodSchema), (0, auth_1.default)("update-unit"), unit_controller_1.UnitController.updateUnit);
// DELETE SINGLE Unit
router.delete('/:id', (0, auth_1.default)("delete-unit"), unit_controller_1.UnitController.deleteUnit);
// GET SINGLE Unit
router.get('/:id', (0, auth_1.default)("get-unit"), unit_controller_1.UnitController.getUnit);
exports.UnitRoutes = router;
