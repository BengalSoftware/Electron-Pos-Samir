"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoanAuthority = void 0;
const mongoose_1 = require("mongoose");
const LoanAuthoritySchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    account: {
        type: String,
        unique: true,
        required: true,
    },
    address: {
        type: String,
    },
    ccLimit: {
        type: Number,
        required: true
    },
    contactNo: {
        type: String,
    },
    email: {
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
}, {
    timestamps: true
});
exports.LoanAuthority = (0, mongoose_1.model)("LoanAuthority", LoanAuthoritySchema);
