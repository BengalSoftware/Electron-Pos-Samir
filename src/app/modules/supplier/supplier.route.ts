import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { SupplierController } from '../supplier/supplier.controller';
import { SupplierValidation } from './supplier.validation';

const router = express.Router();

//GET ALL SupplierS
router.get(
    '/',
    auth("get-all-supplier"),
    SupplierController.getAllCategories
);

// CREATE SINGLE Supplier
router.post(
    '/create-supplier',
    validateRequest(
        SupplierValidation.createSupplierZodSchema
    ),
    auth("create-supplier"),
    SupplierController.createSupplier
);

// DELETE ALL SupplierS
router.delete(
    '/all',
    auth("delete-all-supplier"),
    SupplierController.deleteAllSuppliers
);

// UPDATE SINGLE Supplier
router.patch(
    '/:id',
    validateRequest(
        SupplierValidation.createSupplierZodSchema
    ),
    auth("update-supplier"),
    SupplierController.updateSupplier
);

// DELETE SINGLE Supplier
router.delete(
    '/:id',
    auth("delete-supplier"),
    SupplierController.deleteSupplier
);

// GET SINGLE Supplier
router.get(
    '/:id',
    auth("get-supplier"),
    SupplierController.getSupplier
);



export const SupplierRoutes = router;
