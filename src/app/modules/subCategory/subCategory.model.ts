import { Schema, model } from "mongoose";
import { ISubCategory } from "./subCategory.interface";

const SubCategorySchema = new Schema<ISubCategory>({
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
    },
    category: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
})

export const SubCategory = model<ISubCategory>("Subcategory", SubCategorySchema);

