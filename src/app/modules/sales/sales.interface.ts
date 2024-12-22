import { Types } from "mongoose";

export type ISales = {
    save: any;
    invoiceNo: string,
    products: {
        _id: string;
        name: string;
        quantity: number;
        returnQty: number;
        purchasePrice: number;
        purchaseVat: number;
        totalPrice: number;
    }[];
    client: {
        id: Types.ObjectId,
        name: string,
    };
    deliveryPlace?: string,
    payments: {
        checkNo?: string,
        receiptNo?: string,
        paidAmount: number,
        status: string,
        date: string,
        note?: string,
        account: string,
    }[]; // payment history

    invoiceTax: number;
    discountAmount: number;
    totalTax: number;
    netTotal: number;
    subTotal: number;
    returnSubTotal: number;
    poReference?: string;
    paymentTerms?: string;
    discount?: number;
    discountType?: "fixed" | "percentage";
    transportCost?: number;
    totalDue: number;
    totalPayment: number;

    createdBy?: string;
    poDate?: string;
    status: "active" | "pending";
    note?: string;
    image?: string;
}

export type ISalesFilters = {
    searchTerm?: string;
    name?: string;
    status?: string;
    note?: string;
}