"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepartmentValidation = void 0;
const zod_1 = __importDefault(require("zod"));
const createDepartmentZodSchema = zod_1.default.object({
    body: zod_1.default.object({
        name: zod_1.default.string({
            required_error: "Role name is required"
        }),
        status: zod_1.default.string({
            required_error: "Status is required"
        }),
    })
});
const getDepartmentZodSchema = zod_1.default.object({
    name: zod_1.default.string({
        required_error: "Param is required"
    }),
});
exports.DepartmentValidation = {
    getDepartmentZodSchema,
    createDepartmentZodSchema
};
