/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose, { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';

import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { User } from '../user/user.model';
import { EmployeeSearchableFields } from './salary.constant';
import { ISalary, ISalaryFilters } from './salary.interface';
import { SalarySheet } from './salary.model';


const createSalary = async (salary: ISalary): Promise<ISalary | null> => {
  let session;

  try {
    session = await mongoose.startSession();
    session.startTransaction();

    const newSalary = await SalarySheet.create([salary], { session });

    if (!newSalary || newSalary.length === 0) {
      throw new Error('Failed to create Salary');
    }

    const newSalaryId = newSalary[0]._id;

    await session.commitTransaction();
    session.endSession();

    const newSalaryData = await SalarySheet.findOne({ _id: newSalaryId });
    return newSalaryData;
  } catch (error) {
    if (session) {
      await session.abortTransaction();
      session.endSession();
    }
    throw error;
  }
};


const getAllSalarySheet = async (
  filters: ISalaryFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<ISalary[]>> => {
  // Extract searchTerm to implement search query
  const { searchTerm, month, year, ...filtersData } = filters; 
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

  // Filters need $and to fulfill all the conditions
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  // Add conditions for filtering by month and year
  if (month && year) {
    andConditions.push({
      $expr: {
        $and: [
          { $eq: [{ $month: "$createdAt" }, parseInt(month)] }, // Assuming the date field is named "date"
          { $eq: [{ $year: "$createdAt" }, parseInt(year)] },
        ],
      },
    });
  }

  // Dynamic Sort needs field to do sorting
  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await SalarySheet.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await SalarySheet.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};


const getSingleSalarySheet = async (id: string): Promise<ISalary | null> => {
  // const loginInfo = await User.findOne({ employee: id });
  // console.log(loginInfo);
  const result = await SalarySheet.findById(id);
  if (result) {
    const resultWithUserInfo: any = {
      ...(result.toObject() as ISalary), // Convert Mongoose result to a regular object
      // email: loginInfo.email,
      // role: loginInfo.role,
    };

    return resultWithUserInfo;
  }

  return result;
};


// UPDATE EMPLOYEE
const updateSalarySheet = async (
  id: string,
  payload: Partial<ISalary>
): Promise<ISalary | null> => {
  const isExist = await SalarySheet.findOne({ _id: id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Employee not found !');
  }

  const { ...EmployeeData } = payload;

  const updatedEmployeeData: Partial<ISalary> = { ...EmployeeData };

  // if (name && Object.keys(name).length > 0) {
  //   Object.keys(name).forEach(key => {
  //     const nameKey = `name.${key}` as keyof Partial<ISalary>; // `name.firstName`
  //     (updatedEmployeeData as any)[nameKey] = name[key as keyof typeof name];
  //   });
  // }


  const result = await SalarySheet.findOneAndUpdate({ _id: id }, { $set: updatedEmployeeData }, {
    new: true,
  });
  return result;
};

const deleteSalarySheet = async (id: string): Promise<ISalary | null> => {
  // check if the Employee is exist
  const isExist = await SalarySheet.findOne({ _id: id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Employee not found !');
  }
  //delete Employee first
  const employee = await SalarySheet.findOneAndDelete({ _id: id });
  if (!employee) {
    throw new ApiError(404, 'Failed to delete Employee');
  }
  //delete user
  // const u = await User.findOne({ employee: id });
  await User.findOneAndDelete({ employee: id });
  return employee;

};



export const SalaryService = {
  createSalary,
  getAllSalarySheet,
  getSingleSalarySheet,
  updateSalarySheet,
  deleteSalarySheet,
};
