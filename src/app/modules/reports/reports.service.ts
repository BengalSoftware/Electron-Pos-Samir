import mongoose from "mongoose";
import { Account } from "../account/account.model";
import { BalanceTransfer } from "../balanceTransfer/balanceTransfer.model";
import { Client } from "../client/client.model";
import { InventoryHistory } from "../inventoryHistory/inventoryHistory.model";
import { Product } from "../product/product.model";
import { ProductReturn } from "../productReturn/productReturn.model";
import { Purchase } from "../purchase/purchase.model";
import { PurchaseReturn } from "../purchaseReturn/purchaseReturn.model";
import { Sales } from "../sales/sales.model";
import { Supplier } from "../supplier/supplier.model";

const summeryReport = async (payload: { day?: number, month: number, year: number }): Promise<any> => {
    const result: any = {};
    const { day, month, year } = payload;

    let startDate: Date;
    let endDate: Date;

    if (day) {
        // Start date of the specified day
        startDate = new Date(year, month - 1, day);
        // End date of the specified day
        endDate = new Date(year, month - 1, day + 1);
    } else {
        // Start date of the month
        startDate = new Date(year, month, 1);
        // End date of the month
        endDate = new Date(year, month + 1, 0);
    }

    const saleData = await Sales.aggregate([
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
    ])
    //account
    const accountData = await Account.find({
        createdAt: {
            $gte: startDate,
            $lte: endDate,
        }
    }).select("bankName balance");

    //balance transfer 
    const balanceTransfer = await BalanceTransfer.find({
        createdAt: {
            $gte: startDate,
            $lte: endDate,
        }
    })
        .select("fromAccount toAccount amount")
        .populate("fromAccount toAccount", "bankName")

    // supplier
    const supplierData = await Supplier.aggregate([
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
}

//GET ALL CATEGORIES
const getBalanceSheetReport = async (): Promise<any> => {

    const result: any = {};
    const clientPayment = await Client.aggregate([
        {
            $group: {
                _id: null,
                totalPayment: { $sum: "$totalPayment" },
                totalDue: { $sum: "$totalDue" }
            }
        }
    ]);
    const supplierPayment = await Supplier.aggregate([
        {
            $group: {
                _id: null,
                totalPayment: { $sum: "$totalPayment" },
                totalDue: { $sum: "$totalDue" },
            }
        }
    ]);
    const totalBankBalance = await Account.aggregate([
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

}

const getSingleProductReports = async (payload: any): Promise<any> => {

    const { range, productId } = payload;
    const filterDates = filterDate(range);

    const productInfo = await Product.findById(productId)
    const productObjectId = new mongoose.Types.ObjectId(productId);
    const result = await InventoryHistory.aggregate([
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
    result.push({ details: { name: productInfo?.name, code: productInfo?.productCode, category: productInfo?.category.name, subCategory: productInfo?.subcategory.name, stock: productInfo?.quantity } })
    return result;
}


const getDashboardStatistics = async (payload: any): Promise<any> => {
    const { range } = payload;

    const filterDates = filterDate(range);

    const totalPurchase = await Purchase.aggregate(
        [
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
        ]
    )
    const totalPurchaseReturn = await PurchaseReturn.aggregate(
        [
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
        ]
    )
    const totalSale = await Sales.aggregate(
        [
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
        ]
    )
    const totalSaleReturn = await ProductReturn.aggregate(
        [
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
        ]
    )
    const clientPayment = await Client.aggregate(
        [
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
        ]
    )
    const supplierPayment = await Supplier.aggregate(
        [
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
        ]
    )

    return {
        totalPurchase: totalPurchase[0] || { amount: 0 },
        totalPurchaseReturn: totalPurchaseReturn[0] || { amount: 0 },
        totalSale: totalSale[0] || { amount: 0 },
        totalSaleReturn: totalSaleReturn[0] || { amount: 0 },
        clientPayment: clientPayment[0] || { amount: 0 },
        supplierPayment: supplierPayment[0] || { amount: 0 },
    }
}

const paymentSentVsPaymentReceived = async (): Promise<any> => {
    // Function to get month name from month number
    const getMonthName = (monthNumber: number) => {
        const monthNames = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];
        return monthNames[monthNumber - 1];
    };

    const purchaseData = await Purchase.aggregate([
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

    const salesData = await Sales.aggregate([
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
        } else {
            mergedData.push({
                name: getMonthName(i),
                paymentSent: 0,
                paymentReceived: 0,
            });
        }
    }

    return mergedData;
}
const saleVsPurchase = async (): Promise<any> => {
    // Function to get month name from month number
    const getMonthName = (monthNumber: number) => {
        const monthNames = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];
        return monthNames[monthNumber - 1];
    };

    const purchaseData = await Purchase.aggregate([
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

    const salesData = await Sales.aggregate([
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
        } else {
            mergedData.push({
                name: getMonthName(i),
                purchase: 0,
                sale: 0,
            });
        }
    }

    return mergedData;
}


const saleVsPurchaseDaily = async (payload: { day?: number, month: number, year: number }): Promise<any> => {
    // Function to get month name from month number
    const getMonthName = (monthNumber: number) => {
        const monthNames = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];
        return monthNames[monthNumber - 1];
    };
    const { day, month, year } = payload;

    let startDate: Date;
    let endDate: Date;

    if (day) {
        // Start date of the specified day
        startDate = new Date(year, month - 1, day);
        // End date of the specified day
        endDate = new Date(year, month - 1, day + 1);
    } else {
        // Start date of the month
        startDate = new Date(year, month, 1);
        // End date of the month
        endDate = new Date(year, month + 1, 0);
    }
    const purchaseData = await Purchase.aggregate([
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

    const salesData = await Sales.aggregate([
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
        } else {
            mergedData.push({
                name: getMonthName(i),
                purchase: 0,
                sale: 0,
            });
        }
    }

    return mergedData;
}

const filterDate = (range: any) => {
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
        }
    }
    if (range === "thisMonth") {
        // Get the first day of the current month
        const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        // Get the first day of the next month
        const firstDayOfNextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
        filterDate = {
            $gte: firstDayOfMonth,
            $lt: firstDayOfNextMonth
        }
    };
    if (range === "lastSevenDays") {
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        filterDate = { $gte: sevenDaysAgo }
    };
    if (range === "thisYear") {
        // Get the first day of the current year
        const firstDayOfYear = new Date(currentDate.getFullYear(), 0, 1);
        // Get the first day of the next year
        const firstDayOfNextYear = new Date(currentDate.getFullYear() + 1, 0, 1);
        filterDate = {
            $gte: firstDayOfYear,
            $lt: firstDayOfNextYear
        }
    };
    return filterDate;
}

export const ReportsService = {
    summeryReport,
    getSingleProductReports,
    getBalanceSheetReport,
    getDashboardStatistics,
    paymentSentVsPaymentReceived,
    saleVsPurchase,
    saleVsPurchaseDaily
};
