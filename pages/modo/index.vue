<template>
  <div class="space-y-8">
    <!-- Panel de información superior -->
    <div class="bg-gray-900/60 border border-gray-600/30 rounded-xl shadow-lg p-6 mb-8 hover:bg-gray-900/80 transition-colors">
      <h2 class="text-2xl font-bold text-white mb-6 flex items-center">
        <DashboardIcon />
        Estado del Sistema de Riego
      </h2>
      
      <!-- Primera fila - Estado del sistema -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <!-- Modo Actual -->
        <div class="bg-gray-600/60 border border-blue-500/30 p-4 rounded-lg hover:bg-gray-600/80 transition-colors">
          <div class="flex items-center justify-between mb-2">
            <h3 class="font-medium text-blue-400">Modo Actual</h3>
            <div :class="getCurrentModeColor()" class="w-3 h-3 rounded-full"></div>
          </div>
          <p class="text-2xl font-bold text-white">{{ currentModeDisplay }}</p>
        </div>

        <!-- Dispositivo Activo -->
        <div class="bg-gray-600/60 border border-blue-500/30 p-4 rounded-lg hover:bg-gray-600/80 transition-colors">
          <div class="flex items-center justify-between mb-2">
            <h3 class="font-medium text-blue-400">Dispositivo Activo</h3>
            <DeviceIcon />
          </div>
          <p class="text-2xl font-bold text-white">{{ activeDeviceName || '-' }}</p>
        </div>

        <!-- Cultivo en Riego -->
        <div class="bg-gray-600/60 border border-green-500/30 p-4 rounded-lg hover:bg-gray-600/80 transition-colors">
          <div class="flex items-center justify-between mb-2">
            <h3 class="font-medium text-green-400">Cultivo en Riego</h3>
            <PlantIcon />
          </div>
          <p class="text-2xl font-bold text-white">{{ selectedCropName || '-' }}</p>
        </div>

        <!-- Estado de la Bomba -->
        <div class="bg-gray-600/60 border border-purple-500/30 p-4 rounded-lg hover:bg-gray-600/80 transition-colors">
          <div class="flex items-center justify-between mb-2">
            <h3 class="font-medium text-purple-400">Estado Bomba</h3>
            <div :class="[
              irrigationStore.isPaused ? 'bg-yellow-500' : 
              irrigationStore.isWatering ? 'bg-green-500 animate-pulse' : 
              'bg-gray-400'
            ]" class="w-3 h-3 rounded-full"></div>
          </div>
          <p class="text-2xl font-bold text-white">
            {{ irrigationStore.isPaused ? 'Pausada' : irrigationStore.isWatering ? 'Activa' : 'Inactiva' }}
          </p>
        </div>
      </div>

      <!-- Segunda fila - Información de riego -->
      <div class="mt-6">
        <!-- Widgets normales para todos los modos -->
        <div v-if="irrigationStore.activeMode !== 'programmed'" class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="bg-gray-600/60 border border-gray-600/30 p-3 rounded-lg hover:bg-gray-600/80 transition-colors">
            <p class="text-sm text-gray-400">Último Riego</p>
            <p class="font-semibold text-white">{{ lastIrrigationFormatted || 'Nunca' }}</p>
          </div>
          <div class="bg-gray-600/60 border border-gray-600/30 p-3 rounded-lg hover:bg-gray-600/80 transition-colors">
            <p class="text-sm text-gray-400">Tiempo Restante</p>
            <p class="font-semibold text-white">{{ irrigationStore.remainingTime || '-' }}</p>
          </div>
          <div class="bg-gray-600/60 border border-gray-600/30 p-3 rounded-lg hover:bg-gray-600/80 transition-colors">
            <p class="text-sm text-gray-400">Próximo Riego</p>
            <p class="font-semibold text-white">{{ nextWatering || '-' }}</p>
          </div>
        </div>

        <!-- Widgets específicos para modo programado -->
        <div v-else class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div class="bg-gray-600/60 border border-gray-600/30 p-3 rounded-lg hover:bg-gray-600/80 transition-colors">
            <p class="text-sm text-gray-400">Último Riego</p>
            <p class="font-semibold text-white">{{ lastIrrigationFormatted || 'Nunca' }}</p>
          </div>
          
          <!-- Widget de tiempo restante (activo o hasta activación) -->
          <div class="bg-gray-600/60 border border-green-500/30 p-3 rounded-lg hover:bg-gray-600/80 transition-colors">
            <p class="text-sm text-green-400">
              {{ irrigationStore.isWatering ? 'Tiempo Restante' : 'Hasta Activación' }}
            </p>
            <p class="font-semibold text-white">{{ irrigationStore.remainingTime || '-' }}</p>
          </div>
          
          <!-- Widget de próxima ejecución -->
          <div class="bg-gray-600/60 border border-blue-500/30 p-3 rounded-lg hover:bg-gray-600/80 transition-colors">
            <p class="text-sm text-blue-400">Próxima Ejecución</p>
            <p class="font-semibold text-white text-xs">{{ irrigationStore.nextExecutionFormatted || '-' }}</p>
          </div>
          
          <!-- Widget de tiempo hasta próxima ejecución -->
          <div class="bg-gray-600/60 border border-purple-500/30 p-3 rounded-lg hover:bg-gray-600/80 transition-colors">
            <p class="text-sm text-purple-400">Tiempo Hasta Próximo</p>
            <p class="font-semibold text-white">{{ irrigationStore.timeUntilNextExecution || '-' }}</p>
          </div>
        </div>
      </div>

      <!-- Tercera fila - Sensores y caudal -->
      <div class="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <!-- Caudal en Curso -->
        <div class="bg-gray-600/60 border border-cyan-500/30 p-3 rounded-lg hover:bg-gray-600/80 transition-colors">
          <div class="flex items-center justify-between mb-2">
            <p class="text-sm text-gray-400">Caudal en Curso</p>
            <FlowIcon />
          </div>
          <p class="font-semibold text-white">{{ irrigationStore.isWatering ? flowRate + ' L/min' : '-' }}</p>
        </div>

        <!-- Temperatura Actual -->
        <div class="bg-gray-600/60 border border-red-500/30 p-3 rounded-lg hover:bg-gray-600/80 transition-colors">
          <div class="flex items-center justify-between mb-2">
            <p class="text-sm text-gray-400">Temperatura Actual</p>
            <ThermometerIcon />
          </div>
          <p class="font-semibold text-white">{{ currentTemperature || '-' }}</p>
          <p class="text-xs text-red-300">{{ currentTemperature ? '°C' : '' }}</p>
        </div>

        <!-- Humedad del Suelo Actual -->
        <div class="bg-gray-600/60 border border-blue-500/30 p-3 rounded-lg hover:bg-gray-600/80 transition-colors">
          <div class="flex items-center justify-between mb-2">
            <p class="text-sm text-gray-400">Humedad Suelo</p>
            <HumidityIcon />
          </div>
          <p class="font-semibold text-white">{{ currentSoilHumidity || '-' }}</p>
          <p class="text-xs text-blue-300">{{ currentSoilHumidity ? '%' : '' }}</p>
        </div>
        
        <!-- Humedad del Aire Actual -->
        <div class="bg-gray-600/60 border border-cyan-500/30 p-3 rounded-lg hover:bg-gray-600/80 transition-colors">
          <div class="flex items-center justify-between mb-2">
            <p class="text-sm text-gray-400">Humedad Aire</p>
            <HumidityIcon />
          </div>
          <p class="font-semibold text-white">{{ currentAirHumidity || '-' }}</p>
          <p class="text-xs text-cyan-300">{{ currentAirHumidity ? '%' : '' }}</p>
        </div>
      </div>
    </div>

    <!-- Selección de Modos -->
    <div class="bg-gray-900/60 border border-gray-600/30 rounded-xl shadow-lg p-6 hover:bg-gray-900/80 transition-colors">
      <h2 class="text-2xl font-bold text-white mb-6">Seleccionar Modo de Riego</h2>
      
      <!-- Mostrar configuración activa si existe -->
      <div v-if="irrigationStore.hasActiveMode" class="mb-6 p-4 bg-yellow-900/30 border border-yellow-500/30 rounded-lg">
        <div class="flex items-center justify-between">
          <div class="flex-1">
            <h3 class="font-semibold text-yellow-400">Modo {{ currentModeDisplay }} Configurado</h3>
            <p class="text-sm text-yellow-300">{{ irrigationStore.getModeDescription() }}</p>
            <div v-if="irrigationStore.isWatering || irrigationStore.isPaused" class="mt-2">
              <p class="text-sm text-yellow-200">
                Tiempo restante: <span class="font-bold">{{ irrigationStore.remainingTime }}</span>
                <span v-if="irrigationStore.isPaused" class="text-yellow-400 ml-2">(Pausado)</span>
              </p>
            </div>
            <div v-else-if="irrigationStore.activeMode === 'programado' && irrigationStore.remainingTime" class="mt-2">
              <p class="text-sm text-yellow-200">
                Tiempo hasta activación: <span class="font-bold">{{ irrigationStore.remainingTime }}</span>
              </p>
            </div>
            <div v-else-if="irrigationStore.activeMode === 'programado'" class="mt-2">
              <p class="text-sm text-yellow-200">
                El riego se activará automáticamente en la fecha programada
              </p>
            </div>
            
            <!-- Mensaje informativo para cancelar -->
            <div class="mt-3 p-3 bg-blue-900/30 border border-blue-500/30 rounded-lg">
              <div class="flex items-start space-x-2">
                <svg class="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <div>
                  <p class="text-sm text-blue-300 font-medium">Para cancelar o modificar:</p>
                  <p class="text-xs text-blue-200 mt-1">
                    <span v-if="irrigationStore.activeMode === 'manual'">Accede al <span class="font-semibold">Modo Manual</span> para detener el riego activo.</span>
                    <span v-else-if="irrigationStore.activeMode === 'programado'">Accede al <span class="font-semibold">Modo Programado</span> para cancelar la programación.</span>
                    <span v-else-if="irrigationStore.activeMode === 'automatico'">Accede al <span class="font-semibold">Modo Automático</span> para modificar la configuración.</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Modos disponibles -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Modo Manual -->
        <div 
          @click="selectMode('manual')"
          :class="[
            'group p-6 rounded-xl border-2 transition-all duration-300',
            irrigationStore.canAccessManualMode
              ? 'cursor-pointer bg-gray-800/60 border-blue-500/30 hover:border-blue-400 hover:bg-gray-800/80 transform hover:scale-105' 
              : 'cursor-not-allowed bg-gray-800/30 border-gray-600/20 opacity-50'
          ]"
        >
          <div class="text-center">
            <div class="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-600 transition-colors shadow-lg">
                          <ManualModeIcon />
            </div>
            <h3 class="text-xl font-bold text-white mb-2">Manual</h3>
            <p class="text-blue-300 text-sm">Control directo del riego con duración personalizada</p>
          </div>
        </div>

        <!-- Modo Programado -->
        <div 
          @click="selectMode('programado')"
          :class="[
            'group p-6 rounded-xl border-2 transition-all duration-300',
            irrigationStore.canAccessProgrammedMode
              ? 'cursor-pointer bg-gray-800/60 border-green-500/30 hover:border-green-400 hover:bg-gray-800/80 transform hover:scale-105' 
              : 'cursor-not-allowed bg-gray-800/30 border-gray-600/20 opacity-50'
          ]"
        >
          <div class="text-center">
            <div class="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-600 transition-colors shadow-lg">
                          <ProgrammedModeIcon />
            </div>
            <h3 class="text-xl font-bold text-white mb-2">Programado</h3>
            <p class="text-green-300 text-sm">Riego automático a horas específicas del día</p>
          </div>
        </div>

        <!-- Modo Automático -->
        <div 
          @click="selectMode('automatico')"
          :class="[
            'group p-6 rounded-xl border-2 transition-all duration-300',
            irrigationStore.canAccessAutomaticMode
              ? 'cursor-pointer bg-gray-800/60 border-purple-500/30 hover:border-purple-400 hover:bg-gray-800/80 transform hover:scale-105' 
              : 'cursor-not-allowed bg-gray-800/30 border-gray-600/20 opacity-50'
          ]"
        >
          <div class="text-center">
            <div class="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-600 transition-colors shadow-lg">
                          <AutomaticModeIcon />
            </div>
            <h3 class="text-xl font-bold text-white mb-2">Automático</h3>
            <p class="text-purple-300 text-sm">Riego basado en sensores de humedad y temperatura</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Configurar middleware
definePageMeta({
  middleware: ['auth', 'visitor-block']
})
import { useToastNotifications } from '~/composables/useToastNotifications'
import { useIrrigationModes } from '~/composables/useIrrigationModes'
import { useSensorData } from '~/composables/useSensorData'
import { useDeviceStore } from '~/stores/device'
import { useCropStore } from '~/stores/crop'
import { useUserStore } from '~/stores/user'
import { useIrrigationStore } from '~/stores/irrigation'
import {
  dashboardIcon as DashboardIcon,
  plantIcon as PlantIcon,
  wateringIcon as FlowIcon,
  ManualModeIcon,
  ProgrammedModeIcon,
  AutomaticModeIcon,
  devicesIcon as DeviceIcon,
  thermometerIcon as ThermometerIcon,
  humidityIcon as HumidityIcon
} from '~/assets/icons'
import SensorAPI from '~/api/SensorAPI.js'
import IrrigationAPI from '~/api/IrrigationAPI.js'

// Meta del documento
useHead({
  title: 'Modos de Riego - VIVANTIA',
  meta: [
    { name: 'description', content: 'Control y configuración de los modos de riego automático' }
  ]
})

// Sistema de modos de riego
const irrigationStore = useIrrigationStore()

// Stores
const deviceStore = useDeviceStore()
const cropStore = useCropStore()
const userStore = useUserStore()

// Composables
const { toast } = useToastNotifications()
const router = useRouter()
const { 
  realDataPoints, 
  startSimulation, 
  currentTemperature: sensorTemperature,
  currentSoilHumidity: sensorSoilHumidity,
  currentAirHumidity: sensorAirHumidity
} = useSensorData()

// Estados locales para datos de sensores (ya no se necesitan, se usan del composable)

// Estados locales para última fecha de riego
const lastIrrigationData = ref(null)
const isLoadingLastIrrigation = ref(false)

// Estados locales
const currentCrop = ref('Tomate Cherry')
const flowRate = ref(2.5)
const lastWatering = ref('Ayer 15:30')
const nextWatering = ref(null)

// Helper functions para toast
const showSuccess = (message) => toast.success(message)
const showError = (message) => toast.error(message)
const showWarning = (message) => toast.warning(message)

// Función para cargar último dato de sensor del dispositivo activo (ya no se necesita, se usa del composable)

// Función para cargar la última fecha de riego desde la base de datos
const loadLastIrrigationDate = async () => {
  if (!userStore.user?.id || userStore.isDemoMode) return
  
  try {
    isLoadingLastIrrigation.value = true
    console.log('💧 Cargando última fecha de riego para usuario:', userStore.user.id)
    
    const response = await IrrigationAPI.getLastIrrigationDate(userStore.user.id)
    
    if (response.success && response.data) {
      lastIrrigationData.value = response.data
      console.log('✅ Última fecha de riego cargada:', response.data)
    } else {
      console.log('❌ No se encontraron registros de riego')
      lastIrrigationData.value = null
    }
  } catch (error) {
    console.error('❌ Error cargando última fecha de riego:', error)
    lastIrrigationData.value = null
  } finally {
    isLoadingLastIrrigation.value = false
  }
}

// Computed para obtener el dispositivo activo
const activeDeviceName = computed(() => {
  const activeDevice = deviceStore.activeDevices[0]
  return activeDevice ? activeDevice.deviceName : null
})

// Computed para obtener el cultivo seleccionado
const selectedCropName = computed(() => {
  const selectedCrop = cropStore.crops.find(crop => crop.selected)
  return selectedCrop ? selectedCrop.name : null
})

// Computed para obtener temperatura y humedad más recientes desde el composable
const currentTemperature = computed(() => {
  if (sensorTemperature.value !== null && sensorTemperature.value !== undefined) {
    return Number(sensorTemperature.value).toFixed(1)
  }
  return null
})

const currentSoilHumidity = computed(() => {
  if (sensorSoilHumidity.value !== null && sensorSoilHumidity.value !== undefined) {
    return Number(sensorSoilHumidity.value).toFixed(1)
  }
  return null
})

const currentAirHumidity = computed(() => {
  if (sensorAirHumidity.value !== null && sensorAirHumidity.value !== undefined) {
    return Number(sensorAirHumidity.value).toFixed(1)
  }
  return null
})

// Computed
const currentModeDisplay = computed(() => {
  return irrigationStore.activeMode ? irrigationStore.activeMode.charAt(0).toUpperCase() + irrigationStore.activeMode.slice(1) : 'Apagado'
})

// Computed para determinar qué modos están disponibles
// Estas variables ahora vienen del irrigationStore

// Métodos
const getCurrentModeColor = () => {
  if (!irrigationStore.activeMode) return 'bg-gray-400'
  
  switch (irrigationStore.activeMode) {
    case 'manual': return 'bg-blue-500'
    case 'programado': return 'bg-green-500'
    case 'automatico': return 'bg-purple-500'
    default: return 'bg-gray-400'
  }
}

const selectMode = (mode) => {
  // Verificar si el modo está disponible según los computed del store
  let canAccess = false
  
  switch (mode) {
    case 'manual':
      canAccess = irrigationStore.canAccessManualMode
      break
    case 'programado':
      canAccess = irrigationStore.canAccessProgrammedMode
      break
    case 'automatico':
      canAccess = irrigationStore.canAccessAutomaticMode
      break
  }
  
  if (canAccess) {
    router.push(`/modo/${mode}`)
  } else {
    showError('No puedes cambiar de modo mientras hay uno activo. Cancela el riego actual primero.')
  }
}

// Watchers para asegurar que los cambios se reflejen en tiempo real
watch(irrigationStore.remainingTime, (newValue) => {
  console.log('remainingTime cambió a:', newValue)
  // Forzar la reactividad del tiempo restante
  if (newValue) {
    nextTick(() => {
      // El tiempo se actualizará automáticamente
    })
  }
})

// Watcher para monitorear cambios en los datos de sensores
watch(() => realDataPoints?.value, (newData) => {
  console.log('🔄 Datos de sensores actualizados:', newData?.length || 0)
  if (newData && newData.length > 0) {
    const latestData = newData[newData.length - 1]
    console.log('🔄 Último dato de sensores:', latestData)
    console.log('🌡️ Temperatura actual:', currentTemperature.value)
    console.log('💧 Humedad suelo actual:', currentSoilHumidity.value)
    console.log('💧 Humedad aire actual:', currentAirHumidity.value)
  }
}, { deep: true })

// Watcher para asegurar que el estado se mantenga sincronizado
watch(irrigationStore.hasActiveMode, (newValue) => {
  console.log('hasActiveMode cambió a:', newValue, 'activeMode:', irrigationStore.activeMode)
})

// Watcher para monitorear cambios en el estado de riego
watch(irrigationStore.isWatering, (newValue) => {
  console.log('isWatering cambió a:', newValue, 'activeMode:', irrigationStore.activeMode)
  // Forzar actualización de la UI
  nextTick(() => {
    // Trigger reactivity
  })
})

// Watcher para monitorear cambios en el modo activo
watch(irrigationStore.activeMode, (newValue) => {
  console.log('activeMode cambió a:', newValue, 'isWatering:', irrigationStore.isWatering)
  // Forzar actualización de la UI
  nextTick(() => {
    // Trigger reactivity
  })
})

// Watcher para monitorear cambios en el estado de pausa
watch(irrigationStore.isPaused, (newValue) => {
  console.log('isPaused cambió a:', newValue, 'isWatering:', irrigationStore.isWatering)
  // Forzar actualización de la UI
  nextTick(() => {
    // Trigger reactivity
  })
})

// Watcher para actualizar última fecha de riego cuando cambie el estado
watch(irrigationStore.isWatering, async (newValue, oldValue) => {
  // Si el riego se completó (pasó de true a false), actualizar última fecha
  if (oldValue === true && newValue === false) {
    console.log('💧 Riego completado, actualizando última fecha...')
    await loadLastIrrigationDate()
  }
})

// Watcher para actualizar última fecha cuando se complete un riego
watch(irrigationStore.lastIrrigation, async (newValue) => {
  if (newValue) {
    console.log('💧 Último riego actualizado en store, actualizando datos...')
    await loadLastIrrigationDate()
  }
})

// Observar cambios en el array de cultivos para actualizar automáticamente
watch(() => cropStore.crops, (newCrops) => {
  if (!userStore.isDemoMode) {
    console.log('🔄 Modo/index: Array de cultivos actualizado, cultivos:', newCrops.length)
    const selectedCrop = newCrops.find(crop => crop.selected)
    if (selectedCrop) {
      console.log('✅ Modo/index: Cultivo seleccionado detectado:', selectedCrop.name)
    }
  }
}, { deep: true })

// Observar cambios en el array de dispositivos para actualizar automáticamente
watch(() => deviceStore.devices, (newDevices) => {
  if (!userStore.isDemoMode) {
    console.log('🔄 Modo/index: Array de dispositivos actualizado, dispositivos:', newDevices.length)
    const activeDevice = deviceStore.activeDevices[0]
    if (activeDevice) {
      console.log('✅ Modo/index: Dispositivo activo detectado:', activeDevice.deviceName)
    }
  }
}, { deep: true })

// Watchers para datos reactivos
watch(() => deviceStore.activeDevices, (newDevices) => {
  console.log('📱 Dispositivos activos actualizados:', newDevices.length)
  console.log('📱 Dispositivo activo:', activeDeviceName.value)
}, { deep: true })

watch(() => cropStore.crops, (newCrops) => {
  console.log('🌱 Cultivos actualizados:', newCrops.length)
  console.log('🌱 Cultivo seleccionado:', selectedCropName.value)
}, { deep: true })

watch(() => realDataPoints?.value, (newData) => {
  console.log('🌡️ Datos de sensores actualizados:', newData?.length || 0)
  console.log('🌡️ Temperatura actual:', currentTemperature.value)
  console.log('💧 Humedad suelo actual:', currentSoilHumidity.value)
  console.log('💧 Humedad aire actual:', currentAirHumidity.value)
}, { deep: true })

// Computed para formatear la fecha del último riego
const lastIrrigationFormatted = computed(() => {
  if (!lastIrrigationData.value?.last_irrigation_at) return 'Nunca'
  
  try {
    const date = new Date(lastIrrigationData.value.last_irrigation_at)
    const now = new Date()
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60))
    const diffInDays = Math.floor(diffInHours / 24)
    
    // Formatear según el tiempo transcurrido
    if (diffInDays > 0) {
      if (diffInDays === 1) {
        return `Ayer ${date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}`
      } else if (diffInDays < 7) {
        return `Hace ${diffInDays} días`
      } else {
        return date.toLocaleDateString('es-ES', { 
          day: '2-digit', 
          month: '2-digit', 
          year: 'numeric' 
        }) + ' ' + date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
      }
    } else if (diffInHours > 0) {
      return `Hace ${diffInHours} hora${diffInHours > 1 ? 's' : ''}`
    } else {
      const diffInMinutes = Math.floor((now - date) / (1000 * 60))
      if (diffInMinutes > 0) {
        return `Hace ${diffInMinutes} minuto${diffInMinutes > 1 ? 's' : ''}`
      } else {
        return 'Ahora mismo'
      }
    }
  } catch (error) {
    console.error('Error formateando fecha de último riego:', error)
    return 'Fecha no disponible'
  }
})

// Limpiar intervalos al desmontar el componente
onUnmounted(() => {
  // irrigationStore.clearAllIntervals() // No se necesita llamar aquí, el composable lo maneja
})

// Cargar datos al montar el componente
onMounted(async () => {
  try {
    console.log('🔄 Cargando datos en modo/index.vue...')
    
    // Cargar configuración activa de riego
    await irrigationStore.loadActiveConfiguration()
    
    if (userStore.isDemoMode) {
      // Modo demo: no necesitamos cargar datos reales
      console.log('🎭 Modo demo activo en modo/index.vue')
    } else {
      // Modo real: cargar datos siguiendo el patrón de dashboard.vue
      console.log('📊 Modo real: Cargando datos reales')
      
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
        
        console.log('✅ Datos cargados en modo/index.vue - Cultivos:', cropStore.crops.length, 'Dispositivos:', deviceStore.devices.length)
        console.log('📱 Dispositivos activos:', deviceStore.activeDevices.length)
        console.log('🌱 Cultivo seleccionado:', selectedCropName.value)
        
        // Verificar datos de sensores
        console.log('🌡️ Datos de sensores iniciales:', realDataPoints.value?.length || 0)
        console.log('🌡️ Temperatura actual:', currentTemperature.value)
        console.log('💧 Humedad suelo actual:', currentSoilHumidity.value)
        console.log('💧 Humedad aire actual:', currentAirHumidity.value)
        
        // Inicializar datos de sensores
        console.log('🚀 Inicializando datos de sensores...')
        startSimulation()
        
        // Cargar última fecha de riego
        console.log('🚀 Cargando última fecha de riego...')
        await loadLastIrrigationDate()
        
        // Configurar actualización automática de última fecha de riego cada 30 segundos
        setInterval(async () => {
          if (!userStore.isDemoMode) {
            await loadLastIrrigationDate()
          }
        }, 30000)
      }
    }
    
  } catch (error) {
    console.error('❌ Error cargando datos en modo/index.vue:', error)
  }
})

// Ya no necesitamos simular el tiempo aquí, se maneja en el composable
</script> 