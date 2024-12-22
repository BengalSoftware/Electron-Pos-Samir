/* eslint-disable @typescript-eslint/no-explicit-any */
import { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';

import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { User } from '../user/user.model';
import { EmployeeSearchableFields } from './employee.constant';
import { IEmployee, IEmployeeFilters } from './employee.interface';
import { Employee } from './employee.model';

const getAllEmployees = async (
  filters: IEmployeeFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IEmployee[]>> => {
  // Extract searchTerm to implement search query
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];
  // Search needs $or for searching in specified fields
  if (searchTerm) {
    andConditions.push({
      $or: EmployeeSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }
  // Filters needs $and to fullfill all the conditions
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  // Dynamic  Sort needs  field to  do sorting
  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Employee.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Employee.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleEmployee = async (id: string): Promise<IEmployee | null> => {
  const loginInfo = await User.findOne({ employee: id });
  // console.log(loginInfo);
  const result = await Employee.findById(id);
  if (result && loginInfo) {
    const resultWithUserInfo: any = {
      ...(result.toObject() as IEmployee), // Convert Mongoose result to a regular object
      email: loginInfo.email,
      role: loginInfo.role,
    };

    return resultWithUserInfo;
  }

  return result;
};


// UPDATE EMPLOYEE
const updateEmployee = async (
  id: string,
  payload: Partial<IEmployee>
): Promise<IEmployee | null> => {
  const isExist = await Employee.findOne({ _id: id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Employee not found !');
  }

  const { ...EmployeeData } = payload;

  const updatedEmployeeData: Partial<IEmployee> = { ...EmployeeData };

  // if (name && Object.keys(name).length > 0) {
  //   Object.keys(name).forEach(key => {
  //     const nameKey = `name.${key}` as keyof Partial<IEmployee>; // `name.firstName`
  //     (updatedEmployeeData as any)[nameKey] = name[key as keyof typeof name];
  //   });
  // }


  const result = await Employee.findOneAndUpdate({ _id: id }, { $set: updatedEmployeeData }, {
    new: true,
  });
  return result;
};

const deleteEmployee = async (id: string): Promise<IEmployee | null> => {
  // check if the Employee is exist
  const isExist = await Employee.findOne({ _id: id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Employee not found !');
  }
  //delete Employee first
  const employee = await Employee.findOneAndDelete({ _id: id });
  if (!employee) {
    throw new ApiError(404, 'Failed to delete Employee');
  }
  //delete user
  // const u = await User.findOne({ employee: id });
  await User.findOneAndDelete({ employee: id });
  return employee;

};



export const EmployeeService = {
  getAllEmployees,
  getSingleEmployee,
  updateEmployee,
  deleteEmployee,
};
