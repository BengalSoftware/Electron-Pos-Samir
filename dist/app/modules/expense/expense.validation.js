"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseValidation = void 0;
const zod_1 = __importDefault(require("zod"));
const createExpenseZodSchema = zod_1.default.object({
    body: zod_1.default.object({
        reason: zod_1.default.string({
            required_error: "Reason is required"
        }),
        category: zod_1.default.object({
            name: zod_1.default.string({ required_error: "category name is required" }),
            id: zod_1.default.string({ required_error: "category id is required" }),
        }),
        account: zod_1.default.object({
            name: zod_1.default.string({ required_error: "account name is required" }),
            id: zod_1.default.string({ required_error: "account id is required" }),
        }),
        subcategory: zod_1.default.object({}).optional(),
        amount: zod_1.default.number({
            required_error: "amount is required"
        }),
        checkNo: zod_1.default.string().optional(),
        voucherNo: zod_1.default.string().optional(),
        branchName: zod_1.default.string().optional(),
        date: zod_1.default.string().optional(),
        note: zod_1.default.string().optional(),
        image: zod_1.default.string().optional(),
    })
});
const getExpenseZodSchema = zod_1.default.object({
    name: zod_1.default.string({
        required_error: "param is required"
    }),
});
exports.ExpenseValidation = {
    getExpenseZodSchema,
    createExpenseZodSchema
};
