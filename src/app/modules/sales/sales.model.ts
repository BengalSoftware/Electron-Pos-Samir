import { Schema, model } from "mongoose";
import { ISales } from "./sales.interface";

const SalesSchema = new Schema<ISales>({
    invoiceNo: {
        type: String,
        required: true,
        unique: true,
    },
    products: {
        type: [
            {
                _id: { type: String, required: true },
                name: { type: String, required: true },
                quantity: { type: Number, required: true },
                returnQty: { type: Number, },
                purchasePrice: { type: Number, required: true },
                purchaseVat: { type: Number, required: true },
                totalPrice: { type: Number, required: true },
            }
        ],
        required: true,
    },
    client: {
        id: {
            type: Schema.Types.ObjectId,
            ref: "Client"
        },
        name: String,
    },
    deliveryPlace: {
        type: String
    },
    payments: [], // this data comes from payments service model on the api call
    invoiceTax: {
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
    subTotal: {
        type: Number,
        required: true,
        default: 0,
    },
    returnSubTotal: {
        type: Number,
    },
    totalDue: {
        type: Number,
        required: true,
    },
    totalPayment: {
        type: Number,
        required: true,
        default: 0,
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
        type: String,
    },
    poDate: {
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

export const Sales = model<ISales>("Sales", SalesSchema);

