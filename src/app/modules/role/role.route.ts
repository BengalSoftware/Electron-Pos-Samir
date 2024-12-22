import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { RoleController } from './role.controller';
import { RoleValidation } from './role.validation';

const router = express.Router();

//GET ALL ROLES
router.get(
    '/',
    auth("get-all-role"),
    RoleController.getAllRoles
);

// CREATE SINGLE ROLE
router.post(
    '/create-role',
    validateRequest(
        RoleValidation.createRoleZodSchema
    ),
    auth("create-role"),
    RoleController.createRole
);

// DELETE ALL ROLES
router.delete(
    '/all',
    auth("delete-all-role"),
    RoleController.deleteAllRoles
);

// UPDATE SINGLE ROLE
router.patch(
    '/:id',
    validateRequest(
        RoleValidation.createRoleZodSchema
    ),
    auth("update-role"),
    RoleController.updateRole
);

// DELETE SINGLE ROLE
router.delete(
    '/:id',
    auth("delete-role"),
    RoleController.deleteRole
);

// GET SINGLE ROLE
router.get(
    '/:id',
    auth("get-role"),
    RoleController.getRole
);



export const RoleRoutes = router;
