<script setup>
import { useAdminStore } from '~/stores/admin'
import { useToastNotifications } from '~/composables/useToastNotifications'

// Configurar middleware de administrador
definePageMeta({
  middleware: 'admin'
})

const route = useRoute()
const router = useRouter()
const adminStore = useAdminStore()
const { toast } = useToastNotifications()

const cropId = route.params.id
const crop = ref(null)
const isLoading = ref(true)
const isSaving = ref(false)

// Formulario de edición
const form = ref({
  name: '',
  description: '',
  category: '',
  growth_days: '',
  humidity_min: '',
  humidity_max: '',
  temperature_max: '',
  session: '',
  selected: false
})

// Cargar cultivo al montar el componente
onMounted(async () => {
  try {
    await adminStore.fetchAllCrops()
    const foundCrop = adminStore.crops.find(c => c.id == cropId)
    if (foundCrop) {
      crop.value = foundCrop
      // Llenar formulario con datos del cultivo
      form.value = {
        name: foundCrop.name || '',
        description: foundCrop.description || '',
        category: foundCrop.category || '',
        growth_days: foundCrop.growth_days || '',
        humidity_min: foundCrop.humidity_min || '',
        humidity_max: foundCrop.humidity_max || '',
        temperature_max: foundCrop.temperature_max || '',
        session: foundCrop.session || '',
        selected: foundCrop.selected || false
      }
    } else {
      toast.error('Cultivo no encontrado')
      router.push('/admin/cultivos')
    }
  } catch (error) {
    toast.error('Error al cargar cultivo')
    router.push('/admin/cultivos')
  } finally {
    isLoading.value = false
  }
})

const saveCrop = async () => {
  try {
    isSaving.value = true
    
    // Validar campos obligatorios
    if (!form.value.name.trim()) {
      toast.error('El nombre del cultivo es obligatorio')
      return
    }

    // Preparar datos para enviar
    const updateData = {
      name: form.value.name.trim(),
      description: form.value.description.trim() || null,
      category: form.value.category.trim() || null,
      growth_days: form.value.growth_days ? parseInt(form.value.growth_days) : null,
      humidity_min: form.value.humidity_min ? parseFloat(form.value.humidity_min) : null,
      humidity_max: form.value.humidity_max ? parseFloat(form.value.humidity_max) : null,
      temperature_max: form.value.temperature_max ? parseFloat(form.value.temperature_max) : null,
      session: form.value.session.trim() || null,
      selected: form.value.selected
    }

    // Actualizar cultivo
    await CropAPI.update(cropId, updateData)
    
    // Actualizar en el store
    await adminStore.fetchAllCrops()
    
    toast.success('Cultivo actualizado exitosamente')
    router.push('/admin/cultivos')
  } catch (error) {
    console.error('Error al actualizar cultivo:', error)
    toast.error('Error al actualizar cultivo')
  } finally {
    isSaving.value = false
  }
}

const goBack = () => {
  router.push('/admin/cultivos')
}

const resetForm = () => {
  if (crop.value) {
    form.value = {
      name: crop.value.name || '',
      description: crop.value.description || '',
      category: crop.value.category || '',
      growth_days: crop.value.growth_days || '',
      humidity_min: crop.value.humidity_min || '',
      humidity_max: crop.value.humidity_max || '',
      temperature_max: crop.value.temperature_max || '',
      session: crop.value.session || '',
      selected: crop.value.selected || false
    }
  }
}
</script>

<template>
  <div class="space-y-8">
    <!-- Header de la página -->
    <div class="mb-8">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-3">
          <button
            @click="goBack"
            class="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
          >
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
          </button>
          <div class="w-10 h-10 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
            </svg>
          </div>
          <div>
            <h1 class="text-3xl font-bold text-white">Editar Cultivo</h1>
            <p class="text-gray-400">Modificar información del cultivo seleccionado</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Estado de carga -->
    <div v-if="isLoading" class="flex items-center justify-center py-12">
      <div class="flex items-center space-x-2">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
        <span class="text-gray-400">Cargando cultivo...</span>
      </div>
    </div>

    <!-- Formulario de edición -->
    <div v-else-if="crop" class="space-y-6">
      <!-- Información del usuario propietario (solo lectura) -->
      <div class="bg-gray-800/50 border border-gray-600/30 rounded-lg p-6">
        <h2 class="text-xl font-semibold text-white mb-4">Usuario Propietario</h2>
        <div class="flex items-center space-x-4">
          <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <span class="text-white font-semibold">
              {{ crop.user?.name?.charAt(0).toUpperCase() || '?' }}
            </span>
          </div>
          <div>
            <h3 class="text-lg font-medium text-white">{{ crop.user?.name || 'Usuario no encontrado' }}</h3>
            <p class="text-gray-400">{{ crop.user?.email || 'Sin email' }}</p>
          </div>
        </div>
      </div>

      <!-- Formulario de edición -->
      <div class="bg-gray-800/50 border border-gray-600/30 rounded-lg p-6">
        <h2 class="text-xl font-semibold text-white mb-6">Información del Cultivo</h2>
        
        <form @submit.prevent="saveCrop" class="space-y-6">
          <!-- Información básica -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label for="name" class="block text-sm font-medium text-gray-300 mb-2">
                Nombre del Cultivo <span class="text-red-400">*</span>
              </label>
              <input
                id="name"
                v-model="form.name"
                type="text"
                required
                class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Nombre del cultivo"
              />
            </div>
            
            <div>
              <label for="category" class="block text-sm font-medium text-gray-300 mb-2">
                Categoría
              </label>
              <input
                id="category"
                v-model="form.category"
                type="text"
                class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Categoría del cultivo"
              />
            </div>
          </div>

          <!-- Descripción -->
          <div>
            <label for="description" class="block text-sm font-medium text-gray-300 mb-2">
              Descripción
            </label>
            <textarea
              id="description"
              v-model="form.description"
              rows="3"
              class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Descripción del cultivo"
            ></textarea>
          </div>

          <!-- Información de crecimiento -->
          <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <label for="growth_days" class="block text-sm font-medium text-gray-300 mb-2">
                Días de Crecimiento
              </label>
              <input
                id="growth_days"
                v-model="form.growth_days"
                type="number"
                min="0"
                class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Días"
              />
            </div>
            
            <div>
              <label for="humidity_min" class="block text-sm font-medium text-gray-300 mb-2">
                Humedad Mínima (%)
              </label>
              <input
                id="humidity_min"
                v-model="form.humidity_min"
                type="number"
                min="0"
                max="100"
                step="0.1"
                class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="0-100"
              />
            </div>
            
            <div>
              <label for="humidity_max" class="block text-sm font-medium text-gray-300 mb-2">
                Humedad Máxima (%)
              </label>
              <input
                id="humidity_max"
                v-model="form.humidity_max"
                type="number"
                min="0"
                max="100"
                step="0.1"
                class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="0-100"
              />
            </div>
            
            <div>
              <label for="temperature_max" class="block text-sm font-medium text-gray-300 mb-2">
                Temperatura Máxima (°C)
              </label>
              <input
                id="temperature_max"
                v-model="form.temperature_max"
                type="number"
                min="-50"
                max="100"
                step="0.1"
                class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Temperatura"
              />
            </div>
          </div>

          <!-- Sesión y estado -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label for="session" class="block text-sm font-medium text-gray-300 mb-2">
                Sesión de Cultivo
              </label>
              <input
                id="session"
                v-model="form.session"
                type="text"
                class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Sesión de cultivo"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">
                Estado de Selección
              </label>
              <div class="flex items-center space-x-4">
                <label class="flex items-center">
                  <input
                    v-model="form.selected"
                    type="checkbox"
                    class="w-4 h-4 text-green-600 bg-gray-700 border-gray-600 rounded focus:ring-green-500 focus:ring-2"
                  />
                  <span class="ml-2 text-white">Cultivo seleccionado</span>
                </label>
              </div>
            </div>
          </div>

          <!-- Acciones -->
          <div class="flex items-center justify-end space-x-4 pt-6 border-t border-gray-600">
            <button
              type="button"
              @click="resetForm"
              class="px-6 py-2 bg-gray-600 hover:bg-gray-500 text-white font-medium rounded-lg transition-colors"
            >
              Restaurar
            </button>
            <button
              type="button"
              @click="goBack"
              class="px-6 py-2 bg-gray-600 hover:bg-gray-500 text-white font-medium rounded-lg transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              :disabled="isSaving"
              class="px-6 py-2 bg-green-600 hover:bg-green-700 disabled:bg-green-800 text-white font-medium rounded-lg transition-colors flex items-center space-x-2"
            >
              <div v-if="isSaving" class="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span>{{ isSaving ? 'Guardando...' : 'Guardar Cambios' }}</span>
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Cultivo no encontrado -->
    <div v-else class="text-center py-12">
      <div class="text-gray-400">
        <svg class="w-16 h-16 mx-auto mb-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
        </svg>
        <p class="text-lg font-medium">Cultivo no encontrado</p>
        <p class="text-sm">El cultivo que buscas no existe o ha sido eliminado</p>
        <button
          @click="goBack"
          class="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
        >
          Volver a la lista
        </button>
      </div>
    </div>
  </div>
</template> 