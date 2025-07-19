<template>
  <BaseCard title="Cultivos Disponibles">
    <template #header-actions>
      <div class="flex items-center space-x-4">
        <div class="flex items-center space-x-2">
          <span class="text-sm text-gray-300 font-bold">Total: {{ crops.length }}</span>
          <span v-if="selectedCrop" class="text-xs text-green-500 bg-green-900/30 px-2 py-1 rounded-full">
            {{ selectedCrop.name }} seleccionado
          </span>
        </div>
        <div class="flex items-center space-x-1 text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded">
          <component :is="getIcon('info')" />
          <span>Solo 1 cultivo seleccionado permitido</span>
        </div>
      </div>
    </template>

    <div class="overflow-x-auto">
      <div v-if="crops.length === 0" class="text-center py-12">
        <component :is="getIcon('plantConfig')" class="mx-auto mb-4 opacity-50" />
        <h3 class="text-lg font-medium text-white mb-2">No se encontraron cultivos</h3>
        <p class="text-gray-400">Intenta ajustar los filtros para encontrar cultivos</p>
      </div>

      <table v-else class="w-full text-sm text-left">
        <thead class="text-xs text-gray-300 uppercase bg-gray-800/50 border-b border-gray-600">
          <tr>
            <th scope="col" class="px-6 py-4 font-medium">Cultivo</th>
            <th scope="col" class="px-6 py-4 font-medium">Categoría</th>
            <th scope="col" class="px-6 py-4 font-medium text-center">Humedad (%)</th>
            <th scope="col" class="px-6 py-4 font-medium text-center">Temp. Máx. (°C)</th>
            <th scope="col" class="px-6 py-4 font-medium text-center">Bomba</th>
            <th scope="col" class="px-6 py-4 font-medium text-center">Seleccionado</th>
            <th scope="col" class="px-6 py-4 font-medium text-center">Acciones</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-600">
          <tr 
            v-for="crop in crops" 
            :key="crop.id"
            class="hover:bg-gray-800/30 transition-colors duration-150"
            :class="{ 'bg-green-900/20 border-green-500/30': crop.isSelected }"
          >
            <!-- Cultivo -->
            <td class="px-6 py-4">
              <div class="flex items-center">
                <div class="flex-shrink-0 w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                  <component :is="getIcon('plant')" class="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <div class="font-medium text-white">{{ crop.name }}</div>
                  <div class="text-sm text-gray-400">{{ crop.description }}</div>
                </div>
              </div>
            </td>

            <!-- Categoría -->
            <td class="px-6 py-4 text-gray-300">
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-700 text-gray-300">
                {{ crop.category }}
              </span>
            </td>

            <!-- Humedad -->
            <td class="px-6 py-4 text-center">
              <div class="text-gray-300">
                <div class="text-sm font-medium">{{ crop.minHumidity }}% - {{ crop.maxHumidity }}%</div>
                <div class="text-xs text-gray-500">Rango óptimo</div>
              </div>
            </td>

            <!-- Temperatura Máxima -->
            <td class="px-6 py-4 text-center">
              <div class="text-gray-300">
                <div class="text-sm font-medium">{{ crop.maxTemperature }}°C</div>
                <div class="text-xs text-gray-500">Máximo</div>
              </div>
            </td>

            <!-- Estado de la Bomba -->
            <td class="px-6 py-4 text-center">
              <div class="flex items-center justify-center">
                <div 
                  class="flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium"
                  :class="crop.waterPumpActive 
                    ? 'bg-blue-900/30 text-blue-400 border border-blue-500/30' 
                    : 'bg-gray-700 text-gray-400 border border-gray-600'"
                >
                  <div 
                    class="w-2 h-2 rounded-full"
                    :class="crop.waterPumpActive ? 'bg-blue-400 animate-pulse' : 'bg-gray-500'"
                  ></div>
                  <span>{{ crop.waterPumpActive ? 'Activa' : 'Inactiva' }}</span>
                </div>
              </div>
            </td>

            <!-- Estado Selección -->
            <td class="px-6 py-4 text-center">
              <div class="flex flex-col items-center space-y-2">
                <CropSwitch
                  :model-value="crop.isSelected"
                  :label="`Seleccionar ${crop.name}`"
                  @change="(value) => handleToggleSelection(crop.id, value)"
                  :disabled="!crop.isSelected && hasSelectedCrop"
                />
                <span class="text-xs font-medium" :class="crop.isSelected ? 'text-green-400' : 'text-gray-500'">
                  {{ crop.isSelected ? 'Seleccionado' : 'No seleccionado' }}
                </span>
              </div>
            </td>

            <!-- Acciones -->
            <td class="px-6 py-4">
              <div class="flex items-center justify-center space-x-4">
                <!-- Botón Editar -->
                <div class="flex flex-col items-center space-y-1">
                  <button
                    @click="handleEdit(crop)"
                    class="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-900/20 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    title="Editar cultivo"
                  >
                    <component :is="getIcon('edit')" />
                  </button>
                  <span class="text-xs text-gray-400">Editar</span>
                </div>

                <!-- Botón Eliminar -->
                <div class="flex flex-col items-center space-y-1">
                  <button
                    @click="handleDelete(crop)"
                    class="p-2 text-gray-400 hover:text-red-400 hover:bg-red-900/20 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500"
                    title="Eliminar cultivo"
                    :disabled="crop.isSelected"
                    :class="{ 'opacity-50 cursor-not-allowed': crop.isSelected }"
                  >
                    <component :is="getIcon('delete')" />
                  </button>
                  <span class="text-xs text-gray-400" :class="{ 'opacity-50': crop.isSelected }">Borrar</span>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal de confirmación -->
    <ConfirmDeleteModal
      :is-visible="showDeleteModal"
      :crop-name="cropToDelete?.name || ''"
      @confirm="confirmDelete"
      @cancel="cancelDelete"
    />
  </BaseCard>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToastNotifications } from '~/composables/useToastNotifications'
import { getIcon } from '~/assets/icons'
import BaseCard from '../Cards/BaseCard.vue'
import CropSwitch from './CropSwitch.vue'
import ConfirmDeleteModal from './ConfirmDeleteModal.vue'

const props = defineProps({
  crops: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['toggle-selection', 'delete-crop'])

const router = useRouter()
const toast = useToastNotifications()

// Estado del modal de eliminación
const showDeleteModal = ref(false)
const cropToDelete = ref(null)

// Computed para obtener el cultivo seleccionado
const selectedCrop = computed(() => {
  return props.crops.find(crop => crop.isSelected)
})

// Computed para verificar si hay un cultivo seleccionado
const hasSelectedCrop = computed(() => {
  return !!selectedCrop.value
})

// Función para manejar la selección de cultivos
const handleToggleSelection = (cropId, value) => {
  const crop = props.crops.find(c => c.id === cropId)
  
  if (value && hasSelectedCrop.value && !crop.isSelected) {
    // Ya hay un cultivo seleccionado, mostrar advertencia
    toast.deviceAddError()
    return
  }
  
  // Solo emitir el evento, las alertas las maneja la página principal
  emit('toggle-selection', { cropId, isSelected: value })
}

// Función para manejar la edición
const handleEdit = (crop) => {
  // Navegar a la página de edición
  router.push(`/cultivos/editar/${crop.id}`)
}

// Función para manejar la eliminación
const handleDelete = (crop) => {
  if (crop.isSelected) {
    toast.deviceAddError()
    return
  }
  
  // Mostrar modal de confirmación
  cropToDelete.value = crop
  showDeleteModal.value = true
}

// Función para confirmar la eliminación
const confirmDelete = () => {
  if (cropToDelete.value) {
    const cropName = cropToDelete.value.name
    
    // Cerrar modal INMEDIATAMENTE
    showDeleteModal.value = false
    
    // Emitir evento para eliminar el cultivo
    emit('delete-crop', cropToDelete.value.id)
    
    // Toast personalizado para eliminación
    toast.cropDeleted(cropName)
    
    // Limpiar referencia
    cropToDelete.value = null
  }
}

// Función para cancelar la eliminación
const cancelDelete = () => {
  showDeleteModal.value = false
  cropToDelete.value = null
}
</script>

<style scoped>
/* Estilos personalizados para la tabla */
.table-fixed {
  table-layout: fixed;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  table {
    font-size: 0.75rem;
  }
  
  th, td {
    padding: 0.75rem 0.5rem;
  }
  
  .hidden-mobile {
    display: none;
  }
}

/* Animación para filas seleccionadas */
tr.bg-green-900\/20 {
  animation: pulse-green 2s infinite;
}

@keyframes pulse-green {
  0%, 100% {
    background-color: rgba(6, 78, 59, 0.2);
  }
  50% {
    background-color: rgba(6, 78, 59, 0.3);
  }
}
</style> 