import { SortOrder } from "mongoose";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { IDepartment, IDepartmentFilters } from "./department.interface";
import { Department } from "./department.model";

const createDepartment = async (payload: IDepartment): Promise<IDepartment | null> => {
    const result = await Department.create(payload);
    return result;
}


//GET ALL CATEGORIES
const getAllDepartments = async (filters: IDepartmentFilters, paginationOptions: IPaginationOptions): Promise<IGenericResponse<IDepartment[]>> => {
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
    const result = await Department.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit)
        .select({ permissions: 0 });

    const total = await Department.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
}

const getSingleDepartment = async (payload: string): Promise<IDepartment | null> => {
    const result = await Department.findById(payload);
    return result;
}

const deleteDepartment = async (payload: string) => {
    await Department.findByIdAndDelete(payload);
}

const deleteAllDepartments = async () => {
    await Department.deleteMany({});
}

// UPDATE Department
const updateDepartment = async (id: string, payload: IDepartment): Promise<IDepartment | null> => {
    const result = await Department.findOneAndUpdate({ _id: id }, { $set: { ...payload } }, { new: true })
    return result;
}

export const DepartmentService = {
    createDepartment,
    getSingleDepartment,
    updateDepartment,
    getAllDepartments,
    deleteDepartment,
    deleteAllDepartments
};
