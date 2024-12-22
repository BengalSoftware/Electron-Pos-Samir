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
import { IPurchase } from "../purchase/purchase.interface";
import { Purchase } from "../purchase/purchase.model";
import { IPurchaseReturn, IPurchaseReturnFilters } from "./purchaseReturn.interface";
import { PurchaseReturn } from "./purchaseReturn.model";
import { generatePurchaseReturnId } from "./purchaseReturn.utils";

const createPurchaseReturn = async (payload: IPurchaseReturn): Promise<IPurchaseReturn | null> => {

    // step 1 : update account balance 
    if (payload.account) {
        const account = await Account.findById(payload.account.id) as IAccount || null;
        const decrementAmount = payload.netTotal - payload.returnNetTotal;
        const presentBalance = account.balance;
        if (account?.balance) {
            account.balance = presentBalance + decrementAmount;
        } else {
            throw new Error(`The account not found`)
        }
        await account.save()
    }

    //step 2 : update product quantity and invoice
    const purchase = await Purchase.findById(payload.purchaseNo) as IPurchase || null;
    async function createProductHistory(payload: IPurchaseReturn) {
        for (const returnedProduct of payload.products) {
            const productToUpdate = purchase?.products.find(product => product._id === returnedProduct._id);
            if (productToUpdate) {
                // Reduce the quantity by the amount returned
                productToUpdate.returnQty = returnedProduct.returnQty;
            }

            const productObjectId = new mongoose.Types.ObjectId(returnedProduct._id);

            const inventoryHistory: IInventoryHistory = {
                product: productObjectId,
                type: "purchase return",
                date: formateDate,
                quantity: returnedProduct.quantity,
                stock: "stock_out",
                price: returnedProduct.purchasePrice,
                person: payload.supplier.name,
                code: purchase.code
            };
            // Use await within the async function.
            await InventoryHistoryService.createInventoryHistory(inventoryHistory);
            const dbProduct = await Product.findOne({ _id: returnedProduct._id });
            if (dbProduct) {
                const updatedQuantity = dbProduct?.quantity - returnedProduct.returnQty;
                dbProduct.quantity = updatedQuantity;
                await dbProduct.save()
            }
        }
    }
    await createProductHistory(payload)

    //update supplier
    // const supplier = await Supplier.findById(payload.supplier.id);
    // if (supplier) {
    //     const total = (supplier?.totalPurchase + payload.netTotal).toFixed(2);
    //     supplier.totalPurchase = parseFloat(total);
    //     supplier.totalDue = parseFloat(total);
    // }

    //update purchase
    purchase.discountAmount = payload.returnDiscountAmount;
    purchase.netTotal = payload.returnNetTotal;
    purchase.totalTax = payload.returnTotalTax;
    purchase.returnSubTotal = payload.returnSubTotal;
    purchase.isReturned = true;
    await purchase.save();
    // Save the updated sale

    payload.purchaseNo = purchase.code;
    payload.code = await generatePurchaseReturnId();
    const result = await PurchaseReturn.create(payload);
    return result;
}


//GET ALL CATEGORIES
const getAllPurchaseReturns = async (filters: IPurchaseReturnFilters, paginationOptions: IPaginationOptions): Promise<IGenericResponse<IPurchaseReturn[]>> => {
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
    const result = await PurchaseReturn.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit)
        .select({ permissions: 0 });

    const total = await PurchaseReturn.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
}

const getSinglePurchaseReturn = async (payload: string): Promise<IPurchaseReturn | null> => {
    const result = await PurchaseReturn.findById(payload);
    return result;
}

const deletePurchaseReturn = async (payload: string) => {
    await PurchaseReturn.findByIdAndDelete(payload);
}

const deleteAllPurchaseReturns = async () => {
    await PurchaseReturn.deleteMany({});
}

// UPDATE PurchaseReturn
const updatePurchaseReturn = async (id: string, payload: IPurchaseReturn): Promise<IPurchaseReturn | null> => {
    const result = await PurchaseReturn.findOneAndUpdate({ _id: id }, { $set: { ...payload } }, { new: true })
    return result;
}

export const PurchaseReturnService = {
    createPurchaseReturn,
    getSinglePurchaseReturn,
    updatePurchaseReturn,
    getAllPurchaseReturns,
    deletePurchaseReturn,
    deleteAllPurchaseReturns
};
