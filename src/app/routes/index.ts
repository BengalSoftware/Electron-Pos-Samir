import express from 'express';

import { AccountRoutes } from '../modules/account/account.route';
import { AdminRoutes } from '../modules/admin/admin.route';
import { AuthRoutes } from '../modules/auth/auth.route';
import { BalanceAdjustmentRoutes } from '../modules/balanceAdjustment/balanceAdjustment.route';
import { BalanceTransferRoutes } from '../modules/balanceTransfer/balanceTransfer.route';
import { BrandsRoutes } from '../modules/brand/brand.route';
import { CategoryRoutes } from '../modules/category/category.route';
import { ClientRoutes } from '../modules/client/client.route';
import { DepartmentRoutes } from '../modules/department/department.route';
import { EmployeeRoutes } from '../modules/employee/employee.route';
import { ExpenseRoutes } from '../modules/expense/expense.route';
import { ExpenseCategoryRoutes } from '../modules/expenseCategory/expenseCategory.route';
import { ExpenseSubCategoryRoutes } from '../modules/expenseSubCategory/expenseSubCategory.route';
import { InventoryAdjustmentRoutes } from '../modules/inventoryAdjustment/inventoryAdjustment.route';
import { InventoryHistoryRoutes } from '../modules/inventoryHistory/inventoryHistory.route';
import { ManagementOutletRoutes } from '../modules/outlet/outlet.route';
import { PaymentHistoryRoutes } from '../modules/paymentsHistory/paymentHistory.route';
import { ProductRoutes } from '../modules/product/product.route';
import { ProductReturnRoutes } from '../modules/productReturn/productReturn.route';
import { PurchaseRoutes } from '../modules/purchase/purchase.route';
import { PurchaseReturnRoutes } from '../modules/purchaseReturn/purchaseReturn.route';
import { ReportsRoutes } from '../modules/reports/reports.route';
import { RoleRoutes } from '../modules/role/role.route';
import { SalaryRoutes } from '../modules/salarySheet/salary.route';
import { SalesRoutes } from '../modules/sales/sales.route';
import { SettingsRoutes } from '../modules/settings/settings.route';
import { SubCategoryRoutes } from '../modules/subCategory/subCategory.route';
import { SuperAdminRoutes } from '../modules/superAdmin/superAdmin.route';
import { SupplierRoutes } from '../modules/supplier/supplier.route';
import { TransactionHistoryRoutes } from '../modules/transactionHistory/transactionHistory.route';
import { UnitRoutes } from '../modules/unit/unit.route';
import { UserRoutes } from '../modules/user/user.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/admins',
    route: AdminRoutes,
  },
  {
    path: '/superAdmin',
    route: SuperAdminRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/outlet',
    route: ManagementOutletRoutes,
  },
  {
    path: '/employee',
    route: EmployeeRoutes,
  },
  {
    path: '/salary',
    route: SalaryRoutes,
  },
  {
    path: '/supplier',
    route: SupplierRoutes,
  },
  {
    path: '/client',
    route: ClientRoutes,
  },
  {
    path: '/role',
    route: RoleRoutes,
  },
  {
    path: '/settings',
    route: SettingsRoutes,
  },
  {
    path: '/units',
    route: UnitRoutes,
  },
  {
    path: '/product',
    route: ProductRoutes,
  },
  {
    path: '/department',
    route: DepartmentRoutes,
  },
  {
    path: '/category',
    route: CategoryRoutes,
  },
  {
    path: '/expense-category',
    route: ExpenseCategoryRoutes,
  },
  {
    path: '/expense-subcategory',
    route: ExpenseSubCategoryRoutes,
  },
  {
    path: '/subcategory',
    route: SubCategoryRoutes,
  },
  {
    path: '/account',
    route: AccountRoutes,
  },
  {
    path: '/expense',
    route: ExpenseRoutes,
  },
  {
    path: '/purchase',
    route: PurchaseRoutes,
  },
  {
    path: '/balanceAdjustment',
    route: BalanceAdjustmentRoutes,
  },
  {
    path: '/balanceTransfer',
    route: BalanceTransferRoutes,
  },
  {
    path: '/transactionHistory',
    route: TransactionHistoryRoutes,
  },
  {
    path: '/sale',
    route: SalesRoutes,
  },
  {
    path: '/reports',
    route: ReportsRoutes,
  },
  {
    path: '/productReturn',
    route: ProductReturnRoutes,
  },
  {
    path: '/inventoryHistory',
    route: InventoryHistoryRoutes,
  },
  {
    path: '/inventoryAdjustment',
    route: InventoryAdjustmentRoutes,
  },
  {
    path: '/purchaseReturn',
    route: PurchaseReturnRoutes,
  },
  {
    path: '/paymentHistory',
    route: PaymentHistoryRoutes,
  },
  {
    path: '/brand',
    route: BrandsRoutes,
  },

];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
