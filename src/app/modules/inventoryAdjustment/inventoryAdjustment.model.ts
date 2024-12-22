import { Schema, model } from "mongoose";
import { IInventoryAdjustment } from "./inventoryAdjustment.interface";

const InventoryAdjustmentSchema = new Schema<IInventoryAdjustment>({
    products: [
        {
            _id: { type: String, required: true },
            code: { type: String, required: true },
            adjustmentQty: { type: Number, required: true },
            name: { type: String, required: true },
            price: { type: Number, required: true },
            type: {
                type: String,
                enum: ["increment", "decrement"],
                required: true
            },
        }
    ],
    code: {
        type: String
    },

    reason: {
        type: String,
        required: true,
    },
    date: {
        type: String,
    },
    status: {
        type: String,
        enum: ["active", "pending"],
        default: "active",
        required: true,
    },

    note: {
        type: String
    },
    createdBy: {
        type: String
    }
}, {
    timestamps: true
})

export const InventoryAdjustment = model<IInventoryAdjustment>("InventoryAdjustment", InventoryAdjustmentSchema);

