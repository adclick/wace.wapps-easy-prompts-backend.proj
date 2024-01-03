import express from 'express';
import technologyController from '../controllers/technologyController';
const router = express.Router();

// Define routes
router.get('/default', technologyController.getDefault);
router.get('/:id/providers', technologyController.getProviders);

export default router;
