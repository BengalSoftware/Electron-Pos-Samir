"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BalanceTransfer = void 0;
const mongoose_1 = require("mongoose");
const BalanceTransferSchema = new mongoose_1.Schema({
    fromAccount: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Account",
        required: true,
    },
    toAccount: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Account",
        required: true,
    },
    reason: {
        type: String,
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
    note: {
        type: String
    },
    image: {
        type: String
    }
}, {
    timestamps: true
});
exports.BalanceTransfer = (0, mongoose_1.model)("BalanceTransfer", BalanceTransferSchema);
