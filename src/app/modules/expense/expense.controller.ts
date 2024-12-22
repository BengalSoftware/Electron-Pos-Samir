import { Request, Response } from "express";
import httpStatus from "http-status";
import { paginationFields } from "../../../constants/pagination";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { IExpense } from "./expense.interface";
import { ExpenseService } from "./expense.service";

const createExpense = catchAsync(async (req: Request, res: Response) => {
    const { ...ExpenseData } = req.body;
    const result = await ExpenseService.createExpense(ExpenseData);

    sendResponse<IExpense>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Expense created successfully",
        data: result
    })
})

const getAllCategories = catchAsync(async (req: Request, res: Response) => {

    const filters = pick(req.query, ["searchTerm", "name", "status"]);

    const paginationOptions = pick(req.query, paginationFields)

    const result = await ExpenseService.getAllCategories(filters, paginationOptions);

    sendResponse<IExpense[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Expense get successfully",
        meta: result.meta,
        data: result.data,
    })
})

const getExpense = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await ExpenseService.getSingleExpense(id);

    sendResponse<IExpense>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Expense get successfully",
        data: result
    })
})

const deleteExpense = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    await ExpenseService.deleteExpense(id);

    sendResponse<IExpense>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Expense delete successfully",
    })
})

const deleteAllCategories = catchAsync(async (req: Request, res: Response) => {
    await ExpenseService.deleteAllCategories();

    sendResponse<IExpense>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Expense delete successfully",
    })
})

const updateExpense = catchAsync(async (req: Request, res: Response) => {
    const { ...ExpenseData } = req.body;
    const { id } = req.params;
    const result = await ExpenseService.updateExpense(id, ExpenseData);

    sendResponse<IExpense>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Expense update successfully",
        data: result
    })
})


export const ExpenseController = {
    createExpense,
    getExpense,
    updateExpense,
    getAllCategories,
    deleteExpense,
    deleteAllCategories
};
