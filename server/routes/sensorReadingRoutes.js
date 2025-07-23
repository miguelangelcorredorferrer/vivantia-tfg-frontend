import express from 'express';
import {
  createSensorReading,
  getSensorReadingById,
  getSensorReadingsByDeviceId,
  getSensorReadingsByDateRange,
  getLatestSensorReadingByDeviceId,
  getAverageSensorReadingsByPeriod,
  getHourlyAverageSensorReadings,
  getSensorReadingsOutOfThreshold,
  deleteOldSensorReadings,
  getDeviceSensorStats,
  updateSensorReading,
  deleteSensorReading
} from '../controllers/sensorReadingController.js';

const router = express.Router();

// Rutas básicas CRUD
router.post('/', createSensorReading);
router.get('/:id', getSensorReadingById);
router.put('/:id', updateSensorReading);
router.delete('/:id', deleteSensorReading);

// Rutas por dispositivo
router.get('/device/:device_id', getSensorReadingsByDeviceId);
router.get('/device/:device_id/latest', getLatestSensorReadingByDeviceId);
router.get('/device/:device_id/stats', getDeviceSensorStats);

// Rutas por filtros y rangos
router.get('/date-range/:start_date/:end_date', getSensorReadingsByDateRange);
router.get('/threshold/out-of-range', getSensorReadingsOutOfThreshold);

// Rutas de estadísticas
router.get('/stats/average/:period', getAverageSensorReadingsByPeriod);
router.get('/stats/hourly-average', getHourlyAverageSensorReadings);

// Rutas de mantenimiento
router.delete('/maintenance/old-readings', deleteOldSensorReadings);

export default router;
