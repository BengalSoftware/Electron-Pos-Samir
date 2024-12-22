import { SortOrder } from "mongoose";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { IExpenseCategory, IExpenseCategoryFilters } from "./expenseCategory.interface";
import { ExpenseCategory } from "./expenseCategory.model";

const createCategory = async (payload: IExpenseCategory): Promise<IExpenseCategory | null> => {
    const result = await ExpenseCategory.create(payload);
    return result;
}


//GET ALL CATEGORIES
const getAllCategories = async (filters: IExpenseCategoryFilters, paginationOptions: IPaginationOptions): Promise<IGenericResponse<IExpenseCategory[]>> => {
    // Extract searchTerm to implement search query
    const { searchTerm, ...filtersData } = filters;
    const { limit, page, skip, sortBy, sortOrder } = paginationHelpers.calculatePagination(paginationOptions);

    const andConditions = [];
    // Search needs $or for searching in specified fields
    if (searchTerm) {
        andConditions.push({
            $or: ["name", "status"].map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }

    // Filters needs $and to fullfill all the conditions
    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value
            }))
        })
    }

    const sortConditions: { [key: string]: SortOrder } = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }

    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = await ExpenseCategory.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit)
        .select({ permissions: 0 });

    const total = await ExpenseCategory.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
}

const getSingleCategory = async (payload: string): Promise<IExpenseCategory | null> => {
    const result = await ExpenseCategory.findById(payload);
    return result;
}

const deleteCategory = async (payload: string) => {
    await ExpenseCategory.findByIdAndDelete(payload);
}

const deleteAllCategories = async () => {
    await ExpenseCategory.deleteMany({});
}

// UPDATE Category
const updateCategory = async (id: string, payload: IExpenseCategory): Promise<IExpenseCategory | null> => {
    const result = await ExpenseCategory.findOneAndUpdate({ _id: id }, { $set: { ...payload } }, { new: true })
    return result;
}

export const ExpenseCategoryService = {
    createCategory,
    getSingleCategory,
    updateCategory,
    getAllCategories,
    deleteCategory,
    deleteAllCategories
};
