"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManagementOutlet = void 0;
const mongoose_1 = require("mongoose");
const ManagementOutletSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        // unique: true,
    },
    address: {
        type: String,
        required: true,
    },
    branch: {
        type: String,
        enum: ["main", "outlet"],
        required: true,
    },
    vatRegisterNo: String,
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.ManagementOutlet = (0, mongoose_1.model)('Outlet', ManagementOutletSchema);
