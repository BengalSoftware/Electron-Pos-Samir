"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Employee = exports.EmployeeSchema = void 0;
const mongoose_1 = require("mongoose");
const employee_constant_1 = require("./employee.constant");
exports.EmployeeSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    code: String,
    gender: {
        type: String,
        enum: employee_constant_1.gender,
    },
    contactNo: {
        type: String,
        unique: true,
        required: true,
    },
    designation: {
        type: String,
        required: true,
    },
    salary: {
        type: Number,
        required: true,
    },
    bloodGroup: {
        type: String,
        enum: employee_constant_1.bloodGroup,
    },
    status: {
        type: String,
        enum: ["active", "inActive"],
        default: "active",
        required: true,
    },
    presentAddress: String,
    allowLogin: Boolean,
    permanentAddress: String,
    emergencyContactNo: String,
    profileImage: String,
    appointmentDate: String,
    commission: Number,
    department: String,
    religion: String,
    dateOfBirth: String,
    joinDate: String,
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Employee = (0, mongoose_1.model)('Employee', exports.EmployeeSchema);
