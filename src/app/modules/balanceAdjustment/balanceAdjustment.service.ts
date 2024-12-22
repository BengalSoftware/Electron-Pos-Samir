import { SortOrder } from "mongoose";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { formateDate } from "../../../utils";
import { IAccount } from "../account/account.interface";
import { Account } from "../account/account.model";
import { ITransactionHistory } from "../transactionHistory/transactionHistory.interface";
import { TransactionHistory } from "../transactionHistory/transactionHistory.model";
import { IBalanceAdjustment, IBalanceAdjustmentFilters } from "./balanceAdjustment.interface";
import { BalanceAdjustment } from "./balanceAdjustment.model";

const createBalanceAdjustment = async (payload: IBalanceAdjustment): Promise<IBalanceAdjustment | null> => {
    const accountInfo = await Account.findById(payload.accountId) as IAccount || null;
    if (!accountInfo) {
        throw new Error(`Account is not exist`)
    }
    const currentBalance = accountInfo.balance;
    if (payload.type === "remove" && payload.amount > currentBalance) {
        throw new Error(`Amount must be less then or equal ${accountInfo.balance}`)
    }
    if (payload.type === "remove") {
        accountInfo.balance = (currentBalance - payload.amount);
    }
    else { accountInfo.balance = (currentBalance + payload.amount) };

    // transaction history 
    const transactionData: ITransactionHistory = {
        account: accountInfo.bankName,
        amount: payload.amount,
        createdBy: "Super Admin",
        type: payload.type === "remove" ? "debit" : "credit",
        status: "active",
        date: formateDate,
        reason: `Non invoice balance ${payload.type === "add" ? "added to" : "removed from"} ${accountInfo.bankName}`
    }

    await TransactionHistory.create(transactionData);
    const result = (await BalanceAdjustment.create(payload)).populate("accountId");
    await accountInfo.save();
    return result;
}


//GET ALL CATEGORIES
const getAllCategories = async (filters: IBalanceAdjustmentFilters, paginationOptions: IPaginationOptions): Promise<IGenericResponse<IBalanceAdjustment[]>> => {
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
    const result = await BalanceAdjustment.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit)
        .populate("accountId")
    const total = await BalanceAdjustment.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
}

const getSingleBalanceAdjustment = async (payload: string): Promise<IBalanceAdjustment | null> => {
    const result = await BalanceAdjustment.findById(payload).populate("accountId");
    return result;
}

const deleteBalanceAdjustment = async (payload: string) => {
    await BalanceAdjustment.findByIdAndDelete(payload);
}

const deleteAllCategories = async () => {
    await BalanceAdjustment.deleteMany({});
}

// UPDATE BalanceAdjustment
const updateBalanceAdjustment = async (id: string, payload: IBalanceAdjustment): Promise<IBalanceAdjustment | null> => {
    const result = await BalanceAdjustment.findOneAndUpdate({ _id: id }, { $set: { ...payload } }, { new: true }).populate("accountId")
    return result;
}

export const BalanceAdjustmentService = {
    createBalanceAdjustment,
    getSingleBalanceAdjustment,
    updateBalanceAdjustment,
    getAllCategories,
    deleteBalanceAdjustment,
    deleteAllCategories
};
