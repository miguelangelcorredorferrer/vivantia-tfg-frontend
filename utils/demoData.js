// Datos de demostración para el modo visitante
export const demoData = {
  user: {
    id: 'demo-user',
    name: 'Usuario Demo',
    email: 'demo@vivantia.com',
    role: 'visitante',
    verified: false,
    isDemo: true
  },
  
  device: {
    id: 'demo-device-1',
    deviceName: 'Arduino IoT Demo',
    enddeviceId: 'DEMO001',
    appEui: '1234567890ABCDEF',
    devEui: 'FEDCBA0987654321',
    appKey: '1234567890ABCDEF1234567890ABCDEF',
    isActiveCommunication: true,
    ttnRegion: 'eu1',
    ttnAppId: 'demo-vivantia-app',
    ttnAccessKey: 'DEMO_ACCESS_KEY_1234567890',
    createdAt: '2024-01-15T10:30:00Z'
  },
  
  crop: {
    id: 'demo-crop-1',
    name: 'Tomates Cherry Demo',
    description: 'Cultivo de demostración para el sistema de riego automático',
    category: 'Hortalizas',
    growth_days: 75,
    humidity_min: 40,
    humidity_max: 80,
    temperature_max: 28,
    session: 'Primavera',
    selected: true,
    createdAt: '2024-01-10T08:00:00Z'
  },
  
  sensorData: {
    current: {
      humidity: 68.3,
      temperature: 19.5,
      timestamp: new Date().toISOString()
    },
    
    // Datos históricos para gráficas
    history: generateDemoHistory()
  }
}

function generateDemoHistory() {
  const data = []
  const now = new Date()
  
  // Generar datos para el rango de tiempo mostrado en la imagen (01:14:09 a 01:30:09)
  // Aproximadamente 16 minutos de datos
  for (let i = 0; i < 32; i++) {
    const minutes = 14 + Math.floor(i / 2) // Desde 14 hasta 30 minutos
    const seconds = (i % 2) * 30 // 0 o 30 segundos
    const timestamp = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 1, minutes, seconds)
    
    // Simular los datos exactos de la imagen
    // Temperatura: fluctuando entre 18°C y 22°C, con tendencia hacia 19.5°C
    const baseTemperature = 19.5
    const temperatureVariation = Math.sin(i * 0.2) * 2 + Math.random() * 1 - 0.5
    const temperature = Math.max(18, Math.min(22, baseTemperature + temperatureVariation))
    
    // Humedad: fluctuando entre 65% y 72%, con tendencia hacia 68.3%
    const baseHumidity = 68.3
    const humidityVariation = Math.sin(i * 0.3) * 3 + Math.random() * 1 - 0.5
    const humidity = Math.max(65, Math.min(72, baseHumidity + humidityVariation))
    
    data.push({
      time: timestamp.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      humidity: parseFloat(humidity.toFixed(1)),
      temperature: parseFloat(temperature.toFixed(1))
    })
  }
  
  return data
}

// Función para obtener datos simulados actuales
export function getSimulatedReading() {
  // Usar los valores exactos de la imagen
  const baseHumidity = 68.3
  const baseTemperature = 19.5
  const variation = 0.5
  
  return {
    humidity: baseHumidity + (Math.random() - 0.5) * variation,
    temperature: baseTemperature + (Math.random() - 0.5) * variation,
    timestamp: new Date().toISOString()
  }
} 