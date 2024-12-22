"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentHistory = void 0;
const mongoose_1 = require("mongoose");
const PaymentHistorySchema = new mongoose_1.Schema({
    //for a sale history
    saleId: {
        type: mongoose_1.Types.ObjectId,
        ref: "Sales",
    },
    clientId: {
        type: mongoose_1.Types.ObjectId,
        ref: "Client",
    },
    //for purchase history
    purchaseId: {
        type: mongoose_1.Types.ObjectId,
        ref: "Purchase",
    },
    supplierId: {
        type: mongoose_1.Types.ObjectId,
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
});
exports.PaymentHistory = (0, mongoose_1.model)("PaymentHistory", PaymentHistorySchema);
