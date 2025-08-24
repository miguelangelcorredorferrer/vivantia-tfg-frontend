<template>
  <div>
    <!-- Filtros -->
    <DevicesFilter 
      :device-store="deviceStore"
      @filter-change="handleFilterChange"
    />
    
    <BaseCard title="Dispositivos Registrados">
      <template #header-actions>
        <div class="flex items-center space-x-4">
          <div class="flex items-center space-x-2">
            <span class="text-sm text-gray-300 font-bold">Total: {{ deviceStore.deviceCount }}</span>
          </div>
          <div class="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded">
            <svg class="w-3 h-3 inline mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
            </svg>
            Activación automática: al activar un dispositivo se desactivan los demás
          </div>
        </div>
      </template>

      <div v-if="filteredDevices.length === 0" class="text-center py-12">
        <svg class="mx-auto h-12 w-12 text-gray-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"/>
        </svg>
        <h3 class="text-lg font-medium text-white mb-2">
          {{ deviceStore.deviceCount === 0 ? 'No tienes dispositivos registrados' : 'No se encontraron dispositivos' }}
        </h3>
        <p class="text-gray-400">
          {{ deviceStore.deviceCount === 0 ? 'Registra tu primer dispositivo para comenzar a usar el sistema de riego' : 'Intenta ajustar los filtros de búsqueda' }}
        </p>
        
        <!-- Botón para agregar primer dispositivo (solo cuando no hay dispositivos) -->
        <div v-if="deviceStore.deviceCount === 0" class="mt-6">
          <button
            @click="scrollToForm"
            class="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
            </svg>
            Registrar Primer Dispositivo
          </button>
        </div>
      </div>

      <div v-else class="overflow-x-auto">
        <table class="w-full text-sm text-left min-w-[1200px]">
        <thead class="text-xs text-gray-300 uppercase bg-gray-800/50 border-b border-gray-600">
          <tr>
            <th scope="col" class="px-4 py-4 font-medium text-center w-48">Device Name</th>
            <th scope="col" class="px-4 py-4 font-medium text-center w-40">EnddeviceID</th>
            <th scope="col" class="px-4 py-4 font-medium text-center w-32">AppEUI</th>
            <th scope="col" class="px-4 py-4 font-medium text-center w-32">DevEUI</th>
            <th scope="col" class="px-4 py-4 font-medium text-center w-48">AppKey</th>
            <th scope="col" class="px-4 py-4 font-medium text-center w-24">TTN Region</th>
            <th scope="col" class="px-4 py-4 font-medium text-center w-32">TTN App ID</th>
            <th scope="col" class="px-4 py-4 font-medium text-center w-48">TTN Access Key</th>
            <th scope="col" class="px-4 py-4 font-medium text-center w-32">Estado</th>
            <th scope="col" class="px-4 py-4 font-medium text-center w-32">Acciones</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-600">
          <tr 
            v-for="(device, index) in filteredDevices" 
            :key="device.id || index"
            class="hover:bg-gray-800/30 transition-colors duration-150"
          >
            <!-- Device Name -->
            <td class="px-4 py-4 font-medium text-white text-center">
              <div class="flex items-center justify-center">
                <div class="flex-shrink-0 w-3 h-3 rounded-full mr-3" 
                     :class="device.isActive ? 'bg-green-500' : 'bg-gray-500'">
                </div>
                {{ device.deviceName }}
              </div>
            </td>

            <!-- EnddeviceID -->
            <td class="px-4 py-4 text-gray-300 font-mono text-sm text-center">
              {{ device.enddeviceId }}
            </td>

            <!-- AppEUI -->
            <td class="px-4 py-4 text-gray-300 font-mono text-sm text-center">
              <span class="bg-gray-700 px-2 py-1 rounded text-xs">
                {{ formatHex(device.appEui) }}
              </span>
            </td>

            <!-- DevEUI -->
            <td class="px-4 py-4 text-gray-300 font-mono text-sm text-center">
              <span class="bg-gray-700 px-2 py-1 rounded text-xs">
                {{ formatHex(device.devEui) }}
              </span>
            </td>

            <!-- AppKey -->
            <td class="px-4 py-4 text-gray-300 font-mono text-sm text-center">
              <div class="flex items-center justify-center space-x-2">
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

            <!-- TTN Region -->
            <td class="px-4 py-4 text-gray-300 text-sm text-center">
              <span v-if="device.ttnRegion" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-900/30 text-blue-400 border border-blue-500/30">
                {{ device.ttnRegion }}
              </span>
              <span v-else class="text-gray-500 italic">No configurado</span>
            </td>

            <!-- TTN App ID -->
            <td class="px-4 py-4 text-gray-300 font-mono text-sm text-center">
              <div v-if="device.ttnAppId" class="max-w-32 truncate">
                {{ device.ttnAppId }}
              </div>
              <span v-else class="text-gray-500 italic">No configurado</span>
            </td>

            <!-- TTN Access Key -->
            <td class="px-4 py-4 text-gray-300 font-mono text-sm text-center">
              <div v-if="device.ttnAccessKey" class="flex items-center justify-center space-x-2">
                <div class="relative bg-gray-700 rounded text-xs overflow-hidden" style="width: 120px;">
                  <input
                    :type="visibleTtnKeys[index] ? 'text' : 'password'"
                    :value="device.ttnAccessKey"
                    readonly
                    class="w-full px-2 py-1 bg-transparent text-gray-300 text-xs font-mono border-none outline-none cursor-text"
                    :placeholder="visibleTtnKeys[index] ? '' : '••••••••••••••••'"
                    style="padding-right: 20px;"
                  />
                </div>
                
                <!-- Botones de acción -->
                <div class="flex items-center space-x-1">
                  <!-- Botón mostrar/ocultar -->
                  <button
                    @click="toggleTtnKeyVisibility(index)"
                    class="p-1 rounded hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                    :title="visibleTtnKeys[index] ? 'Ocultar TTN Access Key' : 'Mostrar TTN Access Key'"
                  >
                    <svg v-if="visibleTtnKeys[index]" class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                    @click="copyTtnKey(device.ttnAccessKey, index)"
                    class="p-1 rounded hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                    :title="`Copiar TTN Access Key${copiedTtnKeys[index] ? ' - ¡Copiado!' : ''}`"
                    :class="{ 'text-green-500': copiedTtnKeys[index], 'text-gray-400': !copiedTtnKeys[index] }"
                  >
                    <svg v-if="copiedTtnKeys[index]" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              <span v-else class="text-gray-500 italic">No configurado</span>
            </td>

            <!-- Estado -->
            <td class="px-4 py-4">
              <div class="flex items-center justify-center space-x-3">
                <!-- Switch -->
                <CustomSwitch
                  v-model="device.isActive"
                  :label="`Toggle device ${device.deviceName}`"
                  @change="(value) => handleToggleDevice(device, value)"
                />
                
                <!-- Database Status Icon -->
                <DatabaseStatusIcon 
                  :is-active="device.isActive"
                  :show-status-dot="false"
                />
              </div>
            </td>

            <!-- Acciones -->
            <td class="px-4 py-4">
              <div class="flex items-center justify-center space-x-4">
                <!-- Botón Editar -->
                <div class="flex flex-col items-center space-y-1">
                  <button
                    @click="handleEditDevice(device)"
                    class="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-900/20 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    :title="`Editar ${device.deviceName}`"
                    aria-label="Editar dispositivo"
                  >
                    <EditIcon class="w-5 h-5" />
                  </button>
                  <span class="text-xs text-gray-400">Editar</span>
                </div>
                
                <!-- Botón Eliminar -->
                <div class="flex flex-col items-center space-y-1">
                  <button
                    @click="handleDeleteDevice(device)"
                    class="p-2 text-gray-400 hover:text-red-400 hover:bg-red-900/20 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500"
                    :title="`Eliminar ${device.deviceName}`"
                    aria-label="Eliminar dispositivo"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                    </svg>
                  </button>
                  <span class="text-xs text-gray-400">Borrar</span>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    </BaseCard>

    <!-- Modal de confirmación para eliminar dispositivo -->
    <DeleteConfirmModal
      :is-open="isDeleteModalOpen"
      title="Eliminar Dispositivo"
      message="¿Estás seguro de que quieres eliminar este dispositivo? Esta acción eliminará permanentemente el dispositivo y todos sus datos asociados."
      :item-name="deviceToDelete?.deviceName"
      item-type="dispositivo"
      @confirm="confirmDeleteDevice"
      @cancel="cancelDeleteDevice"
    />
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useToastNotifications } from '~/composables/useToastNotifications'
import { getIcon } from '~/assets/icons'
import BaseCard from '../Cards/BaseCard.vue'
import CustomSwitch from '../SwitchPlugin/CustomSwitch.vue'
import DatabaseStatusIcon from './DatabaseStatusIcon.vue'
import DevicesFilter from './DevicesFilter.vue'
import EditIcon from '~/assets/icons/EditIcon.vue'
import DeleteConfirmModal from '../Admin/DeleteConfirmModal.vue'

const props = defineProps({
  deviceStore: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['toggle-device', 'edit-device', 'delete-device'])
const { deviceActivated, deviceDeactivated, appKeyCopied, appKeyCopyError } = useToastNotifications()

// Estado para controlar la visibilidad de AppKeys
const visibleAppKeys = ref({})

// Estado para controlar el feedback de copiado
const copiedKeys = ref({})

// Estado para controlar la visibilidad de TTN Access Keys
const visibleTtnKeys = ref({})

// Estado para controlar el feedback de copiado de TTN Access Keys
const copiedTtnKeys = ref({})

// Estado para filtros
const currentFilters = ref({
  deviceName: '',
  enddeviceId: ''
})

// Estado del modal de eliminación
const isDeleteModalOpen = ref(false)
const deviceToDelete = ref(null)

// Dispositivos filtrados
const filteredDevices = computed(() => {
  const filtered = props.deviceStore.filterDevices(currentFilters.value)
  console.log('🔍 Dispositivos filtrados en tabla:', filtered)
  return filtered
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

// Manejo de filtros
const handleFilterChange = (filters) => {
  currentFilters.value = { ...filters }
}

// Manejo del toggle de dispositivo
const handleToggleDevice = async (device, value) => {
  try {
    await props.deviceStore.toggleDeviceActive(device.id, value)
    
    // Mostrar toast según el estado del dispositivo
    if (value) {
      // Si se activó, verificar si había otros dispositivos activos
      const otherActiveDevices = props.deviceStore.devices.filter(d => 
        d.id !== device.id && d.is_active_communication
      )
      
      if (otherActiveDevices.length > 0) {
        // Si había otros dispositivos activos, mostrar mensaje específico
        deviceActivated(`${device.deviceName} activado. Los demás dispositivos han sido desactivados automáticamente.`)
      } else {
        // Si no había otros dispositivos activos, mensaje normal
        deviceActivated(device.deviceName)
      }
    } else {
      deviceDeactivated(device.deviceName)
    }
    
    emit('toggle-device', { device, isActive: value })
  } catch (error) {
    console.error('Error al cambiar estado del dispositivo:', error)
    // El error ya se maneja en el store, pero podemos agregar un toast adicional si es necesario
  }
}

// Manejo de edición
const handleEditDevice = (device) => {
  emit('edit-device', device)
}

// Manejo de eliminación - Abrir modal
const handleDeleteDevice = (device) => {
  deviceToDelete.value = device
  isDeleteModalOpen.value = true
}

// Confirmar eliminación
const confirmDeleteDevice = () => {
  if (deviceToDelete.value) {
    emit('delete-device', deviceToDelete.value)
  }
  isDeleteModalOpen.value = false
  deviceToDelete.value = null
}

// Cancelar eliminación
const cancelDeleteDevice = () => {
  isDeleteModalOpen.value = false
  deviceToDelete.value = null
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
    
    // Crear alerta en backend
    try {
      const DeviceAPI = (await import('~/api/DeviceAPI.js')).default
      await DeviceAPI.createApiKeyCopiedAlert()
    } catch (e) {
      console.warn('No se pudo crear la alerta de API key copiada:', e)
    }
    
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
      
      // Crear alerta en backend (fallback)
      try {
        const DeviceAPI = (await import('~/api/DeviceAPI.js')).default
        await DeviceAPI.createApiKeyCopiedAlert()
      } catch (e) {
        console.warn('No se pudo crear la alerta de API key copiada (fallback):', e)
      }
      
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

const toggleTtnKeyVisibility = (index) => {
  visibleTtnKeys.value[index] = !visibleTtnKeys.value[index]
}

const copyTtnKey = async (ttnAccessKey, index) => {
  try {
    await navigator.clipboard.writeText(ttnAccessKey)
    
    // Mostrar feedback visual
    copiedTtnKeys.value[index] = true
    
    // Mostrar toast de éxito
    appKeyCopied() // Reutilizar el toast de éxito de AppKey
    
    // Resetear el feedback después de 2 segundos
    setTimeout(() => {
      copiedTtnKeys.value[index] = false
    }, 2000)
    
  } catch (error) {
    console.error('Error al copiar TTN Access Key:', error)
    
    // Fallback para navegadores que no soportan clipboard API
    const textArea = document.createElement('textarea')
    textArea.value = ttnAccessKey
    document.body.appendChild(textArea)
    textArea.select()
    
    try {
      
      copiedTtnKeys.value[index] = true
      
      // Mostrar toast de éxito (fallback)
      appKeyCopied() // Reutilizar el toast de éxito de AppKey
      
      setTimeout(() => {
        copiedTtnKeys.value[index] = false
      }, 2000)
    } catch (fallbackError) {
      console.error('Error en fallback de copiado:', fallbackError)
      
      // Mostrar toast de error
      appKeyCopyError()
    }
    
    document.body.removeChild(textArea)
  }
}

// Función para hacer scroll al formulario
const scrollToForm = () => {
  // Buscar el formulario de dispositivos en la página
  const formElement = document.querySelector('[data-device-form]') || 
                     document.querySelector('.device-form') ||
                     document.querySelector('form')
  
  if (formElement) {
    formElement.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start' 
    })
  } else {
    // Fallback: hacer scroll al inicio de la página
    window.scrollTo({ 
      top: 0, 
      behavior: 'smooth' 
    })
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