import { Request, Response } from "express";
import httpStatus from "http-status";
import { paginationFields } from "../../../constants/pagination";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { IExpenseSubCategory } from "./expenseSubCategory.interface";
import { ExpenseSubcategoryService } from "./expenseSubCategory.service";

const createSubCategory = catchAsync(async (req: Request, res: Response) => {
    const { ...categoryData } = req.body;
    const result = await ExpenseSubcategoryService.createExpenseSubcategory(categoryData);

    sendResponse<IExpenseSubCategory>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Category created successfully",
        data: result
    })
})

const getAllSubCategories = catchAsync(async (req: Request, res: Response) => {

    const filters = pick(req.query, ["searchTerm", "name", "status"]);

    const paginationOptions = pick(req.query, paginationFields)

    const result = await ExpenseSubcategoryService.getAllSubCategories(filters, paginationOptions);

    sendResponse<IExpenseSubCategory[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Category get successfully",
        meta: result.meta,
        data: result.data,
    })
})

const getSubCategory = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await ExpenseSubcategoryService.getSingleExpenseSubcategory(id);

    sendResponse<IExpenseSubCategory>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Category get successfully",
        data: result
    })
})

const deleteSubCategory = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    await ExpenseSubcategoryService.deleteExpenseSubcategory(id);

    sendResponse<IExpenseSubCategory>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Category delete successfully",
    })
})

const deleteAllSubCategories = catchAsync(async (req: Request, res: Response) => {
    await ExpenseSubcategoryService.deleteAllSubCategories();

    sendResponse<IExpenseSubCategory>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Category delete successfully",
    })
})

const updateSubCategory = catchAsync(async (req: Request, res: Response) => {
    const { ...categoryData } = req.body;
    const { id } = req.params;
    const result = await ExpenseSubcategoryService.updateExpenseSubcategory(id, categoryData);

    sendResponse<IExpenseSubCategory>(res, {
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
