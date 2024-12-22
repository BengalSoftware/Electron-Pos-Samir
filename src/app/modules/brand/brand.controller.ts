import { Request, Response } from "express";
import httpStatus from "http-status";
import { paginationFields } from "../../../constants/pagination";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { IBrand } from "./brand.interface";
import { BrandService } from "./brand.service";

const createBrand = catchAsync(async (req: Request, res: Response) => {
    const { ...brandData } = req.body;
    const result = await BrandService.createBrand(brandData);

    sendResponse<IBrand>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Brand created successfully",
        data: result
    })
})

const getAllBrand = catchAsync(async (req: Request, res: Response) => {

    const filters = pick(req.query, ["searchTerm", "name", "status"]);

    const paginationOptions = pick(req.query, paginationFields)

    const result = await BrandService.getAllBrand(filters, paginationOptions);

    sendResponse<IBrand[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Brand get successfully",
        meta: result.meta,
        data: result.data,
    })
})

const getSingleBrand = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await BrandService.getSingleBrand(id);

    sendResponse<IBrand>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Brand get successfully",
        data: result
    })
})

const deleteBrand = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    await BrandService.deleteBrand(id);

    sendResponse<IBrand>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Brand delete successfully",
    })
})

const deleteAllBrand = catchAsync(async (req: Request, res: Response) => {
    await BrandService.deleteAllBrand();

    sendResponse<IBrand>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Brand delete successfully",
    })
})

const updateBrand = catchAsync(async (req: Request, res: Response) => {
    const { ...brandData } = req.body;
    const { id } = req.params;
    const result = await BrandService.updateBrand(id, brandData);

    sendResponse<IBrand>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Brand update successfully",
        data: result
    })
})


export const BrandsController = {
    createBrand,
    getSingleBrand,
    updateBrand,
    getAllBrand,
    deleteBrand,
    deleteAllBrand
};
