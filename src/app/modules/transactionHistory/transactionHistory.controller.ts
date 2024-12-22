import { Request, Response } from "express";
import httpStatus from "http-status";
import { paginationFields } from "../../../constants/pagination";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { ITransactionHistory } from "./transactionHistory.interface";
import { TransactionHistoryService } from "./transactionHistory.service";

const createTransactionHistory = catchAsync(async (req: Request, res: Response) => {
    const { ...TransactionHistoryData } = req.body;
    const result = await TransactionHistoryService.createTransactionHistory(TransactionHistoryData);

    sendResponse<ITransactionHistory>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "TransactionHistory created successfully",
        data: result
    })
})

const getAllTransactionHistory = catchAsync(async (req: Request, res: Response) => {

    const filters = pick(req.query, ["searchTerm", "name", "status"]);

    const paginationOptions = pick(req.query, paginationFields)

    const result = await TransactionHistoryService.getAllTransactionHistory(filters, paginationOptions);

    sendResponse<ITransactionHistory[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "TransactionHistory get successfully",
        meta: result.meta,
        data: result.data,
    })
})

const getTransactionHistory = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await TransactionHistoryService.getSingleTransactionHistory(id);

    sendResponse<ITransactionHistory>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "TransactionHistory get successfully",
        data: result
    })
})

const deleteTransactionHistory = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    await TransactionHistoryService.deleteTransactionHistory(id);

    sendResponse<ITransactionHistory>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "TransactionHistory delete successfully",
    })
})

const deleteAllTransactionHistory = catchAsync(async (req: Request, res: Response) => {
    await TransactionHistoryService.deleteAllTransactionHistory();

    sendResponse<ITransactionHistory>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "TransactionHistory delete successfully",
    })
})

const updateTransactionHistory = catchAsync(async (req: Request, res: Response) => {
    const { ...TransactionHistoryData } = req.body;
    const { id } = req.params;
    const result = await TransactionHistoryService.updateTransactionHistory(id, TransactionHistoryData);

    sendResponse<ITransactionHistory>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "TransactionHistory update successfully",
        data: result
    })
})


export const TransactionHistoryController = {
    createTransactionHistory,
    getTransactionHistory,
    updateTransactionHistory,
    getAllTransactionHistory,
    deleteTransactionHistory,
    deleteAllTransactionHistory
};
