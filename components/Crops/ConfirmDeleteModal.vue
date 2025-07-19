<template>
  <div 
    v-if="isVisible" 
    class="fixed inset-0 z-50 overflow-y-auto"
    @click.self="closeModal"
  >
    <!-- Backdrop -->
    <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity"></div>
    
    <!-- Modal -->
    <div class="flex min-h-full items-center justify-center p-4">
      <div 
        class="relative transform overflow-hidden rounded-lg bg-gray-800 border border-gray-600 shadow-xl transition-all w-full max-w-md"
        @click.stop
      >
        <!-- Header -->
        <div class="bg-red-900/20 border-b border-red-500/30 px-6 py-4">
          <div class="flex items-center">
            <div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100">
              <component :is="getIcon('danger')" />
            </div>
          </div>
        </div>

        <!-- Content -->
        <div class="px-6 py-4">
          <h3 class="text-lg font-medium text-white text-center mb-2">
            Confirmar Eliminación
          </h3>
          <p class="text-sm text-gray-300 text-center mb-4">
            ¿Estás seguro de que quieres eliminar el cultivo 
            <span class="font-semibold text-white">"{{ cropName }}"</span>?
          </p>
          <div class="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-3 mb-4">
            <div class="flex items-start">
              <component :is="getIcon('warning')" />
              <p class="text-xs text-yellow-300">
                Esta acción no se puede deshacer. Se eliminará permanentemente el cultivo y toda su configuración.
              </p>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="bg-gray-700/30 px-6 py-4 flex flex-col sm:flex-row-reverse gap-3">
          <button
            @click="confirmDelete"
            class="w-full sm:w-auto inline-flex justify-center items-center px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-800 rounded-lg transition-colors"
          >
            <component :is="getIcon('delete')" class="w-4 h-4 mr-2" />
            Sí, eliminar
          </button>
          
          <button
            @click="closeModal"
            class="w-full sm:w-auto inline-flex justify-center items-center px-4 py-2 text-sm font-medium text-gray-300 hover:text-white bg-gray-600 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-800 rounded-lg transition-colors"
          >
            <component :is="getIcon('cancel')" />
            Cancelar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getIcon } from '~/assets/icons'

const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false
  },
  cropName: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['confirm', 'cancel'])

const confirmDelete = () => {
  // Emitir confirmación inmediatamente
  emit('confirm')
}

const closeModal = () => {
  emit('cancel')
}
</script>

<style scoped>
/* Animaciones del modal */
.modal-enter-active, .modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from, .modal-leave-to {
  opacity: 0;
}

.modal-enter-active .transform,
.modal-leave-active .transform {
  transition: transform 0.3s ease;
}

.modal-enter-from .transform,
.modal-leave-to .transform {
  transform: scale(0.95) translateY(-10px);
}
</style> 