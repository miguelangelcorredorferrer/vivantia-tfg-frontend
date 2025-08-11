<template>
  <div class="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700">
    <h2 class="text-xl font-bold text-white mb-6">Estado Actual</h2>
    
    <div class="space-y-4">
      <!-- Selection Status -->
      <div class="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
        <div class="flex items-center space-x-3">
          <div 
            class="w-4 h-4 rounded-full"
            :class="crop.selected ? 'bg-green-500 animate-pulse' : 'bg-gray-500'"
          ></div>
          <span class="text-gray-300">Seleccionado</span>
        </div>
        <span class="text-sm font-medium" :class="crop.selected ? 'text-green-400' : 'text-gray-500'">
          {{ crop.selected ? 'Sí' : 'No' }}
        </span>
      </div>

      <!-- Pump Status -->
      <div class="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
        <div class="flex items-center space-x-3">
          <div 
            class="w-4 h-4 rounded-full"
            :class="crop.waterPumpActive ? 'bg-blue-500 animate-pulse' : 'bg-gray-500'"
          ></div>
          <span class="text-gray-300">Bomba de Agua</span>
        </div>
        <span class="text-sm font-medium" :class="crop.waterPumpActive ? 'text-blue-400' : 'text-gray-500'">
          {{ crop.waterPumpActive ? 'Activa' : 'Inactiva' }}
        </span>
      </div>

      <!-- Category -->
      <div class="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
        <span class="text-gray-300">Categoría</span>
        <span class="text-sm font-medium text-gray-400">
          {{ crop.category }}
        </span>
      </div>

      <!-- Temporada -->
      <div class="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
        <span class="text-gray-300">Temporada</span>
        <span class="text-sm font-medium text-gray-400">
          {{ crop.session || 'No especificada' }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  crop: {
    type: Object,
    required: true
  }
})
</script> 