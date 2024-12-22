import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { LoanAuthorityController } from './loanAuthority.controller';
import { LoanAuthorityValidation } from './loanAuthority.validation';

const router = express.Router();

//GET ALL LoanAuthorityS
router.get(
    '/',
    auth("get-all-loanAuthority"),
    LoanAuthorityController.getAllLoanAuthority
);

// CREATE SINGLE LoanAuthority
router.post(
    '/create-loanAuthority',
    validateRequest(
        LoanAuthorityValidation.createLoanAuthorityZodSchema
    ),
    auth("create-loanAuthority"),
    LoanAuthorityController.createLoanAuthority
);

// DELETE ALL LoanAuthorityS
router.delete(
    '/all',
    auth("delete-all-loanAuthority"),
    LoanAuthorityController.deleteAllLoanAuthority
);

// UPDATE SINGLE LoanAuthority
router.patch(
    '/:id',
    validateRequest(
        LoanAuthorityValidation.createLoanAuthorityZodSchema
    ),
    auth("update-loanAuthority"),
    LoanAuthorityController.updateLoanAuthority
);

// DELETE SINGLE LoanAuthority
router.delete(
    '/:id',
    auth("delete-loanAuthority"),
    LoanAuthorityController.deleteLoanAuthority
);

// GET SINGLE LoanAuthority
router.get(
    '/:id',
    auth("get-loanAuthority"),
    LoanAuthorityController.getLoanAuthority
);



export const LoanAuthorityRoutes = router;
