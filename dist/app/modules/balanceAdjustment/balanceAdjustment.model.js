"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BalanceAdjustment = void 0;
const mongoose_1 = require("mongoose");
const BalanceAdjustmentSchema = new mongoose_1.Schema({
    accountId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Account",
        required: true,
    },
    amount: {
        type: Number,
        required: true
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
    type: {
        type: String,
        enum: ["add", "remove"],
        required: true,
    },
    note: {
        type: String
    },
    image: {
        type: String
    }
}, {
    timestamps: true
});
exports.BalanceAdjustment = (0, mongoose_1.model)("BalanceAdjustment", BalanceAdjustmentSchema);
