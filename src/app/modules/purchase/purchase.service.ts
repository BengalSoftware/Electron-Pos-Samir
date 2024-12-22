import mongoose, { SortOrder } from "mongoose";
import ApiError from "../../../errors/ApiError";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { formateDate } from "../../../utils";
import { IAccount } from "../account/account.interface";
import { Account } from "../account/account.model";
import { IInventoryHistory } from "../inventoryHistory/inventoryHistory.interface";
import { InventoryHistoryService } from "../inventoryHistory/inventoryHistory.service";
import { IPaymentHistory } from "../paymentsHistory/paymentHistory.interface";
import { PaymentHistory } from "../paymentsHistory/paymentHistory.model";
import { Product } from "../product/product.model";
import { ISupplier } from "../supplier/supplier.interface";
import { Supplier } from "../supplier/supplier.model";
import { ITransactionHistory } from "../transactionHistory/transactionHistory.interface";
import { TransactionHistory } from "../transactionHistory/transactionHistory.model";
import { IPurchase, IPurchaseFilters } from "./purchase.interface";
import { Purchase } from "./purchase.model";
import { generatePurchaseCode } from "./purchase.utils";

const createPurchase = async (payload: IPurchase): Promise<IPurchase | null> => {
    payload.code = await generatePurchaseCode();
    payload.totalDue = payload.netTotal;
    const result = await Purchase.create(payload);
    async function createProductHistory(payload: IPurchase) {
        for (const product of payload.products) {

            const productObjectId = new mongoose.Types.ObjectId(product._id);
            const inventoryHistory: IInventoryHistory = {
                product: productObjectId,
                type: "purchase",
                date: formateDate,
                quantity: product.quantity,
                stock: "stock_in",
                price: product.purchasePrice,
                person: payload.supplier.name,
                code: result.code
            };
            // Use await within the async function.
            await InventoryHistoryService.createInventoryHistory(inventoryHistory);

            const dbProduct = await Product.findOne({ _id: product._id });
            if (dbProduct) {
                const updatedQuantity = dbProduct?.quantity + product.quantity;
                dbProduct.purchasePrice = product.purchasePrice;
                dbProduct.quantity = updatedQuantity;
                await dbProduct.save()
            }
        }
    }
    const supplier = await Supplier.findById(payload.supplier.id);
    if (supplier) {
        const total = (supplier?.totalPurchase + payload.netTotal).toFixed(2);
        const totalDue = (supplier?.totalDue + payload.netTotal).toFixed(2);
        supplier.totalPurchase = parseFloat(total);
        supplier.totalDue = parseFloat(totalDue);
        supplier.save();
    }

    await createProductHistory(payload)
    return result;
}


//GET ALL CATEGORIES
const getAllPurchases = async (filters: IPurchaseFilters, paginationOptions: IPaginationOptions): Promise<IGenericResponse<IPurchase[]>> => {
    // Extract searchTerm to implement search query
    const { searchTerm, ...filtersData } = filters;
    const { limit, page, skip, sortBy, sortOrder } = paginationHelpers.calculatePagination(paginationOptions);

    const andConditions = [];
    // Search needs $or for searching in specified fields
    if (searchTerm) {
        andConditions.push({
            $or: ["code", "name",].map(field => ({
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
    const result = await Purchase.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit)
        .select({ permissions: 0 });

    const total = await Purchase.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
}

const getSinglePurchase = async (payload: string): Promise<IPurchase | null> => {
    const salesHistory = await PaymentHistory.find({ purchaseId: payload })
    const result = await Purchase.findById(payload).populate("supplier.id");
    if (result) {
        result.payments = salesHistory;
    }
    return result;
}

const deletePurchase = async (payload: string) => {
    await Purchase.findByIdAndDelete(payload);
}

const deleteAllPurchases = async () => {
    await Purchase.deleteMany({});
}

// UPDATE Purchase
const updatePurchase = async (id: string, payload: IPurchase): Promise<IPurchase | null> => {
    const result = await Purchase.findOneAndUpdate({ _id: id }, { $set: { ...payload } }, { new: true })
    return result;
}

// Add  purchase Payment
const addPayment = async (id: string, payload: IPaymentHistory): Promise<IPurchase | null> => {
    let session;

    try {
        session = await mongoose.startSession();
        session.startTransaction();
        const purchase = await Purchase.findById(id).session(session);
        const accountId = payload.account;
        const account = await Account.findById(accountId).session(session) as IAccount || null;
        const supplier = await Supplier.findById(purchase?.supplier.id).session(session) as ISupplier || null;

        if (!account) {
            throw new Error(`Account is not exist`);
        }
        if (!purchase) {
            throw new ApiError(404, "Sales not found");
        }
        if (account.balance < payload.paidAmount) {
            throw new Error(`[${account.bankName}] Current Balance is low`)
        }

        if (purchase.totalDue) {
            const totalPaidAmount = payload.paidAmount;
            purchase.totalDue -= totalPaidAmount;
            purchase.totalPayment += totalPaidAmount;
            account.balance = (account.balance - totalPaidAmount);
            supplier.totalDue -= totalPaidAmount;
        }

        // transaction history 
        const transactionData: ITransactionHistory = {
            account: account.bankName,
            amount: payload.paidAmount,
            createdBy: "Super Admin",
            type: "debit",
            status: "active",
            date: formateDate,
            reason: `[${purchase.code}] Purchase Payment send from ${account.bankName}`
        }

        payload.paymentFor = "supplier";
        payload.account = account.bankName;
        payload.purchaseId = purchase._id;
        payload.supplierId = supplier._id;

        const transactionHistory = new TransactionHistory(transactionData);
        const paymentHistory = new PaymentHistory(payload);
        await transactionHistory.save({ session })
        await paymentHistory.save({ session });
        await account.save({ session })
        await supplier.save({ session });
        const result = await purchase.save({ session });

        await session.commitTransaction();
        session.endSession();

        return result || null;
    } catch (error) {
        if (session) {
            await session.abortTransaction();
            session.endSession();
        }
        throw error;
    }
};



export const PurchaseService = {
    createPurchase,
    getSinglePurchase,
    updatePurchase,
    getAllPurchases,
    deletePurchase,
    deleteAllPurchases,
    addPayment
};
