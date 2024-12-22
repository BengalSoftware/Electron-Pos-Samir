import { SortOrder } from "mongoose";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { formateDate } from "../../../utils";
import { IAccount } from "../account/account.interface";
import { Account } from "../account/account.model";
import { ITransactionHistory } from "../transactionHistory/transactionHistory.interface";
import { TransactionHistory } from "../transactionHistory/transactionHistory.model";
import { IBalanceTransfer, IBalanceTransferFilters } from "./balanceTransfer.interface";
import { BalanceTransfer } from "./balanceTransfer.model";


const createBalanceTransfer = async (payload: IBalanceTransfer): Promise<IBalanceTransfer | null> => {
    const fromAccount = await Account.findById(payload.fromAccount) as IAccount || null;
    const toAccount = await Account.findById(payload.toAccount) as IAccount || null;
    if (!fromAccount || !toAccount) {
        throw new Error(`Account is not exist`)
    }
    if (payload.fromAccount === payload.toAccount) {
        throw new Error(`The to account and from account must be different.`)
    }
    const currentBalance = (fromAccount.balance);
    if (payload.amount > currentBalance) {
        throw new Error(`Amount must be less then or equal ${fromAccount.balance}`)
    }

    // transaction history 
    const transactionDebitData: ITransactionHistory = {
        account: fromAccount.bankName,
        amount: payload.amount,
        createdBy: "Super Admin",
        type: "debit",
        status: "active",
        date: formateDate,
        reason: `Balance transfer from ${fromAccount.bankName}`
    }
    const transactionCreditData = {
        ...transactionDebitData,
        account: toAccount.bankName,
        type: "credit",
        reason: `Balance transfer to ${toAccount.bankName}`
    }


    const result = (await (await BalanceTransfer.create(payload))
        .populate("fromAccount", "bankName balance"))
        .populate("toAccount", "bankName balance");

    // save transaction history
    await TransactionHistory.create(transactionDebitData);
    await TransactionHistory.create(transactionCreditData);

    // update from and to account
    fromAccount.balance = currentBalance - payload.amount;
    toAccount.balance = toAccount.balance + payload.amount;
    await fromAccount.save();
    await toAccount.save();


    return result;
}


//GET ALL BalanceTransfer
const getAllBalanceTransfer = async (filters: IBalanceTransferFilters, paginationOptions: IPaginationOptions): Promise<IGenericResponse<IBalanceTransfer[]>> => {
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
    const result = await BalanceTransfer.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit)
        .select({ permissions: 0 })
        .populate("fromAccount", "bankName balance")
        .populate("toAccount", "bankName balance");

    const total = await BalanceTransfer.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
}

const getSingleBalanceTransfer = async (payload: string): Promise<IBalanceTransfer | null> => {
    const result = await BalanceTransfer.findById(payload).populate("fromAccount", "bankName balance")
        .populate("toAccount", "bankName balance");
    return result;
}

const deleteBalanceTransfer = async (payload: string) => {
    await BalanceTransfer.findByIdAndDelete(payload);
}

const deleteAllBalanceTransfer = async () => {
    await BalanceTransfer.deleteMany({});
}

// UPDATE BalanceTransfer
const updateBalanceTransfer = async (id: string, payload: IBalanceTransfer): Promise<IBalanceTransfer | null> => {
    const result = await BalanceTransfer.findOneAndUpdate({ _id: id }, { $set: { ...payload } }, { new: true })
        .populate("fromAccount", "bankName balance")
        .populate("toAccount", "bankName balance");
    return result;
}

export const BalanceTransferService = {
    createBalanceTransfer,
    getSingleBalanceTransfer,
    updateBalanceTransfer,
    getAllBalanceTransfer,
    deleteBalanceTransfer,
    deleteAllBalanceTransfer
};
