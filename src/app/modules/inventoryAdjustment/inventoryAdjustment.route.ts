import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { InventoryAdjustmentController } from './inventoryAdjustment.controller';
import { InventoryAdjustmentValidation } from './inventoryAdjustment.validation';

const router = express.Router();

//GET ALL InventoryAdjustmentS
router.get(
    '/',
    auth("get-all-inventoryAdjustment"),
    InventoryAdjustmentController.getAllCategories
);

// CREATE SINGLE InventoryAdjustment
router.post(
    '/create-inventoryAdjustment',
    validateRequest(
        InventoryAdjustmentValidation.createInventoryAdjustmentZodSchema
    ),
    auth("create-inventoryAdjustment"),
    InventoryAdjustmentController.createInventoryAdjustment
);

// DELETE ALL InventoryAdjustmentS
router.delete(
    '/all',
    auth("delete-all-inventoryAdjustment"),
    InventoryAdjustmentController.deleteAllCategories
);

// UPDATE SINGLE InventoryAdjustment
router.patch(
    '/:id',
    validateRequest(
        InventoryAdjustmentValidation.createInventoryAdjustmentZodSchema
    ),
    auth("update-inventoryAdjustment"),
    InventoryAdjustmentController.updateInventoryAdjustment
);

// DELETE SINGLE InventoryAdjustment
router.delete(
    '/:id',
    auth("delete-inventoryAdjustment"),
    InventoryAdjustmentController.deleteInventoryAdjustment
);

// GET SINGLE InventoryAdjustment
router.get(
    '/:id',
    auth("get-inventoryAdjustment"),
    InventoryAdjustmentController.getInventoryAdjustment
);



export const InventoryAdjustmentRoutes = router;
