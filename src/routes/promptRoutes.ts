import express from 'express';
import promptController from '../controllers/promptController';
const router = express.Router();

// Define routes
router.get('/', promptController.getPrompts);
router.post('/', promptController.createPrompt);
router.get('/filters', promptController.getFilters);
router.delete('/:prompt_id', promptController.deletePrompt);

export default router;