"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionHistoryValidation = void 0;
const zod_1 = __importDefault(require("zod"));
const createTransactionHistoryZodSchema = zod_1.default.object({
    body: zod_1.default.object({
        reason: zod_1.default.string({
            required_error: "Reason is required"
        }),
        amount: zod_1.default.string({
            required_error: "Amount number name is required"
        }),
        account: zod_1.default.string({
            required_error: "Account number is required"
        }),
        status: zod_1.default.string({
            required_error: "Status is required"
        }),
        type: zod_1.default.string({
            required_error: "Type is required debit/credit"
        }),
        createdBy: zod_1.default.string({
            required_error: "Created by is required"
        }),
        date: zod_1.default.string().optional(),
        note: zod_1.default.string().optional(),
    })
});
const getTransactionHistoryZodSchema = zod_1.default.object({
    name: zod_1.default.string({
        required_error: "Param is required"
    }),
});
exports.TransactionHistoryValidation = {
    getTransactionHistoryZodSchema,
    createTransactionHistoryZodSchema
};
