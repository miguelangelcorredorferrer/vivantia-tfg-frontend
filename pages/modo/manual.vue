<script setup>
// Configurar middleware
definePageMeta({
  middleware: ['auth', 'visitor-block', 'crop-required']
})

import { useToastNotifications } from '~/composables/useToastNotifications'
import { useIrrigationStore } from '~/stores/irrigation'
import { useUserStore } from '~/stores/user'
import { useCropStore } from '~/stores/crop'
import {
  HomeIcon,
  ChevronRightIcon,
  ManualIcon,
  CheckIcon,
  PauseIcon,
  ManualConfirmIcon,
  WarningIcon,
  WaterDropIcon
} from '~/assets/icons'

// Store de irrigation
const irrigationStore = useIrrigationStore()
const userStore = useUserStore()
const cropStore = useCropStore()

// Estados reactivos
const duration = ref({
  minutes: 5,
  seconds: 0
})

const options = ref({
  notifyStart: true,
  notifyEnd: true
})

const showConfirmModal = ref(false)
const showCancelModal = ref(false)

// Opciones rápidas predefinidas
const quickOptions = [
  { label: '2 min', minutes: 2, seconds: 0 },
  { label: '5 min', minutes: 5, seconds: 0 },
  { label: '10 min', minutes: 10, seconds: 0 },
  { label: '15 min', minutes: 15, seconds: 0 }
]

// Composables
const { toast } = useToastNotifications()
const router = useRouter()

// Helper functions para toast
const showSuccess = (message) => toast.success(message)
const showError = (message) => toast.error(message)

// Métodos
const formatTotalDuration = () => {
  const totalMinutes = duration.value.minutes || 0
  const totalSeconds = duration.value.seconds || 0
  
  if (totalMinutes === 0 && totalSeconds === 0) {
    return 'No configurado'
  }
  
  let result = ''
  if (totalMinutes > 0) {
    result += `${totalMinutes} min`
  }
  if (totalSeconds > 0) {
    result += `${result ? ' ' : ''}${totalSeconds} seg`
  }
  
  return result
}

const calculateVolume = () => {
  const totalMinutes = (duration.value.minutes || 0) + (duration.value.seconds || 0) / 60
  const flowRate = 2.5 // L/min
  return (totalMinutes * flowRate).toFixed(1)
}

const isValidDuration = () => {
  return (duration.value.minutes > 0) || (duration.value.seconds > 0)
}

const setQuickOption = (option) => {
  duration.value.minutes = option.minutes
  duration.value.seconds = option.seconds
}

const confirmConfiguration = () => {
  if (!isValidDuration()) {
    showError('Por favor, configura una duración válida para el riego')
    return
  }
  
  showConfirmModal.value = true
}

const startManualWatering = async () => {
  showConfirmModal.value = false
  
  try {
    // Configuración para el riego manual
    const config = {
      duration_minutes: duration.value.minutes + (duration.value.seconds / 60),
      begin_notification: options.value.notifyStart,
      final_notification: options.value.notifyEnd
    }
    
    console.log('🚀 [MANUAL] Iniciando riego con configuración:', config)
    
    // Activar el modo manual usando el store
    const success = await irrigationStore.startManualIrrigation(config)
    
    if (success) {
      console.log('✅ [MANUAL] Riego iniciado exitosamente')
      
      // Toast de feedback inmediato para el usuario
      showSuccess(`🚿 Riego manual iniciado por ${Math.floor(config.duration_minutes)} minutos`)
      
      // Recargar configuración para asegurar estado correcto
      await irrigationStore.loadActiveConfiguration()
      
      // Iniciar monitoreo de estado
      startStatusMonitoring()
      
      console.log('✅ Riego manual iniciado exitosamente')
      
      console.log('📊 [MANUAL] Estado después de iniciar:', {
        hasActiveMode: irrigationStore.hasActiveMode,
        isManualActive: irrigationStore.isManualActive,
        isWatering: irrigationStore.isWatering,
        activeMode: irrigationStore.activeMode
      })
    } else {
      showError('Error al iniciar el riego manual')
    }
  } catch (error) {
    console.error('❌ [MANUAL] Error en startManualWatering:', error)
    showError('Error al iniciar el riego manual')
  }
}

const confirmCancel = () => {
  if (irrigationStore.isWatering) {
    showCancelModal.value = true
  } else {
    cancelManualWatering()
  }
}

const confirmCancelModal = async () => {
  // Cerrar el modal inmediatamente
  showCancelModal.value = false
  
  try {
    // Ejecutar la cancelación
    const success = await irrigationStore.cancelActiveMode()
    if (success) {
      console.log('✅ [MANUAL] Riego cancelado exitosamente')
      showSuccess('🛑 Riego cancelado exitosamente')
    } else {
      showError('Error al cancelar el riego')
    }
  } catch (error) {
    console.error('❌ [MANUAL] Error cancelando riego:', error)
    showError('Error al cancelar el riego')
  }
}

const cancelManualWatering = async () => {
  try {
    const success = await irrigationStore.cancelActiveMode()
    if (success) {
      console.log('✅ [MANUAL] Configuración cancelada exitosamente')
      // No mostrar toast - las alertas las maneja el backend
    } else {
      showError('Error al cancelar la configuración')
    }
  } catch (error) {
    console.error('❌ [MANUAL] Error cancelando configuración:', error)
    showError('Error al cancelar la configuración')
  }
}

const pauseIrrigation = async () => {
  try {
    const success = await irrigationStore.pauseIrrigation()
    if (success) {
      console.log('✅ [MANUAL] Riego pausado exitosamente')
      showSuccess('⏸️ Riego pausado exitosamente')
    } else {
      showError('Error al pausar el riego')
    }
  } catch (error) {
    console.error('❌ [MANUAL] Error pausando riego:', error)
    showError('Error al pausar el riego')
  }
}

const resumeIrrigation = async () => {
  try {
    const success = await irrigationStore.resumeIrrigation()
    if (success) {
      console.log('✅ [MANUAL] Riego reanudado exitosamente')
      showSuccess('▶️ Riego reanudado exitosamente')
    } else {
      showError('Error al reanudar el riego')
    }
  } catch (error) {
    console.error('❌ [MANUAL] Error reanudando riego:', error)
    showError('Error al reanudar el riego')
  }
}

const goBack = () => {
  router.push('/modo')
}

// Variable para intervalo de monitoreo
let statusInterval = null

// Función para monitorear estado
const startStatusMonitoring = () => {
  if (statusInterval) {
    clearInterval(statusInterval)
  }
  
  // Función de actualización inmediata
  const updateStatus = async () => {
    try {
      await irrigationStore.loadActiveConfiguration()
    } catch (error) {
      console.error('🔄 [MANUAL] Error actualizando estado:', error)
    }
  }
  
  // Llamada inmediata
  updateStatus()
  
  // Verificar estado cada 3 segundos
  statusInterval = setInterval(async () => {
    console.log('🔄 [MANUAL] Actualizando estado periódico...')
    await updateStatus()
  }, 3000)
}

const stopStatusMonitoring = () => {
  if (statusInterval) {
    clearInterval(statusInterval)
    statusInterval = null
  }
}

// Cargar configuración activa al montar
onMounted(async () => {
  console.log('🎯 [MANUAL] Componente montado')
  await irrigationStore.loadActiveConfiguration()
  
  // Iniciar monitoreo inmediatamente si hay actividad manual
  if (irrigationStore.isManualActive || irrigationStore.isWatering || irrigationStore.activeMode === 'manual') {
    console.log('🔄 [MANUAL] Iniciando monitoreo por actividad detectada')
    startStatusMonitoring()
  }
  
  // Pequeño delay para permitir propagación reactiva
  await new Promise(resolve => setTimeout(resolve, 100))
})

// Watchers para asegurar reactividad
watch(() => irrigationStore.hasActiveMode, (newValue) => {
  console.log('🔄 [MANUAL] hasActiveMode cambió a:', newValue)
})

watch(() => irrigationStore.isManualActive, (newValue) => {
  console.log('🔄 [MANUAL] isManualActive cambió a:', newValue)
  
  // Iniciar/detener monitoreo según el estado
  if (newValue || irrigationStore.isWatering) {
    startStatusMonitoring()
  } else if (!newValue) {
    stopStatusMonitoring()
  }
}, { immediate: true })

watch(() => irrigationStore.isWatering, (newValue) => {
  console.log('🔄 [MANUAL] isWatering cambió a:', newValue)
  
  // Controlar monitoreo según estado de riego
  if (newValue || irrigationStore.isManualActive) {
    startStatusMonitoring()
  } else if (!newValue) {
    stopStatusMonitoring()
  }
}, { immediate: true })

watch(() => irrigationStore.activeMode, (newValue) => {
  console.log('🔄 [MANUAL] activeMode cambió a:', newValue)
  
  if (newValue === 'manual') {
    startStatusMonitoring()
  } else if (newValue !== 'manual') {
    stopStatusMonitoring()
  }
}, { immediate: true })

// Limpiar al desmontar el componente
onUnmounted(() => {
  console.log('🎯 [MANUAL] Componente desmontado - limpiando recursos')
  stopStatusMonitoring()
  irrigationStore.cleanup()
})

// Meta del documento
useHead({
  title: 'Modo Manual - VIVANTIA',
  meta: [
    { name: 'description', content: 'Configuración del modo manual de riego' }
  ]
})
</script>

<template>
  <div class="space-y-8">
    <div class="max-w-2xl mx-auto">
      <!-- Título y descripción -->
      <div class="bg-gray-900/60 border border-gray-600/30 rounded-xl shadow-lg p-6 mb-8 hover:bg-gray-900/80 transition-colors">
        <div class="flex items-center mb-4">
          <div class="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-4 shadow-lg">
            <ManualIcon />
          </div>
          <div>
            <h1 class="text-2xl font-bold text-white">Modo Manual</h1>
            <p class="text-gray-300">Control directo del sistema de riego</p>
          </div>
        </div>
        
        <div class="bg-blue-900/30 border border-blue-500/30 rounded-lg p-4">
          <h3 class="font-semibold text-blue-400 mb-2">¿Cómo funciona el modo manual?</h3>
          <ul class="text-sm text-blue-300 space-y-1">
            <li>• Activa la bomba inmediatamente al confirmar</li>
            <li>• Configura la duración exacta del riego</li>
            <li>• Ideal para riegos puntuales o de emergencia</li>
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

      <!-- Widget de cancelar operación cuando está activo -->
      <div v-if="irrigationStore.isManualActive && (irrigationStore.isWatering || irrigationStore.isPaused)" class="bg-gray-900/60 border border-gray-600/30 rounded-xl shadow-lg p-6 hover:bg-gray-900/80 transition-colors mb-6">
        <h2 class="text-xl font-bold text-white mb-6">Riego Manual {{ irrigationStore.isPaused ? 'Pausado' : 'Activo' }}</h2>
        
        <div class="text-center space-y-6">
          <!-- Estado visual -->
          <div class="flex justify-center">
            <div :class="[
              'w-24 h-24 rounded-full flex items-center justify-center shadow-lg',
              irrigationStore.isPaused ? 'bg-yellow-500' : 'bg-blue-500 animate-pulse'
            ]">
              <PauseIcon v-if="irrigationStore.isPaused" />
              <WaterDropIcon v-else />
            </div>
          </div>
          
          <!-- Información del riego -->
          <div class="bg-blue-900/30 border border-blue-500/30 rounded-lg p-4">
            <h3 class="font-semibold text-blue-400 mb-3">Información del Riego</h3>
            <div class="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p class="text-gray-400">Estado:</p>
                <p class="font-bold text-white">{{ irrigationStore.isPaused ? 'Pausado' : 'Bomba Activa' }}</p>
              </div>
              <div>
                <p class="text-gray-400">Tiempo Restante:</p>
                <p class="font-bold text-white">{{ irrigationStore.remainingTime || 'Calculando...' }}</p>
              </div>
            </div>
          </div>
          
          <!-- Botones de control -->
          <div class="space-y-3">
            <!-- Botón de parada de emergencia -->
            <button
              v-if="!irrigationStore.isPaused"
              @click="pauseIrrigation"
              class="w-full px-6 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-bold text-lg rounded-lg hover:from-yellow-600 hover:to-yellow-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              ⏸️ Parada de Emergencia
            </button>
            
            <!-- Botón de reanudar -->
            <button
              v-if="irrigationStore.isPaused"
              @click="resumeIrrigation"
              class="w-full px-6 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold text-lg rounded-lg hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              ▶️ Reanudar Riego
            </button>
            
            <!-- Botón de cancelar -->
            <button
              @click="confirmCancel"
              class="w-full px-6 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold text-lg rounded-lg hover:from-red-600 hover:to-red-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              🛑 Cancelar Riego Manual
            </button>
          </div>
        </div>
      </div>

      <!-- Formulario de configuración -->
      <div v-if="!irrigationStore.hasActiveMode" class="bg-gray-900/60 border border-gray-600/30 rounded-xl shadow-lg p-6 hover:bg-gray-900/80 transition-colors">
        <h2 class="text-xl font-bold text-white mb-6">Configurar Riego Manual</h2>
        
        <!-- Información sobre reutilización -->
        <div class="bg-blue-900/30 border border-blue-500/30 rounded-lg p-4 mb-6">
          <h3 class="font-semibold text-blue-400 mb-2">💡 Información Importante</h3>
          <p class="text-sm text-blue-300">
            Si ya has configurado un riego manual para este cultivo, la configuración se actualizará con los nuevos valores. 
            Esto te permite hacer múltiples riegos con diferentes duraciones sin crear configuraciones duplicadas.
          </p>
        </div>
        
        <form @submit.prevent="confirmConfiguration" class="space-y-6">
          <!-- Duración del riego -->
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">
              Duración del Riego
            </label>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-xs text-gray-400 mb-1">Minutos</label>
                <input 
                  v-model.number="duration.minutes"
                  type="number" 
                  min="0" 
                  max="59"
                  :disabled="irrigationStore.isLoading"
                  class="w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
                  placeholder="0"
                >
              </div>
              <div>
                <label class="block text-xs text-gray-400 mb-1">Segundos</label>
                <input 
                  v-model.number="duration.seconds"
                  type="number" 
                  min="0" 
                  max="59"
                  :disabled="irrigationStore.isLoading"
                  class="w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
                  placeholder="0"
                >
              </div>
            </div>
            <p class="text-sm text-gray-400 mt-2">
              Duración total: <span class="font-semibold text-white">{{ formatTotalDuration() }}</span>
            </p>
          </div>

          <!-- Opciones rápidas -->
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-3">
              Opciones Rápidas
            </label>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
              <button
                v-for="option in quickOptions"
                :key="option.label"
                type="button"
                :disabled="irrigationStore.isLoading"
                @click="setQuickOption(option)"
                class="p-3 text-sm font-medium text-blue-300 bg-blue-900/30 border border-blue-500/30 rounded-lg hover:bg-blue-900/50 transition-colors disabled:opacity-50"
              >
                {{ option.label }}
              </button>
            </div>
          </div>

          <!-- Configuración adicional -->
          <div class="bg-gray-800/60 border border-gray-600/30 rounded-lg p-4">
            <h3 class="font-medium text-gray-300 mb-3">Configuración Adicional</h3>
            <div class="space-y-3">
              <label class="flex items-center">
                <input 
                  v-model="options.notifyStart" 
                  type="checkbox" 
                  :disabled="irrigationStore.isLoading"
                  class="rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-blue-500 disabled:opacity-50"
                >
                <span class="ml-2 text-sm text-gray-300">Notificar al iniciar el riego</span>
              </label>
              <label class="flex items-center">
                <input 
                  v-model="options.notifyEnd" 
                  type="checkbox" 
                  :disabled="irrigationStore.isLoading"
                  class="rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-blue-500 disabled:opacity-50"
                >
                <span class="ml-2 text-sm text-gray-300">Notificar al finalizar el riego</span>
              </label>
            </div>
          </div>

          <!-- Vista previa -->
          <div class="bg-yellow-900/30 border border-yellow-500/30 rounded-lg p-4">
            <h3 class="font-medium text-yellow-400 mb-2">Vista Previa</h3>
            <div class="text-sm text-yellow-300 space-y-1">
              <p><strong>Duración:</strong> {{ formatTotalDuration() }}</p>
              <p><strong>Inicio:</strong> Inmediato al confirmar</p>
              <p><strong>Caudal estimado:</strong> 2.5 L/min</p>
              <p><strong>Volumen total:</strong> {{ calculateVolume() }} L</p>
            </div>
          </div>

          <!-- Botones de acción -->
          <div class="flex space-x-4">
            <button
              type="submit"
              :disabled="!isValidDuration() || irrigationStore.isLoading"
              class="flex-1 px-6 py-4 bg-gradient-to-r from-[#4A5DB8] to-[#2A3B7A] text-white font-bold text-lg rounded-lg hover:from-[#5A6DC8] hover:to-[#3A4B8A] disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              {{ irrigationStore.isLoading ? '🔄 Iniciando...' : '🚀 Iniciar Riego Manual' }}
            </button>
            <button
              type="button"
              @click="goBack"
              :disabled="irrigationStore.isLoading"
              class="px-6 py-3 bg-gray-600 text-gray-200 font-medium rounded-lg hover:bg-gray-500 transition-colors disabled:opacity-50"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>

      <!-- Mensaje cuando hay un modo activo -->
      <div v-else class="bg-orange-900/60 border border-orange-500/30 rounded-xl shadow-lg p-6">
        <div class="text-center">
          <div class="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <WarningIcon />
          </div>
          <h3 class="text-lg font-bold text-white mb-2">Modo {{ irrigationStore.activeMode }} Activo</h3>
          <p class="text-orange-300 mb-4">
            Ya tienes un modo de riego activo. Debes cancelar la configuración actual antes de poder configurar el modo manual.
          </p>
          <div class="bg-orange-800/40 border border-orange-500/40 rounded-lg p-3 mb-4">
            <p class="text-sm text-orange-200">
              <strong>Último riego:</strong> {{ irrigationStore.lastIrrigation }}
            </p>
          </div>
          <button
            @click="goBack"
            class="px-6 py-3 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-700 transition-colors"
          >
            Volver a Modos de Riego
          </button>
        </div>
      </div>
    </div>

    <!-- Modal de confirmación -->
    <div v-if="showConfirmModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-gray-800 border border-gray-600/30 p-6 rounded-xl max-w-md w-full mx-4">
        <div class="text-center">
          <div class="w-16 h-16 bg-blue-900/60 border border-blue-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <ManualConfirmIcon />
          </div>
          <h3 class="text-lg font-bold text-white mb-2">Confirmar Riego Manual</h3>
          <p class="text-gray-300 mb-6">
            ¿Estás seguro de que quieres iniciar el riego manual por {{ formatTotalDuration() }}?
            <br><br>
            <strong>La bomba se activará inmediatamente.</strong>
          </p>
          <div class="flex space-x-4">
            <button 
              @click="startManualWatering"
              class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Confirmar e Iniciar
            </button>
            <button 
              @click="showConfirmModal = false"
              class="flex-1 px-4 py-2 bg-gray-600 text-gray-200 rounded-lg hover:bg-gray-500 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de cancelación de riego -->
    <div v-if="showCancelModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-gray-800 border border-gray-600/30 p-6 rounded-xl max-w-md w-full mx-4">
        <div class="text-center">
          <div class="w-16 h-16 bg-red-900/60 border border-red-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <WarningIcon />
          </div>
          <h3 class="text-lg font-bold text-white mb-2">Cancelar Riego Manual</h3>
          <p class="text-gray-300 mb-6">
            ¿Estás seguro de que quieres cancelar el riego manual?
            <br><br>
            <strong class="text-red-400">La bomba se detendrá inmediatamente.</strong>
          </p>
          <div class="flex space-x-4">
            <button 
              @click="confirmCancelModal"
              class="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Sí, Cancelar Riego
            </button>
            <button 
              @click="showCancelModal = false"
              class="flex-1 px-4 py-2 bg-gray-600 text-gray-200 rounded-lg hover:bg-gray-500 transition-colors"
            >
              No, Continuar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template> 