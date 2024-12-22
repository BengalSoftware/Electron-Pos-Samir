"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const client_controller_1 = require("../client/client.controller");
const client_validation_1 = require("./client.validation");
const router = express_1.default.Router();
//GET ALL ClientS
router.get('/', (0, auth_1.default)("get-all-client"), client_controller_1.ClientController.getAllClients);
// CREATE SINGLE Client
router.post('/create-client', (0, validateRequest_1.default)(client_validation_1.ClientValidation.createClientZodSchema), (0, auth_1.default)("create-client"), client_controller_1.ClientController.createClient);
// DELETE ALL ClientS
router.delete('/all', (0, auth_1.default)("delete-all-client"), client_controller_1.ClientController.deleteAllClients);
// UPDATE SINGLE Client
router.patch('/:id', (0, validateRequest_1.default)(client_validation_1.ClientValidation.createClientZodSchema), (0, auth_1.default)("update-client"), client_controller_1.ClientController.updateClient);
// DELETE SINGLE Client
router.delete('/:id', (0, auth_1.default)("delete-client"), client_controller_1.ClientController.deleteClient);
// GET SINGLE Client
router.get('/:id', (0, auth_1.default)("get-client"), client_controller_1.ClientController.getClient);
exports.ClientRoutes = router;
