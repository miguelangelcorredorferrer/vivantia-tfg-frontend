<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  nameFilter: {
    type: String,
    default: ''
  },
  categoryFilter: {
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
  sessionFilter: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['filter-change', 'clear-filters'])

const localNameFilter = ref(props.nameFilter)
const localCategoryFilter = ref(props.categoryFilter)
const localUserFilter = ref(props.userFilter)
const localEmailFilter = ref(props.emailFilter)
const localSessionFilter = ref(props.sessionFilter)

// Emitir cambios cuando se modifiquen los filtros
watch(localNameFilter, (newValue) => {
  emit('filter-change', { 
    name: newValue, 
    category: localCategoryFilter.value,
    user: localUserFilter.value,
    email: localEmailFilter.value,
    session: localSessionFilter.value
  })
})

watch(localCategoryFilter, (newValue) => {
  emit('filter-change', { 
    name: localNameFilter.value, 
    category: newValue,
    user: localUserFilter.value,
    email: localEmailFilter.value,
    session: localSessionFilter.value
  })
})

watch(localUserFilter, (newValue) => {
  emit('filter-change', { 
    name: localNameFilter.value, 
    category: localCategoryFilter.value,
    user: newValue,
    email: localEmailFilter.value,
    session: localSessionFilter.value
  })
})

watch(localEmailFilter, (newValue) => {
  emit('filter-change', { 
    name: localNameFilter.value, 
    category: localCategoryFilter.value,
    user: localUserFilter.value,
    email: newValue,
    session: localSessionFilter.value
  })
})

watch(localSessionFilter, (newValue) => {
  emit('filter-change', { 
    name: localNameFilter.value, 
    category: localCategoryFilter.value,
    user: localUserFilter.value,
    email: localEmailFilter.value,
    session: newValue
  })
})

const clearFilters = () => {
  localNameFilter.value = ''
  localCategoryFilter.value = ''
  localUserFilter.value = ''
  localEmailFilter.value = ''
  localSessionFilter.value = ''
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
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      <!-- Filtro por nombre del cultivo -->
      <div>
        <label for="crop-name-filter" class="block text-sm font-medium text-gray-300 mb-2">
          Nombre del cultivo
        </label>
        <input
          id="crop-name-filter"
          v-model="localNameFilter"
          type="text"
          placeholder="Buscar por nombre..."
          class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </div>
      
      <!-- Filtro por categoría -->
      <div>
        <label for="crop-category-filter" class="block text-sm font-medium text-gray-300 mb-2">
          Categoría
        </label>
        <input
          id="crop-category-filter"
          v-model="localCategoryFilter"
          type="text"
          placeholder="Buscar por categoría..."
          class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </div>
      
      <!-- Filtro por usuario -->
      <div>
        <label for="crop-user-filter" class="block text-sm font-medium text-gray-300 mb-2">
          Usuario propietario
        </label>
        <input
          id="crop-user-filter"
          v-model="localUserFilter"
          type="text"
          placeholder="Buscar por usuario..."
          class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </div>
      
      <!-- Filtro por email -->
      <div>
        <label for="crop-email-filter" class="block text-sm font-medium text-gray-300 mb-2">
          Email del usuario
        </label>
        <input
          id="crop-email-filter"
          v-model="localEmailFilter"
          type="email"
          placeholder="Buscar por email..."
          class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </div>
      
      <!-- Filtro por sesión -->
      <div>
        <label for="crop-session-filter" class="block text-sm font-medium text-gray-300 mb-2">
          Sesión de cultivo
        </label>
        <input
          id="crop-session-filter"
          v-model="localSessionFilter"
          type="text"
          placeholder="Buscar por sesión..."
          class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </div>
    </div>
  </div>
</template> 