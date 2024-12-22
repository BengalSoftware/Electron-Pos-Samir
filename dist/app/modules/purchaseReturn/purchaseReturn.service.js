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
exports.PurchaseReturnService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const utils_1 = require("../../../utils");
const account_model_1 = require("../account/account.model");
const inventoryHistory_service_1 = require("../inventoryHistory/inventoryHistory.service");
const product_model_1 = require("../product/product.model");
const purchase_model_1 = require("../purchase/purchase.model");
const purchaseReturn_model_1 = require("./purchaseReturn.model");
const purchaseReturn_utils_1 = require("./purchaseReturn.utils");
const createPurchaseReturn = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // step 1 : update account balance 
    if (payload.account) {
        const account = (yield account_model_1.Account.findById(payload.account.id)) || null;
        const decrementAmount = payload.netTotal - payload.returnNetTotal;
        const presentBalance = account.balance;
        if (account === null || account === void 0 ? void 0 : account.balance) {
            account.balance = presentBalance + decrementAmount;
        }
        else {
            throw new Error(`The account not found`);
        }
        yield account.save();
    }
    //step 2 : update product quantity and invoice
    const purchase = (yield purchase_model_1.Purchase.findById(payload.purchaseNo)) || null;
    function createProductHistory(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            for (const returnedProduct of payload.products) {
                const productToUpdate = purchase === null || purchase === void 0 ? void 0 : purchase.products.find(product => product._id === returnedProduct._id);
                if (productToUpdate) {
                    // Reduce the quantity by the amount returned
                    productToUpdate.returnQty = returnedProduct.returnQty;
                }
                const productObjectId = new mongoose_1.default.Types.ObjectId(returnedProduct._id);
                const inventoryHistory = {
                    product: productObjectId,
                    type: "purchase return",
                    date: utils_1.formateDate,
                    quantity: returnedProduct.quantity,
                    stock: "stock_out",
                    price: returnedProduct.purchasePrice,
                    person: payload.supplier.name,
                    code: purchase.code
                };
                // Use await within the async function.
                yield inventoryHistory_service_1.InventoryHistoryService.createInventoryHistory(inventoryHistory);
                const dbProduct = yield product_model_1.Product.findOne({ _id: returnedProduct._id });
                if (dbProduct) {
                    const updatedQuantity = (dbProduct === null || dbProduct === void 0 ? void 0 : dbProduct.quantity) - returnedProduct.returnQty;
                    dbProduct.quantity = updatedQuantity;
                    yield dbProduct.save();
                }
            }
        });
    }
    yield createProductHistory(payload);
    //update supplier
    // const supplier = await Supplier.findById(payload.supplier.id);
    // if (supplier) {
    //     const total = (supplier?.totalPurchase + payload.netTotal).toFixed(2);
    //     supplier.totalPurchase = parseFloat(total);
    //     supplier.totalDue = parseFloat(total);
    // }
    //update purchase
    purchase.discountAmount = payload.returnDiscountAmount;
    purchase.netTotal = payload.returnNetTotal;
    purchase.totalTax = payload.returnTotalTax;
    purchase.returnSubTotal = payload.returnSubTotal;
    purchase.isReturned = true;
    yield purchase.save();
    // Save the updated sale
    payload.purchaseNo = purchase.code;
    payload.code = yield (0, purchaseReturn_utils_1.generatePurchaseReturnId)();
    const result = yield purchaseReturn_model_1.PurchaseReturn.create(payload);
    return result;
});
//GET ALL CATEGORIES
const getAllPurchaseReturns = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
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
    const result = yield purchaseReturn_model_1.PurchaseReturn.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit)
        .select({ permissions: 0 });
    const total = yield purchaseReturn_model_1.PurchaseReturn.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getSinglePurchaseReturn = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield purchaseReturn_model_1.PurchaseReturn.findById(payload);
    return result;
});
const deletePurchaseReturn = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    yield purchaseReturn_model_1.PurchaseReturn.findByIdAndDelete(payload);
});
const deleteAllPurchaseReturns = () => __awaiter(void 0, void 0, void 0, function* () {
    yield purchaseReturn_model_1.PurchaseReturn.deleteMany({});
});
// UPDATE PurchaseReturn
const updatePurchaseReturn = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield purchaseReturn_model_1.PurchaseReturn.findOneAndUpdate({ _id: id }, { $set: Object.assign({}, payload) }, { new: true });
    return result;
});
exports.PurchaseReturnService = {
    createPurchaseReturn,
    getSinglePurchaseReturn,
    updatePurchaseReturn,
    getAllPurchaseReturns,
    deletePurchaseReturn,
    deleteAllPurchaseReturns
};
