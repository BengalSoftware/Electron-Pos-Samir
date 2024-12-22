import { Schema, model } from "mongoose";
import { IReports } from "./reports.interface";

const ReportsSchema = new Schema<IReports>({

    bankName: {
        type: String,
        unique: true,
        required: true,
    },
    reportsNumber: {
        type: String,
        unique: true,
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

export const Reports = model<IReports>("Reports", ReportsSchema);

