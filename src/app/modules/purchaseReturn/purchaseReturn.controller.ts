import { Request, Response } from "express";
import httpStatus from "http-status";
import { paginationFields } from "../../../constants/pagination";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { IPurchaseReturn } from "./purchaseReturn.interface";
import { PurchaseReturnService } from "./purchaseReturn.service";

const createPurchaseReturn = catchAsync(async (req: Request, res: Response) => {
    const { ...PurchaseReturnData } = req.body;
    const result = await PurchaseReturnService.createPurchaseReturn(PurchaseReturnData);

    sendResponse<IPurchaseReturn>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "PurchaseReturn created successfully",
        data: result
    })
})

const getAllPurchaseReturns = catchAsync(async (req: Request, res: Response) => {

    const filters = pick(req.query, ["searchTerm", "supplier.id", "status"]);

    const paginationOptions = pick(req.query, paginationFields)

    const result = await PurchaseReturnService.getAllPurchaseReturns(filters, paginationOptions);

    sendResponse<IPurchaseReturn[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "PurchaseReturn get successfully",
        meta: result.meta,
        data: result.data,
    })
})

const getPurchaseReturn = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await PurchaseReturnService.getSinglePurchaseReturn(id);

    sendResponse<IPurchaseReturn>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "PurchaseReturn get successfully",
        data: result
    })
})

const deletePurchaseReturn = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    await PurchaseReturnService.deletePurchaseReturn(id);

    sendResponse<IPurchaseReturn>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "PurchaseReturn delete successfully",
    })
})

const deleteAllPurchaseReturns = catchAsync(async (req: Request, res: Response) => {
    await PurchaseReturnService.deleteAllPurchaseReturns();

    sendResponse<IPurchaseReturn>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "PurchaseReturn delete successfully",
    })
})

const updatePurchaseReturn = catchAsync(async (req: Request, res: Response) => {
    const { ...PurchaseReturnData } = req.body;
    const { id } = req.params;
    const result = await PurchaseReturnService.updatePurchaseReturn(id, PurchaseReturnData);

    sendResponse<IPurchaseReturn>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "PurchaseReturn update successfully",
        data: result
    })
})


export const PurchaseReturnController = {
    createPurchaseReturn,
    getPurchaseReturn,
    updatePurchaseReturn,
    getAllPurchaseReturns,
    deletePurchaseReturn,
    deleteAllPurchaseReturns
};
