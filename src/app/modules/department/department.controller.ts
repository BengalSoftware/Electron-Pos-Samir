import { Request, Response } from "express";
import httpStatus from "http-status";
import { paginationFields } from "../../../constants/pagination";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { IDepartment } from "./department.interface";
import { DepartmentService } from "./department.service";

const createDepartment = catchAsync(async (req: Request, res: Response) => {
    const { ...DepartmentData } = req.body;
    const result = await DepartmentService.createDepartment(DepartmentData);

    sendResponse<IDepartment>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Department created successfully",
        data: result
    })
})

const getAllDepartments = catchAsync(async (req: Request, res: Response) => {

    const filters = pick(req.query, ["searchTerm", "name", "status"]);

    const paginationOptions = pick(req.query, paginationFields)

    const result = await DepartmentService.getAllDepartments(filters, paginationOptions);

    sendResponse<IDepartment[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Department get successfully",
        meta: result.meta,
        data: result.data,
    })
})

const getDepartment = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await DepartmentService.getSingleDepartment(id);

    sendResponse<IDepartment>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Department get successfully",
        data: result
    })
})

const deleteDepartment = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    await DepartmentService.deleteDepartment(id);

    sendResponse<IDepartment>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Department delete successfully",
    })
})

const deleteAllDepartments = catchAsync(async (req: Request, res: Response) => {
    await DepartmentService.deleteAllDepartments();

    sendResponse<IDepartment>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Department delete successfully",
    })
})

const updateDepartment = catchAsync(async (req: Request, res: Response) => {
    const { ...DepartmentData } = req.body;
    const { id } = req.params;
    const result = await DepartmentService.updateDepartment(id, DepartmentData);

    sendResponse<IDepartment>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Department update successfully",
        data: result
    })
})


export const DepartmentController = {
    createDepartment,
    getDepartment,
    updateDepartment,
    getAllDepartments,
    deleteDepartment,
    deleteAllDepartments
};
