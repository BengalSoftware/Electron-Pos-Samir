"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const utils_1 = require("../../../utils");
const account_model_1 = require("../account/account.model");
const client_model_1 = require("../client/client.model");
const inventoryHistory_service_1 = require("../inventoryHistory/inventoryHistory.service");
const paymentHistory_model_1 = require("../paymentsHistory/paymentHistory.model");
const product_model_1 = require("../product/product.model");
const transactionHistory_model_1 = require("../transactionHistory/transactionHistory.model");
const sales_model_1 = require("./sales.model");
const sales_utils_1 = require("./sales.utils");
const createSales = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (!payload.poDate)
        payload.poDate = utils_1.formateDate;
    payload.invoiceNo = yield (0, sales_utils_1.generateSaleId)();
    const result = yield sales_model_1.Sales.create(payload);
    payload.totalDue = payload.netTotal;
    function createProductHistory(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            for (const product of payload.products) {
                // Assuming 'product._id' is a string, convert it to ObjectId.
                const productObjectId = new mongoose_1.default.Types.ObjectId(product._id);
                const inventoryHistory = {
                    product: productObjectId,
                    type: "invoice",
                    date: utils_1.formateDate,
                    quantity: product.quantity,
                    stock: "stock_out",
                    price: product.purchasePrice,
                    person: "client",
                    code: payload.invoiceNo
                };
                // Use await within the async function.
                yield inventoryHistory_service_1.InventoryHistoryService.createInventoryHistory(inventoryHistory);
                const dbProduct = yield product_model_1.Product.findOne({ _id: product._id });
                if (dbProduct) {
                    const updatedQuantity = (dbProduct === null || dbProduct === void 0 ? void 0 : dbProduct.quantity) - product.quantity;
                    dbProduct.quantity = updatedQuantity;
                    yield dbProduct.save();
                }
            }
        });
    }
    yield createProductHistory(payload);
    return result;
});
//GET ALL CATEGORIES
const getAllSales = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    // Extract searchTerm to implement search query
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const { limit, page, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
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
        });
    }
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield sales_model_1.Sales.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    // .select();
    const total = yield sales_model_1.Sales.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getSingleSales = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const salesHistory = yield paymentHistory_model_1.PaymentHistory.find({ saleId: payload });
    const result = yield sales_model_1.Sales.findById(payload);
    if (result) {
        result.payments = salesHistory;
    }
    return result;
});
const deleteSales = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    yield sales_model_1.Sales.findByIdAndDelete(payload);
});
const deleteAllSales = () => __awaiter(void 0, void 0, void 0, function* () {
    yield sales_model_1.Sales.deleteMany({});
});
// UPDATE Sales
const updateSales = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield sales_model_1.Sales.findOneAndUpdate({ _id: id }, { $set: Object.assign({}, payload) }, { new: true });
    return result;
});
// Add Sales payment
const addPayment = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    let session;
    try {
        session = yield mongoose_1.default.startSession();
        session.startTransaction();
        const sale = yield sales_model_1.Sales.findById(id).session(session);
        let clientId = null;
        if ((_a = sale === null || sale === void 0 ? void 0 : sale.client) === null || _a === void 0 ? void 0 : _a.name) {
            clientId = (_b = JSON.parse(sale.client.name)) === null || _b === void 0 ? void 0 : _b.id;
        }
        const accountId = payload.account;
        const account = (yield account_model_1.Account.findById(accountId).session(session)) || null;
        const client = (yield client_model_1.Client.findById(clientId).session(session)) || null;
        if (!account) {
            throw new Error(`Account is not exist`);
        }
        if (!(client === null || client === void 0 ? void 0 : client._id)) {
            throw new Error(`Client is not exist`);
        }
        if (!sale) {
            throw new ApiError_1.default(404, "Sales not found");
        }
        if (sale.totalDue < payload.paidAmount) {
            throw new Error(`[${payload.paidAmount}] Amount is larger than due!`);
        }
        if (sale === null || sale === void 0 ? void 0 : sale.totalDue) {
            // Assuming you want to sum up all the 'paidAmount' values in the array
            const totalPaidAmount = payload.paidAmount;
            sale.totalDue = (sale === null || sale === void 0 ? void 0 : sale.totalDue) - totalPaidAmount;
            sale.totalPayment = sale.totalPayment + totalPaidAmount;
            account.balance = ((account === null || account === void 0 ? void 0 : account.balance) + totalPaidAmount);
            client.totalDue = client.totalDue - totalPaidAmount;
        }
        // transaction history 
        const transactionData = {
            account: account.bankName,
            amount: payload.paidAmount,
            createdBy: "Super Admin",
            type: "credit",
            status: "active",
            date: utils_1.formateDate,
            reason: `[${sale.invoiceNo}] Invoice Payment added to ${account.bankName}`
        };
        payload.paymentFor = "client";
        payload.account = account.bankName;
        payload.saleId = sale._id;
        payload.clientId = client._id;
        const transactionHistory = new transactionHistory_model_1.TransactionHistory(transactionData);
        const paymentHistory = new paymentHistory_model_1.PaymentHistory(payload);
        yield transactionHistory.save({ session });
        yield paymentHistory.save({ session });
        yield account.save({ session });
        yield client.save({ session });
        const result = yield (sale === null || sale === void 0 ? void 0 : sale.save({ session }));
        yield session.commitTransaction();
        session.endSession();
        return result || null;
    }
    catch (error) {
        console.log(error);
        if (session) {
            yield session.abortTransaction();
            session.endSession();
        }
        throw error;
    }
});
exports.SalesService = {
    createSales,
    getSingleSales,
    updateSales,
    getAllSales,
    deleteSales,
    deleteAllSales,
    addPayment
};
