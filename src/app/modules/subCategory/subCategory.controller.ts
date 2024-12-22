import { Request, Response } from "express";
import httpStatus from "http-status";
import { paginationFields } from "../../../constants/pagination";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { ISubCategory } from "./subCategory.interface";
import { SubCategoryService } from "./subCategory.service";

const createSubCategory = catchAsync(async (req: Request, res: Response) => {
    const { ...categoryData } = req.body;
    const result = await SubCategoryService.createSubCategory(categoryData);

    sendResponse<ISubCategory>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Category created successfully",
        data: result
    })
})

const getAllSubCategories = catchAsync(async (req: Request, res: Response) => {

    const filters = pick(req.query, ["searchTerm", "name", "status"]);

    const paginationOptions = pick(req.query, paginationFields)

    const result = await SubCategoryService.getAllSubCategories(filters, paginationOptions);

    sendResponse<ISubCategory[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Category get successfully",
        meta: result.meta,
        data: result.data,
    })
})

const getSubCategory = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await SubCategoryService.getSingleSubCategory(id);

    sendResponse<ISubCategory>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Category get successfully",
        data: result
    })
})

const deleteSubCategory = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    await SubCategoryService.deleteSubCategory(id);

    sendResponse<ISubCategory>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Category delete successfully",
    })
})

const deleteAllSubCategories = catchAsync(async (req: Request, res: Response) => {
    await SubCategoryService.deleteAllSubCategories();

    sendResponse<ISubCategory>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Category delete successfully",
    })
})

const updateSubCategory = catchAsync(async (req: Request, res: Response) => {
    const { ...categoryData } = req.body;
    const { id } = req.params;
    const result = await SubCategoryService.updateSubCategory(id, categoryData);

    sendResponse<ISubCategory>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Category update successfully",
        data: result
    })
})


export const SubCategoryController = {
    createSubCategory,
    getSubCategory,
    updateSubCategory,
    getAllSubCategories,
    deleteSubCategory,
    deleteAllSubCategories
};
