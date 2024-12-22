"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuperAdmin = void 0;
const mongoose_1 = require("mongoose");
const employee_constant_1 = require("../employee/employee.constant");
const SuperAdminSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
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
    // managementDepartment: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'ManagementDepartment',
    //   required: true,
    // },
    bloodGroup: {
        type: String,
        enum: employee_constant_1.bloodGroup,
    },
    presentAddress: String,
    permanentAddress: String,
    emergencyContactNo: String,
    profileImage: String,
    dateOfBirth: String,
}, {
    timestamps: true,
});
exports.SuperAdmin = (0, mongoose_1.model)('SuperAdmin', SuperAdminSchema);
