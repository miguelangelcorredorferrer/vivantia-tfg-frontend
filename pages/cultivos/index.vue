<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useToastNotifications } from '~/composables/useToastNotifications'
import { useCropStore } from '~/stores/crop'
import { useUserStore } from '~/stores/user'
import CropsFilter from '~/components/Crops/CropsFilter.vue'
import CropsTable from '~/components/Crops/CropsTable.vue'
import CropPageHeader from '~/components/Crops/Layout/CropPageHeader.vue'
import CropLoadingState from '~/components/Crops/Layout/CropLoadingState.vue'

// Configurar middleware
definePageMeta({
  middleware: ['auth', 'visitor-block']
})

const { toast } = useToastNotifications()
const cropStore = useCropStore()
const userStore = useUserStore()

// Función para manejar cambios en los filtros
const handleFiltersChanged = (filters) => {
  cropStore.setSearchFilter(filters.name || '')
  cropStore.setCategoryFilter(filters.category === 'Todas' ? '' : filters.category || '')
  cropStore.setSessionFilter(filters.session || '')
  
  // Filtros adicionales de humedad y temperatura
  // Estos se pueden implementar en el store si se necesita filtrado avanzado
  console.log('Filtros aplicados:', {
    name: filters.name,
    category: filters.category,
    session: filters.session,
    soilHumidity: { min: filters.minSoilHumidity, max: filters.maxSoilHumidity },
    airHumidity: { min: filters.minAirHumidity, max: filters.maxAirHumidity },
    temperature: { max: filters.maxTemperature }
  })
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
    <CropPageHeader />

    <!-- Estado de carga -->
    <CropLoadingState v-if="cropStore.isLoading" />

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

 