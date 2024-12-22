import { Request, Response } from "express";
import httpStatus from "http-status";
import { paginationFields } from "../../../constants/pagination";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { ICategory } from "./category.interface";
import { CategoryService } from "./category.service";

const createCategory = catchAsync(async (req: Request, res: Response) => {
    const { ...categoryData } = req.body;
    const result = await CategoryService.createCategory(categoryData);

    sendResponse<ICategory>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Category created successfully",
        data: result
    })
})

const getAllCategories = catchAsync(async (req: Request, res: Response) => {

    const filters = pick(req.query, ["searchTerm", "name", "status"]);

    const paginationOptions = pick(req.query, paginationFields)

    const result = await CategoryService.getAllCategories(filters, paginationOptions);

    sendResponse<ICategory[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Category get successfully",
        meta: result.meta,
        data: result.data,
    })
})

const getCategory = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await CategoryService.getSingleCategory(id);

    sendResponse<ICategory>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Category get successfully",
        data: result
    })
})

const deleteCategory = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    await CategoryService.deleteCategory(id);

    sendResponse<ICategory>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Category delete successfully",
    })
})

const deleteAllCategories = catchAsync(async (req: Request, res: Response) => {
    await CategoryService.deleteAllCategories();

    sendResponse<ICategory>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Category delete successfully",
    })
})

const updateCategory = catchAsync(async (req: Request, res: Response) => {
    const { ...categoryData } = req.body;
    const { id } = req.params;
    const result = await CategoryService.updateCategory(id, categoryData);

    sendResponse<ICategory>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Category update successfully",
        data: result
    })
})


export const CategoryController = {
    createCategory,
    getCategory,
    updateCategory,
    getAllCategories,
    deleteCategory,
    deleteAllCategories
};
