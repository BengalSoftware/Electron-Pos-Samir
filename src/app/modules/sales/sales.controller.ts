import { Request, Response } from "express";
import httpStatus from "http-status";
import { paginationFields } from "../../../constants/pagination";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { ISales } from "./sales.interface";
import { SalesService } from "./sales.service";

const createSales = catchAsync(async (req: Request, res: Response) => {
    const { ...SalesData } = req.body;
    const result = await SalesService.createSales(SalesData);

    sendResponse<ISales>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Sales created successfully",
        data: result
    })
})

const getAllAllSales = catchAsync(async (req: Request, res: Response) => {

    const filters = pick(req.query, ["searchTerm", "client.id", "name", "_id", "status"]);

    const paginationOptions = pick(req.query, paginationFields);

    const result = await SalesService.getAllSales(filters, paginationOptions);

    sendResponse<ISales[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Sales get successfully",
        meta: result.meta,
        data: result.data,
    })
})

const getSales = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await SalesService.getSingleSales(id);

    sendResponse<ISales>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Sales get successfully",
        data: result
    })
})

const deleteSales = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    await SalesService.deleteSales(id);

    sendResponse<ISales>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Sales delete successfully",
    })
})

const deleteAllSaless = catchAsync(async (req: Request, res: Response) => {
    await SalesService.deleteAllSales();

    sendResponse<ISales>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Sales delete successfully",
    })
})

const updateSales = catchAsync(async (req: Request, res: Response) => {
    const { ...SalesData } = req.body;
    const { id } = req.params;
    const result = await SalesService.updateSales(id, SalesData);

    sendResponse<ISales>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Sales update successfully",
        data: result
    })
})

const addPayment = catchAsync(async (req: Request, res: Response) => {
    const { ...SalesData } = req.body;
    const { id } = req.params;
    const result = await SalesService.addPayment(id, SalesData);

    sendResponse<ISales>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Sales update successfully",
        data: result
    })
})


export const SalesController = {
    createSales,
    getSales,
    updateSales,
    getAllAllSales,
    deleteSales,
    deleteAllSaless,
    addPayment
};
