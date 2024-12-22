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
exports.BalanceAdjustmentService = void 0;
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const utils_1 = require("../../../utils");
const account_model_1 = require("../account/account.model");
const transactionHistory_model_1 = require("../transactionHistory/transactionHistory.model");
const balanceAdjustment_model_1 = require("./balanceAdjustment.model");
const createBalanceAdjustment = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const accountInfo = (yield account_model_1.Account.findById(payload.accountId)) || null;
    if (!accountInfo) {
        throw new Error(`Account is not exist`);
    }
    const currentBalance = accountInfo.balance;
    if (payload.type === "remove" && payload.amount > currentBalance) {
        throw new Error(`Amount must be less then or equal ${accountInfo.balance}`);
    }
    if (payload.type === "remove") {
        accountInfo.balance = (currentBalance - payload.amount);
    }
    else {
        accountInfo.balance = (currentBalance + payload.amount);
    }
    ;
    // transaction history 
    const transactionData = {
        account: accountInfo.bankName,
        amount: payload.amount,
        createdBy: "Super Admin",
        type: payload.type === "remove" ? "debit" : "credit",
        status: "active",
        date: utils_1.formateDate,
        reason: `Non invoice balance ${payload.type === "add" ? "added to" : "removed from"} ${accountInfo.bankName}`
    };
    yield transactionHistory_model_1.TransactionHistory.create(transactionData);
    const result = (yield balanceAdjustment_model_1.BalanceAdjustment.create(payload)).populate("accountId");
    yield accountInfo.save();
    return result;
});
//GET ALL CATEGORIES
const getAllCategories = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
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
    const result = yield balanceAdjustment_model_1.BalanceAdjustment.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit)
        .populate("accountId");
    const total = yield balanceAdjustment_model_1.BalanceAdjustment.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getSingleBalanceAdjustment = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield balanceAdjustment_model_1.BalanceAdjustment.findById(payload).populate("accountId");
    return result;
});
const deleteBalanceAdjustment = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    yield balanceAdjustment_model_1.BalanceAdjustment.findByIdAndDelete(payload);
});
const deleteAllCategories = () => __awaiter(void 0, void 0, void 0, function* () {
    yield balanceAdjustment_model_1.BalanceAdjustment.deleteMany({});
});
// UPDATE BalanceAdjustment
const updateBalanceAdjustment = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield balanceAdjustment_model_1.BalanceAdjustment.findOneAndUpdate({ _id: id }, { $set: Object.assign({}, payload) }, { new: true }).populate("accountId");
    return result;
});
exports.BalanceAdjustmentService = {
    createBalanceAdjustment,
    getSingleBalanceAdjustment,
    updateBalanceAdjustment,
    getAllCategories,
    deleteBalanceAdjustment,
    deleteAllCategories
};
