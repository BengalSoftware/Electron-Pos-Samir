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
exports.SubCategoryService = void 0;
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const subCategory_model_1 = require("./subCategory.model");
const createSubCategory = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield subCategory_model_1.SubCategory.create(payload);
    return result;
});
//GET ALL CATEGORIES
const getAllSubCategories = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
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
    const result = yield subCategory_model_1.SubCategory.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield subCategory_model_1.SubCategory.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getSingleSubCategory = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield subCategory_model_1.SubCategory.findById(payload);
    return result;
});
const deleteSubCategory = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    yield subCategory_model_1.SubCategory.findByIdAndDelete(payload);
});
const deleteAllSubCategories = () => __awaiter(void 0, void 0, void 0, function* () {
    yield subCategory_model_1.SubCategory.deleteMany({});
});
// UPDATE SubCategory
const updateSubCategory = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield subCategory_model_1.SubCategory.findOneAndUpdate({ _id: id }, { $set: Object.assign({}, payload) }, { new: true });
    return result;
});
exports.SubCategoryService = {
    createSubCategory,
    getSingleSubCategory,
    updateSubCategory,
    getAllSubCategories,
    deleteSubCategory,
    deleteAllSubCategories
};
