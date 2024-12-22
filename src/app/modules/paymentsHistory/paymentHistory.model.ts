import { Schema, Types, model } from "mongoose";
import { IPaymentHistory } from "./paymentHistory.interface";

const PaymentHistorySchema = new Schema<IPaymentHistory>({
    //for a sale history
    saleId: {
        type: Types.ObjectId,
        ref: "Sales",
    },
    clientId: {
        type: Types.ObjectId,
        ref: "Client",
    },

    //for purchase history
    purchaseId: {
        type: Types.ObjectId,
        ref: "Purchase",
    },
    supplierId: {
        type: Types.ObjectId,
        ref: "Supplier",
    },
    paymentFor: {
        type: String,
        enum: ["supplier", "client"],
        required: true,
    },
    checkNo: { type: String },
    receiptNo: { type: String },
    paidAmount: { type: Number, required: true, },
    status: { type: String, required: true, },
    date: { type: String, required: true, },
    note: { type: String },
    account: {
        type: String,
        required: true,
    },


}, {
    timestamps: true
})

export const PaymentHistory = model<IPaymentHistory>("PaymentHistory", PaymentHistorySchema);

