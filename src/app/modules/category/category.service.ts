import { SortOrder } from "mongoose";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { ICategory, ICategoryFilters } from "./category.interface";
import { Category } from "./category.model";

const createCategory = async (payload: ICategory): Promise<ICategory | null> => {
    const result = await Category.create(payload);
    return result;
}


//GET ALL CATEGORIES
const getAllCategories = async (filters: ICategoryFilters, paginationOptions: IPaginationOptions): Promise<IGenericResponse<ICategory[]>> => {
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
    const result = await Category.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit)
        .select({ permissions: 0 });

    const total = await Category.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
}

const getSingleCategory = async (payload: string): Promise<ICategory | null> => {
    const result = await Category.findById(payload);
    return result;
}

const deleteCategory = async (payload: string) => {
    await Category.findByIdAndDelete(payload);
}

const deleteAllCategories = async () => {
    await Category.deleteMany({});
}

// UPDATE Category
const updateCategory = async (id: string, payload: ICategory): Promise<ICategory | null> => {
    const result = await Category.findOneAndUpdate({ _id: id }, { $set: { ...payload } }, { new: true })
    return result;
}

export const CategoryService = {
    createCategory,
    getSingleCategory,
    updateCategory,
    getAllCategories,
    deleteCategory,
    deleteAllCategories
};
