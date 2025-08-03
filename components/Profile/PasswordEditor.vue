<template>
  <div class="bg-gray-800 rounded-lg p-6 border border-gray-700">
    <h3 class="text-lg font-semibold text-white mb-4">Contraseña</h3>
    
    <div v-if="!isEditing" class="flex items-center justify-between">
      <div>
        <p class="text-white font-medium">••••••••</p>
        <p class="text-gray-400 text-sm">Última actualización hace tiempo</p>
      </div>
      <button
        @click="startEditing"
        class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
      >
        Cambiar contraseña
      </button>
    </div>

    <div v-else class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-white mb-2">Contraseña actual</label>
        <input
          v-model="passwordForm.currentPassword"
          type="password"
          class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Tu contraseña actual"
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-white mb-2">Nueva contraseña</label>
        <input
          v-model="passwordForm.newPassword"
          type="password"
          class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Tu nueva contraseña"
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-white mb-2">Confirmar nueva contraseña</label>
        <input
          v-model="passwordForm.confirmPassword"
          type="password"
          class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Confirma tu nueva contraseña"
        />
      </div>
      <div class="flex space-x-3">
        <button
          @click="savePassword"
          :disabled="isLoading"
          class="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white rounded-lg transition-colors"
        >
          {{ isLoading ? 'Guardando...' : 'Actualizar contraseña' }}
        </button>
        <button
          @click="cancelEditing"
          class="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
        >
          Cancelar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const props = defineProps({
  isLoading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['save-password', 'cancel'])

const isEditing = ref(false)
const passwordForm = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const startEditing = () => {
  passwordForm.currentPassword = ''
  passwordForm.newPassword = ''
  passwordForm.confirmPassword = ''
  isEditing.value = true
}

const cancelEditing = () => {
  passwordForm.currentPassword = ''
  passwordForm.newPassword = ''
  passwordForm.confirmPassword = ''
  isEditing.value = false
  emit('cancel')
}

const savePassword = () => {
  if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
    return
  }

  if (passwordForm.newPassword !== passwordForm.confirmPassword) {
    return
  }

  if (passwordForm.newPassword.length < 6) {
    return
  }

  emit('save-password', {
    currentPassword: passwordForm.currentPassword,
    newPassword: passwordForm.newPassword
  })
  isEditing.value = false
}
</script> 