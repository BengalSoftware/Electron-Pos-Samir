"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountValidation = void 0;
const zod_1 = __importDefault(require("zod"));
const createAccountZodSchema = zod_1.default.object({
    body: zod_1.default.object({
        bankName: zod_1.default.string({
            required_error: "Bank name name is required"
        }),
        accountNumber: zod_1.default.string({
            required_error: "Account number name is required"
        }),
        status: zod_1.default.string({
            required_error: "Status is required"
        }),
        branchName: zod_1.default.string().optional(),
        date: zod_1.default.string().optional(),
        note: zod_1.default.string().optional(),
        image: zod_1.default.string().optional(),
    })
});
const getAccountZodSchema = zod_1.default.object({
    name: zod_1.default.string({
        required_error: "Param is required"
    }),
});
exports.AccountValidation = {
    getAccountZodSchema,
    createAccountZodSchema
};
