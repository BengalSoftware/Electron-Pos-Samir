import { Types } from "mongoose";

export type IPurchaseReturn = {
    products: {
        _id: string;
        name: string;
        quantity: number;
        returnQty: number;
        purchasePrice: number;
        purchaseVat: number;
        totalPrice: number;
    }[];
    code: string;
    account: {
        id: Types.ObjectId,
        name: string,
    };
    supplier: {
        name: string,
    };
    reason: string,


    totalTax: number;
    purchaseNo: string;
    returnTotalTax: number;
    returnDiscountAmount: number;
    netTotal: number;
    returnNetTotal: number;
    subTotal: number;
    returnSubTotal: number;
    discount?: number;
    transportCost?: number;

    date?: string;
    createdBy?: string;
    chequeNo?: string;
    receiptNo?: string;
    status: "active" | "pending";
    note?: string;
    image?: string;
}

export type IPurchaseReturnFilters = {
    searchTerm?: string;
    name?: string;
    status?: string;
    note?: string;
}