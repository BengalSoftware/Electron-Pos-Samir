import { SortOrder } from "mongoose";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { ILoanAuthority, ILoanAuthorityFilters } from "./loanAuthority.interface";
import { LoanAuthority } from "./loanAuthority.model";

const createLoanAuthority = async (payload: ILoanAuthority): Promise<ILoanAuthority | null> => {
    const result = await LoanAuthority.create(payload);
    return result;
}


//GET ALL LoanAuthority
const getAllLoanAuthority = async (filters: ILoanAuthorityFilters, paginationOptions: IPaginationOptions): Promise<IGenericResponse<ILoanAuthority[]>> => {
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
    const result = await LoanAuthority.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit)
        .select({ permissions: 0 });

    const total = await LoanAuthority.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
}

const getSingleLoanAuthority = async (payload: string): Promise<ILoanAuthority | null> => {
    const result = await LoanAuthority.findById(payload);
    return result;
}

const deleteLoanAuthority = async (payload: string) => {
    await LoanAuthority.findByIdAndDelete(payload);
}

const deleteAllLoanAuthority = async () => {
    await LoanAuthority.deleteMany({});
}

// UPDATE LoanAuthority
const updateLoanAuthority = async (id: string, payload: ILoanAuthority): Promise<ILoanAuthority | null> => {
    const result = await LoanAuthority.findOneAndUpdate({ _id: id }, { $set: { ...payload } }, { new: true })
    return result;
}

export const LoanAuthorityService = {
    createLoanAuthority,
    getSingleLoanAuthority,
    updateLoanAuthority,
    getAllLoanAuthority,
    deleteLoanAuthority,
    deleteAllLoanAuthority
};
