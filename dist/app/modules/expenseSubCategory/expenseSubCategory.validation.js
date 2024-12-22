"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubCategoryValidation = void 0;
const zod_1 = __importDefault(require("zod"));
const createSubCategoryZodSchema = zod_1.default.object({
    body: zod_1.default.object({
        name: zod_1.default.string({
            required_error: "Role name is required"
        }),
        status: zod_1.default.string({
            required_error: "Status is required"
        }),
        note: zod_1.default.string().optional(),
        category: zod_1.default.string({
            required_error: "Category id is required"
        }),
    })
});
const getSubCategoryZodSchema = zod_1.default.object({
    name: zod_1.default.string({
        required_error: "Param is required"
    }),
});
exports.SubCategoryValidation = {
    getSubCategoryZodSchema,
    createSubCategoryZodSchema
};
