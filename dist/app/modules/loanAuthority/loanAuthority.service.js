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
exports.LoanAuthorityService = void 0;
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const loanAuthority_model_1 = require("./loanAuthority.model");
const createLoanAuthority = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield loanAuthority_model_1.LoanAuthority.create(payload);
    return result;
});
//GET ALL LoanAuthority
const getAllLoanAuthority = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
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
    const result = yield loanAuthority_model_1.LoanAuthority.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit)
        .select({ permissions: 0 });
    const total = yield loanAuthority_model_1.LoanAuthority.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getSingleLoanAuthority = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield loanAuthority_model_1.LoanAuthority.findById(payload);
    return result;
});
const deleteLoanAuthority = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    yield loanAuthority_model_1.LoanAuthority.findByIdAndDelete(payload);
});
const deleteAllLoanAuthority = () => __awaiter(void 0, void 0, void 0, function* () {
    yield loanAuthority_model_1.LoanAuthority.deleteMany({});
});
// UPDATE LoanAuthority
const updateLoanAuthority = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield loanAuthority_model_1.LoanAuthority.findOneAndUpdate({ _id: id }, { $set: Object.assign({}, payload) }, { new: true });
    return result;
});
exports.LoanAuthorityService = {
    createLoanAuthority,
    getSingleLoanAuthority,
    updateLoanAuthority,
    getAllLoanAuthority,
    deleteLoanAuthority,
    deleteAllLoanAuthority
};
