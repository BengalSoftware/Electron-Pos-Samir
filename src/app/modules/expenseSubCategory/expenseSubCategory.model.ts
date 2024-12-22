import { Schema, model } from "mongoose";
import { IExpenseSubCategory } from "./expenseSubCategory.interface";

const ExpenseSubCategorySchema = new Schema<IExpenseSubCategory>({
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
    },
    category: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
})

export const ExpenseSubcategory = model<IExpenseSubCategory>("ExpenseSubcategory", ExpenseSubCategorySchema);

