import { Schema, model } from "mongoose";
import { IAccount } from "./account.interface";

const AccountSchema = new Schema<IAccount>({

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
})

export const Account = model<IAccount>("Account", AccountSchema);

