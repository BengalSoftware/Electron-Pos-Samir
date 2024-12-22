import { Schema, model } from "mongoose";
import { IPurchase } from "./purchase.interface";

const PurchaseSchema = new Schema<IPurchase>({
    products: {
        type: [
            {
                _id: { type: String, required: true },
                name: { type: String, required: true },
                quantity: { type: Number, required: true },
                returnQty: { type: Number, }, //it will store when this product return
                purchasePrice: { type: Number, required: true },
                purchaseVat: { type: Number, required: true },
                totalPrice: { type: Number, required: true },
            }
        ],
        required: true,
    },
    code: String,
    isReturned: {
        type: Boolean,
        default: false,
    },
    supplier: {
        id: {
            type: Schema.Types.ObjectId,
            ref: "Supplier"
        },
        name: String,
    },
    payments: [], // this data comes from payments service model on the api call
    invoiceTax: { //percentage
        type: Number,
        required: true,
        default: 0,
    },
    totalTax: {
        type: Number,
        required: true,
        default: 0,
    },
    netTotal: {
        type: Number,
        required: true,
        default: 0,
    },
    totalPayment: {
        type: Number,
        required: true,
        default: 0,
    },
    totalDue: {
        type: Number,
        required: true,
        default: 0,
    },
    subTotal: {
        type: Number,
        required: true,
        default: 0,
    },
    returnSubTotal: {
        type: Number,
    },
    poReference: {
        type: String,
    },
    paymentTerms: {
        type: String,
    },
    discount: {
        type: Number,
        default: 0
    },
    discountAmount: {
        type: Number,
        default: 0
    },
    discountType: {
        type: String,
        enum: ["fixed", "percentage"],
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
        type: Number,
    },
    poDate: {
        type: String,
    },
    purchaseDate: {
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
})

export const Purchase = model<IPurchase>("Purchase", PurchaseSchema);

