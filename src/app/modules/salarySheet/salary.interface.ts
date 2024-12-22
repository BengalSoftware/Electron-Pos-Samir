import { Model } from 'mongoose';

export type UserName = {
  firstName: string;
  lastName: string;
  middleName: string;
};

export type Guardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
  address: string;
};

export type LocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export type ISalary = {
  toObject(): ISalary;
  name: string;
  paidSalary: number;
  dueSalary?: number;
  bonus?: number;
  salaryDate?: string;
  note?: string;
};

export type SalaryModel = Model<ISalary, Record<string, unknown>>;

export type ISalaryFilters = {
  searchTerm?: string;
  id?: string;
  bloodGroup?: string;
  email?: string;
  contactNo?: string;
  emergencyContactNo?: string;
  month: string;
  year: string
};
