import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { ClientController } from '../client/client.controller';
import { ClientValidation } from './client.validation';

const router = express.Router();

//GET ALL ClientS
router.get(
    '/',
    auth("get-all-client"),
    ClientController.getAllClients
);

// CREATE SINGLE Client
router.post(
    '/create-client',
    validateRequest(
        ClientValidation.createClientZodSchema
    ),
    auth("create-client"),
    ClientController.createClient
);

// DELETE ALL ClientS
router.delete(
    '/all',
    auth("delete-all-client"),
    ClientController.deleteAllClients
);

// UPDATE SINGLE Client
router.patch(
    '/:id',
    validateRequest(
        ClientValidation.createClientZodSchema
    ),
    auth("update-client"),
    ClientController.updateClient
);

// DELETE SINGLE Client
router.delete(
    '/:id',
    auth("delete-client"),
    ClientController.deleteClient
);

// GET SINGLE Client
router.get(
    '/:id',
    auth("get-client"),
    ClientController.getClient
);



export const ClientRoutes = router;
