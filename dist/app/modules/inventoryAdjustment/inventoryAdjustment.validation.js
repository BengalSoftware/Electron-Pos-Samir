"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryAdjustmentValidation = void 0;
const zod_1 = __importDefault(require("zod"));
const productSchema = zod_1.default.object({
    _id: zod_1.default.string({ required_error: 'Product id required' }),
    name: zod_1.default.string({ required_error: 'Product name required' }),
    adjustmentQty: zod_1.default.number({ required_error: 'Product quantity required' }),
    price: zod_1.default.number({ required_error: 'Product price required' }),
    type: zod_1.default.string({ required_error: 'Type is required' }),
    code: zod_1.default.string({ required_error: 'Product code is required' }),
});
const createInventoryAdjustmentZodSchema = zod_1.default.object({
    body: zod_1.default.object({
        products: zod_1.default.array(productSchema).refine((arr) => arr.length >= 1, {
            message: 'Minimum one product returned quantity is required!',
        }),
        status: zod_1.default.string({ required_error: "Status is required" }),
        date: zod_1.default.string().optional(),
        note: zod_1.default.string().optional(),
        createdBy: zod_1.default.string().optional(),
    })
});
const getInventoryAdjustmentZodSchema = zod_1.default.object({
    name: zod_1.default.string({
        required_error: "Param is required"
    }),
});
exports.InventoryAdjustmentValidation = {
    getInventoryAdjustmentZodSchema,
    createInventoryAdjustmentZodSchema
};
