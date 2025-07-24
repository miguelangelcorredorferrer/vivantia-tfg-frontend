<template>
  <div 
    v-if="isOpen" 
    class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
    @click.self="closeModal"
  >
    <div class="bg-gray-800 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
      <!-- Header -->
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold text-white">Editar Dispositivo</h2>
        <button
          @click="closeModal"
          class="text-gray-400 hover:text-white transition-colors"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <!-- Formulario -->
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Device Name -->
          <div>
            <label for="edit-deviceName" class="block text-sm font-medium text-white mb-2">
              Device Name *
            </label>
            <input
              id="edit-deviceName"
              v-model="formData.deviceName"
              type="text"
              required
              class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              placeholder="Ej: Sensor Riego 01"
            />
          </div>

          <!-- EnddeviceID -->
          <div>
            <label for="edit-enddeviceId" class="block text-sm font-medium text-white mb-2">
              EnddeviceID *
            </label>
            <input
              id="edit-enddeviceId"
              v-model="formData.enddeviceId"
              type="text"
              required
              class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              placeholder="Ej: my-device-01"
            />
          </div>

          <!-- AppEUI -->
          <div>
            <label for="edit-appEui" class="block text-sm font-medium text-white mb-2">
              AppEUI *
            </label>
            <input
              id="edit-appEui"
              v-model="formData.appEui"
              type="text"
              required
              pattern="[A-Fa-f0-9]{16}"
              maxlength="16"
              class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors font-mono"
              placeholder="0123456789ABCDEF"
            />
            <p class="mt-1 text-xs text-gray-400">16 caracteres hexadecimales</p>
          </div>

          <!-- DevEUI -->
          <div>
            <label for="edit-devEui" class="block text-sm font-medium text-white mb-2">
              DevEUI *
            </label>
            <input
              id="edit-devEui"
              v-model="formData.devEui"
              type="text"
              required
              pattern="[A-Fa-f0-9]{16}"
              maxlength="16"
              class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors font-mono"
              placeholder="FEDCBA9876543210"
            />
            <p class="mt-1 text-xs text-gray-400">16 caracteres hexadecimales</p>
          </div>
        </div>

        <!-- AppKey (full width) -->
        <div>
          <label for="edit-appKey" class="block text-sm font-medium text-white mb-2">
            AppKey *
          </label>
          <input
            id="edit-appKey"
            v-model="formData.appKey"
            type="text"
            required
            pattern="[A-Fa-f0-9]{32}"
            maxlength="32"
            class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors font-mono"
            placeholder="0123456789ABCDEF0123456789ABCDEF"
          />
          <p class="mt-1 text-xs text-gray-400">32 caracteres hexadecimales</p>
        </div>

        <!-- Botones -->
        <div class="flex justify-end space-x-4 pt-6 border-t border-gray-600">
          <button
            type="button"
            @click="closeModal"
            class="px-6 py-3 text-gray-300 hover:text-white border border-gray-600 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            :disabled="isLoading"
            class="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white rounded-lg transition-colors flex items-center"
          >
            <span v-if="isLoading" class="flex items-center">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Guardando...
            </span>
            <span v-else class="flex items-center">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              Guardar Cambios
            </span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  device: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['close', 'save'])

const isLoading = ref(false)

const formData = reactive({
  deviceName: '',
  enddeviceId: '',
  appEui: '',
  devEui: '',
  appKey: ''
})

// Poblar formulario cuando se abra el modal con un dispositivo
watch(() => props.device, (newDevice) => {
  if (newDevice) {
    formData.deviceName = newDevice.deviceName || ''
    formData.enddeviceId = newDevice.enddeviceId || ''
    formData.appEui = newDevice.appEui || ''
    formData.devEui = newDevice.devEui || ''
    formData.appKey = newDevice.appKey || ''
  }
}, { immediate: true })

const closeModal = () => {
  emit('close')
}

const handleSubmit = async () => {
  if (!props.device?.id) return
  
  isLoading.value = true
  
  try {
    // Mapear datos del formulario para el backend
    const updateData = {
      device_name: formData.deviceName,
      enddevice_id: formData.enddeviceId,
      app_eui: formData.appEui,
      dev_eui: formData.devEui,
      app_key: formData.appKey
    }
    
    emit('save', { deviceId: props.device.id, updateData })
    
    // Cerrar modal automáticamente después de emitir el evento
    closeModal()
    
  } catch (error) {
    console.error('Error preparando datos para actualización:', error)
  } finally {
    isLoading.value = false
  }
}

// Cerrar modal con ESC
const handleKeyDown = (event) => {
  if (event.key === 'Escape' && props.isOpen) {
    closeModal()
  }
}

// Agregar/remover listener de teclado
watch(() => props.isOpen, (isOpen) => {
  if (isOpen) {
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
  } else {
    document.removeEventListener('keydown', handleKeyDown)
    document.body.style.overflow = ''
  }
})
</script> 