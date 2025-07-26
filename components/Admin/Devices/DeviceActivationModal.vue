<template>
  <div v-if="isVisible" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4">
      <!-- Header -->
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-semibold text-gray-900">
          Confirmar Cambio de Dispositivo Activo
        </h3>
        <button
          @click="$emit('close')"
          class="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <!-- Content -->
      <div class="mb-6">
        <div class="flex items-center mb-4">
          <div class="flex-shrink-0">
            <svg class="w-12 h-12 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
            </svg>
          </div>
          <div class="ml-4">
            <h4 class="text-lg font-medium text-gray-900">Dispositivo Activo Detectado</h4>
            <p class="mt-1 text-sm text-gray-600">
              El usuario <strong>{{ targetUser?.name }}</strong> ({{ targetUser?.email }}) ya tiene un dispositivo activo.
            </p>
          </div>
        </div>

        <!-- Current Active Device Info -->
        <div class="bg-gray-50 rounded-lg p-4 mb-4" v-if="activeDevices && activeDevices.length > 0">
          <h5 class="font-medium text-gray-900 mb-2">Dispositivo(s) Actualmente Activo(s):</h5>
          <div v-for="device in activeDevices" :key="device.id" class="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
            <div>
              <p class="font-medium text-gray-900">{{ device.device_name }}</p>
              <p class="text-sm text-gray-600">ID: {{ device.enddevice_id }}</p>
            </div>
            <span class="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
              Activo
            </span>
          </div>
        </div>

        <!-- Target Device Info -->
        <div class="bg-blue-50 rounded-lg p-4 mb-4" v-if="targetDevice">
          <h5 class="font-medium text-gray-900 mb-2">Dispositivo a Activar:</h5>
          <div class="flex justify-between items-center">
            <div>
              <p class="font-medium text-gray-900">{{ targetDevice.device_name }}</p>
              <p class="text-sm text-gray-600">ID: {{ targetDevice.enddevice_id }}</p>
            </div>
            <span class="px-2 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-full">
              Inactivo
            </span>
          </div>
        </div>

        <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
          <p class="text-sm text-yellow-800">
            <strong>⚠️ Advertencia:</strong> Al confirmar esta acción, el dispositivo actualmente activo será desactivado automáticamente y solo el nuevo dispositivo estará activo.
          </p>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 space-y-2 space-y-reverse sm:space-y-0">
        <button
          @click="$emit('close')"
          class="w-full sm:w-auto px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          Cancelar
        </button>
        <button
          @click="$emit('confirm')"
          class="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-yellow-600 border border-transparent rounded-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors"
        >
          Sí, Cambiar Dispositivo Activo
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  isVisible: {
    type: Boolean,
    default: false
  },
  activeDevices: {
    type: Array,
    default: () => []
  },
  targetDevice: {
    type: Object,
    default: null
  },
  targetUser: {
    type: Object,
    default: null
  }
})

defineEmits(['close', 'confirm'])
</script> 