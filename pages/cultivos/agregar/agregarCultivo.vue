<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="mb-8">
      <nav class="flex mb-4" aria-label="Breadcrumb">
        <ol class="inline-flex items-center space-x-1 md:space-x-3">
          <li class="inline-flex items-center">
            <nuxt-link 
              to="/cultivos" 
              class="inline-flex items-center text-sm font-medium text-gray-400 hover:text-white transition-colors"
            >
              <component :is="getIcon('plant')" class="w-4 h-4 mr-2" />
              Cultivos
            </nuxt-link>
          </li>
          <li>
            <div class="flex items-center">
              <component :is="getIcon('breadcrumbArrow')" class="w-6 h-6 text-gray-400" />
              <span class="ml-1 text-sm font-medium text-gray-300">Agregar</span>
            </div>
          </li>
        </ol>
      </nav>
      
      <h1 class="text-3xl font-bold text-white">
        Agregar Cultivo
      </h1>
      <p class="text-gray-400 mt-2">
        Configura un nuevo cultivo para el sistema de riego automatizado
      </p>
    </div>

    <!-- Formulario de creación -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
                    Nombre del Cultivo <span class="text-red-400">*</span>
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
                    Categoría <span class="text-red-400">*</span>
                  </label>
                  <select
                    id="category"
                    v-model="formData.category"
                    required
                    class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                  >
                    <option value="">Selecciona una categoría</option>
                    <option v-for="category in availableCategories" :key="category" :value="category">
                      {{ category }}
                    </option>
                  </select>
                </div>
              </div>

              <!-- Descripción -->
              <div>
                <label for="description" class="block text-sm font-medium text-white mb-2">
                  Descripción <span class="text-red-400">*</span>
                </label>
                <textarea
                  id="description"
                  v-model="formData.description"
                  rows="3"
                  required
                  class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors resize-none"
                  placeholder="Descripción detallada del cultivo..."
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
                    Humedad Mínima (%) <span class="text-red-400">*</span>
                  </label>
                  <input
                    id="minHumidity"
                    v-model.number="formData.minHumidity"
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
                    Humedad Máxima (%) <span class="text-red-400">*</span>
                  </label>
                  <input
                    id="maxHumidity"
                    v-model.number="formData.maxHumidity"
                    type="number"
                    min="0"
                    max="100"
                    required
                    class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                    placeholder="80"
                  />
                  <p class="mt-1 text-xs text-gray-400">Valor máximo recomendado</p>
                </div>

                <!-- Temperatura Máxima -->
                <div>
                  <label for="maxTemperature" class="block text-sm font-medium text-white mb-2">
                    Temperatura Máxima (°C) <span class="text-red-400">*</span>
                  </label>
                  <input
                    id="maxTemperature"
                    v-model.number="formData.maxTemperature"
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
                    Días de Crecimiento <span class="text-red-400">*</span>
                  </label>
                  <input
                    id="growthDays"
                    v-model.number="formData.growthDays"
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
                  <label for="harvestSeason" class="block text-sm font-medium text-white mb-2">
                    Temporada de Cosecha <span class="text-red-400">*</span>
                  </label>
                  <select
                    id="harvestSeason"
                    v-model="formData.harvestSeason"
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
                        <span class="font-medium">Haz clic para subir</span> o arrastra y suelta
                      </p>
                      <p class="text-xs text-gray-500">PNG, JPG, GIF hasta 10MB</p>
                    </div>
                  </div>
                </div>
                <p class="mt-2 text-xs text-gray-400">
                  Selecciona una imagen representativa del cultivo (opcional)
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
                  <component :is="getIcon('back')" class="w-4 h-4" />
                  <span>Volver</span>
                </div>
              </nuxt-link>

              <div class="flex space-x-3">
                <button
                  type="button"
                  @click="resetForm"
                  class="px-6 py-3 text-yellow-400 hover:text-yellow-300 border border-yellow-500/30 hover:border-yellow-400/50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  Limpiar Form
                </button>
                
                <button
                  type="submit"
                  :disabled="isSubmitting || validationErrors.length > 0"
                  class="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
                >
                  <span v-if="isSubmitting" class="flex items-center">
                    <component :is="getIcon('spinner')" class="animate-spin w-5 h-5 mr-2" />
                    Agregando...
                  </span>
                  <span v-else class="flex items-center">
                                          <svg class="w-5 h-5 mr-2 text-white" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                        <path d="M20 6L9 17l-5-5"/>
                      </svg>
                    Agregar Cultivo
                  </span>
                </button>
              </div>
            </div>
          </form>
        </BaseCard>
      </div>

      <!-- Panel lateral con información -->
      <div class="lg:col-span-1">
        <BaseCard title="Información de Ayuda">
          <div class="space-y-4">
            <!-- Consejos -->
            <div>
              <h4 class="text-sm font-medium text-white mb-3">Consejos para el Formulario</h4>
              <div class="space-y-3">
                <div class="bg-blue-900/20 border border-blue-500/30 rounded-lg p-3">
                  <p class="text-xs text-blue-300">
                    <strong>Humedad:</strong> La humedad mínima debe ser menor que la máxima. Valores típicos entre 40-90%.
                  </p>
                </div>
                <div class="bg-green-900/20 border border-green-500/30 rounded-lg p-3">
                  <p class="text-xs text-green-300">
                    <strong>Temperatura:</strong> Indica la temperatura máxima que puede tolerar el cultivo.
                  </p>
                </div>
                <div class="bg-purple-900/20 border border-purple-500/30 rounded-lg p-3">
                  <p class="text-xs text-purple-300">
                    <strong>Imagen:</strong> Usa una foto clara y representativa del cultivo para mejor identificación.
                  </p>
                </div>
              </div>
            </div>

            <!-- Categorías disponibles -->
            <div class="border-t border-gray-600 pt-4">
              <h4 class="text-sm font-medium text-white mb-3">Categorías Disponibles</h4>
              <div class="space-y-1">
                <div v-for="category in availableCategories" :key="category" class="text-xs text-gray-400">
                  • {{ category }}
                </div>
              </div>
            </div>

            <!-- Temporadas -->
            <div class="border-t border-gray-600 pt-4">
              <h4 class="text-sm font-medium text-white mb-3">Temporadas</h4>
              <div class="space-y-1">
                <div v-for="season in availableSeasons" :key="season" class="text-xs text-gray-400">
                  • {{ season }}
                </div>
              </div>
            </div>
          </div>
        </BaseCard>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { cropCategories } from '~/utils/crops'
import { useToastNotifications } from '~/composables/useToastNotifications'
import { getIcon } from '~/assets/icons'
import BaseCard from '~/components/Cards/BaseCard.vue'

const router = useRouter()
const { cropSelected } = useToastNotifications()

// Estados reactivos
const isSubmitting = ref(false)
const isDragOver = ref(false)
const imagePreview = ref('')
const selectedImage = ref(null)
const imageInput = ref(null)

// Datos del formulario
const formData = reactive({
  name: '',
  description: '',
  category: '',
  minHumidity: null,
  maxHumidity: null,
  maxTemperature: null,
  growthDays: null,
  harvestSeason: '',
  image: null
})

// Opciones disponibles
const availableCategories = cropCategories.filter(cat => cat !== 'Todas')
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

// Validación
const validationErrors = computed(() => {
  const errors = []
  
  if (formData.minHumidity && formData.maxHumidity) {
    if (formData.minHumidity >= formData.maxHumidity) {
      errors.push('La humedad mínima debe ser menor que la máxima')
    }
  }
  
  if (formData.minHumidity && (formData.minHumidity < 0 || formData.minHumidity > 100)) {
    errors.push('La humedad mínima debe estar entre 0 y 100%')
  }
  
  if (formData.maxHumidity && (formData.maxHumidity < 0 || formData.maxHumidity > 100)) {
    errors.push('La humedad máxima debe estar entre 0 y 100%')
  }
  
  if (formData.maxTemperature && (formData.maxTemperature < 0 || formData.maxTemperature > 50)) {
    errors.push('La temperatura máxima debe estar entre 0 y 50°C')
  }
  
  if (formData.growthDays && (formData.growthDays < 1 || formData.growthDays > 365)) {
    errors.push('Los días de crecimiento deben estar entre 1 y 365')
  }
  
  return errors
})

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

// Función para resetear el formulario
const resetForm = () => {
  Object.keys(formData).forEach(key => {
    if (typeof formData[key] === 'string') {
      formData[key] = ''
    } else {
      formData[key] = null
    }
  })
  removeImage()
}

// Función para manejar el envío
const handleSubmit = async () => {
  if (validationErrors.value.length > 0) {
    return
  }
  
  isSubmitting.value = true
  
  try {
    // Simular envío del formulario
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Mostrar alerta de éxito
    const toast = document.createElement('div')
    toast.className = 'fixed top-4 right-4 z-50 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg transform transition-all duration-300 ease-in-out'
    toast.innerHTML = `
      <div class="flex items-center space-x-2">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
        </svg>
        <span class="font-medium">¡Cultivo agregado exitosamente!</span>
      </div>
    `
    document.body.appendChild(toast)
    
    // Remover la alerta después de 3 segundos
    setTimeout(() => {
      toast.remove()
    }, 3000)
    
    // Redirigir a la página de cultivos
    setTimeout(() => {
      router.push('/cultivos')
    }, 1500)
    
  } catch (error) {
    console.error('Error al agregar cultivo:', error)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
/* Animaciones para el drag and drop */
.border-dashed {
  border-style: dashed;
}

/* Estilos para el preview de imagen */
img {
  transition: opacity 0.3s ease;
}

/* Animación del spinner */
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style> 