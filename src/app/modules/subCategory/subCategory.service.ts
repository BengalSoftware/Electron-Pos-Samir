import { SortOrder } from "mongoose";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { ISubCategory, ISubCategoryFilters } from "./subCategory.interface";
import { SubCategory } from "./subCategory.model";

const createSubCategory = async (payload: ISubCategory): Promise<ISubCategory | null> => {

    const result = await SubCategory.create(payload);
    return result;
}


//GET ALL CATEGORIES
const getAllSubCategories = async (filters: ISubCategoryFilters, paginationOptions: IPaginationOptions): Promise<IGenericResponse<ISubCategory[]>> => {
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
    const result = await SubCategory.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);

    const total = await SubCategory.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
}

const getSingleSubCategory = async (payload: string): Promise<ISubCategory | null> => {
    const result = await SubCategory.findById(payload);
    return result;
}

const deleteSubCategory = async (payload: string) => {
    await SubCategory.findByIdAndDelete(payload);
}

const deleteAllSubCategories = async () => {
    await SubCategory.deleteMany({});
}

// UPDATE SubCategory
const updateSubCategory = async (id: string, payload: ISubCategory): Promise<ISubCategory | null> => {
    const result = await SubCategory.findOneAndUpdate({ _id: id }, { $set: { ...payload } }, { new: true })
    return result;
}

export const SubCategoryService = {
    createSubCategory,
    getSingleSubCategory,
    updateSubCategory,
    getAllSubCategories,
    deleteSubCategory,
    deleteAllSubCategories
};
