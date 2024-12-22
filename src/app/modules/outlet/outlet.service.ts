import httpStatus from 'http-status';
import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import {
  IManagementOutlet,
  IManagementOutletFilters,
} from './outlet.inerface';
import { ManagementOutlet } from './outlet.model';
import { managementOutletSearchableFields } from './outletconstant';

const createOutlet = async (
  payload: IManagementOutlet
): Promise<IManagementOutlet | null> => {
  const hasAlreadyMain = await ManagementOutlet.findOne({ branch: "main" });
  if (hasAlreadyMain && payload.branch === "main") {
    throw new ApiError(httpStatus.FORBIDDEN, "Already have a main branch")
  }
  const result = await ManagementOutlet.create(payload);
  return result;
};

const getSingleOutlet = async (
  id: string
): Promise<IManagementOutlet | null> => {
  const result = await ManagementOutlet.findById(id);
  return result;
};

const getAllOutlets = async (
  filters: IManagementOutletFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IManagementOutlet[]>> => {
  // Extract searchTerm to implement search query
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];
  // Search needs $or for searching in specified fields
  if (searchTerm) {
    andConditions.push({
      $or: managementOutletSearchableFields.map(field => ({
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

  const result = await ManagementOutlet.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await ManagementOutlet.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const updateOutlet = async (
  id: string,
  payload: Partial<IManagementOutlet>
): Promise<IManagementOutlet | null> => {
  const result = await ManagementOutlet.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    }
  );
  return result;
};

const deleteOutlet = async (
  id: string
): Promise<IManagementOutlet | null> => {
  const result = await ManagementOutlet.findByIdAndDelete(id);
  return result;
};

export const ManagementOutletService = {
  createOutlet,
  getAllOutlets,
  getSingleOutlet,
  updateOutlet,
  deleteOutlet,
};
