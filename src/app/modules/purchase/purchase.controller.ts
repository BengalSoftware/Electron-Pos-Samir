import { Request, Response } from "express";
import httpStatus from "http-status";
import { paginationFields } from "../../../constants/pagination";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { IPurchase } from "./purchase.interface";
import { PurchaseService } from "./purchase.service";

const createPurchase = catchAsync(async (req: Request, res: Response) => {
    const { ...PurchaseData } = req.body;
    const result = await PurchaseService.createPurchase(PurchaseData);

    sendResponse<IPurchase>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Purchase created successfully",
        data: result
    })
})

const getAllPurchases = catchAsync(async (req: Request, res: Response) => {

    const filters = pick(req.query, ["searchTerm", "name", "isReturned", "supplier.id"]);

    const paginationOptions = pick(req.query, paginationFields)

    const result = await PurchaseService.getAllPurchases(filters, paginationOptions);

    sendResponse<IPurchase[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Purchase get successfully",
        meta: result.meta,
        data: result.data,
    })
})

const getPurchase = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await PurchaseService.getSinglePurchase(id);

    sendResponse<IPurchase>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Purchase get successfully",
        data: result
    })
})

const deletePurchase = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    await PurchaseService.deletePurchase(id);

    sendResponse<IPurchase>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Purchase delete successfully",
    })
})

const deleteAllPurchases = catchAsync(async (req: Request, res: Response) => {
    await PurchaseService.deleteAllPurchases();

    sendResponse<IPurchase>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Purchase delete successfully",
    })
})

const updatePurchase = catchAsync(async (req: Request, res: Response) => {
    const { ...purchaseData } = req.body;
    const { id } = req.params;
    const result = await PurchaseService.updatePurchase(id, purchaseData);

    sendResponse<IPurchase>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Purchase update successfully",
        data: result
    })
})
const addPayment = catchAsync(async (req: Request, res: Response) => {
    const { ...purchaseData } = req.body;
    const { id } = req.params;
    const result = await PurchaseService.addPayment(id, purchaseData);

    sendResponse<IPurchase>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Payment successfully",
        data: result
    })
})


export const PurchaseController = {
    createPurchase,
    getPurchase,
    updatePurchase,
    getAllPurchases,
    deletePurchase,
    deleteAllPurchases,
    addPayment
};
