"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleValidation = void 0;
const zod_1 = __importDefault(require("zod"));
const createRoleZodSchema = zod_1.default.object({
    body: zod_1.default.object({
        name: zod_1.default.string({
            required_error: "Role name is required"
        }),
        permissions: zod_1.default.array(zod_1.default.string()),
    })
});
const getRoleZodSchema = zod_1.default.object({
    name: zod_1.default.string({
        required_error: "Param is required"
    }),
});
exports.RoleValidation = {
    createRoleZodSchema,
    getRoleZodSchema
};
