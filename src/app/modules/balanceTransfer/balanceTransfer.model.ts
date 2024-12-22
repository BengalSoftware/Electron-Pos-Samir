import { Schema, model } from "mongoose";
import { IBalanceTransfer } from "./balanceTransfer.interface";

const BalanceTransferSchema = new Schema<IBalanceTransfer>({
    fromAccount: {
        type: Schema.Types.ObjectId,
        ref: "Account",
        required: true,
    },
    toAccount: {
        type: Schema.Types.ObjectId,
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
})

export const BalanceTransfer = model<IBalanceTransfer>("BalanceTransfer", BalanceTransferSchema);

