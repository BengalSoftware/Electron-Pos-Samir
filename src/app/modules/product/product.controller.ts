import { Request, Response } from "express";
import httpStatus from "http-status";
import { paginationFields } from "../../../constants/pagination";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { IProduct } from "./product.interface";
import { ProductService } from "./product.service";

const createProduct = catchAsync(async (req: Request, res: Response) => {
    const { ...productData } = req.body;
    const result = await ProductService.createProduct(productData);

    sendResponse<IProduct>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Product created successfully",
        data: result
    })
})

const getAllProducts = catchAsync(async (req: Request, res: Response) => {

    const filters = pick(req.query, ["searchTerm", "name", "status"]);

    const paginationOptions = pick(req.query, paginationFields)

    const result = await ProductService.getAllProducts(filters, paginationOptions);

    sendResponse<IProduct[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Product get successfully",
        meta: result.meta,
        data: result.data,
    })
})
const getStockLimitProducts = catchAsync(async (req: Request, res: Response) => {

    const filters = pick(req.query, ["searchTerm", "name", "status"]);

    const paginationOptions = pick(req.query, paginationFields)

    const result = await ProductService.getStockLimitProducts(filters, paginationOptions);

    sendResponse<IProduct[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Product get successfully",
        meta: result.meta,
        data: result.data,
    })
})

const getPosProducts = catchAsync(async (req: Request, res: Response) => {
    const { productCode } = req.params;
    const result = await ProductService.getPosProducts(productCode);

    sendResponse<IProduct>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Product get successfully",
        data: result,
    })
})

const getProduct = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await ProductService.getSingleProduct(id);

    sendResponse<IProduct>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Product get successfully",
        data: result
    })
})

const deleteProduct = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    await ProductService.deleteProduct(id);

    sendResponse<IProduct>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Product delete successfully",
    })
})

const deleteAllProducts = catchAsync(async (req: Request, res: Response) => {
    await ProductService.deleteAllProducts();

    sendResponse<IProduct>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Product delete successfully",
    })
})

const updateProduct = catchAsync(async (req: Request, res: Response) => {
    const { ...ProductData } = req.body;
    const { id } = req.params;
    const result = await ProductService.updateProduct(id, ProductData);

    sendResponse<IProduct>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Product update successfully",
        data: result
    })
})


export const ProductController = {
    createProduct,
    getProduct,
    updateProduct,
    getAllProducts,
    deleteProduct,
    deleteAllProducts,
    getPosProducts,
    getStockLimitProducts
};
