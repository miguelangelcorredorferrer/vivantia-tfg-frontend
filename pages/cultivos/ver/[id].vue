<template>
  <div class="space-y-8">
    <!-- Título de la página -->
    <div class="max-w-4xl mx-auto">
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
                      :class="crop.selected ? 'bg-green-500 animate-pulse' : 'bg-gray-500'"
                    ></div>
                    <span class="text-sm text-gray-400">
                      {{ crop.selected ? 'Seleccionado' : 'No seleccionado' }}
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
               
               <div class="space-y-4">
                 <!-- Soil Humidity Card -->
                 <div class="relative overflow-hidden bg-gradient-to-r from-blue-600/20 via-blue-700/15 to-blue-800/20 p-6 rounded-xl border border-blue-500/30 hover:border-blue-400/50 transition-all duration-300 group">
                   <div class="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                   <div class="relative z-10">
                     <div class="flex items-center justify-between">
                       <div class="flex items-center space-x-4">
                         <div class="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center group-hover:bg-blue-500/30 transition-colors duration-300">
                           <HumidityIcon class="w-6 h-6 text-blue-300" />
                         </div>
                         <div>
                           <h3 class="font-semibold text-blue-200 text-xl">Humedad del Suelo</h3>
                           <p class="text-sm text-blue-300/80">Rango óptimo del suelo</p>
                         </div>
                       </div>
                       <div class="text-right">
                         <div class="text-4xl font-bold text-blue-100">{{ crop.soil_humidity_min }}% - {{ crop.soil_humidity_max }}%</div>
                       </div>
                     </div>
                   </div>
                 </div>

                 <!-- Air Humidity Card -->
                 <div class="relative overflow-hidden bg-gradient-to-r from-cyan-600/20 via-cyan-700/15 to-teal-800/20 p-6 rounded-xl border border-cyan-500/30 hover:border-cyan-400/50 transition-all duration-300 group">
                   <div class="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                   <div class="relative z-10">
                     <div class="flex items-center justify-between">
                       <div class="flex items-center space-x-4">
                         <div class="w-12 h-12 bg-cyan-500/20 rounded-full flex items-center justify-center group-hover:bg-cyan-500/30 transition-colors duration-300">
                           <HumidityIcon class="w-6 h-6 text-cyan-300" />
                         </div>
                         <div>
                           <h3 class="font-semibold text-cyan-200 text-xl">Humedad del Aire</h3>
                           <p class="text-sm text-cyan-300/80">Rango óptimo ambiental</p>
                         </div>
                       </div>
                       <div class="text-right">
                         <div class="text-4xl font-bold text-cyan-100">{{ crop.air_humidity_min }}% - {{ crop.air_humidity_max }}%</div>
                       </div>
                     </div>
                   </div>
                 </div>

                 <!-- Temperature Card -->
                 <div class="relative overflow-hidden bg-gradient-to-r from-red-600/20 via-red-700/15 to-orange-800/20 p-6 rounded-xl border border-red-500/30 hover:border-red-400/50 transition-all duration-300 group">
                   <div class="absolute inset-0 bg-gradient-to-r from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                   <div class="relative z-10">
                     <div class="flex items-center justify-between">
                       <div class="flex items-center space-x-4">
                         <div class="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center group-hover:bg-red-500/30 transition-colors duration-300">
                           <ThermometerIcon class="w-6 h-6 text-red-300" />
                         </div>
                         <div>
                           <h3 class="font-semibold text-red-200 text-xl">Temperatura Máxima</h3>
                           <p class="text-sm text-red-300/80">Temperatura máxima tolerada</p>
                         </div>
                       </div>
                       <div class="text-right">
                         <div class="text-4xl font-bold text-red-100">{{ crop.temperature_max }}°C</div>
                       </div>
                     </div>
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
              
              <div class="flex justify-center">
                <div class="text-center">
                  <div class="w-16 h-16 bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span class="text-2xl font-bold text-green-400">{{ crop.growth_days || 'N/A' }}</span>
                  </div>
                  <h4 class="font-medium text-white mb-1">Días de Crecimiento</h4>
                  <p class="text-sm text-gray-400">Días hasta cosecha</p>
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
                      :class="crop.selected ? 'bg-green-500 animate-pulse' : 'bg-gray-500'"
                    ></div>
                    <span class="text-gray-300">Seleccionado</span>
                  </div>
                  <span class="text-sm font-medium" :class="crop.selected ? 'text-green-400' : 'text-gray-500'">
                    {{ crop.selected ? 'Sí' : 'No' }}
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

                <!-- Category -->
                <div class="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                  <span class="text-gray-300">Categoría</span>
                  <span class="text-sm font-medium text-gray-400">
                    {{ crop.category }}
                  </span>
                </div>

                <!-- Temporada -->
                <div class="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                  <span class="text-gray-300">Temporada</span>
                  <span class="text-sm font-medium text-gray-400">
                    {{ crop.session || 'No especificada' }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Quick Actions -->
            <div class="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700">
              <h2 class="text-xl font-bold text-white mb-6">Acciones Rápidas</h2>
              
              <div class="space-y-3">
                <button
                  v-if="isUserCrop"
                  @click="toggleSelection"
                  class="w-full px-4 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-medium rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <CheckIcon />
                  <span>{{ crop.selected ? 'Deseleccionar' : 'Seleccionar' }} Cultivo</span>
                </button>
                
                <button
                  v-if="isUserCrop"
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
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useToastNotifications } from '~/composables/useToastNotifications'
import { useCropStore } from '~/stores/crop'
import { useUserStore } from '~/stores/user'
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

// Configurar middleware
definePageMeta({
  middleware: ['auth', 'visitor-block']
})

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
const cropStore = useCropStore()
const userStore = useUserStore()

// Estado reactivo
const crop = ref(null)
const loading = ref(true)
const error = ref(null)

// Computed para determinar si es el cultivo del usuario
const isUserCrop = computed(() => {
  return crop.value && userStore.user && crop.value.user_id === userStore.user.id
})

// Cargar información del cultivo
const loadCrop = async () => {
  loading.value = true
  error.value = null
  
  try {
    const cropId = parseInt(route.params.id)
    console.log('🔄 Ver Cultivo: Cargando cultivo ID:', cropId)
    
    // Intentar obtener el cultivo del store primero
    let foundCrop = cropStore.crops.find(c => c.id === cropId)
    
    if (!foundCrop) {
      // Si no está en el store, cargar desde la API
      const result = await cropStore.fetchCropById(cropId)
      foundCrop = result.data
    }
    
    if (!foundCrop) {
      throw new Error('Cultivo no encontrado')
    }
    
    crop.value = foundCrop
    console.log('✅ Ver Cultivo: Cultivo cargado:', foundCrop.name)
    
  } catch (err) {
    error.value = err.response?.data?.message || err.message || 'No se pudo cargar la información del cultivo'
    console.error('❌ Ver Cultivo: Error loading crop:', err)
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

const toggleSelection = async () => {
  if (!crop.value || !isUserCrop.value) {
    toast.warning('Solo puedes seleccionar/deseleccionar tus propios cultivos')
    return
  }
  
  try {
    if (crop.value.selected) {
      const result = await cropStore.deselectCrop(crop.value.id)
      crop.value = result.data
      toast.success(`Cultivo "${crop.value.name}" deseleccionado exitosamente`)
    } else {
      const result = await cropStore.selectCrop(crop.value.id)
      crop.value = result.data
      toast.success(`Cultivo "${crop.value.name}" seleccionado exitosamente`)
    }
  } catch (error) {
    console.error('Error toggling crop selection:', error)
    toast.error(error.response?.data?.message || 'Error al cambiar selección del cultivo')
  }
}

// Cargar datos al montar el componente
onMounted(() => {
  loadCrop()
})
</script>

 