import { Schema, model } from "mongoose";
import { ISupplier } from "./supplier.interface";

const SupplierSchema = new Schema<ISupplier>({
    name: {
        type: String,
        required: true,
    },
    code: {
        type: String,
    },
    status: {
        type: String,
        enum: ["active", "pending"],
        default: "active",
        required: true,
    },
    contactNo: {
        type: String,
        required: true,
    },
    companyName: {
        type: String
    },
    email: {
        type: String
    },
    emergencyContactNo: {
        type: String
    },
    totalPurchase: {
        type: Number,
        default: 0
    },
    totalPayment: {
        type: Number,
        default: 0

    },
    totalDue: {
        type: Number,
        default: 0

    },
    note: {
        type: String
    },
    profileImage: {
        type: String
    },
    address: {
        type: String
    },


}, {
    timestamps: true
})

export const Supplier = model<ISupplier>("Supplier", SupplierSchema);

