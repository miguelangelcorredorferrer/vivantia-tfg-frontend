<script setup>
import { ref } from 'vue'
import { useToastNotifications } from '~/composables/useToastNotifications'
import DeleteConfirmModal from '../DeleteConfirmModal.vue'
import DeviceActivationModal from './DeviceActivationModal.vue'
import CustomSwitch from '~/components/SwitchPlugin/CustomSwitch.vue'

// Props
const props = defineProps({
  devices: {
    type: Array,
    default: () => []
  },
  isLoading: {
    type: Boolean,
    default: false
  }
})

// Emits
const emit = defineEmits(['delete-device', 'edit-device', 'activate-device', 'deactivate-device'])

// Composables
const { toast } = useToastNotifications()

// Estado local
const showDeleteModal = ref(false)
const deviceToDelete = ref(null)
const showActivationModal = ref(false)
const activationModalData = ref({
  activeDevices: [],
  targetDevice: null,
  targetUser: null
})

// Función para formatear fecha
const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  return new Date(dateString).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Función para ocultar AppKey
const maskAppKey = (appKey) => {
  if (!appKey) return 'N/A'
  return appKey.substring(0, 8) + '****' + appKey.substring(appKey.length - 8)
}

// Función para manejar eliminación
const handleDelete = (device) => {
  deviceToDelete.value = device
  showDeleteModal.value = true
}

// Función para confirmar eliminación
const confirmDelete = () => {
  if (deviceToDelete.value) {
    emit('delete-device', deviceToDelete.value.id)
  }
  showDeleteModal.value = false
  deviceToDelete.value = null
}

// Función para cancelar eliminación
const cancelDelete = () => {
  showDeleteModal.value = false
  deviceToDelete.value = null
}

// Función para editar dispositivo
const handleEdit = (device) => {
  emit('edit-device', device)
}

// Función para manejar cambio de estado del switch
const handleSwitchChange = async (device, newValue) => {
  if (newValue) {
    // Intentar activar el dispositivo
    emit('activate-device', device, false) // false = no forzar inicialmente
  } else {
    // Desactivar el dispositivo
    emit('deactivate-device', device)
  }
}

// Función para mostrar modal de confirmación de activación
const showActivationConfirmation = (activeDevices, targetDevice, targetUser) => {
  activationModalData.value = {
    activeDevices,
    targetDevice,
    targetUser
  }
  showActivationModal.value = true
}

// Función para confirmar activación forzada
const confirmActivation = () => {
  if (activationModalData.value.targetDevice) {
    emit('activate-device', activationModalData.value.targetDevice, true) // true = forzar
  }
  showActivationModal.value = false
  activationModalData.value = {
    activeDevices: [],
    targetDevice: null,
    targetUser: null
  }
}

// Función para cancelar activación
const cancelActivation = () => {
  showActivationModal.value = false
  activationModalData.value = {
    activeDevices: [],
    targetDevice: null,
    targetUser: null
  }
}

// Exponer función para mostrar confirmación desde el padre
defineExpose({
  showActivationConfirmation
})
</script>

<template>
  <div class="bg-gray-800/50 border border-gray-700 rounded-lg overflow-hidden">
    <!-- Header de la tabla -->
    <div class="px-6 py-4 border-b border-gray-700">
      <div class="flex items-center justify-between">
        <div>
          <h3 class="text-lg font-semibold text-white">Dispositivos Disponibles</h3>
          <p class="text-sm text-gray-400 mt-1">
            {{ devices.length }} dispositivo{{ devices.length !== 1 ? 's' : '' }} encontrado{{ devices.length !== 1 ? 's' : '' }}
          </p>
        </div>
        <button
          @click="navigateTo('/admin/dispositivos/agregar')"
          class="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors"
        >
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
          </svg>
          Añadir Dispositivo
        </button>
      </div>
    </div>

    <!-- Loading state -->
    <div v-if="isLoading" class="p-8 text-center">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      <p class="text-gray-400 mt-2">Cargando dispositivos...</p>
    </div>

    <!-- Empty state -->
    <div v-else-if="devices.length === 0" class="p-8 text-center">
      <div class="w-16 h-16 mx-auto mb-4 bg-gray-700 rounded-full flex items-center justify-center">
        <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"/>
        </svg>
      </div>
      <h3 class="text-lg font-medium text-white mb-2">No hay dispositivos</h3>
      <p class="text-gray-400">No se encontraron dispositivos registrados en el sistema.</p>
    </div>

    <!-- Tabla -->
    <div v-else class="overflow-x-auto">
      <table class="w-full">
        <thead class="bg-gray-700/50">
          <tr>
            <th class="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">
              Usuario
            </th>
            <th class="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">
              Dispositivo
            </th>
            <th class="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">
              EndDevice ID
            </th>
            <th class="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">
              AppEUI
            </th>
            <th class="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">
              DevEUI
            </th>
            <th class="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">
              AppKey
            </th>
            <th class="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">
              TTN Region
            </th>
            <th class="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">
              TTN App ID
            </th>
            <th class="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">
              TTN Access Key
            </th>
            <th class="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">
              Estado Comunicación
            </th>
            <th class="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">
              Fecha Creación
            </th>
            <th class="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-700">
          <tr v-for="device in devices" :key="device.id" class="hover:bg-gray-700/30 transition-colors">
            <!-- Usuario -->
            <td class="px-6 py-4 whitespace-nowrap text-center">
              <div class="flex flex-col items-center">
                <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-2">
                  <span class="text-white text-sm font-semibold">
                    {{ device.user?.name?.charAt(0).toUpperCase() || '?' }}
                  </span>
                </div>
                <div class="text-center">
                  <div class="text-sm font-medium text-white">{{ device.user?.name || 'Usuario no encontrado' }}</div>
                  <div class="text-xs text-gray-400">{{ device.user?.email || 'Sin email' }}</div>
                </div>
              </div>
            </td>

            <!-- Dispositivo -->
            <td class="px-6 py-4 whitespace-nowrap text-center">
              <div class="text-sm text-white">{{ device.device_name }}</div>
            </td>

            <!-- EndDevice ID -->
            <td class="px-6 py-4 whitespace-nowrap text-center">
              <div class="text-sm text-gray-300 font-mono">{{ device.enddevice_id }}</div>
            </td>

            <!-- AppEUI -->
            <td class="px-6 py-4 whitespace-nowrap text-center">
              <div class="text-sm text-gray-300 font-mono">{{ device.app_eui }}</div>
            </td>

            <!-- DevEUI -->
            <td class="px-6 py-4 whitespace-nowrap text-center">
              <div class="text-sm text-gray-300 font-mono">{{ device.dev_eui }}</div>
            </td>

            <!-- AppKey -->
            <td class="px-6 py-4 whitespace-nowrap text-center">
              <div class="text-sm text-gray-400 font-mono">{{ maskAppKey(device.app_key) }}</div>
            </td>

            <!-- TTN Region -->
            <td class="px-6 py-4 whitespace-nowrap text-center">
              <div class="text-sm text-gray-300 font-mono">{{ device.ttn_region }}</div>
            </td>

            <!-- TTN App ID -->
            <td class="px-6 py-4 whitespace-nowrap text-center">
              <div class="text-sm text-gray-300 font-mono">{{ device.ttn_app_id }}</div>
            </td>

            <!-- TTN Access Key -->
            <td class="px-6 py-4 whitespace-nowrap text-center">
              <div class="text-sm text-gray-400 font-mono">{{ maskAppKey(device.ttn_access_key) }}</div>
            </td>

            <!-- Estado Comunicación -->
            <td class="px-6 py-4 whitespace-nowrap text-center">
              <div class="flex flex-col items-center space-y-1">
                <CustomSwitch
                  :model-value="device.is_active_communication"
                  @update:model-value="(newValue) => handleSwitchChange(device, newValue)"
                  :disabled="isLoading"
                  label="Estado de comunicación"
                  class="scale-90"
                />
                <span 
                  :class="[
                    'text-xs font-medium',
                    device.is_active_communication ? 'text-green-400' : 'text-red-400'
                  ]"
                >
                  {{ device.is_active_communication ? 'Activo' : 'Inactivo' }}
                </span>
              </div>
            </td>

            <!-- Fecha Creación -->
            <td class="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-300">
              {{ formatDate(device.created_at) }}
            </td>

            <!-- Acciones -->
            <td class="px-6 py-4 whitespace-nowrap text-center">
              <div class="flex items-center justify-center space-x-2">
                <button
                  @click="handleEdit(device)"
                  class="inline-flex items-center px-2 py-1 text-yellow-400 border border-yellow-400 rounded-md hover:bg-yellow-400/10 transition-colors"
                  title="Editar dispositivo"
                >
                  <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                  </svg>
                  <span class="text-xs font-medium">Editar</span>
                </button>
                <button
                  @click="handleDelete(device)"
                  class="inline-flex items-center px-2 py-1 text-red-400 border border-red-400 rounded-md hover:bg-red-400/10 transition-colors"
                  title="Eliminar dispositivo"
                >
                  <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                  </svg>
                  <span class="text-xs font-medium">Eliminar</span>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- Modal de confirmación de eliminación -->
  <DeleteConfirmModal
    :is-open="showDeleteModal"
    :title="`Eliminar Dispositivo`"
    :message="`¿Estás seguro de que quieres eliminar el dispositivo '${deviceToDelete?.device_name}'? Esta acción no se puede deshacer.`"
    :item-name="deviceToDelete?.device_name"
    :item-type="'dispositivo'"
    @confirm="confirmDelete"
    @cancel="cancelDelete"
  />

  <!-- Modal de confirmación de activación -->
  <DeviceActivationModal
    :is-visible="showActivationModal"
    :active-devices="activationModalData.activeDevices"
    :target-device="activationModalData.targetDevice"
    :target-user="activationModalData.targetUser"
    @confirm="confirmActivation"
    @close="cancelActivation"
  />
</template> 