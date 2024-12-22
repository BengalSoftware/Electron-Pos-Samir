import mongoose from "mongoose";

export type IInventoryHistory = {
    product: mongoose.Types.ObjectId,
    type: "purchase" | "invoice" | "purchase return" | "invoice return"
    date: string;
    stock: "stock_in" | "stock_out";
    quantity: number;
    price: number;
    person: string;
    code: string;
}

export type IInventoryHistoryFilters = {
    searchTerm?: string;
    name?: string;
    status?: string;
    note?: string;
}