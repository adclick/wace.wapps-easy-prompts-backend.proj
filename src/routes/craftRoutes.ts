import express from 'express';
import craftController from '../controllers/craftController';
const router = express.Router();

// Define routes
router.get('/:userId/', craftController.getCrafts);
router.post('/:userId/prompt', craftController.createPrompt);
router.post('/:userId/modifier', craftController.createModifier);

export default router;