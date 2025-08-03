import express from 'express';
import {
  // Funciones principales de irrigation config
  createIrrigationConfig,
  getIrrigationConfigById,
  getActiveIrrigationConfigsByUser,
  getIrrigationConfigsByUser,
  getIrrigationConfigsByUserAndType,
  activateIrrigationConfig,
  deactivateIrrigationConfig,
  updateLastIrrigation,
  getLastIrrigationDate,
  getSpecificConfig,
  deleteIrrigationConfig,
  // Funciones de manual config
  updateManualConfig,
  // Funciones de automatic config
  createAutomaticConfig,
  // Funciones de programmed config
  createProgrammedConfig,
  cancelProgrammedConfig,
  cancelProgrammedIrrigation,
  updateNextExecution,
  updateProgrammedExecution
} from '../controllers/irrigationConfigController.js';

import {
  // Funciones de pump activations
  createPumpActivation,
  getActivePumpActivation,
  updatePumpActivationStatus,
  pausePumpActivation,
  resumePumpActivation,
  completePumpActivation,
  getPumpActivationsByUser,
  getLatestPumpActivationByConfig
} from '../controllers/pumpActivationController.js';

const router = express.Router();

/**
 * @swagger
 * /api/irrigation:
 *   post:
 *     summary: Crear configuración de riego
 *     description: Crea una nueva configuración de riego para un usuario
 *     tags: [Riego]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - mode_type
 *               - is_active
 *             properties:
 *               user_id:
 *                 type: integer
 *                 description: ID del usuario propietario
 *               mode_type:
 *                 type: string
 *                 enum: [manual, automatic, programmed]
 *                 description: Tipo de modo de riego
 *               is_active:
 *                 type: boolean
 *                 description: Estado activo de la configuración
 *               description:
 *                 type: string
 *                 description: Descripción de la configuración
 *     responses:
 *       201:
 *         description: Configuración de riego creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/IrrigationConfig'
 *       400:
 *         description: Datos de entrada inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error interno del servidor
 */
router.post('/', createIrrigationConfig);

/**
 * @swagger
 * /api/irrigation/{id}:
 *   get:
 *     summary: Obtener configuración de riego por ID
 *     description: Recupera una configuración de riego específica por su ID
 *     tags: [Riego]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la configuración de riego
 *     responses:
 *       200:
 *         description: Configuración de riego encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/IrrigationConfig'
 *       404:
 *         description: Configuración no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: No autorizado
 *   delete:
 *     summary: Eliminar configuración de riego
 *     description: Elimina una configuración de riego específica
 *     tags: [Riego]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la configuración a eliminar
 *     responses:
 *       200:
 *         description: Configuración eliminada exitosamente
 *       404:
 *         description: Configuración no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: No autorizado
 *       403:
 *         description: No tiene permisos para eliminar esta configuración
 */
router.get('/:id', getIrrigationConfigById);
router.delete('/:id', deleteIrrigationConfig);

/**
 * @swagger
 * /api/irrigation/user/{user_id}/active:
 *   get:
 *     summary: Obtener configuraciones activas por usuario
 *     description: Recupera todas las configuraciones de riego activas de un usuario
 *     tags: [Riego]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Lista de configuraciones activas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/IrrigationConfig'
 *       401:
 *         description: No autorizado
 *       403:
 *         description: No tiene permisos para ver estas configuraciones
 */
router.get('/user/:user_id/active', getActiveIrrigationConfigsByUser);

/**
 * @swagger
 * /api/irrigation/user/{user_id}/all:
 *   get:
 *     summary: Obtener todas las configuraciones por usuario
 *     description: Recupera todas las configuraciones de riego de un usuario
 *     tags: [Riego]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Lista de todas las configuraciones
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/IrrigationConfig'
 *       401:
 *         description: No autorizado
 *       403:
 *         description: No tiene permisos para ver estas configuraciones
 */
router.get('/user/:user_id/all', getIrrigationConfigsByUser);

/**
 * @swagger
 * /api/irrigation/user/{user_id}/type/{mode_type}:
 *   get:
 *     summary: Obtener configuraciones por usuario y tipo
 *     description: Recupera configuraciones de riego de un usuario por tipo de modo
 *     tags: [Riego]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *       - in: path
 *         name: mode_type
 *         required: true
 *         schema:
 *           type: string
 *           enum: [manual, automatic, programmed]
 *         description: Tipo de modo de riego
 *     responses:
 *       200:
 *         description: Lista de configuraciones del tipo especificado
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/IrrigationConfig'
 *       401:
 *         description: No autorizado
 *       403:
 *         description: No tiene permisos para ver estas configuraciones
 */
router.get('/user/:user_id/type/:mode_type', getIrrigationConfigsByUserAndType);

/**
 * @swagger
 * /api/irrigation/user/{user_id}/last-irrigation:
 *   get:
 *     summary: Obtener fecha del último riego
 *     description: Recupera la fecha del último riego realizado por un usuario
 *     tags: [Riego]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Fecha del último riego
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 last_irrigation_date:
 *                   type: string
 *                   format: date-time
 *                   description: Fecha y hora del último riego
 *       401:
 *         description: No autorizado
 *       403:
 *         description: No tiene permisos para ver esta información
 */
router.get('/user/:user_id/last-irrigation', getLastIrrigationDate);

/**
 * @swagger
 * /api/irrigation/{id}/activate:
 *   put:
 *     summary: Activar configuración de riego
 *     description: Activa una configuración de riego específica
 *     tags: [Riego]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la configuración
 *     responses:
 *       200:
 *         description: Configuración activada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/IrrigationConfig'
 *       404:
 *         description: Configuración no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: No autorizado
 *       403:
 *         description: No tiene permisos para activar esta configuración
 */
router.put('/:id/activate', activateIrrigationConfig);

/**
 * @swagger
 * /api/irrigation/{id}/deactivate:
 *   put:
 *     summary: Desactivar configuración de riego
 *     description: Desactiva una configuración de riego específica
 *     tags: [Riego]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la configuración
 *     responses:
 *       200:
 *         description: Configuración desactivada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/IrrigationConfig'
 *       404:
 *         description: Configuración no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: No autorizado
 *       403:
 *         description: No tiene permisos para desactivar esta configuración
 */
router.put('/:id/deactivate', deactivateIrrigationConfig);

/**
 * @swagger
 * /api/irrigation/{id}/update-last-irrigation:
 *   put:
 *     summary: Actualizar fecha del último riego
 *     description: Actualiza la fecha del último riego para una configuración
 *     tags: [Riego]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la configuración
 *     responses:
 *       200:
 *         description: Fecha de último riego actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/IrrigationConfig'
 *       404:
 *         description: Configuración no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: No autorizado
 *       403:
 *         description: No tiene permisos para actualizar esta configuración
 */
router.put('/:id/update-last-irrigation', updateLastIrrigation);

/**
 * @swagger
 * /api/irrigation/{id}/specific-config:
 *   get:
 *     summary: Obtener configuración específica
 *     description: Recupera la configuración específica de una configuración de riego
 *     tags: [Riego]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la configuración
 *     responses:
 *       200:
 *         description: Configuración específica encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 manual_config:
 *                   $ref: '#/components/schemas/ManualConfig'
 *                 automatic_config:
 *                   $ref: '#/components/schemas/AutomaticConfig'
 *                 programmed_config:
 *                   $ref: '#/components/schemas/ProgrammedConfig'
 *       404:
 *         description: Configuración no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: No autorizado
 */
router.get('/:id/specific-config', getSpecificConfig);

/**
 * @swagger
 * /api/irrigation/manual/{id}:
 *   put:
 *     summary: Actualizar configuración manual
 *     description: Actualiza la configuración manual de riego
 *     tags: [Riego]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la configuración manual
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               duration_minutes:
 *                 type: integer
 *                 description: Duración del riego en minutos
 *               intensity:
 *                 type: string
 *                 enum: [low, medium, high]
 *                 description: Intensidad del riego
 *     responses:
 *       200:
 *         description: Configuración manual actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ManualConfig'
 *       404:
 *         description: Configuración no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: No autorizado
 *       400:
 *         description: Datos de entrada inválidos
 */
router.put('/manual/:id', updateManualConfig);

/**
 * @swagger
 * /api/irrigation/automatic:
 *   post:
 *     summary: Crear configuración automática
 *     description: Crea una nueva configuración de riego automático
 *     tags: [Riego]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - irrigation_config_id
 *               - humidity_threshold
 *               - temperature_threshold
 *               - duration_minutes
 *             properties:
 *               irrigation_config_id:
 *                 type: integer
 *                 description: ID de la configuración de riego
 *               humidity_threshold:
 *                 type: number
 *                 description: Umbral de humedad para activar riego
 *               temperature_threshold:
 *                 type: number
 *                 description: Umbral de temperatura para activar riego
 *               duration_minutes:
 *                 type: integer
 *                 description: Duración del riego en minutos
 *               check_interval_minutes:
 *                 type: integer
 *                 description: Intervalo de verificación en minutos
 *     responses:
 *       201:
 *         description: Configuración automática creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AutomaticConfig'
 *       400:
 *         description: Datos de entrada inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: No autorizado
 */
router.post('/automatic', createAutomaticConfig);

/**
 * @swagger
 * /api/irrigation/programmed:
 *   post:
 *     summary: Crear configuración programada
 *     description: Crea una nueva configuración de riego programado
 *     tags: [Riego]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - irrigation_config_id
 *               - start_time
 *               - duration_minutes
 *               - frequency
 *             properties:
 *               irrigation_config_id:
 *                 type: integer
 *                 description: ID de la configuración de riego
 *               start_time:
 *                 type: string
 *                 format: time
 *                 description: Hora de inicio del riego (HH:MM)
 *               duration_minutes:
 *                 type: integer
 *                 description: Duración del riego en minutos
 *               frequency:
 *                 type: string
 *                 enum: [daily, weekly, monthly]
 *                 description: Frecuencia del riego
 *               days_of_week:
 *                 type: array
 *                 items:
 *                   type: integer
 *                   minimum: 0
 *                   maximum: 6
 *                 description: Días de la semana (0=Domingo, 6=Sábado)
 *               day_of_month:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 31
 *                 description: Día del mes para riego mensual
 *     responses:
 *       201:
 *         description: Configuración programada creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProgrammedConfig'
 *       400:
 *         description: Datos de entrada inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: No autorizado
 */
router.post('/programmed', createProgrammedConfig);

/**
 * @swagger
 * /api/irrigation/programmed/{irrigation_config_id}/cancel:
 *   delete:
 *     summary: Cancelar configuración programada
 *     description: Cancela una configuración de riego programado
 *     tags: [Riego]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: irrigation_config_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la configuración de riego
 *     responses:
 *       200:
 *         description: Configuración programada cancelada exitosamente
 *       404:
 *         description: Configuración no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: No autorizado
 *       403:
 *         description: No tiene permisos para cancelar esta configuración
 */
router.delete('/programmed/:irrigation_config_id/cancel', cancelProgrammedConfig);

/**
 * @swagger
 * /api/irrigation/programmed/{irrigation_config_id}/cancel-irrigation:
 *   delete:
 *     summary: Cancelar riego programado
 *     description: Cancela un riego programado específico
 *     tags: [Riego]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: irrigation_config_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la configuración de riego
 *     responses:
 *       200:
 *         description: Riego programado cancelado exitosamente
 *       404:
 *         description: Riego programado no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: No autorizado
 *       403:
 *         description: No tiene permisos para cancelar este riego
 */
router.delete('/programmed/:irrigation_config_id/cancel-irrigation', cancelProgrammedIrrigation);

/**
 * @swagger
 * /api/irrigation/programmed/{id}/next-execution:
 *   put:
 *     summary: Actualizar próxima ejecución
 *     description: Actualiza la próxima fecha de ejecución de un riego programado
 *     tags: [Riego]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la configuración programada
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - next_execution
 *             properties:
 *               next_execution:
 *                 type: string
 *                 format: date-time
 *                 description: Nueva fecha y hora de próxima ejecución
 *     responses:
 *       200:
 *         description: Próxima ejecución actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProgrammedConfig'
 *       404:
 *         description: Configuración no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: No autorizado
 *       400:
 *         description: Datos de entrada inválidos
 */
router.put('/programmed/:id/next-execution', updateNextExecution);

/**
 * @swagger
 * /api/irrigation/programmed/{id}/execution:
 *   put:
 *     summary: Actualizar ejecución programada
 *     description: Actualiza el estado de una ejecución programada
 *     tags: [Riego]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la configuración programada
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - execution_date
 *               - status
 *             properties:
 *               execution_date:
 *                 type: string
 *                 format: date-time
 *                 description: Fecha y hora de ejecución
 *               status:
 *                 type: string
 *                 enum: [pending, completed, cancelled, failed]
 *                 description: Estado de la ejecución
 *     responses:
 *       200:
 *         description: Ejecución programada actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProgrammedConfig'
 *       404:
 *         description: Configuración no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: No autorizado
 *       400:
 *         description: Datos de entrada inválidos
 */
router.put('/programmed/:id/execution', updateProgrammedExecution);

/**
 * @swagger
 * /api/irrigation/pump-activation:
 *   post:
 *     summary: Crear activación de bomba
 *     description: Crea una nueva activación de bomba para riego
 *     tags: [Riego]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - irrigation_config_id
 *               - device_id
 *               - duration_minutes
 *             properties:
 *               irrigation_config_id:
 *                 type: integer
 *                 description: ID de la configuración de riego
 *               device_id:
 *                 type: integer
 *                 description: ID del dispositivo
 *               duration_minutes:
 *                 type: integer
 *                 description: Duración de la activación en minutos
 *               intensity:
 *                 type: string
 *                 enum: [low, medium, high]
 *                 description: Intensidad de la bomba
 *     responses:
 *       201:
 *         description: Activación de bomba creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PumpActivation'
 *       400:
 *         description: Datos de entrada inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: No autorizado
 */
router.post('/pump-activation', createPumpActivation);

/**
 * @swagger
 * /api/irrigation/pump-activation/config/{irrigation_config_id}/active:
 *   get:
 *     summary: Obtener activación activa de bomba
 *     description: Recupera la activación de bomba activa para una configuración
 *     tags: [Riego]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: irrigation_config_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la configuración de riego
 *     responses:
 *       200:
 *         description: Activación de bomba activa encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PumpActivation'
 *       404:
 *         description: No hay activación activa
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: No autorizado
 */
router.get('/pump-activation/config/:irrigation_config_id/active', getActivePumpActivation);

/**
 * @swagger
 * /api/irrigation/pump-activation/config/{irrigation_config_id}/latest:
 *   get:
 *     summary: Obtener última activación de bomba
 *     description: Recupera la última activación de bomba para una configuración
 *     tags: [Riego]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: irrigation_config_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la configuración de riego
 *     responses:
 *       200:
 *         description: Última activación de bomba encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PumpActivation'
 *       404:
 *         description: No hay activaciones previas
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: No autorizado
 */
router.get('/pump-activation/config/:irrigation_config_id/latest', getLatestPumpActivationByConfig);

/**
 * @swagger
 * /api/irrigation/pump-activation/{id}/status:
 *   put:
 *     summary: Actualizar estado de activación de bomba
 *     description: Actualiza el estado de una activación de bomba
 *     tags: [Riego]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la activación de bomba
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [active, paused, completed, cancelled, failed]
 *                 description: Nuevo estado de la activación
 *     responses:
 *       200:
 *         description: Estado actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PumpActivation'
 *       404:
 *         description: Activación no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: No autorizado
 *       400:
 *         description: Datos de entrada inválidos
 */
router.put('/pump-activation/:id/status', updatePumpActivationStatus);

/**
 * @swagger
 * /api/irrigation/pump-activation/{id}/pause:
 *   put:
 *     summary: Pausar activación de bomba
 *     description: Pausa una activación de bomba en curso
 *     tags: [Riego]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la activación de bomba
 *     responses:
 *       200:
 *         description: Activación pausada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PumpActivation'
 *       404:
 *         description: Activación no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: No autorizado
 *       400:
 *         description: No se puede pausar esta activación
 */
router.put('/pump-activation/:id/pause', pausePumpActivation);

/**
 * @swagger
 * /api/irrigation/pump-activation/{id}/resume:
 *   put:
 *     summary: Reanudar activación de bomba
 *     description: Reanuda una activación de bomba pausada
 *     tags: [Riego]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la activación de bomba
 *     responses:
 *       200:
 *         description: Activación reanudada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PumpActivation'
 *       404:
 *         description: Activación no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: No autorizado
 *       400:
 *         description: No se puede reanudar esta activación
 */
router.put('/pump-activation/:id/resume', resumePumpActivation);

/**
 * @swagger
 * /api/irrigation/pump-activation/{id}/complete:
 *   put:
 *     summary: Completar activación de bomba
 *     description: Marca una activación de bomba como completada
 *     tags: [Riego]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la activación de bomba
 *     responses:
 *       200:
 *         description: Activación completada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PumpActivation'
 *       404:
 *         description: Activación no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: No autorizado
 *       400:
 *         description: No se puede completar esta activación
 */
router.put('/pump-activation/:id/complete', completePumpActivation);

/**
 * @swagger
 * /api/irrigation/pump-activation/user/{user_id}/history:
 *   get:
 *     summary: Obtener historial de activaciones por usuario
 *     description: Recupera el historial de activaciones de bomba de un usuario
 *     tags: [Riego]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 50
 *         description: Número máximo de activaciones a retornar
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           default: 0
 *         description: Número de activaciones a omitir
 *     responses:
 *       200:
 *         description: Historial de activaciones
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 activations:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/PumpActivation'
 *                 total:
 *                   type: integer
 *                   description: Total de activaciones
 *       401:
 *         description: No autorizado
 *       403:
 *         description: No tiene permisos para ver este historial
 */
router.get('/pump-activation/user/:user_id/history', getPumpActivationsByUser);

export default router;
