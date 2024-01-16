import express from 'express';
import templateController from '../controllers/templateController';
const router = express.Router();

// Define routes
router.get('/', templateController.getTemplates);
router.post('/', templateController.createTemplate);
router.get('/filters', templateController.getFilters);
router.delete('/:template_id', templateController.deleteTemplate);

export default router;