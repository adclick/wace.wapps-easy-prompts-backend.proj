import express from 'express';
import optionController from '../controllers/optionController';
const router = express.Router();

// Define routes
router.get('/:userId/:technologyId/provider', optionController.getProvider);
router.get('/:userId/:technologyId/:providerId/parameters', optionController.getParameters);

export default router;
