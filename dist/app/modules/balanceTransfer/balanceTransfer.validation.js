"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BalanceTransferValidation = void 0;
const zod_1 = __importDefault(require("zod"));
const createBalanceTransferZodSchema = zod_1.default.object({
    body: zod_1.default.object({
        fromAccount: zod_1.default.string({
            required_error: "From account is required"
        }),
        toAccount: zod_1.default.string({
            required_error: "To account is required"
        }),
        status: zod_1.default.string({
            required_error: "Status is required"
        }),
        amount: zod_1.default.number({
            required_error: "Amount is required"
        }),
        date: zod_1.default.string().optional(),
        note: zod_1.default.string().optional(),
        image: zod_1.default.string().optional(),
    })
});
const getBalanceTransferZodSchema = zod_1.default.object({
    name: zod_1.default.string({
        required_error: "Param is required"
    }),
});
exports.BalanceTransferValidation = {
    getBalanceTransferZodSchema,
    createBalanceTransferZodSchema
};
