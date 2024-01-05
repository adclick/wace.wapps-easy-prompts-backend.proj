import express from 'express';
import promptController from '../controllers/promptController';
const router = express.Router();

// Define routes
router.get('/', promptController.getPrompts);
router.get('/filters', promptController.getFilters);
router.post('/:userId/prompt', promptController.createPrompt);
router.delete('/:id', promptController.deletePrompt);

export default router;