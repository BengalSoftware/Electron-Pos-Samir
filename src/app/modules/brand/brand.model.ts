import { Schema, model } from "mongoose";
import { IBrand } from "./brand.interface";

const BrandSchema = new Schema<IBrand>({
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

export const Brand = model<IBrand>("Brand", BrandSchema);

