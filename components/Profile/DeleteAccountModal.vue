<template>
  <div v-if="show" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
    <div class="bg-gray-800 rounded-lg p-6 w-full max-w-md">
      <div class="text-center mb-6">
        <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"/>
          </svg>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">¿Eliminar cuenta?</h3>
        <p class="text-gray-400 text-sm">Esta acción es irreversible. Todos tus datos, dispositivos y configuraciones se perderán permanentemente.</p>
      </div>

      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-white mb-2">
            Escribe "ELIMINAR" para confirmar
          </label>
          <input
            v-model="deleteForm.confirmText"
            type="text"
            class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="ELIMINAR"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-white mb-2">Confirma tu contraseña</label>
          <input
            v-model="deleteForm.password"
            type="password"
            class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="Tu contraseña actual"
          />
        </div>
      </div>

      <div class="flex space-x-3 mt-6">
        <button
          @click="deleteAccount"
          :disabled="isLoading"
          class="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white rounded-lg transition-colors"
        >
          {{ isLoading ? 'Eliminando...' : 'Eliminar definitivamente' }}
        </button>
        <button
          @click="cancelDelete"
          class="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
        >
          Cancelar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  isLoading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['delete-account', 'cancel'])

const deleteForm = reactive({
  confirmText: '',
  password: ''
})

const deleteAccount = () => {
  if (deleteForm.confirmText !== 'ELIMINAR') {
    return
  }

  if (!deleteForm.password) {
    return
  }

  emit('delete-account', {
    confirmText: deleteForm.confirmText,
    password: deleteForm.password
  })
}

const cancelDelete = () => {
  deleteForm.confirmText = ''
  deleteForm.password = ''
  emit('cancel')
}
</script> 