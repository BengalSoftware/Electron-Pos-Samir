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
exports.ManagementOutletService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const outlet_model_1 = require("./outlet.model");
const outletconstant_1 = require("./outletconstant");
const createOutlet = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const hasAlreadyMain = yield outlet_model_1.ManagementOutlet.findOne({ branch: "main" });
    if (hasAlreadyMain && payload.branch === "main") {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "Already have a main branch");
    }
    const result = yield outlet_model_1.ManagementOutlet.create(payload);
    return result;
});
const getSingleOutlet = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield outlet_model_1.ManagementOutlet.findById(id);
    return result;
});
const getAllOutlets = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    // Extract searchTerm to implement search query
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const andConditions = [];
    // Search needs $or for searching in specified fields
    if (searchTerm) {
        andConditions.push({
            $or: outletconstant_1.managementOutletSearchableFields.map(field => ({
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
                [field]: value,
            })),
        });
    }
    // Dynamic  Sort needs  field to  do sorting
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield outlet_model_1.ManagementOutlet.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield outlet_model_1.ManagementOutlet.countDocuments();
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const updateOutlet = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield outlet_model_1.ManagementOutlet.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
});
const deleteOutlet = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield outlet_model_1.ManagementOutlet.findByIdAndDelete(id);
    return result;
});
exports.ManagementOutletService = {
    createOutlet,
    getAllOutlets,
    getSingleOutlet,
    updateOutlet,
    deleteOutlet,
};
