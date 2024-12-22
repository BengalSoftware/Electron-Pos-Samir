import { Schema, model } from 'mongoose';
import { bloodGroup, gender } from './employee.constant';
import { EmployeeModel, IEmployee } from './employee.interface';

export const EmployeeSchema = new Schema<IEmployee, EmployeeModel>(
  {
    name: {
      type: String,
      required: true,
    },
    code: String,
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
    salary: {
      type: Number,
      required: true,
    },
    bloodGroup: {
      type: String,
      enum: bloodGroup,
    },
    status: {
      type: String,
      enum: ["active", "inActive"],
      default: "active",
      required: true,
    },
    presentAddress: String,
    allowLogin: Boolean,
    permanentAddress: String,
    emergencyContactNo: String,
    profileImage: String,
    appointmentDate: String,
    commission: Number,
    department: String,
    religion: String,
    dateOfBirth: String,
    joinDate: String,
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Employee = model<IEmployee, EmployeeModel>(
  'Employee',
  EmployeeSchema
);
