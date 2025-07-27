<script setup>
import { useSensorData } from '~/composables/useSensorData.js'
import { useCropStore } from '~/stores/crop'
import { useDeviceStore } from '~/stores/device'
import { useUserStore } from '~/stores/user'
import { thermometerIcon, humidityIcon } from '~/assets/icons'
import { getIcon } from '~/assets/icons'
import BaseCard from '~/components/Cards/BaseCard.vue'
import WorkingTemperatureChart from '~/components/Charts/WorkingTemperatureChart.vue'
import WorkingHumidityChart from '~/components/Charts/WorkingHumidityChart.vue'
import { demoData, getSimulatedReading } from '~/utils/demoData'

// Configurar middleware de autenticación y redirección para admins
definePageMeta({
  middleware: ['auth', 'admin-redirect']
})

// Obtener stores
const cropStore = useCropStore()
const deviceStore = useDeviceStore()
const userStore = useUserStore()

// Estados para datos demo
const demoCurrentReading = ref(null)
const demoInterval = ref(null)
const demoDataPoints = ref([])
const maxDemoDataPoints = 20

// Función para generar datos demo progresivamente
const generateDemoDataPoint = () => {
  const now = new Date()
  const timeLabel = now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
  
  // Usar los valores base de la imagen
  const baseTemperature = 19.5
  const baseHumidity = 68.3
  
  // Generar variaciones realistas
  const temperatureVariation = (Math.random() - 0.5) * 2 // ±1°C
  const humidityVariation = (Math.random() - 0.5) * 3 // ±1.5%
  
  const temperature = Math.max(18, Math.min(22, baseTemperature + temperatureVariation))
  const humidity = Math.max(65, Math.min(72, baseHumidity + humidityVariation))
  
  const newPoint = {
    time: timeLabel,
    temperature: parseFloat(temperature.toFixed(1)),
    humidity: parseFloat(humidity.toFixed(1))
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
    humidity: newPoint.humidity,
    timestamp: now.toISOString()
  }
  
  console.log('🎭 Demo data point added:', newPoint)
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

// Obtener datos de sensores (mantener funcionalidad existente)
const sensorDataComposable = useSensorData()
const {
  temperatureData: realTemperatureData,
  humidityData: realHumidityData,
  currentTemperature: realCurrentTemperature,
  currentHumidity: realCurrentHumidity,
  temperatureTrend: realTemperatureTrend,
  humidityTrend: realHumidityTrend,
  cropThresholds: realCropThresholds,
  formattedTemperature: realFormattedTemperature,
  formattedHumidity: realFormattedHumidity
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
        },
        {
          label: 'Umbral Máximo (28°C)',
          data: demoHistory.map(() => 28), // Línea constante en 28°C
          borderColor: '#fbbf24',
          backgroundColor: 'transparent',
          borderWidth: 3,
          borderDash: [10, 5],
          pointRadius: 0,
          fill: false,
          tension: 0
        }
      ]
    }
  }
  return realTemperatureData.value
})

const humidityData = computed(() => {
  if (userStore.isDemoMode) {
    // En modo demo, usar datos demo directamente
    const demoHistory = demoDataPoints.value
    return {
      labels: demoHistory.map(item => item.time),
      datasets: [
        {
          label: 'Humedad (%)',
          data: demoHistory.map(item => item.humidity),
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
        },
        {
          label: 'Umbral Mínimo (40%)',
          data: demoHistory.map(() => 40), // Línea constante en 40%
          borderColor: '#60a5fa',
          backgroundColor: 'transparent',
          borderWidth: 3,
          borderDash: [10, 5],
          pointRadius: 0,
          fill: false,
          tension: 0
        },
        {
          label: 'Umbral Máximo (80%)',
          data: demoHistory.map(() => 80), // Línea constante en 80%
          borderColor: '#1d4ed8',
          backgroundColor: 'transparent',
          borderWidth: 3,
          borderDash: [5, 10],
          pointRadius: 0,
          fill: false,
          tension: 0
        }
      ]
    }
  }
  return realHumidityData.value
})

const currentTemperature = computed(() => {
  if (userStore.isDemoMode) {
    return demoCurrentReading.value?.temperature || demoDataPoints.value[demoDataPoints.value.length - 1]?.temperature || demoData.sensorData.current.temperature
  }
  return realCurrentTemperature.value
})

const currentHumidity = computed(() => {
  if (userStore.isDemoMode) {
    return demoCurrentReading.value?.humidity || demoDataPoints.value[demoDataPoints.value.length - 1]?.humidity || demoData.sensorData.current.humidity
  }
  return realCurrentHumidity.value
})

const temperatureTrend = computed(() => {
  if (userStore.isDemoMode) {
    return { direction: 'down', percentage: 8.3, value: 19.5 }
  }
  return realTemperatureTrend.value
})

const humidityTrend = computed(() => {
  if (userStore.isDemoMode) {
    return { direction: 'down', percentage: 4.3, value: 68.3 }
  }
  return realHumidityTrend.value
})

const cropThresholds = computed(() => {
  if (userStore.isDemoMode) {
    return {
      humidityMin: demoData.crop.humidity_min,
      humidityMax: demoData.crop.humidity_max,
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

const formattedHumidity = computed(() => {
  if (userStore.isDemoMode) {
    return `${currentHumidity.value.toFixed(1)}%`
  }
  return realFormattedHumidity.value
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
        humidity: demoData.sensorData.current.humidity,
        timestamp: new Date().toISOString()
      }
      
      // Generar algunos datos iniciales
      for (let i = 0; i < 5; i++) {
        const timeLabel = new Date(Date.now() - (4 - i) * 3000).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
        const baseTemp = 19.5 + (Math.random() - 0.5) * 2
        const baseHumidity = 68.3 + (Math.random() - 0.5) * 3
        
        demoDataPoints.value.push({
          time: timeLabel,
          temperature: parseFloat(baseTemp.toFixed(1)),
          humidity: parseFloat(baseHumidity.toFixed(1))
        })
      }
      
      startDemoSimulation()
    } else {
      // Modo real: cargar datos normales
      console.log('📊 Dashboard: Cargando datos reales')
      
      // Cargar todos los cultivos del usuario si no están cargados
      if (userStore.user?.id && cropStore.crops.length === 0) {
        await cropStore.fetchAllUserCrops(userStore.user.id)
      }
      
      // Cargar dispositivos del usuario si no están cargados
      if (userStore.user?.id && deviceStore.devices.length === 0) {
        await deviceStore.fetchUserDevice(userStore.user.id)
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


</script>

<template>
  <div class="dashboard-container space-y-8">
    <!-- Banner informativo para modo demo -->
    <div v-if="userStore.isDemoMode" class="bg-gradient-to-r from-orange-500/20 to-yellow-500/20 border border-orange-500/30 rounded-xl p-4 shadow-lg">
      <div class="flex items-center space-x-3">
        <div class="flex-shrink-0">
          <svg class="w-8 h-8 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
          </svg>
        </div>
        <div class="flex-1">
          <h3 class="text-lg font-medium text-orange-300">🎭 Modo Vista Previa</h3>
          <p class="text-sm text-orange-200">
            Estás viendo una demostración con datos simulados. 
            <span class="font-medium">Las funcionalidades están limitadas.</span> 
            Para acceder a todas las características, 
            <button @click="userStore.exitDemoMode(); navigateTo('/auth/login')" class="underline hover:text-white transition-colors">
              inicia sesión aquí
            </button>.
          </p>
        </div>
        <div class="flex items-center space-x-2">
          <div class="w-3 h-3 bg-orange-400 rounded-full animate-pulse"></div>
          <span class="text-sm text-orange-300 font-medium">DEMO</span>
        </div>
      </div>
    </div>
    
    <!-- Título de la página -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-4xl font-bold text-white mb-2">Dashboard de Sensores IoT</h1>
        <p class="text-gray-400 text-lg">Monitoreo en tiempo real de temperatura y humedad para sistemas de riego automatizado</p>
      </div>
    </div>

    <!-- Gráficas principales mejoradas -->
    <div class="grid grid-cols-1 xl:grid-cols-2 gap-8">
      <!-- Información de temperatura -->
      <div class="enhanced-sensor-card">
        <div class="sensor-header">
          <div class="flex items-center space-x-3">
            <div class="sensor-icon bg-gradient-to-br from-red-500 to-red-600">
              <component :is="thermometerIcon" />
            </div>
            <div>
              <h3 class="text-xl font-bold text-white">Temperatura Ambiental</h3>
              <p class="text-gray-400">Sensor DHT22 - Actualización cada 3s</p>
            </div>
          </div>
          <div class="sensor-display">
            <div class="main-value text-red-400">{{ formattedTemperature }}</div>
            <div class="trend-badge" :class="temperatureTrend.direction === 'up' ? 'trend-up' : temperatureTrend.direction === 'down' ? 'trend-down' : 'trend-neutral'">
              <span class="trend-arrow">{{ temperatureTrend.direction === 'up' ? '↗' : temperatureTrend.direction === 'down' ? '↘' : '→' }}</span>
              <span class="trend-percent">{{ temperatureTrend.value }}%</span>
            </div>
          </div>
        </div>
        <WorkingTemperatureChart :data="temperatureData" />
      </div>

      <!-- Información de humedad -->
      <div class="enhanced-sensor-card">
        <div class="sensor-header">
          <div class="flex items-center space-x-3">
            <div class="sensor-icon bg-gradient-to-br from-blue-500 to-blue-600">
              <component :is="humidityIcon" />
            </div>
            <div>
              <h3 class="text-xl font-bold text-white">Humedad Relativa</h3>
              <p class="text-gray-400">Sensor DHT22 - Actualización cada 3s</p>
            </div>
          </div>
          <div class="sensor-display">
            <div class="main-value text-blue-400">{{ formattedHumidity }}</div>
            <div class="trend-badge" :class="humidityTrend.direction === 'up' ? 'trend-up' : humidityTrend.direction === 'down' ? 'trend-down' : 'trend-neutral'">
              <span class="trend-arrow">{{ humidityTrend.direction === 'up' ? '↗' : humidityTrend.direction === 'down' ? '↘' : '→' }}</span>
              <span class="trend-percent">{{ humidityTrend.value }}%</span>
            </div>
          </div>
        </div>
        <WorkingHumidityChart :data="humidityData" />
      </div>
    </div>
    

    <!-- Panel de información adicional -->
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      <!-- Última actualización -->
      <BaseCard class="info-card">
        <div class="flex items-center space-x-3">
          <div class="flex items-center justify-center w-10 h-10 bg-blue-500/20 rounded-lg">
            <Icon name="heroicons:clock" class="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <p class="text-sm text-gray-400">Última actualización</p>
            <ClientOnly>
              <p class="text-white font-semibold">
                {{ new Date().toLocaleTimeString('es-ES') }}
              </p>
              <template #fallback>
                <p class="text-white font-semibold">--:--:--</p>
              </template>
            </ClientOnly>
          </div>
        </div>
      </BaseCard>

      <!-- Estado de conexión -->
      <BaseCard class="info-card">
        <div class="flex items-center space-x-3">
          <div class="flex items-center justify-center w-10 h-10 bg-green-500/20 rounded-lg">
            <Icon name="heroicons:signal" class="w-5 h-5 text-green-400" />
          </div>
          <div>
            <p class="text-sm text-gray-400">Estado TTN</p>
            <p class="text-green-400 font-semibold">Conectado</p>
          </div>
        </div>
      </BaseCard>

      <!-- Configuración del cultivo -->
      <BaseCard class="info-card">
        <div class="flex items-center space-x-3">
          <div class="flex items-center justify-center w-10 h-10 bg-purple-500/20 rounded-lg">
            <Icon name="heroicons:cog-6-tooth" class="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <p class="text-sm text-gray-400">Cultivo actual</p>
            <p class="text-white font-semibold">{{ currentCrop?.name || '-' }}</p>
          </div>
        </div>
      </BaseCard>

      <!-- Estado de la bomba -->
      <BaseCard class="info-card">
        <div class="flex items-center space-x-3">
          <div class="flex items-center justify-center w-10 h-10 bg-blue-500/20 rounded-lg">
            <Icon name="heroicons:beaker" class="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <p class="text-sm text-gray-400">Bomba de riego</p>
            <p class="text-blue-400 font-semibold">Activa</p>
          </div>
        </div>
      </BaseCard>
    </div>

    

    <!-- Panel de Información del Sistema -->
    <div class="bg-gray-800/50 border border-blue-500/30 rounded-xl p-6 shadow-lg">
      <!-- Header -->
      <div class="mb-6 border-b border-gray-600/50 pb-4">
        <div class="flex items-center space-x-3">
          <div class="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
          <h3 class="text-2xl font-bold text-white">Información del Sistema</h3>
        </div>
        <p class="text-gray-400 mt-2">Detalles del cultivo activo y dispositivo IoT en funcionamiento</p>
      </div>
      
      <!-- Content -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- INFORMACIÓN DEL CULTIVO -->
          <div class="space-y-4">
            <div class="flex items-center space-x-3 mb-4">
              <component :is="getIcon('plant')" class="w-6 h-6 text-green-400" />
              <h4 class="text-lg font-bold text-white">Cultivo Seleccionado</h4>
            </div>
            
            <div v-if="hasSelectedCrop" class="space-y-3">
               <div class="flex justify-between items-center p-4 bg-gray-900/60 border border-gray-600/30 rounded-lg hover:bg-gray-900/80 transition-colors">
                 <span class="text-gray-300 font-medium">Nombre:</span>
                 <span class="text-white font-bold text-lg">{{ currentCrop.name }}</span>
               </div>
               
               <div class="flex justify-between items-center p-4 bg-gray-900/60 border border-gray-600/30 rounded-lg hover:bg-gray-900/80 transition-colors">
                 <span class="text-gray-300 font-medium">Categoría:</span>
                 <span class="text-green-400 font-bold text-lg">{{ currentCrop.category }}</span>
               </div>
               
               <div class="flex justify-between items-center p-4 bg-gray-900/60 border border-gray-600/30 rounded-lg hover:bg-gray-900/80 transition-colors">
                 <span class="text-gray-300 font-medium">Humedad Mínima:</span>
                 <span class="text-blue-400 font-bold text-lg">{{ currentCrop.humidity_min }}%</span>
               </div>
               
               <div class="flex justify-between items-center p-4 bg-gray-900/60 border border-gray-600/30 rounded-lg hover:bg-gray-900/80 transition-colors">
                 <span class="text-gray-300 font-medium">Humedad Máxima:</span>
                 <span class="text-blue-400 font-bold text-lg">{{ currentCrop.humidity_max }}%</span>
               </div>
               
               <div class="flex justify-between items-center p-4 bg-gray-900/60 border border-gray-600/30 rounded-lg hover:bg-gray-900/80 transition-colors">
                 <span class="text-gray-300 font-medium">Temperatura Máxima:</span>
                 <span class="text-red-400 font-bold text-lg">{{ currentCrop.temperature_max }}°C</span>
               </div>
              
               <div class="flex justify-between items-center p-4 bg-gray-900/60 border border-gray-600/30 rounded-lg hover:bg-gray-900/80 transition-colors">
                 <div class="flex items-center space-x-2">
                   <Icon name="heroicons:beaker" class="w-5 h-5 text-blue-400" />
                   <span class="text-gray-300 font-medium">Estado de la Bomba:</span>
                 </div>
                 <div class="flex items-center space-x-2">
                   <div class="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                   <span class="text-blue-400 font-bold text-lg">ACTIVA</span>
                 </div>
               </div>
               
               <div class="flex justify-between items-center p-4 bg-gray-900/60 border border-gray-600/30 rounded-lg hover:bg-gray-900/80 transition-colors">
                 <span class="text-gray-300 font-medium">Días de Crecimiento:</span>
                 <span class="text-white font-bold text-lg">{{ currentCrop.growth_days }} días</span>
               </div>
               
               <div class="flex justify-between items-center p-4 bg-gray-900/60 border border-gray-600/30 rounded-lg hover:bg-gray-900/80 transition-colors">
                 <span class="text-gray-300 font-medium">Temporada:</span>
                 <span class="text-purple-400 font-bold text-lg">{{ currentCrop.session }}</span>
               </div>
            </div>
            
            <!-- Estado cuando no hay cultivo seleccionado -->
            <div v-else class="space-y-3">
               <div class="flex justify-between items-center p-4 bg-gray-900/60 border border-gray-600/30 rounded-lg">
                 <span class="text-gray-300 font-medium">Nombre:</span>
                 <span class="text-red-400 font-bold text-lg">No se ha seleccionado</span>
               </div>
               
               <div class="flex justify-between items-center p-4 bg-gray-900/60 border border-gray-600/30 rounded-lg">
                 <span class="text-gray-300 font-medium">Categoría:</span>
                 <span class="text-red-400 font-bold text-lg">No se ha seleccionado</span>
               </div>
               
               <div class="flex justify-between items-center p-4 bg-gray-900/60 border border-gray-600/30 rounded-lg">
                 <span class="text-gray-300 font-medium">Humedad Mínima:</span>
                 <span class="text-red-400 font-bold text-lg">No disponible</span>
               </div>
               
               <div class="flex justify-between items-center p-4 bg-gray-900/60 border border-gray-600/30 rounded-lg">
                 <span class="text-gray-300 font-medium">Humedad Máxima:</span>
                 <span class="text-red-400 font-bold text-lg">No disponible</span>
               </div>
               
               <div class="flex justify-between items-center p-4 bg-gray-900/60 border border-gray-600/30 rounded-lg">
                 <span class="text-gray-300 font-medium">Temperatura Máxima:</span>
                 <span class="text-red-400 font-bold text-lg">No disponible</span>
               </div>
              
               <div class="flex justify-between items-center p-4 bg-gray-900/60 border border-gray-600/30 rounded-lg">
                 <div class="flex items-center space-x-2">
                   <Icon name="heroicons:beaker" class="w-5 h-5 text-red-400" />
                   <span class="text-gray-300 font-medium">Estado de la Bomba:</span>
                 </div>
                 <div class="flex items-center space-x-2">
                   <div class="w-3 h-3 bg-red-400 rounded-full"></div>
                   <span class="text-red-400 font-bold text-lg">NO SELECCIONADO</span>
                 </div>
               </div>
               
               <div class="flex justify-between items-center p-4 bg-gray-900/60 border border-gray-600/30 rounded-lg">
                 <span class="text-gray-300 font-medium">Días de Crecimiento:</span>
                 <span class="text-red-400 font-bold text-lg">No disponible</span>
               </div>
               
               <div class="flex justify-between items-center p-4 bg-gray-900/60 border border-gray-600/30 rounded-lg">
                 <span class="text-gray-300 font-medium">Temporada:</span>
                 <span class="text-red-400 font-bold text-lg">No disponible</span>
               </div>
            </div>
          </div>

          <!-- INFORMACIÓN DEL DISPOSITIVO -->
          <div class="space-y-4">
            <div class="flex items-center space-x-3 mb-4">
              <Icon name="heroicons:cpu-chip" class="w-6 h-6 text-blue-400" />
              <h4 class="text-lg font-bold text-white">Dispositivo Registrado</h4>
            </div>
            
            <div v-if="hasActiveDevice" class="space-y-3">
              <div class="flex justify-between items-center p-4 bg-gray-900/60 border border-gray-600/30 rounded-lg hover:bg-gray-900/80 transition-colors">
                <span class="text-gray-300 font-medium">Nombre:</span>
                <span class="text-white font-bold text-lg">{{ currentDevice?.deviceName }}</span>
              </div>
              
              <div class="flex justify-between items-center p-4 bg-gray-900/60 border border-gray-600/30 rounded-lg hover:bg-gray-900/80 transition-colors">
                <span class="text-gray-300 font-medium">ID del Dispositivo:</span>
                <span class="text-gray-300 font-mono font-bold text-lg">{{ currentDevice?.enddeviceId }}</span>
              </div>
              
              <div class="flex justify-between items-center p-4 bg-gray-900/60 border border-gray-600/30 rounded-lg hover:bg-gray-900/80 transition-colors">
                <div class="flex items-center space-x-2">
                  <Icon name="heroicons:wifi" class="w-5 h-5 text-green-400" />
                  <span class="text-gray-300 font-medium">Estado:</span>
                </div>
                <div class="flex items-center space-x-2">
                  <div class="w-3 h-3 rounded-full animate-pulse bg-green-400"></div>
                  <span class="font-bold text-lg text-green-400">CONECTADO</span>
                </div>
              </div>
              
              <div class="flex justify-between items-center p-4 bg-gray-900/60 border border-gray-600/30 rounded-lg hover:bg-gray-900/80 transition-colors">
                <span class="text-gray-300 font-medium">Frecuencia de Datos:</span>
                <span class="text-white font-bold text-lg">Cada 3 segundos</span>
              </div>
              
              <div class="flex justify-between items-center p-4 bg-gray-900/60 border border-gray-600/30 rounded-lg hover:bg-gray-900/80 transition-colors">
                <span class="text-gray-300 font-medium">Última Comunicación:</span>
                <span class="text-green-400 font-bold text-lg">Ahora mismo</span>
              </div>
            </div>
            
            <!-- Estado cuando no hay dispositivos activos -->
            <div v-else class="space-y-3">
              <div class="flex justify-between items-center p-4 bg-gray-900/60 border border-gray-600/30 rounded-lg">
                <span class="text-gray-300 font-medium">Nombre:</span>
                <span class="text-red-400 font-bold text-lg">No se ha registrado</span>
              </div>
              
              <div class="flex justify-between items-center p-4 bg-gray-900/60 border border-gray-600/30 rounded-lg">
                <span class="text-gray-300 font-medium">ID del Dispositivo:</span>
                <span class="text-red-400 font-bold text-lg">No se ha registrado</span>
              </div>
              
              <div class="flex justify-between items-center p-4 bg-gray-900/60 border border-gray-600/30 rounded-lg">
                <div class="flex items-center space-x-2">
                  <Icon name="heroicons:wifi" class="w-5 h-5 text-red-400" />
                  <span class="text-gray-300 font-medium">Estado:</span>
                </div>
                <div class="flex items-center space-x-2">
                  <div class="w-3 h-3 rounded-full bg-red-400"></div>
                  <span class="font-bold text-lg text-red-400">NO REGISTRADO</span>
                </div>
              </div>
              
              <div class="flex justify-between items-center p-4 bg-gray-900/60 border border-gray-600/30 rounded-lg">
                <span class="text-gray-300 font-medium">Frecuencia de Datos:</span>
                <span class="text-red-400 font-bold text-lg">No disponible</span>
              </div>
              
              <div class="flex justify-between items-center p-4 bg-gray-900/60 border border-gray-600/30 rounded-lg">
                <span class="text-gray-300 font-medium">Última Comunicación:</span>
                <span class="text-red-400 font-bold text-lg">No disponible</span>
              </div>
            </div>
          </div>
         </div>
      </div>
  </div>
</template>

<style scoped>
.dashboard-container {
  padding: 0.5rem;
}

.info-card {
  padding: 1.5rem;
  transition: transform 0.2s ease-in-out;
}

.info-card:hover {
  transform: translateY(-2px);
}

.threshold-config {
  background: linear-gradient(135deg, rgba(74, 93, 184, 0.1) 0%, rgba(42, 59, 122, 0.1) 100%);
  border: 1px solid rgba(74, 93, 184, 0.2);
}

.threshold-item {
  padding: 1.5rem;
  background: rgba(17, 24, 39, 0.5);
  border-radius: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.2s ease-in-out;
}

.threshold-item:hover {
  background: rgba(17, 24, 39, 0.7);
  border-color: rgba(74, 93, 184, 0.3);
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.enhanced-sensor-card {
  background: rgba(17, 24, 39, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 1.5rem;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.enhanced-sensor-card:hover {
  background: rgba(17, 24, 39, 0.4);
  transform: translateY(-4px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2);
}

.sensor-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
}

.sensor-icon {
  width: 3rem;
  height: 3rem;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.sensor-display {
  text-align: right;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5rem;
}

.main-value {
  font-size: 2.25rem;
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.025em;
}

.trend-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  font-weight: 600;
  transition: all 0.2s ease;
}

.trend-up {
  background: rgba(34, 197, 94, 0.15);
  color: #22c55e;
  border: 1px solid rgba(34, 197, 94, 0.3);
}

.trend-down {
  background: rgba(239, 68, 68, 0.15);
  color: #ef4444;
  border: 1px solid rgba(239, 68, 68, 0.3);
}

.trend-neutral {
  background: rgba(156, 163, 175, 0.15);
  color: #9ca3af;
  border: 1px solid rgba(156, 163, 175, 0.3);
}

.trend-arrow {
  font-size: 0.875rem;
  font-weight: 700;
}

.trend-percent {
  font-size: 0.75rem;
  font-weight: 600;
}

.system-panel {
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.05) 0%, rgba(59, 130, 246, 0.05) 100%);
  border: 1px solid rgba(74, 93, 184, 0.2);
}
</style> 