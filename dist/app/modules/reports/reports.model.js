"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reports = void 0;
const mongoose_1 = require("mongoose");
const ReportsSchema = new mongoose_1.Schema({
    bankName: {
        type: String,
        unique: true,
        required: true,
    },
    reportsNumber: {
        type: String,
        unique: true,
        required: true,
    },
    date: {
        type: String,
    },
    status: {
        type: String,
        enum: ["active", "pending"],
        default: "active",
        required: true,
    },
    note: {
        type: String
    },
}, {
    timestamps: true
});
exports.Reports = (0, mongoose_1.model)("Reports", ReportsSchema);
