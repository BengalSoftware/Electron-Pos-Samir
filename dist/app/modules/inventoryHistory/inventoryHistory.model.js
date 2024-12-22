"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryHistory = void 0;
const mongoose_1 = require("mongoose");
const InventoryHistorySchema = new mongoose_1.Schema({
    product: {
        type: mongoose_1.Schema.Types.ObjectId,
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
});
exports.InventoryHistory = (0, mongoose_1.model)("InventoryHistory", InventoryHistorySchema);
