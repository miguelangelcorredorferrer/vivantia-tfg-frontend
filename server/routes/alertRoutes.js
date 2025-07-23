import express from 'express';
import {
  createAlert,
  getAlertById,
  getAlertsByUserId,
  getUnresolvedAlertsByUserId,
  getAlertsByType,
  getAlertsBySeverity,
  resolveAlert,
  unresolveAlert,
  resolveAllAlertsByUserId,
  deleteAlert,
  deleteOldAlerts,
  getAlertCountByType,
  getAlertCountBySeverity,
  createUserRegisteredAlert,
  createDeviceOfflineAlert,
  createHumidityThresholdAlert,
  createIrrigationStartedAlert
} from '../controllers/alertController.js';

const router = express.Router();

// Rutas básicas CRUD
router.post('/', createAlert);
router.get('/:id', getAlertById);
router.delete('/:id', deleteAlert);

// Rutas por usuario
router.get('/user/:user_id', getAlertsByUserId);
router.get('/user/:user_id/unresolved', getUnresolvedAlertsByUserId);
router.put('/user/:user_id/resolve-all', resolveAllAlertsByUserId);
router.delete('/user/:user_id/old', deleteOldAlerts);

// Rutas por filtros
router.get('/type/:alert_type', getAlertsByType);
router.get('/severity/:severity', getAlertsBySeverity);

// Rutas de acciones
router.put('/:id/resolve', resolveAlert);
router.put('/:id/unresolve', unresolveAlert);

// Rutas de estadísticas
router.get('/stats/type', getAlertCountByType);
router.get('/stats/severity', getAlertCountBySeverity);

// Rutas para crear alertas específicas
router.post('/user-registered', createUserRegisteredAlert);
router.post('/device-offline', createDeviceOfflineAlert);
router.post('/humidity-threshold', createHumidityThresholdAlert);
router.post('/irrigation-started', createIrrigationStartedAlert);

export default router;
