import express from 'express';
import filtersController from '../controllers/filterController';
const router = express.Router();

// Define routes
router.get('/', filtersController.getFilters);

export default router;
