import { Request, Response } from "express";
import httpStatus from "http-status";
import { paginationFields } from "../../../constants/pagination";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { IBalanceAdjustment } from "./balanceAdjustment.interface";
import { BalanceAdjustmentService } from "./balanceAdjustment.service";

const createBalanceAdjustment = catchAsync(async (req: Request, res: Response) => {
    const { ...BalanceAdjustmentData } = req.body;
    const result = await BalanceAdjustmentService.createBalanceAdjustment(BalanceAdjustmentData);

    sendResponse<IBalanceAdjustment>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "BalanceAdjustment created successfully",
        data: result
    })
})

const getAllCategories = catchAsync(async (req: Request, res: Response) => {

    const filters = pick(req.query, ["searchTerm", "name", "status"]);

    const paginationOptions = pick(req.query, paginationFields)

    const result = await BalanceAdjustmentService.getAllCategories(filters, paginationOptions);

    sendResponse<IBalanceAdjustment[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "BalanceAdjustment get successfully",
        meta: result.meta,
        data: result.data,
    })
})

const getBalanceAdjustment = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await BalanceAdjustmentService.getSingleBalanceAdjustment(id);

    sendResponse<IBalanceAdjustment>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "BalanceAdjustment get successfully",
        data: result
    })
})

const deleteBalanceAdjustment = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    await BalanceAdjustmentService.deleteBalanceAdjustment(id);

    sendResponse<IBalanceAdjustment>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "BalanceAdjustment delete successfully",
    })
})

const deleteAllCategories = catchAsync(async (req: Request, res: Response) => {
    await BalanceAdjustmentService.deleteAllCategories();

    sendResponse<IBalanceAdjustment>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "BalanceAdjustment delete successfully",
    })
})

const updateBalanceAdjustment = catchAsync(async (req: Request, res: Response) => {
    const { ...BalanceAdjustmentData } = req.body;
    const { id } = req.params;
    const result = await BalanceAdjustmentService.updateBalanceAdjustment(id, BalanceAdjustmentData);

    sendResponse<IBalanceAdjustment>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "BalanceAdjustment update successfully",
        data: result
    })
})


export const BalanceAdjustmentController = {
    createBalanceAdjustment,
    getBalanceAdjustment,
    updateBalanceAdjustment,
    getAllCategories,
    deleteBalanceAdjustment,
    deleteAllCategories
};
