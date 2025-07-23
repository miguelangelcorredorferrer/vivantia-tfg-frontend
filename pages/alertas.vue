<script setup>
import { ref, computed, onMounted } from 'vue'
import { useToastNotifications } from '~/composables/useToastNotifications'
import { AlertsIcon } from '~/assets/icons'
import AlertsTable from '~/components/Alerts/AlertsTable.vue'

// Configurar middleware de autenticación
definePageMeta({
  middleware: 'auth'
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

// Alertas de ejemplo
const alerts = ref([
  // Alertas de Usuario
  {
    id: 1,
    user_id: 1,
    alert_type: 'user',
    alert_subtype: 'user_registered',
    severity: 'success',
    title: 'Registro exitoso',
    message: 'Tu cuenta ha sido creada correctamente',
    is_read: true,
    is_resolved: true,
    created_at: '2024-01-10T09:30:00Z'
  },
  {
    id: 2,
    user_id: 1,
    alert_type: 'user',
    alert_subtype: 'user_logged_in',
    severity: 'info',
    title: 'Sesión iniciada',
    message: 'Has iniciado sesión correctamente',
    is_read: false,
    is_resolved: false,
    created_at: '2024-01-15T14:20:00Z'
  },
  {
    id: 3,
    user_id: 1,
    alert_type: 'user',
    alert_subtype: 'username_changed',
    severity: 'info',
    title: 'Nombre actualizado',
    message: 'Tu nombre de usuario ha sido actualizado',
    is_read: false,
    is_resolved: false,
    created_at: '2024-01-15T15:45:00Z',
    metadata: { old_username: 'usuario_antiguo', new_username: 'nuevo_usuario' }
  },

  // Alertas Ambientales
  {
    id: 4,
    user_id: 1,
    alert_type: 'environmental',
    alert_subtype: 'temperature_max_threshold',
    subcategory: 'temperature',
    severity: 'warning',
    title: 'Temperatura crítica',
    message: 'La temperatura ha alcanzado el umbral máximo',
    is_read: false,
    is_resolved: false,
    created_at: '2024-01-15T16:30:00Z',
    metadata: { temperature: 32.5, threshold: 30.0, device_id: 1 }
  },
  {
    id: 5,
    user_id: 1,
    alert_type: 'environmental',
    alert_subtype: 'humidity_min_threshold',
    subcategory: 'humidity',
    severity: 'warning',
    title: 'Humedad baja',
    message: 'La humedad ha alcanzado el umbral mínimo',
    is_read: false,
    is_resolved: false,
    created_at: '2024-01-15T17:15:00Z',
    metadata: { humidity: 25.0, threshold: 30.0, device_id: 1 }
  },

  // Alertas de Dispositivos
  {
    id: 6,
    user_id: 1,
    alert_type: 'device',
    alert_subtype: 'device_added',
    severity: 'success',
    title: 'Dispositivo agregado',
    message: 'El dispositivo ha sido agregado exitosamente',
    is_read: true,
    is_resolved: true,
    created_at: '2024-01-12T10:00:00Z',
    metadata: { device_name: 'Sensor Principal', device_id: 1 }
  },
  {
    id: 7,
    user_id: 1,
    alert_type: 'device',
    alert_subtype: 'api_key_copied',
    severity: 'success',
    title: 'Clave API copiada',
    message: 'La clave API ha sido copiada al portapapeles',
    is_read: false,
    is_resolved: false,
    created_at: '2024-01-15T18:00:00Z'
  },
  {
    id: 8,
    user_id: 1,
    alert_type: 'device',
    alert_subtype: 'device_offline',
    severity: 'error',
    title: 'Dispositivo desconectado',
    message: 'El dispositivo ha dejado de enviar datos',
    is_read: false,
    is_resolved: false,
    created_at: '2024-01-15T19:30:00Z',
    metadata: { device_name: 'Sensor Principal', last_seen: '2024-01-15T18:45:00Z' }
  },

  // Alertas de Cultivos
  {
    id: 9,
    user_id: 1,
    alert_type: 'crop',
    alert_subtype: 'crop_selected',
    severity: 'success',
    title: 'Cultivo seleccionado',
    message: 'El cultivo ha sido seleccionado para riego',
    is_read: true,
    is_resolved: true,
    created_at: '2024-01-14T08:00:00Z',
    metadata: { crop_name: 'Tomate Cherry', crop_id: 1 }
  },
  {
    id: 10,
    user_id: 1,
    alert_type: 'crop',
    alert_subtype: 'crop_added',
    severity: 'success',
    title: 'Cultivo agregado',
    message: 'El cultivo ha sido agregado al sistema',
    is_read: false,
    is_resolved: false,
    created_at: '2024-01-15T20:00:00Z',
    metadata: { crop_name: 'Lechuga', crop_id: 2 }
  },

  // Alertas de Riego
  {
    id: 11,
    user_id: 1,
    alert_type: 'irrigation',
    alert_subtype: 'manual_started',
    subcategory: 'moisture',
    severity: 'info',
    title: 'Riego manual iniciado',
    message: 'Se ha iniciado un riego manual',
    is_read: true,
    is_resolved: true,
    created_at: '2024-01-15T09:00:00Z',
    metadata: { duration_minutes: 15, crop_name: 'Tomate Cherry' }
  },
  {
    id: 12,
    user_id: 1,
    alert_type: 'irrigation',
    alert_subtype: 'programmed_saved',
    subcategory: 'moisture',
    severity: 'success',
    title: 'Riego programado configurado',
    message: 'El riego programado ha sido configurado exitosamente',
    is_read: false,
    is_resolved: false,
    created_at: '2024-01-15T21:00:00Z',
    metadata: { scheduled_date: '2024-01-20', scheduled_time: '08:00', frequency: 'daily' }
  },
  {
    id: 13,
    user_id: 1,
    alert_type: 'irrigation',
    alert_subtype: 'programmed_reminder',
    subcategory: 'moisture',
    severity: 'warning',
    title: 'Riego programado en 5 minutos',
    message: 'Tu riego programado comenzará en 5 minutos',
    is_read: false,
    is_resolved: false,
    created_at: '2024-01-15T22:00:00Z',
    metadata: { scheduled_time: '08:00', crop_name: 'Tomate Cherry' }
  }
])

// Computed properties
const filteredAlerts = computed(() => {
  let filtered = alerts.value

  // Filtro por categoría
  if (filters.value.category) {
    filtered = filtered.filter(alert => alert.alert_type === filters.value.category)
  }

  // Filtro por subcategoría
  if (filters.value.subcategory) {
    filtered = filtered.filter(alert => alert.subcategory === filters.value.subcategory)
  }

  // Filtro por severidad
  if (filters.value.severity) {
    filtered = filtered.filter(alert => alert.severity === filters.value.severity)
  }

  // Filtro por estado
  if (filters.value.status) {
    switch (filters.value.status) {
      case 'unread':
        filtered = filtered.filter(alert => !alert.is_read)
        break
      case 'read':
        filtered = filtered.filter(alert => alert.is_read && !alert.is_resolved)
        break
      case 'resolved':
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
const unreadAlerts = computed(() => alerts.value.filter(alert => !alert.is_read).length)
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

const markAllAsRead = () => {
  alerts.value.forEach(alert => {
    alert.is_read = true
  })
  toast.success('Todas las alertas han sido marcadas como resueltas')
}

onMounted(() => {
  // Cargar alertas desde la API (simulado)
  console.log('Página de alertas cargada')
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
      />
    </div>
  </div>
</template> 