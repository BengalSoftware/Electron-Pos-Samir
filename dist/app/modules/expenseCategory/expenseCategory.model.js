"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseCategory = void 0;
const mongoose_1 = require("mongoose");
const ExpenseCategorySchema = new mongoose_1.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    status: {
        type: String,
        enum: ["active", "pending"],
        default: "active",
        required: true,
    },
    note: {
        type: String
    }
}, {
    timestamps: true
});
exports.ExpenseCategory = (0, mongoose_1.model)("ExpenseCategory", ExpenseCategorySchema);
