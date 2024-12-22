import { Types } from "mongoose";

export type IPurchase = {
    save(): unknown;
    products: {
        _id: string;
        name: string;
        quantity: number;
        returnQty: number;
        purchasePrice: number;
        purchaseVat: number;
        totalPrice: number;
    }[];
    supplier: {
        id: Types.ObjectId,
        name: string,
    };
    code: string,
    isReturned: boolean,

    payments: {
        checkNo?: string,
        receiptNo?: string,
        paidAmount: number,
        status: string,
        date: string,
        note?: string,
        account: string,
    }[];

    invoiceTax: number;
    totalTax: number;
    netTotal: number;
    totalPayment: number;
    totalDue: number;
    subTotal: number;
    returnSubTotal: number;
    poReference?: string;
    paymentTerms?: string;
    discount: number;
    discountAmount: number,
    discountType: "fixed" | "percentage",
    transportCost?: number;

    purchaseDate?: string;
    createdBy?: string;
    poDate?: string;
    status: "active" | "pending";
    note?: string;
    image?: string;
}

export type IPurchaseFilters = {
    searchTerm?: string;
    name?: string;
    status?: string;
    note?: string;
}