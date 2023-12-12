import express from 'express';
import modifiersController from '../controllers/modifiersController';
const router = express.Router();

// Define routes
router.get('/modifiers/:userId/:promptId', modifiersController.getModifiersByPromptId);

export default router;
