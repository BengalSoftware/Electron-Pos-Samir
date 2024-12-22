"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalarySheet = exports.SalarySheetSchema = void 0;
const mongoose_1 = require("mongoose");
exports.SalarySheetSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    paidSalary: {
        type: Number,
        required: true,
    },
    dueSalary: {
        type: Number,
    },
    bonus: {
        type: Number,
    },
    salaryDate: {
        type: String,
    },
    note: {
        type: String,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.SalarySheet = (0, mongoose_1.model)('SalarySheet', exports.SalarySheetSchema);
