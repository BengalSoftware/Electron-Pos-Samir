import { Types } from "mongoose";
import { ICategory } from "../category/category.interface";

export type ISubCategory = {
    name: string;
    status: "active" | "pending";
    note: string;
    category: Types.ObjectId | ICategory;
}

export type ISubCategoryFilters = {
    searchTerm?: string;
    name?: string;
    status?: string;
    note?: string;
}