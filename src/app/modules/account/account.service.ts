import { SortOrder } from "mongoose";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { IAccount, IAccountFilters } from "./account.interface";
import { Account } from "./account.model";

const createAccount = async (payload: IAccount): Promise<IAccount | null> => {
    const result = await Account.create(payload);
    return result;
}


//GET ALL CATEGORIES
const getAllCategories = async (filters: IAccountFilters, paginationOptions: IPaginationOptions): Promise<IGenericResponse<IAccount[]>> => {
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
    const result = await Account.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit)
        .select({ permissions: 0 });

    const total = await Account.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
}

const getSingleAccount = async (payload: string): Promise<IAccount | null> => {
    const result = await Account.findById(payload);
    return result;
}

const deleteAccount = async (payload: string) => {
    await Account.findByIdAndDelete(payload);
}

const deleteAllCategories = async () => {
    await Account.deleteMany({});
}

// UPDATE Account
const updateAccount = async (id: string, payload: IAccount): Promise<IAccount | null> => {
    const result = await Account.findOneAndUpdate({ _id: id }, { $set: { ...payload } }, { new: true })
    return result;
}

export const AccountService = {
    createAccount,
    getSingleAccount,
    updateAccount,
    getAllCategories,
    deleteAccount,
    deleteAllCategories
};
