<script setup>
import { useSensorData } from '~/composables/useSensorData.js'
import { useCropStore } from '~/stores/crop'
import { useDeviceStore } from '~/stores/device'
import { useUserStore } from '~/stores/user'
import { useIrrigationStore } from '~/stores/irrigation'
import { thermometerIcon, humidityIcon } from '~/assets/icons'
import WorkingTemperatureChart from '~/components/Charts/WorkingTemperatureChart.vue'
import WorkingHumidityChart from '~/components/Charts/WorkingHumidityChart.vue'
import WorkingAirHumidityChart from '~/components/Charts/WorkingAirHumidityChart.vue'
import { demoData } from '~/utils/demoData'
import {
  DemoBanner,
  SensorCard,
  InfoCard,
  SystemInfoPanel
} from '~/components/Dashboard'

// Configurar middleware de autenticación y redirección para admins
definePageMeta({
  middleware: ['auth', 'admin-redirect']
})

// Obtener stores
const cropStore = useCropStore()
const deviceStore = useDeviceStore()
const userStore = useUserStore()
const irrigationStore = useIrrigationStore()

// Estados para datos demo
const demoCurrentReading = ref(null)
const demoInterval = ref(null)
const demoDataPoints = ref([])
const maxDemoDataPoints = 20

// Función para generar datos demo progresivamente
const generateDemoDataPoint = () => {
  const now = new Date()
  const timeLabel = now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
  
  // Obtener el último punto de datos para generar variaciones más realistas
  let baseTemperature = 19.5
  let baseSoilHumidity = 68.3
  let baseAirHumidity = 75.0
  
  if (demoDataPoints.value.length > 0) {
    const lastPoint = demoDataPoints.value[demoDataPoints.value.length - 1]
    baseTemperature = lastPoint.temperature
    baseSoilHumidity = lastPoint.soilHumidity
    baseAirHumidity = lastPoint.airHumidity
  }
  
  // Generar variaciones más pequeñas y realistas para cambios graduales
  const temperatureVariation = (Math.random() - 0.5) * 0.8 // Variación más pequeña
  const soilHumidityVariation = (Math.random() - 0.5) * 1.2 // Variación más pequeña
  const airHumidityVariation = (Math.random() - 0.5) * 1.5 // Variación más pequeña
  
  const temperature = Math.max(18, Math.min(22, baseTemperature + temperatureVariation))
  const soilHumidity = Math.max(65, Math.min(72, baseSoilHumidity + soilHumidityVariation))
  const airHumidity = Math.max(70, Math.min(80, baseAirHumidity + airHumidityVariation))
  
  const newPoint = {
    time: timeLabel,
    temperature: parseFloat(temperature.toFixed(1)),
    soilHumidity: parseFloat(soilHumidity.toFixed(1)),
    airHumidity: parseFloat(airHumidity.toFixed(1))
  }
  
  // Añadir nuevo punto
  demoDataPoints.value.push(newPoint)
  
  // Mantener solo los últimos N puntos
  if (demoDataPoints.value.length > maxDemoDataPoints) {
    demoDataPoints.value.shift()
  }
  
  // Actualizar lectura actual
  demoCurrentReading.value = {
    temperature: newPoint.temperature,
    soilHumidity: newPoint.soilHumidity,
    airHumidity: newPoint.airHumidity,
    timestamp: now.toISOString()
  }
  
  console.log('🎭 Demo data point added:', newPoint)
  
  // Log de tendencias para debugging
  if (demoDataPoints.value.length >= 2) {
    const last = demoDataPoints.value[demoDataPoints.value.length - 1]
    const previous = demoDataPoints.value[demoDataPoints.value.length - 2]
    
    const tempChange = last.temperature - previous.temperature
    const soilChange = last.soilHumidity - previous.soilHumidity
    const airChange = last.airHumidity - previous.airHumidity
    
    console.log('📊 Demo trends calculation:', {
      temperature: `${previous.temperature} → ${last.temperature} (change: ${tempChange.toFixed(1)}°C)`,
      soilHumidity: `${previous.soilHumidity} → ${last.soilHumidity} (change: ${soilChange.toFixed(1)}%)`,
      airHumidity: `${previous.airHumidity} → ${last.airHumidity} (change: ${airChange.toFixed(1)}%)`
    })
  }
}

// Función para simular datos en tiempo real en modo demo
const startDemoSimulation = () => {
  if (userStore.isDemoMode) {
    console.log('🎭 Starting demo simulation...')
    
    // Generar algunos datos iniciales rápidamente
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        generateDemoDataPoint()
      }, i * 300)
    }
    
    // Actualizar cada 3 segundos
    demoInterval.value = setInterval(() => {
      generateDemoDataPoint()
    }, 3000)
  }
}

const stopDemoSimulation = () => {
  if (demoInterval.value) {
    clearInterval(demoInterval.value)
    demoInterval.value = null
  }
}

// Obtener datos de sensores con nuevo soporte de humedad dual
const sensorDataComposable = useSensorData()
const {
  temperatureData: realTemperatureData,
  soilHumidityData: realSoilHumidityData,
  airHumidityData: realAirHumidityData,
  currentTemperature: realCurrentTemperature,
  currentSoilHumidity: realCurrentSoilHumidity,
  currentAirHumidity: realCurrentAirHumidity,
  temperatureTrend: realTemperatureTrend,
  soilHumidityTrend: realSoilHumidityTrend,
  airHumidityTrend: realAirHumidityTrend,
  cropThresholds: realCropThresholds,
  formattedTemperature: realFormattedTemperature,
  formattedSoilHumidity: realFormattedSoilHumidity,
  formattedAirHumidity: realFormattedAirHumidity
} = sensorDataComposable

// Datos computados que cambian según el modo
const temperatureData = computed(() => {
  if (userStore.isDemoMode) {
    // En modo demo, usar datos demo directamente
    const demoHistory = demoDataPoints.value
    return {
      labels: demoHistory.map(item => item.time),
      datasets: [
        {
          label: 'Temperatura (°C)',
          data: demoHistory.map(item => item.temperature),
          borderColor: '#ef4444',
          backgroundColor: 'transparent',
          borderWidth: 3,
          tension: 0.6,
          fill: false,
          pointBackgroundColor: '#ef4444',
          pointBorderColor: '#ffffff',
          pointBorderWidth: 3,
          pointRadius: 5,
          pointHoverRadius: 8
        }
      ]
    }
  }
  return realTemperatureData.value
})

const soilHumidityData = computed(() => {
  if (userStore.isDemoMode) {
    const demoHistory = demoDataPoints.value
    return {
      labels: demoHistory.map(item => item.time),
      datasets: [
        {
          label: 'Humedad del Suelo (%)',
          data: demoHistory.map(item => item.soilHumidity),
          borderColor: '#3b82f6',
          backgroundColor: 'transparent',
          borderWidth: 3,
          tension: 0.6,
          fill: false,
          pointBackgroundColor: '#3b82f6',
          pointBorderColor: '#ffffff',
          pointBorderWidth: 3,
          pointRadius: 5,
          pointHoverRadius: 8
        }
      ]
    }
  }
  return realSoilHumidityData.value
})

const airHumidityData = computed(() => {
  if (userStore.isDemoMode) {
    const demoHistory = demoDataPoints.value
    return {
      labels: demoHistory.map(item => item.time),
      datasets: [
        {
          label: 'Humedad Ambiental (%)',
          data: demoHistory.map(item => item.airHumidity),
          borderColor: '#22d3ee',
          backgroundColor: 'transparent',
          borderWidth: 3,
          tension: 0.6,
          fill: false,
          pointBackgroundColor: '#22d3ee',
          pointBorderColor: '#ffffff',
          pointBorderWidth: 3,
          pointRadius: 5,
          pointHoverRadius: 8
        }
      ]
    }
  }
  return realAirHumidityData.value
})

const currentTemperature = computed(() => {
  if (userStore.isDemoMode) {
    return demoCurrentReading.value?.temperature || demoDataPoints.value[demoDataPoints.value.length - 1]?.temperature || demoData.sensorData.current.temperature
  }
  return realCurrentTemperature.value
})

const currentSoilHumidity = computed(() => {
  if (userStore.isDemoMode) {
    return demoCurrentReading.value?.soilHumidity || demoDataPoints.value[demoDataPoints.value.length - 1]?.soilHumidity || demoData.sensorData.current.soilHumidity || 68.3
  }
  return realCurrentSoilHumidity.value
})

const currentAirHumidity = computed(() => {
  if (userStore.isDemoMode) {
    return demoCurrentReading.value?.airHumidity || demoDataPoints.value[demoDataPoints.value.length - 1]?.airHumidity || 75.0
  }
  return realCurrentAirHumidity.value
})

const temperatureTrend = computed(() => {
  if (userStore.isDemoMode) {
    // Calcular tendencia exactamente igual que en modo usuario
    const demoHistory = demoDataPoints.value
    if (demoHistory.length >= 2) {
      const current = demoHistory[demoHistory.length - 1].temperature
      const previous = demoHistory[demoHistory.length - 2].temperature
      const tempChange = current - previous
      const MIN_TEMP_CHANGE = 0.1
      
      // Solo mostrar tendencia si hay cambio significativo
      if (Math.abs(tempChange) >= MIN_TEMP_CHANGE) {
        return {
          direction: tempChange > 0 ? 'up' : 'down',
          value: Math.abs(tempChange).toFixed(1) // Diferencia absoluta en grados
        }
      } else {
        return {
          direction: 'neutral',
          value: '0.0'
        }
      }
    }
    // Fallback si no hay suficientes datos
    return { direction: 'neutral', value: '0.0' }
  }
  return realTemperatureTrend.value
})

const soilHumidityTrend = computed(() => {
  if (userStore.isDemoMode) {
    // Calcular tendencia exactamente igual que en modo usuario
    const demoHistory = demoDataPoints.value
    if (demoHistory.length >= 2) {
      const current = demoHistory[demoHistory.length - 1].soilHumidity
      const previous = demoHistory[demoHistory.length - 2].soilHumidity
      const soilChange = current - previous
      const MIN_HUMIDITY_CHANGE = 0.5
      
      // Solo mostrar tendencia si hay cambio significativo
      if (Math.abs(soilChange) >= MIN_HUMIDITY_CHANGE) {
        return {
          direction: soilChange > 0 ? 'up' : 'down',
          value: Math.abs(soilChange).toFixed(1) // Diferencia absoluta
        }
      } else {
        return {
          direction: 'neutral',
          value: '0.0'
        }
      }
    }
    // Fallback si no hay suficientes datos
    return { direction: 'neutral', value: '0.0' }
  }
  return realSoilHumidityTrend.value
})

const airHumidityTrend = computed(() => {
  if (userStore.isDemoMode) {
    // Calcular tendencia exactamente igual que en modo usuario
    const demoHistory = demoDataPoints.value
    if (demoHistory.length >= 2) {
      const current = demoHistory[demoHistory.length - 1].airHumidity
      const previous = demoHistory[demoHistory.length - 2].airHumidity
      const airChange = current - previous
      const MIN_HUMIDITY_CHANGE = 0.5
      
      // Solo mostrar tendencia si hay cambio significativo
      if (Math.abs(airChange) >= MIN_HUMIDITY_CHANGE) {
        return {
          direction: airChange > 0 ? 'up' : 'down',
          value: Math.abs(airChange).toFixed(1) // Diferencia absoluta
        }
      } else {
        return {
          direction: 'neutral',
          value: '0.0'
        }
      }
    }
    // Fallback si no hay suficientes datos
    return { direction: 'neutral', value: '0.0' }
  }
  return realAirHumidityTrend.value
})

const cropThresholds = computed(() => {
  if (userStore.isDemoMode) {
    return {
      soilHumidityMin: demoData.crop.soil_humidity_min,
      soilHumidityMax: demoData.crop.soil_humidity_max,
      airHumidityMin: demoData.crop.air_humidity_min,
      airHumidityMax: demoData.crop.air_humidity_max,
      temperatureMax: demoData.crop.temperature_max
    }
  }
  return realCropThresholds.value
})

const formattedTemperature = computed(() => {
  if (userStore.isDemoMode) {
    return `${currentTemperature.value.toFixed(1)}°C`
  }
  return realFormattedTemperature.value
})

const formattedSoilHumidity = computed(() => {
  if (userStore.isDemoMode) {
    return `${currentSoilHumidity.value.toFixed(1)}%`
  }
  return realFormattedSoilHumidity.value
})

const formattedAirHumidity = computed(() => {
  if (userStore.isDemoMode) {
    return `${currentAirHumidity.value.toFixed(1)}%`
  }
  return realFormattedAirHumidity.value
})

// Estado dinámico de la bomba de riego
const pumpStatus = computed(() => {
  if (userStore.isDemoMode) {
    // En modo demo, mostrar estado fijo
    return {
      status: 'Inactiva',
      iconBg: 'bg-gray-500/20',
      iconColor: 'text-gray-400',
      valueColor: 'text-gray-400'
    }
  }
  
  // En modo real, usar datos del store de irrigación
  if (irrigationStore.isWatering) {
    return {
      status: irrigationStore.isPaused ? 'Pausada' : 'Activa',
      iconBg: irrigationStore.isPaused ? 'bg-yellow-500/20' : 'bg-green-500/20',
      iconColor: irrigationStore.isPaused ? 'text-yellow-400' : 'text-green-400',
      valueColor: irrigationStore.isPaused ? 'text-yellow-400' : 'text-green-400'
    }
  } else {
    return {
      status: 'Inactiva',
      iconBg: 'bg-gray-500/20',
      iconColor: 'text-gray-400',
      valueColor: 'text-gray-400'
    }
  }
})

// Datos de dispositivo y cultivo para demo
const currentDevice = computed(() => {
  if (userStore.isDemoMode) {
    return demoData.device
  }
  return deviceStore.activeDevices.length > 0 ? deviceStore.activeDevices[0] : null
})

const currentCrop = computed(() => {
  if (userStore.isDemoMode) {
    return demoData.crop
  }
  // Buscar el cultivo seleccionado en el array de cultivos (igual que activeDevices)
  const selectedCrop = cropStore.crops.find(crop => crop.selected)
  return selectedCrop || null
})

const hasActiveDevice = computed(() => {
  if (userStore.isDemoMode) {
    return true
  }
  return deviceStore.activeDevices.length > 0
})

const hasSelectedCrop = computed(() => {
  if (userStore.isDemoMode) {
    return true
  }
  // Verificar si hay un cultivo seleccionado en el array (igual que activeDevices)
  return cropStore.crops.some(crop => crop.selected)
})

// Cargar datos al montar el componente
onMounted(async () => {
  try {
    if (userStore.isDemoMode) {
      // Modo demo: iniciar simulación
      console.log('🎭 Dashboard: Iniciando modo demo')
      
      // Inicializar con datos base
      demoCurrentReading.value = {
        temperature: demoData.sensorData.current.temperature,
        soilHumidity: demoData.sensorData.current.soilHumidity,
        airHumidity: demoData.sensorData.current.airHumidity,
        timestamp: new Date().toISOString()
      }
      
      // Generar algunos datos iniciales
      for (let i = 0; i < 5; i++) {
        const timeLabel = new Date(Date.now() - (4 - i) * 3000).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
        const baseTemp = 19.5 + (Math.random() - 0.5) * 2
        const baseSoilHumidity = 68.3 + (Math.random() - 0.5) * 3
        const baseAirHumidity = 75.0 + (Math.random() - 0.5) * 4
        
        demoDataPoints.value.push({
          time: timeLabel,
          temperature: parseFloat(baseTemp.toFixed(1)),
          soilHumidity: parseFloat(baseSoilHumidity.toFixed(1)),
          airHumidity: parseFloat(baseAirHumidity.toFixed(1))
        })
      }
      
      startDemoSimulation()
    } else {
      // Modo real: cargar datos normales
      console.log('📊 Dashboard: Cargando datos reales')
      
      // IMPORTANTE: Cargar primero los cultivos y dispositivos antes de verificar estados
      if (userStore.user?.id) {
        // Cargar cultivos primero
        if (cropStore.crops.length === 0) {
          console.log('🌱 Cargando cultivos del usuario...')
          await cropStore.fetchAllUserCrops(userStore.user.id)
        }
        
        // Cargar dispositivos después
        if (deviceStore.devices.length === 0) {
          console.log('📱 Cargando dispositivos del usuario...')
          await deviceStore.fetchUserDevice(userStore.user.id)
        }
        
        console.log('✅ Datos del dashboard cargados - Cultivos:', cropStore.crops.length, 'Dispositivos:', deviceStore.devices.length)
        
        // Cargar configuración activa de riego para mostrar estado de bomba
        try {
          await irrigationStore.loadActiveConfiguration()
          console.log('✅ Configuración de riego cargada - Estado bomba:', irrigationStore.isWatering)
        } catch (irrigationError) {
          console.log('ℹ️ No hay configuración de riego activa')
        }
      }
    }
  } catch (error) {
    console.error('Error cargando datos del dashboard:', error)
  }
})

// Observar cambios en el array de cultivos para actualizar el dashboard automáticamente
watch(() => cropStore.crops, (newCrops) => {
  if (!userStore.isDemoMode) {
    console.log('🔄 Dashboard: Array de cultivos actualizado, cultivos:', newCrops.length)
    const selectedCrop = newCrops.find(crop => crop.selected)
    if (selectedCrop) {
      console.log('✅ Dashboard: Cultivo seleccionado detectado:', selectedCrop.name)
    }
  }
}, { deep: true })

// Limpiar intervalos al desmontar
onUnmounted(() => {
  stopDemoSimulation()
})

// Función para manejar la salida del modo demo
const handleExitDemo = () => {
  userStore.exitDemoMode()
  navigateTo('/auth/login')
}
</script>

<template>
  <div class="dashboard-container space-y-8">
    <!-- Banner informativo para modo demo -->
    <DemoBanner 
      :is-demo-mode="userStore.isDemoMode"
      @exit-demo="handleExitDemo"
    />
    
    <!-- Título de la página -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-4xl font-bold text-white mb-2">Dashboard de Sensores IoT</h1>
        <p class="text-gray-400 text-lg">Monitoreo en tiempo real de temperatura y humedad para sistemas de riego automatizado</p>
      </div>
    </div>

    <!-- Gráficas principales ahora en 2 columnas -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Información de temperatura -->
      <SensorCard 
        title="Temperatura Ambiental"
        description="Sensor DHT11 - Actualización cada 2 minutos"
        :icon="thermometerIcon"
        icon-bg-class="bg-gradient-to-br from-red-500 to-red-600"
        value-color-class="text-red-400"
        :formatted-value="formattedTemperature"
        :trend="temperatureTrend"
        :chart-component="WorkingTemperatureChart"
        :chart-data="temperatureData"
        :chart-props="{ temperatureMax: currentCrop?.temperature_max || 28 }"
      />

      <!-- Información de humedad del suelo -->
      <SensorCard 
        title="Humedad del Suelo" 
        description="Sensor Capacitive Soil Moisture - Actualización cada 2 minutos"
        :icon="humidityIcon"
        icon-bg-class="bg-gradient-to-br from-blue-500 to-blue-600"
        value-color-class="text-blue-400"
        :formatted-value="formattedSoilHumidity"
        :trend="soilHumidityTrend"
        :chart-component="WorkingHumidityChart"
        :chart-data="soilHumidityData"
        :chart-props="{ 
          humidityMin: currentCrop?.soil_humidity_min || 40,
          humidityMax: currentCrop?.soil_humidity_max || 80 
        }"
      />
    </div>

    <!-- Humedad Ambiental en fila aparte -->
    <div class="mt-8">
      <SensorCard 
        title="Humedad Ambiental"
        description="Sensor DHT11 - Actualización cada 2 minutos"
        :icon="humidityIcon"
        icon-bg-class="bg-gradient-to-br from-cyan-500 to-cyan-600"
        value-color-class="text-cyan-400"
        :formatted-value="formattedAirHumidity"
        :trend="airHumidityTrend"
        :chart-component="WorkingAirHumidityChart"
        :chart-data="airHumidityData"
        :chart-props="{ 
          airHumidityMin: currentCrop?.air_humidity_min || 30,
          airHumidityMax: currentCrop?.air_humidity_max || 85 
        }"
      />
    </div>
    
    <!-- Panel de información adicional -->
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      <!-- Última actualización -->
      <InfoCard 
        icon-name="heroicons:clock"
        icon-bg-class="bg-blue-500/20"
        icon-color-class="text-blue-400"
        label="Última actualización"
        :value="new Date().toLocaleTimeString('es-ES')"
        value-color-class="text-white"
      />

      <!-- Estado de conexión -->
      <InfoCard 
        icon-name="heroicons:signal"
        icon-bg-class="bg-green-500/20"
        icon-color-class="text-green-400"
        label="Estado TTN"
        value="Conectado"
        value-color-class="text-green-400"
      />

      <!-- Configuración del cultivo -->
      <InfoCard 
        icon-name="heroicons:cog-6-tooth"
        icon-bg-class="bg-purple-500/20"
        icon-color-class="text-purple-400"
        label="Cultivo actual"
        :value="currentCrop?.name || '-'"
        value-color-class="text-white"
      />

      <!-- Estado de la bomba -->
      <InfoCard 
        icon-name="heroicons:beaker"
        :icon-bg-class="pumpStatus.iconBg"
        :icon-color-class="pumpStatus.iconColor"
        label="Bomba de riego"
        :value="pumpStatus.status"
        :value-color-class="pumpStatus.valueColor"
      />
    </div>

    <!-- Panel de Información del Sistema -->
    <SystemInfoPanel 
      :current-crop="currentCrop"
      :has-selected-crop="hasSelectedCrop"
      :current-device="currentDevice"
      :has-active-device="hasActiveDevice"
    />
  </div>
</template>

 