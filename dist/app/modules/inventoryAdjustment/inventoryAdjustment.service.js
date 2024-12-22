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
exports.InventoryAdjustmentService = void 0;
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const product_model_1 = require("../product/product.model");
const inventoryAdjustment_model_1 = require("./inventoryAdjustment.model");
const inventoryAdjustment_utils_1 = require("./inventoryAdjustment.utils");
const createInventoryAdjustment = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    function createProductHistory(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            for (const updateToProduct of payload.products) {
                const product = yield product_model_1.Product.findOne({ _id: updateToProduct._id });
                if (product) {
                    const updatedQuantity = updateToProduct.type === "increment" ? product.quantity + updateToProduct.adjustmentQty : product.quantity - updateToProduct.adjustmentQty;
                    product.quantity = updatedQuantity;
                    yield product.save();
                }
            }
        });
    }
    try {
        yield createProductHistory(payload);
        payload.code = yield (0, inventoryAdjustment_utils_1.generateAdjustmentId)();
        const result = yield inventoryAdjustment_model_1.InventoryAdjustment.create(payload);
        return result;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        throw new ApiError_1.default(500, error.message || 'Employee not found !');
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
    const result = yield inventoryAdjustment_model_1.InventoryAdjustment.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield inventoryAdjustment_model_1.InventoryAdjustment.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getSingleInventoryAdjustment = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield inventoryAdjustment_model_1.InventoryAdjustment.findById(payload);
    return result;
});
const deleteInventoryAdjustment = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    yield inventoryAdjustment_model_1.InventoryAdjustment.findByIdAndDelete(payload);
});
const deleteAllCategories = () => __awaiter(void 0, void 0, void 0, function* () {
    yield inventoryAdjustment_model_1.InventoryAdjustment.deleteMany({});
});
// UPDATE InventoryAdjustment
const updateInventoryAdjustment = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield inventoryAdjustment_model_1.InventoryAdjustment.findOneAndUpdate({ _id: id }, { $set: Object.assign({}, payload) }, { new: true });
    return result;
});
exports.InventoryAdjustmentService = {
    createInventoryAdjustment,
    getSingleInventoryAdjustment,
    updateInventoryAdjustment,
    getAllCategories,
    deleteInventoryAdjustment,
    deleteAllCategories
};
