import { Request, Response } from "express";
import httpStatus from "http-status";
import { paginationFields } from "../../../constants/pagination";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { IClient } from "./client.interface";
import { ClientService } from "./client.service";

const createClient = catchAsync(async (req: Request, res: Response) => {
    const { ...ClientData } = req.body;
    const result = await ClientService.createClient(ClientData);

    sendResponse<IClient>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Client created successfully",
        data: result
    })
})

const getAllClients = catchAsync(async (req: Request, res: Response) => {

    const filters = pick(req.query, ["searchTerm", "name", "status"]);

    const paginationOptions = pick(req.query, paginationFields)

    const result = await ClientService.getAllClients(filters, paginationOptions);

    sendResponse<IClient[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Client get successfully",
        meta: result.meta,
        data: result.data,
    })
})

const getClient = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await ClientService.getSingleClient(id);

    sendResponse<IClient>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Client get successfully",
        data: result
    })
})

const deleteClient = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    await ClientService.deleteClient(id);

    sendResponse<IClient>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Client delete successfully",
    })
})

const deleteAllClients = catchAsync(async (req: Request, res: Response) => {
    await ClientService.deleteAllClients();

    sendResponse<IClient>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Client delete successfully",
    })
})

const updateClient = catchAsync(async (req: Request, res: Response) => {
    const { ...ClientData } = req.body;
    const { id } = req.params;
    const result = await ClientService.updateClient(id, ClientData);

    sendResponse<IClient>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Client update successfully",
        data: result
    })
})


export const ClientController = {
    createClient,
    getClient,
    updateClient,
    getAllClients,
    deleteClient,
    deleteAllClients
};
