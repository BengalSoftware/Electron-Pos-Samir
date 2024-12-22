import { Model, Types } from 'mongoose';
import { IManagementOutlet } from '../outlet/outlet.inerface';

export type UserName = {
  firstName: string;
  lastName: string;
  middleName: string;
};

export type ISuperAdmin = {
  name: UserName;
  email: string;
  profileImage?: string;
  dateOfBirth?: string;
  contactNo: string;
  emergencyContactNo?: string;
  gender?: 'male' | 'female';
  permanentAddress?: string;
  presentAddress?: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  managementDepartment?: Types.ObjectId | IManagementOutlet;
  designation: string;
};

export type SuperAdminModel = Model<ISuperAdmin, Record<string, unknown>>;

export type ISuperAdminFilters = {
  searchTerm?: string;
  id?: string;
  email?: string;
  contactNo?: string;
  emergencyContactNo?: string;
  gender?: 'male' | 'female';
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  managementDepartment?: string;
  designation?: string;
};
