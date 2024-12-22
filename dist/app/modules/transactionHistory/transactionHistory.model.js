"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionHistory = void 0;
const mongoose_1 = require("mongoose");
const TransactionHistorySchema = new mongoose_1.Schema({
    reason: {
        type: String,
        required: true,
    },
    account: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
    },
    createdBy: {
        type: String,
    },
    type: {
        type: String,
        enum: ["debit", "credit"],
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
exports.TransactionHistory = (0, mongoose_1.model)("TransactionHistory", TransactionHistorySchema);
