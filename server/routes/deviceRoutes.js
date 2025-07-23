import express from 'express';
import {
  createDevice,
  getDeviceById,
  getDevicesByUserId,
  getDeviceByEndDeviceId,
  getAllDevices,
  getActiveDevices,
  updateDevice,
  activateDevice,
  deactivateDevice,
  deleteDevice,
  getDeviceSensorReadings,
  getDeviceLatestReading
} from '../controllers/deviceController.js';

const router = express.Router();

// Rutas básicas CRUD
router.post('/', createDevice);
router.get('/', getAllDevices);
router.get('/:id', getDeviceById);
router.put('/:id', updateDevice);
router.delete('/:id', deleteDevice);

// Rutas por usuario
router.get('/user/:user_id', getDevicesByUserId);

// Rutas por filtros
router.get('/active/all', getActiveDevices);
router.get('/enddevice/:enddevice_id', getDeviceByEndDeviceId);

// Rutas de acciones
router.put('/:id/activate', activateDevice);
router.put('/:id/deactivate', deactivateDevice);

// Rutas relacionadas con sensores
router.get('/:id/sensor-readings', getDeviceSensorReadings);
router.get('/:id/latest-reading', getDeviceLatestReading);

export default router;