import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { UnitController } from './unit.controller';
import { UnitValidation } from './unit.validation';

const router = express.Router();

//GET ALL UnitS
router.get(
    '/',
    auth("get-all-unit"),
    UnitController.getAllCategories
);

// CREATE SINGLE Unit
router.post(
    '/create-unit',
    validateRequest(
        UnitValidation.createUnitZodSchema
    ),
    auth("create-unit"),
    UnitController.createUnit
);

// DELETE ALL UnitS
router.delete(
    '/all',
    auth("delete-all-unit"),
    UnitController.deleteAllCategories
);

// UPDATE SINGLE Unit
router.patch(
    '/:id',
    validateRequest(
        UnitValidation.createUnitZodSchema
    ),
    auth("update-unit"),
    UnitController.updateUnit
);

// DELETE SINGLE Unit
router.delete(
    '/:id',
    auth("delete-unit"),
    UnitController.deleteUnit
);

// GET SINGLE Unit
router.get(
    '/:id',
    auth("get-unit"),
    UnitController.getUnit
);



export const UnitRoutes = router;
