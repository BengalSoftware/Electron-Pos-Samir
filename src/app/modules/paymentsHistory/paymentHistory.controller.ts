import { Request, Response } from "express";
import httpStatus from "http-status";
import { paginationFields } from "../../../constants/pagination";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { IPaymentHistory } from "./paymentHistory.interface";
import { PaymentHistoryService } from "./paymentHistory.service";

const createPaymentHistory = catchAsync(async (req: Request, res: Response) => {
    const { ...PaymentHistoryData } = req.body;
    const result = await PaymentHistoryService.createPaymentHistory(PaymentHistoryData);

    sendResponse<IPaymentHistory>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "PaymentHistory created successfully",
        data: result
    })
})

const getAllPaymentHistories = catchAsync(async (req: Request, res: Response) => {

    const filters = pick(req.query, ["searchTerm", "supplierId", "clientId", "paymentFor"]);

    const paginationOptions = pick(req.query, paginationFields)

    const result = await PaymentHistoryService.getAllPaymentHistories(filters, paginationOptions);

    sendResponse<IPaymentHistory[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "PaymentHistory get successfully",
        meta: result.meta,
        data: result.data,
    })
})

const getPaymentHistory = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await PaymentHistoryService.getSinglePaymentHistory(id);

    sendResponse<IPaymentHistory>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "PaymentHistory get successfully",
        data: result
    })
})

const deletePaymentHistory = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    await PaymentHistoryService.deletePaymentHistory(id);

    sendResponse<IPaymentHistory>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "PaymentHistory delete successfully",
    })
})

const deleteAllPaymentHistories = catchAsync(async (req: Request, res: Response) => {
    await PaymentHistoryService.deleteAllPaymentHistories();

    sendResponse<IPaymentHistory>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "PaymentHistory delete successfully",
    })
})

const updatePaymentHistory = catchAsync(async (req: Request, res: Response) => {
    const { ...PaymentHistoryData } = req.body;
    const { id } = req.params;
    const result = await PaymentHistoryService.updatePaymentHistory(id, PaymentHistoryData);

    sendResponse<IPaymentHistory>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "PaymentHistory update successfully",
        data: result
    })
})


export const PaymentHistoryController = {
    createPaymentHistory,
    getPaymentHistory,
    updatePaymentHistory,
    getAllPaymentHistories,
    deletePaymentHistory,
    deleteAllPaymentHistories
};
