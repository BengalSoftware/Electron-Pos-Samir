import { Request, Response } from "express";
import httpStatus from "http-status";
import { paginationFields } from "../../../constants/pagination";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { IBalanceTransfer } from "./balanceTransfer.interface";
import { BalanceTransferService } from "./balanceTransfer.service";

const createBalanceTransfer = catchAsync(async (req: Request, res: Response) => {
    const { ...BalanceTransferData } = req.body;
    const result = await BalanceTransferService.createBalanceTransfer(BalanceTransferData);

    sendResponse<IBalanceTransfer>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "BalanceTransfer created successfully",
        data: result
    })
})

const getAllBalanceTransfer = catchAsync(async (req: Request, res: Response) => {

    const filters = pick(req.query, ["searchTerm", "name", "status"]);

    const paginationOptions = pick(req.query, paginationFields)

    const result = await BalanceTransferService.getAllBalanceTransfer(filters, paginationOptions);

    sendResponse<IBalanceTransfer[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "BalanceTransfer get successfully",
        meta: result.meta,
        data: result.data,
    })
})

const getBalanceTransfer = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await BalanceTransferService.getSingleBalanceTransfer(id);

    sendResponse<IBalanceTransfer>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "BalanceTransfer get successfully",
        data: result
    })
})

const deleteBalanceTransfer = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    await BalanceTransferService.deleteBalanceTransfer(id);

    sendResponse<IBalanceTransfer>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "BalanceTransfer delete successfully",
    })
})

const deleteAllBalanceTransfer = catchAsync(async (req: Request, res: Response) => {
    await BalanceTransferService.deleteAllBalanceTransfer();

    sendResponse<IBalanceTransfer>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "BalanceTransfer delete successfully",
    })
})

const updateBalanceTransfer = catchAsync(async (req: Request, res: Response) => {
    const { ...BalanceTransferData } = req.body;
    const { id } = req.params;
    const result = await BalanceTransferService.updateBalanceTransfer(id, BalanceTransferData);

    sendResponse<IBalanceTransfer>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "BalanceTransfer update successfully",
        data: result
    })
})


export const BalanceTransferController = {
    createBalanceTransfer,
    getBalanceTransfer,
    updateBalanceTransfer,
    getAllBalanceTransfer,
    deleteBalanceTransfer,
    deleteAllBalanceTransfer
};
