import { Types } from "mongoose";
import { IAccount } from "../account/account.interface";

export type IBalanceTransfer = {

    fromAccount: Types.ObjectId | IAccount;
    toAccount: Types.ObjectId | IAccount;
    reason: string;
    amount: number;
    date?: string;
    status: "active" | "pending";
    note?: string;
    image?: string;
}

export type IBalanceTransferFilters = {
    searchTerm?: string;
    name?: string;
    status?: string;
    note?: string;
}