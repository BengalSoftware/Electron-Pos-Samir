"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupplierValidation = void 0;
const zod_1 = __importDefault(require("zod"));
const createSupplierZodSchema = zod_1.default.object({
    body: zod_1.default.object({
        name: zod_1.default.string({
            required_error: 'Name is required',
        }),
        // supplierId: z.string({
        //     required_error: 'Id is required',
        // }),
        contactNo: zod_1.default.string({
            required_error: 'Contact number is required',
        }),
        status: zod_1.default.string({ required_error: "Status is required" }),
        email: zod_1.default.string().optional(),
        companyName: zod_1.default.string().optional(),
        emergencyContactNo: zod_1.default.string().optional(),
        profileImage: zod_1.default.string().optional(),
        note: zod_1.default.string().optional(),
        address: zod_1.default.string().optional(),
    }),
});
const getSupplierZodSchema = zod_1.default.object({
    name: zod_1.default.string({
        required_error: "Param is required"
    }),
});
exports.SupplierValidation = {
    getSupplierZodSchema,
    createSupplierZodSchema
};
