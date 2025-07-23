import express from 'express';
import {
  // Funciones principales de irrigation config
  createIrrigationConfig,
  getIrrigationConfigById,
  getActiveIrrigationConfigsByUser,
  getIrrigationConfigsByUserAndType,
  activateIrrigationConfig,
  updateLastIrrigation,
  getSpecificConfig,
  deleteIrrigationConfig,
  // Funciones de manual config
  createManualConfig,
  // Funciones de automatic config
  createAutomaticConfig,
  // Funciones de programmed config
  createProgrammedConfig,
  updateNextExecution
} from '../controllers/irrigationConfigController.js';

const router = express.Router();

// Rutas básicas de configuración de riego
router.post('/', createIrrigationConfig);
router.get('/:id', getIrrigationConfigById);
router.delete('/:id', deleteIrrigationConfig);

// Rutas por usuario
router.get('/user/:user_id/active', getActiveIrrigationConfigsByUser);
router.get('/user/:user_id/type/:mode_type', getIrrigationConfigsByUserAndType);

// Rutas de acciones
router.put('/:id/activate', activateIrrigationConfig);
router.put('/:id/update-last-irrigation', updateLastIrrigation);

// Rutas de configuración específica
router.get('/:id/specific-config', getSpecificConfig);

// Rutas para configuraciones manuales
router.post('/manual', createManualConfig);

// Rutas para configuraciones automáticas
router.post('/automatic', createAutomaticConfig);

// Rutas para configuraciones programadas
router.post('/programmed', createProgrammedConfig);
router.put('/programmed/:id/next-execution', updateNextExecution);

export default router;
