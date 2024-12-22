"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeValidation = void 0;
const zod_1 = require("zod");
const employee_constant_1 = require("./employee.constant");
const updateEmployeeZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().optional(),
        password: zod_1.z.string().optional(),
        name: zod_1.z.string({
            required_error: 'Name is required',
        }),
        gender: zod_1.z.enum([...employee_constant_1.gender], {
            required_error: 'Gender is required',
        }),
        contactNo: zod_1.z.string({
            required_error: 'Contact number is required',
        }),
        department: zod_1.z.string({
            required_error: 'Department  is required',
        }),
        designation: zod_1.z.string({
            required_error: 'Designation  is required',
        }),
        salary: zod_1.z.number({
            required_error: 'Designation  is required',
        }),
        bloodGroup: zod_1.z.enum([...employee_constant_1.bloodGroup]).optional(),
        emergencyContactNo: zod_1.z.string().optional(),
        dateOfBirth: zod_1.z.string().optional(),
        appointmentDate: zod_1.z.string().optional(),
        joinDate: zod_1.z.string().optional(),
        presentAddress: zod_1.z.string().optional(),
        permanentAddress: zod_1.z.string().optional(),
        religion: zod_1.z.string().optional(),
        commission: zod_1.z.number().optional(),
        profileImage: zod_1.z.string().optional(),
    }),
});
exports.EmployeeValidation = {
    updateEmployeeZodSchema,
};
