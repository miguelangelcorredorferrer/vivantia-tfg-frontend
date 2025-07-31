import express from 'express';
import {
  // Funciones principales de irrigation config
  createIrrigationConfig,
  getIrrigationConfigById,
  getActiveIrrigationConfigsByUser,
  getIrrigationConfigsByUserAndType,
  activateIrrigationConfig,
  deactivateIrrigationConfig,
  updateLastIrrigation,
  getLastIrrigationDate,
  getSpecificConfig,
  deleteIrrigationConfig,
  // Funciones de manual config
  createManualConfig,
  updateManualConfig,
  // Funciones de automatic config
  createAutomaticConfig,
  // Funciones de programmed config
  createProgrammedConfig,
  updateNextExecution
} from '../controllers/irrigationConfigController.js';

import {
  // Funciones de pump activations
  createPumpActivation,
  getActivePumpActivation,
  updatePumpActivationStatus,
  pausePumpActivation,
  resumePumpActivation,
  completePumpActivation,
  getPumpActivationsByUser
} from '../controllers/pumpActivationController.js';

const router = express.Router();

// Rutas básicas de configuración de riego
router.post('/', createIrrigationConfig);
router.get('/:id', getIrrigationConfigById);
router.delete('/:id', deleteIrrigationConfig);

// Rutas por usuario
router.get('/user/:user_id/active', getActiveIrrigationConfigsByUser);
router.get('/user/:user_id/type/:mode_type', getIrrigationConfigsByUserAndType);
router.get('/user/:user_id/last-irrigation', getLastIrrigationDate);

// Rutas de acciones
router.put('/:id/activate', activateIrrigationConfig);
router.put('/:id/deactivate', deactivateIrrigationConfig);
router.put('/:id/update-last-irrigation', updateLastIrrigation);

// Rutas de configuración específica
router.get('/:id/specific-config', getSpecificConfig);

// Rutas para configuraciones manuales
router.post('/manual', createManualConfig);
router.put('/manual/:id', updateManualConfig);

// Rutas para configuraciones automáticas
router.post('/automatic', createAutomaticConfig);

// Rutas para configuraciones programadas
router.post('/programmed', createProgrammedConfig);
router.put('/programmed/:id/next-execution', updateNextExecution);

// Rutas para activaciones de bomba
router.post('/pump-activation', createPumpActivation);
router.get('/pump-activation/config/:irrigation_config_id/active', getActivePumpActivation);
router.put('/pump-activation/:id/status', updatePumpActivationStatus);
router.put('/pump-activation/:id/pause', pausePumpActivation);
router.put('/pump-activation/:id/resume', resumePumpActivation);
router.put('/pump-activation/:id/complete', completePumpActivation);
router.get('/pump-activation/user/:user_id/history', getPumpActivationsByUser);

export default router;
