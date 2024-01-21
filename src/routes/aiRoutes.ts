import express from 'express';
import aiController from '../controllers/aiChatController';
import aiTextGenerationController from '../controllers/aiTextGenerationController';
import aiImageGenerationController from '../controllers/aiImageGenerationController';

const router = express.Router();

// Text Generation
router.get('/text-generation/', aiTextGenerationController.textGeneration);
router.get('/text-generation/prompt/:prompt_id', aiTextGenerationController.textGenerationByPromptId);
router.post('/text-generation/template/:template_id', aiTextGenerationController.textGenerationByTemplateId);

// Image Generation
router.get('/image-generation/', aiImageGenerationController.imageGeneration);
router.get('/image-generation/:prompt_id', aiImageGenerationController.imageGenerationById);

// Chat
router.post('/chat/', aiController.chat);
router.post('/chat/:prompt_id', aiController.chatById);

export default router;
