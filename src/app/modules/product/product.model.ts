import { Schema, model } from "mongoose";
import { IProduct } from "./product.interface";

const ProductSchema = new Schema<IProduct>({
    name: {
        type: String,
        required: true,
    },
    model: {
        type: String,
    },
    image: [
        {
            type: String,
        }
    ],
    productCode: {
        type: String,
        required: true,
        unique: true,
    },
    barcodeSymbology: {
        type: String,
        required: true,
    },
    category: {
        id: {
            type: Schema.Types.ObjectId,
            ref: 'Category'
        },
        name: String
    },
    subcategory: {
        id: {
            type: Schema.Types.ObjectId,
            ref: 'Subcategory'
        },
        name: String
    },
    brand: {
        type: String,
    },
    unit: {
        type: String,
        required: true,
    },
    vat: {
        type: Number,
        required: true,
        default: 0,
    },
    vatType: {
        type: String,
        enum: ["exclusive", "inclusive"],
        default: "exclusive",
        required: true,
    },
    status: {
        type: String,
        enum: ["active", "pending"],
        default: "active",
        required: true,
    },
    purchasePrice: {
        type: Number,
        required: true,
    },
    discountPercentage: {
        type: Number,
    },
    sellingPrice: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        default: 0 // quantity will add when purchase so its not required but required
    },
    alertQuantity: {
        type: Number,
    },
    note: {
        type: String
    },
    totalSale: {
        type: Number
    },
    supplier: {
        type: String
    },
    // supplier: {
    //     id: {
    //         type: Schema.Types.ObjectId,
    //         ref: 'Supplier'
    //     },
    //     name: String
    // }
}, {
    timestamps: true
})

export const Product = model<IProduct>("Product", ProductSchema);

