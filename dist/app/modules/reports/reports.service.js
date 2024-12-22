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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportsService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const account_model_1 = require("../account/account.model");
const balanceTransfer_model_1 = require("../balanceTransfer/balanceTransfer.model");
const client_model_1 = require("../client/client.model");
const inventoryHistory_model_1 = require("../inventoryHistory/inventoryHistory.model");
const product_model_1 = require("../product/product.model");
const productReturn_model_1 = require("../productReturn/productReturn.model");
const purchase_model_1 = require("../purchase/purchase.model");
const purchaseReturn_model_1 = require("../purchaseReturn/purchaseReturn.model");
const sales_model_1 = require("../sales/sales.model");
const supplier_model_1 = require("../supplier/supplier.model");
const summeryReport = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = {};
    const { day, month, year } = payload;
    let startDate;
    let endDate;
    if (day) {
        // Start date of the specified day
        startDate = new Date(year, month - 1, day);
        // End date of the specified day
        endDate = new Date(year, month - 1, day + 1);
    }
    else {
        // Start date of the month
        startDate = new Date(year, month, 1);
        // End date of the month
        endDate = new Date(year, month + 1, 0);
    }
    const saleData = yield sales_model_1.Sales.aggregate([
        {
            $match: {
                createdAt: {
                    $gte: startDate,
                    $lte: endDate,
                }
            }
        },
        {
            $group: {
                _id: null,
                totalSale: { $sum: "$netTotal" },
                totalDue: { $sum: "$totalDue" },
            }
        }
    ]);
    //account
    const accountData = yield account_model_1.Account.find({
        createdAt: {
            $gte: startDate,
            $lte: endDate,
        }
    }).select("bankName balance");
    //balance transfer 
    const balanceTransfer = yield balanceTransfer_model_1.BalanceTransfer.find({
        createdAt: {
            $gte: startDate,
            $lte: endDate,
        }
    })
        .select("fromAccount toAccount amount")
        .populate("fromAccount toAccount", "bankName");
    // supplier
    const supplierData = yield supplier_model_1.Supplier.aggregate([
        {
            $match: {
                createdAt: {
                    $gte: startDate,
                    $lte: endDate,
                }
            }
        },
        {
            $group: {
                _id: null,
                totalPurchase: { $sum: "$totalPurchase" },
            }
        }
    ]);
    result.totalInvoiceSale = saleData[0] ? saleData[0].totalSale : 0;
    result.totalInvoiceDue = saleData[0] ? saleData[0].totalDue : 0;
    result.totalPurchase = supplierData[0] ? supplierData[0].totalPurchase : 0;
    result.accounts = accountData;
    result.balanceTransfer = balanceTransfer;
    return result;
});
//GET ALL CATEGORIES
const getBalanceSheetReport = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = {};
    const clientPayment = yield client_model_1.Client.aggregate([
        {
            $group: {
                _id: null,
                totalPayment: { $sum: "$totalPayment" },
                totalDue: { $sum: "$totalDue" }
            }
        }
    ]);
    const supplierPayment = yield supplier_model_1.Supplier.aggregate([
        {
            $group: {
                _id: null,
                totalPayment: { $sum: "$totalPayment" },
                totalDue: { $sum: "$totalDue" },
            }
        }
    ]);
    const totalBankBalance = yield account_model_1.Account.aggregate([
        {
            $group: {
                _id: null,
                totalBankBalance: { $sum: "$balance" },
            }
        }
    ]);
    result.clientTotalPayment = clientPayment[0].totalPayment;
    result.clientTotalDue = clientPayment[0].totalDue;
    result.supplierTotalPayment = supplierPayment[0].totalPayment;
    result.supplierTotalDue = supplierPayment[0].totalDue;
    result.totalBankBalance = totalBankBalance[0].totalBankBalance;
    return result;
});
const getSingleProductReports = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { range, productId } = payload;
    const filterDates = filterDate(range);
    const productInfo = yield product_model_1.Product.findById(productId);
    const productObjectId = new mongoose_1.default.Types.ObjectId(productId);
    const result = yield inventoryHistory_model_1.InventoryHistory.aggregate([
        {
            $match: {
                product: productObjectId,
                createdAt: filterDates,
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
const getDashboardStatistics = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { range } = payload;
    const filterDates = filterDate(range);
    const totalPurchase = yield purchase_model_1.Purchase.aggregate([
        {
            $match: {
                createdAt: filterDates,
            },
        },
        {
            $group: {
                _id: null,
                amount: { $sum: '$netTotal' }
            }
        }
    ]);
    const totalPurchaseReturn = yield purchaseReturn_model_1.PurchaseReturn.aggregate([
        {
            $match: {
                createdAt: filterDates,
            },
        },
        {
            $group: {
                _id: null,
                amount: { $sum: '$returnNetTotal' }
            }
        }
    ]);
    const totalSale = yield sales_model_1.Sales.aggregate([
        {
            $match: {
                createdAt: filterDates,
            },
        },
        {
            $group: {
                _id: null,
                amount: { $sum: '$netTotal' }
            }
        }
    ]);
    const totalSaleReturn = yield productReturn_model_1.ProductReturn.aggregate([
        {
            $match: {
                createdAt: filterDates,
            },
        },
        {
            $group: {
                _id: null,
                amount: { $sum: '$returnNetTotal' }
            }
        }
    ]);
    const clientPayment = yield client_model_1.Client.aggregate([
        {
            $match: {
                createdAt: filterDates,
            },
        },
        {
            $group: {
                _id: null,
                amount: { $sum: '$totalPayment' }
            }
        }
    ]);
    const supplierPayment = yield supplier_model_1.Supplier.aggregate([
        {
            $match: {
                createdAt: filterDates,
            },
        },
        {
            $group: {
                _id: null,
                amount: { $sum: '$totalPayment' }
            }
        }
    ]);
    return {
        totalPurchase: totalPurchase[0] || { amount: 0 },
        totalPurchaseReturn: totalPurchaseReturn[0] || { amount: 0 },
        totalSale: totalSale[0] || { amount: 0 },
        totalSaleReturn: totalSaleReturn[0] || { amount: 0 },
        clientPayment: clientPayment[0] || { amount: 0 },
        supplierPayment: supplierPayment[0] || { amount: 0 },
    };
});
const paymentSentVsPaymentReceived = () => __awaiter(void 0, void 0, void 0, function* () {
    // Function to get month name from month number
    const getMonthName = (monthNumber) => {
        const monthNames = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];
        return monthNames[monthNumber - 1];
    };
    const purchaseData = yield purchase_model_1.Purchase.aggregate([
        {
            $group: {
                _id: { $month: '$createdAt' },
                netTotal: { $sum: '$totalPayment' },
            },
        },
        {
            $project: {
                _id: 0,
                month: '$_id',
                purchase: '$netTotal',
            },
        },
    ]);
    const salesData = yield sales_model_1.Sales.aggregate([
        {
            $group: {
                _id: { $month: '$createdAt' },
                netTotal: { $sum: '$totalPayment' },
            },
        },
        {
            $project: {
                _id: 0,
                month: '$_id',
                sale: '$netTotal',
            },
        },
    ]);
    const mergedData = [];
    for (let i = 1; i <= 12; i++) {
        const matchingMonthData = purchaseData.find(month => month.month === i);
        const matchingConversation = salesData.find(conv => conv.month === i);
        if (matchingMonthData || matchingConversation) {
            const monthName = getMonthName(i);
            const monthData = {
                name: monthName,
                paymentSent: matchingMonthData ? matchingMonthData.purchase : 0,
                paymentReceived: matchingConversation ? matchingConversation.sale : 0,
            };
            mergedData.push(monthData);
        }
        else {
            mergedData.push({
                name: getMonthName(i),
                paymentSent: 0,
                paymentReceived: 0,
            });
        }
    }
    return mergedData;
});
const saleVsPurchase = () => __awaiter(void 0, void 0, void 0, function* () {
    // Function to get month name from month number
    const getMonthName = (monthNumber) => {
        const monthNames = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];
        return monthNames[monthNumber - 1];
    };
    const purchaseData = yield purchase_model_1.Purchase.aggregate([
        {
            $group: {
                _id: { $month: '$createdAt' },
                netTotal: { $sum: '$netTotal' },
            },
        },
        {
            $project: {
                _id: 0,
                month: '$_id',
                purchase: '$netTotal',
            },
        },
    ]);
    const salesData = yield sales_model_1.Sales.aggregate([
        {
            $group: {
                _id: { $month: '$createdAt' },
                netTotal: { $sum: '$netTotal' },
            },
        },
        {
            $project: {
                _id: 0,
                month: '$_id',
                sale: '$netTotal',
            },
        },
    ]);
    const mergedData = [];
    for (let i = 1; i <= 12; i++) {
        const matchingMonthData = purchaseData.find(month => month.month === i);
        const matchingConversation = salesData.find(conv => conv.month === i);
        if (matchingMonthData || matchingConversation) {
            const monthName = getMonthName(i);
            const monthData = {
                name: monthName,
                purchase: matchingMonthData ? matchingMonthData.purchase : 0,
                sale: matchingConversation ? matchingConversation.sale : 0,
            };
            mergedData.push(monthData);
        }
        else {
            mergedData.push({
                name: getMonthName(i),
                purchase: 0,
                sale: 0,
            });
        }
    }
    return mergedData;
});
const saleVsPurchaseDaily = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Function to get month name from month number
    const getMonthName = (monthNumber) => {
        const monthNames = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];
        return monthNames[monthNumber - 1];
    };
    const { day, month, year } = payload;
    let startDate;
    let endDate;
    if (day) {
        // Start date of the specified day
        startDate = new Date(year, month - 1, day);
        // End date of the specified day
        endDate = new Date(year, month - 1, day + 1);
    }
    else {
        // Start date of the month
        startDate = new Date(year, month, 1);
        // End date of the month
        endDate = new Date(year, month + 1, 0);
    }
    const purchaseData = yield purchase_model_1.Purchase.aggregate([
        {
            $match: {
                createdAt: {
                    $gte: startDate,
                    $lte: endDate,
                }
            }
        },
        {
            $group: {
                _id: { $month: '$createdAt' },
                netTotal: { $sum: '$netTotal' },
            },
        },
        {
            $project: {
                _id: 0,
                month: '$_id',
                purchase: '$netTotal',
            },
        },
    ]);
    const salesData = yield sales_model_1.Sales.aggregate([
        {
            $match: {
                createdAt: {
                    $gte: startDate,
                    $lte: endDate,
                }
            }
        },
        {
            $group: {
                _id: { $month: '$createdAt' },
                netTotal: { $sum: '$netTotal' },
            },
        },
        {
            $project: {
                _id: 0,
                month: '$_id',
                sale: '$netTotal',
            },
        },
    ]);
    const mergedData = [];
    for (let i = 1; i <= 12; i++) {
        const matchingMonthData = purchaseData.find(month => month.month === i);
        const matchingConversation = salesData.find(conv => conv.month === i);
        if (matchingMonthData || matchingConversation) {
            const monthName = getMonthName(i);
            const monthData = {
                name: monthName,
                purchase: matchingMonthData ? matchingMonthData.purchase : 0,
                sale: matchingConversation ? matchingConversation.sale : 0,
            };
            mergedData.push(monthData);
        }
        else {
            mergedData.push({
                name: getMonthName(i),
                purchase: 0,
                sale: 0,
            });
        }
    }
    return mergedData;
});
const filterDate = (range) => {
    let filterDate = {};
    const currentDate = new Date();
    if (range === "today") {
        // Set the time to the beginning of the day (midnight)
        currentDate.setHours(0, 0, 0, 0);
        // Get tomorrow's date (start of the next day)
        const tomorrow = new Date(currentDate);
        tomorrow.setDate(currentDate.getDate() + 1);
        filterDate = {
            $gte: currentDate,
            $lt: tomorrow
        };
    }
    if (range === "thisMonth") {
        // Get the first day of the current month
        const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        // Get the first day of the next month
        const firstDayOfNextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
        filterDate = {
            $gte: firstDayOfMonth,
            $lt: firstDayOfNextMonth
        };
    }
    ;
    if (range === "lastSevenDays") {
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        filterDate = { $gte: sevenDaysAgo };
    }
    ;
    if (range === "thisYear") {
        // Get the first day of the current year
        const firstDayOfYear = new Date(currentDate.getFullYear(), 0, 1);
        // Get the first day of the next year
        const firstDayOfNextYear = new Date(currentDate.getFullYear() + 1, 0, 1);
        filterDate = {
            $gte: firstDayOfYear,
            $lt: firstDayOfNextYear
        };
    }
    ;
    return filterDate;
};
exports.ReportsService = {
    summeryReport,
    getSingleProductReports,
    getBalanceSheetReport,
    getDashboardStatistics,
    paymentSentVsPaymentReceived,
    saleVsPurchase,
    saleVsPurchaseDaily
};
