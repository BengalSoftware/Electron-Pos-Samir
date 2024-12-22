import { Request, Response } from "express";
import httpStatus from "http-status";
import { paginationFields } from "../../../constants/pagination";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { IAccount } from "./account.interface";
import { AccountService } from "./account.service";

const createAccount = catchAsync(async (req: Request, res: Response) => {
    const { ...AccountData } = req.body;
    const result = await AccountService.createAccount(AccountData);

    sendResponse<IAccount>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Account created successfully",
        data: result
    })
})

const getAllCategories = catchAsync(async (req: Request, res: Response) => {

    const filters = pick(req.query, ["searchTerm", "name", "status"]);

    const paginationOptions = pick(req.query, paginationFields)

    const result = await AccountService.getAllCategories(filters, paginationOptions);

    sendResponse<IAccount[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Account get successfully",
        meta: result.meta,
        data: result.data,
    })
})

const getAccount = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await AccountService.getSingleAccount(id);

    sendResponse<IAccount>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Account get successfully",
        data: result
    })
})

const deleteAccount = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    await AccountService.deleteAccount(id);

    sendResponse<IAccount>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Account delete successfully",
    })
})

const deleteAllCategories = catchAsync(async (req: Request, res: Response) => {
    await AccountService.deleteAllCategories();

    sendResponse<IAccount>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Account delete successfully",
    })
})

const updateAccount = catchAsync(async (req: Request, res: Response) => {
    const { ...AccountData } = req.body;
    const { id } = req.params;
    const result = await AccountService.updateAccount(id, AccountData);

    sendResponse<IAccount>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Account update successfully",
        data: result
    })
})


export const AccountController = {
    createAccount,
    getAccount,
    updateAccount,
    getAllCategories,
    deleteAccount,
    deleteAllCategories
};
