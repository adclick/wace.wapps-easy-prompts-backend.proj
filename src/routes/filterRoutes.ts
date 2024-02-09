import express from 'express';
import filterController from '../controllers/filterController';
const router = express.Router();

// Define routes
router.get('/', filterController.getAll);
router.get('/private', filterController.getAllUserPrivateFilters);
router.get('/public', filterController.getAllUserPublicDatabaseFilters);

export default router;