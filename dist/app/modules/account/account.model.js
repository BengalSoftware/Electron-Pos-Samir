"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Account = void 0;
const mongoose_1 = require("mongoose");
const AccountSchema = new mongoose_1.Schema({
    bankName: {
        type: String,
        unique: true,
        required: true,
    },
    accountNumber: {
        type: String,
        unique: true,
        required: true,
    },
    balance: {
        type: Number,
        default: 0,
    },
    branchName: {
        type: String,
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
exports.Account = (0, mongoose_1.model)("Account", AccountSchema);
