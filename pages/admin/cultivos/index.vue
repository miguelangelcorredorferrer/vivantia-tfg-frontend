<script setup>
import { useAdminStore } from '~/stores/admin'
import { useToastNotifications } from '~/composables/useToastNotifications'
import CropsFilter from '~/components/Admin/Crops/CropsFilter.vue'
import CropsTable from '~/components/Admin/Crops/CropsTable.vue'

// Configurar middleware
definePageMeta({
  middleware: ['auth', 'admin', 'visitor-block']
})

// Stores y composables
const adminStore = useAdminStore()
const { toast } = useToastNotifications()

// Cargar cultivos al montar el componente
onMounted(async () => {
  try {
    console.log('🌱 Cargando cultivos en admin/cultivos...')
    await adminStore.fetchAllCrops()
    console.log('✅ Cultivos cargados exitosamente:', adminStore.crops.length)
  } catch (error) {
    console.error('❌ Error cargando cultivos en admin:', error)
    // Solo mostrar error si no es un problema de conexión o datos vacíos
    if (error.message && !error.message.includes('No se encontraron')) {
      toast.error(`Error al cargar cultivos: ${error.message}`)
    } else {
      console.log('ℹ️ No hay cultivos disponibles o error de conexión')
    }
  }
})

// Manejar cambios en filtros
const handleFilterChange = (filters) => {
  adminStore.updateCropFilters(filters.name, filters.category, filters.user, filters.email, filters.session)
}

const handleClearFilters = () => {
  adminStore.clearCropFilters()
}

// Manejar eliminación de cultivo
const handleDeleteCrop = async (cropId) => {
  try {
    await adminStore.deleteCrop(cropId)
  } catch (error) {
    toast.error('Error al eliminar cultivo')
  }
}

// Manejar edición de cultivo
const handleEditCrop = (crop) => {
  console.log('Navegar a edición de cultivo:', crop.id)
  navigateTo(`/admin/cultivos/editar/${crop.id}`)
}

// Manejar visualización de cultivo
const handleViewCrop = (crop) => {
  console.log('Navegar a visualización de cultivo:', crop.id)
  navigateTo(`/admin/cultivos/ver/${crop.id}`)
}
</script>

<template>
  <div class="space-y-8">
    <!-- Header de la página -->
    <div class="mb-8">
      <div class="flex items-center space-x-3 mb-2">
        <div class="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
          </svg>
        </div>
        <div>
          <h1 class="text-3xl font-bold text-white">Panel de Administración</h1>
          <p class="text-gray-400">Bienvenido al centro de control del sistema Vivantia</p>
        </div>
      </div>
      <div class="mt-4 flex justify-between items-center">
        <div>
          <h2 class="text-xl font-semibold text-white">Gestión de Cultivos</h2>
          <p class="text-gray-400 mt-1">Administración y supervisión de todos los cultivos del sistema</p>
        </div>
        <NuxtLink 
          to="/admin/cultivos/agregar"
          class="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors duration-200 flex items-center space-x-2"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
          </svg>
          <span>Agregar Cultivo</span>
        </NuxtLink>
      </div>
    </div>

    <!-- Estadísticas rápidas -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <div class="bg-gradient-to-r from-green-500/20 to-green-600/20 border border-green-500/30 rounded-lg p-6">
        <div class="flex items-center">
          <div class="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mr-4">
            <svg class="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
            </svg>
          </div>
          <div>
            <p class="text-2xl font-bold text-white">{{ adminStore.totalCrops }}</p>
            <p class="text-sm text-green-300">Total de Cultivos</p>
          </div>
        </div>
      </div>

      <div class="bg-gradient-to-r from-blue-500/20 to-blue-600/20 border border-blue-500/30 rounded-lg p-6">
        <div class="flex items-center">
          <div class="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mr-4">
            <svg class="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <div>
            <p class="text-2xl font-bold text-white">{{ adminStore.filteredCropsCount }}</p>
            <p class="text-sm text-blue-300">Cultivos Filtrados</p>
          </div>
        </div>
      </div>

      <div class="bg-gradient-to-r from-purple-500/20 to-purple-600/20 border border-purple-500/30 rounded-lg p-6">
        <div class="flex items-center">
          <div class="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mr-4">
            <svg class="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/>
            </svg>
          </div>
          <div>
            <p class="text-2xl font-bold text-white">{{ adminStore.crops.filter(c => c.selected).length }}</p>
            <p class="text-sm text-purple-300">Cultivos Seleccionados</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Filtros -->
    <CropsFilter 
      :name-filter="adminStore.cropNameFilter"
      :category-filter="adminStore.cropCategoryFilter"
      :user-filter="adminStore.cropUserFilter"
      :email-filter="adminStore.cropEmailFilter"
      :session-filter="adminStore.cropSessionFilter"
      @filter-change="handleFilterChange"
      @clear-filters="handleClearFilters"
    />

    <!-- Tabla de cultivos -->
    <CropsTable 
      :crops="adminStore.filteredCrops"
      :is-loading="adminStore.isLoading"
      @delete-crop="handleDeleteCrop"
      @edit-crop="handleEditCrop"
      @view-crop="handleViewCrop"
    />
  </div>
</template> 