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
exports.ProductReturnService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const utils_1 = require("../../../utils");
const account_model_1 = require("../account/account.model");
const inventoryHistory_service_1 = require("../inventoryHistory/inventoryHistory.service");
const product_model_1 = require("../product/product.model");
const sales_model_1 = require("../sales/sales.model");
const productReturn_model_1 = require("./productReturn.model");
const productReturn_utils_1 = require("./productReturn.utils");
const createProductReturn = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // step 1 : update account balance 
    if (payload.account) {
        const account = (yield account_model_1.Account.findById(payload.account.id)) || null;
        const decrementAmount = payload.netTotal - payload.returnNetTotal;
        const presentBalance = account.balance;
        if ((account === null || account === void 0 ? void 0 : account.balance) !== undefined && presentBalance > decrementAmount) {
            account.balance = presentBalance - decrementAmount;
        }
        else {
            throw new Error(`The account balance is low! Amount must more then ${decrementAmount}`);
        }
        yield account.save();
    }
    //step 2 : update product quantity and invoice
    const sale = (yield sales_model_1.Sales.findById(payload.invoice)) || null;
    function createProductHistory(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            for (const returnedProduct of payload.products) {
                const productToUpdate = sale === null || sale === void 0 ? void 0 : sale.products.find(product => product._id === returnedProduct._id);
                if (productToUpdate) {
                    // Reduce the quantity by the amount returned
                    productToUpdate.returnQty = returnedProduct.returnQty;
                }
                const productObjectId = new mongoose_1.default.Types.ObjectId(returnedProduct._id);
                const inventoryHistory = {
                    product: productObjectId,
                    type: "invoice return",
                    date: utils_1.formateDate,
                    quantity: returnedProduct.quantity,
                    stock: "stock_in",
                    price: returnedProduct.purchasePrice,
                    person: "client",
                    code: payload.invoiceNo || "AP-TEST"
                };
                // Use await within the async function.
                yield inventoryHistory_service_1.InventoryHistoryService.createInventoryHistory(inventoryHistory);
                const dbProduct = yield product_model_1.Product.findOne({ _id: returnedProduct._id });
                if (dbProduct) {
                    const updatedQuantity = (dbProduct === null || dbProduct === void 0 ? void 0 : dbProduct.quantity) + returnedProduct.returnQty;
                    dbProduct.quantity = updatedQuantity;
                    yield dbProduct.save();
                }
            }
        });
    }
    yield createProductHistory(payload);
    sale.discountAmount = payload.returnDiscountAmount;
    sale.netTotal = payload.returnNetTotal;
    sale.totalTax = payload.returnTotalTax;
    sale.returnSubTotal = payload.returnSubTotal;
    // Save the updated sale
    yield sale.save();
    payload.invoiceNo = sale.invoiceNo;
    payload.code = yield (0, productReturn_utils_1.generateProductReturnCode)();
    const result = yield productReturn_model_1.ProductReturn.create(payload);
    return result;
});
//GET ALL CATEGORIES
const getAllProductReturns = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
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
    const result = yield productReturn_model_1.ProductReturn.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit)
        .select({ permissions: 0 });
    const total = yield productReturn_model_1.ProductReturn.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getSingleProductReturn = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield productReturn_model_1.ProductReturn.findById(payload);
    return result;
});
const deleteProductReturn = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    yield productReturn_model_1.ProductReturn.findByIdAndDelete(payload);
});
const deleteAllProductReturns = () => __awaiter(void 0, void 0, void 0, function* () {
    yield productReturn_model_1.ProductReturn.deleteMany({});
});
// UPDATE ProductReturn
const updateProductReturn = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield productReturn_model_1.ProductReturn.findOneAndUpdate({ _id: id }, { $set: Object.assign({}, payload) }, { new: true });
    return result;
});
exports.ProductReturnService = {
    createProductReturn,
    getSingleProductReturn,
    updateProductReturn,
    getAllProductReturns,
    deleteProductReturn,
    deleteAllProductReturns
};
