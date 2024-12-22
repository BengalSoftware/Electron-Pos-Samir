import { Request, Response } from "express";
import httpStatus from "http-status";
import { paginationFields } from "../../../constants/pagination";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { IInventoryAdjustment } from "./inventoryAdjustment.interface";
import { InventoryAdjustmentService } from "./inventoryAdjustment.service";

const createInventoryAdjustment = catchAsync(async (req: Request, res: Response) => {
    const { ...InventoryAdjustmentData } = req.body;
    const result = await InventoryAdjustmentService.createInventoryAdjustment(InventoryAdjustmentData);

    sendResponse<IInventoryAdjustment>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "InventoryAdjustment created successfully",
        data: result
    })
})

const getAllCategories = catchAsync(async (req: Request, res: Response) => {

    const filters = pick(req.query, ["searchTerm", "name", "status"]);

    const paginationOptions = pick(req.query, paginationFields)

    const result = await InventoryAdjustmentService.getAllCategories(filters, paginationOptions);

    sendResponse<IInventoryAdjustment[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "InventoryAdjustment get successfully",
        meta: result.meta,
        data: result.data,
    })
})

const getInventoryAdjustment = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await InventoryAdjustmentService.getSingleInventoryAdjustment(id);

    sendResponse<IInventoryAdjustment>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "InventoryAdjustment get successfully",
        data: result
    })
})

const deleteInventoryAdjustment = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    await InventoryAdjustmentService.deleteInventoryAdjustment(id);

    sendResponse<IInventoryAdjustment>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "InventoryAdjustment delete successfully",
    })
})

const deleteAllCategories = catchAsync(async (req: Request, res: Response) => {
    await InventoryAdjustmentService.deleteAllCategories();

    sendResponse<IInventoryAdjustment>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "InventoryAdjustment delete successfully",
    })
})

const updateInventoryAdjustment = catchAsync(async (req: Request, res: Response) => {
    const { ...InventoryAdjustmentData } = req.body;
    const { id } = req.params;
    const result = await InventoryAdjustmentService.updateInventoryAdjustment(id, InventoryAdjustmentData);

    sendResponse<IInventoryAdjustment>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "InventoryAdjustment update successfully",
        data: result
    })
})


export const InventoryAdjustmentController = {
    createInventoryAdjustment,
    getInventoryAdjustment,
    updateInventoryAdjustment,
    getAllCategories,
    deleteInventoryAdjustment,
    deleteAllCategories
};
