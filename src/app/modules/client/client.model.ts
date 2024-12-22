import { Schema, model } from "mongoose";
import { IClient } from "./client.interface";

const ClientSchema = new Schema<IClient>({
    name: {
        type: String,
        required: true,
    },
    clientId: {
        type: String,
        // required: true,
        // unique: true,
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
    email: {
        type: String
    },
    emergencyContactNo: {
        type: String
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

export const Client = model<IClient>("Client", ClientSchema);

