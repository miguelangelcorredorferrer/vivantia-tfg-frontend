<script setup>
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
    default: '¿Estás seguro de que quieres eliminar este elemento?'
  },
  itemName: {
    type: String,
    default: ''
  },
  itemType: {
    type: String,
    default: 'elemento'
  }
})

const emit = defineEmits(['confirm', 'cancel'])

const handleConfirm = () => {
  emit('confirm')
}

const handleCancel = () => {
  emit('cancel')
}
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto">
    <!-- Overlay -->
    <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity" @click="handleCancel"></div>
    
    <!-- Modal -->
    <div class="flex min-h-full items-center justify-center p-4">
      <div class="relative bg-gray-800 border border-gray-600 rounded-lg shadow-xl max-w-md w-full">
        <!-- Header -->
        <div class="flex items-center justify-between p-6 border-b border-gray-600">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"/>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-white">{{ title }}</h3>
          </div>
          <button
            @click="handleCancel"
            class="text-gray-400 hover:text-white transition-colors"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
        
        <!-- Content -->
        <div class="p-6">
          <p class="text-gray-300 mb-4">
            {{ message }}
          </p>
          <div v-if="itemName" class="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-4">
            <p class="text-red-400 font-medium">
              <span class="font-semibold">{{ itemName }}</span>
            </p>
            <p class="text-red-300 text-sm mt-1">
              Esta acción no se puede deshacer.
            </p>
          </div>
        </div>
        
        <!-- Actions -->
        <div class="flex items-center justify-end space-x-3 p-6 border-t border-gray-600">
          <button
            @click="handleCancel"
            class="px-4 py-2 text-sm font-medium text-gray-300 bg-gray-600 hover:bg-gray-500 rounded-md transition-colors"
          >
            Cancelar
          </button>
          <button
            @click="handleConfirm"
            class="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors"
          >
            Eliminar {{ itemType }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template> 