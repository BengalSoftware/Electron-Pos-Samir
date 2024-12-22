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
exports.PurchaseService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const utils_1 = require("../../../utils");
const account_model_1 = require("../account/account.model");
const inventoryHistory_service_1 = require("../inventoryHistory/inventoryHistory.service");
const paymentHistory_model_1 = require("../paymentsHistory/paymentHistory.model");
const product_model_1 = require("../product/product.model");
const supplier_model_1 = require("../supplier/supplier.model");
const transactionHistory_model_1 = require("../transactionHistory/transactionHistory.model");
const purchase_model_1 = require("./purchase.model");
const purchase_utils_1 = require("./purchase.utils");
const createPurchase = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    payload.code = yield (0, purchase_utils_1.generatePurchaseCode)();
    payload.totalDue = payload.netTotal;
    const result = yield purchase_model_1.Purchase.create(payload);
    function createProductHistory(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            for (const product of payload.products) {
                const productObjectId = new mongoose_1.default.Types.ObjectId(product._id);
                const inventoryHistory = {
                    product: productObjectId,
                    type: "purchase",
                    date: utils_1.formateDate,
                    quantity: product.quantity,
                    stock: "stock_in",
                    price: product.purchasePrice,
                    person: payload.supplier.name,
                    code: result.code
                };
                // Use await within the async function.
                yield inventoryHistory_service_1.InventoryHistoryService.createInventoryHistory(inventoryHistory);
                const dbProduct = yield product_model_1.Product.findOne({ _id: product._id });
                if (dbProduct) {
                    const updatedQuantity = (dbProduct === null || dbProduct === void 0 ? void 0 : dbProduct.quantity) + product.quantity;
                    dbProduct.purchasePrice = product.purchasePrice;
                    dbProduct.quantity = updatedQuantity;
                    yield dbProduct.save();
                }
            }
        });
    }
    const supplier = yield supplier_model_1.Supplier.findById(payload.supplier.id);
    if (supplier) {
        const total = ((supplier === null || supplier === void 0 ? void 0 : supplier.totalPurchase) + payload.netTotal).toFixed(2);
        const totalDue = ((supplier === null || supplier === void 0 ? void 0 : supplier.totalDue) + payload.netTotal).toFixed(2);
        supplier.totalPurchase = parseFloat(total);
        supplier.totalDue = parseFloat(totalDue);
        supplier.save();
    }
    yield createProductHistory(payload);
    return result;
});
//GET ALL CATEGORIES
const getAllPurchases = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    // Extract searchTerm to implement search query
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const { limit, page, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
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
        });
    }
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield purchase_model_1.Purchase.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit)
        .select({ permissions: 0 });
    const total = yield purchase_model_1.Purchase.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getSinglePurchase = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const salesHistory = yield paymentHistory_model_1.PaymentHistory.find({ purchaseId: payload });
    const result = yield purchase_model_1.Purchase.findById(payload).populate("supplier.id");
    if (result) {
        result.payments = salesHistory;
    }
    return result;
});
const deletePurchase = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    yield purchase_model_1.Purchase.findByIdAndDelete(payload);
});
const deleteAllPurchases = () => __awaiter(void 0, void 0, void 0, function* () {
    yield purchase_model_1.Purchase.deleteMany({});
});
// UPDATE Purchase
const updatePurchase = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield purchase_model_1.Purchase.findOneAndUpdate({ _id: id }, { $set: Object.assign({}, payload) }, { new: true });
    return result;
});
// Add  purchase Payment
const addPayment = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    let session;
    try {
        session = yield mongoose_1.default.startSession();
        session.startTransaction();
        const purchase = yield purchase_model_1.Purchase.findById(id).session(session);
        const accountId = payload.account;
        const account = (yield account_model_1.Account.findById(accountId).session(session)) || null;
        const supplier = (yield supplier_model_1.Supplier.findById(purchase === null || purchase === void 0 ? void 0 : purchase.supplier.id).session(session)) || null;
        if (!account) {
            throw new Error(`Account is not exist`);
        }
        if (!purchase) {
            throw new ApiError_1.default(404, "Sales not found");
        }
        if (account.balance < payload.paidAmount) {
            throw new Error(`[${account.bankName}] Current Balance is low`);
        }
        if (purchase.totalDue) {
            const totalPaidAmount = payload.paidAmount;
            purchase.totalDue -= totalPaidAmount;
            purchase.totalPayment += totalPaidAmount;
            account.balance = (account.balance - totalPaidAmount);
            supplier.totalDue -= totalPaidAmount;
        }
        // transaction history 
        const transactionData = {
            account: account.bankName,
            amount: payload.paidAmount,
            createdBy: "Super Admin",
            type: "debit",
            status: "active",
            date: utils_1.formateDate,
            reason: `[${purchase.code}] Purchase Payment send from ${account.bankName}`
        };
        payload.paymentFor = "supplier";
        payload.account = account.bankName;
        payload.purchaseId = purchase._id;
        payload.supplierId = supplier._id;
        const transactionHistory = new transactionHistory_model_1.TransactionHistory(transactionData);
        const paymentHistory = new paymentHistory_model_1.PaymentHistory(payload);
        yield transactionHistory.save({ session });
        yield paymentHistory.save({ session });
        yield account.save({ session });
        yield supplier.save({ session });
        const result = yield purchase.save({ session });
        yield session.commitTransaction();
        session.endSession();
        return result || null;
    }
    catch (error) {
        if (session) {
            yield session.abortTransaction();
            session.endSession();
        }
        throw error;
    }
});
exports.PurchaseService = {
    createPurchase,
    getSinglePurchase,
    updatePurchase,
    getAllPurchases,
    deletePurchase,
    deleteAllPurchases,
    addPayment
};
