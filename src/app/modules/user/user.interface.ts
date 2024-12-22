/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';
import { IAdmin } from '../admin/admin.interface';
import { IEmployee } from '../employee/employee.interface';

export type IUser = {
  email: string;
  password: string;
  role: string;
  passwordChangedAt?: Date;
  employee?: Types.ObjectId | IEmployee;
  // faculty?: Types.ObjectId | IFaculty;
  admin?: Types.ObjectId | IAdmin;
};

//this type for create static instance on the model
export type UserModel = {
  isUserExist(id: string): Promise<Pick<IUser, 'email' | 'password' | 'role'>>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IUser>;
