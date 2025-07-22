// En las rutas
import { hashPassword, hashPasswordIfModified } from '../middleware/passwordMiddleware.js';
import { register, login, changePassword } from '../controllers/authController.js';

// Registro (cifra contraseña)
app.post('/auth/register', hashPassword, register);

// Cambio de contraseña (cifra solo si cambió)
app.put('/auth/change-password/:id', hashPasswordIfModified, changePassword);

// Login (no necesita middleware de cifrado)
app.post('/auth/login', login);