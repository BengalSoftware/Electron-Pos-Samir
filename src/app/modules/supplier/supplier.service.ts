import { SortOrder } from "mongoose";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { ISupplier, ISupplierFilters } from "./supplier.interface";
import { Supplier } from "./supplier.model";
import { generateSupplierCode } from "./supplier.utils";

const createSupplier = async (payload: ISupplier): Promise<ISupplier | null> => {
    payload.code = await generateSupplierCode();
    const result = await Supplier.create(payload);
    return result;
}


//GET ALL CATEGORIES
const getAllCategories = async (filters: ISupplierFilters, paginationOptions: IPaginationOptions): Promise<IGenericResponse<ISupplier[]>> => {
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
    const result = await Supplier.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit)
        .select({ permissions: 0 });

    const total = await Supplier.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
}

const getSingleSupplier = async (payload: string): Promise<ISupplier | null> => {
    const result = await Supplier.findById(payload);
    return result;
}

const deleteSupplier = async (payload: string) => {
    await Supplier.findByIdAndDelete(payload);
}

const deleteAllSuppliers = async () => {
    await Supplier.deleteMany({});
}

// UPDATE Supplier
const updateSupplier = async (id: string, payload: ISupplier): Promise<ISupplier | null> => {
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    const { code, ...others } = payload;
    const result = await Supplier.findOneAndUpdate({ _id: id }, { $set: others }, { new: true })
    return result;
}

export const SupplierService = {
    createSupplier,
    getSingleSupplier,
    updateSupplier,
    getAllCategories,
    deleteSupplier,
    deleteAllSuppliers
};
