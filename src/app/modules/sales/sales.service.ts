import mongoose, { SortOrder } from "mongoose";
import ApiError from "../../../errors/ApiError";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { formateDate } from "../../../utils";
import { IAccount } from "../account/account.interface";
import { Account } from "../account/account.model";
import { IClient } from "../client/client.interface";
import { Client } from "../client/client.model";
import { IInventoryHistory } from "../inventoryHistory/inventoryHistory.interface";
import { InventoryHistoryService } from "../inventoryHistory/inventoryHistory.service";
import { IPaymentHistory } from "../paymentsHistory/paymentHistory.interface";
import { PaymentHistory } from "../paymentsHistory/paymentHistory.model";
import { Product } from "../product/product.model";
import { ITransactionHistory } from "../transactionHistory/transactionHistory.interface";
import { TransactionHistory } from "../transactionHistory/transactionHistory.model";
import { ISales, ISalesFilters } from "./sales.interface";
import { Sales } from "./sales.model";
import { generateSaleId } from "./sales.utils";

const createSales = async (payload: ISales): Promise<ISales | null> => {
    if (!payload.poDate) payload.poDate = formateDate;
    payload.invoiceNo = await generateSaleId();
    const result = await Sales.create(payload);
    payload.totalDue = payload.netTotal;

    async function createProductHistory(payload: ISales) {
        for (const product of payload.products) {
            // Assuming 'product._id' is a string, convert it to ObjectId.
            const productObjectId = new mongoose.Types.ObjectId(product._id);

            const inventoryHistory: IInventoryHistory = {
                product: productObjectId,
                type: "invoice",
                date: formateDate,
                quantity: product.quantity,
                stock: "stock_out",
                price: product.purchasePrice,
                person: "client",
                code: payload.invoiceNo
            };
            // Use await within the async function.
            await InventoryHistoryService.createInventoryHistory(inventoryHistory);
            const dbProduct = await Product.findOne({ _id: product._id });
            if (dbProduct) {
                const updatedQuantity = dbProduct?.quantity - product.quantity;
                dbProduct.quantity = updatedQuantity;
                await dbProduct.save()
            }
        }
    }
    await createProductHistory(payload)
    return result;
}


//GET ALL CATEGORIES
const getAllSales = async (filters: ISalesFilters, paginationOptions: IPaginationOptions): Promise<IGenericResponse<ISales[]>> => {
    // Extract searchTerm to implement search query
    const { searchTerm, ...filtersData } = filters;
    const { limit, page, skip, sortBy, sortOrder } = paginationHelpers.calculatePagination(paginationOptions);

    const andConditions = [];
    // Search needs $or for searching in specified fields
    if (searchTerm) {
        andConditions.push({
            $or: ["invoiceNo"].map(field => ({
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
    const result = await Sales.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit)
    // .select();

    const total = await Sales.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
}

const getSingleSales = async (payload: string): Promise<ISales | null> => {
    const salesHistory = await PaymentHistory.find({ saleId: payload })
    const result = await Sales.findById(payload);
    if (result) {
        result.payments = salesHistory;
    }
    return result;
}

const deleteSales = async (payload: string) => {
    await Sales.findByIdAndDelete(payload);
}

const deleteAllSales = async () => {
    await Sales.deleteMany({});
}

// UPDATE Sales
const updateSales = async (id: string, payload: ISales): Promise<ISales | null> => {
    const result = await Sales.findOneAndUpdate({ _id: id }, { $set: { ...payload } }, { new: true })
    return result;
}

// Add Sales payment
const addPayment = async (id: string, payload: IPaymentHistory): Promise<ISales | null> => {
    let session;

    try {
        session = await mongoose.startSession();
        session.startTransaction();
        const sale = await Sales.findById(id).session(session);
        let clientId: string | null = null;
        if (sale?.client?.name) {
            clientId = JSON.parse(sale.client.name)?.id;
        }
        const accountId = payload.account;
        const account = await Account.findById(accountId).session(session) as IAccount || null;
        const client = await Client.findById(clientId).session(session) as IClient || null;

        if (!account) {
            throw new Error(`Account is not exist`)
        }
        if (!client?._id) {
            throw new Error(`Client is not exist`)
        }
        if (!sale) {
            throw new ApiError(404, "Sales not found");
        }
        if (sale.totalDue < payload.paidAmount) {
            throw new Error(`[${payload.paidAmount}] Amount is larger than due!`)
        }

        if (sale?.totalDue) {
            // Assuming you want to sum up all the 'paidAmount' values in the array
            const totalPaidAmount = payload.paidAmount;
            sale.totalDue = sale?.totalDue - totalPaidAmount;
            sale.totalPayment = sale.totalPayment + totalPaidAmount;

            account.balance = (account?.balance + totalPaidAmount);
            client.totalDue = client.totalDue - totalPaidAmount;

        }


        // transaction history 
        const transactionData: ITransactionHistory = {
            account: account.bankName,
            amount: payload.paidAmount,
            createdBy: "Super Admin",
            type: "credit",
            status: "active",
            date: formateDate,
            reason: `[${sale.invoiceNo}] Invoice Payment added to ${account.bankName}`
        }

        payload.paymentFor = "client";
        payload.account = account.bankName;
        payload.saleId = sale._id;
        payload.clientId = client._id;

        const transactionHistory = new TransactionHistory(transactionData);
        const paymentHistory = new PaymentHistory(payload);
        await transactionHistory.save({ session })
        await paymentHistory.save({ session });
        await account.save({ session })
        await client.save({ session });
        const result = await sale?.save({ session });

        await session.commitTransaction();
        session.endSession();

        return result || null;
    } catch (error) {
        console.log(error)
        if (session) {
            await session.abortTransaction();
            session.endSession();
        }
        throw error;
    }

}

export const SalesService = {
    createSales,
    getSingleSales,
    updateSales,
    getAllSales,
    deleteSales,
    deleteAllSales,
    addPayment
};
