<template>
  <div class="space-y-8">
    <!-- Título de la página -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-white">
        Editar Cultivo: {{ crop?.name || 'Cargando...' }}
      </h1>
      <p class="text-gray-400 text-lg">
        Modifica la configuración del cultivo seleccionado
      </p>
    </div>

    <!-- Mensaje de error si el cultivo no existe -->
    <div v-if="!crop && !isLoading" class="bg-red-900/20 border border-red-500/30 rounded-lg p-6">
      <div class="flex items-center">
        <svg class="w-6 h-6 text-red-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"/>
        </svg>
        <div>
          <h3 class="text-lg font-medium text-red-400">Cultivo no encontrado</h3>
          <p class="text-red-300 mt-1">El cultivo con ID {{ $route.params.id }} no existe.</p>
        </div>
      </div>
    </div>

    <!-- Formulario de edición -->
    <div v-else-if="crop" class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Formulario principal -->
      <div class="lg:col-span-2">
        <BaseCard title="Información del Cultivo">
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <!-- Información básica -->
            <div class="space-y-4">
              <h3 class="text-lg font-medium text-white border-b border-gray-600 pb-2">
                Información Básica
              </h3>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <!-- Nombre -->
                <div>
                  <label for="name" class="block text-sm font-medium text-white mb-2">
                    Nombre del Cultivo
                  </label>
                  <input
                    id="name"
                    v-model="formData.name"
                    type="text"
                    required
                    class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                    placeholder="Ej: Tomate Cherry"
                  />
                </div>

                <!-- Categoría -->
                <div>
                  <label for="category" class="block text-sm font-medium text-white mb-2">
                    Categoría
                  </label>
                  <input
                    id="category"
                    v-model="formData.category"
                    type="text"
                    required
                    class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                    placeholder="Ej: Hortalizas, Frutas, Hierbas..."
                  />
                </div>
              </div>

              <!-- Descripción -->
              <div>
                <label for="description" class="block text-sm font-medium text-white mb-2">
                  Descripción
                </label>
                <textarea
                  id="description"
                  v-model="formData.description"
                  rows="3"
                  class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors resize-none"
                  placeholder="Descripción del cultivo..."
                ></textarea>
              </div>
            </div>

            <!-- Parámetros de cultivo -->
            <div class="space-y-4">
              <h3 class="text-lg font-medium text-white border-b border-gray-600 pb-2">
                Parámetros de Cultivo
              </h3>
              
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <!-- Humedad Mínima -->
                <div>
                  <label for="minHumidity" class="block text-sm font-medium text-white mb-2">
                    Humedad Mínima (%)
                  </label>
                  <input
                    id="minHumidity"
                    v-model.number="formData.soil_humidity_min"
                    type="number"
                    min="0"
                    max="100"
                    required
                    class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                    placeholder="50"
                  />
                  <p class="mt-1 text-xs text-gray-400">Valor mínimo recomendado</p>
                </div>

                <!-- Humedad Máxima -->
                <div>
                  <label for="maxHumidity" class="block text-sm font-medium text-white mb-2">
                    Humedad Máxima (%)
                  </label>
                  <input
                    id="maxHumidity"
                    v-model.number="formData.soil_humidity_max"
                    type="number"
                    min="0"
                    max="100"
                    required
                    class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                    placeholder="80"
                  />
                  <p class="mt-1 text-xs text-gray-400">Valor máximo recomendado</p>
                </div>

                <!-- Humedad Aire Mín -->
                <div>
                  <label for="minAirHum" class="block text-sm font-medium text-white mb-2">
                    Humedad Aire Min (%)
                  </label>
                  <input
                    id="minAirHum"
                    v-model.number="formData.air_humidity_min"
                    type="number"
                    min="0"
                    max="100"
                    required
                    class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                    placeholder="50"
                  />
                </div>

                <!-- Humedad Aire Máx -->
                <div>
                  <label for="maxAirHum" class="block text-sm font-medium text-white mb-2">
                    Humedad Aire Máx (%)
                  </label>
                  <input
                    id="maxAirHum"
                    v-model.number="formData.air_humidity_max"
                    type="number"
                    min="0"
                    max="100"
                    required
                    class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                    placeholder="85"
                  />
                </div>

                <!-- Temperatura Máxima -->
                <div>
                  <label for="maxTemperature" class="block text-sm font-medium text-white mb-2">
                    Temperatura Máxima (°C)
                  </label>
                  <input
                    id="maxTemperature"
                    v-model.number="formData.temperature_max"
                    type="number"
                    min="0"
                    max="50"
                    required
                    class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                    placeholder="30"
                  />
                  <p class="mt-1 text-xs text-gray-400">Temperatura máxima tolerable</p>
                </div>
              </div>

            </div>

            <!-- Información adicional -->
            <div class="space-y-4">
              <h3 class="text-lg font-medium text-white border-b border-gray-600 pb-2">
                Información Adicional
              </h3>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <!-- Días de crecimiento -->
                <div>
                  <label for="growthDays" class="block text-sm font-medium text-white mb-2">
                    Días de Crecimiento
                  </label>
                  <input
                    id="growthDays"
                    v-model.number="formData.growth_days"
                    type="number"
                    min="1"
                    max="365"
                    required
                    class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                    placeholder="90"
                  />
                  <p class="mt-1 text-xs text-gray-400">Días desde siembra hasta cosecha</p>
                </div>

                <!-- Temporada de cosecha -->
                <div>
                  <label for="session" class="block text-sm font-medium text-white mb-2">
                    Temporada de Cosecha
                  </label>
                  <select
                    id="session"
                    v-model="formData.session"
                    required
                    class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                  >
                    <option value="">Selecciona una temporada</option>
                    <option v-for="season in availableSeasons" :key="season" :value="season">
                      {{ season }}
                    </option>
                  </select>
                </div>
              </div>
            </div>

            <!-- Imagen del cultivo -->
            <div class="space-y-4">
              <h3 class="text-lg font-medium text-white border-b border-gray-600 pb-2">
                Imagen del Cultivo
              </h3>
              
              <div>
                <label for="image" class="block text-sm font-medium text-white mb-2">
                  Foto del Cultivo
                </label>
                
                <!-- Área de carga de imagen -->
                <div class="mt-2">
                  <div 
                    @drop="handleImageDrop"
                    @dragover.prevent
                    @dragenter.prevent
                    class="w-full h-40 border-2 border-dashed border-gray-600 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors cursor-pointer group"
                    :class="{ 'border-green-500 bg-green-900/20': isDragOver }"
                  >
                    <input
                      ref="imageInput"
                      type="file"
                      accept="image/*"
                      @change="handleImageSelect"
                      class="hidden"
                    />
                    
                    <!-- Preview de imagen o zona de carga -->
                    <div v-if="imagePreview" class="w-full h-full relative">
                      <img 
                        :src="imagePreview" 
                        alt="Preview" 
                        class="w-full h-full object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        @click="removeImage"
                        class="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white rounded-full p-1 transition-colors"
                      >
                        <component :is="getIcon('close')" class="w-4 h-4" />
                      </button>
                    </div>
                    
                    <!-- Zona de carga -->
                    <div v-else @click="$refs.imageInput.click()" class="flex flex-col items-center justify-center h-full">
                      <svg class="w-12 h-12 text-gray-400 group-hover:text-gray-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                      </svg>
                      <p class="mt-2 text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                        <span class="font-medium">Haz clic para cambiar</span> o arrastra y suelta
                      </p>
                      <p class="text-xs text-gray-500">PNG, JPG, GIF hasta 10MB</p>
                    </div>
                  </div>
                </div>
                <p class="mt-2 text-xs text-gray-400">
                  Imagen actual del cultivo. Puedes cambiarla seleccionando una nueva.
                </p>
              </div>
            </div>

            <!-- Validación de errores -->
            <div v-if="validationErrors.length > 0" class="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
              <div class="flex items-start">
                <component :is="getIcon('warning')" class="w-5 h-5 text-red-400 mt-0.5 mr-2 flex-shrink-0" />
                <div>
                  <p class="text-sm font-medium text-red-400">Errores de validación:</p>
                  <ul class="mt-1 text-sm text-red-300 list-disc list-inside">
                    <li v-for="error in validationErrors" :key="error">{{ error }}</li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- Botones de acción -->
            <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0 pt-6 border-t border-gray-600">
              <nuxt-link 
                to="/cultivos"
                class="px-6 py-3 text-gray-400 hover:text-white border border-gray-600 hover:border-gray-500 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                <div class="flex items-center space-x-2">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
                  </svg>
                  <span>Volver</span>
                </div>
              </nuxt-link>

              <div class="flex space-x-3">
                <button
                  type="button"
                  @click="resetForm"
                  class="px-6 py-3 text-yellow-400 hover:text-yellow-300 border border-yellow-500/30 hover:border-yellow-400/50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  Restablecer
                </button>
                
                <button
                  type="submit"
                  :disabled="isSubmitting || validationErrors.length > 0"
                  class="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
                >
                  <span v-if="isSubmitting" class="flex items-center">
                    <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Guardando...
                  </span>
                  <span v-else class="flex items-center">
                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                    </svg>
                    Guardar Cambios
                  </span>
                </button>
              </div>
            </div>
          </form>
        </BaseCard>
      </div>

      <!-- Panel lateral con información -->
      <div class="lg:col-span-1">
        <BaseCard title="Información del Sistema">
          <div class="space-y-4">
            <!-- Estado actual -->
            <div>
              <h4 class="text-sm font-medium text-white mb-3">Estado Actual</h4>
              <div class="space-y-2">
                <div class="flex items-center justify-between">
                  <span class="text-sm text-gray-400">Seleccionado:</span>
                  <span :class="crop.isSelected ? 'text-green-400' : 'text-gray-400'">
                    {{ crop.isSelected ? 'Sí' : 'No' }}
                  </span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-sm text-gray-400">Bomba de agua:</span>
                  <span :class="crop.waterPumpActive ? 'text-blue-400' : 'text-gray-400'">
                    {{ crop.waterPumpActive ? 'Activa' : 'Inactiva' }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Información adicional -->
            <div class="border-t border-gray-600 pt-4">
              <h4 class="text-sm font-medium text-white mb-3">Detalles</h4>
              <div class="space-y-2">
                <div class="flex items-center justify-between">
                  <span class="text-sm text-gray-400">Días de crecimiento:</span>
                  <span class="text-sm text-white">{{ crop.growthDays }} días</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-sm text-gray-400">Temporada:</span>
                  <span class="text-sm text-white">{{ crop.harvestSeason }}</span>
                </div>
              </div>
            </div>

            <!-- Ayuda -->
            <div class="border-t border-gray-600 pt-4">
              <h4 class="text-sm font-medium text-white mb-3">Ayuda</h4>
              <div class="bg-blue-900/20 border border-blue-500/30 rounded-lg p-3">
                <p class="text-xs text-blue-300">
                  <strong>Tip:</strong> La humedad mínima debe ser menor que la máxima. 
                  Ajusta estos valores según las necesidades específicas de tu cultivo.
                </p>
              </div>
            </div>
          </div>
        </BaseCard>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useToastNotifications } from '~/composables/useToastNotifications'
import { useCropStore } from '~/stores/crop'
import { useUserStore } from '~/stores/user'
import { getIcon } from '~/assets/icons'
import BaseCard from '~/components/Cards/BaseCard.vue'

// Configurar middleware
definePageMeta({
  middleware: ['auth', 'visitor-block']
})

const route = useRoute()
const router = useRouter()
const { toast } = useToastNotifications()
const cropStore = useCropStore()
const userStore = useUserStore()

// Estados reactivos
const isLoading = ref(true)
const isSubmitting = ref(false)
const crop = ref(null)
const isDragOver = ref(false)
const imagePreview = ref('')
const selectedImage = ref(null)
const imageInput = ref(null)

// Categorías disponibles del store
const availableCategories = computed(() => 
  cropStore.categories.length > 0 ? cropStore.categories : [
    'Hortalizas', 'Frutas', 'Hierbas', 'Cereales', 'Legumbres'
  ]
)

// Computed para verificar si es el cultivo del usuario
const isUserCrop = computed(() => {
  return crop.value && userStore.user && crop.value.user_id === userStore.user.id
})

// Temporadas disponibles
const availableSeasons = [
  'Primavera',
  'Verano',
  'Otoño',
  'Invierno',
  'Primavera/Verano',
  'Verano/Otoño',
  'Otoño/Invierno',
  'Invierno/Primavera',
  'Todo el año'
]

// Datos del formulario
const formData = reactive({
  name: '',
  description: '',
  category: '',
  soil_humidity_min: 0,
  soil_humidity_max: 0,
  air_humidity_min: 0,
  air_humidity_max: 0,
  temperature_max: 0,
  growth_days: 0,
  session: '',
  image: null
})

// Validaciones
const validationErrors = computed(() => {
  const errors = []
  
  if (formData.soil_humidity_min >= formData.soil_humidity_max) {
    errors.push('La humedad del suelo mínima debe ser menor que la máxima')
  }

  if (formData.soil_humidity_min < 0 || formData.soil_humidity_min > 100) {
    errors.push('La humedad del suelo mínima debe estar entre 0 y 100%')
  }

  if (formData.soil_humidity_max < 0 || formData.soil_humidity_max > 100) {
    errors.push('La humedad del suelo máxima debe estar entre 0 y 100%')
  }

  if (formData.air_humidity_min >= formData.air_humidity_max) {
    errors.push('La humedad del aire mínima debe ser menor que la máxima')
  }

  if (formData.air_humidity_min < 0 || formData.air_humidity_min > 100) {
    errors.push('La humedad del aire mínima debe estar entre 0 y 100%')
  }

  if (formData.air_humidity_max < 0 || formData.air_humidity_max > 100) {
    errors.push('La humedad del aire máxima debe estar entre 0 y 100%')
  }
  
  if (formData.temperature_max < 0 || formData.temperature_max > 50) {
    errors.push('La temperatura máxima debe estar entre 0 y 50°C')
  }
  
  if (formData.growth_days && (formData.growth_days < 1 || formData.growth_days > 365)) {
    errors.push('Los días de crecimiento deben estar entre 1 y 365')
  }
  
  return errors
})

// Función para cargar los datos del cultivo
const loadCrop = async () => {
  isLoading.value = true
  
  try {
    const cropId = parseInt(route.params.id)
    console.log('🔄 Editar Cultivo: Cargando cultivo ID:', cropId)
    
    // Intentar obtener el cultivo del store primero
    let foundCrop = cropStore.crops.find(c => c.id === cropId)
    
    if (!foundCrop) {
      // Si no está en el store, cargar desde la API
      const result = await cropStore.fetchCropById(cropId)
      foundCrop = result.data
    }
    
    if (!foundCrop) {
      console.error('❌ Editar Cultivo: Cultivo no encontrado')
      crop.value = null
      return
    }
    
    // Verificar si es el cultivo del usuario
    if (foundCrop.user_id !== userStore.user?.id) {
      toast.error('No tienes permisos para editar este cultivo')
      router.push('/cultivos')
      return
    }
    
    crop.value = foundCrop
    
    // Llenar el formulario con los datos actuales
    Object.assign(formData, {
      name: foundCrop.name,
      description: foundCrop.description,
      category: foundCrop.category,
      soil_humidity_min: foundCrop.soil_humidity_min,
      soil_humidity_max: foundCrop.soil_humidity_max,
      air_humidity_min: foundCrop.air_humidity_min,
      air_humidity_max: foundCrop.air_humidity_max,
      temperature_max: foundCrop.temperature_max,
      growth_days: foundCrop.growth_days,
      session: foundCrop.session || '',
      image: foundCrop.image
    })
    
    // Cargar imagen si existe
    if (foundCrop.image) {
      imagePreview.value = foundCrop.image
    }
    
    console.log('✅ Editar Cultivo: Cultivo cargado:', foundCrop.name)
    
  } catch (error) {
    console.error('❌ Editar Cultivo: Error cargando cultivo:', error)
    toast.error('Error al cargar el cultivo')
    crop.value = null
  } finally {
    isLoading.value = false
  }
}

// Función para resetear el formulario
const resetForm = () => {
  if (crop.value) {
    Object.assign(formData, {
      name: crop.value.name,
      description: crop.value.description,
      category: crop.value.category,
      soil_humidity_min: crop.value.soil_humidity_min,
      soil_humidity_max: crop.value.soil_humidity_max,
      air_humidity_min: crop.value.air_humidity_min,
      air_humidity_max: crop.value.air_humidity_max,
      temperature_max: crop.value.temperature_max,
      growth_days: crop.value.growth_days,
      session: crop.value.session || '',
      image: crop.value.image
    })
    
    // Resetear imagen
    if (crop.value.image) {
      imagePreview.value = crop.value.image
    } else {
      imagePreview.value = ''
    }
    selectedImage.value = null
    if (imageInput.value) {
      imageInput.value.value = ''
    }
  }
}

// Manejo de imagen
const handleImageSelect = (event) => {
  const file = event.target.files[0]
  if (file) {
    processImageFile(file)
  }
}

const handleImageDrop = (event) => {
  event.preventDefault()
  isDragOver.value = false
  const file = event.dataTransfer.files[0]
  if (file && file.type.startsWith('image/')) {
    processImageFile(file)
  }
}

const processImageFile = (file) => {
  if (file.size > 10 * 1024 * 1024) { // 10MB limit
    alert('La imagen es demasiado grande. Máximo 10MB.')
    return
  }
  
  selectedImage.value = file
  formData.image = file
  
  const reader = new FileReader()
  reader.onload = (e) => {
    imagePreview.value = e.target.result
  }
  reader.readAsDataURL(file)
}

const removeImage = () => {
  imagePreview.value = ''
  selectedImage.value = null
  formData.image = null
  if (imageInput.value) {
    imageInput.value.value = ''
  }
}

// Función para manejar el envío del formulario
const handleSubmit = async () => {
  if (validationErrors.value.length > 0) {
    toast.error('Por favor corrige los errores en el formulario')
    return
  }
  
  if (!isUserCrop.value) {
    toast.error('No tienes permisos para editar este cultivo')
    return
  }
  
  isSubmitting.value = true
  
  try {
    console.log('🔄 Editar Cultivo: Guardando cambios...')
    
    // Preparar datos para envío
    const updateData = {
      name: formData.name,
      description: formData.description,
      category: formData.category,
      soil_humidity_min: formData.soil_humidity_min,
      soil_humidity_max: formData.soil_humidity_max,
      air_humidity_min: formData.air_humidity_min,
      air_humidity_max: formData.air_humidity_max,
      temperature_max: formData.temperature_max,
      growth_days: formData.growth_days,
      session: formData.session,
      image: formData.image || null // Por ahora null, se puede implementar upload después
    }
    
    // Actualizar cultivo usando el store
    const result = await cropStore.updateCrop(crop.value.id, updateData)
    
    // Actualizar el cultivo local
    crop.value = result.data
    
    // Mostrar mensaje de éxito
    toast.success(`¡Cultivo "${result.data.name}" actualizado exitosamente!`)
    
    // Actualizar categorías si es nueva
    if (!cropStore.categories.includes(formData.category)) {
      await cropStore.fetchCropCategories()
    }
    
    // Volver a la página de cultivos después de un momento
    setTimeout(() => {
      router.push('/cultivos')
    }, 1500)
    
  } catch (error) {
    console.error('❌ Editar Cultivo: Error al guardar:', error)
    toast.error(error.response?.data?.message || 'Error al actualizar el cultivo')
  } finally {
    isSubmitting.value = false
  }
}

// Cargar datos al montar el componente
onMounted(async () => {
  try {
    // Inicializar store si es necesario
    if (!cropStore.isInitialized) {
      await cropStore.fetchCropCategories()
    }
    
    // Cargar el cultivo
    await loadCrop()
  } catch (error) {
    console.error('Error en onMounted:', error)
  }
})
</script>

 