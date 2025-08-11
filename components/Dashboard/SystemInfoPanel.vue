<template>
  <div class="bg-gray-800/50 border border-blue-500/30 rounded-xl p-6 shadow-lg">
    <!-- Header -->
    <div class="mb-6 border-b border-gray-600/50 pb-4">
      <div class="flex items-center space-x-3">
        <div class="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
        <h3 class="text-2xl font-bold text-white">Información del Sistema</h3>
      </div>
      <p class="text-gray-400 mt-2">Detalles del cultivo activo y dispositivo IoT en funcionamiento</p>
    </div>
    
    <!-- Content -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- INFORMACIÓN DEL CULTIVO -->
      <CropInfo 
        :current-crop="currentCrop"
        :has-selected-crop="hasSelectedCrop"
      />

      <!-- INFORMACIÓN DEL DISPOSITIVO -->
      <DeviceInfo 
        :current-device="currentDevice"
        :has-active-device="hasActiveDevice"
      />
    </div>
  </div>
</template>

<script setup>
import CropInfo from './CropInfo.vue'
import DeviceInfo from './DeviceInfo.vue'

defineProps({
  currentCrop: {
    type: Object,
    default: null
  },
  hasSelectedCrop: {
    type: Boolean,
    default: false
  },
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