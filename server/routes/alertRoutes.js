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
  deleteMyOldAlerts,
  getAlertCountByType,
  getAlertCountBySeverity,
  createHumidityThresholdAlert,
  createIrrigationStartedAlert,
  getMyAlerts,
  getAllAlertsWithUsers,
  deleteAllSystemAlerts
} from '../controllers/alertController.js';
import { createUserRegisteredAlert } from '../services/authAlertService.js';
import { createApiKeyCopiedAlert } from '../services/deviceAlertService.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Aplicar middleware de autenticación a todas las rutas
router.use(authMiddleware);

// Rutas básicas CRUD
router.post('/', createAlert);
router.get('/my-alerts', getMyAlerts); // Nueva ruta para obtener alertas del usuario autenticado
router.delete('/old', deleteMyOldAlerts); // Ruta específica antes de la genérica
router.get('/:id', getAlertById);
router.delete('/:id', deleteAlert);

// Rutas por usuario (solo para administradores o el propio usuario)
router.get('/user/:user_id', getAlertsByUserId);
router.get('/user/:user_id/unresolved', getUnresolvedAlertsByUserId);
router.put('/user/:user_id/resolve-all', resolveAllAlertsByUserId);
router.delete('/user/:user_id/old', deleteOldAlerts);

// Rutas por filtros (del usuario autenticado)
router.get('/type/:alert_type', getAlertsByType);
router.get('/severity/:severity', getAlertsBySeverity);

// Rutas de acciones
router.put('/:id/resolve', resolveAlert);
router.put('/:id/unresolve', unresolveAlert);
router.put('/resolve-all', resolveAllAlertsByUserId);

// Rutas de estadísticas (del usuario autenticado)
router.get('/stats/type', getAlertCountByType);
router.get('/stats/severity', getAlertCountBySeverity);

// Rutas para administrador
router.get('/admin/all', getAllAlertsWithUsers);
router.delete('/admin/all', deleteAllSystemAlerts);

// Rutas para crear alertas específicas (uso interno)
router.post('/user-registered', createUserRegisteredAlert);
router.post('/humidity-threshold', createHumidityThresholdAlert);
router.post('/irrigation-started', createIrrigationStartedAlert);

// Crear alerta de clave API copiada (desde frontend)
router.post('/device/api-key-copied', async (req, res) => {
  try {
    const { user } = req;
    if (!user?.id) {
      return res.status(401).json({ success: false, message: 'No autenticado' })
    }
    const alert = await createApiKeyCopiedAlert(user.id)
    return res.status(201).json({ success: true, data: alert })
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error al crear alerta de clave API copiada', error: error.message })
  }
});

export default router;
