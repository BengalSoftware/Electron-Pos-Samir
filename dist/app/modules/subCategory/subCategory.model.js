"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubCategory = void 0;
const mongoose_1 = require("mongoose");
const SubCategorySchema = new mongoose_1.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
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
    category: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});
exports.SubCategory = (0, mongoose_1.model)("Subcategory", SubCategorySchema);
