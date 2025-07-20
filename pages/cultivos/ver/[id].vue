<template>
  <div class="space-y-8">
    <div class="max-w-4xl mx-auto">
      <!-- Breadcrumb -->
      <nav class="flex mb-6" aria-label="Breadcrumb">
        <ol class="inline-flex items-center space-x-1 md:space-x-3">
          <li class="inline-flex items-center">
            <NuxtLink to="/cultivos" class="inline-flex items-center text-sm font-medium text-gray-300 hover:text-blue-400 transition-colors">
              <HomeIcon />
              Cultivos
            </NuxtLink>
          </li>
          <li>
            <div class="flex items-center">
              <ChevronRightIcon />
              <span class="ml-1 text-sm font-medium text-gray-400 md:ml-2">Ver Cultivo</span>
            </div>
          </li>
        </ol>
      </nav>

      <!-- Loading State -->
      <div v-if="loading" class="flex items-center justify-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
        <span class="ml-3 text-gray-300">Cargando información del cultivo...</span>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-12">
        <div class="w-16 h-16 bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
          <WarningIcon />
        </div>
        <h3 class="text-lg font-medium text-white mb-2">Error al cargar el cultivo</h3>
        <p class="text-gray-400 mb-4">{{ error }}</p>
        <button
          @click="loadCrop"
          class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Intentar de nuevo
        </button>
      </div>

      <!-- Crop Information -->
      <div v-else-if="crop" class="space-y-6">
        <!-- Header Section -->
        <div class="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700">
          <div class="flex items-start justify-between">
            <div class="flex items-center space-x-6">
              <!-- Crop Icon -->
              <div class="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                <PlantIcon />
              </div>
              
              <!-- Crop Basic Info -->
              <div>
                <h1 class="text-2xl font-bold text-white mb-2">{{ crop.name }}</h1>
                <p class="text-gray-300 mb-3">{{ crop.description }}</p>
                <div class="flex items-center space-x-4">
                  <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-700 text-gray-300">
                    {{ crop.category }}
                  </span>
                  <div class="flex items-center space-x-2">
                    <div 
                      class="w-3 h-3 rounded-full"
                      :class="crop.isSelected ? 'bg-green-500 animate-pulse' : 'bg-gray-500'"
                    ></div>
                    <span class="text-sm text-gray-400">
                      {{ crop.isSelected ? 'Seleccionado' : 'No seleccionado' }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex items-center space-x-3">
              <button
                @click="goBack"
                class="px-4 py-2 bg-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2"
              >
                <ChevronLeftIcon />
                <span>Volver</span>
              </button>
              <button
                @click="handleEdit"
                class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <EditIcon />
                <span>Editar</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Main Content Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Left Column - Requirements -->
          <div class="space-y-6">
            <!-- Environmental Requirements -->
            <div class="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700">
              <h2 class="text-xl font-bold text-white mb-6 flex items-center">
                <ThermometerIcon />
                <span class="ml-3">Requerimientos Ambientales</span>
              </h2>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Humidity Card -->
                <div class="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 p-6 rounded-lg border border-blue-700/50">
                  <div class="flex items-center justify-between mb-4">
                    <h3 class="font-semibold text-blue-300">Humedad del Suelo</h3>
                    <HumidityIcon />
                  </div>
                  <div class="text-center">
                    <div class="text-2xl font-bold text-blue-200 mb-2">
                      {{ crop.minHumidity }}% - {{ crop.maxHumidity }}%
                    </div>
                    <div class="text-sm text-blue-300">Rango óptimo</div>
                  </div>
                </div>

                <!-- Temperature Card -->
                <div class="bg-gradient-to-br from-red-900/30 to-orange-900/30 p-6 rounded-lg border border-red-700/50">
                  <div class="flex items-center justify-between mb-4">
                    <h3 class="font-semibold text-red-300">Temperatura Máxima</h3>
                    <ThermometerIcon />
                  </div>
                  <div class="text-center">
                    <div class="text-2xl font-bold text-red-200 mb-2">
                      {{ crop.maxTemperature }}°C
                    </div>
                    <div class="text-sm text-red-300">Temperatura máxima tolerada</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Growth Information -->
            <div class="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700">
              <h2 class="text-xl font-bold text-white mb-6 flex items-center">
                <PlantIcon />
                <span class="ml-3">Información de Crecimiento</span>
              </h2>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="text-center">
                  <div class="w-16 h-16 bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span class="text-2xl font-bold text-green-400">{{ crop.growthDays }}</span>
                  </div>
                  <h4 class="font-medium text-white mb-1">Días de Crecimiento</h4>
                  <p class="text-sm text-gray-400">Días hasta cosecha</p>
                </div>
                
                <div class="text-center">
                  <div class="w-16 h-16 bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span class="text-2xl font-bold text-purple-400">{{ crop.waterFrequency }}</span>
                  </div>
                  <h4 class="font-medium text-white mb-1">Frecuencia de Riego</h4>
                  <p class="text-sm text-gray-400">veces por semana</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Column - Status & Actions -->
          <div class="space-y-6">
            <!-- Current Status -->
            <div class="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700">
              <h2 class="text-xl font-bold text-white mb-6">Estado Actual</h2>
              
              <div class="space-y-4">
                <!-- Selection Status -->
                <div class="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                  <div class="flex items-center space-x-3">
                    <div 
                      class="w-4 h-4 rounded-full"
                      :class="crop.isSelected ? 'bg-green-500 animate-pulse' : 'bg-gray-500'"
                    ></div>
                    <span class="text-gray-300">Seleccionado</span>
                  </div>
                  <span class="text-sm font-medium" :class="crop.isSelected ? 'text-green-400' : 'text-gray-500'">
                    {{ crop.isSelected ? 'Sí' : 'No' }}
                  </span>
                </div>

                <!-- Pump Status -->
                <div class="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                  <div class="flex items-center space-x-3">
                    <div 
                      class="w-4 h-4 rounded-full"
                      :class="crop.waterPumpActive ? 'bg-blue-500 animate-pulse' : 'bg-gray-500'"
                    ></div>
                    <span class="text-gray-300">Bomba de Agua</span>
                  </div>
                  <span class="text-sm font-medium" :class="crop.waterPumpActive ? 'text-blue-400' : 'text-gray-500'">
                    {{ crop.waterPumpActive ? 'Activa' : 'Inactiva' }}
                  </span>
                </div>

                <!-- Growing Season -->
                <div class="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                  <span class="text-gray-300">Temporada de Cultivo</span>
                  <span class="text-sm font-medium text-gray-400">
                    {{ crop.growingSeason }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Quick Actions -->
            <div class="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700">
              <h2 class="text-xl font-bold text-white mb-6">Acciones Rápidas</h2>
              
              <div class="space-y-3">
                <button
                  @click="toggleSelection"
                  class="w-full px-4 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-medium rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <CheckIcon />
                  <span>{{ crop.isSelected ? 'Deseleccionar' : 'Seleccionar' }} Cultivo</span>
                </button>
                
                <button
                  @click="handleEdit"
                  class="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <EditIcon />
                  <span>Editar Información</span>
                </button>
                
                <button
                  @click="goBack"
                  class="w-full px-4 py-3 bg-gray-600 text-gray-300 font-medium rounded-lg hover:bg-gray-700 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <ChevronLeftIcon />
                  <span>Volver a Cultivos</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useToastNotifications } from '~/composables/useToastNotifications'
import {
  HomeIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  PlantIcon,
  ThermometerIcon,
  HumidityIcon,
  CheckIcon,
  WarningIcon,
  EditIcon
} from '~/assets/icons'

// Meta del documento
useHead({
  title: 'Ver Cultivo - VIVANTIA',
  meta: [
    { name: 'description', content: 'Información detallada del cultivo seleccionado' }
  ]
})

const route = useRoute()
const router = useRouter()
const { toast } = useToastNotifications()

// Estado reactivo
const crop = ref(null)
const loading = ref(true)
const error = ref(null)

// Cargar información del cultivo
const loadCrop = async () => {
  loading.value = true
  error.value = null
  
  try {
    const cropId = route.params.id
    
    // Simular carga de datos (en una implementación real, esto sería una llamada a la API)
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Datos simulados del cultivo con información relevante
    const mockCrop = {
      id: cropId,
      name: 'Tomate Cherry',
      description: 'Variedad de tomate pequeño y dulce, ideal para ensaladas y aperitivos',
      category: 'Hortalizas',
      minHumidity: 30,
      maxHumidity: 70,
      maxTemperature: 28,
      isSelected: true,
      waterPumpActive: false,
      growthDays: 75,
      waterFrequency: '2-3',
      growingSeason: 'Primavera-Verano'
    }
    
    crop.value = mockCrop
    
  } catch (err) {
    error.value = 'No se pudo cargar la información del cultivo'
    console.error('Error loading crop:', err)
  } finally {
    loading.value = false
  }
}

// Funciones de navegación
const goBack = () => {
  router.push('/cultivos')
}

const handleEdit = () => {
  router.push(`/cultivos/editar/${crop.value.id}`)
}

const toggleSelection = () => {
  if (crop.value) {
    crop.value.isSelected = !crop.value.isSelected
    toast.success(`Cultivo ${crop.value.isSelected ? 'seleccionado' : 'deseleccionado'} exitosamente`)
  }
}

// Cargar datos al montar el componente
onMounted(() => {
  loadCrop()
})
</script>

<style scoped>
/* Estilos personalizados */
.gradient-border {
  background: linear-gradient(45deg, #10b981, #059669);
  padding: 1px;
  border-radius: 0.75rem;
}

.gradient-border > div {
  background: #1f2937;
  border-radius: 0.75rem;
  padding: 1.5rem;
}

/* Animaciones */
@keyframes pulse-glow {
  0%, 100% {
    box-shadow: 0 0 5px rgba(16, 185, 129, 0.5);
  }
  50% {
    box-shadow: 0 0 20px rgba(16, 185, 129, 0.8);
  }
}

.pulse-glow {
  animation: pulse-glow 2s infinite;
}
</style> 