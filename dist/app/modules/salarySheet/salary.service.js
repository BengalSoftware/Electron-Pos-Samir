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
exports.SalaryService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const mongoose_1 = __importDefault(require("mongoose"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const user_model_1 = require("../user/user.model");
const salary_constant_1 = require("./salary.constant");
const salary_model_1 = require("./salary.model");
const createSalary = (salary) => __awaiter(void 0, void 0, void 0, function* () {
    let session;
    try {
        session = yield mongoose_1.default.startSession();
        session.startTransaction();
        const newSalary = yield salary_model_1.SalarySheet.create([salary], { session });
        if (!newSalary || newSalary.length === 0) {
            throw new Error('Failed to create Salary');
        }
        const newSalaryId = newSalary[0]._id;
        yield session.commitTransaction();
        session.endSession();
        const newSalaryData = yield salary_model_1.SalarySheet.findOne({ _id: newSalaryId });
        return newSalaryData;
    }
    catch (error) {
        if (session) {
            yield session.abortTransaction();
            session.endSession();
        }
        throw error;
    }
});
const getAllSalarySheet = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    // Extract searchTerm to implement search query
    const { searchTerm, month, year } = filters, filtersData = __rest(filters, ["searchTerm", "month", "year"]);
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const andConditions = [];
    // Search needs $or for searching in specified fields
    if (searchTerm) {
        andConditions.push({
            $or: salary_constant_1.EmployeeSearchableFields.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }
    // Filters need $and to fulfill all the conditions
    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    // Add conditions for filtering by month and year
    if (month && year) {
        andConditions.push({
            $expr: {
                $and: [
                    { $eq: [{ $month: "$createdAt" }, parseInt(month)] },
                    { $eq: [{ $year: "$createdAt" }, parseInt(year)] },
                ],
            },
        });
    }
    // Dynamic Sort needs field to do sorting
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield salary_model_1.SalarySheet.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield salary_model_1.SalarySheet.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getSingleSalarySheet = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // const loginInfo = await User.findOne({ employee: id });
    // console.log(loginInfo);
    const result = yield salary_model_1.SalarySheet.findById(id);
    if (result) {
        const resultWithUserInfo = Object.assign({}, result.toObject());
        return resultWithUserInfo;
    }
    return result;
});
// UPDATE EMPLOYEE
const updateSalarySheet = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield salary_model_1.SalarySheet.findOne({ _id: id });
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Employee not found !');
    }
    const EmployeeData = __rest(payload, []);
    const updatedEmployeeData = Object.assign({}, EmployeeData);
    // if (name && Object.keys(name).length > 0) {
    //   Object.keys(name).forEach(key => {
    //     const nameKey = `name.${key}` as keyof Partial<ISalary>; // `name.firstName`
    //     (updatedEmployeeData as any)[nameKey] = name[key as keyof typeof name];
    //   });
    // }
    const result = yield salary_model_1.SalarySheet.findOneAndUpdate({ _id: id }, { $set: updatedEmployeeData }, {
        new: true,
    });
    return result;
});
const deleteSalarySheet = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // check if the Employee is exist
    const isExist = yield salary_model_1.SalarySheet.findOne({ _id: id });
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Employee not found !');
    }
    //delete Employee first
    const employee = yield salary_model_1.SalarySheet.findOneAndDelete({ _id: id });
    if (!employee) {
        throw new ApiError_1.default(404, 'Failed to delete Employee');
    }
    //delete user
    // const u = await User.findOne({ employee: id });
    yield user_model_1.User.findOneAndDelete({ employee: id });
    return employee;
});
exports.SalaryService = {
    createSalary,
    getAllSalarySheet,
    getSingleSalarySheet,
    updateSalarySheet,
    deleteSalarySheet,
};
