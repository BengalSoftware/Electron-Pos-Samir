import mongoose, { SortOrder } from "mongoose";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { Product } from "../product/product.model";
import { IInventoryHistory, IInventoryHistoryFilters } from "./inventoryHistory.interface";
import { InventoryHistory } from "./inventoryHistory.model";

const createInventoryHistory = async (payload: IInventoryHistory): Promise<IInventoryHistory | null> => {
    const result = await InventoryHistory.create(payload);
    return result;
}


//GET ALL CATEGORIES
const getAllInventoryHistories = async (filters: IInventoryHistoryFilters, paginationOptions: IPaginationOptions): Promise<IGenericResponse<IInventoryHistory[]>> => {
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

    // Filters needs $and to full fill all the conditions
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
    const result = await InventoryHistory.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit)
        .select({ permissions: 0 });

    const total = await InventoryHistory.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
}

const getSingleInventoryHistory = async (payload: string): Promise<IInventoryHistory[] | null> => {
    // const result = await InventoryHistory.find({ product: payload });
    const productInfo = await Product.findById(payload)
    const productObjectId = new mongoose.Types.ObjectId(payload);
    const result = await InventoryHistory.aggregate([
        {
            $match: {
                product: productObjectId,
            },
        },
        {
            $facet: {
                stockIn: [
                    {
                        $match: {
                            stock: 'stock_in',
                        },
                    },
                ],
                stockOut: [
                    {
                        $match: {
                            stock: 'stock_out',
                        },
                    },
                ],
            },
        },

    ]);
    result.push({ details: { name: productInfo?.name, code: productInfo?.productCode, category: productInfo?.category.name, subCategory: productInfo?.subcategory.name, stock: productInfo?.quantity } })

    return result;
}

const deleteInventoryHistory = async (payload: string) => {
    await InventoryHistory.findByIdAndDelete(payload);
}

const deleteAllInventoryHistories = async () => {
    await InventoryHistory.deleteMany({});
}

// UPDATE InventoryHistory
const updateInventoryHistory = async (id: string, payload: IInventoryHistory): Promise<IInventoryHistory | null> => {
    const result = await InventoryHistory.findOneAndUpdate({ _id: id }, { $set: { ...payload } }, { new: true })
    return result;
}

export const InventoryHistoryService = {
    createInventoryHistory,
    getSingleInventoryHistory,
    updateInventoryHistory,
    getAllInventoryHistories,
    deleteInventoryHistory,
    deleteAllInventoryHistories
};
