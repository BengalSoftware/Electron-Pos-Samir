"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Settings = void 0;
const mongoose_1 = require("mongoose");
const SettingsSchema = new mongoose_1.Schema({
    // company information
    companyName: {
        type: String,
        required: true
    },
    companyTagline: {
        type: String,
        required: true
    },
    companyEmail: {
        type: String,
        required: true
    },
    companyPhone: {
        type: String,
        required: true
    },
    companyAddress: {
        type: String,
        required: true
    },
    // prefixes
    clientPrefix: {
        type: String,
        required: true
    },
    supplierPrefix: {
        type: String,
        required: true
    },
    employeePrefix: {
        type: String,
        required: true
    },
    productPrefix: {
        type: String,
        required: true
    },
    purchasePrefix: {
        type: String,
        required: true
    },
    purchaseReturnPrefix: {
        type: String,
        required: true
    },
    invoicePrefix: {
        type: String,
        required: true
    },
    invoiceReturnPrefix: {
        type: String,
        required: true
    },
    inventoryAdjustmentPrefix: {
        type: String,
        required: true
    },
    //default elements
    currencyIcon: {
        type: String,
        required: true
    },
    //default elements
    copyrightText: {
        type: String,
        required: true
    },
    // images
    favIcon: {
        type: String
    },
    smallLogo: {
        type: String
    },
    whiteLogo: {
        type: String
    },
    blackLogo: {
        type: String
    }
}, {
    timestamps: true,
});
exports.Settings = (0, mongoose_1.model)('Settings', SettingsSchema);
