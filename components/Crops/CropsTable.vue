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
          <span>Selección automática: al seleccionar un cultivo se deseleccionan los demás</span>
        </div>
      </div>
    </template>

    <div class="overflow-x-auto">
      <div v-if="crops.length === 0" class="text-center py-12">
        <component :is="getIcon('plantConfig')" class="mx-auto mb-4 opacity-50" />
        <h3 class="text-lg font-medium text-white mb-2">No tienes cultivos registrados</h3>
        <p class="text-gray-400">Crea tu primer cultivo para comenzar a usar el sistema de riego</p>
        <NuxtLink 
          to="/cultivos/agregar"
          class="inline-flex items-center px-4 py-2 mt-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-200"
        >
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
          </svg>
          Crear Primer Cultivo
        </NuxtLink>
      </div>

      <table v-else class="w-full text-sm text-left">
        <thead class="text-xs text-gray-300 uppercase bg-gray-800/50 border-b border-gray-600">
          <tr>
            <th scope="col" class="px-6 py-4 font-medium">Cultivo</th>
            <th scope="col" class="px-6 py-4 font-medium">Categoría</th>
            <th scope="col" class="px-6 py-4 font-medium text-center">Temporada</th>
            <th scope="col" class="px-6 py-4 font-medium text-center">Hum. Suelo (%)</th>
            <th scope="col" class="px-6 py-4 font-medium text-center">Hum. Aire (%)</th>
            <th scope="col" class="px-6 py-4 font-medium text-center">Temp. Máx. (°C)</th>
            <th scope="col" class="px-6 py-4 font-medium text-center">Crecimiento (días)</th>
            <th scope="col" class="px-6 py-4 font-medium text-center">Estado Bomba</th>
            <th scope="col" class="px-6 py-4 font-medium text-center">Seleccionado</th>
            <th scope="col" class="px-6 py-4 font-medium text-center">Acciones</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-600">
          <tr 
            v-for="crop in crops" 
            :key="crop.id"
            class="hover:bg-gray-800/30 transition-colors duration-150"
            :class="{ 'bg-green-900/20 border-green-500/30': crop.selected }"
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

            <!-- Temporada -->
            <td class="px-6 py-4 text-center">
              <div class="text-gray-300">
                <div class="text-sm font-medium">{{ crop.session || 'N/A' }}</div>
                <div class="text-xs text-gray-500">Temporada</div>
              </div>
            </td>

            <!-- Humedad Suelo -->
            <td class="px-6 py-4 text-center">
              <div class="text-gray-300">
                <div class="text-sm font-medium">{{ crop.soil_humidity_min }}% - {{ crop.soil_humidity_max }}%</div>
                <div class="text-xs text-gray-500">Suelo</div>
              </div>
            </td>

            <!-- Humedad Aire -->
            <td class="px-6 py-4 text-center">
              <div class="text-gray-300">
                <div class="text-sm font-medium">{{ crop.air_humidity_min }}% - {{ crop.air_humidity_max }}%</div>
                <div class="text-xs text-gray-500">Aire</div>
              </div>
            </td>

            <!-- Temperatura Máxima -->
            <td class="px-6 py-4 text-center">
              <div class="text-gray-300">
                <div class="text-sm font-medium">{{ crop.temperature_max }}°C</div>
                <div class="text-xs text-gray-500">Máximo</div>
              </div>
            </td>

            <!-- Días de crecimiento -->
            <td class="px-6 py-4 text-center">
              <div class="text-gray-300">
                <div class="text-sm font-medium">{{ crop.growth_days || 'N/A' }}</div>
                <div class="text-xs text-gray-500">días</div>
              </div>
            </td>

            <!-- Estado de la Bomba -->
            <td class="px-6 py-4 text-center">
              <div class="flex items-center justify-center">
                <div 
                  class="flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium border"
                  :class="[
                    getPumpStatus(crop).bgClass,
                    getPumpStatus(crop).textClass,
                    getPumpStatus(crop).borderClass
                  ]"
                >
                  <div 
                    class="w-2 h-2 rounded-full"
                    :class="[
                      getPumpStatus(crop).dotClass,
                      getPumpStatus(crop).isActive ? 'animate-pulse' : ''
                    ]"
                  ></div>
                  <span>{{ getPumpStatus(crop).status }}</span>
                </div>
              </div>
            </td>

            <!-- Estado Selección -->
            <td class="px-6 py-4 text-center">
              <div class="flex flex-col items-center space-y-2">
                <CropSwitch
                  :model-value="crop.selected"
                  :label="`Seleccionar ${crop.name}`"
                  @change="(value) => handleToggleSelection(crop.id, value)"
                />
                <span class="text-xs font-medium" :class="crop.selected ? 'text-green-400' : 'text-gray-500'">
                  {{ crop.selected ? 'Seleccionado' : 'No seleccionado' }}
                </span>
              </div>
            </td>

            <!-- Acciones -->
            <td class="px-6 py-4">
              <div class="flex items-center justify-center space-x-4">
                <!-- Botón Ver -->
                <div class="flex flex-col items-center space-y-1">
                  <button
                    @click="handleView(crop)"
                    class="p-2 text-gray-400 hover:text-purple-400 hover:bg-purple-900/20 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    title="Ver detalles del cultivo"
                  >
                    <component :is="getIcon('notes')" />
                  </button>
                  <span class="text-xs text-gray-400">Ver</span>
                </div>

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
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useToastNotifications } from '~/composables/useToastNotifications'
import { useIrrigationStore } from '~/stores/irrigation'
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
const irrigationStore = useIrrigationStore()

// Estado del modal de eliminación
const showDeleteModal = ref(false)
const cropToDelete = ref(null)

// Computed para obtener el cultivo seleccionado
const selectedCrop = computed(() => {
  return props.crops.find(crop => crop.selected)
})

// Computed para verificar si hay un cultivo seleccionado
const hasSelectedCrop = computed(() => {
  return !!selectedCrop.value
})

// Función para obtener el estado de la bomba de manera reactiva
const getPumpStatus = (crop) => {
  // Acceder al computed reactivo para forzar la reactividad
  const irrigationState = pumpStatusReactive.value
  
  // Si el cultivo está seleccionado, usar el estado real del store de irrigación
  if (crop.selected) {
    if (irrigationState.isWatering) {
      return {
        isActive: true,
        isPaused: irrigationState.isPaused,
        status: irrigationState.isPaused ? 'Pausada' : 'Activa',
        bgClass: irrigationState.isPaused ? 'bg-yellow-900/30' : 'bg-blue-900/30',
        textClass: irrigationState.isPaused ? 'text-yellow-400' : 'text-blue-400',
        borderClass: irrigationState.isPaused ? 'border-yellow-500/30' : 'border-blue-500/30',
        dotClass: irrigationState.isPaused ? 'bg-yellow-400' : 'bg-blue-400'
      }
    } else {
      return {
        isActive: false,
        isPaused: false,
        status: 'Inactiva',
        bgClass: 'bg-gray-700',
        textClass: 'text-gray-400',
        borderClass: 'border-gray-600',
        dotClass: 'bg-gray-500'
      }
    }
  } else {
    // Si el cultivo no está seleccionado, siempre mostrar inactiva
    return {
      isActive: false,
      isPaused: false,
      status: 'Inactiva',
      bgClass: 'bg-gray-700',
      textClass: 'text-gray-400',
      borderClass: 'border-gray-600',
      dotClass: 'bg-gray-500'
    }
  }
}

// Computed para forzar la reactividad del estado de la bomba
const pumpStatusReactive = computed(() => {
  // Forzar la reactividad accediendo a los valores del store
  const isWatering = irrigationStore.isWatering
  const isPaused = irrigationStore.isPaused
  
  return {
    isWatering,
    isPaused
  }
})

// Función para manejar la selección de cultivos
const handleToggleSelection = (cropId, value) => {
  // Permitir la selección automática - el store se encargará de deseleccionar los demás
  emit('toggle-selection', { cropId, isSelected: value })
}

// Función para manejar la visualización
const handleView = (crop) => {
  // Navegar a la página de visualización
  router.push(`/cultivos/ver/${crop.id}`)
}

// Función para manejar la edición
const handleEdit = (crop) => {
  // Navegar a la página de edición
  router.push(`/cultivos/editar/${crop.id}`)
}

// Función para manejar la eliminación
const handleDelete = (crop) => {
  if (crop.selected) {
    toast.warning('No puedes eliminar un cultivo que está seleccionado')
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

// Watcher para actualizar automáticamente cuando cambie el estado de irrigación
watch(() => irrigationStore.isWatering, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    console.log('🔄 CropsTable: Estado de riego cambió:', { 
      isWatering: newValue, 
      isPaused: irrigationStore.isPaused 
    })
    // Forzar la reactividad accediendo al computed
    pumpStatusReactive.value
  }
}, { immediate: true })

watch(() => irrigationStore.isPaused, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    console.log('🔄 CropsTable: Estado de pausa cambió:', { 
      isWatering: irrigationStore.isWatering, 
      isPaused: newValue 
    })
    // Forzar la reactividad accediendo al computed
    pumpStatusReactive.value
  }
}, { immediate: true })

// Watcher adicional para forzar la reactividad del computed
watch(pumpStatusReactive, (newValue, oldValue) => {
  console.log('🔄 CropsTable: Computed de irrigación actualizado:', newValue)
}, { deep: true })
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