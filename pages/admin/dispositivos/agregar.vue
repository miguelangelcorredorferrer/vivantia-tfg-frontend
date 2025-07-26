<script setup>
import { useAdminStore } from '~/stores/admin'
import { useToastNotifications } from '~/composables/useToastNotifications'
import DeviceAPI from '~/api/DeviceAPI'
import UserAPI from '~/api/UserAPI'

// Configurar middleware de administrador
definePageMeta({
  middleware: 'admin'
})

// Stores y composables
const adminStore = useAdminStore()
const { toast } = useToastNotifications()

// Estado del formulario
const formData = ref({
  user_id: '',
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

// Lista de usuarios disponibles
const users = ref([])

// Estados de carga y error
const isLoading = ref(false)
const isSaving = ref(false)
const error = ref(null)

// Cargar usuarios al montar el componente
onMounted(async () => {
  await loadUsers()
})

// Función para cargar usuarios
const loadUsers = async () => {
  try {
    isLoading.value = true
    error.value = null
    
    const response = await UserAPI.getAllUsers()
    users.value = response.data || []
    
    console.log('✅ Usuarios cargados exitosamente')
  } catch (err) {
    console.error('❌ Error cargando usuarios:', err)
    error.value = 'Error al cargar usuarios'
    toast.error('Error al cargar usuarios')
  } finally {
    isLoading.value = false
  }
}

// Función para generar AppKey aleatoria
const generateAppKey = () => {
  const chars = '0123456789ABCDEF'
  let result = ''
  for (let i = 0; i < 32; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  formData.value.app_key = result
}

// Función para generar DevEUI aleatorio
const generateDevEUI = () => {
  const chars = '0123456789ABCDEF'
  let result = ''
  for (let i = 0; i < 16; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  formData.value.dev_eui = result
}

// Función para guardar dispositivo
const handleSubmit = async () => {
  try {
    isSaving.value = true
    error.value = null
    
    // Validar campos obligatorios
    if (!formData.value.user_id || !formData.value.device_name || 
        !formData.value.enddevice_id || !formData.value.app_eui || 
        !formData.value.dev_eui || !formData.value.app_key) {
      throw new Error('Todos los campos obligatorios deben estar completos')
    }
    
    // Validar formato hexadecimal de AppEUI
    const appEuiRegex = /^[A-Fa-f0-9]{16}$/
    if (!appEuiRegex.test(formData.value.app_eui)) {
      throw new Error('AppEUI debe tener exactamente 16 caracteres hexadecimales (0-9, A-F)')
    }
    
    // Validar formato hexadecimal de DevEUI
    const devEuiRegex = /^[A-Fa-f0-9]{16}$/
    if (!devEuiRegex.test(formData.value.dev_eui)) {
      throw new Error('DevEUI debe tener exactamente 16 caracteres hexadecimales (0-9, A-F)')
    }
    
    // Validar formato hexadecimal de AppKey
    const appKeyRegex = /^[A-Fa-f0-9]{32}$/
    if (!appKeyRegex.test(formData.value.app_key)) {
      throw new Error('AppKey debe tener exactamente 32 caracteres hexadecimales (0-9, A-F)')
    }
    
    // Crear dispositivo
    await DeviceAPI.create(formData.value)
    
    toast.success('Dispositivo creado exitosamente')
    
    // Redirigir de vuelta a la lista de dispositivos
    await navigateTo('/admin/dispositivos')
    
  } catch (err) {
    console.error('❌ Error creando dispositivo:', err)
    error.value = err.message || 'Error al crear el dispositivo'
    toast.error(error.value)
  } finally {
    isSaving.value = false
  }
}

// Función para cancelar y volver
const handleCancel = () => {
  navigateTo('/admin/dispositivos')
}
</script>

<template>
  <div class="space-y-8">
    <!-- Header de la página -->
    <div class="mb-8">
      <div class="flex items-center space-x-3 mb-2">
        <div class="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
          </svg>
        </div>
        <div>
          <h1 class="text-3xl font-bold text-white">Panel de Administración</h1>
          <p class="text-gray-400">Bienvenido al centro de control del sistema Vivantia</p>
        </div>
      </div>
      <div class="mt-4">
        <h2 class="text-xl font-semibold text-white">Añadir Dispositivo</h2>
        <p class="text-gray-400 mt-1">Crear un nuevo dispositivo para un usuario</p>
      </div>
    </div>

    <!-- Loading state -->
    <div v-if="isLoading" class="flex items-center justify-center py-12">
      <div class="text-center">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-4"></div>
        <p class="text-gray-400">Cargando usuarios...</p>
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
        @click="loadUsers"
        class="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
      >
        Reintentar
      </button>
    </div>

    <!-- Formulario de creación -->
    <div v-else class="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Selección de usuario -->
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">
            Usuario Propietario *
          </label>
          <select
            v-model="formData.user_id"
            required
            class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Seleccionar usuario...</option>
            <option 
              v-for="user in users" 
              :key="user.id" 
              :value="user.id"
              class="bg-gray-700 text-white"
            >
              {{ user.name }} ({{ user.email }})
            </option>
          </select>
        </div>

        <!-- Campos del dispositivo -->
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
              pattern="[A-Fa-f0-9]{16}"
              maxlength="16"
              class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono"
              placeholder="Ej: 0000000000000000"
            />
            <p class="text-xs text-gray-500 mt-1">16 caracteres hexadecimales (0-9, A-F)</p>
          </div>

          <!-- DevEUI -->
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">
              DevEUI *
            </label>
            <div class="flex space-x-2">
              <input
                v-model="formData.dev_eui"
                type="text"
                required
                pattern="[A-Fa-f0-9]{16}"
                maxlength="16"
                class="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono"
                placeholder="Ej: 0000000000000000"
              />
              <button
                type="button"
                @click="generateDevEUI"
                class="px-3 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-md transition-colors text-sm"
                title="Generar DevEUI aleatorio"
              >
                Generar
              </button>
            </div>
            <p class="text-xs text-gray-500 mt-1">16 caracteres hexadecimales (0-9, A-F)</p>
          </div>

          <!-- AppKey -->
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">
              AppKey *
            </label>
            <div class="flex space-x-2">
              <input
                v-model="formData.app_key"
                type="text"
                required
                pattern="[A-Fa-f0-9]{32}"
                maxlength="32"
                class="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono"
                placeholder="Ej: 00000000000000000000000000000000"
              />
              <button
                type="button"
                @click="generateAppKey"
                class="px-3 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-md transition-colors text-sm"
                title="Generar AppKey aleatoria"
              >
                Generar
              </button>
            </div>
            <p class="text-xs text-gray-500 mt-1">32 caracteres hexadecimales (0-9, A-F)</p>
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
                <p class="font-medium mb-1">Configuración TTN (Opcional)</p>
                <p>Los campos TTN son necesarios para el control remoto de la bomba de riego. Puedes configurarlos ahora o más tarde desde la edición del dispositivo.</p>
              </div>
            </div>
          </div>
        </div>

        <div class="flex space-x-4">
          <button
            type="submit"
            class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
          >
            Guardar
          </button>
          <button
            @click="handleCancel"
            class="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md transition-colors"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>