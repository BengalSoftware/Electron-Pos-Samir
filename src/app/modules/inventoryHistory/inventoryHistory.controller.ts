import { Request, Response } from "express";
import httpStatus from "http-status";
import { paginationFields } from "../../../constants/pagination";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { IInventoryHistory } from "./inventoryHistory.interface";
import { InventoryHistoryService } from "./inventoryHistory.service";

const createInventoryHistory = catchAsync(async (req: Request, res: Response) => {
    const { ...InventoryHistoryData } = req.body;
    const result = await InventoryHistoryService.createInventoryHistory(InventoryHistoryData);

    sendResponse<IInventoryHistory>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "InventoryHistory created successfully",
        data: result
    })
})

const getAllInventoryHistories = catchAsync(async (req: Request, res: Response) => {

    const filters = pick(req.query, ["searchTerm", "name", "status"]);

    const paginationOptions = pick(req.query, paginationFields)

    const result = await InventoryHistoryService.getAllInventoryHistories(filters, paginationOptions);

    sendResponse<IInventoryHistory[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "InventoryHistory get successfully",
        meta: result.meta,
        data: result.data,
    })
})

const getInventoryHistory = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await InventoryHistoryService.getSingleInventoryHistory(id);

    sendResponse<IInventoryHistory[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "InventoryHistory get successfully",
        data: result
    })
})

const deleteInventoryHistory = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    await InventoryHistoryService.deleteInventoryHistory(id);

    sendResponse<IInventoryHistory>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "InventoryHistory delete successfully",
    })
})

const deleteAllInventoryHistories = catchAsync(async (req: Request, res: Response) => {
    await InventoryHistoryService.deleteAllInventoryHistories();

    sendResponse<IInventoryHistory>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "InventoryHistory delete successfully",
    })
})

const updateInventoryHistory = catchAsync(async (req: Request, res: Response) => {
    const { ...InventoryHistoryData } = req.body;
    const { id } = req.params;
    const result = await InventoryHistoryService.updateInventoryHistory(id, InventoryHistoryData);

    sendResponse<IInventoryHistory>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "InventoryHistory update successfully",
        data: result
    })
})


export const InventoryHistoryController = {
    createInventoryHistory,
    getInventoryHistory,
    updateInventoryHistory,
    getAllInventoryHistories,
    deleteInventoryHistory,
    deleteAllInventoryHistories
};
