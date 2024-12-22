import { Request, Response } from "express";
import httpStatus from "http-status";
import { paginationFields } from "../../../constants/pagination";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { ISupplier } from "./supplier.interface";
import { SupplierService } from "./supplier.service";

const createSupplier = catchAsync(async (req: Request, res: Response) => {
    const { ...SupplierData } = req.body;
    const result = await SupplierService.createSupplier(SupplierData);

    sendResponse<ISupplier>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Supplier created successfully",
        data: result
    })
})

const getAllCategories = catchAsync(async (req: Request, res: Response) => {

    const filters = pick(req.query, ["searchTerm", "name", "status"]);

    const paginationOptions = pick(req.query, paginationFields)

    const result = await SupplierService.getAllCategories(filters, paginationOptions);

    sendResponse<ISupplier[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Supplier get successfully",
        meta: result.meta,
        data: result.data,
    })
})

const getSupplier = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await SupplierService.getSingleSupplier(id);

    sendResponse<ISupplier>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Supplier get successfully",
        data: result
    })
})

const deleteSupplier = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    await SupplierService.deleteSupplier(id);

    sendResponse<ISupplier>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Supplier delete successfully",
    })
})

const deleteAllSuppliers = catchAsync(async (req: Request, res: Response) => {
    await SupplierService.deleteAllSuppliers();

    sendResponse<ISupplier>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Supplier delete successfully",
    })
})

const updateSupplier = catchAsync(async (req: Request, res: Response) => {
    const { ...SupplierData } = req.body;
    const { id } = req.params;
    const result = await SupplierService.updateSupplier(id, SupplierData);

    sendResponse<ISupplier>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Supplier update successfully",
        data: result
    })
})


export const SupplierController = {
    createSupplier,
    getSupplier,
    updateSupplier,
    getAllCategories,
    deleteSupplier,
    deleteAllSuppliers
};
