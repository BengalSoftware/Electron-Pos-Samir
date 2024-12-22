import { Schema, model } from 'mongoose';
import { ISalary, SalaryModel } from './salary.interface';

export const SalarySheetSchema = new Schema<ISalary, SalaryModel>(
  {
    name: {
      type: String,
      required: true,
    },
    paidSalary: {
      type: Number,
      required: true,
    },
    dueSalary: {
      type: Number,
    },
    bonus: {
      type: Number,
    },
    salaryDate: {
      type: String,
    },
    note: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const SalarySheet = model<ISalary, SalaryModel>(
  'SalarySheet',
  SalarySheetSchema
);
