import { SortOrder } from "mongoose";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { IBrand, IBrandFilters } from "./brand.interface";
import { Brand } from "./brand.model";

const createBrand = async (payload: IBrand): Promise<IBrand | null> => {
    const result = await Brand.create(payload);
    return result;
}


//GET ALL CATEGORIES
const getAllBrand = async (filters: IBrandFilters, paginationOptions: IPaginationOptions): Promise<IGenericResponse<IBrand[]>> => {
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
    const result = await Brand.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit)
        .select({ permissions: 0 });

    const total = await Brand.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
}

const getSingleBrand = async (payload: string): Promise<IBrand | null> => {
    const result = await Brand.findById(payload);
    return result;
}

const deleteBrand = async (payload: string) => {
    await Brand.findByIdAndDelete(payload);
}

const deleteAllBrand = async () => {
    await Brand.deleteMany({});
}

// UPDATE Brand
const updateBrand = async (id: string, payload: IBrand): Promise<IBrand | null> => {
    const result = await Brand.findOneAndUpdate({ _id: id }, { $set: { ...payload } }, { new: true })
    return result;
}

export const BrandService = {
    createBrand,
    getSingleBrand,
    updateBrand,
    getAllBrand,
    deleteBrand,
    deleteAllBrand
};
