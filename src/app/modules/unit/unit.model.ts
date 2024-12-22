import { Schema, model } from "mongoose";
import { IUnit } from "./unit.interface";

const UnitSchema = new Schema<IUnit>({
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
    }
}, {
    timestamps: true
})

export const Unit = model<IUnit>("Units", UnitSchema);

