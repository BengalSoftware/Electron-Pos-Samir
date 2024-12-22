import mongoose, { SortOrder } from "mongoose";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { formateDate } from "../../../utils";
import { IAccount } from "../account/account.interface";
import { Account } from "../account/account.model";
import { ITransactionHistory } from "../transactionHistory/transactionHistory.interface";
import { TransactionHistory } from "../transactionHistory/transactionHistory.model";
import { IExpense, IExpenseFilters } from "./expense.interface";
import { Expense } from "./expense.model";

const createExpense = async (payload: IExpense): Promise<IExpense | null> => {
    let session;
    try {
        session = await mongoose.startSession();
        session.startTransaction();

        const account = await Account.findById(payload.account.id).session(session) as IAccount || null;

        if (!account) {
            throw new Error(`Account is not exist`)
        }
        if (account.balance < payload.amount) {
            throw new Error(`[${account.bankName}] Current Balance is low`)
        }
        //updated 
        account.balance = (account?.balance + payload.amount);

        // transaction history 
        const transactionData: ITransactionHistory = {
            account: account.bankName,
            amount: payload.amount,
            createdBy: "Super Admin",
            type: "debit",
            status: "active",
            date: formateDate,
            reason: `New Expense added from ${account.bankName}`
        }
        const transactionHistory = new TransactionHistory(transactionData);

        await transactionHistory.save({ session });
        await account.save({ session })

        const result = await Expense.create(payload);

        await session.commitTransaction();
        session.endSession();
        return result;
    } catch (error) {
        if (session) {
            await session.abortTransaction();
            session.endSession();
        }
        throw error;
    }
}


//GET ALL CATEGORIES
const getAllCategories = async (filters: IExpenseFilters, paginationOptions: IPaginationOptions): Promise<IGenericResponse<IExpense[]>> => {
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
    const result = await Expense.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit)
        .select({ permissions: 0 });

    const total = await Expense.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
}

const getSingleExpense = async (payload: string): Promise<IExpense | null> => {
    const result = await Expense.findById(payload);
    return result;
}

const deleteExpense = async (payload: string) => {
    await Expense.findByIdAndDelete(payload);
}

const deleteAllCategories = async () => {
    await Expense.deleteMany({});
}

// UPDATE Expense
const updateExpense = async (id: string, payload: IExpense): Promise<IExpense | null> => {
    const result = await Expense.findOneAndUpdate({ _id: id }, { $set: { ...payload } }, { new: true })
    return result;
}

export const ExpenseService = {
    createExpense,
    getSingleExpense,
    updateExpense,
    getAllCategories,
    deleteExpense,
    deleteAllCategories
};
