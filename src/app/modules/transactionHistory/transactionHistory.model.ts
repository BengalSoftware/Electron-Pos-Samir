import { Schema, model } from "mongoose";
import { ITransactionHistory } from "./transactionHistory.interface";

const TransactionHistorySchema = new Schema<ITransactionHistory>({
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
})

export const TransactionHistory = model<ITransactionHistory>("TransactionHistory", TransactionHistorySchema);

