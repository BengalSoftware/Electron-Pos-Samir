import { SortOrder } from "mongoose";
import ApiError from "../../../errors/ApiError";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { Product } from "../product/product.model";
import { IInventoryAdjustment, IInventoryAdjustmentFilters } from "./inventoryAdjustment.interface";
import { InventoryAdjustment } from "./inventoryAdjustment.model";
import { generateAdjustmentId } from "./inventoryAdjustment.utils";

const createInventoryAdjustment = async (payload: IInventoryAdjustment): Promise<IInventoryAdjustment | null> => {
    async function createProductHistory(payload: IInventoryAdjustment) {
        for (const updateToProduct of payload.products) {

            const product = await Product.findOne({ _id: updateToProduct._id });
            if (product) {
                const updatedQuantity = updateToProduct.type === "increment" ? product.quantity + updateToProduct.adjustmentQty : product.quantity - updateToProduct.adjustmentQty;

                product.quantity = updatedQuantity;
                await product.save()
            }

        }
    }
    try {

        await createProductHistory(payload)
        payload.code = await generateAdjustmentId()
        const result = await InventoryAdjustment.create(payload);
        return result;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        throw new ApiError(500, error.message || 'Employee not found !');
    }
}


//GET ALL CATEGORIES
const getAllCategories = async (filters: IInventoryAdjustmentFilters, paginationOptions: IPaginationOptions): Promise<IGenericResponse<IInventoryAdjustment[]>> => {
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
    const result = await InventoryAdjustment.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit)
    const total = await InventoryAdjustment.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
}

const getSingleInventoryAdjustment = async (payload: string): Promise<IInventoryAdjustment | null> => {
    const result = await InventoryAdjustment.findById(payload);
    return result;
}

const deleteInventoryAdjustment = async (payload: string) => {
    await InventoryAdjustment.findByIdAndDelete(payload);
}

const deleteAllCategories = async () => {
    await InventoryAdjustment.deleteMany({});
}

// UPDATE InventoryAdjustment
const updateInventoryAdjustment = async (id: string, payload: IInventoryAdjustment): Promise<IInventoryAdjustment | null> => {
    const result = await InventoryAdjustment.findOneAndUpdate({ _id: id }, { $set: { ...payload } }, { new: true });
    return result;
}

export const InventoryAdjustmentService = {
    createInventoryAdjustment,
    getSingleInventoryAdjustment,
    updateInventoryAdjustment,
    getAllCategories,
    deleteInventoryAdjustment,
    deleteAllCategories
};
