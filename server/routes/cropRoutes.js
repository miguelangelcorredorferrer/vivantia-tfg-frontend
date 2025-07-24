import express from 'express';
import {
  createCrop,
  getCropById,
  getCropByUserId,
  getAllCrops,
  getSelectedCropByUserId,
  getCropCategories,
  updateCrop,
  selectCrop,
  deselectCrop,
  deleteCrop,
  getCropIrrigationConfigs
} from '../controllers/cropController.js';

const router = express.Router();

// Rutas básicas CRUD
router.post('/', createCrop);
router.get('/', getAllCrops);
router.get('/categories', getCropCategories);
router.get('/:id', getCropById);
router.put('/:id', updateCrop);
router.delete('/:id', deleteCrop);

// Rutas por usuario
router.get('/user/:user_id', getCropByUserId);
router.get('/user/:user_id/selected', getSelectedCropByUserId);

// Rutas de acciones
router.put('/:id/select', selectCrop);
router.put('/:id/deselect', deselectCrop);

// Rutas relacionadas
router.get('/:id/irrigation-configs', getCropIrrigationConfigs);

export default router;
