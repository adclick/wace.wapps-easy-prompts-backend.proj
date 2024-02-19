import "express-async-errors";
import express from 'express';
import modifierController from '../controllers/modifierController';
import { errorHandler } from '../middlewares/errors';

const router = express.Router();

// Define routes
router.get('/', modifierController.getModifiers);
router.get('/all', modifierController.getAllModifiers);
router.post('/', modifierController.createModifier);
router.get('/:modifier_id', modifierController.getModifierById);
router.put('/:modifier_id', modifierController.updateModifier);
router.delete('/:modifier_id', modifierController.deleteModifier);

router.use(errorHandler);

export default router;