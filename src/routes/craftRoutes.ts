import express from 'express';
import craftController from '../controllers/craftController';
const router = express.Router();

// Define routes
router.get('/:userId/', craftController.getCrafts);
router.post('/:userId/prompt', craftController.createPrompt);
router.post('/:userId/modifier', craftController.createModifier);
router.delete('/:userId/prompt/:id', craftController.deleteCraft);
router.delete('/:userId/modifier/:id', craftController.deleteCraft);

export default router;