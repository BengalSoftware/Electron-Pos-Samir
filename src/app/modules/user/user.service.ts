import httpStatus from 'http-status';
import mongoose from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { IAdmin } from '../admin/admin.interface';
import { Admin } from '../admin/admin.model';
import { IEmployee } from '../employee/employee.interface';
import { Employee } from '../employee/employee.model';
import { IUser } from './user.interface';
import { User } from './user.model';

import { Types } from 'mongoose';
import { ISuperAdmin } from '../superAdmin/superAdmin.interface';
import { SuperAdmin } from '../superAdmin/superAdmin.model';
import { generateEmployeeCode } from './user.utils';

// CREATE EMPLOYEE

const createEmployee = async (
  employee: IEmployee,
  userInfo: IUser,
): Promise<IEmployee | null> => {
  //hash password on model

  const session = await mongoose.startSession();
  let newEmployeeId: Types.ObjectId = new Types.ObjectId();

  try {
    session.startTransaction();
    employee.code = await generateEmployeeCode();

    // Create student using session
    const newEmployee = await Employee.create([employee], { session });

    if (!newEmployee.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create employee');
    }

    // set employee _id (reference) into user.employee
    newEmployeeId = newEmployee[0]._id;
    let newUser = null;

    if (userInfo?.email) {
      const user: IUser = {
        email: userInfo.email,
        password: userInfo.password,
        role: userInfo.role,
        employee: newEmployeeId,
      };

      newUser = await User.create([user], { session });
      if (!newUser.length) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user');
      }
    }

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  const newUserAllData = await Employee.findOne({ _id: newEmployeeId });

  return newUserAllData;
};

// CREATE ADMIN
const createAdmin = async (
  admin: IAdmin & {
    password?: string;
  }
): Promise<IUser | null> => {
  let newUserAllData = null;
  const session = await mongoose.startSession();
  let newAdminId: Types.ObjectId = new Types.ObjectId();

  try {
    session.startTransaction();
    // generate admin id

    const newAdmin = await Admin.create([admin], { session });

    if (!newAdmin.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create admin ');
    }

    newAdminId = newAdmin[0]._id;
    let newUser = null;

    if (admin?.email && admin?.password) {
      const user: IUser = {
        email: admin.email,
        password: admin.password,
        role: 'admin',
        admin: newAdminId,
      };

      newUser = await User.create([user], { session });
      if (!newUser.length) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user');
      }
    }

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  newUserAllData = await User.findOne({ _id: newAdminId });

  return newUserAllData;
};

// CREATE SUPER ADMIN
const createSuperAdmin = async (
  superAdmin: ISuperAdmin & {
    password: string
  }
): Promise<IUser | null> => {
  let newUserAllData = null;
  const session = await mongoose.startSession();
  let newAdminId: Types.ObjectId = new Types.ObjectId();

  const superAdminAlreadyExist = await SuperAdmin.find({});
  if (superAdminAlreadyExist.length > 0) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Super admin already created');
  }

  try {
    session.startTransaction();
    // generate admin id

    const newAdmin = await SuperAdmin.create([superAdmin], { session });

    if (!newAdmin.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create super admin ');
    }

    newAdminId = newAdmin[0]._id;
    let newUser = null;

    if (superAdmin?.email && superAdmin?.password) {
      const user: IUser = {
        email: superAdmin.email,
        password: superAdmin.password,
        role: 'superAdmin',
        admin: newAdminId,
      };

      newUser = await User.create([user], { session });

      if (!newUser.length) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user');
      }
    }

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  newUserAllData = await User.findOne({ _id: newAdminId });

  return newUserAllData;
};

export const UserService = {
  createEmployee,
  createAdmin,
  createSuperAdmin
};
