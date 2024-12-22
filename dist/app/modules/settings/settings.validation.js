"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsValidation = void 0;
const zod_1 = require("zod");
const createSettingsZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        // company information
        companyName: zod_1.z.string({
            required_error: "companyName is required"
        }),
        companyTagline: zod_1.z.string({
            required_error: "companyTagline is required"
        }),
        companyEmail: zod_1.z.string({
            required_error: "companyEmail is required"
        }),
        companyPhone: zod_1.z.string({
            required_error: "companyPhone is required"
        }),
        companyAddress: zod_1.z.string({
            required_error: "companyAddress is required"
        }),
        // prefixes
        clientPrefix: zod_1.z.string({
            required_error: "clientPrefix is required"
        }),
        supplierPrefix: zod_1.z.string({
            required_error: "supplierPrefix is required"
        }),
        employeePrefix: zod_1.z.string({
            required_error: "employeePrefix is required"
        }),
        productPrefix: zod_1.z.string({
            required_error: "productPrefix is required"
        }),
        purchasePrefix: zod_1.z.string({
            required_error: "purchasePrefix is required"
        }),
        purchaseReturnPrefix: zod_1.z.string({
            required_error: "purchaseReturnPrefix is required"
        }),
        invoicePrefix: zod_1.z.string({
            required_error: "invoicePrefix is required"
        }),
        invoiceReturnPrefix: zod_1.z.string({
            required_error: "invoiceReturnPrefix is required"
        }),
        inventoryAdjustmentPrefix: zod_1.z.string({
            required_error: "inventoryAdjustmentPrefix is required"
        }),
        currencyIcon: zod_1.z.string({
            required_error: "currencyIcon is required"
        }),
        copyrightText: zod_1.z.string({
            required_error: "copyrightText is required"
        }),
    }),
});
exports.SettingsValidation = {
    createSettingsZodSchema,
};
