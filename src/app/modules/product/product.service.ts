import { SortOrder } from "mongoose";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { IIProductFilters, IProduct } from "./product.interface";
import { Product } from "./product.model";
import { generateProductCode } from "./product.utils";

const createProduct = async (payload: IProduct): Promise<IProduct | null> => {
    payload.productCode = await generateProductCode();
    const result = await Product.create(payload);
    return result;
}


//GET ALL Products
const getAllProducts = async (filters: IIProductFilters, paginationOptions: IPaginationOptions): Promise<IGenericResponse<IProduct[]>> => {
    // Extract searchTerm to implement search query
    const { searchTerm, ...filtersData } = filters;
    const { limit, page, skip, sortBy, sortOrder } = paginationHelpers.calculatePagination(paginationOptions);

    const andConditions = [];
    // Search needs $or for searching in specified fields

    if (searchTerm) {
        andConditions.push({
            $or: ["productCode", "status", "name"].map(field => ({
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
    const result = await Product.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit)
        .select({ permissions: 0 });

    const total = await Product.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
}
//GET ALL Products
const getStockLimitProducts = async (filters: IIProductFilters, paginationOptions: IPaginationOptions): Promise<IGenericResponse<IProduct[]>> => {
    // Extract searchTerm to implement search query
    const { searchTerm, ...filtersData } = filters;
    const { limit, page, skip, sortBy, sortOrder } = paginationHelpers.calculatePagination(paginationOptions);

    const andConditions = [];
    // Search needs $or for searching in specified fields

    if (searchTerm) {
        andConditions.push({
            $or: ["productCode", "status", "stockAlert"].map(field => ({
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
    andConditions.push({ quantity: { $lte: 10 } })

    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = await Product.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit)

    const total = await Product.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
}

//GET ALL getPosProducts
const getPosProducts = async (payload: string): Promise<IProduct | null> => {
    const result = await Product.findOne({ productCode: payload });
    return result;
}

const getSingleProduct = async (payload: string): Promise<IProduct | null> => {
    const result = await Product.findById(payload);
    return result;
}

const deleteProduct = async (payload: string) => {
    await Product.findByIdAndDelete(payload);
}

const deleteAllProducts = async () => {
    await Product.deleteMany({});
}

// UPDATE Product
const updateProduct = async (id: string, payload: IProduct): Promise<IProduct | null> => {
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    const { productCode, ...others } = payload;
    const result = await Product.findOneAndUpdate({ _id: id }, { $set: others }, { new: true })
    return result;
}

export const ProductService = {
    createProduct,
    getSingleProduct,
    updateProduct,
    getAllProducts,
    deleteProduct,
    getPosProducts,
    deleteAllProducts,
    getStockLimitProducts
};
