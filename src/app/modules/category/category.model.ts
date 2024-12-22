import { Schema, model } from "mongoose";
import { ICategory } from "./category.interface";

const CategorySchema = new Schema<ICategory>({
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

export const Category = model<ICategory>("Category", CategorySchema);

