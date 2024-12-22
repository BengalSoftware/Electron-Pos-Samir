"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const mongoose_1 = require("mongoose");
const ClientSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    clientId: {
        type: String,
        // required: true,
        // unique: true,
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
    email: {
        type: String
    },
    emergencyContactNo: {
        type: String
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
exports.Client = (0, mongoose_1.model)("Client", ClientSchema);
