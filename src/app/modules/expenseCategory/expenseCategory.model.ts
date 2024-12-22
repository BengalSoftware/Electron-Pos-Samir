import { Schema, model } from "mongoose";
import { IExpenseCategory } from "./expenseCategory.interface";

const ExpenseCategorySchema = new Schema<IExpenseCategory>({
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
})

export const ExpenseCategory = model<IExpenseCategory>("ExpenseCategory", ExpenseCategorySchema);

