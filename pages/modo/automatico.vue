<template>
  <div class="space-y-8">
    <div class="max-w-2xl mx-auto">
      <!-- Breadcrumb -->
      <nav class="flex mb-6" aria-label="Breadcrumb">
        <ol class="inline-flex items-center space-x-1 md:space-x-3">
          <li class="inline-flex items-center">
            <NuxtLink to="/modo" class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600">
              <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
              </svg>
              Modos de Riego
            </NuxtLink>
          </li>
          <li>
            <div class="flex items-center">
              <svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
              </svg>
              <span class="ml-1 text-sm font-medium text-gray-500 md:ml-2">Modo Automático</span>
            </div>
          </li>
        </ol>
      </nav>

      <!-- Título y descripción -->
      <div class="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div class="flex items-center mb-4">
          <div class="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mr-4">
            <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
            </svg>
          </div>
          <div>
            <h1 class="text-2xl font-bold text-gray-800">Modo Automático</h1>
            <p class="text-gray-600">Riego inteligente basado en sensores</p>
          </div>
        </div>
        
        <div class="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <h3 class="font-semibold text-purple-800 mb-2">¿Cómo funciona el modo automático?</h3>
          <ul class="text-sm text-purple-700 space-y-1">
            <li>• Monitorea temperatura y humedad en tiempo real</li>
            <li>• Activa el riego cuando se cumplen los umbrales configurados</li>
            <li>• Evita el riego excesivo con configuración inteligente</li>
            <li>• Ideal para un cuidado óptimo y eficiente del cultivo</li>
          </ul>
        </div>
      </div>

      <!-- Estado actual de sensores -->
      <div class="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h2 class="text-xl font-bold text-gray-800 mb-4">Estado Actual de Sensores</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Temperatura -->
          <div class="bg-gradient-to-br from-red-50 to-orange-100 p-4 rounded-lg border border-red-200">
            <div class="flex items-center justify-between mb-2">
              <h3 class="font-medium text-red-800">Temperatura</h3>
              <svg class="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v3a1 1 0 002 0V5z" clip-rule="evenodd"/>
              </svg>
            </div>
            <p class="text-3xl font-bold text-red-900">{{ currentTemperature }}°C</p>
            <p class="text-sm text-red-700 mt-1">{{ getTemperatureStatus() }}</p>
          </div>

          <!-- Humedad -->
          <div class="bg-gradient-to-br from-blue-50 to-cyan-100 p-4 rounded-lg border border-blue-200">
            <div class="flex items-center justify-between mb-2">
              <h3 class="font-medium text-blue-800">Humedad</h3>
              <svg class="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
              </svg>
            </div>
            <p class="text-3xl font-bold text-blue-900">{{ currentHumidity }}%</p>
            <p class="text-sm text-blue-700 mt-1">{{ getHumidityStatus() }}</p>
          </div>
        </div>
      </div>

      <!-- Formulario de configuración -->
      <div class="bg-white rounded-xl shadow-lg p-6">
        <h2 class="text-xl font-bold text-gray-800 mb-6">Configurar Umbrales Automáticos</h2>
        
        <form @submit.prevent="confirmConfiguration" class="space-y-6">
          <!-- Configuración de temperatura -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-4">
              Umbrales de Temperatura
            </label>
            
            <div class="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <h4 class="font-medium text-red-800 mb-3">Temperatura Máxima</h4>
              <div class="flex items-center space-x-4">
                <input 
                  v-model.number="thresholds.maxTemperature"
                  type="number" 
                  min="15" 
                  max="45"
                  step="0.5"
                  class="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                <span class="text-sm text-gray-600">°C</span>
                <div class="flex-1">
                  <input 
                    v-model.number="thresholds.maxTemperature"
                    type="range" 
                    min="15" 
                    max="45"
                    step="0.5"
                    class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  >
                </div>
              </div>
              <p class="text-xs text-red-600 mt-2">Se activará el riego cuando la temperatura supere este valor</p>
            </div>
          </div>

          <!-- Configuración de humedad -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-4">
              Umbrales de Humedad del Suelo
            </label>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- Humedad mínima -->
              <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 class="font-medium text-blue-800 mb-3">Humedad Mínima</h4>
                <div class="flex items-center space-x-4">
                  <input 
                    v-model.number="thresholds.minHumidity"
                    type="number" 
                    min="0" 
                    max="100"
                    class="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                  <span class="text-sm text-gray-600">%</span>
                </div>
                <input 
                  v-model.number="thresholds.minHumidity"
                  type="range" 
                  min="0" 
                  max="100"
                  class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider mt-2"
                >
                <p class="text-xs text-blue-600 mt-2">Se activará el riego cuando baje de este valor</p>
              </div>

              <!-- Humedad máxima -->
              <div class="bg-cyan-50 border border-cyan-200 rounded-lg p-4">
                <h4 class="font-medium text-cyan-800 mb-3">Humedad Máxima</h4>
                <div class="flex items-center space-x-4">
                  <input 
                    v-model.number="thresholds.maxHumidity"
                    type="number" 
                    min="0" 
                    max="100"
                    class="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                  <span class="text-sm text-gray-600">%</span>
                </div>
                <input 
                  v-model.number="thresholds.maxHumidity"
                  type="range" 
                  min="0" 
                  max="100"
                  class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider mt-2"
                >
                <p class="text-xs text-cyan-600 mt-2">Se detendrá el riego al alcanzar este valor</p>
              </div>
            </div>
          </div>

          <!-- Configuración de tiempo -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Duración Máxima del Riego
            </label>
            <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div class="grid grid-cols-2 gap-4 mb-3">
                <div>
                  <label class="block text-xs text-gray-500 mb-1">Minutos</label>
                  <input 
                    v-model.number="duration.minutes"
                    type="number" 
                    min="1" 
                    max="30"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                </div>
                <div>
                  <label class="block text-xs text-gray-500 mb-1">Segundos</label>
                  <input 
                    v-model.number="duration.seconds"
                    type="number" 
                    min="0" 
                    max="59"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                </div>
              </div>
              <p class="text-xs text-yellow-700">Tiempo máximo de riego por activación automática</p>
            </div>
          </div>

          <!-- Configuración avanzada -->
          <div class="bg-gray-50 rounded-lg p-4">
            <h3 class="font-medium text-gray-800 mb-3">Configuración Avanzada</h3>
            <div class="space-y-3">
              <div>
                <label class="block text-sm text-gray-700 mb-1">Intervalo Mínimo entre Riegos</label>
                <select 
                  v-model="advancedOptions.cooldownMinutes"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="30">30 minutos</option>
                  <option value="60">1 hora</option>
                  <option value="120">2 horas</option>
                  <option value="240">4 horas</option>
                </select>
              </div>
              
              <div class="space-y-2">
                <label class="flex items-center">
                  <input 
                    v-model="advancedOptions.enableNightMode" 
                    type="checkbox" 
                    class="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  >
                  <span class="ml-2 text-sm text-gray-700">Desactivar riego nocturno (22:00 - 06:00)</span>
                </label>
                <label class="flex items-center">
                  <input 
                    v-model="advancedOptions.notifyActivation" 
                    type="checkbox" 
                    class="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  >
                  <span class="ml-2 text-sm text-gray-700">Notificar cada activación automática</span>
                </label>
              </div>
            </div>
          </div>

          <!-- Vista previa de configuración -->
          <div class="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h3 class="font-medium text-purple-800 mb-2">Vista Previa de Configuración</h3>
            <div class="text-sm text-purple-700 space-y-1">
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
              class="flex-1 px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              Activar Modo Automático
            </button>
            <button
              type="button"
              @click="goBack"
              class="px-6 py-3 bg-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-400 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal de confirmación -->
    <div v-if="showConfirmModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded-xl max-w-md w-full mx-4">
        <div class="text-center">
          <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
            </svg>
          </div>
          <h3 class="text-lg font-bold text-gray-800 mb-2">Activar Modo Automático</h3>
          <p class="text-gray-600 mb-6">
            ¿Estás seguro de que quieres activar el modo automático con esta configuración?
            <br><br>
            <strong>El sistema monitoreará continuamente los sensores y regará automáticamente cuando sea necesario.</strong>
          </p>
          <div class="flex space-x-4">
            <button 
              @click="activateAutomaticMode"
              class="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Activar Modo Automático
            </button>
            <button 
              @click="showConfirmModal = false"
              class="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useToastNotifications } from '~/composables/useToastNotifications'

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

const advancedOptions = ref({
  cooldownMinutes: 60,
  enableNightMode: true,
  notifyActivation: true
})

const showConfirmModal = ref(false)

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

const activateAutomaticMode = () => {
  showConfirmModal.value = false
  
  // Aquí se enviaría la configuración al backend/IoT
  const config = {
    mode: 'automatico',
    thresholds: {
      maxTemperature: thresholds.value.maxTemperature,
      minHumidity: thresholds.value.minHumidity,
      maxHumidity: thresholds.value.maxHumidity
    },
    duration: {
      minutes: duration.value.minutes || 0,
      seconds: duration.value.seconds || 0
    },
    advancedOptions: advancedOptions.value,
    activationTime: new Date()
  }
  
  console.log('Configuración automática enviada:', config)
  
  showSuccess('Modo automático activado exitosamente')
  
  // Redirigir de vuelta a la página principal
  setTimeout(() => {
    router.push('/modo')
  }, 1500)
}

const goBack = () => {
  router.push('/modo')
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