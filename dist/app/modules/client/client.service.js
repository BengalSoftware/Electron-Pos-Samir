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
exports.ClientService = void 0;
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const client_model_1 = require("./client.model");
const client_utils_1 = require("./client.utils");
const createClient = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    payload.clientId = yield (0, client_utils_1.generateClientId)();
    const result = yield client_model_1.Client.create(payload);
    return result;
});
//GET ALL CATEGORIES
const getAllClients = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
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
    const result = yield client_model_1.Client.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit)
        .select({ permissions: 0 });
    const total = yield client_model_1.Client.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getSingleClient = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield client_model_1.Client.findById(payload);
    return result;
});
const deleteClient = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    yield client_model_1.Client.findByIdAndDelete(payload);
});
const deleteAllClients = () => __awaiter(void 0, void 0, void 0, function* () {
    yield client_model_1.Client.deleteMany({});
});
// UPDATE Client
const updateClient = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // eslint-disable-next-line no-unused-vars
    const { clientId } = payload, others = __rest(payload, ["clientId"]);
    const result = yield client_model_1.Client.findOneAndUpdate({ _id: id }, { $set: others }, { new: true });
    return result;
});
exports.ClientService = {
    createClient,
    getSingleClient,
    updateClient,
    getAllClients,
    deleteClient,
    deleteAllClients
};
