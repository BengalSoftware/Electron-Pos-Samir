"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportsValidation = void 0;
const zod_1 = __importDefault(require("zod"));
const createReportsZodSchema = zod_1.default.object({
    body: zod_1.default.object({
        month: zod_1.default.number({
            required_error: "Month is required"
        }),
        year: zod_1.default.number({
            required_error: "Year is required"
        }),
    })
});
const getReportsZodSchema = zod_1.default.object({
    name: zod_1.default.string({
        required_error: "Param is required"
    }),
});
exports.ReportsValidation = {
    getReportsZodSchema,
    createReportsZodSchema
};
