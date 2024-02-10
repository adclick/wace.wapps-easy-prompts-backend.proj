import "express-async-errors";  
import express from 'express';
import filterController from '../controllers/filterController';
import { errorHandler } from '../middlewares/errors';

const router = express.Router();

// Define routes
router.get('/', filterController.getAll);
router.get('/private', filterController.getAllUserPrivateFilters);
router.get('/public', filterController.getAllUserPublicDatabaseFilters);

router.use(errorHandler);

export default router;