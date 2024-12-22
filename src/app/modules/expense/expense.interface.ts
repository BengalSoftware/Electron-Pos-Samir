import { Types } from "mongoose";
import { IAccount } from "../account/account.interface";
import { IExpenseCategory } from "../expenseCategory/expenseCategory.interface";
import { IExpenseSubCategory } from "../expenseSubCategory/expenseSubCategory.interface";

export type IExpense = {
    reason: string;
    category: {
        id: Types.ObjectId | IExpenseCategory,
        name: string,
    };
    subcategory?: {
        id: Types.ObjectId | IExpenseSubCategory,
        name: string,
    };
    account: {
        id: Types.ObjectId | IAccount,
        name: string,
    };
    amount: number;
    checkNo?: string;
    voucherNo?: string;
    date?: string;
    status: "active" | "inActive";
    note?: string;
    image?: string;
}

export type IExpenseFilters = {
    searchTerm?: string;
    name?: string;
    status?: string;
    note?: string;
}