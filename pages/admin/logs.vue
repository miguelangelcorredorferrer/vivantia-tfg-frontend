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
const filteredAlerts = computed(() => {
  let filtered = alerts.value

  // Filtro por categoría
  if (filters.value.category) {
    filtered = filtered.filter(alert => alert.alert_type === filters.value.category)
  }

  // Filtro por severidad
  if (filters.value.severity) {
    filtered = filtered.filter(alert => alert.severity === filters.value.severity)
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

onMounted(() => {
  loadSystemAlerts()
})
</script>

<template>
  <div class="space-y-8">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="bg-gradient-to-r from-red-800 to-red-900 rounded-xl shadow-lg p-6 mb-8 border border-red-700">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <div class="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg">
              <AlertsIcon />
            </div>
            <div>
              <h1 class="text-2xl font-bold text-white">Logs del Sistema</h1>
              <p class="text-red-100">Panel de administración - Gestión completa de alertas del sistema</p>
            </div>
          </div>
          
          <!-- Estadísticas del sistema -->
          <div class="flex items-center space-x-6">
            <div class="text-center">
              <div class="text-2xl font-bold text-white">{{ totalSystemAlerts }}</div>
              <div class="text-sm text-red-200">Total Sistema</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-orange-400">{{ unreadAlertsCount }}</div>
              <div class="text-sm text-red-200">Sin Resolver</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-red-300">{{ criticalAlertsCount }}</div>
              <div class="text-sm text-red-200">Críticas</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-blue-300">{{ usersWithAlerts }}</div>
              <div class="text-sm text-red-200">Usuarios</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Filtros de Administrador -->
      <div class="bg-gray-800 rounded-xl shadow-lg p-6 mb-8 border border-gray-700">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-semibold text-white">Filtros Avanzados</h2>
          <div class="flex items-center space-x-2">
            <div class="w-3 h-3 bg-red-500 rounded-full"></div>
            <span class="text-sm text-gray-400">Panel de Administrador</span>
          </div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <!-- Filtro por categoría -->
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Categoría</label>
            <select 
              v-model="filters.category"
              class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-white"
            >
              <option value="">Todas las categorías</option>
              <option value="user">Usuario</option>
              <option value="environmental">Ambiental</option>
              <option value="device">Dispositivo</option>
              <option value="crop">Cultivo</option>
              <option value="irrigation">Riego</option>
            </select>
          </div>

          <!-- Filtro por severidad -->
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Severidad</label>
            <select 
              v-model="filters.severity"
              class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-white"
            >
              <option value="">Todas las severidades</option>
              <option value="info">Información</option>
              <option value="success">Éxito</option>
              <option value="warning">Advertencia</option>
              <option value="error">Error</option>
            </select>
          </div>

          <!-- Filtro por usuario -->
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Usuario</label>
            <input
              v-model="filters.user"
              type="text"
              placeholder="Buscar por nombre o email..."
              class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-white placeholder-gray-400"
            >
          </div>

          <!-- Filtro por estado -->
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Estado</label>
            <select 
              v-model="filters.status"
              class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-white"
            >
              <option value="">Todos los estados</option>
              <option value="unread">Sin Resolver</option>
              <option value="read">Resueltas</option>
            </select>
          </div>

          <!-- Filtro por fecha -->
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Período</label>
            <select 
              v-model="filters.period"
              class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-white"
            >
              <option value="all">Todo el tiempo</option>
              <option value="today">Hoy</option>
              <option value="week">Esta semana</option>
              <option value="month">Este mes</option>
            </select>
          </div>
        </div>

        <!-- Botones de acción de administrador -->
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