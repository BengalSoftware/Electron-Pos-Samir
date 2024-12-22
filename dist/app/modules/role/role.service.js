"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleService = void 0;
const role_model_1 = require("./role.model");
const createRole = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield role_model_1.Role.create(payload);
    return result;
});
const getAllRoles = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield role_model_1.Role.find({})
        // .sort({ createdAt: "desc" })
        .select({ permissions: 0 });
    return result;
});
const getSingleRole = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield role_model_1.Role.findById(payload);
    return result;
});
const deleteRole = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    yield role_model_1.Role.findByIdAndDelete(payload);
});
const deleteAllRoles = () => __awaiter(void 0, void 0, void 0, function* () {
    yield role_model_1.Role.deleteMany({});
});
// UPDATE ROLE
const updateRole = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield role_model_1.Role.findOneAndUpdate({ _id: id }, { permissions: payload.permissions, name: payload.name }, { new: true });
    return result;
});
exports.RoleService = {
    createRole,
    getSingleRole,
    updateRole,
    getAllRoles,
    deleteRole,
    deleteAllRoles
};
