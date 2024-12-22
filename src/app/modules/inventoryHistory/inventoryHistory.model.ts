import { Schema, model } from "mongoose";
import { IInventoryHistory } from "./inventoryHistory.interface";

const InventoryHistorySchema = new Schema<IInventoryHistory>({
    product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },

    type: {
        type: String,
        enum: ["purchase", "invoice", "purchase return", "invoice return"],
        required: true,
    },
    stock: {
        type: String,
        enum: ["stock_in", "stock_out"],
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },

    date: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
    },
    person: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
    }

}, {
    timestamps: true
})

export const InventoryHistory = model<IInventoryHistory>("InventoryHistory", InventoryHistorySchema);

