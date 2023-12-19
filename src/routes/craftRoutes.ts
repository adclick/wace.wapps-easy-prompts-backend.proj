import express from 'express';
import craftController from '../controllers/craftController';
const router = express.Router();

// Define routes
router.get('/:userId/', craftController.getCrafts);
router.post('/prompt/:userId/', craftController.createPrompt);
router.post('/modifier/:userId/', craftController.createModifier);

export default router;
