import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { IManagementOutlet } from './outlet.inerface';
import { ManagementOutletService } from './outlet.service';
import { managementOutletFilterableFields } from './outletconstant';

const createOutlet = catchAsync(async (req: Request, res: Response) => {
  const { ...OutletData } = req.body;
  const result = await ManagementOutletService.createOutlet(
    OutletData
  );

  sendResponse<IManagementOutlet>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Outlet created successfully',
    data: result,
  });
});

const getAllOutlets = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, managementOutletFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await ManagementOutletService.getAllOutlets(
    filters,
    paginationOptions
  );

  sendResponse<IManagementOutlet[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Management Outlets fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleOutlet = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ManagementOutletService.getSingleOutlet(id);

  sendResponse<IManagementOutlet>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Management Outlet fetched successfully',
    data: result,
  });
});

const updateOutlet = catchAsync(
  catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedData = req.body;
    const result = await ManagementOutletService.updateOutlet(
      id,
      updatedData
    );

    sendResponse<IManagementOutlet>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Management Outlet updated successfully',
      data: result,
    });
  })
);

const deleteOutlet = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ManagementOutletService.deleteOutlet(id);

  sendResponse<IManagementOutlet>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Management Outlet deleted successfully',
    data: result,
  });
});

export const ManagementOutletController = {
  createOutlet,
  getAllOutlets,
  getSingleOutlet,
  updateOutlet,
  deleteOutlet,
};
