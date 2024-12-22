"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const account_route_1 = require("../modules/account/account.route");
const admin_route_1 = require("../modules/admin/admin.route");
const auth_route_1 = require("../modules/auth/auth.route");
const balanceAdjustment_route_1 = require("../modules/balanceAdjustment/balanceAdjustment.route");
const balanceTransfer_route_1 = require("../modules/balanceTransfer/balanceTransfer.route");
const brand_route_1 = require("../modules/brand/brand.route");
const category_route_1 = require("../modules/category/category.route");
const client_route_1 = require("../modules/client/client.route");
const department_route_1 = require("../modules/department/department.route");
const employee_route_1 = require("../modules/employee/employee.route");
const expense_route_1 = require("../modules/expense/expense.route");
const expenseCategory_route_1 = require("../modules/expenseCategory/expenseCategory.route");
const expenseSubCategory_route_1 = require("../modules/expenseSubCategory/expenseSubCategory.route");
const inventoryAdjustment_route_1 = require("../modules/inventoryAdjustment/inventoryAdjustment.route");
const inventoryHistory_route_1 = require("../modules/inventoryHistory/inventoryHistory.route");
const outlet_route_1 = require("../modules/outlet/outlet.route");
const paymentHistory_route_1 = require("../modules/paymentsHistory/paymentHistory.route");
const product_route_1 = require("../modules/product/product.route");
const productReturn_route_1 = require("../modules/productReturn/productReturn.route");
const purchase_route_1 = require("../modules/purchase/purchase.route");
const purchaseReturn_route_1 = require("../modules/purchaseReturn/purchaseReturn.route");
const reports_route_1 = require("../modules/reports/reports.route");
const role_route_1 = require("../modules/role/role.route");
const salary_route_1 = require("../modules/salarySheet/salary.route");
const sales_route_1 = require("../modules/sales/sales.route");
const settings_route_1 = require("../modules/settings/settings.route");
const subCategory_route_1 = require("../modules/subCategory/subCategory.route");
const superAdmin_route_1 = require("../modules/superAdmin/superAdmin.route");
const supplier_route_1 = require("../modules/supplier/supplier.route");
const transactionHistory_route_1 = require("../modules/transactionHistory/transactionHistory.route");
const unit_route_1 = require("../modules/unit/unit.route");
const user_route_1 = require("../modules/user/user.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/admins',
        route: admin_route_1.AdminRoutes,
    },
    {
        path: '/superAdmin',
        route: superAdmin_route_1.SuperAdminRoutes,
    },
    {
        path: '/users',
        route: user_route_1.UserRoutes,
    },
    {
        path: '/auth',
        route: auth_route_1.AuthRoutes,
    },
    {
        path: '/outlet',
        route: outlet_route_1.ManagementOutletRoutes,
    },
    {
        path: '/employee',
        route: employee_route_1.EmployeeRoutes,
    },
    {
        path: '/salary',
        route: salary_route_1.SalaryRoutes,
    },
    {
        path: '/supplier',
        route: supplier_route_1.SupplierRoutes,
    },
    {
        path: '/client',
        route: client_route_1.ClientRoutes,
    },
    {
        path: '/role',
        route: role_route_1.RoleRoutes,
    },
    {
        path: '/settings',
        route: settings_route_1.SettingsRoutes,
    },
    {
        path: '/units',
        route: unit_route_1.UnitRoutes,
    },
    {
        path: '/product',
        route: product_route_1.ProductRoutes,
    },
    {
        path: '/department',
        route: department_route_1.DepartmentRoutes,
    },
    {
        path: '/category',
        route: category_route_1.CategoryRoutes,
    },
    {
        path: '/expense-category',
        route: expenseCategory_route_1.ExpenseCategoryRoutes,
    },
    {
        path: '/expense-subcategory',
        route: expenseSubCategory_route_1.ExpenseSubCategoryRoutes,
    },
    {
        path: '/subcategory',
        route: subCategory_route_1.SubCategoryRoutes,
    },
    {
        path: '/account',
        route: account_route_1.AccountRoutes,
    },
    {
        path: '/expense',
        route: expense_route_1.ExpenseRoutes,
    },
    {
        path: '/purchase',
        route: purchase_route_1.PurchaseRoutes,
    },
    {
        path: '/balanceAdjustment',
        route: balanceAdjustment_route_1.BalanceAdjustmentRoutes,
    },
    {
        path: '/balanceTransfer',
        route: balanceTransfer_route_1.BalanceTransferRoutes,
    },
    {
        path: '/transactionHistory',
        route: transactionHistory_route_1.TransactionHistoryRoutes,
    },
    {
        path: '/sale',
        route: sales_route_1.SalesRoutes,
    },
    {
        path: '/reports',
        route: reports_route_1.ReportsRoutes,
    },
    {
        path: '/productReturn',
        route: productReturn_route_1.ProductReturnRoutes,
    },
    {
        path: '/inventoryHistory',
        route: inventoryHistory_route_1.InventoryHistoryRoutes,
    },
    {
        path: '/inventoryAdjustment',
        route: inventoryAdjustment_route_1.InventoryAdjustmentRoutes,
    },
    {
        path: '/purchaseReturn',
        route: purchaseReturn_route_1.PurchaseReturnRoutes,
    },
    {
        path: '/paymentHistory',
        route: paymentHistory_route_1.PaymentHistoryRoutes,
    },
    {
        path: '/brand',
        route: brand_route_1.BrandsRoutes,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
