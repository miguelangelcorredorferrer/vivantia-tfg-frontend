<template>
  <div class="space-y-8">
    <div class="max-w-2xl mx-auto">
      <!-- Widget de control cuando el riego programado está activo (regando) -->
      <div v-if="irrigationStore.isProgrammedWatering" class="bg-gray-800 rounded-xl shadow-lg p-6 mb-8 border border-gray-700">
        <h2 class="text-xl font-bold text-white mb-6">Riego Programado Activo</h2>
        
        <div class="text-center space-y-6">
          <!-- Estado visual -->
          <div class="flex justify-center">
            <div class="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
              <WateringIcon />
            </div>
          </div>
          
          <!-- Información del riego activo -->
          <div class="bg-blue-900/30 border border-blue-700/50 rounded-lg p-4">
            <h3 class="font-semibold text-blue-300 mb-3">Estado del Riego</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p class="text-gray-400">Estado:</p>
                <p class="font-bold text-white">
                  {{ irrigationStore.isPaused ? 'Pausado' : 'Regando' }}
                </p>
              </div>
              <div>
                <p class="text-gray-400">Tiempo Restante:</p>
                <p class="font-bold text-blue-400">{{ irrigationStore.remainingTime || 'Calculando...' }}</p>
              </div>
              <div>
                <p class="text-gray-400">Duración Total:</p>
                <p class="font-bold text-white">{{ getDurationFromConfig() }}</p>
              </div>
              <div>
                <p class="text-gray-400">Modo:</p>
                <p class="font-bold text-white">Programado</p>
              </div>
            </div>
          </div>
          
          <!-- Botones de control -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Pausar/Reanudar -->
            <button
              v-if="!irrigationStore.isPaused"
              @click="pauseProgrammedWatering"
              class="px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-bold rounded-lg hover:from-yellow-600 hover:to-yellow-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              ⏸️ Pausar Riego
            </button>
            <button
              v-else
              @click="resumeProgrammedWatering"
              class="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-lg hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              ▶️ Reanudar Riego
            </button>
            
            <!-- Cancelar -->
            <button
              @click="showCancelActiveModal = true"
              class="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold rounded-lg hover:from-red-600 hover:to-red-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              🛑 Cancelar Riego
            </button>
          </div>
        </div>
      </div>

      <!-- Widget de estado programado cuando está activo (solo cuando está configurado pero no regando ni pausado) -->
      <div v-if="irrigationStore.isProgrammedActive && !irrigationStore.isWatering && !irrigationStore.isPaused" class="bg-gray-800 rounded-xl shadow-lg p-6 mb-8 border border-gray-700">
        
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
                <p class="font-bold text-green-400">{{ irrigationStore.remainingTime || 'Calculando...' }}</p>
              </div>
            </div>
          </div>
          
          <!-- Botones de acción -->
          <div class="space-y-3">
            <!-- Botón de deshacer configuración -->
            <button
              @click="showCancelModal = true"
              class="w-full px-6 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold text-lg rounded-lg hover:from-red-600 hover:to-red-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              🗑️ Deshacer Configuración
            </button>
            
            <!-- Botón de volver -->
            <button
              @click="goBack"
              class="w-full px-6 py-4 bg-gray-600 text-gray-300 font-bold text-lg rounded-lg hover:bg-gray-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              ← Volver a Modos de Riego
            </button>
          </div>
        </div>
      </div>

      <!-- Widget de riego activo cuando está regando -->
      <div v-if="irrigationStore.isProgrammedActive && irrigationStore.isWatering && !irrigationStore.isPaused" class="bg-gray-800 rounded-xl shadow-lg p-6 mb-8 border border-gray-700">

        <h2 class="text-xl font-bold text-white mb-6">Riego Programado Activo</h2>
        
        <div class="text-center space-y-6">
          <!-- Estado visual -->
          <div class="flex justify-center">
            <div class="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
              <WaterDropIcon />
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
                <p class="font-bold text-white">{{ irrigationStore.remainingTime || 'Calculando...' }}</p>
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
      <div v-if="irrigationStore.isProgrammedActive && irrigationStore.isPaused" class="bg-gray-800 rounded-xl shadow-lg p-6 mb-8 border border-gray-700">

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
                <p class="font-bold text-white">{{ irrigationStore.remainingTime || 'Calculando...' }}</p>
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
        
        <!-- Advertencia de tiempo de respuesta -->
        <div class="bg-yellow-900/30 border border-yellow-500/30 rounded-lg p-4 mt-4">
          <h3 class="font-semibold text-yellow-400 mb-2">⚠️ Advertencia Importante</h3>
          <p class="text-sm text-yellow-300">
            <strong>Tiempo de respuesta del sistema:</strong> La bomba puede tardar entre 2-15 segundos en activarse al iniciar el riego y entre 2-15 segundos en detenerse al cancelar o pausar. Este tiempo es normal debido a la comunicación LoRaWAN con el dispositivo IoT.
          </p>
        </div>
      </div>

      <!-- Formulario de configuración -->
      <div v-if="!irrigationStore.isProgrammedActive" class="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700">
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
            <div>
              <label class="block text-xs text-gray-400 mb-1">Minutos</label>
              <input 
                v-model.number="duration.minutes"
                type="number" 
                min="1" 
                max="1440"
                class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-white"
                placeholder="5"
              >
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

          <!-- Opciones de frecuencia visual -->
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-4">
              Frecuencia de Riego
            </label>
            
            <!-- Opciones de frecuencia -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <!-- Opción: Solo una vez -->
              <div 
                @click="selectFrequency('once')"
                class="relative cursor-pointer group"
              >
                <div 
                  class="p-4 rounded-xl border-2 transition-all duration-200"
                  :class="frequency === 'once' 
                    ? 'border-green-500 bg-green-900/20 shadow-lg shadow-green-500/20' 
                    : 'border-gray-600 bg-gray-700/50 hover:border-gray-500 hover:bg-gray-700'"
                >
                  <div class="text-center">
                    <div class="w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center"
                         :class="frequency === 'once' ? 'bg-green-500' : 'bg-gray-600'">
                      <span class="text-xl">1️⃣</span>
                    </div>
                    <h3 class="font-semibold text-white mb-2">Solo una vez</h3>
                    <p class="text-sm text-gray-400">Riego único en la fecha y hora seleccionada</p>
                  </div>
                  <!-- Checkmark -->
                  <div v-if="frequency === 'once'" 
                       class="absolute top-2 right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <span class="text-white text-sm">✓</span>
                  </div>
                </div>
              </div>

              <!-- Opción: Diariamente -->
              <div 
                @click="selectFrequency('daily')"
                class="relative cursor-pointer group"
              >
                <div 
                  class="p-4 rounded-xl border-2 transition-all duration-200"
                  :class="frequency === 'daily' 
                    ? 'border-green-500 bg-green-900/20 shadow-lg shadow-green-500/20' 
                    : 'border-gray-600 bg-gray-700/50 hover:border-gray-500 hover:bg-gray-700'"
                >
                  <div class="text-center">
                    <div class="w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center"
                         :class="frequency === 'daily' ? 'bg-green-500' : 'bg-gray-600'">
                      <span class="text-xl">🔄</span>
                    </div>
                    <h3 class="font-semibold text-white mb-2">Diariamente</h3>
                    <p class="text-sm text-gray-400">Riego automático todos los días a la misma hora</p>
                  </div>
                  <!-- Checkmark -->
                  <div v-if="frequency === 'daily'" 
                       class="absolute top-2 right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <span class="text-white text-sm">✓</span>
                  </div>
                </div>
              </div>

              <!-- Opción: Días personalizados -->
              <div 
                @click="selectFrequency('custom')"
                class="relative cursor-pointer group"
              >
                <div 
                  class="p-4 rounded-xl border-2 transition-all duration-200"
                  :class="frequency === 'custom' 
                    ? 'border-green-500 bg-green-900/20 shadow-lg shadow-green-500/20' 
                    : 'border-gray-600 bg-gray-700/50 hover:border-gray-500 hover:bg-gray-700'"
                >
                  <div class="text-center">
                    <div class="w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center"
                         :class="frequency === 'custom' ? 'bg-green-500' : 'bg-gray-600'">
                      <span class="text-xl">📅</span>
                    </div>
                    <h3 class="font-semibold text-white mb-2">Días específicos</h3>
                    <p class="text-sm text-gray-400">Elegir los días de la semana para el riego</p>
                  </div>
                  <!-- Checkmark -->
                  <div v-if="frequency === 'custom'" 
                       class="absolute top-2 right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <span class="text-white text-sm">✓</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Selector de días personalizados (solo visible si frequency === 'custom') -->
            <div v-if="frequency === 'custom'" class="mt-6">
              <label class="block text-sm font-medium text-gray-300 mb-3">
                Seleccionar días de la semana
              </label>
              <div class="grid grid-cols-7 gap-2">
                <div 
                  v-for="(day, index) in weekDays" 
                  :key="index"
                  @click="toggleDay(index)"
                  class="relative cursor-pointer group"
                >
                  <div 
                    class="p-3 rounded-lg border-2 text-center transition-all duration-200"
                    :class="selectedDays.includes(index) 
                      ? 'border-green-500 bg-green-900/30 text-green-300' 
                      : 'border-gray-600 bg-gray-700/50 text-gray-400 hover:border-gray-500 hover:bg-gray-700'"
                  >
                    <div class="text-sm font-medium">{{ day }}</div>
                    <!-- Checkmark para días seleccionados -->
                    <div v-if="selectedDays.includes(index)" 
                         class="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <span class="text-white text-xs">✓</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Resumen de días seleccionados -->
              <div v-if="selectedDays.length > 0" class="mt-3 p-3 bg-green-900/20 border border-green-700/50 rounded-lg">
                <p class="text-sm text-green-300">
                  <strong>Días seleccionados:</strong> 
                  {{ getSelectedDaysText() }}
                </p>
              </div>
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
                  :disabled="!canNotifyBefore"
                  class="rounded border-gray-600 text-green-600 focus:ring-green-500 bg-gray-700 disabled:opacity-50"
                >
                <span class="ml-2 text-sm text-gray-300">
                  Notificar 5 minutos antes
                  <span v-if="!canNotifyBefore" class="text-gray-500 text-xs ml-1">(requiere programación con al menos 10 min de anticipación)</span>
                </span>
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
              <p><strong>Frecuencia:</strong> {{ getFrequencyText() }}</p>
              <p><strong>Caudal estimado:</strong> 0.4 L/min</p>
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

      <!-- Mensaje cuando hay un modo activo -->
      <div v-if="irrigationStore.hasActiveMode && irrigationStore.activeMode !== 'programmed'" class="bg-orange-900/60 border border-orange-500/30 rounded-xl shadow-lg p-6">
        <div class="text-center">
          <div class="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <WarningIcon />
          </div>
          <h3 class="text-lg font-bold text-white mb-2">Modo {{ irrigationStore.activeMode }} Activo</h3>
          <p class="text-orange-300 mb-4">
            Ya tienes un modo de riego activo. Debes cancelar la configuración actual antes de poder configurar el modo programado.
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

    <!-- Mensaje cuando otros modos están activos -->
    <div v-if="irrigationStore.hasActiveMode && irrigationStore.activeMode !== 'programmed'" class="max-w-2xl mx-auto">
      <div class="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700">
        <div class="text-center space-y-4">
          <div class="text-4xl">⚠️</div>
          <h3 class="text-xl font-bold text-white">Otro Modo de Riego Activo</h3>
          <p class="text-gray-300">
            Actualmente tienes el modo <strong class="text-blue-400">{{ irrigationStore.getModeDescription(irrigationStore.activeMode) }}</strong> activo.
            <br><br>
            Para configurar el modo programado, primero debes cancelar el modo activo desde su página correspondiente.
          </p>
          <button 
            @click="navigateToActiveMode"
            class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            Ir al Modo Activo
          </button>
        </div>
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

    <!-- Modal de cancelación de riego activo -->
    <div v-if="showCancelActiveModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" @click="closeCancelActiveModal">
      <div class="bg-gray-800 border border-gray-600/30 p-6 rounded-xl max-w-md w-full mx-4" @click.stop>
        <div class="text-center">
          <div class="w-16 h-16 bg-red-900/60 border border-red-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <WarningIcon />
          </div>
          <h3 class="text-lg font-bold text-white mb-2">Cancelar Riego Activo</h3>
          <p class="text-gray-300 mb-6">
            ¿Estás seguro de que quieres cancelar el riego que está en curso?
            <br><br>
            <strong class="text-yellow-400">El riego se detendrá inmediatamente.</strong>
            <br>
            <span class="text-blue-400">Si tienes configuración daily o días múltiples, se reprogramará automáticamente.</span>
          </p>
          <div class="flex space-x-4">
            <button 
              @click="cancelActiveProgrammedWatering"
              class="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Sí, Cancelar Riego
            </button>
            <button 
              @click="closeCancelActiveModal"
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
  ClockIcon,
  CheckIcon,
  PauseIcon,
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightSmallIcon,
  ConfirmIcon,
  WarningIcon,
  WaterDropIcon
} from '~/assets/icons'

// Store de irrigation
const irrigationStore = useIrrigationStore()
const userStore = useUserStore()
const cropStore = useCropStore()

// Estados reactivos
const scheduledDate = ref(new Date())
const scheduledTime = ref({
  hour: 7,
  minute: 0
})

const duration = ref({
  minutes: 5
})

const frequency = ref('once')
const selectedDays = ref([]) // Para días personalizados

const options = ref({
  notifyBeforeStart: true,
  notifyStart: true,
  notifyEnd: true
})

const showConfirmModal = ref(false)
const showCancelModal = ref(false)
const showCancelActiveModal = ref(false)

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
  
  if (totalMinutes === 0) {
    return 'No configurado'
  }
  
  return `${totalMinutes} min`
}

const calculateVolume = () => {
  const totalMinutes = (duration.value.minutes || 0)
  const flowRate = 0.4 // L/min
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
  
  const diffMinutes = Math.floor(diffMs / (1000 * 60))
  
  if (diffMinutes < 60) {
    return `Faltan ${diffMinutes} minutos`
  } else {
    const diffHours = Math.floor(diffMinutes / 60)
    return `Faltan ${diffHours}h ${diffMinutes % 60}min`
  }
}

// Computed para verificar si se puede notificar 5 minutos antes
const canNotifyBefore = computed(() => {
  const now = new Date()
  const scheduled = new Date(selectedDate.value)
  scheduled.setHours(scheduledTime.value.hour, scheduledTime.value.minute, 0, 0)
  
  const diffMs = scheduled - now
  const diffMinutes = Math.floor(diffMs / (1000 * 60))
  
  // Requiere al menos 10 minutos de anticipación para notificar 5 minutos antes
  return diffMinutes >= 10
})

const isValidConfiguration = () => {
  const now = new Date()
  const scheduled = new Date(selectedDate.value)
  scheduled.setHours(scheduledTime.value.hour, scheduledTime.value.minute, 0, 0)
  
  const hasValidDuration = (duration.value.minutes > 0)
  const hasValidDateTime = scheduled > now
  
  // Validación específica para frecuencia personalizada
  if (frequency.value === 'custom' && selectedDays.value.length === 0) {
    return false
  }
  
  return hasValidDuration && hasValidDateTime
}

const setTimeOption = (option) => {
  scheduledTime.value.hour = option.hour
  scheduledTime.value.minute = option.minute
}

// Métodos para manejar la frecuencia
const selectFrequency = (freq) => {
  frequency.value = freq
  // Limpiar días seleccionados si no es custom
  if (freq !== 'custom') {
    selectedDays.value = []
  }
}

const toggleDay = (dayIndex) => {
  const index = selectedDays.value.indexOf(dayIndex)
  if (index > -1) {
    selectedDays.value.splice(index, 1)
  } else {
    selectedDays.value.push(dayIndex)
  }
  // Ordenar los días
  selectedDays.value.sort()
}

const getSelectedDaysText = () => {
  if (selectedDays.value.length === 0) return 'Ningún día seleccionado'
  
  const dayNames = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']
  const selectedDayNames = selectedDays.value.map(index => dayNames[index])
  
  if (selectedDayNames.length === 1) {
    return selectedDayNames[0]
  } else if (selectedDayNames.length === 2) {
    return `${selectedDayNames[0]} y ${selectedDayNames[1]}`
  } else {
    const last = selectedDayNames.pop()
    return `${selectedDayNames.join(', ')} y ${last}`
  }
}

const getFrequencyText = () => {
  switch (frequency.value) {
    case 'once':
      return 'Solo una vez'
    case 'daily':
      return 'Diariamente a la misma hora'
    case 'custom':
      return `Días específicos: ${getSelectedDaysText()}`
    default:
      return 'No configurado'
  }
}

const confirmConfiguration = () => {
  if (!isValidConfiguration()) {
    if (duration.value.minutes === 0) {
      showError('Por favor, configura una duración válida para el riego')
    } else if (frequency.value === 'custom' && selectedDays.value.length === 0) {
      showError('Por favor, selecciona al menos un día de la semana para el riego personalizado')
    } else {
      showError('La fecha y hora programada debe ser futura')
    }
    return
  }
  
  showConfirmModal.value = true
}

const saveScheduledWatering = async () => {
  console.log('saveScheduledWatering llamado')
  
  // Validar que el usuario esté autenticado
  if (!userStore.user || !userStore.user.id) {
    console.error('❌ Usuario no autenticado:', userStore.user)
    showError('Error: Usuario no autenticado. Por favor, inicia sesión nuevamente.')
    return
  }
  
  // Validar que haya un cultivo seleccionado
  if (!cropStore.currentCrop || !cropStore.currentCrop.id) {
    console.error('❌ No hay cultivo seleccionado:', cropStore.currentCrop)
    showError('Error: No hay cultivo seleccionado. Por favor, selecciona un cultivo.')
    return
  }
  
  // Cerrar el modal de confirmación INMEDIATAMENTE
  showConfirmModal.value = false
  
  // Crear la fecha programada completa
  if (!selectedDate.value) {
    console.error('❌ selectedDate.value es undefined o null')
    showError('Error: Fecha no seleccionada')
    return
  }
  
  const scheduledDateTime = new Date(selectedDate.value)
  
  // Validar que scheduledTime.value tenga los valores necesarios
  if (scheduledTime.value.hour === undefined || scheduledTime.value.minute === undefined) {
    console.error('❌ scheduledTime.value no tiene hour o minute definidos:', scheduledTime.value)
    showError('Error: Hora no configurada correctamente')
    return
  }
  
  scheduledDateTime.setHours(scheduledTime.value.hour, scheduledTime.value.minute, 0, 0)
  
  // Formatear la fecha manteniendo la zona horaria local
  const localDateTime = new Date(scheduledDateTime.getTime() - (scheduledDateTime.getTimezoneOffset() * 60000)).toISOString()
  
  console.log('🔍 Datos de configuración:', {
    user: userStore.user,
    crop: cropStore.currentCrop,
    scheduledDateTime: localDateTime,
    originalDate: scheduledDateTime,
    timezoneOffset: scheduledDateTime.getTimezoneOffset()
  })
  
  // Configuración para el riego programado
  const config = {
    user_id: userStore.user.id,
    crop_id: cropStore.currentCrop.id,
    start_datetime: localDateTime,
    end_date: null, // Puede ser null para programas indefinidos
    duration_minutes: duration.value.minutes || 0,
    frequency_type: frequency.value,
    custom_days: frequency.value === 'custom' ? selectedDays.value : [],
    notify_before_minutes: options.value.notifyBeforeStart ? 5 : 0,
    notify_at_start: options.value.notifyStart,
    notify_at_end: options.value.notifyEnd
  }
  
  console.log('Configuración enviada:', config)
  
  // Activar el modo programado usando el store
  const success = await irrigationStore.startProgrammedIrrigation(config)
  
  if (success) {
    showSuccess('Riego programado configurado exitosamente')
    
    // Pequeño delay para asegurar que el estado se actualice
    setTimeout(async () => {
      await irrigationStore.loadActiveConfiguration()
      // Iniciar monitoreo inmediatamente después de guardar
      if (irrigationStore.isProgrammedActive) {
        startStatusMonitoring()
      }
    }, 500)
    
    // Redirigir a la página principal después de un breve delay
    setTimeout(() => {
      router.push('/modo')
    }, 1500)
  }
}

const pauseIrrigation = async () => {
  const success = await irrigationStore.pauseIrrigation()
  if (success) {
    showSuccess('Riego pausado')
  }
}

const resumeIrrigation = async () => {
  const success = await irrigationStore.resumeIrrigation()
  if (success) {
    showSuccess('Riego reanudado')
  }
}

const goBack = () => {
  router.push('/modo')
}

const cancelProgrammedMode = async () => {
  console.log('🟡 cancelProgrammedMode llamado')
  try {
    // Cerrar el modal inmediatamente
    showCancelModal.value = false
    
    console.log('🔄 Llamando a irrigationStore.cancelActiveMode()...')
    // Cancelar el modo activo usando el store
    const success = await irrigationStore.cancelActiveMode()
    
    console.log('📊 Resultado cancelActiveMode:', success)
    
    if (success) {
      console.log('✅ Configuración cancelada exitosamente')
      showSuccess('Configuración programada cancelada')
      
      // Forzar recarga del estado después de un pequeño delay
      setTimeout(async () => {
        console.log('🔄 Forzando recarga del estado después de cancelación')
        await irrigationStore.loadActiveConfiguration()
        
        // Si aún hay configuración activa, detener monitoreo y limpiar estado
        if (irrigationStore.isProgrammedActive) {
          console.warn('⚠️ El estado aún muestra configuración activa, forzando limpieza')
          stopStatusMonitoring()
          await irrigationStore.loadActiveConfiguration()
        }
      }, 500)
    } else {
      console.log('❌ cancelActiveMode retornó false')
      showError('No se pudo cancelar la configuración')
    }
    
  } catch (error) {
    console.error('❌ Error al cancelar configuración:', error)
    showError('Error al cancelar la configuración: ' + error.message)
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

// Funciones de control para riego programado activo
const pauseProgrammedWatering = async () => {
  try {
    await irrigationStore.pauseIrrigation()
    showSuccess('Riego pausado correctamente')
  } catch (error) {
    console.error('Error pausando riego programado:', error)
    showError('Error al pausar el riego')
  }
}

const resumeProgrammedWatering = async () => {
  try {
    await irrigationStore.resumeIrrigation()
    showSuccess('Riego reanudado correctamente')
  } catch (error) {
    console.error('Error reanudando riego programado:', error)
    showError('Error al reanudar el riego')
  }
}

const cancelActiveProgrammedWatering = async () => {
  try {
    showCancelActiveModal.value = false
    await irrigationStore.cancelActiveMode()
    showSuccess('Riego programado cancelado correctamente')
    
    // Nota: Si hay más días programados (daily o custom), se reprogramará automáticamente
    if (irrigationStore.specificConfig?.frequency_type === 'daily' || 
        (irrigationStore.specificConfig?.frequency_type === 'custom' && 
         irrigationStore.specificConfig?.custom_days?.length > 1)) {
      showInfo('El riego se reprogramará automáticamente para el próximo día configurado')
    }
  } catch (error) {
    console.error('Error cancelando riego programado activo:', error)
    showError('Error al cancelar el riego')
  }
}

const closeCancelActiveModal = () => {
  showCancelActiveModal.value = false
}

// Funciones para obtener información desde la configuración guardada
const getScheduledDateFromConfig = () => {
  if (!irrigationStore.specificConfig?.start_datetime) {
    return 'No configurado'
  }
  
  const date = new Date(irrigationStore.specificConfig.start_datetime)
  return date.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

const getScheduledTimeFromConfig = () => {
  if (!irrigationStore.specificConfig?.start_datetime) {
    return 'No configurado'
  }
  
  const date = new Date(irrigationStore.specificConfig.start_datetime)
  return date.toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

const getDurationFromConfig = () => {
  // La duración está en irrigationConfig, no en specificConfig
  const minutes = irrigationStore.irrigationConfig?.duration_minutes || 0
  
  if (minutes === 0) {
    return 'No configurado'
  }
  
  return `${minutes} min`
}



// Cargar configuración activa al montar
// Función para navegar al modo activo
const navigateToActiveMode = () => {
  const mode = irrigationStore.activeMode
  if (mode === 'manual') {
    router.push('/modo/manual')
  } else if (mode === 'automatic') {
    router.push('/modo/automatico')
  } else {
    router.push('/modo')
  }
}

onMounted(async () => {
  console.log('🚀 onMounted - Cargando configuración...')
  // Asegurar que la fecha/hora inicial sea futura (ahora + 10 min)
  try {
    const now = new Date()
    const future = new Date(now.getTime() + 10 * 60 * 1000) // +10 minutos

    // Actualizar valores reactivos para que la configuración inicial sea válida
    scheduledDate.value = new Date(future)
    selectedDate.value = new Date(future)
    scheduledTime.value.hour = future.getHours()
    scheduledTime.value.minute = future.getMinutes()
  } catch (err) {
    console.error('Error estableciendo fecha/hora inicial futura:', err)
  }

  try {
    // El middleware crop-required ya se encarga de validar usuario y cultivo
    console.log('📊 Estado de stores en onMounted:', {
      user: userStore.user,
      currentCrop: cropStore.currentCrop,
      isAuthenticated: userStore.isAuthenticated,
      cropSelected: cropStore.currentCrop?.selected
    })
    
    // Cargar configuración activa de riego
    await irrigationStore.loadActiveConfiguration()
    console.log('✅ Configuración activa cargada')
    
    // Pequeño delay para permitir que la reactividad se propague
    await new Promise(resolve => setTimeout(resolve, 100))
    
    // Iniciar monitoreo inmediatamente si hay actividad programada
    if (irrigationStore.isProgrammedActive || irrigationStore.isWatering || irrigationStore.isPaused) {
      console.log('🚀 [ONMOUNTED] Detectada actividad programada, iniciando monitoreo inmediato')
      startStatusMonitoring()
    }
  } catch (error) {
    console.error('❌ Error en onMounted:', error)
    showError('Error al cargar la configuración: ' + error.message)
  }
})

// Watchers para asegurar reactividad
watch(() => irrigationStore.hasActiveMode, (newValue) => {
  console.log('🔄 hasActiveMode cambió a:', newValue)
})

watch(() => irrigationStore.isProgrammedActive, (newValue) => {
  console.log('🔄 isProgrammedActive cambió a:', newValue)
})

watch(() => irrigationStore.isProgrammedWaiting, (newValue) => {
  console.log('🔄 isProgrammedWaiting cambió a:', newValue)
})

watch(() => irrigationStore.activeMode, (newValue) => {
  console.log('🔄 activeMode cambió a:', newValue)
})

watch(() => irrigationStore.activePumpActivation, (newValue) => {
  console.log('🔄 activePumpActivation cambió a:', newValue)
})

watch(() => irrigationStore.isWatering, (newValue) => {
  console.log('🔄 isWatering cambió a:', newValue)
})

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
      
      // Debug: Estado después de cargar configuración
      console.log('🔍 [PROGRAMMED-MONITOR] Estado actual:', {
        activeMode: irrigationStore.activeMode,
        isProgrammedActive: irrigationStore.isProgrammedActive,
        isProgrammedWaiting: irrigationStore.isProgrammedWaiting,
        isWatering: irrigationStore.isWatering,
        isPaused: irrigationStore.isPaused,
        pumpStatus: irrigationStore.activePumpActivation?.status,
        hasActiveMode: irrigationStore.hasActiveMode,
        irrigationConfigId: irrigationStore.irrigationConfig?.id
      })
    }
  }, 3000) // Cada 3 segundos
  
  console.log('✅ [PROGRAMMED] Monitoreo de estado iniciado')
}

const stopStatusMonitoring = () => {
  if (statusMonitoringInterval) {
    clearInterval(statusMonitoringInterval)
    statusMonitoringInterval = null
    console.log('🛑 [PROGRAMMED] Monitoreo de estado detenido')
  }
}

// Watcher para iniciar/detener monitoreo según el estado
watch(() => irrigationStore.isProgrammedActive, (newValue, oldValue) => {
  console.log('🔄 isProgrammedActive cambió:', { oldValue, newValue, activeMode: irrigationStore.activeMode })
  if (newValue) {
    console.log('🚀 [WATCHER] Iniciando monitoreo por isProgrammedActive')
    startStatusMonitoring()
  } else {
    console.log('🛑 [WATCHER] Deteniendo monitoreo por isProgrammedActive')
    stopStatusMonitoring()
  }
}, { immediate: true })

// Watcher adicional para activeMode programado
watch(() => irrigationStore.activeMode, (newMode, oldMode) => {
  console.log('🔄 activeMode cambió:', { oldMode, newMode })
  if (newMode === 'programmed') {
    console.log('🚀 [WATCHER] Iniciando monitoreo por activeMode programmed')
    startStatusMonitoring()
  } else if (oldMode === 'programmed' && newMode !== 'programmed') {
    console.log('🛑 [WATCHER] Deteniendo monitoreo por activeMode ya no programmed')
    stopStatusMonitoring()
  }
}, { immediate: true })

// Watcher para estado de riego (regando/pausado)
watch(() => irrigationStore.isWatering, (newValue) => {
  console.log('🔄 isWatering cambió a:', newValue)
  if (newValue || irrigationStore.isPaused) {
    startStatusMonitoring()
  }
}, { immediate: true })

// Limpiar al desmontar el componente
onUnmounted(() => {
  stopStatusMonitoring()
  irrigationStore.cleanup()
})

// Meta del documento
useHead({
  title: 'Modo Programado - VIVANTIA',
  meta: [
    { name: 'description', content: 'Configuración del modo programado de riego' }
  ]
})
</script> 