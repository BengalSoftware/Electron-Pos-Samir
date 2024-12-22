"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseValidation = void 0;
const zod_1 = __importDefault(require("zod"));
const productSchema = zod_1.default.object({
    _id: zod_1.default.string({ required_error: 'Product id required' }),
    name: zod_1.default.string({ required_error: 'Product name required' }),
    quantity: zod_1.default.number({ required_error: 'Product quantity required' }),
    purchasePrice: zod_1.default.number({ required_error: 'Product price required' }),
    purchaseVat: zod_1.default.number({ required_error: 'purchaseVat id required' }),
    totalPrice: zod_1.default.number({ required_error: 'totalPrice id required' }),
});
const createPurchaseZodSchema = zod_1.default.object({
    body: zod_1.default.object({
        products: zod_1.default.array(productSchema).refine((arr) => arr.length >= 1, {
            message: 'Products is required',
        }),
        supplier: zod_1.default.object({
            id: zod_1.default.string({ required_error: "supplier id required" }),
            name: zod_1.default.string({ required_error: "supplier name required" })
        }),
        // paymentId: z.array(z.string().optional()),
        invoiceTax: zod_1.default.number({ required_error: "Invoice tax is required" }),
        totalTax: zod_1.default.number({ required_error: "total tax is required" }),
        netTotal: zod_1.default.number({ required_error: "net total is required" }),
        subTotal: zod_1.default.number({ required_error: "net total is required" }),
        poReference: zod_1.default.string().optional(),
        paymentTerms: zod_1.default.string().optional(),
        discount: zod_1.default.number().optional(),
        transportCost: zod_1.default.number().optional(),
        purchaseDate: zod_1.default.string().optional(),
        poDate: zod_1.default.string().optional(),
        note: zod_1.default.string().optional(),
        status: zod_1.default.string({ required_error: "Status is required" }),
        image: zod_1.default.string().optional(),
    })
});
const getPurchaseZodSchema = zod_1.default.object({
    name: zod_1.default.string({
        required_error: "param is required"
    }),
});
exports.PurchaseValidation = {
    getPurchaseZodSchema,
    createPurchaseZodSchema
};
