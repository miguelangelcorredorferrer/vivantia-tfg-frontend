<script setup>
import { useAdminStore } from '~/stores/admin'
import { useToastNotifications } from '~/composables/useToastNotifications'
import CropAPI from '~/api/CropAPI'
import UserAPI from '~/api/UserAPI'

// Configurar middleware de administrador
definePageMeta({
  middleware: 'admin'
})

// Stores y composables
const adminStore = useAdminStore()
const { toast } = useToastNotifications()

// Estado del formulario
const formData = ref({
  user_id: '',
  name: '',
  description: '',
  image: '',
  category: '',
  humidity_min: '',
  humidity_max: '',
  temperature_max: '',
  growth_days: '',
  session: '',
  selected: false
})

// Lista de usuarios disponibles
const users = ref([])

// Estados de carga y error
const isLoading = ref(false)
const isSaving = ref(false)
const error = ref(null)

// Variables para manejo de imagen
const selectedImageName = ref('')
const selectedImageFile = ref(null)

// Cargar usuarios al montar el componente
onMounted(async () => {
  await loadUsers()
})

// Función para cargar usuarios
const loadUsers = async () => {
  try {
    isLoading.value = true
    error.value = null
    
    const response = await UserAPI.getAllUsers()
    users.value = response.data || []
    
    console.log('✅ Usuarios cargados exitosamente')
  } catch (err) {
    console.error('❌ Error cargando usuarios:', err)
    error.value = 'Error al cargar usuarios'
    toast.error('Error al cargar usuarios')
  } finally {
    isLoading.value = false
  }
}

// Función para guardar cultivo
const handleSubmit = async () => {
  try {
    isSaving.value = true
    error.value = null
    
    // Validar campos obligatorios
    if (!formData.value.user_id || !formData.value.name || 
        !formData.value.description || !formData.value.category ||
        !formData.value.humidity_min || !formData.value.humidity_max || 
        !formData.value.temperature_max || !formData.value.growth_days || 
        !formData.value.session) {
      throw new Error('Todos los campos obligatorios deben estar completos')
    }
    
    // Crear cultivo
    await CropAPI.create(formData.value)
    
    toast.success('Cultivo creado exitosamente')
    
    // Redirigir de vuelta a la lista de cultivos
    await navigateTo('/admin/cultivos')
    
  } catch (err) {
    console.error('❌ Error creando cultivo:', err)
    error.value = err.message || 'Error al crear el cultivo'
    toast.error(error.value)
  } finally {
    isSaving.value = false
  }
}

// Función para cancelar y volver
const handleCancel = () => {
  navigateTo('/admin/cultivos')
}

// Función para manejar el cambio de imagen
const handleImageChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    // Validar que sea una imagen
    if (!file.type.startsWith('image/')) {
      toast.error('Por favor selecciona un archivo de imagen válido')
      return
    }
    
    // Validar tamaño (máximo 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('La imagen no puede superar los 5MB')
      return
    }
    
    selectedImageFile.value = file
    selectedImageName.value = file.name
    
    // Convertir a base64 para enviar al backend
    const reader = new FileReader()
    reader.onload = (e) => {
      formData.value.image = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

// Función para limpiar la imagen seleccionada
const clearImage = () => {
  selectedImageFile.value = null
  selectedImageName.value = ''
  formData.value.image = ''
  if ($refs.imageInput) {
    $refs.imageInput.value = ''
  }
}
</script>

<template>
  <div class="space-y-8">
    <!-- Header de la página -->
    <div class="mb-8">
      <div class="flex items-center space-x-3 mb-2">
        <div class="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
          </svg>
        </div>
        <div>
          <h1 class="text-3xl font-bold text-white">Panel de Administración</h1>
          <p class="text-gray-400">Bienvenido al centro de control del sistema Vivantia</p>
        </div>
      </div>
      <div class="mt-4">
        <h2 class="text-xl font-semibold text-white">Añadir Cultivo</h2>
        <p class="text-gray-400 mt-1">Crear un nuevo cultivo para un usuario</p>
      </div>
    </div>

    <!-- Loading state -->
    <div v-if="isLoading" class="flex items-center justify-center py-12">
      <div class="text-center">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 mb-4"></div>
        <p class="text-gray-400">Cargando usuarios...</p>
      </div>
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="bg-red-500/20 border border-red-500/30 rounded-lg p-6">
      <div class="flex items-center">
        <svg class="w-6 h-6 text-red-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <div>
          <h3 class="text-lg font-medium text-red-400">Error</h3>
          <p class="text-red-300 mt-1">{{ error }}</p>
        </div>
      </div>
      <button
        @click="loadUsers"
        class="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
      >
        Reintentar
      </button>
    </div>

    <!-- Formulario de creación -->
    <div v-else class="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Selección de usuario -->
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">
            Usuario Propietario *
          </label>
          <select
            v-model="formData.user_id"
            required
            class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="">Seleccionar usuario...</option>
            <option 
              v-for="user in users" 
              :key="user.id" 
              :value="user.id"
              class="bg-gray-700 text-white"
            >
              {{ user.name }} ({{ user.email }})
            </option>
          </select>
        </div>

        <!-- Campos del cultivo -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Nombre del cultivo -->
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">
              Nombre del Cultivo *
            </label>
            <input
              v-model="formData.name"
              type="text"
              required
              class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Ej: Tomates Cherry"
            />
          </div>

          <!-- Categoría -->
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">
              Categoría *
            </label>
            <input
              v-model="formData.category"
              type="text"
              required
              class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Ej: Hortalizas"
            />
          </div>

          <!-- Descripción -->
          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-300 mb-2">
              Descripción *
            </label>
            <textarea
              v-model="formData.description"
              rows="3"
              required
              class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
              placeholder="Descripción del cultivo, características especiales, cuidados necesarios..."
            ></textarea>
          </div>

          <!-- Imagen -->
          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-300 mb-2">
              Imagen del Cultivo
            </label>
            <div class="flex items-center space-x-4">
              <input
                ref="imageInput"
                type="file"
                accept="image/*"
                @change="handleImageChange"
                class="hidden"
              />
              <button
                type="button"
                @click="$refs.imageInput.click()"
                class="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-md transition-colors flex items-center space-x-2"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                </svg>
                <span>Seleccionar Imagen</span>
              </button>
              <div v-if="selectedImageName" class="flex items-center space-x-2 flex-1">
                <span class="text-green-400 text-sm">
                  {{ selectedImageName }}
                </span>
                <button
                  type="button"
                  @click="clearImage"
                  class="px-2 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-xs transition-colors"
                >
                  Limpiar
                </button>
              </div>
            </div>
            <p class="text-xs text-gray-500 mt-1">Selecciona una imagen del cultivo (opcional, máximo 5MB)</p>
          </div>

          <!-- Humedad mínima -->
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">
              Humedad Mínima (%) *
            </label>
            <input
              v-model="formData.humidity_min"
              type="number"
              min="0"
              max="100"
              required
              class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Ej: 60"
            />
          </div>

          <!-- Humedad máxima -->
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">
              Humedad Máxima (%) *
            </label>
            <input
              v-model="formData.humidity_max"
              type="number"
              min="0"
              max="100"
              required
              class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Ej: 80"
            />
          </div>

          <!-- Temperatura máxima -->
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">
              Temperatura Máxima (°C) *
            </label>
            <input
              v-model="formData.temperature_max"
              type="number"
              min="0"
              max="50"
              required
              class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Ej: 30"
            />
          </div>

          <!-- Días de crecimiento -->
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">
              Días de Crecimiento *
            </label>
            <input
              v-model="formData.growth_days"
              type="number"
              min="1"
              required
              class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Ej: 90"
            />
          </div>

          <!-- Temporada de cosecha -->
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">
              Temporada de Cosecha *
            </label>
            <select
              v-model="formData.session"
              required
              class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">Seleccionar temporada...</option>
              <option value="Primavera">Primavera</option>
              <option value="Verano">Verano</option>
              <option value="Otoño">Otoño</option>
              <option value="Invierno">Invierno</option>
              <option value="Todo el año">Todo el año</option>
            </select>
          </div>

          <!-- Estado de selección -->
          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-300 mb-2">
              Estado de Selección
            </label>
            <div class="flex items-center space-x-3">
              <input
                v-model="formData.selected"
                type="checkbox"
                class="w-4 h-4 text-green-600 bg-gray-700 border-gray-600 rounded focus:ring-green-500 focus:ring-2"
              />
              <span class="text-white">Marcar como seleccionado</span>
            </div>
            <p class="text-xs text-gray-500 mt-1">Indica si este cultivo está seleccionado para el usuario</p>
          </div>
        </div>

        <!-- Botones de acción -->
        <div class="flex items-center justify-end space-x-4 pt-6 border-t border-gray-700">
          <button
            type="button"
            @click="handleCancel"
            class="px-6 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-md transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            :disabled="isSaving"
            class="px-6 py-2 bg-green-600 hover:bg-green-700 disabled:bg-green-800 disabled:cursor-not-allowed text-white rounded-md transition-colors flex items-center"
          >
            <div v-if="isSaving" class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            {{ isSaving ? 'Creando...' : 'Crear Cultivo' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template> 