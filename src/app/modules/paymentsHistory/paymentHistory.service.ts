import { SortOrder } from "mongoose";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { IPaymentHistory, IPaymentHistoryFilters } from "./paymentHistory.interface";
import { PaymentHistory } from "./paymentHistory.model";

const createPaymentHistory = async (payload: IPaymentHistory): Promise<IPaymentHistory | null> => {
    // step 1 : update account balance 
    const result = await PaymentHistory.create(payload);
    return result;
}


//GET ALL CATEGORIES
const getAllPaymentHistories = async (filters: IPaymentHistoryFilters, paginationOptions: IPaginationOptions): Promise<IGenericResponse<IPaymentHistory[]>> => {
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

    // Filters needs $and to full fill all the conditions
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
    const result = await PaymentHistory.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit)
        .populate("purchaseId", "purchaseDate netTotal code")
        .populate("supplierId", "name")
        .populate("saleId", "poDate netTotal invoiceNo")
        .populate("clientId", "name")

    const total = await PaymentHistory.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
}

const getSinglePaymentHistory = async (payload: string): Promise<IPaymentHistory | null> => {
    const result = await PaymentHistory.findById(payload)
        .populate("purchaseId")
        .populate("supplierId")
        .populate("saleId")
        .populate("clientId")
    return result;
}

const deletePaymentHistory = async (payload: string) => {
    await PaymentHistory.findByIdAndDelete(payload);
}

const deleteAllPaymentHistories = async () => {
    await PaymentHistory.deleteMany({});
}

// UPDATE PaymentHistory
const updatePaymentHistory = async (id: string, payload: IPaymentHistory): Promise<IPaymentHistory | null> => {
    const result = await PaymentHistory.findOneAndUpdate({ _id: id }, { $set: { ...payload } }, { new: true })
    return result;
}

export const PaymentHistoryService = {
    createPaymentHistory,
    getSinglePaymentHistory,
    updatePaymentHistory,
    getAllPaymentHistories,
    deletePaymentHistory,
    deleteAllPaymentHistories
};
