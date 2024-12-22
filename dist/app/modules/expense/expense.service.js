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
exports.ExpenseService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const utils_1 = require("../../../utils");
const account_model_1 = require("../account/account.model");
const transactionHistory_model_1 = require("../transactionHistory/transactionHistory.model");
const expense_model_1 = require("./expense.model");
const createExpense = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    let session;
    try {
        session = yield mongoose_1.default.startSession();
        session.startTransaction();
        const account = (yield account_model_1.Account.findById(payload.account.id).session(session)) || null;
        if (!account) {
            throw new Error(`Account is not exist`);
        }
        if (account.balance < payload.amount) {
            throw new Error(`[${account.bankName}] Current Balance is low`);
        }
        //updated 
        account.balance = ((account === null || account === void 0 ? void 0 : account.balance) + payload.amount);
        // transaction history 
        const transactionData = {
            account: account.bankName,
            amount: payload.amount,
            createdBy: "Super Admin",
            type: "debit",
            status: "active",
            date: utils_1.formateDate,
            reason: `New Expense added from ${account.bankName}`
        };
        const transactionHistory = new transactionHistory_model_1.TransactionHistory(transactionData);
        yield transactionHistory.save({ session });
        yield account.save({ session });
        const result = yield expense_model_1.Expense.create(payload);
        yield session.commitTransaction();
        session.endSession();
        return result;
    }
    catch (error) {
        if (session) {
            yield session.abortTransaction();
            session.endSession();
        }
        throw error;
    }
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
    const result = yield expense_model_1.Expense.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit)
        .select({ permissions: 0 });
    const total = yield expense_model_1.Expense.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getSingleExpense = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield expense_model_1.Expense.findById(payload);
    return result;
});
const deleteExpense = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    yield expense_model_1.Expense.findByIdAndDelete(payload);
});
const deleteAllCategories = () => __awaiter(void 0, void 0, void 0, function* () {
    yield expense_model_1.Expense.deleteMany({});
});
// UPDATE Expense
const updateExpense = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield expense_model_1.Expense.findOneAndUpdate({ _id: id }, { $set: Object.assign({}, payload) }, { new: true });
    return result;
});
exports.ExpenseService = {
    createExpense,
    getSingleExpense,
    updateExpense,
    getAllCategories,
    deleteExpense,
    deleteAllCategories
};
