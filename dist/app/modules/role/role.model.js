"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = void 0;
const mongoose_1 = require("mongoose");
const RoleSchema = new mongoose_1.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    permissions: {
        type: [String],
        required: true,
    }
}, {
    timestamps: true
});
exports.Role = (0, mongoose_1.model)("Role", RoleSchema);
