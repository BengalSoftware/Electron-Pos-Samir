import { Types } from "mongoose";
import { IAccount } from "../account/account.interface";

export type IBalanceAdjustment = {
    accountId: Types.ObjectId | IAccount;
    date?: string;
    status: "active" | "pending";
    type: "add" | "remove";
    amount: number;
    note?: string;
    image?: string;
}

export type IBalanceAdjustmentFilters = {
    searchTerm?: string;
    name?: string;
    status?: string;
    note?: string;
}