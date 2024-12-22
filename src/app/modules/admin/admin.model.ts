import { Schema, model } from 'mongoose';
import { bloodGroup, gender } from '../employee/employee.constant';
import { AdminModel, IAdmin } from './admin.interface';

const AdminSchema = new Schema<IAdmin, AdminModel>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: gender,
    },
    contactNo: {
      type: String,
      unique: true,
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },

    // managementDepartment: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'ManagementDepartment',
    //   required: true,
    // },
    bloodGroup: {
      type: String,
      enum: bloodGroup,
    },
    presentAddress: String,
    permanentAddress: String,
    emergencyContactNo: String,
    profileImage: String,
    dateOfBirth: String,
  },
  {
    timestamps: true,
  }
);

export const Admin = model<IAdmin, AdminModel>('Admin', AdminSchema);
