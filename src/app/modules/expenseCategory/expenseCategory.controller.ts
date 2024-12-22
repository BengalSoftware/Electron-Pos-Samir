import { Request, Response } from "express";
import httpStatus from "http-status";
import { paginationFields } from "../../../constants/pagination";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { IExpenseCategory } from "./expenseCategory.interface";
import { ExpenseCategoryService } from "./expenseCategory.service";

const createCategory = catchAsync(async (req: Request, res: Response) => {
    const { ...categoryData } = req.body;
    const result = await ExpenseCategoryService.createCategory(categoryData);

    sendResponse<IExpenseCategory>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Category created successfully",
        data: result
    })
})

const getAllCategories = catchAsync(async (req: Request, res: Response) => {

    const filters = pick(req.query, ["searchTerm", "name", "status"]);

    const paginationOptions = pick(req.query, paginationFields)

    const result = await ExpenseCategoryService.getAllCategories(filters, paginationOptions);

    sendResponse<IExpenseCategory[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Category get successfully",
        meta: result.meta,
        data: result.data,
    })
})

const getCategory = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await ExpenseCategoryService.getSingleCategory(id);

    sendResponse<IExpenseCategory>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Category get successfully",
        data: result
    })
})

const deleteCategory = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    await ExpenseCategoryService.deleteCategory(id);

    sendResponse<IExpenseCategory>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Category delete successfully",
    })
})

const deleteAllCategories = catchAsync(async (req: Request, res: Response) => {
    await ExpenseCategoryService.deleteAllCategories();

    sendResponse<IExpenseCategory>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Category delete successfully",
    })
})

const updateCategory = catchAsync(async (req: Request, res: Response) => {
    const { ...categoryData } = req.body;
    const { id } = req.params;
    const result = await ExpenseCategoryService.updateCategory(id, categoryData);

    sendResponse<IExpenseCategory>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Category update successfully",
        data: result
    })
})


export const ExpenseCategoryController = {
    createCategory,
    getCategory,
    updateCategory,
    getAllCategories,
    deleteCategory,
    deleteAllCategories
};
