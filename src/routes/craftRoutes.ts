import express from 'express';
import craftController from '../controllers/craftController';
const router = express.Router();

// Define routes
router.get('/', craftController.getCrafts);
router.post('/:userId/prompt', craftController.createPrompt);
router.post('/modifier', craftController.createModifier);
router.delete('/:id', craftController.deleteCraft);

export default router;