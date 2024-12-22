import { SortOrder } from "mongoose";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { IExpenseSubCategory, IExpenseSubCategoryFilters } from "./expenseSubCategory.interface";
import { ExpenseSubcategory } from "./expenseSubCategory.model";

const createExpenseSubcategory = async (payload: IExpenseSubCategory): Promise<IExpenseSubCategory | null> => {

    const result = await ExpenseSubcategory.create(payload);
    return result;
}


//GET ALL CATEGORIES
const getAllSubCategories = async (filters: IExpenseSubCategoryFilters, paginationOptions: IPaginationOptions): Promise<IGenericResponse<IExpenseSubCategory[]>> => {
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
    const result = await ExpenseSubcategory.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);

    const total = await ExpenseSubcategory.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
}

const getSingleExpenseSubcategory = async (payload: string): Promise<IExpenseSubCategory | null> => {
    const result = await ExpenseSubcategory.findById(payload);
    return result;
}

const deleteExpenseSubcategory = async (payload: string) => {
    await ExpenseSubcategory.findByIdAndDelete(payload);
}

const deleteAllSubCategories = async () => {
    await ExpenseSubcategory.deleteMany({});
}

// UPDATE ExpenseSubcategory
const updateExpenseSubcategory = async (id: string, payload: IExpenseSubCategory): Promise<IExpenseSubCategory | null> => {
    const result = await ExpenseSubcategory.findOneAndUpdate({ _id: id }, { $set: { ...payload } }, { new: true })
    return result;
}

export const ExpenseSubcategoryService = {
    createExpenseSubcategory,
    getSingleExpenseSubcategory,
    updateExpenseSubcategory,
    getAllSubCategories,
    deleteExpenseSubcategory,
    deleteAllSubCategories
};
