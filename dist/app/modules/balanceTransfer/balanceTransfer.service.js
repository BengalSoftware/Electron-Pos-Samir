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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BalanceTransferService = void 0;
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const utils_1 = require("../../../utils");
const account_model_1 = require("../account/account.model");
const transactionHistory_model_1 = require("../transactionHistory/transactionHistory.model");
const balanceTransfer_model_1 = require("./balanceTransfer.model");
const createBalanceTransfer = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const fromAccount = (yield account_model_1.Account.findById(payload.fromAccount)) || null;
    const toAccount = (yield account_model_1.Account.findById(payload.toAccount)) || null;
    if (!fromAccount || !toAccount) {
        throw new Error(`Account is not exist`);
    }
    if (payload.fromAccount === payload.toAccount) {
        throw new Error(`The to account and from account must be different.`);
    }
    const currentBalance = (fromAccount.balance);
    if (payload.amount > currentBalance) {
        throw new Error(`Amount must be less then or equal ${fromAccount.balance}`);
    }
    // transaction history 
    const transactionDebitData = {
        account: fromAccount.bankName,
        amount: payload.amount,
        createdBy: "Super Admin",
        type: "debit",
        status: "active",
        date: utils_1.formateDate,
        reason: `Balance transfer from ${fromAccount.bankName}`
    };
    const transactionCreditData = Object.assign(Object.assign({}, transactionDebitData), { account: toAccount.bankName, type: "credit", reason: `Balance transfer to ${toAccount.bankName}` });
    const result = (yield (yield balanceTransfer_model_1.BalanceTransfer.create(payload))
        .populate("fromAccount", "bankName balance"))
        .populate("toAccount", "bankName balance");
    // save transaction history
    yield transactionHistory_model_1.TransactionHistory.create(transactionDebitData);
    yield transactionHistory_model_1.TransactionHistory.create(transactionCreditData);
    // update from and to account
    fromAccount.balance = currentBalance - payload.amount;
    toAccount.balance = toAccount.balance + payload.amount;
    yield fromAccount.save();
    yield toAccount.save();
    return result;
});
//GET ALL BalanceTransfer
const getAllBalanceTransfer = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    // Extract searchTerm to implement search query
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const { limit, page, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
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
        });
    }
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield balanceTransfer_model_1.BalanceTransfer.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit)
        .select({ permissions: 0 })
        .populate("fromAccount", "bankName balance")
        .populate("toAccount", "bankName balance");
    const total = yield balanceTransfer_model_1.BalanceTransfer.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getSingleBalanceTransfer = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield balanceTransfer_model_1.BalanceTransfer.findById(payload).populate("fromAccount", "bankName balance")
        .populate("toAccount", "bankName balance");
    return result;
});
const deleteBalanceTransfer = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    yield balanceTransfer_model_1.BalanceTransfer.findByIdAndDelete(payload);
});
const deleteAllBalanceTransfer = () => __awaiter(void 0, void 0, void 0, function* () {
    yield balanceTransfer_model_1.BalanceTransfer.deleteMany({});
});
// UPDATE BalanceTransfer
const updateBalanceTransfer = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield balanceTransfer_model_1.BalanceTransfer.findOneAndUpdate({ _id: id }, { $set: Object.assign({}, payload) }, { new: true })
        .populate("fromAccount", "bankName balance")
        .populate("toAccount", "bankName balance");
    return result;
});
exports.BalanceTransferService = {
    createBalanceTransfer,
    getSingleBalanceTransfer,
    updateBalanceTransfer,
    getAllBalanceTransfer,
    deleteBalanceTransfer,
    deleteAllBalanceTransfer
};
