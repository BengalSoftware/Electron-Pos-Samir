"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManagementOutletValidation = void 0;
const zod_1 = require("zod");
const createManagementOutletZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: 'Title is required',
        }),
        address: zod_1.z.string({
            required_error: 'Address is required',
        }),
        branch: zod_1.z.string({
            required_error: 'Branch is required',
        }),
        vatRegisterNo: zod_1.z.string().optional()
    }),
}).refine((data) => {
    // If the branch is "main", make vatRegisterNo required
    if (data.body.branch === "main") {
        if (!data.body.vatRegisterNo) {
            throw new Error("VatRegisterNo is required ");
        }
    }
    return true; // Return true to indicate the validation passed
});
const updateManagementOutletZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: 'Title is required',
        }),
        address: zod_1.z.string({
            required_error: 'Address is required',
        }),
        branch: zod_1.z.string({
            required_error: 'Branch is required',
        }),
        vatRegisterNo: zod_1.z.string().optional()
    }),
});
exports.ManagementOutletValidation = {
    createManagementOutletZodSchema,
    updateManagementOutletZodSchema,
};
