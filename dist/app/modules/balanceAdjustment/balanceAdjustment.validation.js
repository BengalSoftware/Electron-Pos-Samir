"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BalanceAdjustmentValidation = void 0;
const zod_1 = __importDefault(require("zod"));
const createBalanceAdjustmentZodSchema = zod_1.default.object({
    body: zod_1.default.object({
        accountId: zod_1.default.string({
            required_error: "Account is required"
        }),
        status: zod_1.default.string({
            required_error: "Status is required"
        }),
        amount: zod_1.default.number({
            required_error: "Amount is required"
        }),
        type: zod_1.default.string({
            required_error: "Type is required"
        }),
        branchName: zod_1.default.string().optional(),
        date: zod_1.default.string().optional(),
        note: zod_1.default.string().optional(),
        image: zod_1.default.string().optional(),
    })
});
const getBalanceAdjustmentZodSchema = zod_1.default.object({
    name: zod_1.default.string({
        required_error: "Param is required"
    }),
});
exports.BalanceAdjustmentValidation = {
    getBalanceAdjustmentZodSchema,
    createBalanceAdjustmentZodSchema
};
