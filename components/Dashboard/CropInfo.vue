<template>
  <div class="space-y-4">
    <div class="flex items-center space-x-3 mb-4">
      <component :is="plantIcon" class="w-6 h-6 text-green-400" />
      <h4 class="text-lg font-bold text-white">Cultivo Seleccionado</h4>
    </div>
    
    <div v-if="hasSelectedCrop" class="space-y-3">
      <div class="flex justify-between items-center p-4 bg-gray-900/60 border border-gray-600/30 rounded-lg hover:bg-gray-900/80 transition-colors">
        <span class="text-gray-300 font-medium">Nombre:</span>
        <span class="text-white font-bold text-lg">{{ currentCrop.name }}</span>
      </div>
      
      <div class="flex justify-between items-center p-4 bg-gray-900/60 border border-gray-600/30 rounded-lg hover:bg-gray-900/80 transition-colors">
        <span class="text-gray-300 font-medium">Categoría:</span>
        <span class="text-green-400 font-bold text-lg">{{ currentCrop.category }}</span>
      </div>
      
      <div class="flex justify-between items-center p-4 bg-gray-900/60 border border-gray-600/30 rounded-lg hover:bg-gray-900/80 transition-colors">
        <span class="text-gray-300 font-medium">Humedad Mínima:</span>
        <span class="text-blue-400 font-bold text-lg">{{ currentCrop.humidity_min }}%</span>
      </div>
      
      <div class="flex justify-between items-center p-4 bg-gray-900/60 border border-gray-600/30 rounded-lg hover:bg-gray-900/80 transition-colors">
        <span class="text-gray-300 font-medium">Humedad Máxima:</span>
        <span class="text-blue-400 font-bold text-lg">{{ currentCrop.humidity_max }}%</span>
      </div>
      
      <div class="flex justify-between items-center p-4 bg-gray-900/60 border border-gray-600/30 rounded-lg hover:bg-gray-900/80 transition-colors">
        <span class="text-gray-300 font-medium">Temperatura Máxima:</span>
        <span class="text-red-400 font-bold text-lg">{{ currentCrop.temperature_max }}°C</span>
      </div>
      
      <div class="flex justify-between items-center p-4 bg-gray-900/60 border border-gray-600/30 rounded-lg hover:bg-gray-900/80 transition-colors">
        <div class="flex items-center space-x-2">
          <Icon name="heroicons:beaker" class="w-5 h-5 text-blue-400" />
          <span class="text-gray-300 font-medium">Estado de la Bomba:</span>
        </div>
        <div class="flex items-center space-x-2">
          <div class="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
          <span class="text-blue-400 font-bold text-lg">ACTIVA</span>
        </div>
      </div>
      
      <div class="flex justify-between items-center p-4 bg-gray-900/60 border border-gray-600/30 rounded-lg hover:bg-gray-900/80 transition-colors">
        <span class="text-gray-300 font-medium">Días de Crecimiento:</span>
        <span class="text-white font-bold text-lg">{{ currentCrop.growth_days }} días</span>
      </div>
      
      <div class="flex justify-between items-center p-4 bg-gray-900/60 border border-gray-600/30 rounded-lg hover:bg-gray-900/80 transition-colors">
        <span class="text-gray-300 font-medium">Temporada:</span>
        <span class="text-purple-400 font-bold text-lg">{{ currentCrop.session }}</span>
      </div>
    </div>
    
    <!-- Estado cuando no hay cultivo seleccionado -->
    <div v-else class="space-y-3">
      <div class="flex justify-between items-center p-4 bg-gray-900/60 border border-gray-600/30 rounded-lg">
        <span class="text-gray-300 font-medium">Nombre:</span>
        <span class="text-red-400 font-bold text-lg">No se ha seleccionado</span>
      </div>
      
      <div class="flex justify-between items-center p-4 bg-gray-900/60 border border-gray-600/30 rounded-lg">
        <span class="text-gray-300 font-medium">Categoría:</span>
        <span class="text-red-400 font-bold text-lg">No se ha seleccionado</span>
      </div>
      
      <div class="flex justify-between items-center p-4 bg-gray-900/60 border border-gray-600/30 rounded-lg">
        <span class="text-gray-300 font-medium">Humedad Mínima:</span>
        <span class="text-red-400 font-bold text-lg">No disponible</span>
      </div>
      
      <div class="flex justify-between items-center p-4 bg-gray-900/60 border border-gray-600/30 rounded-lg">
        <span class="text-gray-300 font-medium">Humedad Máxima:</span>
        <span class="text-red-400 font-bold text-lg">No disponible</span>
      </div>
      
      <div class="flex justify-between items-center p-4 bg-gray-900/60 border border-gray-600/30 rounded-lg">
        <span class="text-gray-300 font-medium">Temperatura Máxima:</span>
        <span class="text-red-400 font-bold text-lg">No disponible</span>
      </div>
      
      <div class="flex justify-between items-center p-4 bg-gray-900/60 border border-gray-600/30 rounded-lg">
        <div class="flex items-center space-x-2">
          <Icon name="heroicons:beaker" class="w-5 h-5 text-red-400" />
          <span class="text-gray-300 font-medium">Estado de la Bomba:</span>
        </div>
        <div class="flex items-center space-x-2">
          <div class="w-3 h-3 bg-red-400 rounded-full"></div>
          <span class="text-red-400 font-bold text-lg">NO SELECCIONADO</span>
        </div>
      </div>
      
      <div class="flex justify-between items-center p-4 bg-gray-900/60 border border-gray-600/30 rounded-lg">
        <span class="text-gray-300 font-medium">Días de Crecimiento:</span>
        <span class="text-red-400 font-bold text-lg">No disponible</span>
      </div>
      
      <div class="flex justify-between items-center p-4 bg-gray-900/60 border border-gray-600/30 rounded-lg">
        <span class="text-gray-300 font-medium">Temporada:</span>
        <span class="text-red-400 font-bold text-lg">No disponible</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getIcon } from '~/assets/icons'

defineProps({
  currentCrop: {
    type: Object,
    default: null
  },
  hasSelectedCrop: {
    type: Boolean,
    default: false
  }
})

const plantIcon = getIcon('plant')
</script> 