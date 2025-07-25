<script setup>
import { useToastNotifications } from '~/composables/useToastNotifications'
import DeleteConfirmModal from './DeleteConfirmModal.vue'

const props = defineProps({
  crops: {
    type: Array,
    default: () => []
  },
  isLoading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['delete-crop', 'edit-crop', 'view-crop'])

const { toast } = useToastNotifications()

// Estado del modal de confirmación
const showDeleteModal = ref(false)
const cropToDelete = ref(null)

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'short',
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

const handleDeleteCrop = (crop) => {
  cropToDelete.value = crop
  showDeleteModal.value = true
}

const confirmDelete = async () => {
  try {
    await emit('delete-crop', cropToDelete.value.id)
    toast.success('Cultivo eliminado exitosamente')
  } catch (error) {
    toast.error('Error al eliminar cultivo')
  } finally {
    showDeleteModal.value = false
    cropToDelete.value = null
  }
}

const cancelDelete = () => {
  showDeleteModal.value = false
  cropToDelete.value = null
}

const handleEditCrop = (crop) => {
  // Navegar a la página de edición
  navigateTo(`/admin/crops/editar/${crop.id}`)
}

const handleViewCrop = (crop) => {
  // Navegar a la página de visualización
  navigateTo(`/admin/crops/ver/${crop.id}`)
}
</script>

<template>
  <div class="bg-gray-800/50 border border-gray-600/30 rounded-lg overflow-hidden">
    <!-- Header de la tabla -->
    <div class="px-6 py-4 border-b border-gray-600/30">
      <div class="flex items-center justify-between">
        <div>
          <h3 class="text-lg font-semibold text-white">Cultivos Disponibles</h3>
          <p class="text-sm text-gray-400 mt-1">
            {{ crops.length }} cultivo{{ crops.length !== 1 ? 's' : '' }} encontrado{{ crops.length !== 1 ? 's' : '' }}
          </p>
        </div>
        <button
          @click="navigateTo('/admin/crops/agregar')"
          class="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-md transition-colors"
        >
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
          </svg>
          Añadir Cultivo
        </button>
      </div>
    </div>

    <!-- Tabla -->
    <div class="overflow-x-auto">
      <table class="w-full">
        <thead class="bg-gray-700/50">
          <tr>
            <th class="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">
              Usuario
            </th>
            <th class="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">
              Cultivo
            </th>
            <th class="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">
              Categoría
            </th>
            <th class="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">
              Sesión
            </th>
            <th class="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">
              Estado
            </th>
            <th class="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">
              Fecha Creación
            </th>
            <th class="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-600/30">
          <!-- Estado de carga -->
          <tr v-if="isLoading">
            <td colspan="7" class="px-6 py-8 text-center">
              <div class="flex items-center justify-center space-x-2">
                <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-green-500"></div>
                <span class="text-gray-400">Cargando cultivos...</span>
              </div>
            </td>
          </tr>

          <!-- Sin cultivos -->
          <tr v-else-if="crops.length === 0">
            <td colspan="7" class="px-6 py-8 text-center">
              <div class="text-gray-400">
                <svg class="w-12 h-12 mx-auto mb-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                </svg>
                <p class="text-lg font-medium">No se encontraron cultivos</p>
                <p class="text-sm">Intenta ajustar los filtros de búsqueda</p>
              </div>
            </td>
          </tr>

          <!-- Lista de cultivos -->
          <tr v-else v-for="crop in crops" :key="crop.id" class="hover:bg-gray-700/30 transition-colors">
            <!-- Columna Usuario -->
            <td class="px-6 py-4 whitespace-nowrap text-center">
              <div class="flex flex-col items-center">
                <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-2">
                  <span class="text-white text-sm font-semibold">
                    {{ crop.user?.name?.charAt(0).toUpperCase() || '?' }}
                  </span>
                </div>
                <div class="text-center">
                  <div class="text-sm font-medium text-white">{{ crop.user?.name || 'Usuario no encontrado' }}</div>
                  <div class="text-xs text-gray-400">{{ crop.user?.email || 'Sin email' }}</div>
                </div>
              </div>
            </td>
            
            <!-- Columna Cultivo -->
            <td class="px-6 py-4 whitespace-nowrap text-center">
              <div class="flex flex-col items-center">
                <div class="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mb-2">
                  <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                  </svg>
                </div>
                <div class="text-center">
                  <div class="text-sm font-medium text-white">{{ crop.name }}</div>
                  <div class="text-xs text-gray-400">ID: {{ crop.id }}</div>
                </div>
              </div>
            </td>
            
            <!-- Columna Categoría -->
            <td class="px-6 py-4 whitespace-nowrap text-center">
              <div class="text-sm text-white">{{ crop.category || 'Sin categoría' }}</div>
            </td>
            
            <!-- Columna Sesión -->
            <td class="px-6 py-4 whitespace-nowrap text-center">
              <div class="text-sm text-gray-300">{{ crop.session || 'Sin sesión' }}</div>
            </td>
            
            <!-- Columna Estado -->
            <td class="px-6 py-4 whitespace-nowrap text-center">
              <span 
                class="inline-flex px-2 py-1 text-xs font-semibold rounded-full border"
                :class="getSelectedBadgeClass(crop.selected).class"
              >
                {{ getSelectedBadgeClass(crop.selected).label }}
              </span>
            </td>
            
            <!-- Columna Fecha Creación -->
            <td class="px-6 py-4 whitespace-nowrap text-center">
              <div class="text-sm text-gray-300">{{ formatDate(crop.created_at) }}</div>
            </td>
            
            <!-- Columna Acciones -->
            <td class="px-6 py-4 whitespace-nowrap text-center">
              <div class="flex items-center justify-center space-x-2">
                <!-- Botón Ver -->
                <button
                  @click="handleViewCrop(crop)"
                  class="inline-flex items-center px-2 py-1 border border-blue-500/30 text-blue-400 text-xs font-medium rounded-md hover:bg-blue-500/20 hover:border-blue-500/50 transition-colors"
                  title="Ver detalles del cultivo"
                >
                  <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                  </svg>
                  Ver
                </button>
                
                <!-- Botón Editar -->
                <button
                  @click="handleEditCrop(crop)"
                  class="inline-flex items-center px-2 py-1 border border-yellow-500/30 text-yellow-400 text-xs font-medium rounded-md hover:bg-yellow-500/20 hover:border-yellow-500/50 transition-colors"
                  title="Editar cultivo"
                >
                  <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                  </svg>
                  Editar
                </button>
                
                <!-- Botón Eliminar -->
                <button
                  @click="handleDeleteCrop(crop)"
                  class="inline-flex items-center px-2 py-1 border border-red-500/30 text-red-400 text-xs font-medium rounded-md hover:bg-red-500/20 hover:border-red-500/50 transition-colors"
                  title="Eliminar cultivo"
                >
                  <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                  </svg>
                  Eliminar
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- Modal de confirmación de eliminación -->
  <DeleteConfirmModal
    :is-open="showDeleteModal"
    title="Eliminar Cultivo"
    message="¿Estás seguro de que quieres eliminar este cultivo?"
    :item-name="cropToDelete?.name"
    item-type="cultivo"
    @confirm="confirmDelete"
    @cancel="cancelDelete"
  />
</template> 