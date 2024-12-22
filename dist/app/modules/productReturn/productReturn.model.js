"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductReturn = void 0;
const mongoose_1 = require("mongoose");
const ProductReturnSchema = new mongoose_1.Schema({
    products: [
        {
            _id: { type: String, required: true },
            quantity: { type: Number, required: true },
            returnQty: { type: Number, required: true },
            name: { type: String, required: true },
            purchasePrice: { type: Number, required: true },
            purchaseVat: { type: Number, required: true },
            totalPrice: { type: Number, required: true },
        }
    ],
    code: {
        type: String
    },
    account: {
        id: {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Account"
        },
        name: String,
    },
    client: {
        id: String,
        name: String,
    },
    invoiceNo: String,
    totalTax: {
        type: Number,
        required: true,
    },
    returnTotalTax: {
        type: Number,
        required: true,
    },
    returnDiscountAmount: {
        type: Number,
        required: true,
        default: 0,
    },
    netTotal: {
        type: Number,
        required: true,
    },
    returnNetTotal: {
        type: Number,
        required: true,
    },
    subTotal: {
        type: Number,
        required: true,
    },
    returnSubTotal: {
        type: Number,
        required: true,
    },
    discount: {
        type: Number,
        default: 0
    },
    transportCost: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ["active", "pending"],
        default: "active",
        required: true,
    },
    createdBy: {
        type: String,
    },
    reason: {
        type: String,
        required: true,
    },
    date: {
        type: String,
    },
    note: {
        type: String
    },
    image: {
        type: String
    }
}, {
    timestamps: true
});
exports.ProductReturn = (0, mongoose_1.model)("ProductReturn", ProductReturnSchema);
