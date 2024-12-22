import { Types } from "mongoose";

export type IProductReturn = {
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
    client: {
        id: string,
        name: string,
    };
    reason: string,


    totalTax: number;
    invoiceNo: string;
    invoice?: Types.ObjectId;
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

export type IProductReturnFilters = {
    searchTerm?: string;
    name?: string;
    status?: string;
    note?: string;
}