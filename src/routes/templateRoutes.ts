import "express-async-errors"
import express from 'express';
import templateController from '../controllers/templateController';
import { errorHandler } from '../middlewares/errors';

const router = express.Router();

// Define routes
router.get('/', templateController.getTemplates);
router.get('/all', templateController.getAllTemplates);
router.get('/:template_id', templateController.getTemplateById);
router.post('/', templateController.createTemplate);
router.put('/:template_id', templateController.updateTemplate);
router.delete('/:template_id', templateController.deleteTemplate);

router.use(errorHandler);

export default router;