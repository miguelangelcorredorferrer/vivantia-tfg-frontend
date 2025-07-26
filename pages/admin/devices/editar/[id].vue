<script setup>
import { useAdminStore } from '~/stores/admin'
import { useToastNotifications } from '~/composables/useToastNotifications'
import DeviceAPI from '~/api/DeviceAPI'

// Configurar middleware de administrador
definePageMeta({
  middleware: 'admin'
})

// Obtener el ID del dispositivo de la URL
const route = useRoute()
const deviceId = route.params.id

// Stores y composables
const adminStore = useAdminStore()
const { toast } = useToastNotifications()

// Estado del formulario
const formData = ref({
  device_name: '',
  enddevice_id: '',
  app_eui: '',
  dev_eui: '',
  app_key: '',
  is_active_communication: false,
  ttn_region: '',
  ttn_app_id: '',
  ttn_access_key: ''
})

// Estado del usuario propietario (solo lectura)
const deviceOwner = ref({
  name: '',
  email: ''
})

// Estados de carga y error
const isLoading = ref(false)
const isSaving = ref(false)
const error = ref(null)

// Cargar datos del dispositivo al montar el componente
onMounted(async () => {
  await loadDeviceData()
})

// Función para cargar los datos del dispositivo
const loadDeviceData = async () => {
  try {
    isLoading.value = true
    error.value = null
    
    // Obtener todos los dispositivos con información de usuario
    const response = await DeviceAPI.getAllWithUsers()
    const device = response.data.find(d => d.id === parseInt(deviceId))
    
    if (!device) {
      throw new Error('Dispositivo no encontrado')
    }
    
    // Llenar el formulario con los datos del dispositivo
    formData.value = {
      device_name: device.device_name || '',
      enddevice_id: device.enddevice_id || '',
      app_eui: device.app_eui || '',
      dev_eui: device.dev_eui || '',
      app_key: device.app_key || '',
      is_active_communication: device.is_active_communication || false,
      ttn_region: device.ttn_region || '',
      ttn_app_id: device.ttn_app_id || '',
      ttn_access_key: device.ttn_access_key || ''
    }
    
    // Información del usuario propietario
    deviceOwner.value = {
      name: device.user?.name || 'Usuario no encontrado',
      email: device.user?.email || 'Sin email'
    }
    
    console.log('✅ Dispositivo cargado exitosamente')
  } catch (err) {
    console.error('❌ Error cargando dispositivo:', err)
    error.value = 'Error al cargar el dispositivo'
    toast.error('Error al cargar el dispositivo')
  } finally {
    isLoading.value = false
  }
}

// Función para guardar cambios
const handleSubmit = async () => {
  try {
    isSaving.value = true
    error.value = null
    
    // Validar campos obligatorios
    if (!formData.value.device_name || !formData.value.enddevice_id || 
        !formData.value.app_eui || !formData.value.dev_eui) {
      throw new Error('Todos los campos obligatorios deben estar completos')
    }
    
    // Preparar datos para actualizar (excluir app_key por seguridad)
    const updateData = {
      device_name: formData.value.device_name,
      enddevice_id: formData.value.enddevice_id,
      app_eui: formData.value.app_eui,
      dev_eui: formData.value.dev_eui,
      is_active_communication: formData.value.is_active_communication,
      ttn_region: formData.value.ttn_region,
      ttn_app_id: formData.value.ttn_app_id,
      ttn_access_key: formData.value.ttn_access_key
    }
    
    // Actualizar dispositivo
    await DeviceAPI.update(deviceId, updateData)
    
    toast.success('Dispositivo actualizado exitosamente')
    
    // Redirigir de vuelta a la lista de dispositivos
    await navigateTo('/admin/devices')
    
  } catch (err) {
    console.error('❌ Error actualizando dispositivo:', err)
    error.value = err.message || 'Error al actualizar el dispositivo'
    toast.error(error.value)
  } finally {
    isSaving.value = false
  }
}

// Función para cancelar y volver
const handleCancel = () => {
  navigateTo('/admin/devices')
}
</script>

<template>
  <div class="space-y-8">
    <!-- Header de la página -->
    <div class="mb-8">
      <div class="flex items-center space-x-3 mb-2">
        <div class="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
          </svg>
        </div>
        <div>
          <h1 class="text-3xl font-bold text-white">Panel de Administración</h1>
          <p class="text-gray-400">Bienvenido al centro de control del sistema Vivantia</p>
        </div>
      </div>
      <div class="mt-4">
        <h2 class="text-xl font-semibold text-white">Editar Dispositivo</h2>
        <p class="text-gray-400 mt-1">Modificar configuración del dispositivo</p>
      </div>
    </div>

    <!-- Loading state -->
    <div v-if="isLoading" class="flex items-center justify-center py-12">
      <div class="text-center">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-4"></div>
        <p class="text-gray-400">Cargando dispositivo...</p>
      </div>
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="bg-red-500/20 border border-red-500/30 rounded-lg p-6">
      <div class="flex items-center">
        <svg class="w-6 h-6 text-red-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <div>
          <h3 class="text-lg font-medium text-red-400">Error</h3>
          <p class="text-red-300 mt-1">{{ error }}</p>
        </div>
      </div>
      <button
        @click="loadDeviceData"
        class="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
      >
        Reintentar
      </button>
    </div>

    <!-- Formulario de edición -->
    <div v-else class="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Información del usuario propietario (solo lectura) -->
        <div class="bg-gray-700/30 rounded-lg p-4">
          <h3 class="text-lg font-medium text-white mb-4">Usuario Propietario</h3>
          <div class="flex items-center space-x-4">
            <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span class="text-white text-lg font-semibold">
                {{ deviceOwner.name.charAt(0).toUpperCase() }}
              </span>
            </div>
            <div>
              <p class="text-white font-medium">{{ deviceOwner.name }}</p>
              <p class="text-gray-400 text-sm">{{ deviceOwner.email }}</p>
            </div>
          </div>
        </div>

        <!-- Campos editables -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Nombre del dispositivo -->
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">
              Nombre del Dispositivo *
            </label>
            <input
              v-model="formData.device_name"
              type="text"
              required
              class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Ej: Sensor Riego Principal"
            />
          </div>

          <!-- EndDevice ID -->
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">
              EndDevice ID *
            </label>
            <input
              v-model="formData.enddevice_id"
              type="text"
              required
              class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Ej: sensor-riego-01"
            />
          </div>

          <!-- AppEUI -->
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">
              AppEUI *
            </label>
            <input
              v-model="formData.app_eui"
              type="text"
              required
              class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Ej: 0000000000000000"
            />
          </div>

          <!-- DevEUI -->
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">
              DevEUI *
            </label>
            <input
              v-model="formData.dev_eui"
              type="text"
              required
              class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Ej: 0000000000000000"
            />
          </div>

          <!-- AppKey (solo lectura) -->
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">
              AppKey (No editable)
            </label>
            <input
              :value="formData.app_key ? formData.app_key.substring(0, 8) + '****' + formData.app_key.substring(formData.app_key.length - 8) : 'N/A'"
              type="text"
              disabled
              class="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-md text-gray-400 cursor-not-allowed"
            />
            <p class="text-xs text-gray-500 mt-1">Por seguridad, la AppKey no puede ser modificada</p>
          </div>

          <!-- Estado de comunicación -->
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">
              Estado de Comunicación
            </label>
            <div class="flex items-center space-x-3">
              <input
                v-model="formData.is_active_communication"
                type="checkbox"
                class="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
              />
              <span class="text-white">Activar comunicación</span>
            </div>
            <p class="text-xs text-gray-500 mt-1">Controla si el dispositivo puede enviar datos</p>
          </div>
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
              <label class="block text-sm font-medium text-gray-300 mb-2">
                TTN Region
              </label>
              <select
                v-model="formData.ttn_region"
                class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Seleccionar región</option>
                <option value="eu1">Europe 1 (eu1)</option>
                <option value="nam1">North America 1 (nam1)</option>
                <option value="au1">Australia 1 (au1)</option>
                <option value="as1">Asia 1 (as1)</option>
              </select>
              <p class="text-xs text-gray-500 mt-1">Región del servidor TTN</p>
            </div>

            <!-- TTN App ID -->
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">
                TTN Application ID
              </label>
              <input
                v-model="formData.ttn_app_id"
                type="text"
                class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="my-ttn-application"
              />
              <p class="text-xs text-gray-500 mt-1">ID de la aplicación en TTN</p>
            </div>

            <!-- TTN Access Key -->
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">
                TTN Access Key
              </label>
              <input
                v-model="formData.ttn_access_key"
                type="password"
                class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono"
                placeholder="••••••••••••••••"
              />
              <p class="text-xs text-gray-500 mt-1">Clave de acceso para la API TTN</p>
            </div>
          </div>
          
          <div class="mt-4 p-3 bg-blue-900/20 border border-blue-500/30 rounded-lg">
            <div class="flex items-start">
              <svg class="w-5 h-5 text-blue-400 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <div class="text-sm text-blue-300">
                <p class="font-medium mb-1">Configuración TTN</p>
                <p>Los campos TTN son necesarios para el control remoto de la bomba de riego a través de The Things Network.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Botones de acción -->
        <div class="flex items-center justify-end space-x-4 pt-6 border-t border-gray-700">
          <button
            type="button"
            @click="handleCancel"
            class="px-6 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-md transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            :disabled="isSaving"
            class="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white rounded-md transition-colors flex items-center"
          >
            <div v-if="isSaving" class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            {{ isSaving ? 'Guardando...' : 'Guardar Cambios' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template> 