# Sistema de Iconos Centralizados

Este directorio contiene todos los iconos SVG utilizados en la aplicación VIVANTIA, centralizados para evitar duplicación de código y facilitar el mantenimiento.

## Estructura

- `index.js` - Archivo principal que exporta todas las funciones de iconos

## Iconos Disponibles

### Navegación
- `dashboardIcon()` - Gráfico de barras para dashboard
- `devicesIcon()` - Microcontrolador IoT para devices
- `plantIcon()` - Planta en maceta para cultivos
- `analyticsIcon()` - Gráfico de barras para analytics
- `settingsIcon()` - Engranaje para configuración
- `homeIcon()` - Casa para breadcrumb

### Sensores (Dashboard)
- `thermometerIcon()` - Termómetro para temperatura
- `humidityIcon()` - Gota de agua para humedad

### Stats Cards
- `devicesStatsIcon()` - Monitor/dispositivo para stats de devices
- `temperatureStatsIcon()` - Termómetro para stats de temperatura
- `energyIcon()` - Rayo para stats de energía
- `alertsIcon()` - Triángulo de alerta para notificaciones

## Uso

### Importación individual:
```javascript
import { dashboardIcon, thermometerIcon, energyIcon } from '~/assets/icons'
```

### Uso con función helper:
```javascript
import { getIcon } from '~/assets/icons'

const iconComponent = getIcon('energy')
```

### En template:
```vue
<component :is="thermometerIcon" />
```

### Para StatsCard:
```vue
<!-- Usar con nombre de icono -->
<StatsCard 
  icon="devicesStats" 
  title="Dispositivos"
  value="12"
  color="bg-blue-500"
  trend="+5%"
/>
```

## Ventajas

- ✅ **Sin duplicación**: Un solo lugar para cada icono
- ✅ **Fácil mantenimiento**: Cambios centralizados
- ✅ **Mejor rendimiento**: Reutilización de componentes
- ✅ **Consistencia**: Mismos iconos en toda la app
- ✅ **Escalabilidad**: Fácil agregar nuevos iconos

## Agregar nuevos iconos

1. Agregar función del icono en `index.js`
2. Exportarla individualmente
3. Añadirla al objeto `icons` en `getIcon()`
4. Documentar en este README

## Archivos SVG fuente

Los iconos se basan en archivos SVG de la carpeta `/static/`:
- `plant.svg` → `plantIcon()`
- `thermometer.svg` → `thermometerIcon()`
- `humidity.svg` → `humidityIcon()`
- `device.svg` → `devicesIcon()`
- `stats.svg` → `dashboardIcon()` 