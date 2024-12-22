import { SortOrder } from "mongoose";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { IUnit, IUnitFilters } from "./unit.interface";
import { Unit } from "./unit.model";

const createUnit = async (payload: IUnit): Promise<IUnit | null> => {
    const result = await Unit.create(payload);
    return result;
}


//GET ALL CATEGORIES
const getAllCategories = async (filters: IUnitFilters, paginationOptions: IPaginationOptions): Promise<IGenericResponse<IUnit[]>> => {
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
    const result = await Unit.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit)
        .select({ permissions: 0 });

    const total = await Unit.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
}

const getSingleUnit = async (payload: string): Promise<IUnit | null> => {
    const result = await Unit.findById(payload);
    return result;
}

const deleteUnit = async (payload: string) => {
    await Unit.findByIdAndDelete(payload);
}

const deleteAllCategories = async () => {
    await Unit.deleteMany({});
}

// UPDATE Unit
const updateUnit = async (id: string, payload: IUnit): Promise<IUnit | null> => {
    const result = await Unit.findOneAndUpdate({ _id: id }, { $set: { ...payload } }, { new: true })
    return result;
}

export const UnitService = {
    createUnit,
    getSingleUnit,
    updateUnit,
    getAllCategories,
    deleteUnit,
    deleteAllCategories
};
