<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto">
    <!-- Overlay -->
    <div class="fixed inset-0 bg-black bg-opacity-75 transition-opacity" @click="cancel"></div>
    
    <!-- Modal -->
    <div class="flex min-h-screen items-center justify-center p-4">
      <div class="relative bg-gray-800 rounded-xl shadow-2xl border border-gray-700 max-w-md w-full mx-auto transform transition-all">
        <!-- Header -->
        <div class="px-6 py-4 border-b border-gray-700">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-white">{{ title }}</h3>
          </div>
        </div>
        
        <!-- Body -->
        <div class="px-6 py-4">
          <p class="text-gray-300">{{ message }}</p>
          <div v-if="warningMessage" class="mt-3 p-3 bg-yellow-900/30 border border-yellow-600 rounded-lg">
            <p class="text-yellow-300 text-sm">{{ warningMessage }}</p>
          </div>
        </div>
        
        <!-- Footer -->
        <div class="px-6 py-4 border-t border-gray-700 flex justify-end space-x-3">
          <button
            @click="cancel"
            class="px-4 py-2 bg-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Cancelar
          </button>
          <button
            @click="confirm"
            class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            :class="{ 'animate-pulse': isLoading }"
            :disabled="isLoading"
          >
            {{ isLoading ? 'Eliminando...' : confirmText }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: 'Confirmar eliminación'
  },
  message: {
    type: String,
    default: '¿Estás seguro de que deseas eliminar este elemento?'
  },
  warningMessage: {
    type: String,
    default: ''
  },
  confirmText: {
    type: String,
    default: 'Sí, eliminar'
  }
})

const emit = defineEmits(['confirm', 'cancel'])

const isLoading = ref(false)

const confirm = async () => {
  isLoading.value = true
  try {
    await emit('confirm')
  } finally {
    isLoading.value = false
  }
}

const cancel = () => {
  if (!isLoading.value) {
    emit('cancel')
  }
}
</script>

<style scoped>
/* Animaciones para el modal */
.transition-all {
  transition: all 0.3s ease-in-out;
}

/* Prevenir scroll del body cuando el modal está abierto */
.modal-open {
  overflow: hidden;
}
</style>
