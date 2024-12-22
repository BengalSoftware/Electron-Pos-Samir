import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { EmployeeFilterableFields } from './employee.constant';
import { IEmployee } from './employee.interface';
import { EmployeeService } from './employee.service';

const getSingleEmployee = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await EmployeeService.getSingleEmployee(id);

  sendResponse<IEmployee>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Employee fetched successfully !',
    data: result,
  });
});

const getAllEmployees = catchAsync(async (req: Request, res: Response) => {

  const filters = pick(req.query, EmployeeFilterableFields);

  const paginationOptions = pick(req.query, paginationFields);

  const result = await EmployeeService.getAllEmployees(
    filters,
    paginationOptions
  );

  sendResponse<IEmployee[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Employees fetched successfully !',
    meta: result.meta,
    data: result.data,
  });
});

const updateEmployee = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await EmployeeService.updateEmployee(id, updatedData);

  sendResponse<IEmployee>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Employee updated successfully !',
    data: result,
  });
});

const deleteEmployee = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await EmployeeService.deleteEmployee(id);

  sendResponse<IEmployee>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Employee deleted successfully !',
    data: result,
  });
});

export const EmployeeController = {
  getSingleEmployee,
  getAllEmployees,
  updateEmployee,
  deleteEmployee,
};
