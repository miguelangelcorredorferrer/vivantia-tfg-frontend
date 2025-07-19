<template>
  <div class="space-y-8">
    <!-- Panel de información superior -->
    <div class="bg-gray-900/60 border border-gray-600/30 rounded-xl shadow-lg p-6 mb-8 hover:bg-gray-900/80 transition-colors">
      <h2 class="text-2xl font-bold text-white mb-6 flex items-center">
        <svg class="w-8 h-8 text-blue-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
          <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
        </svg>
        Estado del Sistema de Riego
      </h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <!-- Modo Actual -->
        <div class="bg-gray-800/80 border border-blue-500/30 p-4 rounded-lg hover:bg-gray-800/90 transition-colors">
          <div class="flex items-center justify-between mb-2">
            <h3 class="font-medium text-blue-400">Modo Actual</h3>
            <div :class="getCurrentModeColor()" class="w-3 h-3 rounded-full"></div>
          </div>
          <p class="text-2xl font-bold text-white">{{ currentModeDisplay }}</p>
        </div>

        <!-- Cultivo en Riego -->
        <div class="bg-gray-800/80 border border-green-500/30 p-4 rounded-lg hover:bg-gray-800/90 transition-colors">
          <div class="flex items-center justify-between mb-2">
            <h3 class="font-medium text-green-400">Cultivo en Riego</h3>
            <svg class="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
              <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"/>
            </svg>
          </div>
          <p class="text-2xl font-bold text-white">{{ currentCrop || '-' }}</p>
        </div>

        <!-- Caudal en Curso -->
        <div class="bg-gray-800/80 border border-cyan-500/30 p-4 rounded-lg hover:bg-gray-800/90 transition-colors">
          <div class="flex items-center justify-between mb-2">
            <h3 class="font-medium text-cyan-400">Caudal en Curso</h3>
            <svg class="w-5 h-5 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
            </svg>
          </div>
          <p class="text-2xl font-bold text-white">{{ isWatering ? flowRate + ' L/min' : '-' }}</p>
        </div>

        <!-- Estado de la Bomba -->
        <div class="bg-gray-800/80 border border-purple-500/30 p-4 rounded-lg hover:bg-gray-800/90 transition-colors">
          <div class="flex items-center justify-between mb-2">
            <h3 class="font-medium text-purple-400">Estado Bomba</h3>
            <div :class="[
              isPaused ? 'bg-yellow-500' : 
              isWatering ? 'bg-green-500 animate-pulse' : 
              'bg-gray-400'
            ]" class="w-3 h-3 rounded-full"></div>
          </div>
          <p class="text-2xl font-bold text-white">
            {{ isPaused ? 'Pausada' : isWatering ? 'Activa' : 'Inactiva' }}
          </p>
        </div>
      </div>

      <!-- Información adicional -->
      <div class="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="bg-gray-800/60 border border-gray-600/30 p-3 rounded-lg hover:bg-gray-800/80 transition-colors">
          <p class="text-sm text-gray-400">Último Riego</p>
          <p class="font-semibold text-white">{{ lastWatering || 'Nunca' }}</p>
        </div>
        <div class="bg-gray-800/60 border border-gray-600/30 p-3 rounded-lg hover:bg-gray-800/80 transition-colors">
          <p class="text-sm text-gray-400">Tiempo Restante</p>
          <p class="font-semibold text-white">{{ remainingTime || '-' }}</p>
        </div>
        <div class="bg-gray-800/60 border border-gray-600/30 p-3 rounded-lg hover:bg-gray-800/80 transition-colors">
          <p class="text-sm text-gray-400">Próximo Riego</p>
          <p class="font-semibold text-white">{{ nextWatering || '-' }}</p>
        </div>
      </div>
    </div>

    <!-- Selección de Modos -->
    <div class="bg-gray-900/60 border border-gray-600/30 rounded-xl shadow-lg p-6 hover:bg-gray-900/80 transition-colors">
      <h2 class="text-2xl font-bold text-white mb-6">Seleccionar Modo de Riego</h2>
      
      <!-- Mostrar configuración activa si existe -->
      <div v-if="hasActiveMode" class="mb-6 p-4 bg-yellow-900/30 border border-yellow-500/30 rounded-lg">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="font-semibold text-yellow-400">Modo {{ currentModeDisplay }} Configurado</h3>
            <p class="text-sm text-yellow-300">{{ getModeDescription() }}</p>
            <div v-if="isWatering || isPaused" class="mt-2">
              <p class="text-sm text-yellow-200">
                Tiempo restante: <span class="font-bold">{{ remainingTime }}</span>
                <span v-if="isPaused" class="text-yellow-400 ml-2">(Pausado)</span>
              </p>
            </div>
            <div v-else-if="activeMode === 'programado'" class="mt-2">
              <p class="text-sm text-yellow-200">
                El riego se activará automáticamente en la fecha programada
              </p>
            </div>
          </div>
          <button 
            @click="showCancelModal = true"
            class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            {{ isWatering ? 'Cancelar Operación' : 'Cancelar Configuración' }}
          </button>
        </div>
      </div>

      <!-- Modos disponibles -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Modo Manual -->
        <div 
          @click="selectMode('manual')"
          :class="[
            'group p-6 rounded-xl border-2 transition-all duration-300',
            activeMode === 'manual' || !hasActiveMode
              ? 'cursor-pointer bg-gray-800/60 border-blue-500/30 hover:border-blue-400 hover:bg-gray-800/80 transform hover:scale-105' 
              : 'cursor-not-allowed bg-gray-800/30 border-gray-600/20 opacity-50'
          ]"
        >
          <div class="text-center">
            <div class="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-600 transition-colors shadow-lg">
              <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
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
            !hasActiveMode
              ? 'cursor-pointer bg-gray-800/60 border-green-500/30 hover:border-green-400 hover:bg-gray-800/80 transform hover:scale-105' 
              : 'cursor-not-allowed bg-gray-800/30 border-gray-600/20 opacity-50'
          ]"
        >
          <div class="text-center">
            <div class="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-600 transition-colors shadow-lg">
              <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
              </svg>
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
            !hasActiveMode
              ? 'cursor-pointer bg-gray-800/60 border-purple-500/30 hover:border-purple-400 hover:bg-gray-800/80 transform hover:scale-105' 
              : 'cursor-not-allowed bg-gray-800/30 border-gray-600/20 opacity-50'
          ]"
        >
          <div class="text-center">
            <div class="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-600 transition-colors shadow-lg">
              <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-white mb-2">Automático</h3>
            <p class="text-purple-300 text-sm">Riego basado en sensores de humedad y temperatura</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de cancelación -->
    <div v-if="showCancelModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-gray-800 border border-gray-600/30 p-6 rounded-xl max-w-md w-full mx-4">
        <h3 class="text-lg font-bold text-white mb-4">Confirmar Cancelación</h3>
        <p class="text-gray-300 mb-6">
          {{ isWatering ? 
            '¿Estás seguro de que quieres cancelar el riego actual? La bomba se detendrá inmediatamente.' :
            activeMode === 'programado' ?
              '¿Estás seguro de que quieres cancelar la programación? El riego no se ejecutará en la fecha programada.' :
              '¿Estás seguro de que quieres deshacer la configuración del modo actual?'
          }}
        </p>
        <div class="flex space-x-4">
          <button 
            @click="cancelMode"
            class="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            {{ isWatering ? 'Cancelar Operación' : 'Cancelar Configuración' }}
          </button>
          <button 
            @click="showCancelModal = false"
            class="flex-1 px-4 py-2 bg-gray-600 text-gray-200 rounded-lg hover:bg-gray-500 transition-colors"
          >
            Volver
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useToastNotifications } from '~/composables/useToastNotifications'
import { useIrrigationModes } from '~/composables/useIrrigationModes'

// Meta del documento
useHead({
  title: 'Modos de Riego - VIVANTIA',
  meta: [
    { name: 'description', content: 'Control y configuración de los modos de riego automático' }
  ]
})

// Sistema de modos de riego
const {
  activeMode,
  isWatering,
  remainingTime,
  isPaused,
  hasActiveMode,
  canAccessMode,
  cancelActiveMode,
  getModeDescription,
  clearAllIntervals
} = useIrrigationModes()

// Estados locales
const currentCrop = ref('Tomate Cherry')
const flowRate = ref(2.5)
const lastWatering = ref('Ayer 15:30')
const nextWatering = ref(null)
const showCancelModal = ref(false)

// Composables
const { toast } = useToastNotifications()
const router = useRouter()

// Helper functions para toast
const showSuccess = (message) => toast.success(message)
const showError = (message) => toast.error(message)
const showWarning = (message) => toast.warning(message)

// Computed
const currentModeDisplay = computed(() => {
  return activeMode.value ? activeMode.value.charAt(0).toUpperCase() + activeMode.value.slice(1) : 'Apagado'
})

// Métodos
const getCurrentModeColor = () => {
  if (!activeMode.value) return 'bg-gray-400'
  
  switch (activeMode.value) {
    case 'manual': return 'bg-blue-500'
    case 'programado': return 'bg-green-500'
    case 'automatico': return 'bg-purple-500'
    default: return 'bg-gray-400'
  }
}

// getModeDescription ahora viene del composable useIrrigationModes

const selectMode = (mode) => {
  // Permitir acceso al modo manual si está activo, o a cualquier modo si no hay ninguno activo
  if (mode === 'manual' && activeMode.value === 'manual') {
    router.push('/modo/manual')
  } else if (!hasActiveMode.value) {
    router.push(`/modo/${mode}`)
  } else {
    showError('No puedes cambiar de modo mientras hay uno activo. Cancela el riego actual primero.')
  }
}

const cancelMode = () => {
  if (isWatering.value) {
    showSuccess('Riego cancelado exitosamente')
  } else if (activeMode.value === 'programado') {
    showWarning('Programación cancelada')
  } else {
    showWarning('Configuración deshecha')
  }
  
  // Cancelar usando el composable
  cancelActiveMode()
  showCancelModal.value = false
}

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

// Limpiar intervalos al desmontar el componente
onUnmounted(() => {
  clearAllIntervals()
})

// Ya no necesitamos simular el tiempo aquí, se maneja en el composable
</script> 