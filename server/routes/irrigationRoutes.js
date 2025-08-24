import express from 'express';
import {
  // Funciones principales de irrigation config
  createIrrigationConfig,
  getIrrigationConfigById,
  getActiveIrrigationConfigsByUser,
  getIrrigationConfigsByUser,
  getIrrigationConfigsByUserAndType,
  activateIrrigationConfig,
  deactivateIrrigationConfig,
  updateLastIrrigation,
  getLastIrrigationDate,
  getSpecificConfig,
  deleteIrrigationConfig,
  // Funciones de manual config
  updateManualConfig,
  // Funciones de automatic config
  createAutomaticConfig,
  // Funciones de programmed config
  createProgrammedConfig,
  cancelProgrammedConfig,
  cancelProgrammedIrrigation,
  updateNextExecution,
  updateProgrammedExecution
} from '../controllers/irrigationConfigController.js';

import {
  // Funciones de pump activations
  createPumpActivation,
  getActivePumpActivation,
  updatePumpActivationStatus,
  pausePumpActivation,
  resumePumpActivation,
  completePumpActivation,
  getPumpActivationsByUser,
  getLatestPumpActivationByConfig
} from '../controllers/pumpActivationController.js';

const router = express.Router();

// Rutas principales de configuración de riego
router.post('/', createIrrigationConfig);
router.get('/:id', getIrrigationConfigById);
router.delete('/:id', deleteIrrigationConfig);

// Rutas por usuario
router.get('/user/:user_id/active', getActiveIrrigationConfigsByUser);
router.get('/user/:user_id/all', getIrrigationConfigsByUser);
router.get('/user/:user_id/type/:mode_type', getIrrigationConfigsByUserAndType);
router.get('/user/:user_id/last-irrigation', getLastIrrigationDate);

// Rutas de activación/desactivación
router.put('/:id/activate', activateIrrigationConfig);
router.put('/:id/deactivate', deactivateIrrigationConfig);
router.put('/:id/update-last-irrigation', updateLastIrrigation);

// Rutas de configuración específica
router.get('/:id/specific-config', getSpecificConfig);

// Rutas de configuración manual
router.put('/manual/:id', updateManualConfig);

// Rutas de configuración automática
router.post('/automatic', createAutomaticConfig);

// Rutas de configuración programada
router.post('/programmed', createProgrammedConfig);
router.delete('/programmed/:irrigation_config_id/cancel', cancelProgrammedConfig);
router.delete('/programmed/:irrigation_config_id/cancel-irrigation', cancelProgrammedIrrigation);
router.put('/programmed/:id/next-execution', updateNextExecution);
router.put('/programmed/:id/execution', updateProgrammedExecution);

// Rutas de activación de bomba
router.post('/pump-activation', createPumpActivation);
router.get('/pump-activation/config/:irrigation_config_id/active', getActivePumpActivation);
router.get('/pump-activation/config/:irrigation_config_id/latest', getLatestPumpActivationByConfig);
router.put('/pump-activation/:id/status', updatePumpActivationStatus);
router.put('/pump-activation/:id/pause', pausePumpActivation);
router.put('/pump-activation/:id/resume', resumePumpActivation);
router.put('/pump-activation/:id/complete', completePumpActivation);
router.get('/pump-activation/user/:user_id/history', getPumpActivationsByUser);

export default router;
