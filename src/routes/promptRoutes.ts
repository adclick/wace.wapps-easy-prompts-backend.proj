import express from 'express';
import promptController from '../controllers/promptController';
const router = express.Router();

// Define routes
router.get('/', promptController.getPrompts);
router.get('/filters', promptController.getFilters);
router.get('/:prompt_id', promptController.getPromptById);
router.post('/', promptController.createPrompt);
router.delete('/:prompt_id', promptController.deletePrompt);

export default router;