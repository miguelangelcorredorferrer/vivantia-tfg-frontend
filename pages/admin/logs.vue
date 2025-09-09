<script setup>
import { ref, computed, onMounted } from 'vue'
import { useToastNotifications } from '~/composables/useToastNotifications'
import { AlertsIcon } from '~/assets/icons'
import AlertsTable from '~/components/Alerts/AlertsTable.vue'
import ConfirmDeleteModal from '~/components/Modals/ConfirmDeleteModal.vue'
import CleanOldAlertsModal from '~/components/Modals/CleanOldAlertsModal.vue'
import AlertAPI from '~/api/AlertAPI.js'

// Configurar middleware de administrador
definePageMeta({
  middleware: 'admin'
})

// Meta del documento
useHead({
  title: 'Logs del Sistema - Admin - VIVANTIA',
  meta: [
    { name: 'description', content: 'Panel de administración para gestionar logs y alertas del sistema' }
  ]
})

const { toast } = useToastNotifications()

// Filtros
const filters = ref({
  category: '',
  subcategory: '',
  severity: '',
  user: '',
  status: '',
  period: 'all'
})

// Estado
const loading = ref(false)
const alerts = ref([])
const totalSystemAlerts = ref(0)

// Estados de modales
const showDeleteModal = ref(false)
const showDeleteAllModal = ref(false)
const alertToDelete = ref(null)

// Cargar todas las alertas del sistema
const loadSystemAlerts = async () => {
  try {
    loading.value = true
    const response = await AlertAPI.getAllAlertsWithUsers()
    alerts.value = response.data || []
    totalSystemAlerts.value = alerts.value.length
  } catch (error) {
    console.error('Error al cargar alertas del sistema:', error)
    toast.error('Error al cargar las alertas del sistema')
    alerts.value = []
  } finally {
    loading.value = false
  }
}

// Computed properties
const availableSubcategories = computed(() => {
  const subcategoryMap = {
    'user': [
      { value: 'user_actions', label: 'Acciones de Usuario' }
    ],
    'environmental': [
      { value: 'temperature', label: 'Temperatura' },
      { value: 'humidity', label: 'Humedad Ambiental' },
      { value: 'moisture', label: 'Humedad del Suelo' }
    ],
    'device': [
      { value: 'device_status', label: 'Estado del Dispositivo' }
    ],
    'crop': [
      { value: 'crop_management', label: 'Gestión de Cultivos' }
    ],
    'irrigation': [
      { value: 'irrigation_control', label: 'Control de Riego' }
    ]
  }
  
  return subcategoryMap[filters.value.category] || []
})

const filteredAlerts = computed(() => {
  let filtered = alerts.value

  // Filtro por categoría
  if (filters.value.category) {
    filtered = filtered.filter(alert => alert.alert_type === filters.value.category)
  }

  // Filtro por subcategoría
  if (filters.value.subcategory) {
    filtered = filtered.filter(alert => {
      // Mapear los valores del select a los valores reales de alert_subtype
      const subcategoryMap = {
        'temperature': ['temperature_max_threshold'],
        'humidity': ['air_humidity_min_threshold', 'air_humidity_max_threshold'],
        'moisture': ['soil_humidity_min_threshold', 'soil_humidity_max_threshold'],
        'device_status': ['device_offline', 'device_online', 'device_added', 'device_deleted', 'device_edited', 'system_online', 'system_offline'],
        'irrigation_control': ['manual_started', 'emergency_stop', 'manual_cancelled', 'programmed_saved', 'programmed_reminder', 'programmed_schedule', 'programmed_cancelled', 'automatic_saved', 'automatic_activated_temperature', 'automatic_activated_soil_humidity', 'automatic_activated_air_humidity', 'automatic_deactivated_optimal_conditions', 'automatic_deactivated_soil_optimal', 'automatic_cancelled', 'irrigation_started', 'irrigation_ended', 'irrigation_cancelled', 'irrigation_paused', 'irrigation_resumed'],
        'user_actions': ['user_registered', 'user_logged_in', 'username_changed', 'password_changed', 'session_closed', 'api_key_copied'],
        'crop_management': ['crop_selected', 'crop_deselected', 'crop_edited', 'crop_deleted', 'crop_added']
      }
      
      const targetSubtypes = subcategoryMap[filters.value.subcategory] || []
      return targetSubtypes.includes(alert.alert_subtype)
    })
  }

  // Filtro por severidad
  if (filters.value.severity) {
    filtered = filtered.filter(alert => {
      // Asegurar que la comparación sea exacta
      return alert.severity && alert.severity.toLowerCase() === filters.value.severity.toLowerCase()
    })
  }

  // Filtro por usuario
  if (filters.value.user) {
    filtered = filtered.filter(alert => 
      alert.user_name?.toLowerCase().includes(filters.value.user.toLowerCase()) ||
      alert.user_email?.toLowerCase().includes(filters.value.user.toLowerCase())
    )
  }

  // Filtro por estado
  if (filters.value.status) {
    switch (filters.value.status) {
      case 'unread':
        filtered = filtered.filter(alert => !alert.is_resolved)
        break
      case 'read':
        filtered = filtered.filter(alert => alert.is_resolved)
        break
    }
  }

  // Filtro por período
  if (filters.value.period !== 'all') {
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
    const monthAgo = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate())

    filtered = filtered.filter(alert => {
      const alertDate = new Date(alert.created_at)
      switch (filters.value.period) {
        case 'today':
          return alertDate >= today
        case 'week':
          return alertDate >= weekAgo
        case 'month':
          return alertDate >= monthAgo
        default:
          return true
      }
    })
  }

  return filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
})

const unreadAlertsCount = computed(() => alerts.value.filter(alert => !alert.is_resolved).length)
const criticalAlertsCount = computed(() => alerts.value.filter(alert => alert.severity === 'error' || alert.severity === 'warning').length)
const usersWithAlerts = computed(() => {
  const uniqueUsers = new Set()
  alerts.value.forEach(alert => {
    if (alert.user_email) {
      uniqueUsers.add(alert.user_email)
    }
  })
  return uniqueUsers.size
})

// Métodos
const clearFilters = () => {
  filters.value = {
    category: '',
    subcategory: '',
    severity: '',
    user: '',
    status: '',
    period: 'all'
  }
}

const deleteAllSystemAlerts = () => {
  showDeleteAllModal.value = true
}

const confirmDeleteAllAlerts = async () => {
  try {
    const response = await AlertAPI.deleteAllSystemAlerts()
    await loadSystemAlerts()
    toast.success(`Alertas eliminadas del sistema`)
  } catch (error) {
    console.error('Error al eliminar todas las alertas:', error)
    toast.error('Error al eliminar todas las alertas del sistema')
  } finally {
    showDeleteAllModal.value = false
  }
}

const cancelDeleteAllAlerts = () => {
  showDeleteAllModal.value = false
}

const handleAlertResolved = async (alertId) => {
  try {
    await AlertAPI.resolveAlert(alertId)
    await loadSystemAlerts()
    toast.success('Alerta marcada como resuelta')
  } catch (error) {
    console.error('Error al marcar alerta como resuelta:', error)
    toast.error('Error al marcar alerta como resuelta')
  }
}

const handleAlertDeleted = (alertId) => {
  // Buscar la alerta para mostrar información en el modal
  const alert = alerts.value.find(a => a.id === alertId)
  alertToDelete.value = alert
  showDeleteModal.value = true
}

const confirmDeleteAlert = async () => {
  try {
    if (alertToDelete.value) {
      await AlertAPI.delete(alertToDelete.value.id)
      await loadSystemAlerts()
      toast.success('Alerta eliminada exitosamente')
    }
  } catch (error) {
    console.error('Error al eliminar alerta:', error)
    toast.error('Error al eliminar alerta')
  } finally {
    showDeleteModal.value = false
    alertToDelete.value = null
  }
}

const cancelDeleteAlert = () => {
  showDeleteModal.value = false
  alertToDelete.value = null
}

// Watcher para limpiar subcategoría cuando cambie la categoría
watch(() => filters.value.category, () => {
  filters.value.subcategory = ''
})

onMounted(() => {
  loadSystemAlerts()
})
</script>

<template>
  <div class="space-y-8">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="bg-gray-800 rounded-xl shadow-lg p-6 mb-8 border border-gray-700">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <div class="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center shadow-lg">
              <AlertsIcon />
            </div>
            <div>
              <h1 class="text-2xl font-bold text-white">Logs del Sistema</h1>
              <p class="text-gray-300">Panel de administración - Gestión completa de alertas del sistema</p>
            </div>
          </div>
          
          <!-- Estadísticas rápidas -->
          <div class="flex items-center space-x-6">
            <div class="text-center">
              <div class="text-2xl font-bold text-white">{{ totalSystemAlerts }}</div>
              <div class="text-sm text-gray-400">Total Sistema</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-orange-400">{{ unreadAlertsCount }}</div>
              <div class="text-sm text-gray-400">Sin Resolver</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-red-400">{{ criticalAlertsCount }}</div>
              <div class="text-sm text-gray-400">Críticas</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-blue-300">{{ usersWithAlerts }}</div>
              <div class="text-sm text-gray-400">Usuarios</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Filtros -->
      <div class="bg-gray-800 rounded-xl shadow-lg p-6 mb-8 border border-gray-700">
        <h2 class="text-lg font-semibold text-white mb-4">Filtros Avanzados</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <!-- Filtro por categoría -->
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">
              <div class="flex items-center space-x-2">
                <span>Categoría</span>
                <div class="flex items-center space-x-1">
                  <div class="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                  <span class="text-xs text-blue-400 font-medium">Filtro principal</span>
                </div>
              </div>
            </label>
            <div class="relative">
              <select 
                v-model="filters.category"
                class="w-full px-4 py-3 bg-gradient-to-r from-gray-700 to-gray-800 border-2 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-400 text-white transition-all duration-200 appearance-none border-gray-600 hover:border-gray-500 hover:from-gray-600 hover:to-gray-700"
              >
                <option value="" class="bg-gray-800 text-white">Todas las categorías</option>
                <option value="user" class="bg-gray-800 text-white hover:bg-gray-700">Usuario</option>
                <option value="environmental" class="bg-gray-800 text-white hover:bg-gray-700">Ambiental</option>
                <option value="device" class="bg-gray-800 text-white hover:bg-gray-700">Dispositivo</option>
                <option value="crop" class="bg-gray-800 text-white hover:bg-gray-700">Cultivo</option>
                <option value="irrigation" class="bg-gray-800 text-white hover:bg-gray-700">Riego</option>
              </select>
              <!-- Icono personalizado -->
              <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg 
                  class="w-5 h-5 text-gray-400 transition-transform duration-200"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
              <!-- Indicador de estado -->
              <div v-if="filters.category" class="absolute -top-1 -right-1">
                <div class="w-3 h-3 bg-blue-400 rounded-full border-2 border-gray-800"></div>
              </div>
            </div>
          </div>

          <!-- Filtro por subcategoría -->
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">
              <div class="flex items-center space-x-2">
                <span>Subcategoría</span>
                <div v-if="!filters.category" class="flex items-center space-x-1">
                  <div class="w-1.5 h-1.5 bg-orange-400 rounded-full animate-pulse"></div>
                  <span class="text-xs text-orange-400 font-medium">Selecciona categoría</span>
                </div>
              </div>
            </label>
            <div class="relative">
              <select 
                v-model="filters.subcategory"
                class="w-full px-4 py-3 bg-gradient-to-r from-gray-700 to-gray-800 border-2 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-400 text-white transition-all duration-200 appearance-none"
                :class="{ 
                  'opacity-60 cursor-not-allowed border-gray-500': !filters.category,
                  'border-gray-600 hover:border-gray-500 hover:from-gray-600 hover:to-gray-700': filters.category
                }"
                :disabled="!filters.category"
              >
                <option value="" class="bg-gray-800 text-white">
                  {{ filters.category ? 'Todas las subcategorías' : 'Selecciona una categoría primero' }}
                </option>
                <option 
                  v-for="subcategory in availableSubcategories" 
                  :key="subcategory.value" 
                  :value="subcategory.value"
                  class="bg-gray-800 text-white hover:bg-gray-700"
                >
                  {{ subcategory.label }}
                </option>
              </select>
              <!-- Icono personalizado -->
              <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg 
                  class="w-5 h-5 text-gray-400 transition-transform duration-200"
                  :class="{ 'rotate-180': filters.category }"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
              <!-- Indicador de estado -->
              <div v-if="filters.category" class="absolute -top-1 -right-1">
                <div class="w-3 h-3 bg-green-400 rounded-full border-2 border-gray-800 animate-pulse"></div>
              </div>
            </div>
          </div>

          <!-- Filtro por severidad -->
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">
              <div class="flex items-center space-x-2">
                <span>Severidad</span>
                <div class="flex items-center space-x-1">
                  <div class="w-1.5 h-1.5 bg-red-400 rounded-full"></div>
                  <span class="text-xs text-red-400 font-medium">Nivel de urgencia</span>
                </div>
              </div>
            </label>
            <div class="relative">
              <select 
                v-model="filters.severity"
                class="w-full px-4 py-3 bg-gradient-to-r from-gray-700 to-gray-800 border-2 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-400 text-white transition-all duration-200 appearance-none border-gray-600 hover:border-gray-500 hover:from-gray-600 hover:to-gray-700"
              >
                <option value="" class="bg-gray-800 text-white">Todas las severidades</option>
                <option value="info" class="bg-gray-800 text-white hover:bg-gray-700">Información</option>
                <option value="success" class="bg-gray-800 text-white hover:bg-gray-700">Éxito</option>
                <option value="warning" class="bg-gray-800 text-white hover:bg-gray-700">Advertencia</option>
                <option value="error" class="bg-gray-800 text-white hover:bg-gray-700">Error</option>
              </select>
              <!-- Icono personalizado -->
              <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg 
                  class="w-5 h-5 text-gray-400 transition-transform duration-200"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
              <!-- Indicador de estado -->
              <div v-if="filters.severity" class="absolute -top-1 -right-1">
                <div class="w-3 h-3 bg-red-400 rounded-full border-2 border-gray-800"></div>
              </div>
            </div>
          </div>

          <!-- Filtro por usuario -->
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">
              <div class="flex items-center space-x-2">
                <span>Usuario</span>
                <div class="flex items-center space-x-1">
                  <div class="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                  <span class="text-xs text-purple-400 font-medium">Búsqueda</span>
                </div>
              </div>
            </label>
            <div class="relative">
              <input
                v-model="filters.user"
                type="text"
                placeholder="Buscar por nombre o email..."
                class="w-full px-4 py-3 bg-gradient-to-r from-gray-700 to-gray-800 border-2 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-400 text-white transition-all duration-200 border-gray-600 hover:border-gray-500 hover:from-gray-600 hover:to-gray-700 placeholder-gray-400"
              >
              <!-- Indicador de estado -->
              <div v-if="filters.user" class="absolute -top-1 -right-1">
                <div class="w-3 h-3 bg-purple-400 rounded-full border-2 border-gray-800"></div>
              </div>
            </div>
          </div>

          <!-- Filtro por estado -->
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">
              <div class="flex items-center space-x-2">
                <span>Estado</span>
                <div class="flex items-center space-x-1">
                  <div class="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
                  <span class="text-xs text-cyan-400 font-medium">Estado de lectura</span>
                </div>
              </div>
            </label>
            <div class="relative">
              <select 
                v-model="filters.status"
                class="w-full px-4 py-3 bg-gradient-to-r from-gray-700 to-gray-800 border-2 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-400 text-white transition-all duration-200 appearance-none border-gray-600 hover:border-gray-500 hover:from-gray-600 hover:to-gray-700"
              >
                <option value="" class="bg-gray-800 text-white">Todos los estados</option>
                <option value="unread" class="bg-gray-800 text-white hover:bg-gray-700">Sin Resolver</option>
                <option value="read" class="bg-gray-800 text-white hover:bg-gray-700">Resueltas</option>
              </select>
              <!-- Icono personalizado -->
              <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg 
                  class="w-5 h-5 text-gray-400 transition-transform duration-200"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
              <!-- Indicador de estado -->
              <div v-if="filters.status" class="absolute -top-1 -right-1">
                <div class="w-3 h-3 bg-cyan-400 rounded-full border-2 border-gray-800"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Botones de acción -->
        <div class="flex items-center justify-between mt-6">
          <div class="flex items-center space-x-3">
            <button
              @click="clearFilters"
              class="px-4 py-2 bg-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Limpiar Filtros
            </button>
            <button
              @click="loadSystemAlerts"
              class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Actualizar
            </button>
            <button
              @click="deleteAllSystemAlerts"
              class="px-4 py-2 bg-red-700 text-white rounded-lg hover:bg-red-800 transition-colors border-2 border-red-600"
              title="⚠️ PELIGRO: Elimina TODAS las alertas del sistema"
            >
              🗑️ Eliminar TODAS
            </button>
          </div>
          
          <div class="text-sm text-gray-400">
            {{ filteredAlerts.length }} de {{ totalSystemAlerts }} alertas mostradas
          </div>
        </div>
      </div>

      <!-- Tabla de Alertas del Sistema -->
      <div v-if="loading" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
        <p class="text-gray-400 mt-2">Cargando logs del sistema...</p>
      </div>

      <AlertsTable 
        v-else
        :alerts="filteredAlerts"
        :showDeleteButton="true"
        :showUserInfo="true"
        @alert-resolved="handleAlertResolved"
        @alert-deleted="handleAlertDeleted"
      />
    </div>

    <!-- Modales -->
    <ConfirmDeleteModal
      :isOpen="showDeleteModal"
      title="Eliminar Alerta"
      :message="alertToDelete ? `¿Estás seguro de que deseas eliminar la alerta '${alertToDelete.title}' del usuario ${alertToDelete.user_name || 'N/A'}?` : ''"
      warningMessage="Esta acción no se puede deshacer."
      confirmText="Sí, eliminar"
      @confirm="confirmDeleteAlert"
      @cancel="cancelDeleteAlert"
    />

    <ConfirmDeleteModal
      :isOpen="showDeleteAllModal"
      title="⚠️ ELIMINAR TODAS LAS ALERTAS"
      message="Esto eliminará PERMANENTEMENTE todas las alertas del sistema de TODOS los usuarios."
      warningMessage="Esta es una acción IRREVERSIBLE que afectará a todo el sistema. Solo procede si estás completamente seguro."
      confirmText="Sí, eliminar TODAS"
      @confirm="confirmDeleteAllAlerts"
      @cancel="cancelDeleteAllAlerts"
    />
  </div>
</template>

<style scoped>
/* Estilos personalizados para los filtros */
select {
  background-image: none !important;
  background-color: #374151 !important;
}

select option {
  background-color: #1f2937 !important;
  color: white !important;
}

select option:hover {
  background-color: #374151 !important;
}

/* Animación para los indicadores de estado */
@keyframes pulse-glow {
  0%, 100% {
    box-shadow: 0 0 5px currentColor;
  }
  50% {
    box-shadow: 0 0 15px currentColor, 0 0 25px currentColor;
  }
}

/* Efecto hover para los selects */
select:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

/* Animación para el icono de flecha */
select:focus + div svg {
  transform: rotate(180deg);
}

/* Estilos para los indicadores de estado */
.absolute.-top-1.-right-1 > div {
  animation: pulse-glow 2s ease-in-out infinite;
}

/* Efecto de transición suave para todos los elementos */
* {
  transition: all 0.2s ease-in-out;
}

/* Estilo especial para el filtro de subcategoría cuando está deshabilitado */
select:disabled {
  background: linear-gradient(135deg, #374151 0%, #4B5563 100%);
  cursor: not-allowed;
}

select:disabled:hover {
  transform: none;
  box-shadow: none;
}
</style> 