# Sistema de Autenticación - Vivantia IoT

## 🔐 Configuración del Sistema de Autenticación

Este proyecto implementa un sistema completo de autenticación con verificación de email obligatoria.

### 📋 Configuración requerida

#### 1. Variables de entorno

Crea un archivo `.env` en la raíz del proyecto con:

```bash
# Frontend
NUXT_PUBLIC_API_URL=http://localhost:3001/api

# Backend
FRONTEND_URL=http://localhost:3000
DATABASE_URL=postgresql://username:password@localhost:5432/vivantia_db
JWT_SECRET=your-jwt-secret-key-here

# Email service
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
```

#### 2. Base de datos

Asegúrate de que tu base de datos PostgreSQL esté corriendo y que las tablas estén creadas con las siguientes columnas en la tabla `users`:

- `emailVerified` (boolean, default: false)
- `verificationToken` (string, nullable)

### 🚀 Flujo de autenticación

1. **Página principal** → Redirige automáticamente a `/auth/login`
2. **Registro** → Usuario se registra → Redirige a `/auth/verify-email`
3. **Verificación** → Usuario hace clic en email → Confirma cuenta
4. **Login** → Usuario inicia sesión → Accede al dashboard

### 🛡️ Middleware implementado

- **`auth.js`** - Protege páginas que requieren autenticación
- **`public.js`** - Para páginas públicas (auth)

### 📄 Páginas protegidas

Todas las siguientes páginas requieren autenticación + verificación:

- `/dashboard`
- `/alertas`
- `/devices`
- `/cultivos/*`
- `/modo/*`

### 📧 Sistema de verificación

- Al registrarse, se envía un email de verificación
- El usuario debe verificar su cuenta antes de poder acceder
- El sistema verifica automáticamente el estado de verificación en cada login

### 🔧 APIs actualizadas

Todas las APIs han sido migradas de axios a $fetch:

- `AuthAPI.js` - Autenticación
- `UserAPI.js` - Gestión de usuarios
- `CropAPI.js` - Cultivos
- `DeviceAPI.js` - Dispositivos IoT
- `AlertAPI.js` - Alertas
- `SensorAPI.js` - Sensores
- `IrrigationAPI.js` - Riego
- `PumpAPI.js` - Bombas

### 🏃‍♂️ Comandos para ejecutar

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Backend (en otra terminal)
cd server
npm install
npm run dev
```

### ⚠️ Notas importantes

- El token JWT se almacena en localStorage
- El sistema redirige automáticamente si no estás autenticado
- Las rutas de autenticación están protegidas contra usuarios ya logueados
- Se requiere verificación de email obligatoria 