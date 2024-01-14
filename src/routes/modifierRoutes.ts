import express from 'express';
import modifierController from '../controllers/modifierController';
const router = express.Router();

// Define routes
router.get('/', modifierController.getModifiers);
router.post('/', modifierController.createModifier);
router.get('/filters', modifierController.getFilters);
router.delete('/:modifier_id', modifierController.deleteModifier);

export default router;