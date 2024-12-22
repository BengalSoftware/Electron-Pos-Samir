import { Schema, model } from "mongoose";
import { IRole } from "./role.interface";

const RoleSchema = new Schema<IRole>({
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
})

export const Role = model<IRole>("Role", RoleSchema);

