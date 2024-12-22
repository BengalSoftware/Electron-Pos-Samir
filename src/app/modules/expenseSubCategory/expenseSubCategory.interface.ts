import { Types } from "mongoose";
import { ICategory } from "../category/category.interface";

export type IExpenseSubCategory = {
    name: string;
    status: "active" | "pending";
    note: string;
    category: Types.ObjectId | ICategory;
}

export type IExpenseSubCategoryFilters = {
    searchTerm?: string;
    name?: string;
    status?: string;
    note?: string;
}