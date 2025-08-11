<script setup>
import { useSensorData } from '~/composables/useSensorData.js'
import { useCropStore } from '~/stores/crop'
import { useDeviceStore } from '~/stores/device'
import { useUserStore } from '~/stores/user'
import { thermometerIcon, humidityIcon } from '~/assets/icons'
import WorkingTemperatureChart from '~/components/Charts/WorkingTemperatureChart.vue'
import WorkingHumidityChart from '~/components/Charts/WorkingHumidityChart.vue'
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

    <!-- Gráficas principales mejoradas -->
    <div class="grid grid-cols-1 xl:grid-cols-2 gap-8">
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

      <!-- Información de humedad -->
      <SensorCard 
        title="Humedad del Suelo"
        description="Sensor Capacitive Soil Moisture - Actualización cada 2 minutos"
        :icon="humidityIcon"
        icon-bg-class="bg-gradient-to-br from-blue-500 to-blue-600"
        value-color-class="text-blue-400"
        :formatted-value="formattedHumidity"
        :trend="humidityTrend"
        :chart-component="WorkingHumidityChart"
        :chart-data="humidityData"
        :chart-props="{ 
          humidityMin: currentCrop?.humidity_min || 40,
          humidityMax: currentCrop?.humidity_max || 80 
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
        icon-bg-class="bg-blue-500/20"
        icon-color-class="text-blue-400"
        label="Bomba de riego"
        value="Activa"
        value-color-class="text-blue-400"
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

 