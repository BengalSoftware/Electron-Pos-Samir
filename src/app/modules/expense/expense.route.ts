import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { ExpenseController } from './expense.controller';
import { ExpenseValidation } from './expense.validation';

const router = express.Router();

//GET ALL ExpenseS
router.get(
    '/',
    auth("get-all-expense"),
    ExpenseController.getAllCategories
);

// CREATE SINGLE Expense
router.post(
    '/create-expense',
    validateRequest(
        ExpenseValidation.createExpenseZodSchema
    ),
    auth("create-expense"),
    ExpenseController.createExpense
);

// DELETE ALL ExpenseS
router.delete(
    '/all',
    auth("delete-all-expense"),
    ExpenseController.deleteAllCategories
);

// UPDATE SINGLE Expense
router.patch(
    '/:id',
    validateRequest(
        ExpenseValidation.createExpenseZodSchema
    ),
    auth("update-expense"),
    ExpenseController.updateExpense
);

// DELETE SINGLE Expense
router.delete(
    '/:id',
    auth("delete-expense"),
    ExpenseController.deleteExpense
);

// GET SINGLE Expense
router.get(
    '/:id',
    auth("get-expense"),
    ExpenseController.getExpense
);



export const ExpenseRoutes = router;
