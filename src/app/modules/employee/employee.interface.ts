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

export type IEmployee = {
  toObject(): IEmployee;
  name: string; //embedded object
  code: string;
  gender: 'male' | 'female' | 'transGender' | 'others';
  status: 'active' | 'inActive';
  dateOfBirth?: string;
  joinDate?: string;
  appointmentDate?: string;
  contactNo: string;
  emergencyContactNo?: string;
  allowLogin: boolean;
  religion?: string;
  department: string;
  designation: string;
  salary: number;
  commission?: number;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress?: string;
  permanentAddress?: string;
  profileImage?: string;
};

export type EmployeeModel = Model<IEmployee, Record<string, unknown>>;

export type IEmployeeFilters = {
  searchTerm?: string;
  id?: string;
  bloodGroup?: string;
  email?: string;
  contactNo?: string;
  emergencyContactNo?: string;
};
