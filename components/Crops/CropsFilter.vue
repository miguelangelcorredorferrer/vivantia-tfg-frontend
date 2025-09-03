<template>
  <BaseCard title="Filtros de Cultivos">
    <div class="space-y-4">
      <!-- Búsqueda por nombre -->
      <div>
        <label for="name-filter" class="block text-sm font-medium text-white mb-2">
          Buscar por nombre
        </label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <component :is="getIcon('search')" class="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="name-filter"
            v-model="localFilters.name"
            type="text"
            class="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
            placeholder="Ej: Tomate, Lechuga..."
            @input="debouncedUpdate"
          />
        </div>
      </div>

      <!-- Primera fila de filtros -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Categoría -->
        <div>
          <label for="category-filter" class="block text-sm font-medium text-white mb-2">
            Categoría
          </label>
          <select
            id="category-filter"
            v-model="localFilters.category"
            class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
            @change="updateFilters"
          >
            <option v-for="category in categories" :key="category" :value="category">
              {{ category }}
            </option>
          </select>
        </div>

        <!-- Temporada -->
        <div>
          <label for="session-filter" class="block text-sm font-medium text-white mb-2">
            Temporada
          </label>
          <select
            id="session-filter"
            v-model="localFilters.session"
            class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
            @change="updateFilters"
          >
            <option value="">Todas</option>
            <option value="Primavera">Primavera</option>
            <option value="Verano">Verano</option>
            <option value="Otoño">Otoño</option>
            <option value="Invierno">Invierno</option>
            <option value="Primavera/Verano">Primavera/Verano</option>
            <option value="Verano/Otoño">Verano/Otoño</option>
            <option value="Otoño/Invierno">Otoño/Invierno</option>
            <option value="Invierno/Primavera">Invierno/Primavera</option>
            <option value="Todo el año">Todo el año</option>
          </select>
        </div>
      </div>

      <!-- Segunda fila - Filtros de humedad del suelo -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Humedad del Suelo Mínima -->
        <div>
          <label for="min-soil-humidity-filter" class="block text-sm font-medium text-blue-300 mb-2">
            Humedad Suelo Mín. (%)
          </label>
          <input
            id="min-soil-humidity-filter"
            v-model="localFilters.minSoilHumidity"
            type="number"
            min="0"
            max="100"
            class="w-full px-4 py-3 bg-gray-700 border border-blue-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            placeholder="Ej: 40"
            @input="debouncedUpdate"
          />
        </div>

        <!-- Humedad del Suelo Máxima -->
        <div>
          <label for="max-soil-humidity-filter" class="block text-sm font-medium text-blue-300 mb-2">
            Humedad Suelo Máx. (%)
          </label>
          <input
            id="max-soil-humidity-filter"
            v-model="localFilters.maxSoilHumidity"
            type="number"
            min="0"
            max="100"
            class="w-full px-4 py-3 bg-gray-700 border border-blue-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            placeholder="Ej: 80"
            @input="debouncedUpdate"
          />
        </div>
      </div>

      <!-- Tercera fila - Filtros de humedad del aire -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Humedad del Aire Mínima -->
        <div>
          <label for="min-air-humidity-filter" class="block text-sm font-medium text-cyan-300 mb-2">
            Humedad Aire Mín. (%)
          </label>
          <input
            id="min-air-humidity-filter"
            v-model="localFilters.minAirHumidity"
            type="number"
            min="0"
            max="100"
            class="w-full px-4 py-3 bg-gray-700 border border-cyan-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-colors"
            placeholder="Ej: 50"
            @input="debouncedUpdate"
          />
        </div>

        <!-- Humedad del Aire Máxima -->
        <div>
          <label for="max-air-humidity-filter" class="block text-sm font-medium text-cyan-300 mb-2">
            Humedad Aire Máx. (%)
          </label>
          <input
            id="max-air-humidity-filter"
            v-model="localFilters.maxAirHumidity"
            type="number"
            min="0"
            max="100"
            class="w-full px-4 py-3 bg-gray-700 border border-cyan-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-colors"
            placeholder="Ej: 85"
            @input="debouncedUpdate"
          />
        </div>
      </div>

      <!-- Cuarta fila - Temperatura -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Temperatura Máxima -->
        <div>
          <label for="max-temp-filter" class="block text-sm font-medium text-red-300 mb-2">
            Temp. Máx. (°C)
          </label>
          <input
            id="max-temp-filter"
            v-model="localFilters.maxTemperature"
            type="number"
            min="0"
            max="50"
            class="w-full px-4 py-3 bg-gray-700 border border-red-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
            placeholder="Ej: 30"
            @input="debouncedUpdate"
          />
        </div>
        
        <!-- Espacio vacío para mantener simetría -->
        <div></div>
      </div>

      <!-- Botones de acción -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0 pt-4 border-t border-gray-600">
        <div class="flex items-center space-x-4">
          <span class="text-sm text-gray-300">
            {{ resultsCount }} cultivo{{ resultsCount !== 1 ? 's' : '' }} encontrado{{ resultsCount !== 1 ? 's' : '' }}
          </span>
          <div v-if="hasActiveFilters" class="flex items-center space-x-2">
            <component :is="getIcon('filter')" />
            <span class="text-xs text-green-500 font-medium">Filtros activos</span>
          </div>
        </div>
        
        <button
          @click="clearFilters"
          class="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white border border-gray-600 hover:border-gray-500 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
          :disabled="!hasActiveFilters"
          :class="{ 'opacity-50 cursor-not-allowed': !hasActiveFilters }"
        >
          <div class="flex items-center space-x-2">
            <component :is="getIcon('clearFilters')" />
            <span>Limpiar filtros</span>
          </div>
        </button>
      </div>
    </div>
  </BaseCard>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue'
import { debounce } from 'lodash-es'
import { getIcon } from '~/assets/icons'
import BaseCard from '../Cards/BaseCard.vue'

const props = defineProps({
  resultsCount: {
    type: Number,
    default: 0
  },
  categories: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['filters-changed'])

// Categorías disponibles (combinando las del store con "Todas")
const categories = computed(() => {
  return ['Todas', ...props.categories]
})

// Filtros locales
const localFilters = reactive({
  name: '',
  category: 'Todas',
  session: '',
  minSoilHumidity: '',
  maxSoilHumidity: '',
  minAirHumidity: '',
  maxAirHumidity: '',
  maxTemperature: ''
})

// Computed para verificar si hay filtros activos
const hasActiveFilters = computed(() => {
  return localFilters.name !== '' ||
         localFilters.category !== 'Todas' ||
         localFilters.session !== '' ||
         localFilters.minSoilHumidity !== '' ||
         localFilters.maxSoilHumidity !== '' ||
         localFilters.minAirHumidity !== '' ||
         localFilters.maxAirHumidity !== '' ||
         localFilters.maxTemperature !== ''
})

// Función para emitir cambios de filtros
const updateFilters = () => {
  emit('filters-changed', { ...localFilters })
}

// Función debounced para inputs de texto y números
const debouncedUpdate = debounce(updateFilters, 300)

// Función para limpiar todos los filtros
const clearFilters = () => {
  localFilters.name = ''
  localFilters.category = 'Todas'
  localFilters.session = ''
  localFilters.minSoilHumidity = ''
  localFilters.maxSoilHumidity = ''
  localFilters.minAirHumidity = ''
  localFilters.maxAirHumidity = ''
  localFilters.maxTemperature = ''
  updateFilters()
}

// Watch para cambios inmediatos en select
watch(() => localFilters.category, updateFilters)
watch(() => localFilters.session, updateFilters)
</script>

<style scoped>
/* Estilos personalizados si son necesarios */
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}
</style> 