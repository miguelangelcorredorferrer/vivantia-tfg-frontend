import User from '../models/User.js';
import { findUserByEmail, findUserById } from './userController.js';
import { handleNotFoundError, handleBadRequestError, handleInternalServerError, handleSuccessResponse } from '../utils/index.js';
// import { sendEmailVerification, sendEmailPasswordReset } from '../emails/authEmailService.js';
// import { generateJWT, uniqueId } from '../utils/index.js';

const register = async (req, res) => {
    try {
        // Valida todos los campos
        if(Object.values(req.body).includes('')) {
            return handleBadRequestError('Todos los campos son obligatorios', res);
        }

        const { email, password, name } = req.body;

        // Evitar registros duplicados
        const userExists = await findUserByEmail(email);
        if(userExists) {
            return handleBadRequestError('Usuario ya registrado', res);
        }

        // Validar la extensión del password
        const MIN_PASSWORD_LENGTH = 8;
        if(password.trim().length < MIN_PASSWORD_LENGTH) {
            return handleBadRequestError(`El password debe contener ${MIN_PASSWORD_LENGTH} caracteres`, res);
        }

        // El middleware hashPassword ya cifró la contraseña
        const query = `
            INSERT INTO users (email, password, name, role)
            VALUES ($1, $2, $3, $4)
            RETURNING id, email, name, role, created_at
        `;
        
        const { pool } = await import('../config/db.js');
        const result = await pool.query(query, [email, password, name, 'visitante']);
        const newUser = new User(result.rows[0]);

        // TODO: Implementar envío de email
        // const token = uniqueId();
        // sendEmailVerification({ name, email, token });

        return handleSuccessResponse(res, newUser.toJSON(), 'El usuario se creó correctamente, revisa tu email', 201);
    } catch (error) {
        return handleInternalServerError('Error al registrar usuario', res, error);
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validar campos requeridos
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                msg: 'Email y contraseña son obligatorios'
            });
        }

        // Revisar que el usuario exista
        const user = await findUserByEmail(email);
        if(!user) {
            const error = new Error('El Usuario no existe');
            return res.status(401).json({
                success: false,
                msg: error.message
            });
        }

        // TODO: Implementar verificación de cuenta
        // if(!user.verified) {
        //     const error = new Error('Tu cuenta no ha sido confirmada aún');
        //     return res.status(401).json({
        //         success: false,
        //         msg: error.message
        //     });
        // }

        // Comprobar el password
        const isValidPassword = await user.checkPassword(password);
        if(isValidPassword) {
            // TODO: Implementar JWT
            // const token = generateJWT(user.id);
            res.status(200).json({
                success: true,
                message: 'Autenticación exitosa',
                data: user.toJSON()
                // token
            });
        } else {
            const error = new Error('El password es incorrecto');
            return res.status(401).json({
                success: false,
                msg: error.message
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error en la autenticación',
            error: error.message
        });
    }
};

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                msg: 'El email es obligatorio'
            });
        }

        // Revisar que el usuario exista
        const user = await findUserByEmail(email);
        if(!user) {
            const error = new Error('El Usuario no existe');
            return res.status(404).json({
                success: false,
                msg: error.message
            });
        }

        try {
            // TODO: Implementar token de reset y envío de email
            // const token = uniqueId();
            // user.token = token;
            // await user.save();
            // sendEmailPasswordReset({ name: user.name, email, token });

            res.json({
                success: true,
                msg: 'Hemos enviado un email con las instrucciones'
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                msg: 'Error al procesar solicitud'
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al procesar solicitud de reset',
            error: error.message
        });
    }
};

const verifyPasswordResetToken = async (req, res) => {
    try {
        const { token } = req.params;

        // TODO: Implementar verificación de token
        // const isValidToken = await User.findOne({token});
        
        // if(!isValidToken) {
        //     const error = new Error('Hubo un error, Token no válido');
        //     return res.status(400).json({
        //         success: false,
        //         msg: error.message
        //     });
        // }

        res.json({
            success: true,
            msg: 'Token Válido'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al verificar token',
            error: error.message
        });
    }
};

const updatePassword = async (req, res) => {
    try {
        const { token } = req.params;
        
        // TODO: Implementar búsqueda por token
        // const user = await User.findOne({token});
        // if(!user) {
        //     const error = new Error('Hubo un error, Token no válido');
        //     return res.status(400).json({
        //         success: false,
        //         msg: error.message
        //     });
        // }

        const { password } = req.body;

        // Validar password
        const MIN_PASSWORD_LENGTH = 8;
        if(password.trim().length < MIN_PASSWORD_LENGTH) {
            const error = new Error(`El password debe contener ${MIN_PASSWORD_LENGTH} caracteres`);
            return res.status(400).json({
                success: false,
                msg: error.message
            });
        }
        
        try {
            // TODO: Implementar actualización de password con token
            // user.token = '';
            // user.password = password;
            // await user.save();
            
            res.json({
                success: true,
                msg: 'Password modificado correctamente'
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                msg: 'Error al actualizar password'
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al actualizar password',
            error: error.message
        });
    }
};

const changePassword = async (req, res) => {
    try {
        const { id } = req.params;
        const { currentPassword, newPassword } = req.body;

        // Validar campos
        if (!currentPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                msg: 'Contraseña actual y nueva son obligatorias'
            });
        }

        // Validar longitud de nueva contraseña
        const MIN_PASSWORD_LENGTH = 8;
        if(newPassword.trim().length < MIN_PASSWORD_LENGTH) {
            const error = new Error(`El password debe contener ${MIN_PASSWORD_LENGTH} caracteres`);
            return res.status(400).json({
                success: false,
                msg: error.message
            });
        }

        // Verificar si el usuario existe
        const user = await findUserById(id);
        if (!user) {
            return res.status(404).json({
                success: false,
                msg: 'Usuario no encontrado'
            });
        }

        // Verificar contraseña actual
        const isValidPassword = await user.checkPassword(currentPassword);
        if (!isValidPassword) {
            return res.status(401).json({
                success: false,
                msg: 'Contraseña actual incorrecta'
            });
        }

        // Actualizar contraseña (el middleware hashPasswordIfModified la cifrará)
        const { pool } = await import('../config/db.js');
        const query = 'UPDATE users SET password = $1 WHERE id = $2 RETURNING id, email, name, role, created_at';
        const result = await pool.query(query, [newPassword, id]);

        const updatedUser = new User(result.rows[0]);

        res.status(200).json({
            success: true,
            msg: 'Contraseña cambiada exitosamente',
            data: updatedUser.toJSON()
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al cambiar contraseña',
            error: error.message
        });
    }
};

const user = async (req, res) => {
    try {
        // El usuario viene del middleware de autenticación
        const { user } = req;
        
        if (!user) {
            return res.status(401).json({
                success: false,
                msg: 'No autorizado'
            });
        }

        res.json({
            success: true,
            data: user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener perfil de usuario',
            error: error.message
        });
    }
};

const admin = async (req, res) => {
    try {
        const { user } = req;
        
        if (!user) {
            return res.status(401).json({
                success: false,
                msg: 'No autorizado'
            });
        }

        // Verificar si el usuario es admin
        if(user.role !== 'admin') {
            const error = new Error('Acción no válida');
            return res.status(403).json({
                success: false,
                msg: error.message
            });
        }

        res.json({
            success: true,
            data: user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al verificar permisos de admin',
            error: error.message
        });
    }
};

// Verificar cuenta (para futuro uso)
const verifyAccount = async (req, res) => {
    try {
        const { token } = req.params;

        // TODO: Implementar verificación de cuenta
        // const user = await User.findOne({ token });
        // if (!user) {
        //     return res.status(400).json({
        //         success: false,
        //         msg: 'Token no válido'
        //     });
        // }

        // user.verified = true;
        // user.token = '';
        // await user.save();

        res.json({
            success: true,
            msg: 'Cuenta verificada correctamente'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al verificar cuenta',
            error: error.message
        });
    }
};

export {
    register,
    login,
    forgotPassword,
    verifyPasswordResetToken,
    updatePassword,
    changePassword,
    user,
    admin,
    verifyAccount
};
