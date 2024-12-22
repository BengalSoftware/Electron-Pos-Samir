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
exports.InventoryHistoryService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const product_model_1 = require("../product/product.model");
const inventoryHistory_model_1 = require("./inventoryHistory.model");
const createInventoryHistory = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield inventoryHistory_model_1.InventoryHistory.create(payload);
    return result;
});
//GET ALL CATEGORIES
const getAllInventoryHistories = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
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
    // Filters needs $and to full fill all the conditions
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
    const result = yield inventoryHistory_model_1.InventoryHistory.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit)
        .select({ permissions: 0 });
    const total = yield inventoryHistory_model_1.InventoryHistory.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getSingleInventoryHistory = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // const result = await InventoryHistory.find({ product: payload });
    const productInfo = yield product_model_1.Product.findById(payload);
    const productObjectId = new mongoose_1.default.Types.ObjectId(payload);
    const result = yield inventoryHistory_model_1.InventoryHistory.aggregate([
        {
            $match: {
                product: productObjectId,
            },
        },
        {
            $facet: {
                stockIn: [
                    {
                        $match: {
                            stock: 'stock_in',
                        },
                    },
                ],
                stockOut: [
                    {
                        $match: {
                            stock: 'stock_out',
                        },
                    },
                ],
            },
        },
    ]);
    result.push({ details: { name: productInfo === null || productInfo === void 0 ? void 0 : productInfo.name, code: productInfo === null || productInfo === void 0 ? void 0 : productInfo.productCode, category: productInfo === null || productInfo === void 0 ? void 0 : productInfo.category.name, subCategory: productInfo === null || productInfo === void 0 ? void 0 : productInfo.subcategory.name, stock: productInfo === null || productInfo === void 0 ? void 0 : productInfo.quantity } });
    return result;
});
const deleteInventoryHistory = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    yield inventoryHistory_model_1.InventoryHistory.findByIdAndDelete(payload);
});
const deleteAllInventoryHistories = () => __awaiter(void 0, void 0, void 0, function* () {
    yield inventoryHistory_model_1.InventoryHistory.deleteMany({});
});
// UPDATE InventoryHistory
const updateInventoryHistory = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield inventoryHistory_model_1.InventoryHistory.findOneAndUpdate({ _id: id }, { $set: Object.assign({}, payload) }, { new: true });
    return result;
});
exports.InventoryHistoryService = {
    createInventoryHistory,
    getSingleInventoryHistory,
    updateInventoryHistory,
    getAllInventoryHistories,
    deleteInventoryHistory,
    deleteAllInventoryHistories
};
