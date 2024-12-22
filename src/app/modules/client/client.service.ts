import { SortOrder } from "mongoose";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { IClient, IClientFilters } from "./client.interface";
import { Client } from "./client.model";
import { generateClientId } from "./client.utils";

const createClient = async (payload: IClient): Promise<IClient | null> => {
    payload.clientId = await generateClientId()
    const result = await Client.create(payload);
    return result;
}


//GET ALL CATEGORIES
const getAllClients = async (filters: IClientFilters, paginationOptions: IPaginationOptions): Promise<IGenericResponse<IClient[]>> => {
    // Extract searchTerm to implement search query
    const { searchTerm, ...filtersData } = filters;
    const { limit, page, skip, sortBy, sortOrder } = paginationHelpers.calculatePagination(paginationOptions);

    const andConditions = [];
    // Search needs $or for searching in specified fields
    if (searchTerm) {
        andConditions.push({
            $or: ["name", "status"].map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }

    // Filters needs $and to fullfill all the conditions
    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value
            }))
        })
    }

    const sortConditions: { [key: string]: SortOrder } = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }

    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = await Client.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit)
        .select({ permissions: 0 });

    const total = await Client.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
}

const getSingleClient = async (payload: string): Promise<IClient | null> => {
    const result = await Client.findById(payload);
    return result;
}

const deleteClient = async (payload: string) => {
    await Client.findByIdAndDelete(payload);
}

const deleteAllClients = async () => {
    await Client.deleteMany({});
}

// UPDATE Client
const updateClient = async (id: string, payload: IClient): Promise<IClient | null> => {
    // eslint-disable-next-line no-unused-vars
    const { clientId, ...others } = payload;
    const result = await Client.findOneAndUpdate({ _id: id }, { $set: others }, { new: true })
    return result;
}

export const ClientService = {
    createClient,
    getSingleClient,
    updateClient,
    getAllClients,
    deleteClient,
    deleteAllClients
};
