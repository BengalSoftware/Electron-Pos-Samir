"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Supplier = void 0;
const mongoose_1 = require("mongoose");
const SupplierSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    code: {
        type: String,
    },
    status: {
        type: String,
        enum: ["active", "pending"],
        default: "active",
        required: true,
    },
    contactNo: {
        type: String,
        required: true,
    },
    companyName: {
        type: String
    },
    email: {
        type: String
    },
    emergencyContactNo: {
        type: String
    },
    totalPurchase: {
        type: Number,
        default: 0
    },
    totalPayment: {
        type: Number,
        default: 0
    },
    totalDue: {
        type: Number,
        default: 0
    },
    note: {
        type: String
    },
    profileImage: {
        type: String
    },
    address: {
        type: String
    },
}, {
    timestamps: true
});
exports.Supplier = (0, mongoose_1.model)("Supplier", SupplierSchema);
