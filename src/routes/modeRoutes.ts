import express from 'express';
import modeController from '../controllers/modeController';
const router = express.Router();

// Define routes
router.get('/', modeController.getModes);
router.get('/default', modeController.getDefault);

export default router;
