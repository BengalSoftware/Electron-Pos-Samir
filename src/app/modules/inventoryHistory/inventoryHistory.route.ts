import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { InventoryHistoryController } from './inventoryHistory.controller';
import { InventoryHistoryValidation } from './inventoryHistory.validation';

const router = express.Router();

//GET ALL InventoryHistoryS
router.get(
    '/',
    auth("get-all-inventoryHistory"),
    InventoryHistoryController.getAllInventoryHistories
);

// CREATE SINGLE InventoryHistory
router.post(
    '/create-inventoryHistory',
    validateRequest(
        InventoryHistoryValidation.createInventoryHistoryZodSchema
    ),
    auth("create-inventoryHistory"),
    InventoryHistoryController.createInventoryHistory
);

// DELETE ALL InventoryHistoryS
router.delete(
    '/all',
    auth("delete-all-inventoryHistory"),
    InventoryHistoryController.deleteAllInventoryHistories
);

// UPDATE SINGLE InventoryHistory
router.patch(
    '/:id',
    // validateRequest(
    //     InventoryHistoryValidation.createInventoryHistoryZodSchema
    // ),
    auth("update-inventoryHistory"),
    InventoryHistoryController.updateInventoryHistory
);

// DELETE SINGLE InventoryHistory
router.delete(
    '/:id',
    auth("delete-inventoryHistory"),
    InventoryHistoryController.deleteInventoryHistory
);

// GET SINGLE InventoryHistory
router.get(
    '/:id',
    auth("get-inventoryHistory"),
    InventoryHistoryController.getInventoryHistory
);



export const InventoryHistoryRoutes = router;
