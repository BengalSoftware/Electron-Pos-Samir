import { Types } from "mongoose";

export type IPaymentHistory = {

    //for a sale history
    saleId?: Types.ObjectId,
    clientId?: Types.ObjectId,

    //for purchase history
    purchaseId?: Types.ObjectId,
    supplierId?: Types.ObjectId,
    paymentFor: "supplier" | "client";
    checkNo?: string,
    receiptNo?: string,
    paidAmount: number,
    status: string,
    date: string,
    note?: string,
    account: string,

}

export type IPaymentHistoryFilters = {
    searchTerm?: string;
    name?: string;
    status?: string;
    note?: string;
}