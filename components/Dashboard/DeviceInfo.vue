<template>
  <div class="space-y-4">
    <div class="flex items-center space-x-3 mb-4">
      <Icon name="heroicons:cpu-chip" class="w-6 h-6 text-blue-400" />
      <h4 class="text-lg font-bold text-white">Dispositivo Registrado</h4>
    </div>
    
    <div v-if="hasActiveDevice" class="space-y-3">
      <div class="flex justify-between items-center p-4 bg-gray-900/60 border border-gray-600/30 rounded-lg hover:bg-gray-900/80 transition-colors">
        <span class="text-gray-300 font-medium">Nombre:</span>
        <span class="text-white font-bold text-lg">{{ currentDevice?.deviceName }}</span>
      </div>
      
      <div class="flex justify-between items-center p-4 bg-gray-900/60 border border-gray-600/30 rounded-lg hover:bg-gray-900/80 transition-colors">
        <span class="text-gray-300 font-medium">ID del Dispositivo:</span>
        <span class="text-gray-300 font-mono font-bold text-lg">{{ currentDevice?.enddeviceId }}</span>
      </div>
      
      <div class="flex justify-between items-center p-4 bg-gray-900/60 border border-gray-600/30 rounded-lg hover:bg-gray-900/80 transition-colors">
        <div class="flex items-center space-x-2">
          <Icon name="heroicons:wifi" class="w-5 h-5 text-green-400" />
          <span class="text-gray-300 font-medium">Estado:</span>
        </div>
        <div class="flex items-center space-x-2">
          <div class="w-3 h-3 rounded-full animate-pulse bg-green-400"></div>
          <span class="font-bold text-lg text-green-400">CONECTADO</span>
        </div>
      </div>
      
      <div class="flex justify-between items-center p-4 bg-gray-900/60 border border-gray-600/30 rounded-lg hover:bg-gray-900/80 transition-colors">
        <span class="text-gray-300 font-medium">Frecuencia de Datos:</span>
        <span class="text-white font-bold text-lg">Cada 3 segundos</span>
      </div>
      
      <div class="flex justify-between items-center p-4 bg-gray-900/60 border border-gray-600/30 rounded-lg hover:bg-gray-900/80 transition-colors">
        <span class="text-gray-300 font-medium">Última Comunicación:</span>
        <span class="text-green-400 font-bold text-lg">Ahora mismo</span>
      </div>
    </div>
    
    <!-- Estado cuando no hay dispositivos activos -->
    <div v-else class="space-y-3">
      <div class="flex justify-between items-center p-4 bg-gray-900/60 border border-gray-600/30 rounded-lg">
        <span class="text-gray-300 font-medium">Nombre:</span>
        <span class="text-red-400 font-bold text-lg">No se ha registrado</span>
      </div>
      
      <div class="flex justify-between items-center p-4 bg-gray-900/60 border border-gray-600/30 rounded-lg">
        <span class="text-gray-300 font-medium">ID del Dispositivo:</span>
        <span class="text-red-400 font-bold text-lg">No se ha registrado</span>
      </div>
      
      <div class="flex justify-between items-center p-4 bg-gray-900/60 border border-gray-600/30 rounded-lg">
        <div class="flex items-center space-x-2">
          <Icon name="heroicons:wifi" class="w-5 h-5 text-red-400" />
          <span class="text-gray-300 font-medium">Estado:</span>
        </div>
        <div class="flex items-center space-x-2">
          <div class="w-3 h-3 rounded-full bg-red-400"></div>
          <span class="font-bold text-lg text-red-400">NO REGISTRADO</span>
        </div>
      </div>
      
      <div class="flex justify-between items-center p-4 bg-gray-900/60 border border-gray-600/30 rounded-lg">
        <span class="text-gray-300 font-medium">Frecuencia de Datos:</span>
        <span class="text-red-400 font-bold text-lg">No disponible</span>
      </div>
      
      <div class="flex justify-between items-center p-4 bg-gray-900/60 border border-gray-600/30 rounded-lg">
        <span class="text-gray-300 font-medium">Última Comunicación:</span>
        <span class="text-red-400 font-bold text-lg">No disponible</span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  currentDevice: {
    type: Object,
    default: null
  },
  hasActiveDevice: {
    type: Boolean,
    default: false
  }
})
</script> 