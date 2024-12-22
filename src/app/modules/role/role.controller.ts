import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { IRole } from "./role.interface";
import { RoleService } from "./role.service";

const createRole = catchAsync(async (req: Request, res: Response) => {
    const { ...roleData } = req.body;
    const result = await RoleService.createRole(roleData);

    sendResponse<IRole>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Role created successfully",
        data: result
    })
})

const getAllRoles = catchAsync(async (req: Request, res: Response) => {
    const result = await RoleService.getAllRoles();

    sendResponse<IRole[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Role get successfully",
        data: result
    })
})

const getRole = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await RoleService.getSingleRole(id);

    sendResponse<IRole>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Role get successfully",
        data: result
    })
})

const deleteRole = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    await RoleService.deleteRole(id);

    sendResponse<IRole>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Role delete successfully",
    })
})

const deleteAllRoles = catchAsync(async (req: Request, res: Response) => {
    await RoleService.deleteAllRoles();

    sendResponse<IRole>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Role delete successfully",
    })
})

const updateRole = catchAsync(async (req: Request, res: Response) => {
    const { ...roleData } = req.body;
    const { id } = req.params;
    const result = await RoleService.updateRole(id, roleData);

    sendResponse<IRole>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Role update successfully",
        data: result
    })
})


export const RoleController = {
    createRole,
    getRole,
    updateRole,
    getAllRoles,
    deleteRole,
    deleteAllRoles
};
