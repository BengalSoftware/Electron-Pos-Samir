import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { IReports } from "./reports.interface";
import { ReportsService } from "./reports.service";

const summeryReport = catchAsync(async (req: Request, res: Response) => {
    const { ...reportsData } = req.body;
    const result = await ReportsService.summeryReport(reportsData);

    sendResponse<IReports>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Reports created successfully",
        data: result
    })
})

const getBalanceSheetReport = catchAsync(async (req: Request, res: Response) => {

    const result = await ReportsService.getBalanceSheetReport();

    sendResponse<IReports[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Reports get successfully",
        data: result,
    })
})

const getSingleProductReports = catchAsync(async (req: Request, res: Response) => {
    const { ...reportData } = req.body;
    const result = await ReportsService.getSingleProductReports(reportData);

    sendResponse<IReports>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Reports get successfully",
        data: result
    })
})
const getDashboardStatistics = catchAsync(async (req: Request, res: Response) => {
    const result = await ReportsService.getDashboardStatistics(req.query);

    sendResponse<IReports>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Statistics get successfully",
        data: result
    })
})
const paymentSentVsPaymentReceived = catchAsync(async (req: Request, res: Response) => {
    const result = await ReportsService.paymentSentVsPaymentReceived();

    sendResponse<IReports>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Statistics get successfully",
        data: result
    })
})
const saleVsPurchase = catchAsync(async (req: Request, res: Response) => {
    const result = await ReportsService.saleVsPurchase();

    sendResponse<IReports>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Statistics get successfully",
        data: result
    })
})

const saleVsPurchaseDaily = catchAsync(async (req: Request, res: Response) => {
    const { ...reportsData } = req.body;
    const result = await ReportsService.saleVsPurchaseDaily(reportsData);

    sendResponse<IReports>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Statistics get successfully",
        data: result
    })
})


export const ReportsController = {
    summeryReport,
    getSingleProductReports,
    getBalanceSheetReport,
    getDashboardStatistics,
    paymentSentVsPaymentReceived,
    saleVsPurchase,
    saleVsPurchaseDaily
};
