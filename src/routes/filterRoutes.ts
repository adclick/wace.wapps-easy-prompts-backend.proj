import express from 'express';
import filterController from '../controllers/filterController';
const router = express.Router();

// Define routes
router.get('/', filterController.getAll);

export default router;