"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalaryValidation = void 0;
const zod_1 = require("zod");
const updateSalaryZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().optional(),
        password: zod_1.z.string().optional(),
        name: zod_1.z.string({
            required_error: 'Name is required',
        }),
        paidSalary: zod_1.z.number({
            required_error: 'Paid Salary is required',
        }),
        dueSalary: zod_1.z.number().optional(),
        bonus: zod_1.z.number().optional(),
        salaryDate: zod_1.z.string().optional(),
        note: zod_1.z.string().optional(),
    }),
});
exports.SalaryValidation = {
    updateSalaryZodSchema,
};
