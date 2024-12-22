import { Schema, model } from 'mongoose';
import {
  IManagementOutlet,
  ManagementOutletModel,
} from './outlet.inerface';

const ManagementOutletSchema = new Schema<
  IManagementOutlet,
  ManagementOutletModel
>(
  {
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
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const ManagementOutlet = model<IManagementOutlet, ManagementOutletModel
>('Outlet', ManagementOutletSchema);
