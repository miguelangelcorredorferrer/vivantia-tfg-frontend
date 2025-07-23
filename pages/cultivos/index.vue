<script setup>
import { ref, computed, onMounted } from 'vue'
import { sampleCrops, filterCrops } from '~/utils/crops'
import { useToastNotifications } from '~/composables/useToastNotifications'
import CropsFilter from '~/components/Crops/CropsFilter.vue'
import CropsTable from '~/components/Crops/CropsTable.vue'

// Configurar middleware de autenticación
definePageMeta({
  middleware: 'auth'
})

const { cropSelected, cropDeselected, irrigationStarted, irrigationStopped, systemConnected } = useToastNotifications()

// Estado reactivo de los cultivos
const crops = ref([])

// Filtros aplicados
const currentFilters = ref({
  name: '',
  category: 'Todas',
  minHumidity: '',
  maxHumidity: '',
  maxTemperature: ''
})

// Cultivos filtrados
const filteredCrops = computed(() => {
  return filterCrops(crops.value, currentFilters.value)
})

// Función para manejar cambios en los filtros
const handleFiltersChanged = (filters) => {
  currentFilters.value = { ...filters }
}

// Función para manejar la selección de cultivos
const handleToggleSelection = ({ cropId, isSelected }) => {
  const cropIndex = crops.value.findIndex(crop => crop.id === cropId)
  if (cropIndex === -1) return
  
  const crop = crops.value[cropIndex]
  
  if (isSelected) {
    // SELECCIONAR cultivo
    const selectedIndex = crops.value.findIndex(c => c.isSelected)
    if (selectedIndex !== -1 && selectedIndex !== cropIndex) {
      // Hay otro cultivo seleccionado, deseleccionarlo SILENCIOSAMENTE
      const previousCrop = crops.value[selectedIndex]
      previousCrop.isSelected = false
      
      // Si el anterior tenía bomba activa, transferirla al nuevo
      if (previousCrop.waterPumpActive) {
        previousCrop.waterPumpActive = false
        crop.waterPumpActive = true
        // Transferencia silenciosa, sin alertas molestas
      }
    }
    
    // Seleccionar el cultivo actual
    crops.value[cropIndex].isSelected = true
    
    // Mostrar SOLO UNA alerta de cultivo seleccionado
    cropSelected(crop.name)
    
  } else {
    // DESELECCIONAR cultivo
    crops.value[cropIndex].isSelected = false
    
    // Mostrar alerta de deselección
    cropDeselected(crop.name)
    
    // Si tenía bomba activa, detener el riego (con alerta separada)
    if (crop.waterPumpActive) {
      crop.waterPumpActive = false
      irrigationStopped(crop.name)
    }
  }
}

// Función para eliminar un cultivo
const handleDeleteCrop = (cropId) => {
  const cropIndex = crops.value.findIndex(crop => crop.id === cropId)
  if (cropIndex === -1) return
  
  const crop = crops.value[cropIndex]
  
  // No permitir eliminar si está seleccionado
  if (crop.isSelected) {
    useToastNotifications().deviceAddError()
    return
  }
  
  // Eliminar el cultivo
  crops.value.splice(cropIndex, 1)
  // El toast se maneja en el componente CropsTable
}

// Cargar datos iniciales
onMounted(() => {
  // Clonar los datos de prueba para poder modificarlos
  crops.value = JSON.parse(JSON.stringify(sampleCrops))
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
          to="/cultivos/agregar/agregarCultivo"
          class="group inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200 transform hover:scale-105"
        >
          <svg class="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
          </svg>
          Añadir Cultivo
        </NuxtLink>
      </div>
    </div>

    <!-- Filtros -->
    <CropsFilter 
      :results-count="filteredCrops.length"
      @filters-changed="handleFiltersChanged"
    />

    <!-- Tabla de cultivos -->
    <CropsTable 
      :crops="filteredCrops"
      @toggle-selection="handleToggleSelection"
      @delete-crop="handleDeleteCrop"
    />
  </div>
</template>

<style scoped>
.bg-dark-card {
  background-color: #3a3a3a;
}
</style> 