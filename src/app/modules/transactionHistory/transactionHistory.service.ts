import { SortOrder } from "mongoose";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { ITransactionHistory, ITransactionHistoryFilters } from "./transactionHistory.interface";
import { TransactionHistory } from "./transactionHistory.model";

const createTransactionHistory = async (payload: ITransactionHistory): Promise<ITransactionHistory | null> => {
    const result = await TransactionHistory.create(payload);
    return result;
}


//GET ALL TransactionHistory
const getAllTransactionHistory = async (filters: ITransactionHistoryFilters, paginationOptions: IPaginationOptions): Promise<IGenericResponse<ITransactionHistory[]>> => {
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
    const result = await TransactionHistory.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit)
        .select({ permissions: 0 });

    const total = await TransactionHistory.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
}

const getSingleTransactionHistory = async (payload: string): Promise<ITransactionHistory | null> => {
    const result = await TransactionHistory.findById(payload);
    return result;
}

const deleteTransactionHistory = async (payload: string) => {
    await TransactionHistory.findByIdAndDelete(payload);
}

const deleteAllTransactionHistory = async () => {
    await TransactionHistory.deleteMany({});
}

// UPDATE TransactionHistory
const updateTransactionHistory = async (id: string, payload: ITransactionHistory): Promise<ITransactionHistory | null> => {
    const result = await TransactionHistory.findOneAndUpdate({ _id: id }, { $set: { ...payload } }, { new: true })
    return result;
}

export const TransactionHistoryService = {
    createTransactionHistory,
    getSingleTransactionHistory,
    updateTransactionHistory,
    getAllTransactionHistory,
    deleteTransactionHistory,
    deleteAllTransactionHistory
};
