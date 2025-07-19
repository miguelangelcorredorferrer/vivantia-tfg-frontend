<template>
  <BaseCard title="Dispositivos Registrados">
    <template #header-actions>
      <div class="flex items-center space-x-4">
        <div class="flex items-center space-x-2">
          <span class="text-sm text-gray-300 font-bold">Total: {{ devices.length }}</span>
          
        </div>
        <div class="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded">
          <svg class="w-3 h-3 inline mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
          </svg>
          Solo 1 dispositivo activo permitido
        </div>
      </div>
    </template>

    <div class="overflow-x-auto">
      <div v-if="devices.length === 0" class="text-center py-12">
        <svg class="mx-auto h-12 w-12 text-gray-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"/>
        </svg>
        <h3 class="text-lg font-medium text-white mb-2">No hay dispositivos registrados</h3>
        <p class="text-gray-400">Registra tu primer dispositivo usando el formulario de arriba</p>
      </div>

      <table v-else class="w-full text-sm text-left">
        <thead class="text-xs text-gray-300 uppercase bg-gray-800/50 border-b border-gray-600">
          <tr>
            <th scope="col" class="px-6 py-4 font-medium">Device Name</th>
            <th scope="col" class="px-6 py-4 font-medium">EnddeviceID</th>
            <th scope="col" class="px-6 py-4 font-medium">AppEUI</th>
            <th scope="col" class="px-6 py-4 font-medium">DevEUI</th>
            <th scope="col" class="px-6 py-4 font-medium">AppKey</th>
            <th scope="col" class="px-6 py-4 font-medium text-center">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-600">
          <tr 
            v-for="(device, index) in devices" 
            :key="index"
            class="hover:bg-gray-800/30 transition-colors duration-150"
          >
            <!-- Device Name -->
            <td class="px-6 py-4 font-medium text-white">
              <div class="flex items-center">
                <div class="flex-shrink-0 w-3 h-3 rounded-full mr-3" 
                     :class="device.isActive ? 'bg-green-500' : 'bg-gray-500'">
                </div>
                {{ device.deviceName }}
              </div>
            </td>

            <!-- EnddeviceID -->
            <td class="px-6 py-4 text-gray-300 font-mono text-sm">
              {{ device.enddeviceId }}
            </td>

            <!-- AppEUI -->
            <td class="px-6 py-4 text-gray-300 font-mono text-sm">
              <span class="bg-gray-700 px-2 py-1 rounded text-xs">
                {{ formatHex(device.appEui) }}
              </span>
            </td>

            <!-- DevEUI -->
            <td class="px-6 py-4 text-gray-300 font-mono text-sm">
              <span class="bg-gray-700 px-2 py-1 rounded text-xs">
                {{ formatHex(device.devEui) }}
              </span>
            </td>

            <!-- AppKey -->
            <td class="px-6 py-4 text-gray-300 font-mono text-sm">
              <div class="flex items-center space-x-2">
                <div class="relative bg-gray-700 rounded text-xs overflow-hidden" style="width: 120px;">
                  <input
                    :type="visibleAppKeys[index] ? 'text' : 'password'"
                    :value="device.appKey"
                    readonly
                    class="w-full px-2 py-1 bg-transparent text-gray-300 text-xs font-mono border-none outline-none cursor-text"
                    :placeholder="visibleAppKeys[index] ? '' : '••••••••••••••••'"
                    style="padding-right: 20px;"
                  />
                </div>
                
                <!-- Botones de acción -->
                <div class="flex items-center space-x-1">
                  <!-- Botón mostrar/ocultar -->
                  <button
                    @click="toggleAppKeyVisibility(index)"
                    class="p-1 rounded hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                    :title="visibleAppKeys[index] ? 'Ocultar AppKey' : 'Mostrar AppKey'"
                  >
                    <svg v-if="visibleAppKeys[index]" class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <!-- Ojo cerrado -->
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"/>
                    </svg>
                    <svg v-else class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <!-- Ojo abierto -->
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                    </svg>
                  </button>
                  
                  <!-- Botón copiar -->
                  <button
                    @click="copyAppKey(device.appKey, index)"
                    class="p-1 rounded hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                    :title="`Copiar AppKey${copiedKeys[index] ? ' - ¡Copiado!' : ''}`"
                    :class="{ 'text-green-500': copiedKeys[index], 'text-gray-400': !copiedKeys[index] }"
                  >
                    <svg v-if="copiedKeys[index]" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <!-- Check icon -->
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                    </svg>
                    <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <!-- Copy icon -->
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                    </svg>
                  </button>
                </div>
              </div>
            </td>

            <!-- Actions -->
            <td class="px-6 py-4">
              <div class="flex items-center justify-center space-x-3">
                <!-- Switch -->
                <CustomSwitch
                  v-model="device.isActive"
                  :label="`Toggle device ${device.deviceName}`"
                  @change="(value) => handleToggleDevice(index, value)"
                />
                
                <!-- Database Status Icon -->
                <DatabaseStatusIcon 
                  :is-active="device.isActive"
                  :show-status-dot="false"
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </BaseCard>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useToastNotifications } from '~/composables/useToastNotifications'
import BaseCard from '../Cards/BaseCard.vue'
import CustomSwitch from '../SwitchPlugin/CustomSwitch.vue'
import DatabaseStatusIcon from './DatabaseStatusIcon.vue'

const props = defineProps({
  devices: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['toggle-device'])
const { deviceActivated, deviceDeactivated, appKeyCopied, appKeyCopyError } = useToastNotifications()

// Estado para controlar la visibilidad de AppKeys
const visibleAppKeys = ref({})

// Estado para controlar el feedback de copiado
const copiedKeys = ref({})

const activeDevicesCount = computed(() => {
  return props.devices.filter(device => device.isActive).length
})

const formatHex = (hex, isLong = false) => {
  if (!hex) return ''
  
  if (isLong && hex.length > 16) {
    // Para AppKey, mostrar los primeros 8 caracteres + "..."
    return `${hex.substring(0, 8)}...`
  }
  
  // Para AppEUI y DevEUI, agregar separadores cada 4 caracteres
  return hex.replace(/(.{4})/g, '$1 ').trim()
}

const handleToggleDevice = (index, value) => {
  const device = props.devices[index]
  
  emit('toggle-device', { index, isActive: value })
  
  // Mostrar toast según el estado del dispositivo
  if (value) {
    // Dispositivo activado
    deviceActivated(device.deviceName)
  } else {
    // Dispositivo desactivado
    deviceDeactivated(device.deviceName)
  }
}

const toggleAppKeyVisibility = (index) => {
  visibleAppKeys.value[index] = !visibleAppKeys.value[index]
}

const copyAppKey = async (appKey, index) => {
  try {
    await navigator.clipboard.writeText(appKey)
    
    // Mostrar feedback visual
    copiedKeys.value[index] = true
    
    // Mostrar toast de éxito
    appKeyCopied()
    
    // Resetear el feedback después de 2 segundos
    setTimeout(() => {
      copiedKeys.value[index] = false
    }, 2000)
    
  } catch (error) {
    console.error('Error al copiar AppKey:', error)
    
    // Fallback para navegadores que no soportan clipboard API
    const textArea = document.createElement('textarea')
    textArea.value = appKey
    document.body.appendChild(textArea)
    textArea.select()
    
    try {
      
      copiedKeys.value[index] = true
      
      // Mostrar toast de éxito (fallback)
      appKeyCopied()
      
      setTimeout(() => {
        copiedKeys.value[index] = false
      }, 2000)
    } catch (fallbackError) {
      console.error('Error en fallback de copiado:', fallbackError)
      
      // Mostrar toast de error
      appKeyCopyError()
    }
    
    document.body.removeChild(textArea)
  }
}
</script>

<style scoped>
/* Estilos personalizados para la tabla */
.table-fixed {
  table-layout: fixed;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  table {
    font-size: 0.75rem;
  }
  
  th, td {
    padding: 0.75rem 0.5rem;
  }
}
</style> 