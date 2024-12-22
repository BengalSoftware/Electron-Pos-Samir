"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryAdjustment = void 0;
const mongoose_1 = require("mongoose");
const InventoryAdjustmentSchema = new mongoose_1.Schema({
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
});
exports.InventoryAdjustment = (0, mongoose_1.model)("InventoryAdjustment", InventoryAdjustmentSchema);
