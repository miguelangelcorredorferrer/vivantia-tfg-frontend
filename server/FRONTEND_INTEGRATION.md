# Integración del Dashboard con Datos Reales

## 🎯 Objetivo
Reemplazar los datos simulados del dashboard con datos reales de los sensores TTN almacenados en la base de datos.

## 📊 Endpoints Disponibles

### 1. Obtener Último Dato (Punto Inicial)
```
GET /api/sensor-readings/dashboard/latest/:device_id
```

**Respuesta:**
```json
{
  "success": true,
  "message": "Último dato obtenido exitosamente",
  "data": {
    "id": 123,
    "device_id": 1,
    "temperature": 22.5,
    "humidity": 65.3,
    "received_at": "2024-01-15T14:30:00Z",
    "changes": {
      "temperature": {
        "value": 1.2,
        "direction": "up",
        "formatted": "+1.2%"
      },
      "humidity": {
        "value": -0.5,
        "direction": "down",
        "formatted": "-0.5%"
      }
    }
  }
}
```

### 2. Obtener Datos Históricos (Evolución)
```
GET /api/sensor-readings/dashboard/history/:device_id?hours=24&limit=100
```

**Parámetros:**
- `hours`: Horas hacia atrás (default: 24)
- `limit`: Límite de registros (default: 100)

**Respuesta:**
```json
{
  "success": true,
  "message": "Datos históricos obtenidos exitosamente",
  "count": 50,
  "data": [
    {
      "id": 100,
      "device_id": 1,
      "temperature": 20.1,
      "humidity": 68.2,
      "received_at": "2024-01-15T10:00:00Z"
    },
    // ... más registros ordenados cronológicamente
  ]
}
```

### 3. Obtener Datos Nuevos (Actualizaciones)
```
GET /api/sensor-readings/dashboard/new/:device_id?since=timestamp
```

## 🔧 Implementación en el Frontend

### Paso 1: Reemplazar Datos Simulados

**Antes (datos simulados):**
```javascript
// Datos simulados
const temperature = 20.7;
const humidity = 70.8;
```

**Después (datos reales):**
```javascript
// Obtener datos reales
const fetchLatestData = async (deviceId) => {
  try {
    const response = await fetch(`/api/sensor-readings/dashboard/latest/${deviceId}`);
    const data = await response.json();
    
    if (data.success) {
      return {
        temperature: data.data.temperature,
        humidity: data.data.humidity,
        changes: data.data.changes
      };
    }
  } catch (error) {
    console.error('Error obteniendo datos:', error);
  }
};
```

### Paso 2: Actualizar Marcadores de Cambio

**Usar los datos de cambios:**
```javascript
// Mostrar cambios porcentuales
const temperatureChange = data.changes.temperature;
const humidityChange = data.changes.humidity;

// Actualizar UI
document.getElementById('temp-change').textContent = temperatureChange.formatted;
document.getElementById('humidity-change').textContent = humidityChange.formatted;

// Aplicar colores según dirección
if (temperatureChange.direction === 'up') {
  // Mostrar flecha hacia arriba y color rojo
} else if (temperatureChange.direction === 'down') {
  // Mostrar flecha hacia abajo y color azul
} else {
  // Mostrar sin cambio
}
```

### Paso 3: Cargar Datos Históricos para Gráficas

```javascript
const fetchHistoricalData = async (deviceId, hours = 24) => {
  try {
    const response = await fetch(`/api/sensor-readings/dashboard/history/${deviceId}?hours=${hours}`);
    const data = await response.json();
    
    if (data.success) {
      // Formatear datos para las gráficas
      const chartData = data.data.map(reading => ({
        x: new Date(reading.received_at),
        y: reading.temperature // o reading.humidity
      }));
      
      // Actualizar gráfica
      updateChart(chartData);
    }
  } catch (error) {
    console.error('Error obteniendo datos históricos:', error);
  }
};
```

### Paso 4: Actualización en Tiempo Real

```javascript
// Función para actualizar datos cada 3 segundos
const updateDashboard = async () => {
  const deviceId = getCurrentDeviceId(); // Obtener ID del dispositivo actual
  
  // Obtener último dato
  const latestData = await fetchLatestData(deviceId);
  updateCurrentValues(latestData);
  
  // Obtener datos nuevos para gráficas
  const lastUpdate = getLastUpdateTime();
  const newData = await fetchNewData(deviceId, lastUpdate);
  updateChartWithNewData(newData);
};

// Ejecutar cada 3 segundos
setInterval(updateDashboard, 3000);
```

## 🎨 Estructura de Datos para Gráficas

### Temperatura
```javascript
const temperatureData = historicalData.map(reading => ({
  x: new Date(reading.received_at),
  y: reading.temperature
}));
```

### Humedad
```javascript
const humidityData = historicalData.map(reading => ({
  x: new Date(reading.received_at),
  y: reading.humidity
}));
```

## 🚀 Pasos de Implementación

1. **Reemplazar datos simulados** con llamadas a `/dashboard/latest/:device_id`
2. **Actualizar marcadores de cambio** usando `data.changes`
3. **Cargar datos históricos** con `/dashboard/history/:device_id`
4. **Implementar actualización automática** cada 3 segundos
5. **Manejar errores** y estados de carga

## 📝 Notas Importantes

- Los datos se ordenan cronológicamente (`received_at ASC`)
- Los cambios porcentuales se calculan entre el último y penúltimo registro
- El formato de fecha es ISO 8601 (`received_at`)
- Los valores pueden ser `null` si no hay datos del sensor 