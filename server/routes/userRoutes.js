import express from 'express';
import {
  createUser,
  getUserById,
  getUserByEmail,
  getAllUsers,
  updateUser,
  deleteUser,
  getCurrentUserProfile
} from '../controllers/userController.js';

const router = express.Router();

// Rutas básicas CRUD
router.post('/', createUser);
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

// Rutas específicas
router.get('/email/:email', getUserByEmail);
router.get('/profile/current', getCurrentUserProfile);

export default router;
