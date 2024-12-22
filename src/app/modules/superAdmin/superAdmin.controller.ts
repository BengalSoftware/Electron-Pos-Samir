import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { superAdminFilterableFields } from './superAdmin.constant';
import { ISuperAdmin } from './superAdmin.interface';
import { SuperAdminService } from './superAdmin.service';

const getSingleSuperAdmin = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await SuperAdminService.getSingleSuperAdmin(id);

  sendResponse<ISuperAdmin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin fetched successfully !',
    data: result,
  });
});

const getAllSuperAdmins = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, superAdminFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await SuperAdminService.getAllSuperAdmins(
    filters,
    paginationOptions
  );

  sendResponse<ISuperAdmin[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admins fetched successfully !',
    meta: result.meta,
    data: result.data,
  });
});

const updateSuperAdmin = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await SuperAdminService.updateSuperAdmin(id, updatedData);

  sendResponse<ISuperAdmin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin updated successfully !',
    data: result,
  });
});

const deleteSuperAdmin = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await SuperAdminService.deleteSuperAdmin(id);

  sendResponse<ISuperAdmin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin deleted successfully !',
    data: result,
  });
});

export const SuperAdminController = {
  getSingleSuperAdmin,
  getAllSuperAdmins,
  updateSuperAdmin,
  deleteSuperAdmin,
};
