import { Schema, model } from "mongoose";
import { ILoanAuthority } from "./loanAuthority.interface";

const LoanAuthoritySchema = new Schema<ILoanAuthority>({
    name: {
        type: String,
        required: true,
    },
    account: {
        type: String,
        unique: true,
        required: true,
    },
    address: {
        type: String,
    },
    ccLimit: {
        type: Number,
        required: true
    },
    contactNo: {
        type: String,
    },
    email: {
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

export const LoanAuthority = model<ILoanAuthority>("LoanAuthority", LoanAuthoritySchema);

