"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Expense = void 0;
const mongoose_1 = require("mongoose");
const ExpenseSchema = new mongoose_1.Schema({
    reason: {
        type: String,
        required: true,
    },
    category: {
        id: {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "ExpenseCategory"
        },
        name: String,
    },
    subcategory: {
        id: {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "ExpenseSubcategory"
        },
        name: String,
    },
    account: {
        id: {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Account"
        },
        name: String,
    },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["active", "inActive"],
        default: "active",
        required: true,
    },
    checkNo: {
        type: Number,
    },
    voucherNo: {
        type: Number,
    },
    date: {
        type: String,
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
exports.Expense = (0, mongoose_1.model)("ExpenseList", ExpenseSchema);
