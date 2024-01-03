import express from 'express';
import technologyController from '../controllers/technologyController';
const router = express.Router();

// Define routes
router.get('/', technologyController.getTechnologies);
router.get('/default', technologyController.getDefault);

export default router;
