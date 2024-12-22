"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductValidation = void 0;
const zod_1 = __importDefault(require("zod"));
const createProductZodSchema = zod_1.default.object({
    body: zod_1.default.object({
        name: zod_1.default.string({ required_error: "Name is required" }),
        model: zod_1.default.string().optional(),
        image: zod_1.default.array(zod_1.default.string()).optional(),
        barcodeSymbology: zod_1.default.string({ required_error: "barcode symbology is required" }),
        category: zod_1.default.object({
            id: zod_1.default.string({ required_error: "Category id is required" }),
            name: zod_1.default.string({ required_error: "Category name is required" }),
        }),
        subcategory: zod_1.default.object({
            id: zod_1.default.string({ required_error: "Subcategory id is required" }),
            name: zod_1.default.string({ required_error: "Subcategory name is required" }),
        }),
        brand: zod_1.default.string().optional(),
        unit: zod_1.default.string({ required_error: "Unit is required" }),
        vat: zod_1.default.number({ required_error: "Vat is required" }),
        vatType: zod_1.default.string({ required_error: "Vat type is required" }),
        purchasePrice: zod_1.default.number({ required_error: "Price is required " }),
        discountPercentage: zod_1.default.number().optional(),
        sellingPrice: zod_1.default.number({
            required_error: "Selling price is required"
        }),
        note: zod_1.default.string().optional(),
        quantity: zod_1.default.number().optional(),
        alertQuantity: zod_1.default.number().optional(),
        status: zod_1.default.string({ required_error: "Status is required" }),
        //suppliers 
        totalSale: zod_1.default.number().optional(),
        supplier: zod_1.default.string().optional(), //ref with supplier model 
    })
});
const productZodSchema = zod_1.default.object({
    name: zod_1.default.string({
        required_error: "Param is required"
    }),
});
exports.ProductValidation = {
    productZodSchema,
    createProductZodSchema
};
