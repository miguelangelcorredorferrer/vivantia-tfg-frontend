

<template>
  <div class="space-y-8">
    <div class="max-w-2xl mx-auto">
      <!-- Widget de estado automático cuando está configurado pero no activo -->
      <div v-if="automaticConfig && !automaticConfig.is_active" class="bg-gray-800 rounded-xl shadow-lg p-6 mb-8 border border-gray-700">

        <h2 class="text-xl font-bold text-white mb-6">Modo Automático Configurado</h2>
        
        <div class="text-center space-y-6">
          <!-- Estado visual -->
          <div class="flex justify-center">
            <div class="w-24 h-24 bg-purple-500 rounded-full flex items-center justify-center shadow-lg">
              <AutomaticIcon />
            </div>
          </div>
          
          <!-- Información del modo automático -->
          <div class="bg-purple-900/30 border border-purple-700/50 rounded-lg p-4">
            <h3 class="font-semibold text-purple-300 mb-3">Configuración del Modo Automático</h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <p class="text-gray-400">Temperatura Máxima:</p>
                <p class="font-bold text-white">{{ getThresholdsFromConfig()?.maxTemperature || 0 }}°C</p>
              </div>
              <div>
                <p class="text-gray-400">Hum. Suelo Min:</p>
                <p class="font-bold text-white">{{ getThresholdsFromConfig()?.minSoilHumidity || 0 }}%</p>
              </div>
              <div>
                <p class="text-gray-400">Hum. Suelo Max:</p>
                <p class="font-bold text-white">{{ getThresholdsFromConfig()?.maxSoilHumidity || 0 }}%</p>
              </div>
              <div>
                <p class="text-gray-400">Hum. Aire Min:</p>
                <p class="font-bold text-white">{{ getThresholdsFromConfig()?.minAirHumidity || 0 }}%</p>
              </div>
              <div>
                <p class="text-gray-400">Hum. Aire Max:</p>
                <p class="font-bold text-white">{{ getThresholdsFromConfig()?.maxAirHumidity || 0 }}%</p>
              </div>
              <div>
                <p class="text-gray-400">Duración Máxima:</p>
                <p class="font-bold text-white">{{ getDurationFromConfig() }}</p>
              </div>
              <div>
                <p class="text-gray-400">Estado de la Configuración:</p>
                <p class="font-bold" :class="automaticConfig?.is_active ? 'text-green-400' : 'text-orange-400'">
                  {{ automaticConfig?.is_active ? 'Activa (Riego iniciado)' : 'Preparada (Esperando condiciones)' }}
                </p>
              </div>
            </div>
          </div>
          
          
          <!-- Botón de deshacer configuración -->
          <button
            @click="showCancelModal = true"
            class="w-full px-6 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold text-lg rounded-lg hover:from-red-600 hover:to-red-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            🗑️ Deshacer Configuración
          </button>
        </div>
      </div>

      <!-- Widget de riego activo cuando está regando -->
      <div v-if="automaticConfig?.is_active && isWatering && !isPaused" class="bg-gray-800 rounded-xl shadow-lg p-6 mb-8 border border-gray-700">

        <h2 class="text-xl font-bold text-white mb-6">Riego Automático Activo</h2>
        
        <div class="text-center space-y-6">
          <!-- Estado visual -->
          <div class="flex justify-center">
            <div class="w-24 h-24 bg-purple-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
              <WaterDropIcon />
            </div>
          </div>
          
          <!-- Información del riego -->
          <div class="bg-purple-900/30 border border-purple-700/50 rounded-lg p-4">
            <h3 class="font-semibold text-purple-300 mb-3">Información del Riego</h3>
            <div class="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p class="text-gray-400">Estado:</p>
                <p class="font-bold text-white">Bomba Activa</p>
              </div>
              <div>
                <p class="text-gray-400">Estado:</p>
                <p class="font-bold text-white">Riego Activo</p>
              </div>
            </div>
          </div>
          
          <!-- Botones de control -->
          <div class="space-y-3">
            <!-- Botón de parada de emergencia -->
            <button
              @click="pauseIrrigation"
              class="w-full px-6 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-bold text-lg rounded-lg hover:from-yellow-600 hover:to-yellow-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              ⏸️ Parada de Emergencia
            </button>
            
            <!-- Botón de cancelar -->
            <button
              @click="showCancelModal = true"
              class="w-full px-6 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold text-lg rounded-lg hover:from-red-600 hover:to-red-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              🛑 Cancelar Riego Automático
            </button>
          </div>
        </div>
      </div>

      <!-- Widget de riego pausado -->
      <div v-if="automaticConfig?.is_active && isPaused" class="bg-gray-800 rounded-xl shadow-lg p-6 mb-8 border border-gray-700">
        <!-- Debug info -->
        <div class="text-xs text-gray-500 mb-2">
          Debug: isAutomaticActive={{ isAutomaticActive }}, isWatering={{ isWatering }}, isPaused={{ isPaused }}, modeConfig={{ !!modeConfig }}
        </div>
        <h2 class="text-xl font-bold text-white mb-6">Riego Automático Pausado</h2>
        
        <div class="text-center space-y-6">
          <!-- Estado visual -->
          <div class="flex justify-center">
            <div class="w-24 h-24 bg-yellow-500 rounded-full flex items-center justify-center shadow-lg">
              <PauseIcon />
            </div>
          </div>
          
          <!-- Información del riego -->
          <div class="bg-purple-900/30 border border-purple-700/50 rounded-lg p-4">
            <h3 class="font-semibold text-purple-300 mb-3">Información del Riego</h3>
            <div class="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p class="text-gray-400">Estado:</p>
                <p class="font-bold text-white">Pausado</p>
              </div>
              <div>
                <p class="text-gray-400">Estado:</p>
                <p class="font-bold text-white">Riego Activo</p>
              </div>
            </div>
          </div>
          
          <!-- Botones de control -->
          <div class="space-y-3">
            <!-- Botón de reanudar -->
            <button
              @click="resumeIrrigation"
              class="w-full px-6 py-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-bold text-lg rounded-lg hover:from-purple-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              ▶️ Reanudar Riego
            </button>
            
            <!-- Botón de cancelar -->
            <button
              @click="showCancelModal = true"
              class="w-full px-6 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold text-lg rounded-lg hover:from-red-600 hover:to-red-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              🛑 Cancelar Riego Automático
            </button>
          </div>
        </div>
      </div>

      <!-- Título y descripción -->
      <div class="bg-gray-800 rounded-xl shadow-lg p-6 mb-8 border border-gray-700">
        <div class="flex items-center mb-4">
          <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mr-4 shadow-lg">
            <AutomaticIcon />
          </div>
          <div>
            <h1 class="text-2xl font-bold text-white">Modo Automático</h1>
            <p class="text-gray-300">Riego inteligente basado en sensores</p>
          </div>
        </div>
        
        <div class="bg-purple-900/30 border border-purple-700/50 rounded-lg p-4">
          <h3 class="font-semibold text-purple-300 mb-2">¿Cómo funciona el modo automático?</h3>
          <ul class="text-sm text-purple-200 space-y-1">
            <li>• Monitorea la humedad del suelo en tiempo real</li>
            <li>• Activa el riego solo cuando el suelo está seco (bajo del umbral mínimo)</li>
            <li>• Desactiva el riego cuando el suelo alcanza humedad óptima o se satura</li>
            <li>• Evita el desperdicio de agua con precisión máxima</li>
          </ul>
        </div>
        
        <!-- Advertencia de tiempo de respuesta -->
        <div class="bg-yellow-900/30 border border-yellow-500/30 rounded-lg p-4 mt-4">
          <h3 class="font-semibold text-yellow-400 mb-2">⚠️ Advertencia Importante</h3>
          <p class="text-sm text-yellow-300">
            <strong>Tiempo de respuesta del sistema:</strong> La bomba puede tardar entre 2-15 segundos en activarse al iniciar el riego y entre 2-15 segundos en detenerse al cancelar o pausar. Este tiempo es normal debido a la comunicación LoRaWAN con el dispositivo IoT.
          </p>
        </div>
      </div>

      <!-- Estado actual de sensores -->
      <div class="bg-gray-800 rounded-xl shadow-lg p-6 mb-8 border border-gray-700">
        <h2 class="text-xl font-bold text-white mb-4">Estado Actual de Sensores</h2>
          <div v-if="lastSensorUpdate" class="text-xs text-gray-400 mb-4">
            Última actualización: {{ new Date(lastSensorUpdate).toLocaleString('es-ES') }}
          </div>
          <div v-if="lastSensorUpdate" class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- Temperatura -->
          <div class="bg-gradient-to-br from-red-900/30 to-orange-900/30 p-4 rounded-lg border border-red-700/50">
            <div class="flex items-center justify-between mb-2">
              <h3 class="font-medium text-red-300">Temperatura</h3>
              <ThermometerIcon class="text-gray-300" />
            </div>
            <p class="text-3xl font-bold text-red-200">{{ currentTemperature.toFixed(1) }}°C</p>
            <p class="text-sm text-red-300 mt-1">{{ getTemperatureStatus() }}</p>
          </div>

          <!-- Humedad del Suelo -->
          <div class="bg-gradient-to-br from-blue-900/30 to-blue-800/30 p-4 rounded-lg border border-blue-700/50">
                      <div class="flex items-center justify-between mb-2">
            <h3 class="font-medium text-blue-300">Humedad Suelo</h3>
            <HumidityIcon class="text-gray-300" />
          </div>
            <p class="text-3xl font-bold text-blue-200">{{ currentSoilHumidity.toFixed(1) }}%</p>
            <p class="text-sm text-blue-300 mt-1">{{ getSoilHumidityStatus() }}</p>
          </div>
          
          <!-- Humedad del Aire -->
          <div class="bg-gradient-to-br from-cyan-900/30 to-teal-900/30 p-4 rounded-lg border border-cyan-700/50">
                      <div class="flex items-center justify-between mb-2">
            <h3 class="font-medium text-cyan-300">Humedad Aire</h3>
            <HumidityIcon class="text-gray-300" />
          </div>
            <p class="text-3xl font-bold text-cyan-200">{{ currentAirHumidity.toFixed(1) }}%</p>
            <p class="text-sm text-cyan-300 mt-1">{{ getAirHumidityStatus() }}</p>
          </div>
        </div>
          <div v-else class="text-center text-gray-400 py-8">
            <p>📡 Cargando datos de sensores...</p>
            <p class="text-sm mt-2">Asegúrate de que tu dispositivo IoT esté enviando datos.</p>
        </div>
      </div>

      <!-- Formulario de configuración -->
      <div class="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700">
        <h2 class="text-xl font-bold text-white mb-6">Configurar Umbrales Automáticos</h2>
        
        <form @submit.prevent="confirmConfiguration" class="space-y-6">
          

          

          <!-- Información de funcionamiento automático -->
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">
              Funcionamiento Automático
            </label>
            
            <!-- Condiciones de Activación -->
            <div class="bg-red-900/30 border border-red-700/50 rounded-lg p-4 mb-4">
              <div class="flex items-center space-x-3 mb-3">
                <div class="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                  <span class="text-white text-lg">🚨</span>
                </div>
                <h4 class="font-medium text-red-300">¿Cuándo se ACTIVA el riego?</h4>
              </div>
              <p class="text-sm text-red-200 mb-3">
                El riego se inicia automáticamente cuando se cumple <strong>UNA</strong> condición:
              </p>
              <div class="grid grid-cols-1 gap-3">
                <div class="bg-red-800/30 border border-red-600/50 rounded-lg p-3">
                  <div class="flex items-center space-x-2 mb-2">
                    
                    <span class="text-xs font-semibold text-red-300">Suelo Seco</span>
                  </div>
                  <p class="text-xs text-red-200">
                    Cuando la humedad del suelo baja de <strong>{{ thresholds.minSoilHumidity }}%</strong>
                  </p>
                </div>
              </div>
            </div>

            <!-- Condiciones de Desactivación -->
            <div class="bg-green-900/30 border border-green-700/50 rounded-lg p-4 mb-4">
              <div class="flex items-center space-x-3 mb-3">
                <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <span class="text-white text-lg">✅</span>
                </div>
                <h4 class="font-medium text-green-300">¿Cuándo se DESACTIVA el riego?</h4>
              </div>
              <p class="text-sm text-green-200 mb-3">
                El riego se detiene automáticamente cuando <strong>UNA</strong> de estas condiciones:
              </p>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div class="bg-green-800/30 border border-green-600/50 rounded-lg p-3">
                  <div class="flex items-center space-x-2 mb-2">
                    
                    <span class="text-xs font-semibold text-green-300">Suelo en Rango Óptimo</span>
                  </div>
                  <p class="text-xs text-green-200">
                    Cuando la humedad está entre <strong>{{ thresholds.minSoilHumidity }}%</strong> y <strong>{{ thresholds.maxSoilHumidity }}%</strong>
                  </p>
                </div>
                
                <div class="bg-green-800/30 border border-green-600/50 rounded-lg p-3">
                  <div class="flex items-center space-x-2 mb-2">
                    
                    <span class="text-xs font-semibold text-green-300">Suelo Demasiado Húmedo</span>
                  </div>
                  <p class="text-xs text-green-200">
                    Cuando la humedad supera <strong>{{ thresholds.maxSoilHumidity }}%</strong>
                  </p>
                </div>
              </div>
            </div>

            
          </div>



          <!-- Vista previa de configuración -->
          <div class="bg-purple-900/30 border border-purple-700/50 rounded-lg p-4">
            <h3 class="font-medium text-purple-300 mb-2">Vista Previa de Configuración</h3>
            <div class="text-sm text-purple-200 space-y-1">
              <p><strong>Temperatura máxima:</strong> {{ thresholds.maxTemperature }}°C</p>
              <p><strong>Humedad suelo objetivo:</strong> {{ thresholds.minSoilHumidity }}% - {{ thresholds.maxSoilHumidity }}%</p>
              <p><strong>Humedad aire objetivo:</strong> {{ thresholds.minAirHumidity }}% - {{ thresholds.maxAirHumidity }}%</p>
              <p><strong>Cultivo seleccionado:</strong> {{ selectedCrop?.name || 'Ninguno' }}</p>
              <p><strong>Dispositivo activo:</strong> {{ activeDevice?.device_name || 'Ninguno' }}</p>
              <p><strong>Estado actual:</strong> {{ getCurrentConditionStatus() }}</p>
            </div>
          </div>

          <!-- Botones de acción -->
          <div class="flex space-x-4">
            <button
              type="submit"
              :disabled="!isValidConfiguration()"
              class="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-medium rounded-lg hover:from-purple-700 hover:to-purple-800 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed transition-all duration-200 shadow-lg"
            >
              Guardar Configuración
            </button>
            <button
              type="button"
              @click="goBack"
              class="px-6 py-3 bg-gray-600 text-gray-300 font-medium rounded-lg hover:bg-gray-700 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal de confirmación -->
    <div v-if="showConfirmModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" @click="closeConfirmModal">
      <div class="bg-gray-800 p-6 rounded-xl max-w-md w-full mx-4 border border-gray-700" @click.stop>
        <div class="text-center">
          <div class="w-16 h-16 bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4 border border-purple-700/50">
            <AutomaticConfirmIcon />
          </div>
          <h3 class="text-lg font-bold text-white mb-2">Confirmar Configuración Automática</h3>
          <p class="text-gray-300 mb-6">
            ¿Estás seguro de que quieres configurar el modo automático con estos parámetros?
            <br><br>
            <strong>Temperatura máxima:</strong> {{ thresholds.maxTemperature }}°C<br>
            <strong>Humedad suelo:</strong> {{ thresholds.minSoilHumidity }}% - {{ thresholds.maxSoilHumidity }}%<br>
            <strong>Humedad aire:</strong> {{ thresholds.minAirHumidity }}% - {{ thresholds.maxAirHumidity }}%<br>
            <strong>Funcionamiento:</strong> Automático (basado en sensores)
          </p>
          <div class="flex space-x-4">
            <button 
              @click="saveAutomaticConfiguration"
              class="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-200"
            >
              Confirmar Configuración
            </button>
            <button 
              @click="closeConfirmModal"
              class="flex-1 px-4 py-2 bg-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de cancelación -->
    <div v-if="showCancelModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" @click="closeCancelModal">
      <div class="bg-gray-800 border border-gray-600/30 p-6 rounded-xl max-w-md w-full mx-4" @click.stop>
        <div class="text-center">
          <div class="w-16 h-16 bg-red-900/60 border border-red-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <WarningIcon />
          </div>
          <h3 class="text-lg font-bold text-white mb-2">Cancelar Configuración Automática</h3>
          <p class="text-gray-300 mb-6">
            ¿Estás seguro de que quieres cancelar la configuración automática?
            <br><br>
            <strong class="text-red-400">El sistema dejará de monitorear los sensores automáticamente.</strong>
          </p>
          <div class="flex space-x-4">
            <button 
              @click="handleCancelAutomaticMode"
              class="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Sí, Cancelar Configuración
            </button>
            <button 
              @click="closeCancelModal"
              class="flex-1 px-4 py-2 bg-gray-600 text-gray-200 rounded-lg hover:bg-gray-500 transition-colors"
            >
              No, Mantener
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Configurar middleware
definePageMeta({
  middleware: ['auth', 'visitor-block', 'crop-required']
})

import { useToastNotifications } from '~/composables/useToastNotifications'
import { useCropStore } from '~/stores/crop'
import { useDeviceStore } from '~/stores/device'
import { useUserStore } from '~/stores/user'
import { useIrrigationStore } from '~/stores/irrigation'
import { useSensorData } from '~/composables/useSensorData.js'
import IrrigationAPI from '~/api/IrrigationAPI'
import SensorAPI from '~/api/SensorAPI'
import {
  HomeIcon,
  ChevronRightIcon,
  AutomaticIcon,
  ThermometerIcon,
  HumidityIcon,
  AutomaticConfirmIcon,
  CheckIcon,
  PauseIcon,
  WarningIcon,
  WaterDropIcon
} from '~/assets/icons'

// Stores
const cropStore = useCropStore()
const deviceStore = useDeviceStore()
const userStore = useUserStore()
const irrigationStore = useIrrigationStore()

// Usar composable de datos de sensores
const {
  currentTemperature, 
  currentSoilHumidity, 
  currentAirHumidity,
  realDataPoints
} = useSensorData()

// Composables
const { showSuccess, showError, showWarning } = useToastNotifications()
const router = useRouter()

// Estados reactivos
const automaticConfig = ref(null)
const isWatering = ref(false)
const isPaused = ref(false)
const isActivating = ref(false)
const showCancelModal = ref(false)
const showConfirmModal = ref(false)

// Computed properties para datos del cultivo y dispositivo
const selectedCrop = computed(() => {
  return cropStore.crops.find(crop => crop.selected) || null
})

const activeDevice = computed(() => {
  return deviceStore.devices.find(device => device.is_active_communication) || null
})

// Configuración de umbrales (inicializa con datos del cultivo)
const thresholds = ref({
  maxTemperature: 28,
  minSoilHumidity: 30,
  maxSoilHumidity: 70,
  minAirHumidity: 40,
  maxAirHumidity: 80
})

// Computed adicional para último timestamp (del composable)
const lastSensorUpdate = computed(() => {
  if (realDataPoints.value && realDataPoints.value.length > 0) {
    const lastPoint = realDataPoints.value[realDataPoints.value.length - 1]
    return lastPoint.received_at
  }
  return null
})



// Métodos para manejo de datos de sensores




const checkAutomaticStatus = async () => {
  if (userStore.isDemoMode) return
  
  try {
    console.log('🔄 Verificando estado automático...')
    const response = await IrrigationAPI.getAutomaticConfigStatus(userStore.user.id)
    
    if (response.success && response.data) {
      automaticConfig.value = response.data
      isWatering.value = response.data.pump_status === 'active'
      isPaused.value = response.data.pump_status === 'paused'
      
      // Actualizar store de irrigación
      irrigationStore.activeMode = 'automatic'
      irrigationStore.irrigationConfig = response.data
      
      // Configuración activa detectada
      if (automaticConfig.value) {
        console.log('✅ Configuración automática activa encontrada')
        
        // ✅ ESTADO AUTOMÁTICO: Si se detecta que el riego se activó automáticamente
        if (response.data.is_active && response.data.pump_status === 'active') {
          console.log('✅ Riego automático detectado - estado actualizado reactivamente')
          // NO RECARGAR - El estado ya se actualizó arriba en las líneas 629-631
        }
      }
      
      console.log('✅ Estado automático cargado:', response.data)
    } else if (response.isNotFound) {
      // 404 esperado - no hay configuración automática activa
      automaticConfig.value = null
      isWatering.value = false
      isPaused.value = false
      irrigationStore.activeMode = null
      irrigationStore.irrigationConfig = null
      console.log('ℹ️ No hay configuración automática activa (respuesta normal)')
    } else {
      // Otro tipo de respuesta no exitosa
      automaticConfig.value = null
      isWatering.value = false
      isPaused.value = false
      irrigationStore.activeMode = null
      irrigationStore.irrigationConfig = null
      console.log('ℹ️ No hay configuración automática activa')
    }
  } catch (error) {
    // Si es un 404, significa que no hay configuración activa (es normal)
    if (error.status === 404 || error.statusCode === 404) {
      console.log('ℹ️ No hay configuración automática activa (404 es normal)')
      automaticConfig.value = null
      isWatering.value = false
      isPaused.value = false
      irrigationStore.activeMode = null
      irrigationStore.irrigationConfig = null
    } else {
      console.error('❌ Error verificando estado automático:', error)
      // Error real - también limpiar estado
      automaticConfig.value = null
      isWatering.value = false
      isPaused.value = false
      irrigationStore.activeMode = null
      irrigationStore.irrigationConfig = null
    }
  }
}

// Métodos
const getTemperatureStatus = () => {
  if (currentTemperature.value >= thresholds.value.maxTemperature) {
    return 'Temperatura alta - Riego recomendado'
  } else if (currentTemperature.value >= thresholds.value.maxTemperature - 2) {
    return 'Temperatura en aumento'
  }
  return 'Temperatura normal'
}

const getSoilHumidityStatus = () => {
  if (currentSoilHumidity.value <= thresholds.value.minSoilHumidity) {
    return 'Humedad suelo baja - Riego recomendado'
  } else if (currentSoilHumidity.value >= thresholds.value.maxSoilHumidity) {
    return 'Humedad suelo alta - Riego no necesario'
  }
  return 'Humedad suelo en rango óptimo'
}

const getAirHumidityStatus = () => {
  if (currentAirHumidity.value <= thresholds.value.minAirHumidity) {
    return 'Humedad aire baja'
  } else if (currentAirHumidity.value >= thresholds.value.maxAirHumidity) {
    return 'Humedad aire alta'
  }
  return 'Humedad aire en rango óptimo'
}

const getCurrentConditionStatus = () => {
  const tempNeedsWater = currentTemperature.value >= thresholds.value.maxTemperature
  const soilHumidityNeedsWater = currentSoilHumidity.value <= thresholds.value.minSoilHumidity
  const airHumidityNeedsWater = currentAirHumidity.value <= thresholds.value.minAirHumidity
  
  if (tempNeedsWater && (soilHumidityNeedsWater || airHumidityNeedsWater)) {
    return 'Se activaría el riego ahora'
  } else if (tempNeedsWater || soilHumidityNeedsWater || airHumidityNeedsWater) {
    return 'Condiciones cercanas al umbral'
  }
  return 'Condiciones estables - Sin riego necesario'
}

// Función para cargar umbrales desde el cultivo seleccionado
const loadCropThresholds = () => {
  if (selectedCrop.value) {
    thresholds.value = {
      maxTemperature: selectedCrop.value.temperature_max || 28,
      minSoilHumidity: selectedCrop.value.soil_humidity_min || 30,
      maxSoilHumidity: selectedCrop.value.soil_humidity_max || 70,
      minAirHumidity: selectedCrop.value.air_humidity_min || 40,
      maxAirHumidity: selectedCrop.value.air_humidity_max || 80
    }
    console.log('🌱 Umbrales cargados desde cultivo:', thresholds.value)
  }
}

const isValidConfiguration = () => {
  return (
    thresholds.value.maxTemperature > 0 &&
    thresholds.value.minSoilHumidity >= 0 &&
    thresholds.value.maxSoilHumidity > thresholds.value.minSoilHumidity &&
    thresholds.value.minAirHumidity >= 0 &&
    thresholds.value.maxAirHumidity > thresholds.value.minAirHumidity &&
    selectedCrop.value && activeDevice.value // Validar que haya cultivo y dispositivo
  )
}

const confirmConfiguration = () => {
  if (!isValidConfiguration()) {
    showError('Por favor, verifica que todos los valores sean válidos')
    return
  }
  
  if (thresholds.value.minSoilHumidity >= thresholds.value.maxSoilHumidity) {
    showError('La humedad del suelo mínima debe ser menor que la máxima')
    return
  }
  
  if (thresholds.value.minAirHumidity >= thresholds.value.maxAirHumidity) {
    showError('La humedad del aire mínima debe ser menor que la máxima')
    return
  }
  
  showConfirmModal.value = true
}

const saveAutomaticConfiguration = async () => {
  console.log('saveAutomaticConfiguration llamado')
  
  // Cerrar el modal de confirmación INMEDIATAMENTE
  showConfirmModal.value = false
  isActivating.value = true
  
  try {
    // Configuración del modo automático (sin duración, se basa en sensores)
    const configData = {
      user_id: userStore.user.id,
      crop_id: selectedCrop.value.id
    }
    
    console.log('🟢 Guardando configuración automática:', configData)
    
    // Crear configuración automática usando la nueva API
    const response = await IrrigationAPI.createSimpleAutomaticConfig(configData)
    
    if (response.success) {
      automaticConfig.value = response.data
      
      // ✅ CRÍTICO: Actualizar store para bloquear otros modos
      // Incluso si is_active=false (preparada), el modo automático debe bloquear otros
      irrigationStore.activeMode = 'automatic'
      irrigationStore.irrigationConfig = response.data
      
      showSuccess('Modo automático configurado exitosamente')
      console.log('✅ Configuración automática guardada y otros modos bloqueados:', response.data)
      console.log('🔒 Modo automático activo en store - otros modos bloqueados')
      
    } else {
      showError(response.message || 'Error al guardar configuración automática')
    }
  } catch (error) {
    console.error('❌ Error guardando configuración automática:', error)
    showError('Error al guardar configuración automática')
  } finally {
    isActivating.value = false
  }
}

const goBack = () => {
  router.push('/modo')
}

// Funciones para pausar y reanudar riego automático
const pauseIrrigation = async () => {
  try {
    if (!automaticConfig.value) return
    
    // Usar la API de pump activations para pausar
    const response = await $fetch(`/api/irrigation/pump-activation/${automaticConfig.value.pump_activation_id}/pause`, {
      method: 'PUT',
      baseURL: 'http://localhost:3001',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userStore.token}`
      }
    })
    
    if (response.success) {
      isPaused.value = true
      isWatering.value = false
      showSuccess('Riego automático pausado')
    }
  } catch (error) {
    console.error('Error pausando riego:', error)
    showError('Error al pausar el riego')
  }
}

const resumeIrrigation = async () => {
  try {
    if (!automaticConfig.value) return
    
    // Usar la API de pump activations para reanudar
    const response = await $fetch(`/api/irrigation/pump-activation/${automaticConfig.value.pump_activation_id}/resume`, {
      method: 'PUT',
      baseURL: 'http://localhost:3001',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userStore.token}`
      }
    })
    
    if (response.success) {
      isPaused.value = false
      isWatering.value = true
      showSuccess('Riego automático reanudado')
    }
  } catch (error) {
    console.error('Error reanudando riego:', error)
    showError('Error al reanudar el riego')
  }
}

// Función triggerAutomaticWatering implementada más abajo

const handleCancelAutomaticMode = async () => {
  console.log('handleCancelAutomaticMode llamado')
  
  try {
    // Cancelar el modo automático usando la nueva API
    const response = await IrrigationAPI.cancelAutomaticConfig(userStore.user.id)
    
    if (response.success) {
      // Limpiar estado local
      automaticConfig.value = null
      isWatering.value = false
      isPaused.value = false
      
      // Actualizar store de irrigación
      irrigationStore.activeMode = null
      irrigationStore.irrigationConfig = null
      
    showSuccess('Configuración automática cancelada')
      console.log('✅ Configuración automática cancelada')
    
    // Cerrar el modal
    showCancelModal.value = false
    
    // Redirigir a la página principal después de un breve delay
    setTimeout(() => {
      router.push('/modo')
    }, 500)
    } else if (response.isNotFound) {
      // 404 - No hay configuración para cancelar (es normal)
      console.log('ℹ️ No hay configuración automática para cancelar')
      
      // Limpiar estado de todos modos
      automaticConfig.value = null
      isWatering.value = false
      isPaused.value = false
      irrigationStore.activeMode = null
      irrigationStore.irrigationConfig = null
      
      showSuccess('No hay configuración activa')
      showCancelModal.value = false
      
      setTimeout(() => {
        router.push('/modo')
      }, 500)
    } else {
      showError(response.message || 'Error al cancelar configuración automática')
    }
  } catch (error) {
    console.error('❌ Error al cancelar configuración:', error)
    showError('Error al cancelar la configuración')
  }
}

const closeCancelModal = () => {
  console.log('closeCancelModal llamado')
  try {
    // Cerrar el modal
    showCancelModal.value = false
    console.log('Modal cerrado exitosamente')
  } catch (error) {
    console.error('Error al cerrar modal:', error)
  }
}

const closeConfirmModal = () => {
  console.log('closeConfirmModal llamado')
  try {
    // Cerrar el modal de confirmación
    showConfirmModal.value = false
    console.log('Modal de confirmación cerrado exitosamente')
  } catch (error) {
    console.error('Error al cerrar modal de confirmación:', error)
  }
}

// Función para simular activación automática
const triggerAutomaticWatering = async () => {
  if (userStore.isDemoMode) {
    showWarning('La simulación no está disponible en modo demo')
    return
  }
  
  if (!automaticConfig.value) {
    showError('No hay configuración automática guardada')
    return
  }
  
  if (!activeDevice.value) {
    showError('No hay dispositivo activo')
    return
  }
  
  try {
    console.log('🧪 Iniciando simulación de activación automática...')
    
    // 1. Obtener umbrales del cultivo
    const thresholds = getThresholdsFromConfig()
    console.log('📊 Umbrales del cultivo:', thresholds)
    
    // 2. Crear datos de simulación que GARANTIZAN activación
    // Para activar necesitamos: temp > max OR soil < min OR air < min
    const simulationData = {
      device_id: activeDevice.value.id,
      temperature: parseFloat(thresholds.maxTemperature) + 2,  // +2°C sobre máximo (GARANTIZA activación)
      air_humidity: parseFloat(thresholds.minAirHumidity) - 5, // -5% bajo mínimo (GARANTIZA activación)
      // Para humedad suelo: si min es 0, usar -1 para que sea menor que 0
      soil_humidity: Math.max(parseFloat(thresholds.minSoilHumidity) - 5, -1) // Garantizar que sea menor que mínimo
    }
    
    console.log('🧪 Datos de simulación:', simulationData)
    console.log(`   - Temp: ${simulationData.temperature}°C (máx: ${thresholds.maxTemperature}°C)`)
    console.log(`   - Aire: ${simulationData.air_humidity}% (mín: ${thresholds.minAirHumidity}%)`)
    console.log(`   - Suelo: ${simulationData.soil_humidity}% (mín: ${thresholds.minSoilHumidity}%)`)
    
    // 3. Insertar datos en la base de datos usando SensorAPI
    console.log('💾 Insertando datos de simulación...')
    const insertResponse = await SensorAPI.create({
      device_id: simulationData.device_id,
      temperature: simulationData.temperature,
      air_humidity: simulationData.air_humidity,
      soil_humidity: simulationData.soil_humidity
    })
    
    console.log('✅ Datos insertados:', insertResponse)
    
    // 4. Llamar directamente al endpoint simple para activar el riego
    console.log('🤖 Activando riego automático directamente...')
    const evaluationResponse = await IrrigationAPI.toggleAutomaticPump(userStore.user.id, 'activate')
    
    console.log('✅ Evaluación completada:', evaluationResponse)
    
    // 5. Verificar el resultado
    if (evaluationResponse.success && evaluationResponse.data.pumpStatus === 'active') {
      showSuccess('¡Simulación exitosa! Riego automático activado')
      console.log('✅ Riego activado correctamente')
      console.log('🚰 Estado del riego:', evaluationResponse.data)
      
      // Actualizar estado local
      automaticConfig.value = {
        ...automaticConfig.value,
        is_active: evaluationResponse.data.configActive
      }
      isWatering.value = evaluationResponse.data.pumpStatus === 'active'
      
      // NO RECARGAR - Actualizar estado automáticamente
      // El estado se actualizará en la próxima verificación automática
      setTimeout(() => {
        checkAutomaticStatus()
      }, 1000)
    } else {
      showWarning('Datos insertados correctamente pero las condiciones no activaron el riego')
      console.log('⚠️ Datos insertados pero condiciones no cumplidas:')
      console.log('📊 Última lectura:', evaluationResponse.data?.latestReading)
      console.log('🚰 Estado:', evaluationResponse.data?.result)
    }
    
  } catch (error) {
    console.error('❌ Error en simulación:', error)
    showError('Error al simular activación: ' + error.message)
  }
}

// Funciones para obtener información desde la configuración guardada
const getThresholdsFromConfig = () => {
  if (!automaticConfig.value) {
    return {
      maxTemperature: selectedCrop.value?.temperature_max || 0,
      minSoilHumidity: selectedCrop.value?.soil_humidity_min || 0,
      maxSoilHumidity: selectedCrop.value?.soil_humidity_max || 0,
      minAirHumidity: selectedCrop.value?.air_humidity_min || 0,
      maxAirHumidity: selectedCrop.value?.air_humidity_max || 0
    }
  }
  
  return {
    maxTemperature: automaticConfig.value.temperature_max || selectedCrop.value?.temperature_max || 0,
    minSoilHumidity: automaticConfig.value.soil_humidity_min || selectedCrop.value?.soil_humidity_min || 0,
    maxSoilHumidity: automaticConfig.value.soil_humidity_max || selectedCrop.value?.soil_humidity_max || 0,
    minAirHumidity: automaticConfig.value.air_humidity_min || selectedCrop.value?.air_humidity_min || 0,
    maxAirHumidity: automaticConfig.value.air_humidity_max || selectedCrop.value?.air_humidity_max || 0
  }
}

const getDurationFromConfig = () => {
  // En modo automático no hay duración fija - se basa en sensores
  return 'Automático (basado en sensores)'
}

// Lifecycle hooks
onMounted(async () => {
  try {
    console.log('🚀 Inicializando página modo automático...')
    
    // Cargar datos de stores si no están cargados
    if (cropStore.crops.length === 0) {
      await cropStore.fetchAllUserCrops(userStore.user.id)
    }
    if (deviceStore.devices.length === 0) {
      await deviceStore.fetchUserDevice(userStore.user.id)
    }
    
    // Cargar umbrales desde el cultivo seleccionado
    loadCropThresholds()
    
    // CRÍTICO: Cargar configuración activa para establecer activeMode
    await irrigationStore.loadActiveConfiguration()
    
    // Verificar estado de configuración automática existente
    await checkAutomaticStatus()
    
    // Configurar chequeo periódico cada 30 segundos para detectar cambios automáticos
    const statusInterval = setInterval(async () => {
      try {
        await checkAutomaticStatus()
      } catch (error) {
        console.error('Error en chequeo periódico:', error)
      }
    }, 30000) // 30 segundos
    
    // Limpiar intervalo al desmontar
    onUnmounted(() => {
      if (statusInterval) {
        clearInterval(statusInterval)
      }
    })
    
    // Los datos de sensores se cargan automáticamente por el composable useSensorData
    console.log('📊 Datos de sensores gestionados por composable')
    
    console.log('✅ Página modo automático inicializada')
  } catch (error) {
    console.error('❌ Error en onMounted:', error)
  }
})

// Watcher para monitorear cambios en el cultivo seleccionado
watch(selectedCrop, (newCrop) => {
  if (newCrop) {
    loadCropThresholds()
  }
}, { immediate: true })

// Watcher para monitorear cambios en automaticConfig
watch(automaticConfig, (newConfig) => {
  console.log('automaticConfig cambió:', !!newConfig)
  if (newConfig) {
    console.log('✅ Configuración automática activa detectada')
  }
}, { deep: true })

// Watcher para detectar activación automática de riego (sin intervención del usuario)
watch(() => irrigationStore.isWatering, (newValue, oldValue) => {
  // Solo mostrar toast si cambió de false a true (activación)
  if (!oldValue && newValue && irrigationStore.activeMode === 'automatic') {
    console.log('🤖 [AUTO] Riego activado automáticamente detectado')
    showInfo('🤖 Riego automático activado por condiciones ambientales')
  }
  // Solo mostrar toast si cambió de true a false (desactivación)
  else if (oldValue && !newValue && irrigationStore.activeMode === 'automatic') {
    console.log('🤖 [AUTO] Riego desactivado automáticamente detectado')
    showSuccess('✅ Riego automático desactivado - condiciones óptimas alcanzadas')
  }
}, { immediate: false }) // No ejecutar en el primer render

// Sistema de monitoreo para mantener el modal activo
let statusMonitoringInterval = null

const startStatusMonitoring = () => {
  if (statusMonitoringInterval) {
    clearInterval(statusMonitoringInterval)
  }
  
  // Actualizar inmediatamente
  irrigationStore.loadActiveConfiguration()
  
  statusMonitoringInterval = setInterval(async () => {
    if (irrigationStore.irrigationConfig?.id) {
      await irrigationStore.loadActiveConfiguration()
    }
  }, 3000) // Cada 3 segundos
  
  console.log('✅ [AUTO] Monitoreo de estado iniciado')
}

const stopStatusMonitoring = () => {
  if (statusMonitoringInterval) {
    clearInterval(statusMonitoringInterval)
    statusMonitoringInterval = null
    console.log('🛑 [AUTO] Monitoreo de estado detenido')
  }
}

// Watcher para monitorear el estado de riego y gestionar el monitoreo
watch(isWatering, (newValue) => {
  console.log('isWatering cambió a:', newValue)
  if (newValue) {
    startStatusMonitoring()
  } else {
    stopStatusMonitoring()
  }
}, { immediate: true })

watch(isPaused, (newValue) => {
  console.log('isPaused cambió a:', newValue)
})

// Watcher para activeMode automático
watch(() => irrigationStore.activeMode, (newMode) => {
  if (newMode === 'automatic' && isWatering.value) {
    startStatusMonitoring()
  } else if (newMode !== 'automatic') {
    stopStatusMonitoring()
  }
}, { immediate: true })

onUnmounted(() => {
  stopStatusMonitoring()
  // El composable useSensorData maneja su propio cleanup
  console.log('🧹 Componente automático desmontado')
})

// Meta del documento
useHead({
  title: 'Modo Automático - VIVANTIA',
  meta: [
    { name: 'description', content: 'Configuración del modo automático de riego basado en sensores' }
  ]
})
</script>

 