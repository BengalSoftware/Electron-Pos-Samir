import { Request, Response } from "express";
import httpStatus from "http-status";
import { paginationFields } from "../../../constants/pagination";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { ILoanAuthority } from "./loanAuthority.interface";
import { LoanAuthorityService } from "./loanAuthority.service";

const createLoanAuthority = catchAsync(async (req: Request, res: Response) => {
    const { ...LoanAuthorityData } = req.body;
    const result = await LoanAuthorityService.createLoanAuthority(LoanAuthorityData);

    sendResponse<ILoanAuthority>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "LoanAuthority created successfully",
        data: result
    })
})

const getAllLoanAuthority = catchAsync(async (req: Request, res: Response) => {

    const filters = pick(req.query, ["searchTerm", "name", "status"]);

    const paginationOptions = pick(req.query, paginationFields)

    const result = await LoanAuthorityService.getAllLoanAuthority(filters, paginationOptions);

    sendResponse<ILoanAuthority[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "LoanAuthority get successfully",
        meta: result.meta,
        data: result.data,
    })
})

const getLoanAuthority = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await LoanAuthorityService.getSingleLoanAuthority(id);

    sendResponse<ILoanAuthority>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "LoanAuthority get successfully",
        data: result
    })
})

const deleteLoanAuthority = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    await LoanAuthorityService.deleteLoanAuthority(id);

    sendResponse<ILoanAuthority>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "LoanAuthority delete successfully",
    })
})

const deleteAllLoanAuthority = catchAsync(async (req: Request, res: Response) => {
    await LoanAuthorityService.deleteAllLoanAuthority();

    sendResponse<ILoanAuthority>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "LoanAuthority delete successfully",
    })
})

const updateLoanAuthority = catchAsync(async (req: Request, res: Response) => {
    const { ...LoanAuthorityData } = req.body;
    const { id } = req.params;
    const result = await LoanAuthorityService.updateLoanAuthority(id, LoanAuthorityData);

    sendResponse<ILoanAuthority>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "LoanAuthority update successfully",
        data: result
    })
})


export const LoanAuthorityController = {
    createLoanAuthority,
    getLoanAuthority,
    updateLoanAuthority,
    getAllLoanAuthority,
    deleteLoanAuthority,
    deleteAllLoanAuthority
};
