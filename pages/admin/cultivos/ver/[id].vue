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

// Cargar cultivo al montar el componente
onMounted(async () => {
  try {
    await adminStore.fetchAllCrops()
    const foundCrop = adminStore.crops.find(c => c.id == cropId)
    if (foundCrop) {
      crop.value = foundCrop
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

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const getSelectedBadgeClass = (selected) => {
  return selected ? {
    label: 'Seleccionado',
    class: 'bg-green-500/20 text-green-400 border-green-500/30'
  } : {
    label: 'No seleccionado',
    class: 'bg-gray-500/20 text-gray-400 border-gray-500/30'
  }
}

const goBack = () => {
  router.push('/admin/cultivos')
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
          <div class="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
            </svg>
          </div>
          <div>
            <h1 class="text-3xl font-bold text-white">Detalles del Cultivo</h1>
            <p class="text-gray-400">Información completa del cultivo seleccionado</p>
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

    <!-- Contenido del cultivo -->
    <div v-else-if="crop" class="space-y-6">
      <!-- Información básica -->
      <div class="bg-gray-800/50 border border-gray-600/30 rounded-lg p-6">
        <h2 class="text-xl font-semibold text-white mb-4">Información Básica</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Nombre del Cultivo</label>
            <p class="text-white font-medium">{{ crop.name }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Categoría</label>
            <p class="text-white">{{ crop.category || 'Sin categoría' }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Sesión de Cultivo</label>
            <p class="text-white">{{ crop.session || 'Sin sesión' }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Estado</label>
            <span 
              class="inline-flex px-2 py-1 text-xs font-semibold rounded-full border"
              :class="getSelectedBadgeClass(crop.selected).class"
            >
              {{ getSelectedBadgeClass(crop.selected).label }}
            </span>
          </div>
        </div>
      </div>

      <!-- Información del usuario propietario -->
      <div class="bg-gray-800/50 border border-gray-600/30 rounded-lg p-6">
        <h2 class="text-xl font-semibold text-white mb-4">Usuario Propietario</h2>
        <div class="flex items-center space-x-4">
          <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <span class="text-white text-xl font-semibold">
              {{ crop.user?.name?.charAt(0).toUpperCase() || '?' }}
            </span>
          </div>
          <div>
            <h3 class="text-lg font-medium text-white">{{ crop.user?.name || 'Usuario no encontrado' }}</h3>
            <p class="text-gray-400">{{ crop.user?.email || 'Sin email' }}</p>
            <p class="text-sm text-gray-500">ID: {{ crop.user?.id || 'N/A' }}</p>
          </div>
        </div>
      </div>

      <!-- Información de crecimiento -->
      <div class="bg-gray-800/50 border border-gray-600/30 rounded-lg p-6">
        <h2 class="text-xl font-semibold text-white mb-4">Información de Crecimiento</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Días de Crecimiento</label>
            <p class="text-white">{{ crop.growth_days || 'No especificado' }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Humedad Mínima (%)</label>
            <p class="text-white">{{ crop.humidity_min || 'No especificado' }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Humedad Máxima (%)</label>
            <p class="text-white">{{ crop.humidity_max || 'No especificado' }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Temperatura Máxima (°C)</label>
            <p class="text-white">{{ crop.temperature_max || 'No especificado' }}</p>
          </div>
        </div>
      </div>

      <!-- Información adicional -->
      <div class="bg-gray-800/50 border border-gray-600/30 rounded-lg p-6">
        <h2 class="text-xl font-semibold text-white mb-4">Información Adicional</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Descripción</label>
            <p class="text-white">{{ crop.description || 'Sin descripción' }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Fecha de Creación</label>
            <p class="text-white">{{ formatDate(crop.created_at) }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">ID del Cultivo</label>
            <p class="text-white">{{ crop.id }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">ID del Usuario</label>
            <p class="text-white">{{ crop.user_id }}</p>
          </div>
        </div>
      </div>

      <!-- Acciones -->
      <div class="flex items-center justify-center space-x-4 pt-6">
        <button
          @click="goBack"
          class="px-6 py-2 bg-gray-600 hover:bg-gray-500 text-white font-medium rounded-lg transition-colors"
        >
          Volver a la lista
        </button>
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