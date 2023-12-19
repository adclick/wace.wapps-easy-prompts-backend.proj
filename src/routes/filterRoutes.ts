import express from 'express';
import filtersController from '../controllers/filterController';
const router = express.Router();

// Define routes
router.get('/:userId', filtersController.getFilters);

export default router;
