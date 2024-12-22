import { Schema, model } from "mongoose";
import { IExpense } from "./expense.interface";

const ExpenseSchema = new Schema<IExpense>({
    reason: {
        type: String,
        required: true,
    },
    category: {
        id: {
            type: Schema.Types.ObjectId,
            ref: "ExpenseCategory"
        },
        name: String,
    },
    subcategory: {
        id: {
            type: Schema.Types.ObjectId,
            ref: "ExpenseSubcategory"
        },
        name: String,
    },
    account: {
        id: {
            type: Schema.Types.ObjectId,
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
})

export const Expense = model<IExpense>("ExpenseList", ExpenseSchema);

