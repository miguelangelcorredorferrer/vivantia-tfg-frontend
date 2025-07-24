<template>
  <div class="bg-gray-800/50 border border-gray-600 rounded-lg p-4 mb-6">
    <h3 class="text-lg font-medium text-white mb-4">Filtrar Dispositivos</h3>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- Filtro por Device Name -->
      <div class="relative">
        <label class="block text-sm font-medium text-gray-300 mb-2">
          Nombre del Dispositivo
        </label>
        <div class="relative">
          <input
            v-model="filters.deviceName"
            @input="handleDeviceNameInput"
            @focus="showDeviceNameSuggestions = true"
            @blur="handleBlur('deviceName')"
            type="text"
            placeholder="Buscar por nombre..."
            class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          
          <!-- Sugerencias para Device Name -->
          <div 
            v-if="showDeviceNameSuggestions && deviceNameSuggestions.length > 0"
            class="absolute z-10 w-full mt-1 bg-gray-700 border border-gray-600 rounded-md shadow-lg max-h-40 overflow-y-auto"
          >
            <button
              v-for="suggestion in deviceNameSuggestions"
              :key="suggestion"
              @mousedown="selectSuggestion('deviceName', suggestion)"
              class="w-full px-3 py-2 text-left text-white hover:bg-gray-600 focus:bg-gray-600 focus:outline-none"
            >
              {{ suggestion }}
            </button>
          </div>
        </div>
      </div>

      <!-- Filtro por EndDevice ID -->
      <div class="relative">
        <label class="block text-sm font-medium text-gray-300 mb-2">
          EndDevice ID
        </label>
        <div class="relative">
          <input
            v-model="filters.enddeviceId"
            @input="handleEndDeviceIdInput"
            @focus="showEndDeviceIdSuggestions = true"
            @blur="handleBlur('enddeviceId')"
            type="text"
            placeholder="Buscar por EndDevice ID..."
            class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          
          <!-- Sugerencias para EndDevice ID -->
          <div 
            v-if="showEndDeviceIdSuggestions && endDeviceIdSuggestions.length > 0"
            class="absolute z-10 w-full mt-1 bg-gray-700 border border-gray-600 rounded-md shadow-lg max-h-40 overflow-y-auto"
          >
            <button
              v-for="suggestion in endDeviceIdSuggestions"
              :key="suggestion"
              @mousedown="selectSuggestion('enddeviceId', suggestion)"
              class="w-full px-3 py-2 text-left text-white hover:bg-gray-600 focus:bg-gray-600 focus:outline-none"
            >
              {{ suggestion }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Botón limpiar filtros -->
    <div class="mt-4 flex justify-end">
      <button
        @click="clearFilters"
        :disabled="!hasActiveFilters"
        class="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white disabled:text-gray-500 disabled:cursor-not-allowed transition-colors"
      >
        Limpiar filtros
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  deviceStore: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['filter-change'])

// Estado de filtros
const filters = ref({
  deviceName: '',
  enddeviceId: ''
})

// Control de sugerencias
const showDeviceNameSuggestions = ref(false)
const showEndDeviceIdSuggestions = ref(false)
const deviceNameSuggestions = ref([])
const endDeviceIdSuggestions = ref([])

// Computados
const hasActiveFilters = computed(() => {
  return filters.value.deviceName.trim() !== '' || filters.value.enddeviceId.trim() !== ''
})

// Métodos para manejar input y sugerencias
const handleDeviceNameInput = () => {
  const suggestions = props.deviceStore.filterDevicesSuggestions(filters.value.deviceName, 'deviceName')
  deviceNameSuggestions.value = suggestions
  showDeviceNameSuggestions.value = suggestions.length > 0
}

const handleEndDeviceIdInput = () => {
  const suggestions = props.deviceStore.filterDevicesSuggestions(filters.value.enddeviceId, 'enddeviceId')
  endDeviceIdSuggestions.value = suggestions
  showEndDeviceIdSuggestions.value = suggestions.length > 0
}

const selectSuggestion = (field, suggestion) => {
  filters.value[field] = suggestion
  
  if (field === 'deviceName') {
    showDeviceNameSuggestions.value = false
    deviceNameSuggestions.value = []
  } else {
    showEndDeviceIdSuggestions.value = false
    endDeviceIdSuggestions.value = []
  }
}

const handleBlur = (field) => {
  // Delay para permitir click en sugerencias
  setTimeout(() => {
    if (field === 'deviceName') {
      showDeviceNameSuggestions.value = false
    } else {
      showEndDeviceIdSuggestions.value = false
    }
  }, 200)
}

const clearFilters = () => {
  filters.value = {
    deviceName: '',
    enddeviceId: ''
  }
}

// Watcher para emitir cambios de filtro
watch(filters, (newFilters) => {
  emit('filter-change', { ...newFilters })
}, { deep: true })
</script> 