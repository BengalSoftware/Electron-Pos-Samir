import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { AccountController } from './account.controller';
import { AccountValidation } from './account.validation';

const router = express.Router();

//GET ALL AccountS
router.get(
    '/',
    auth("get-all-account"),
    AccountController.getAllCategories
);

// CREATE SINGLE Account
router.post(
    '/create-account',
    validateRequest(
        AccountValidation.createAccountZodSchema
    ),
    auth("create-account"),
    AccountController.createAccount
);

// DELETE ALL AccountS
router.delete(
    '/all',
    auth("delete-all-account"),
    AccountController.deleteAllCategories
);

// UPDATE SINGLE Account
router.patch(
    '/:id',
    validateRequest(
        AccountValidation.createAccountZodSchema
    ),
    auth("update-account"),
    AccountController.updateAccount
);

// DELETE SINGLE Account
router.delete(
    '/:id',
    auth("delete-account"),
    AccountController.deleteAccount
);

// GET SINGLE Account
router.get(
    '/:id',
    auth("get-account"),
    AccountController.getAccount
);



export const AccountRoutes = router;
