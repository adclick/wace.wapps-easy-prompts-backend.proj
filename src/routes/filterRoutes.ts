import express from 'express';
import filtersController from '../controllers/filtersController';
const router = express.Router();

// Define routes
router.get('/filters/', filterController.getFilters);

export default router;
