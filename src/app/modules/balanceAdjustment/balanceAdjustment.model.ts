import { Schema, model } from "mongoose";
import { IBalanceAdjustment } from "./balanceAdjustment.interface";

const BalanceAdjustmentSchema = new Schema<IBalanceAdjustment>({
    accountId: {
        type: Schema.Types.ObjectId,
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
})

export const BalanceAdjustment = model<IBalanceAdjustment>("BalanceAdjustment", BalanceAdjustmentSchema);

