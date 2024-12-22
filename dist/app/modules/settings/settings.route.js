"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsRoutes = void 0;
const express_1 = __importDefault(require("express"));
const uploadFile_1 = __importDefault(require("../../../utils/uploadFile"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const settings_controller_1 = require("./settings.controller");
const settings_validation_1 = require("./settings.validation");
const router = express_1.default.Router();
router.post('/create-settings', (0, auth_1.default)("create-settings"), uploadFile_1.default.fields([
    { name: "whiteLogo", maxCount: 1 },
    { name: "blackLogo", maxCount: 1 },
    { name: "favIcon", maxCount: 1 },
    { name: "smallLogo", maxCount: 1 },
]), 
//multer middleware body is empty so after multer use this validation.
(0, validateRequest_1.default)(settings_validation_1.SettingsValidation.createSettingsZodSchema), settings_controller_1.SettingsController.createSettings);
router.patch('/:id', (0, auth_1.default)("update-settings"), uploadFile_1.default.fields([
    { name: "whiteLogo", maxCount: 1 },
    { name: "blackLogo", maxCount: 1 },
    { name: "favIcon", maxCount: 1 },
    { name: "smallLogo", maxCount: 1 },
]), (0, validateRequest_1.default)(settings_validation_1.SettingsValidation.createSettingsZodSchema), settings_controller_1.SettingsController.updateSettings);
router.delete('/:id', (0, auth_1.default)("delete-settings"), settings_controller_1.SettingsController.deleteSettings);
router.get('/', 
// auth("get-all-settings"),
settings_controller_1.SettingsController.getAllSettings);
exports.SettingsRoutes = router;
