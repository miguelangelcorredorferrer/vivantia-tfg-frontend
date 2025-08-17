<script setup>
import { ref, computed, onMounted } from 'vue'
import { useToastNotifications } from '~/composables/useToastNotifications'
import { AlertsIcon } from '~/assets/icons'
import AlertsTable from '~/components/Alerts/AlertsTable.vue'
import AlertAPI from '~/api/AlertAPI.js'

// Configurar middleware
definePageMeta({
  middleware: ['auth', 'visitor-block']
})

// Meta del documento
useHead({
  title: 'Alertas - VIVANTIA',
  meta: [
    { name: 'description', content: 'Gestiona y revisa todas las alertas del sistema' }
  ]
})

const { toast } = useToastNotifications()

// Filtros
const filters = ref({
  category: '',
  subcategory: '',
  severity: '',
  status: '',
  period: 'all'
})

// Estado
const loading = ref(false)
const alerts = ref([])

// Cargar alertas
const loadAlerts = async () => {
  try {
    loading.value = true
    const response = await AlertAPI.getMyAlerts()
    alerts.value = response.data || []
  } catch (error) {
    console.error('Error al cargar alertas:', error)
    toast.error('Error al cargar las alertas')
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

  // Filtro por subcategoría
  if (filters.value.subcategory) {
    filtered = filtered.filter(alert => alert.alert_subtype === filters.value.subcategory)
  }

  // Filtro por severidad
  if (filters.value.severity) {
    filtered = filtered.filter(alert => alert.severity === filters.value.severity)
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

const totalAlerts = computed(() => alerts.value.length)
const unreadAlerts = computed(() => alerts.value.filter(alert => !alert.is_resolved).length)
const criticalAlerts = computed(() => alerts.value.filter(alert => alert.severity === 'error' || alert.severity === 'warning').length)

// Métodos
const clearFilters = () => {
  filters.value = {
    category: '',
    subcategory: '',
    severity: '',
    status: '',
    period: 'all'
  }
}

const markAllAsRead = async () => {
  try {
    await AlertAPI.resolveAllAlertsByUserId()
    await loadAlerts()
    toast.success('Todas las alertas han sido marcadas como resueltas')
  } catch (error) {
    console.error('Error al marcar alertas como resueltas:', error)
    toast.error('Error al marcar alertas como resueltas')
  }
}

const handleAlertResolved = async (alertId) => {
  try {
    await AlertAPI.resolveAlert(alertId)
    await loadAlerts()
  } catch (error) {
    console.error('Error al marcar alerta como resuelta:', error)
    toast.error('Error al marcar alerta como resuelta')
  }
}

onMounted(() => {
  loadAlerts()
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
              <h1 class="text-2xl font-bold text-white">Alertas del Sistema</h1>
              <p class="text-gray-300">Gestiona y revisa todas las notificaciones del sistema</p>
            </div>
          </div>
          
          <!-- Estadísticas rápidas -->
          <div class="flex items-center space-x-6">
            <div class="text-center">
              <div class="text-2xl font-bold text-white">{{ totalAlerts }}</div>
              <div class="text-sm text-gray-400">Total</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-orange-400">{{ unreadAlerts }}</div>
              <div class="text-sm text-gray-400">Nuevas</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-red-400">{{ criticalAlerts }}</div>
              <div class="text-sm text-gray-400">Críticas</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Filtros -->
      <div class="bg-gray-800 rounded-xl shadow-lg p-6 mb-8 border border-gray-700">
        <h2 class="text-lg font-semibold text-white mb-4">Filtros</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <!-- Filtro por categoría -->
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Categoría</label>
            <select 
              v-model="filters.category"
              class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white"
            >
              <option value="">Todas las categorías</option>
              <option value="user">Usuario</option>
              <option value="environmental">Ambiental</option>
              <option value="device">Dispositivo</option>
              <option value="crop">Cultivo</option>
              <option value="irrigation">Riego</option>
            </select>
          </div>

          <!-- Filtro por subcategoría -->
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Subcategoría</label>
            <select 
              v-model="filters.subcategory"
              class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white"
            >
              <option value="">Todas las subcategorías</option>
              <option value="temperature">Temperatura</option>
              <option value="humidity">Humedad</option>
              <option value="moisture">Humedad del Suelo</option>
              <option value="water_level">Nivel de Agua</option>
              <option value="pressure">Presión</option>
            </select>
          </div>

          <!-- Filtro por severidad -->
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Severidad</label>
            <select 
              v-model="filters.severity"
              class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white"
            >
              <option value="">Todas las severidades</option>
              <option value="info">Información</option>
              <option value="success">Éxito</option>
              <option value="warning">Advertencia</option>
              <option value="error">Error</option>
            </select>
          </div>

          <!-- Filtro por estado -->
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Estado</label>
            <select 
              v-model="filters.status"
              class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white"
            >
              <option value="">Todos los estados</option>
              <option value="unread">Nuevas</option>
              <option value="read">Resueltas</option>
            </select>
          </div>

          <!-- Filtro por fecha -->
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Período</label>
            <select 
              v-model="filters.period"
              class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white"
            >
              <option value="all">Todo el tiempo</option>
              <option value="today">Hoy</option>
              <option value="week">Esta semana</option>
              <option value="month">Este mes</option>
            </select>
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
              @click="markAllAsRead"
              class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Marcar Todo como Resuelto
            </button>
          </div>
          
          <div class="text-sm text-gray-400">
            {{ filteredAlerts.length }} alertas encontradas
          </div>
        </div>
      </div>

      <!-- Tabla de Alertas -->
      <AlertsTable 
        :alerts="filteredAlerts"
        @alert-resolved="handleAlertResolved"
      />
    </div>
  </div>
</template> 