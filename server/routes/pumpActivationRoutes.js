import express from 'express';
import {
  createPumpActivation,
  getPumpActivationById,
  getActivePumpActivations,
  getPumpActivationsByUserId,
  completePumpActivation,
  cancelPumpActivation,
  getPumpActivationStats
} from '../controllers/pumpActivationController.js';

const router = express.Router();

// Rutas básicas CRUD
router.post('/', createPumpActivation);
router.get('/:id', getPumpActivationById);

// Rutas por filtros
router.get('/active/all', getActivePumpActivations);
router.get('/user/:user_id', getPumpActivationsByUserId);

// Rutas de acciones
router.put('/:id/complete', completePumpActivation);
router.put('/:id/cancel', cancelPumpActivation);

// Rutas de estadísticas
router.get('/stats/all', getPumpActivationStats);

export default router;
