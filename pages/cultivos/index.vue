<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useToastNotifications } from '~/composables/useToastNotifications'
import { useCropStore } from '~/stores/crop'
import { useUserStore } from '~/stores/user'
import CropsFilter from '~/components/Crops/CropsFilter.vue'
import CropsTable from '~/components/Crops/CropsTable.vue'

// Configurar middleware de autenticación
definePageMeta({
  middleware: 'auth'
})

const { toast } = useToastNotifications()
const cropStore = useCropStore()
const userStore = useUserStore()

// Función para manejar cambios en los filtros
const handleFiltersChanged = (filters) => {
  cropStore.setSearchFilter(filters.name || '')
  cropStore.setCategoryFilter(filters.category === 'Todas' ? '' : filters.category || '')
  cropStore.setSessionFilter(filters.session || '')
  
  // Los filtros de humedad y temperatura se pueden manejar aquí si es necesario
  // Por ahora solo manejamos name, category y session en el store
}

// Función para manejar la selección de cultivos
const handleToggleSelection = async ({ cropId, isSelected }) => {
  try {
    if (isSelected) {
      const result = await cropStore.selectCrop(cropId)
      toast.success(`Cultivo "${result.data.name}" seleccionado exitosamente`)
    } else {
      const result = await cropStore.deselectCrop(cropId)
      toast.success(`Cultivo "${result.data.name}" deseleccionado exitosamente`)
    }
  } catch (error) {
    console.error('Error al cambiar selección de cultivo:', error)
    toast.error(error.response?.data?.message || 'Error al cambiar selección del cultivo')
  }
}

// Función para eliminar un cultivo
const handleDeleteCrop = async (cropId) => {
  try {
    const cropToDelete = cropStore.crops.find(c => c.id === cropId)
    
    // No permitir eliminar si está seleccionado
    if (cropToDelete?.selected) {
      toast.warning('No puedes eliminar un cultivo que está seleccionado')
      return
    }
    
    await cropStore.deleteCrop(cropId)
    toast.success(`Cultivo "${cropToDelete?.name}" eliminado exitosamente`)
  } catch (error) {
    console.error('Error al eliminar cultivo:', error)
    toast.error(error.response?.data?.message || 'Error al eliminar el cultivo')
  }
}

// Inicializar datos
onMounted(async () => {
  try {
    if (!cropStore.isInitialized) {
      await cropStore.init()
    }
    
    // Cargar todos los cultivos del usuario
    if (userStore.user?.id) {
      try {
        const result = await cropStore.fetchAllUserCrops(userStore.user.id)
        if (result.success && result.data.length === 0) {
          // Usuario sin cultivos, es normal
          console.log('Usuario sin cultivos registrados')
        }
      } catch (error) {
        console.error('Error cargando cultivos del usuario:', error)
        // No mostrar toast de error para evitar confusión
      }
    }
  } catch (error) {
    console.error('Error inicializando cultivos:', error)
    // No mostrar toast de error para evitar confusión
  }
})

// Observar cambios en el usuario para cargar su cultivo
watch(() => userStore.user?.id, async (userId) => {
  if (userId && cropStore.isInitialized) {
    try {
      const result = await cropStore.fetchAllUserCrops(userId)
      if (result.success && result.data.length === 0) {
        // Usuario sin cultivos, es normal
        console.log('Usuario sin cultivos registrados')
      }
    } catch (error) {
      console.error('Error cargando cultivos del usuario:', error)
      // No mostrar toast de error para evitar confusión
    }
  }
})
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="mb-8">
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 class="text-3xl font-bold text-white">Cultivos</h1>
          <p class="text-gray-400 mt-2">Gestiona y configura tus cultivos para el sistema de riego automatizado</p>
        </div>
        <NuxtLink 
          to="/cultivos/agregar"
          class="group inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200 transform hover:scale-105"
        >
          <svg class="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
          </svg>
          Añadir Cultivo
        </NuxtLink>
      </div>
    </div>

    <!-- Estado de carga -->
    <div v-if="cropStore.isLoading" class="flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
    </div>

    <!-- Contenido principal -->
    <template v-else>
      <!-- Filtros -->
      <CropsFilter 
        :results-count="cropStore.filteredCrops.length"
        :categories="cropStore.categories"
        @filters-changed="handleFiltersChanged"
      />

      <!-- Tabla de cultivos -->
      <CropsTable 
        :crops="cropStore.filteredCrops"
        @toggle-selection="handleToggleSelection"
        @delete-crop="handleDeleteCrop"
      />
    </template>
  </div>
</template>

<style scoped>
.bg-dark-card {
  background-color: #3a3a3a;
}
</style> 