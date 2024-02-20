import "express-async-errors";
import express from 'express';
import aiController from '../controllers/aiChatController';
import aiTextGenerationController from '../controllers/aiTextGenerationController';
import aiImageGenerationController from '../controllers/aiImageGenerationController';
import { errorHandler } from '../middlewares/errors';

const router = express.Router();

// Text Generation
router.post('/text-generation/', aiTextGenerationController.textGeneration);
router.post('/text-generation/prompt/:prompt_id', aiTextGenerationController.textGenerationByPromptId);

// Image Generation
router.post('/image-generation/', aiImageGenerationController.imageGeneration);
router.post('/image-generation/prompt/:prompt_id', aiImageGenerationController.imageGenerationByPromptId);

// Chat
router.post('/chat/', aiController.chat);
router.post('/chat/prompt/:prompt_id', aiController.chatByPromptId);


router.use(errorHandler);

export default router;
