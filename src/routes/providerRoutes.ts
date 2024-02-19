import "express-async-errors";
import express from 'express';
import providerController from '../controllers/providerController';
import { errorHandler } from '../middlewares/errors';

const router = express.Router();

// Define routes
router.get('/', providerController.getProviders);
router.get('/default', providerController.getDefault);

router.use(errorHandler);

export default router;
