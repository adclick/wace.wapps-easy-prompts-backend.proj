import express from 'express';
import providerController from '../controllers/providerController';
const router = express.Router();

// Define routes
router.get('/', providerController.getProviders);
router.get('/default', providerController.getDefault);

export default router;
