import { Request, Response } from "express";
import httpStatus from "http-status";
import { paginationFields } from "../../../constants/pagination";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { IUnit } from "./unit.interface";
import { UnitService } from "./unit.service";

const createUnit = catchAsync(async (req: Request, res: Response) => {
    const { ...UnitData } = req.body;
    const result = await UnitService.createUnit(UnitData);

    sendResponse<IUnit>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Unit created successfully",
        data: result
    })
})

const getAllCategories = catchAsync(async (req: Request, res: Response) => {

    const filters = pick(req.query, ["searchTerm", "name", "status"]);

    const paginationOptions = pick(req.query, paginationFields)

    const result = await UnitService.getAllCategories(filters, paginationOptions);

    sendResponse<IUnit[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Unit get successfully",
        meta: result.meta,
        data: result.data,
    })
})

const getUnit = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await UnitService.getSingleUnit(id);

    sendResponse<IUnit>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Unit get successfully",
        data: result
    })
})

const deleteUnit = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    await UnitService.deleteUnit(id);

    sendResponse<IUnit>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Unit delete successfully",
    })
})

const deleteAllCategories = catchAsync(async (req: Request, res: Response) => {
    await UnitService.deleteAllCategories();

    sendResponse<IUnit>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Unit delete successfully",
    })
})

const updateUnit = catchAsync(async (req: Request, res: Response) => {
    const { ...UnitData } = req.body;
    const { id } = req.params;
    const result = await UnitService.updateUnit(id, UnitData);

    sendResponse<IUnit>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Unit update successfully",
        data: result
    })
})


export const UnitController = {
    createUnit,
    getUnit,
    updateUnit,
    getAllCategories,
    deleteUnit,
    deleteAllCategories
};
