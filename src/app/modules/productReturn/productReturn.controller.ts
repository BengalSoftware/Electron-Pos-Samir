import { Request, Response } from "express";
import httpStatus from "http-status";
import { paginationFields } from "../../../constants/pagination";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { IProductReturn } from "./productReturn.interface";
import { ProductReturnService } from "./productReturn.service";

const createProductReturn = catchAsync(async (req: Request, res: Response) => {
    const { ...ProductReturnData } = req.body;
    const result = await ProductReturnService.createProductReturn(ProductReturnData);

    sendResponse<IProductReturn>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "ProductReturn created successfully",
        data: result
    })
})

const getAllProductReturns = catchAsync(async (req: Request, res: Response) => {

    const filters = pick(req.query, ["searchTerm", "client.id", "status"]);

    const paginationOptions = pick(req.query, paginationFields)

    const result = await ProductReturnService.getAllProductReturns(filters, paginationOptions);

    sendResponse<IProductReturn[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "ProductReturn get successfully",
        meta: result.meta,
        data: result.data,
    })
})

const getProductReturn = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await ProductReturnService.getSingleProductReturn(id);

    sendResponse<IProductReturn>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "ProductReturn get successfully",
        data: result
    })
})

const deleteProductReturn = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    await ProductReturnService.deleteProductReturn(id);

    sendResponse<IProductReturn>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "ProductReturn delete successfully",
    })
})

const deleteAllProductReturns = catchAsync(async (req: Request, res: Response) => {
    await ProductReturnService.deleteAllProductReturns();

    sendResponse<IProductReturn>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "ProductReturn delete successfully",
    })
})

const updateProductReturn = catchAsync(async (req: Request, res: Response) => {
    const { ...ProductReturnData } = req.body;
    const { id } = req.params;
    const result = await ProductReturnService.updateProductReturn(id, ProductReturnData);

    sendResponse<IProductReturn>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "ProductReturn update successfully",
        data: result
    })
})


export const ProductReturnController = {
    createProductReturn,
    getProductReturn,
    updateProductReturn,
    getAllProductReturns,
    deleteProductReturn,
    deleteAllProductReturns
};
