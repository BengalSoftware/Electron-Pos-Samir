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
exports.SupplierService = void 0;
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const supplier_model_1 = require("./supplier.model");
const supplier_utils_1 = require("./supplier.utils");
const createSupplier = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    payload.code = yield (0, supplier_utils_1.generateSupplierCode)();
    const result = yield supplier_model_1.Supplier.create(payload);
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
    const result = yield supplier_model_1.Supplier.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit)
        .select({ permissions: 0 });
    const total = yield supplier_model_1.Supplier.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getSingleSupplier = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield supplier_model_1.Supplier.findById(payload);
    return result;
});
const deleteSupplier = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    yield supplier_model_1.Supplier.findByIdAndDelete(payload);
});
const deleteAllSuppliers = () => __awaiter(void 0, void 0, void 0, function* () {
    yield supplier_model_1.Supplier.deleteMany({});
});
// UPDATE Supplier
const updateSupplier = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    const { code } = payload, others = __rest(payload, ["code"]);
    const result = yield supplier_model_1.Supplier.findOneAndUpdate({ _id: id }, { $set: others }, { new: true });
    return result;
});
exports.SupplierService = {
    createSupplier,
    getSingleSupplier,
    updateSupplier,
    getAllCategories,
    deleteSupplier,
    deleteAllSuppliers
};
