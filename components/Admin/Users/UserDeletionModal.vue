<template>
  <div v-if="isVisible" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4">
      <!-- Header -->
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-semibold text-gray-900">
          Confirmar Eliminación de Usuario
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
            <svg class="w-12 h-12 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
            </svg>
          </div>
          <div class="ml-4">
            <h4 class="text-lg font-medium text-gray-900">Datos Relacionados Detectados</h4>
            <p class="mt-1 text-sm text-gray-600">
              El usuario <strong>{{ user?.name }}</strong> ({{ user?.email }}) tiene datos relacionados que también serán eliminados.
            </p>
          </div>
        </div>

        <!-- User Info -->
        <div class="bg-gray-50 rounded-lg p-4 mb-4" v-if="user">
          <h5 class="font-medium text-gray-900 mb-2">Usuario a Eliminar:</h5>
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span class="text-white text-sm font-semibold">
                {{ user.name?.charAt(0).toUpperCase() || '?' }}
              </span>
            </div>
            <div>
              <p class="font-medium text-gray-900">{{ user.name }}</p>
              <p class="text-sm text-gray-600">{{ user.email }}</p>
            </div>
          </div>
        </div>

        <!-- Statistics -->
        <div class="bg-red-50 border border-red-200 rounded-lg p-4 mb-4" v-if="stats">
          <h5 class="font-medium text-red-900 mb-2">Datos que se eliminarán:</h5>
          <div class="grid grid-cols-2 gap-2 text-sm">
            <div class="flex justify-between">
              <span class="text-gray-600">Cultivos:</span>
              <span class="font-medium text-red-700">{{ stats.crops || 0 }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Dispositivos:</span>
              <span class="font-medium text-red-700">{{ stats.devices || 0 }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Alertas:</span>
              <span class="font-medium text-red-700">{{ stats.alerts || 0 }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Config. Riego:</span>
              <span class="font-medium text-red-700">{{ stats.irrigationConfigs || 0 }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Activaciones:</span>
              <span class="font-medium text-red-700">{{ stats.pumpActivations || 0 }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Lecturas:</span>
              <span class="font-medium text-red-700">{{ stats.sensorReadings || 0 }}</span>
            </div>
          </div>
          <div class="mt-2 pt-2 border-t border-red-200">
            <div class="flex justify-between font-medium text-red-900">
              <span>Total:</span>
              <span>{{ totalRelatedData || 0 }} elementos</span>
            </div>
          </div>
        </div>

        <div class="bg-red-50 border border-red-200 rounded-lg p-3">
          <p class="text-sm text-red-800">
            <strong>⚠️ Advertencia:</strong> Esta acción eliminará permanentemente al usuario y todos sus datos relacionados. Esta acción no se puede deshacer.
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
          class="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
        >
          Sí, Eliminar Usuario y Datos
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
  user: {
    type: Object,
    default: null
  },
  stats: {
    type: Object,
    default: () => ({})
  },
  totalRelatedData: {
    type: Number,
    default: 0
  }
})

defineEmits(['close', 'confirm'])
</script> 