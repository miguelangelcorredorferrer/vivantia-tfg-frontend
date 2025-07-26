<script setup>
import { ref, watch } from 'vue'

// Props
const props = defineProps({
  nameFilter: {
    type: String,
    default: ''
  },
  userFilter: {
    type: String,
    default: ''
  },
  emailFilter: {
    type: String,
    default: ''
  },
  endDeviceFilter: {
    type: String,
    default: ''
  }
})

// Emits
const emit = defineEmits(['filter-change', 'clear-filters'])

// Estado local
const localNameFilter = ref(props.nameFilter)
const localUserFilter = ref(props.userFilter)
const localEmailFilter = ref(props.emailFilter)
const localEndDeviceFilter = ref(props.endDeviceFilter)

// Debounce para evitar demasiadas llamadas
let debounceTimer

// Función para emitir cambios de filtro
const emitFilterChange = () => {
  clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    emit('filter-change', {
      name: localNameFilter.value,
      user: localUserFilter.value,
      email: localEmailFilter.value,
      endDevice: localEndDeviceFilter.value
    })
  }, 300)
}

// Función para limpiar filtros
const clearFilters = () => {
  localNameFilter.value = ''
  localUserFilter.value = ''
  localEmailFilter.value = ''
  localEndDeviceFilter.value = ''
  emit('clear-filters')
}

// Watchers para sincronizar con props
watch(() => props.nameFilter, (newValue) => {
  localNameFilter.value = newValue
})

watch(() => props.userFilter, (newValue) => {
  localUserFilter.value = newValue
})

watch(() => props.emailFilter, (newValue) => {
  localEmailFilter.value = newValue
})

watch(() => props.endDeviceFilter, (newValue) => {
  localEndDeviceFilter.value = newValue
})

// Watchers para emitir cambios
watch(localNameFilter, emitFilterChange)
watch(localUserFilter, emitFilterChange)
watch(localEmailFilter, emitFilterChange)
watch(localEndDeviceFilter, emitFilterChange)
</script>

<template>
  <div class="bg-gray-800/50 border border-gray-700 rounded-lg p-6 mb-6">
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-lg font-semibold text-white">Filtros de Dispositivos</h3>
      <button
        @click="clearFilters"
        class="px-3 py-1 text-sm bg-gray-600 hover:bg-gray-500 text-white rounded-md transition-colors"
      >
        Limpiar Filtros
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <!-- Filtro por nombre del dispositivo -->
      <div>
        <label class="block text-sm font-medium text-gray-300 mb-2">
          Nombre del Dispositivo
        </label>
        <input
          v-model="localNameFilter"
          type="text"
          placeholder="Buscar por nombre..."
          class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <!-- Filtro por nombre de usuario -->
      <div>
        <label class="block text-sm font-medium text-gray-300 mb-2">
          Nombre de Usuario
        </label>
        <input
          v-model="localUserFilter"
          type="text"
          placeholder="Buscar por usuario..."
          class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <!-- Filtro por email -->
      <div>
        <label class="block text-sm font-medium text-gray-300 mb-2">
          Email del Usuario
        </label>
        <input
          v-model="localEmailFilter"
          type="text"
          placeholder="Buscar por email..."
          class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <!-- Filtro por EndDevice ID -->
      <div>
        <label class="block text-sm font-medium text-gray-300 mb-2">
          EndDevice ID
        </label>
        <input
          v-model="localEndDeviceFilter"
          type="text"
          placeholder="Buscar por EndDevice ID..."
          class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    </div>
  </div>
</template> 