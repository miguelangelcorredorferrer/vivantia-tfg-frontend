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
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Rutas básicas CRUD (protegidas para admin)
router.post('/', authMiddleware, createUser);
router.get('/', authMiddleware, getAllUsers);
router.get('/:id', authMiddleware, getUserById);
router.put('/:id', authMiddleware, updateUser);
router.delete('/:id', authMiddleware, deleteUser);

// Rutas específicas
router.get('/email/:email', authMiddleware, getUserByEmail);
router.get('/profile/current', authMiddleware, getCurrentUserProfile);

export default router;
