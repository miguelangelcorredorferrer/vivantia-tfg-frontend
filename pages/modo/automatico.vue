

<template>
  <div class="space-y-8">
    <div class="max-w-4xl mx-auto">
      <!-- Breadcrumb -->
      <nav class="flex mb-6" aria-label="Breadcrumb">
        <ol class="inline-flex items-center space-x-1 md:space-x-3">
          <li class="inline-flex items-center">
            <NuxtLink to="/modo" class="inline-flex items-center text-sm font-medium text-gray-300 hover:text-blue-400 transition-colors">
              <HomeIcon />
              Modos de Riego
            </NuxtLink>
          </li>
          <li>
            <div class="flex items-center">
              <ChevronRightIcon />
              <span class="ml-1 text-sm font-medium text-gray-400 md:ml-2">Modo Automático</span>
            </div>
          </li>
        </ol>
      </nav>

      <!-- Widget de estado automático cuando está activo (solo cuando está configurado pero no regando ni pausado) -->
      <div v-if="isAutomaticActive && !isWatering && !isPaused" class="bg-gray-800 rounded-xl shadow-lg p-6 mb-8 border border-gray-700">
        <!-- Debug info -->
        <div class="text-xs text-gray-500 mb-2">
          Debug: isAutomaticActive={{ isAutomaticActive }}, isWatering={{ isWatering }}, isPaused={{ isPaused }}, modeConfig={{ !!modeConfig }}
        </div>
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
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p class="text-gray-400">Temperatura Máxima:</p>
                <p class="font-bold text-white">{{ getThresholdsFromConfig().maxTemperature }}°C</p>
              </div>
              <div>
                <p class="text-gray-400">Humedad Mínima:</p>
                <p class="font-bold text-white">{{ getThresholdsFromConfig().minHumidity }}%</p>
              </div>
              <div>
                <p class="text-gray-400">Humedad Máxima:</p>
                <p class="font-bold text-white">{{ getThresholdsFromConfig().maxHumidity }}%</p>
              </div>
              <div>
                <p class="text-gray-400">Duración Máxima:</p>
                <p class="font-bold text-white">{{ getDurationFromConfig() }}</p>
              </div>
            </div>
          </div>
          
          <!-- Botón de prueba para simular activación -->
          <div class="bg-yellow-900/30 border border-yellow-700/50 rounded-lg p-4">
            <h4 class="font-semibold text-yellow-300 mb-2">Prueba de Funcionamiento</h4>
            <p class="text-sm text-yellow-200 mb-3">
              Usa este botón para simular que se cumplen las condiciones y activar el riego automático
            </p>
            <button
              @click="triggerAutomaticWatering"
              class="w-full px-4 py-2 bg-yellow-600 text-white font-medium rounded-lg hover:bg-yellow-700 transition-colors"
            >
              🔧 Simular Activación Automática
            </button>
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
      <div v-if="isAutomaticActive && isWatering && !isPaused" class="bg-gray-800 rounded-xl shadow-lg p-6 mb-8 border border-gray-700">
        <!-- Debug info -->
        <div class="text-xs text-gray-500 mb-2">
          Debug: isAutomaticActive={{ isAutomaticActive }}, isWatering={{ isWatering }}, isPaused={{ isPaused }}, modeConfig={{ !!modeConfig }}
        </div>
        <h2 class="text-xl font-bold text-white mb-6">Riego Automático Activo</h2>
        
        <div class="text-center space-y-6">
          <!-- Estado visual -->
          <div class="flex justify-center">
            <div class="w-24 h-24 bg-purple-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
              <CheckIcon />
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
                <p class="text-gray-400">Tiempo Restante:</p>
                <p class="font-bold text-white">{{ remainingTime || 'Calculando...' }}</p>
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
      <div v-if="isAutomaticActive && isPaused" class="bg-gray-800 rounded-xl shadow-lg p-6 mb-8 border border-gray-700">
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
                <p class="text-gray-400">Tiempo Restante:</p>
                <p class="font-bold text-white">{{ remainingTime || 'Calculando...' }}</p>
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
            <li>• Monitorea temperatura y humedad en tiempo real</li>
            <li>• Activa el riego cuando se cumplen los umbrales configurados</li>
            <li>• Evita el riego excesivo con configuración inteligente</li>
            <li>• Ideal para un cuidado óptimo y eficiente del cultivo</li>
          </ul>
        </div>
      </div>

      <!-- Estado actual de sensores -->
      <div class="bg-gray-800 rounded-xl shadow-lg p-6 mb-8 border border-gray-700">
        <h2 class="text-xl font-bold text-white mb-4">Estado Actual de Sensores</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Temperatura -->
          <div class="bg-gradient-to-br from-red-900/30 to-orange-900/30 p-4 rounded-lg border border-red-700/50">
            <div class="flex items-center justify-between mb-2">
              <h3 class="font-medium text-red-300">Temperatura</h3>
              <ThermometerIcon />
            </div>
            <p class="text-3xl font-bold text-red-200">{{ currentTemperature }}°C</p>
            <p class="text-sm text-red-300 mt-1">{{ getTemperatureStatus() }}</p>
          </div>

          <!-- Humedad -->
          <div class="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 p-4 rounded-lg border border-blue-700/50">
            <div class="flex items-center justify-between mb-2">
              <h3 class="font-medium text-blue-300">Humedad</h3>
              <HumidityIcon />
            </div>
            <p class="text-3xl font-bold text-blue-200">{{ currentHumidity }}%</p>
            <p class="text-sm text-blue-300 mt-1">{{ getHumidityStatus() }}</p>
          </div>
        </div>
      </div>

      <!-- Formulario de configuración -->
      <div class="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700">
        <h2 class="text-xl font-bold text-white mb-6">Configurar Umbrales Automáticos</h2>
        
        <form @submit.prevent="confirmConfiguration" class="space-y-6">
          <!-- Configuración de temperatura -->
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-4">
              Umbrales de Temperatura
            </label>
            
            <div class="bg-red-900/30 border border-red-700/50 rounded-lg p-4 mb-4">
              <h4 class="font-medium text-red-300 mb-3">Temperatura Máxima</h4>
              <div class="flex items-center space-x-4">
                <input 
                  v-model.number="thresholds.maxTemperature"
                  type="number" 
                  min="15" 
                  max="45"
                  step="0.5"
                  class="w-24 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
                >
                <span class="text-sm text-gray-300">°C</span>
                <div class="flex-1">
                  <input 
                    v-model.number="thresholds.maxTemperature"
                    type="range" 
                    min="15" 
                    max="45"
                    step="0.5"
                    class="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
                  >
                </div>
              </div>
              <p class="text-xs text-red-300 mt-2">Se activará el riego cuando la temperatura supere este valor</p>
            </div>
          </div>

          <!-- Configuración de humedad -->
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-4">
              Umbrales de Humedad del Suelo
            </label>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- Humedad mínima -->
              <div class="bg-blue-900/30 border border-blue-700/50 rounded-lg p-4">
                <h4 class="font-medium text-blue-300 mb-3">Humedad Mínima</h4>
                <div class="flex items-center space-x-4">
                  <input 
                    v-model.number="thresholds.minHumidity"
                    type="number" 
                    min="0" 
                    max="100"
                    class="w-20 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
                  >
                  <span class="text-sm text-gray-300">%</span>
                </div>
                <input 
                  v-model.number="thresholds.minHumidity"
                  type="range" 
                  min="0" 
                  max="100"
                  class="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider mt-2"
                >
                <p class="text-xs text-blue-300 mt-2">Se activará el riego cuando baje de este valor</p>
              </div>

              <!-- Humedad máxima -->
              <div class="bg-cyan-900/30 border border-cyan-700/50 rounded-lg p-4">
                <h4 class="font-medium text-cyan-300 mb-3">Humedad Máxima</h4>
                <div class="flex items-center space-x-4">
                  <input 
                    v-model.number="thresholds.maxHumidity"
                    type="number" 
                    min="0" 
                    max="100"
                    class="w-20 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
                  >
                  <span class="text-sm text-gray-300">%</span>
                </div>
                <input 
                  v-model.number="thresholds.maxHumidity"
                  type="range" 
                  min="0" 
                  max="100"
                  class="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider mt-2"
                >
                <p class="text-xs text-cyan-300 mt-2">Se detendrá el riego al alcanzar este valor</p>
              </div>
            </div>
          </div>

          <!-- Configuración de tiempo -->
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">
              Duración Máxima del Riego
            </label>
            <div class="bg-yellow-900/30 border border-yellow-700/50 rounded-lg p-4">
              <div class="grid grid-cols-2 gap-4 mb-3">
                <div>
                  <label class="block text-xs text-gray-400 mb-1">Minutos</label>
                  <input 
                    v-model.number="duration.minutes"
                    type="number" 
                    min="1" 
                    max="30"
                    class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
                  >
                </div>
                <div>
                  <label class="block text-xs text-gray-400 mb-1">Segundos</label>
                  <input 
                    v-model.number="duration.seconds"
                    type="number" 
                    min="0" 
                    max="59"
                    class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
                  >
                </div>
              </div>
              <p class="text-xs text-yellow-300">Tiempo máximo de riego por activación automática</p>
            </div>
          </div>



          <!-- Vista previa de configuración -->
          <div class="bg-purple-900/30 border border-purple-700/50 rounded-lg p-4">
            <h3 class="font-medium text-purple-300 mb-2">Vista Previa de Configuración</h3>
            <div class="text-sm text-purple-200 space-y-1">
              <p><strong>Temperatura máxima:</strong> {{ thresholds.maxTemperature }}°C</p>
              <p><strong>Humedad objetivo:</strong> {{ thresholds.minHumidity }}% - {{ thresholds.maxHumidity }}%</p>
              <p><strong>Duración máxima:</strong> {{ formatDuration() }}</p>
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
            <strong>Humedad objetivo:</strong> {{ thresholds.minHumidity }}% - {{ thresholds.maxHumidity }}%<br>
            <strong>Duración máxima:</strong> {{ formatDuration() }}
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
definePageMeta({
  middleware: 'auth'
})
import { useToastNotifications } from '~/composables/useToastNotifications'
import { useIrrigationModes } from '~/composables/useIrrigationModes'
import {
  HomeIcon,
  ChevronRightIcon,
  AutomaticIcon,
  ThermometerIcon,
  HumidityIcon,
  AutomaticConfirmIcon,
  CheckIcon,
  PauseIcon,
  WarningIcon
} from '~/assets/icons'

// Sistema de modos de riego
const {
  isAutomaticActive,
  isWatering,
  remainingTime,
  isPaused,
  modeConfig,
  activeMode,
  activateAutomaticMode,
  cancelActiveMode,
  cancelAutomaticMode,
  pauseIrrigation,
  resumeIrrigation,
  triggerAutomaticWatering,
  clearAllIntervals
} = useIrrigationModes()

// Estados reactivos para sensores (simulados)
const currentTemperature = ref(24.5)
const currentHumidity = ref(45)

// Configuración de umbrales
const thresholds = ref({
  maxTemperature: 28,
  minHumidity: 30,
  maxHumidity: 70
})

const duration = ref({
  minutes: 10,
  seconds: 0
})



const showConfirmModal = ref(false)
const showCancelModal = ref(false)

// Composables
const { toast } = useToastNotifications()
const router = useRouter()

// Helper functions para toast
const showSuccess = (message) => toast.success(message)
const showError = (message) => toast.error(message)

// Métodos
const getTemperatureStatus = () => {
  if (currentTemperature.value >= thresholds.value.maxTemperature) {
    return 'Temperatura alta - Riego recomendado'
  } else if (currentTemperature.value >= thresholds.value.maxTemperature - 2) {
    return 'Temperatura en aumento'
  }
  return 'Temperatura normal'
}

const getHumidityStatus = () => {
  if (currentHumidity.value <= thresholds.value.minHumidity) {
    return 'Humedad baja - Riego recomendado'
  } else if (currentHumidity.value >= thresholds.value.maxHumidity) {
    return 'Humedad alta - Riego no necesario'
  }
  return 'Humedad en rango óptimo'
}

const getCurrentConditionStatus = () => {
  const tempNeedsWater = currentTemperature.value >= thresholds.value.maxTemperature
  const humidityNeedsWater = currentHumidity.value <= thresholds.value.minHumidity
  
  if (tempNeedsWater && humidityNeedsWater) {
    return 'Se activaría el riego ahora'
  } else if (tempNeedsWater || humidityNeedsWater) {
    return 'Condiciones cercanas al umbral'
  }
  return 'Condiciones estables - Sin riego necesario'
}

const formatDuration = () => {
  const totalMinutes = duration.value.minutes || 0
  const totalSeconds = duration.value.seconds || 0
  
  let result = ''
  if (totalMinutes > 0) {
    result += `${totalMinutes} min`
  }
  if (totalSeconds > 0) {
    result += `${result ? ' ' : ''}${totalSeconds} seg`
  }
  
  return result || 'No configurado'
}

const isValidConfiguration = () => {
  return (
    thresholds.value.maxTemperature > 0 &&
    thresholds.value.minHumidity >= 0 &&
    thresholds.value.maxHumidity > thresholds.value.minHumidity &&
    ((duration.value.minutes > 0) || (duration.value.seconds > 0))
  )
}

const confirmConfiguration = () => {
  if (!isValidConfiguration()) {
    showError('Por favor, verifica que todos los valores sean válidos')
    return
  }
  
  if (thresholds.value.minHumidity >= thresholds.value.maxHumidity) {
    showError('La humedad mínima debe ser menor que la máxima')
    return
  }
  
  showConfirmModal.value = true
}

const saveAutomaticConfiguration = () => {
  console.log('saveAutomaticConfiguration llamado')
  
  // Cerrar el modal de confirmación INMEDIATAMENTE
  showConfirmModal.value = false
  
  // Pequeño delay para asegurar que el modal se cierre
  setTimeout(() => {
    // Configuración del modo automático
    const config = {
      thresholds: {
        maxTemperature: thresholds.value.maxTemperature,
        minHumidity: thresholds.value.minHumidity,
        maxHumidity: thresholds.value.maxHumidity
      },
      duration: {
        minutes: duration.value.minutes || 0,
        seconds: duration.value.seconds || 0
      }
    }
    
    console.log('Guardando configuración automática:', config)
    
    // Activar el modo automático usando el composable
    activateAutomaticMode(config)
    
    showSuccess('Modo automático configurado exitosamente')
    
    // Forzar la reactividad después de activar el modo
    nextTick(() => {
      console.log('Configuración guardada - verificando estado:', {
        isAutomaticActive: isAutomaticActive.value,
        isWatering: isWatering.value,
        modeConfig: modeConfig.value
      })
      
      // Forzar una actualización adicional si es necesario
      if (!isAutomaticActive.value) {
        console.log('Forzando actualización del estado...')
        // Trigger reactivity
        isAutomaticActive.value = isAutomaticActive.value
      }
    })
  }, 100)
}

const goBack = () => {
  router.push('/modo')
}

const handleCancelAutomaticMode = () => {
  console.log('handleCancelAutomaticMode llamado')
  try {
    // Cancelar el modo automático usando el composable
    cancelAutomaticMode()
    
    // Mostrar mensaje de éxito
    showSuccess('Configuración automática cancelada')
    
    // Cerrar el modal
    showCancelModal.value = false
    
    console.log('Configuración cancelada exitosamente')
    
    // Redirigir a la página principal después de un breve delay
    setTimeout(() => {
      router.push('/modo')
    }, 500)
    
  } catch (error) {
    console.error('Error al cancelar configuración:', error)
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

// Funciones para obtener información desde la configuración guardada
const getThresholdsFromConfig = () => {
  if (!modeConfig.value || !modeConfig.value.thresholds) {
    return {
      maxTemperature: 0,
      minHumidity: 0,
      maxHumidity: 0
    }
  }
  
  return modeConfig.value.thresholds
}

const getDurationFromConfig = () => {
  if (!modeConfig.value || !modeConfig.value.duration) {
    return 'No configurado'
  }
  
  const minutes = modeConfig.value.duration.minutes || 0
  const seconds = modeConfig.value.duration.seconds || 0
  
  if (minutes === 0 && seconds === 0) {
    return 'No configurado'
  }
  
  let result = ''
  if (minutes > 0) {
    result += `${minutes} min`
  }
  if (seconds > 0) {
    result += `${result ? ' ' : ''}${seconds} seg`
  }
  
  return result
}

// Simular actualizaciones de sensores en tiempo real
onMounted(() => {
  setInterval(() => {
    // Simular variaciones pequeñas en los sensores
    currentTemperature.value += (Math.random() - 0.5) * 0.5
    currentHumidity.value += (Math.random() - 0.5) * 2
    
    // Mantener valores en rangos realistas
    currentTemperature.value = Math.max(15, Math.min(40, currentTemperature.value))
    currentHumidity.value = Math.max(0, Math.min(100, currentHumidity.value))
    
    // Redondear para mostrar valores limpios
    currentTemperature.value = Math.round(currentTemperature.value * 10) / 10
    currentHumidity.value = Math.round(currentHumidity.value)
  }, 3000)
})

// Watcher para asegurar que el tiempo restante se actualice
watch(remainingTime, (newValue) => {
  // Forzar la reactividad del tiempo restante
  if (newValue) {
    // Trigger reactivity
    nextTick(() => {
      // El tiempo se actualizará automáticamente
    })
  }
})

// Watcher para asegurar que el estado se mantenga sincronizado
watch(isAutomaticActive, (newValue) => {
  console.log('isAutomaticActive cambió a:', newValue, 'activeMode:', activeMode.value)
})

// Watcher para monitorear el estado de riego
watch(isWatering, (newValue) => {
  console.log('isWatering cambió a:', newValue, 'isPaused:', isPaused.value)
})

watch(isPaused, (newValue) => {
  console.log('isPaused cambió a:', newValue, 'isWatering:', isWatering.value)
})

// Watcher para monitorear cambios en modeConfig
watch(modeConfig, (newValue) => {
  console.log('modeConfig cambió a:', newValue)
  if (newValue && Object.keys(newValue).length > 0) {
    console.log('Configuración detectada - forzando reactividad')
    nextTick(() => {
      // Forzar actualización
      isAutomaticActive.value = isAutomaticActive.value
    })
  }
}, { deep: true })

// Watcher para monitorear el estado del modal
watch(showCancelModal, (newValue) => {
  console.log('showCancelModal cambió a:', newValue)
})

// Watcher para monitorear el modal de confirmación
watch(showConfirmModal, (newValue) => {
  console.log('showConfirmModal cambió a:', newValue)
  // Forzar la reactividad
  if (!newValue) {
    nextTick(() => {
      console.log('Modal de confirmación cerrado - reactividad forzada')
    })
  }
})

// Watcher para monitorear cuando se activa el modo automático
watch(isAutomaticActive, (newValue, oldValue) => {
  console.log('isAutomaticActive cambió de', oldValue, 'a:', newValue, 'activeMode:', activeMode.value)
  if (newValue) {
    console.log('Modo automático activado - mostrando widget de configuración')
    // Forzar la reactividad
    nextTick(() => {
      console.log('Reactividad forzada después de activar modo automático')
      // Forzar una actualización adicional
      isAutomaticActive.value = isAutomaticActive.value
    })
  }
}, { immediate: true })

// Limpiar intervalos al desmontar el componente
onUnmounted(() => {
  clearAllIntervals()
})

// Meta del documento
useHead({
  title: 'Modo Automático - VIVANTIA',
  meta: [
    { name: 'description', content: 'Configuración del modo automático de riego basado en sensores' }
  ]
})
</script>

<style scoped>
.slider::-webkit-slider-thumb {
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #8B5CF6;
  cursor: pointer;
}

.slider::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #8B5CF6;
  cursor: pointer;
  border: none;
}
</style> 