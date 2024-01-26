import express from 'express';
import templateController from '../controllers/templateController';
const router = express.Router();

// Define routes
router.get('/', templateController.getTemplates);
router.get('/:template_id', templateController.getTemplateById);
router.post('/', templateController.createTemplate);
router.delete('/:template_id', templateController.deleteTemplate);

export default router;