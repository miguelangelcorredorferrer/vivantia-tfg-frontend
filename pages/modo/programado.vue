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
              <span class="ml-1 text-sm font-medium text-gray-400 md:ml-2">Modo Programado</span>
            </div>
          </li>
        </ol>
      </nav>

      <!-- Widget de estado programado cuando está activo (solo cuando está configurado pero no regando ni pausado) -->
      <div v-if="isProgrammedActive && !isWatering && !isPaused" class="bg-gray-800 rounded-xl shadow-lg p-6 mb-8 border border-gray-700">
        <!-- Debug info -->
        <div class="text-xs text-gray-500 mb-2">
          Debug: isProgrammedActive={{ isProgrammedActive }}, isWatering={{ isWatering }}, isPaused={{ isPaused }}, modeConfig={{ !!modeConfig }}
        </div>
        <h2 class="text-xl font-bold text-white mb-6">Riego Programado Configurado</h2>
        
        <div class="text-center space-y-6">
          <!-- Estado visual -->
          <div class="flex justify-center">
            <div class="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
              <ClockIcon />
            </div>
          </div>
          
          <!-- Información del riego programado -->
          <div class="bg-green-900/30 border border-green-700/50 rounded-lg p-4">
            <h3 class="font-semibold text-green-300 mb-3">Información del Riego Programado</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p class="text-gray-400">Fecha Programada:</p>
                <p class="font-bold text-white">{{ getScheduledDateFromConfig() }}</p>
              </div>
              <div>
                <p class="text-gray-400">Hora Programada:</p>
                <p class="font-bold text-white">{{ getScheduledTimeFromConfig() }}</p>
              </div>
              <div>
                <p class="text-gray-400">Duración:</p>
                <p class="font-bold text-white">{{ getDurationFromConfig() }}</p>
              </div>
              <div>
                <p class="text-gray-400">Tiempo Restante:</p>
                <p class="font-bold text-green-400">{{ remainingTime || 'Calculando...' }}</p>
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
      <div v-if="isProgrammedActive && isWatering && !isPaused" class="bg-gray-800 rounded-xl shadow-lg p-6 mb-8 border border-gray-700">
        <!-- Debug info -->
        <div class="text-xs text-gray-500 mb-2">
          Debug: isProgrammedActive={{ isProgrammedActive }}, isWatering={{ isWatering }}, isPaused={{ isPaused }}, modeConfig={{ !!modeConfig }}
        </div>
        <h2 class="text-xl font-bold text-white mb-6">Riego Programado Activo</h2>
        
        <div class="text-center space-y-6">
          <!-- Estado visual -->
          <div class="flex justify-center">
            <div class="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
              <CheckIcon />
            </div>
          </div>
          
          <!-- Información del riego -->
          <div class="bg-green-900/30 border border-green-700/50 rounded-lg p-4">
            <h3 class="font-semibold text-green-300 mb-3">Información del Riego</h3>
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
              🛑 Cancelar Riego Programado
            </button>
          </div>
        </div>
      </div>

      <!-- Widget de riego pausado -->
      <div v-if="isProgrammedActive && isPaused" class="bg-gray-800 rounded-xl shadow-lg p-6 mb-8 border border-gray-700">
        <!-- Debug info -->
        <div class="text-xs text-gray-500 mb-2">
          Debug: isProgrammedActive={{ isProgrammedActive }}, isWatering={{ isWatering }}, isPaused={{ isPaused }}, modeConfig={{ !!modeConfig }}
        </div>
        <h2 class="text-xl font-bold text-white mb-6">Riego Programado Pausado</h2>
        
        <div class="text-center space-y-6">
          <!-- Estado visual -->
          <div class="flex justify-center">
            <div class="w-24 h-24 bg-yellow-500 rounded-full flex items-center justify-center shadow-lg">
              <PauseIcon />
            </div>
          </div>
          
          <!-- Información del riego -->
          <div class="bg-green-900/30 border border-green-700/50 rounded-lg p-4">
            <h3 class="font-semibold text-green-300 mb-3">Información del Riego</h3>
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
              class="w-full px-6 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold text-lg rounded-lg hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              ▶️ Reanudar Riego
            </button>
            
            <!-- Botón de cancelar -->
            <button
              @click="showCancelModal = true"
              class="w-full px-6 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold text-lg rounded-lg hover:from-red-600 hover:to-red-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              🛑 Cancelar Riego Programado
            </button>
          </div>
        </div>
      </div>

      <!-- Título y descripción -->
      <div class="bg-gray-800 rounded-xl shadow-lg p-6 mb-8 border border-gray-700">
        <div class="flex items-center mb-4">
          <div class="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mr-4 shadow-lg">
            <CalendarIcon />
          </div>
          <div>
            <h1 class="text-2xl font-bold text-white">Modo Programado</h1>
            <p class="text-gray-300">Programa el riego para fechas y horas específicas</p>
          </div>
        </div>
        
        <div class="bg-green-900/30 border border-green-700/50 rounded-lg p-4">
          <h3 class="font-semibold text-green-300 mb-2">¿Cómo funciona el modo programado?</h3>
          <ul class="text-sm text-green-200 space-y-1">
            <li>• Selecciona la fecha y hora específica para activar el riego</li>
            <li>• La bomba se activará automáticamente en el momento programado</li>
            <li>• Configura la duración del riego</li>
            <li>• Ideal para establecer rutinas de riego regulares</li>
          </ul>
        </div>
      </div>

      <!-- Formulario de configuración -->
      <div class="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700">
        <h2 class="text-xl font-bold text-white mb-6">Configurar Riego Programado</h2>
        
        <form @submit.prevent="confirmConfiguration" class="space-y-6">
          <!-- Fecha y hora programada -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Calendario -->
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">
                Fecha de Activación
              </label>
              <div class="bg-gray-700 rounded-lg p-4 border border-gray-600">
                <div class="flex items-center justify-between mb-3">
                  <button 
                    type="button"
                    @click="previousMonth"
                    class="p-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <ChevronLeftIcon />
                  </button>
                  <h3 class="text-white font-semibold">{{ currentMonthYear }}</h3>
                  <button 
                    type="button"
                    @click="nextMonth"
                    class="p-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <ChevronRightSmallIcon />
                  </button>
                </div>
                
                <!-- Días de la semana -->
                <div class="grid grid-cols-7 gap-1 mb-2">
                  <div v-for="day in weekDays" :key="day" class="text-center text-xs text-gray-400 py-1">
                    {{ day }}
                  </div>
                </div>
                
                <!-- Días del mes -->
                <div class="grid grid-cols-7 gap-1">
                  <div 
                    v-for="day in calendarDays" 
                    :key="day.date"
                    @click="selectDate(day)"
                    :class="[
                      'text-center py-2 text-sm cursor-pointer rounded transition-colors',
                      day.isCurrentMonth 
                        ? day.isSelected 
                          ? 'bg-green-600 text-white' 
                          : day.isToday 
                            ? 'bg-blue-600 text-white' 
                            : 'text-white hover:bg-gray-600'
                        : 'text-gray-600 cursor-not-allowed'
                    ]"
                  >
                    {{ day.dayNumber }}
                  </div>
                </div>
              </div>
            </div>

            <!-- Hora programada -->
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">
                Hora de Activación
              </label>
              <div class="bg-gray-700 rounded-lg p-4 border border-gray-600">
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-xs text-gray-400 mb-1">Hora</label>
                    <select 
                      v-model="scheduledTime.hour"
                      class="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-white"
                    >
                      <option v-for="hour in 24" :key="hour" :value="hour - 1">
                        {{ String(hour - 1).padStart(2, '0') }}
                      </option>
                    </select>
                  </div>
                  <div>
                    <label class="block text-xs text-gray-400 mb-1">Minutos</label>
                    <select 
                      v-model="scheduledTime.minute"
                      class="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-white"
                    >
                      <option v-for="minute in 60" :key="minute" :value="minute - 1">
                        {{ String(minute - 1).padStart(2, '0') }}
                      </option>
                    </select>
                  </div>
                </div>
                <p class="text-sm text-gray-300 mt-3">
                  Hora programada: <span class="font-semibold text-green-400">{{ formatScheduledDateTime() }}</span>
                </p>
                <p v-if="getTimeUntilScheduled()" class="text-sm text-green-400 mt-1">
                  {{ getTimeUntilScheduled() }}
                </p>
              </div>
            </div>
          </div>

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
                  min="1" 
                  max="59"
                  class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-white"
                  placeholder="5"
                >
              </div>
              <div>
                <label class="block text-xs text-gray-400 mb-1">Segundos</label>
                <input 
                  v-model.number="duration.seconds"
                  type="number" 
                  min="0" 
                  max="59"
                  class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-white"
                  placeholder="0"
                >
              </div>
            </div>
          </div>

          <!-- Opciones rápidas para horarios -->
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-3">
              Horarios Sugeridos
            </label>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
              <button
                v-for="timeOption in timeOptions"
                :key="timeOption.label"
                type="button"
                @click="setTimeOption(timeOption)"
                class="p-3 text-sm font-medium text-green-300 bg-green-900/30 border border-green-700/50 rounded-lg hover:bg-green-800/50 transition-colors"
              >
                {{ timeOption.label }}
              </button>
            </div>
          </div>

          <!-- Opciones de repetición -->
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-3">
              Frecuencia
            </label>
            <div class="space-y-2">
              <label class="flex items-center">
                <input 
                  v-model="frequency" 
                  type="radio" 
                  value="once"
                  class="text-green-600 focus:ring-green-500 bg-gray-700 border-gray-600"
                >
                <span class="ml-2 text-sm text-gray-300">Solo una vez</span>
              </label>
              <label class="flex items-center">
                <input 
                  v-model="frequency" 
                  type="radio" 
                  value="daily"
                  class="text-green-600 focus:ring-green-500 bg-gray-700 border-gray-600"
                >
                <span class="ml-2 text-sm text-gray-300">Diariamente a la misma hora</span>
              </label>
            </div>
          </div>

          <!-- Configuración adicional -->
          <div class="bg-gray-700 rounded-lg p-4 border border-gray-600">
            <h3 class="font-medium text-white mb-3">Configuración Adicional</h3>
            <div class="space-y-3">
              <label class="flex items-center">
                <input 
                  v-model="options.notifyBeforeStart" 
                  type="checkbox" 
                  class="rounded border-gray-600 text-green-600 focus:ring-green-500 bg-gray-700"
                >
                <span class="ml-2 text-sm text-gray-300">Notificar 5 minutos antes</span>
              </label>
              <label class="flex items-center">
                <input 
                  v-model="options.notifyStart" 
                  type="checkbox" 
                  class="rounded border-gray-600 text-green-600 focus:ring-green-500 bg-gray-700"
                >
                <span class="ml-2 text-sm text-gray-300">Notificar al iniciar el riego</span>
              </label>
              <label class="flex items-center">
                <input 
                  v-model="options.notifyEnd" 
                  type="checkbox" 
                  class="rounded border-gray-600 text-green-600 focus:ring-green-500 bg-gray-700"
                >
                <span class="ml-2 text-sm text-gray-300">Notificar al finalizar el riego</span>
              </label>
            </div>
          </div>

          <!-- Vista previa -->
          <div class="bg-blue-900/30 border border-blue-700/50 rounded-lg p-4">
            <h3 class="font-medium text-blue-300 mb-2">Vista Previa</h3>
            <div class="text-sm text-blue-200 space-y-1">
              <p><strong>Fecha y hora programada:</strong> {{ formatScheduledDateTime() }}</p>
              <p><strong>Duración:</strong> {{ formatDuration() }}</p>
              <p><strong>Frecuencia:</strong> {{ frequency === 'once' ? 'Solo una vez' : 'Diario' }}</p>
              <p><strong>Caudal estimado:</strong> 2.5 L/min</p>
              <p><strong>Volumen total:</strong> {{ calculateVolume() }} L</p>
            </div>
          </div>

          <!-- Botones de acción -->
          <div class="flex space-x-4">
            <button
              type="submit"
              :disabled="!isValidConfiguration()"
              class="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-medium rounded-lg hover:from-green-700 hover:to-green-800 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed transition-all duration-200 shadow-lg"
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
          <div class="w-16 h-16 bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-700/50">
            <ConfirmIcon />
          </div>
          <h3 class="text-lg font-bold text-white mb-2">Confirmar Programación</h3>
          <p class="text-gray-300 mb-6">
            ¿Estás seguro de que quieres programar el riego para el {{ formatScheduledDateTime() }}?
            <br><br>
            <strong>Duración:</strong> {{ formatDuration() }}<br>
            <strong>{{ getTimeUntilScheduled() }}</strong>
          </p>
          <div class="flex space-x-4">
            <button 
              @click="saveScheduledWatering"
              class="flex-1 px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200"
            >
              Confirmar Programación
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
          <h3 class="text-lg font-bold text-white mb-2">Cancelar Configuración Programada</h3>
          <p class="text-gray-300 mb-6">
            ¿Estás seguro de que quieres cancelar la configuración programada?
            <br><br>
            <strong class="text-red-400">El riego no se ejecutará en la fecha programada.</strong>
          </p>
          <div class="flex space-x-4">
            <button 
              @click="cancelProgrammedMode"
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
import { useToastNotifications } from '~/composables/useToastNotifications'
import { useIrrigationModes } from '~/composables/useIrrigationModes'
import {
  HomeIcon,
  ChevronRightIcon,
  ClockIcon,
  CheckIcon,
  PauseIcon,
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightSmallIcon,
  ConfirmIcon,
  WarningIcon
} from '~/assets/icons'

// Sistema de modos de riego
const {
  isProgrammedActive,
  isWatering,
  remainingTime,
  isPaused,
  modeConfig,
  activeMode,
  activateProgrammedMode,
  cancelActiveMode,
  pauseIrrigation,
  resumeIrrigation,
  clearAllIntervals
} = useIrrigationModes()

// Estados reactivos
const scheduledDate = ref(new Date())
const scheduledTime = ref({
  hour: 7,
  minute: 0
})

const duration = ref({
  minutes: 5,
  seconds: 0
})

const frequency = ref('once')

const options = ref({
  notifyBeforeStart: true,
  notifyStart: true,
  notifyEnd: true
})

const showConfirmModal = ref(false)
const showCancelModal = ref(false)

// Calendario
const currentDate = ref(new Date())
const selectedDate = ref(new Date())

const weekDays = ['Lun', 'Mar', 'Mié', 'Juv', 'Vie', 'Sáb', 'Dom']

// Opciones predefinidas
const timeOptions = [
  { label: '06:00', hour: 6, minute: 0 },
  { label: '07:00', hour: 7, minute: 0 },
  { label: '08:30', hour: 8, minute: 30 },
  { label: '18:00', hour: 18, minute: 0 }
]

// Composables
const { toast } = useToastNotifications()
const router = useRouter()

// Helper functions para toast
const showSuccess = (message) => toast.success(message)
const showError = (message) => toast.error(message)

// Computed properties para el calendario
const currentMonthYear = computed(() => {
  return currentDate.value.toLocaleDateString('es-ES', { 
    month: 'long', 
    year: 'numeric' 
  })
})

const calendarDays = computed(() => {
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()
  
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  
  const startDate = new Date(firstDay)
  startDate.setDate(startDate.getDate() - (firstDay.getDay() || 7) + 1)
  
  const days = []
  const today = new Date()
  
  for (let i = 0; i < 42; i++) {
    const date = new Date(startDate)
    date.setDate(startDate.getDate() + i)
    
    const isCurrentMonth = date.getMonth() === month
    const isToday = date.toDateString() === today.toDateString()
    const isSelected = date.toDateString() === selectedDate.value.toDateString()
    
    days.push({
      date: date.toISOString(),
      dayNumber: date.getDate(),
      isCurrentMonth,
      isToday,
      isSelected
    })
  }
  
  return days
})

// Métodos
const selectDate = (day) => {
  if (day.isCurrentMonth) {
    selectedDate.value = new Date(day.date)
    scheduledDate.value = new Date(day.date)
  }
}

const previousMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() - 1, 1)
}

const nextMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1, 1)
}

const formatScheduledDateTime = () => {
  const date = selectedDate.value.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
  const time = formatScheduledTime()
  return `${date} a las ${time}`
}

const formatScheduledTime = () => {
  const hour = String(scheduledTime.value.hour).padStart(2, '0')
  const minute = String(scheduledTime.value.minute).padStart(2, '0')
  return `${hour}:${minute}`
}

const formatScheduledDate = () => {
  return selectedDate.value.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

const formatDuration = () => {
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

const getTimeUntilScheduled = () => {
  const now = new Date()
  const scheduled = new Date(selectedDate.value)
  scheduled.setHours(scheduledTime.value.hour, scheduledTime.value.minute, 0, 0)
  
  const diffMs = scheduled - now
  
  if (diffMs <= 0) {
    return 'La fecha/hora ya ha pasado'
  }
  
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))
  
  if (diffDays > 0) {
    return `Faltan ${diffDays} días, ${diffHours}h ${diffMinutes}min`
  } else if (diffHours > 0) {
    return `Faltan ${diffHours}h ${diffMinutes}min`
  } else {
    return `Faltan ${diffMinutes} minutos`
  }
}

const isValidConfiguration = () => {
  const now = new Date()
  const scheduled = new Date(selectedDate.value)
  scheduled.setHours(scheduledTime.value.hour, scheduledTime.value.minute, 0, 0)
  
  return (duration.value.minutes > 0 || duration.value.seconds > 0) && scheduled > now
}

const setTimeOption = (option) => {
  scheduledTime.value.hour = option.hour
  scheduledTime.value.minute = option.minute
}

const confirmConfiguration = () => {
  if (!isValidConfiguration()) {
    if (duration.value.minutes === 0 && duration.value.seconds === 0) {
      showError('Por favor, configura una duración válida para el riego')
    } else {
      showError('La fecha y hora programada debe ser futura')
    }
    return
  }
  
  showConfirmModal.value = true
}

const saveScheduledWatering = () => {
  console.log('saveScheduledWatering llamado')
  
  // Crear la fecha programada completa
  const scheduledDateTime = new Date(selectedDate.value)
  scheduledDateTime.setHours(scheduledTime.value.hour, scheduledTime.value.minute, 0, 0)
  
  // Configuración del modo programado
  const config = {
    scheduledDateTime: scheduledDateTime.toISOString(),
    duration: {
      minutes: duration.value.minutes || 0,
      seconds: duration.value.seconds || 0
    },
    frequency: frequency.value,
    options: options.value
  }
  
  console.log('Guardando configuración programada:', config)
  
  // Cerrar el modal de confirmación INMEDIATAMENTE
  showConfirmModal.value = false
  
  // Pequeño delay para asegurar que el modal se cierre
  setTimeout(() => {
    // Activar el modo programado usando el composable
    activateProgrammedMode(config)
    
    showSuccess('Riego programado configurado exitosamente')
    
    // Forzar la reactividad después de activar el modo
    nextTick(() => {
      console.log('Configuración guardada - verificando estado:', {
        isProgrammedActive: isProgrammedActive.value,
        isWatering: isWatering.value,
        modeConfig: modeConfig.value
      })
      
      // Forzar una actualización adicional si es necesario
      if (!isProgrammedActive.value) {
        console.log('Forzando actualización del estado...')
        // Trigger reactivity
        isProgrammedActive.value = isProgrammedActive.value
      }
    })
  }, 100)
}

const goBack = () => {
  router.push('/modo')
}

const cancelProgrammedMode = () => {
  console.log('cancelProgrammedMode llamado')
  try {
    // Cancelar el modo activo
    cancelActiveMode()
    
    // Mostrar mensaje de éxito
    showSuccess('Configuración programada cancelada')
    
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
const getScheduledDateFromConfig = () => {
  if (!modeConfig.value || !modeConfig.value.scheduledDateTime) {
    return 'No configurado'
  }
  
  const date = new Date(modeConfig.value.scheduledDateTime)
  return date.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

const getScheduledTimeFromConfig = () => {
  if (!modeConfig.value || !modeConfig.value.scheduledDateTime) {
    return 'No configurado'
  }
  
  const date = new Date(modeConfig.value.scheduledDateTime)
  return date.toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit'
  })
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
watch(isProgrammedActive, (newValue) => {
  console.log('isProgrammedActive cambió a:', newValue, 'activeMode:', activeMode.value)
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
      isProgrammedActive.value = isProgrammedActive.value
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

// Watcher para monitorear cuando se activa el modo programado
watch(isProgrammedActive, (newValue, oldValue) => {
  console.log('isProgrammedActive cambió de', oldValue, 'a:', newValue, 'activeMode:', activeMode.value)
  if (newValue) {
    console.log('Modo programado activado - mostrando widget de configuración')
    // Forzar la reactividad
    nextTick(() => {
      console.log('Reactividad forzada después de activar modo programado')
      // Forzar una actualización adicional
      isProgrammedActive.value = isProgrammedActive.value
    })
  }
}, { immediate: true })

// Meta del documento
useHead({
  title: 'Modo Programado - VIVANTIA',
  meta: [
    { name: 'description', content: 'Configuración del modo programado de riego' }
  ]
})

// Limpiar intervalos al desmontar el componente
onUnmounted(() => {
  clearAllIntervals()
})
</script> 