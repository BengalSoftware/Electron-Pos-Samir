import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { EmployeeFilterableFields } from './salary.constant';
import { ISalary, ISalaryFilters } from './salary.interface';
import { SalaryService } from './salary.service';


const createSalary: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { ...salaryData } = req.body;
    const result = await SalaryService.createSalary(salaryData);

    sendResponse<ISalary>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Salary created successfully!',
      data: result,
    });
  }
);

const getSingleSalarySheet = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await SalaryService.getSingleSalarySheet(id);

  sendResponse<ISalary>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Salary fetched successfully !',
    data: result,
  });
});

const getAllSalarySheet = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, EmployeeFilterableFields) as Partial<ISalaryFilters>;

  const paginationOptions = pick(req.query, paginationFields);

  if (!filters.month || !filters.year) {
    sendResponse<ISalary[]>(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: 'Month and year are required filters.',
    });
    return;
  }

  const result = await SalaryService.getAllSalarySheet(
    filters as ISalaryFilters,
    paginationOptions
  );

  sendResponse<ISalary[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Salarys fetched successfully!',
    meta: result.meta,
    data: result.data,
  });
});


const updateSalarySheet = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await SalaryService.updateSalarySheet(id, updatedData);

  sendResponse<ISalary>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Salary updated successfully !',
    data: result,
  });
});

const deleteSalarySheet = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await SalaryService.deleteSalarySheet(id);

  sendResponse<ISalary>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Salary deleted successfully !',
    data: result,
  });
});

export const SalaryController = {
  createSalary,
  getSingleSalarySheet,
  getAllSalarySheet,
  updateSalarySheet,
  deleteSalarySheet,
};
