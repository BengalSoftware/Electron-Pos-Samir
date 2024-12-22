import mongoose, { SortOrder } from "mongoose";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { formateDate } from "../../../utils";
import { IAccount } from "../account/account.interface";
import { Account } from "../account/account.model";
import { IInventoryHistory } from "../inventoryHistory/inventoryHistory.interface";
import { InventoryHistoryService } from "../inventoryHistory/inventoryHistory.service";
import { Product } from "../product/product.model";
import { ISales } from "../sales/sales.interface";
import { Sales } from "../sales/sales.model";
import { IProductReturn, IProductReturnFilters } from "./productReturn.interface";
import { ProductReturn } from "./productReturn.model";
import { generateProductReturnCode } from "./productReturn.utils";

const createProductReturn = async (payload: IProductReturn): Promise<IProductReturn | null> => {
    // step 1 : update account balance 
    if (payload.account) {
        const account = await Account.findById(payload.account.id) as IAccount || null;
        const decrementAmount = payload.netTotal - payload.returnNetTotal;
        const presentBalance = account.balance;
        if (account?.balance !== undefined && presentBalance > decrementAmount) {
            account.balance = presentBalance - decrementAmount;
        } else {
            throw new Error(`The account balance is low! Amount must more then ${decrementAmount}`)
        }
        await account.save()
    }

    //step 2 : update product quantity and invoice
    const sale = await Sales.findById(payload.invoice) as ISales || null;
    async function createProductHistory(payload: IProductReturn) {
        for (const returnedProduct of payload.products) {
            const productToUpdate = sale?.products.find(product => product._id === returnedProduct._id);
            if (productToUpdate) {
                // Reduce the quantity by the amount returned
                productToUpdate.returnQty = returnedProduct.returnQty;
            }

            const productObjectId = new mongoose.Types.ObjectId(returnedProduct._id);

            const inventoryHistory: IInventoryHistory = {
                product: productObjectId,
                type: "invoice return",
                date: formateDate,
                quantity: returnedProduct.quantity,
                stock: "stock_in",
                price: returnedProduct.purchasePrice,
                person: "client",
                code: payload.invoiceNo || "AP-TEST"
            };
            // Use await within the async function.
            await InventoryHistoryService.createInventoryHistory(inventoryHistory);
            const dbProduct = await Product.findOne({ _id: returnedProduct._id });
            if (dbProduct) {
                const updatedQuantity = dbProduct?.quantity + returnedProduct.returnQty;
                dbProduct.quantity = updatedQuantity;
                await dbProduct.save()
            }
        }
    }
    await createProductHistory(payload)

    sale.discountAmount = payload.returnDiscountAmount;
    sale.netTotal = payload.returnNetTotal;
    sale.totalTax = payload.returnTotalTax;
    sale.returnSubTotal = payload.returnSubTotal;


    // Save the updated sale
    await sale.save();
    payload.invoiceNo = sale.invoiceNo;
    payload.code = await generateProductReturnCode()
    const result = await ProductReturn.create(payload);
    return result;
}


//GET ALL CATEGORIES
const getAllProductReturns = async (filters: IProductReturnFilters, paginationOptions: IPaginationOptions): Promise<IGenericResponse<IProductReturn[]>> => {
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
    const result = await ProductReturn.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit)
        .select({ permissions: 0 });

    const total = await ProductReturn.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
}

const getSingleProductReturn = async (payload: string): Promise<IProductReturn | null> => {
    const result = await ProductReturn.findById(payload);
    return result;
}

const deleteProductReturn = async (payload: string) => {
    await ProductReturn.findByIdAndDelete(payload);
}

const deleteAllProductReturns = async () => {
    await ProductReturn.deleteMany({});
}

// UPDATE ProductReturn
const updateProductReturn = async (id: string, payload: IProductReturn): Promise<IProductReturn | null> => {
    const result = await ProductReturn.findOneAndUpdate({ _id: id }, { $set: { ...payload } }, { new: true })
    return result;
}

export const ProductReturnService = {
    createProductReturn,
    getSingleProductReturn,
    updateProductReturn,
    getAllProductReturns,
    deleteProductReturn,
    deleteAllProductReturns
};
