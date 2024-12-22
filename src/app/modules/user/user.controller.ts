import { Request, Response } from 'express';
import { RequestHandler } from 'express-serve-static-core';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IEmployee } from '../employee/employee.interface';
import { IUser } from './user.interface';
import { UserService } from './user.service';

const createEmployee: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { userInfo, ...userData } = req.body;
    const result = await UserService.createEmployee(userData, userInfo);

    sendResponse<IEmployee>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Employee created successfully!',
      data: result,
    });
  }
);

const createAdmin: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { ...userData } = req.body;
    const result = await UserService.createAdmin(userData);

    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Admin created successfully!',
      data: result,
    });
  }
);

const createSuperAdmin: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { ...userData } = req.body;
    const result = await UserService.createSuperAdmin(userData);

    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Super admin created successfully!',
      data: result,
    });
  }
);

export const UserController = {
  createEmployee,
  createAdmin,
  createSuperAdmin,
};
