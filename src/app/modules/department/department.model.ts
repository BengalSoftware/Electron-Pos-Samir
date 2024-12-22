import { Schema, model } from "mongoose";
import { IDepartment } from "./department.interface";

const DepartmentSchema = new Schema<IDepartment>({
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
    }
}, {
    timestamps: true
})

export const Department = model<IDepartment>("Department", DepartmentSchema);

