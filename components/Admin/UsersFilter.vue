<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  nameFilter: {
    type: String,
    default: ''
  },
  emailFilter: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['filter-change', 'clear-filters'])

const localNameFilter = ref(props.nameFilter)
const localEmailFilter = ref(props.emailFilter)

// Emitir cambios cuando se modifiquen los filtros
watch(localNameFilter, (newValue) => {
  emit('filter-change', { name: newValue, email: localEmailFilter.value })
})

watch(localEmailFilter, (newValue) => {
  emit('filter-change', { name: localNameFilter.value, email: newValue })
})

const clearFilters = () => {
  localNameFilter.value = ''
  localEmailFilter.value = ''
  emit('clear-filters')
}
</script>

<template>
  <div class="bg-gray-800/50 border border-gray-600/30 rounded-lg p-6 mb-6">
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-lg font-semibold text-white">Filtros de Búsqueda</h3>
      <button
        @click="clearFilters"
        class="px-3 py-1 text-sm bg-gray-600 hover:bg-gray-500 text-white rounded-md transition-colors"
      >
        Limpiar Filtros
      </button>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- Filtro por nombre -->
      <div>
        <label for="name-filter" class="block text-sm font-medium text-gray-300 mb-2">
          Buscar por nombre
        </label>
        <input
          id="name-filter"
          v-model="localNameFilter"
          type="text"
          placeholder="Escribe el nombre del usuario..."
          class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      
      <!-- Filtro por email -->
      <div>
        <label for="email-filter" class="block text-sm font-medium text-gray-300 mb-2">
          Buscar por email
        </label>
        <input
          id="email-filter"
          v-model="localEmailFilter"
          type="email"
          placeholder="Escribe el email del usuario..."
          class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    </div>
  </div>
</template> 