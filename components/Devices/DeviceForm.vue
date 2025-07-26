<template>
  <BaseCard title="Registrar Nuevo Dispositivo">
    <form @submit.prevent="handleSubmit" class="space-y-6" data-device-form>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Device Name -->
        <div>
          <label for="deviceName" class="block text-sm font-medium text-white mb-2">
            Device Name
          </label>
          <input
            id="deviceName"
            v-model="formData.deviceName"
            type="text"
            required
            class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            placeholder="Ej: Sensor Riego 01"
          />
        </div>

        <!-- EnddeviceID -->
        <div>
          <label for="enddeviceId" class="block text-sm font-medium text-white mb-2">
            EnddeviceID
          </label>
          <input
            id="enddeviceId"
            v-model="formData.enddeviceId"
            type="text"
            required
            class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            placeholder="Ej: my-device-01"
          />
        </div>

        <!-- AppEUI -->
        <div>
          <label for="appEui" class="block text-sm font-medium text-white mb-2">
            AppEUI
          </label>
          <input
            id="appEui"
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
          <label for="devEui" class="block text-sm font-medium text-white mb-2">
            DevEUI
          </label>
          <input
            id="devEui"
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

      <!-- AppKey (ancho completo) -->
      <div>
        <label for="appKey" class="block text-sm font-medium text-white mb-2">
          AppKey
        </label>
        <input
          id="appKey"
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

      <!-- Separador TTN Configuration -->
      <div class="border-t border-gray-600 pt-6">
        <h3 class="text-lg font-medium text-white mb-4 flex items-center">
          <svg class="w-5 h-5 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"/>
          </svg>
          Configuración TTN (The Things Network)
        </h3>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- TTN Region -->
          <div>
            <label for="ttnRegion" class="block text-sm font-medium text-white mb-2">
              TTN Region
            </label>
            <select
              id="ttnRegion"
              v-model="formData.ttnRegion"
              class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            >
              <option value="">Seleccionar región</option>
              <option value="eu1">Europe 1 (eu1)</option>
              <option value="nam1">North America 1 (nam1)</option>
              <option value="au1">Australia 1 (au1)</option>
              <option value="as1">Asia 1 (as1)</option>
            </select>
            <p class="mt-1 text-xs text-gray-400">Región del servidor TTN</p>
          </div>

          <!-- TTN App ID -->
          <div>
            <label for="ttnAppId" class="block text-sm font-medium text-white mb-2">
              TTN Application ID
            </label>
            <input
              id="ttnAppId"
              v-model="formData.ttnAppId"
              type="text"
              class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              placeholder="my-ttn-application"
            />
            <p class="mt-1 text-xs text-gray-400">ID de la aplicación en TTN</p>
          </div>

          <!-- TTN Access Key -->
          <div>
            <label for="ttnAccessKey" class="block text-sm font-medium text-white mb-2">
              TTN Access Key
            </label>
            <input
              id="ttnAccessKey"
              v-model="formData.ttnAccessKey"
              type="password"
              class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors font-mono"
              placeholder="••••••••••••••••"
            />
            <p class="mt-1 text-xs text-gray-400">Clave de acceso para la API TTN</p>
          </div>
        </div>
        
        <div class="mt-4 p-3 bg-blue-900/20 border border-blue-500/30 rounded-lg">
          <div class="flex items-start">
            <svg class="w-5 h-5 text-blue-400 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <div class="text-sm text-blue-300">
              <p class="font-medium mb-1">Configuración TTN (Opcional)</p>
              <p>Los campos TTN son necesarios para el control remoto de la bomba de riego. Puedes configurarlos ahora o más tarde desde la edición del dispositivo.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Botón Submit -->
      <div class="flex justify-end">
        <button
          type="submit"
          :disabled="isLoading"
          class="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
        >
          <span v-if="isLoading" class="flex items-center">
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Agregando...
          </span>
          <span v-else class="flex items-center">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            Add Device
          </span>
        </button>
      </div>
    </form>
  </BaseCard>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useDeviceStore } from '~/stores/device'
import { useUserStore } from '~/stores/user'
import { useToastNotifications } from '~/composables/useToastNotifications'
import BaseCard from '../Cards/BaseCard.vue'

const emit = defineEmits(['device-added'])
const deviceStore = useDeviceStore()
const userStore = useUserStore()
const { deviceAdded, deviceAddError } = useToastNotifications()

const isLoading = ref(false)

const formData = reactive({
  deviceName: '',
  enddeviceId: '',
  appEui: '',
  devEui: '',
  appKey: '',
  ttnRegion: '',
  ttnAppId: '',
  ttnAccessKey: ''
})

const handleSubmit = async () => {
  isLoading.value = true
  
  try {
    // Emitir evento con los datos del dispositivo para que pages/dispositivos.vue lo maneje
    emit('device-added', { ...formData })
    
    // Mostrar toast de éxito
    deviceAdded(formData.deviceName)
    
    // Resetear formulario
    Object.keys(formData).forEach(key => {
      formData[key] = ''
    })
    
  } catch (error) {
    console.error('Error al agregar dispositivo:', error)
    // Mostrar toast de error
    deviceAddError()
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
/* Estilos adicionales si son necesarios */
</style> 