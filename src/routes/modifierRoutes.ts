import express from 'express';
import modifierController from '../controllers/modifierController';
const router = express.Router();

// Define routes
router.get('/', modifierController.getModifiers);
router.post('/', modifierController.createModifier);
router.get('/:modifier_id', modifierController.getModifierById);
router.put('/:modifier_id', modifierController.updateModifier);
router.delete('/:modifier_id', modifierController.deleteModifier);

export default router;