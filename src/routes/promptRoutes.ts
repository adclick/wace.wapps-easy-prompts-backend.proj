import "express-async-errors";
import express from 'express';
import promptController from '../controllers/promptController';
import { errorHandler } from '../middlewares/errors';

const router = express.Router();

// Define routes
router.get('/', promptController.getPrompts);
router.get('/:prompt_id', promptController.getPromptById);
router.post('/', promptController.createPrompt);
router.put('/:prompt_id', promptController.updatePrompt);
router.delete('/:prompt_id', promptController.deletePrompt);

router.use(errorHandler);

export default router;