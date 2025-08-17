<template>
  <BaseCard title="Alertas del Sistema">
    <template #header-actions>
      <div class="flex items-center space-x-4">
        <div class="flex items-center space-x-2">
          <span class="text-sm text-gray-300 font-bold">Total: {{ alerts.length }}</span>
          <span v-if="unreadCount > 0" class="text-xs text-orange-500 bg-orange-900/30 px-2 py-1 rounded-full">
            {{ unreadCount }} nuevas
          </span>
        </div>
      </div>
    </template>

    <div class="overflow-x-auto">
      <div v-if="alerts.length === 0" class="text-center py-12">
        <AlertsIcon class="mx-auto mb-4 opacity-50" />
        <h3 class="text-lg font-medium text-white mb-2">No se encontraron alertas</h3>
        <p class="text-gray-400">Intenta ajustar los filtros para encontrar alertas</p>
      </div>

      <table v-else class="w-full text-sm text-left">
        <thead class="text-xs text-gray-300 uppercase bg-gray-800/50 border-b border-gray-600">
          <tr>
            <th scope="col" class="px-6 py-4 font-medium">Alerta</th>
            <th scope="col" class="px-6 py-4 font-medium">Categoría</th>
            <th scope="col" class="px-6 py-4 font-medium">Subcategoría</th>
            <th scope="col" class="px-6 py-4 font-medium text-center">Severidad</th>
            <th scope="col" class="px-6 py-4 font-medium text-center">Estado</th>
            <th scope="col" class="px-6 py-4 font-medium text-center">Fecha</th>
            <th scope="col" class="px-6 py-4 font-medium text-center">Acciones</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-600">
          <tr 
            v-for="alert in alerts" 
            :key="alert.id"
            class="hover:bg-gray-800/30 transition-colors duration-150"
          >
            <!-- Alerta -->
            <td class="px-6 py-4">
              <div class="flex items-start">
                <div class="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center mr-4 relative"
                     :class="getSeverityColor(alert.severity)">
                  <component :is="getAlertIcon(alert.alert_type)" class="w-5 h-5 text-white" />
                  <!-- Punto parpadeante para alertas no resueltas -->
                  <div v-if="!alert.is_resolved" 
                       class="absolute -top-1 -left-1 w-3 h-3 bg-orange-400 rounded-full animate-pulse"></div>
                </div>
                <div class="flex-1">
                  <div class="font-medium text-white mb-1">{{ alert.title }}</div>
                  <div class="text-sm text-gray-400">{{ alert.message }}</div>
                  <div v-if="alert.metadata" class="text-xs text-gray-500 mt-1">
                    {{ getMetadataText(alert.metadata) }}
                  </div>
                </div>
              </div>
            </td>

            <!-- Categoría -->
            <td class="px-6 py-4">
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                    :class="getCategoryColor(alert.alert_type)">
                {{ getCategoryLabel(alert.alert_type) }}
              </span>
            </td>

            <!-- Subcategoría -->
            <td class="px-6 py-4">
              <span v-if="alert.formatted_subtype" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                    :class="getSubcategoryColor(alert.alert_subtype)">
                {{ alert.formatted_subtype }}
              </span>
            </td>

            <!-- Severidad -->
            <td class="px-6 py-4 text-center">
              <div class="flex items-center justify-center">
                <div 
                  class="flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium"
                  :class="getSeverityBadgeColor(alert.severity)"
                >
                  <div 
                    class="w-2 h-2 rounded-full"
                    :class="getSeverityDotColor(alert.severity)"
                  ></div>
                  <span>{{ getSeverityLabel(alert.severity) }}</span>
                </div>
              </div>
            </td>

            <!-- Estado -->
            <td class="px-6 py-4 text-center">
              <div class="flex flex-col items-center space-y-1">
                <div 
                  class="flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium"
                  :class="getStatusColor(alert)"
                >
                  <div 
                    class="w-2 h-2 rounded-full"
                    :class="getStatusDotColor(alert)"
                  ></div>
                  <span>{{ getStatusLabel(alert) }}</span>
                </div>
                <span v-if="!alert.is_resolved" class="text-xs text-orange-400 font-medium">
                  Nueva
                </span>
              </div>
            </td>

            <!-- Fecha -->
            <td class="px-6 py-4 text-center">
              <div class="text-gray-300">
                <div class="text-sm font-medium">{{ formatDate(alert.created_at) }}</div>
                <div class="text-xs text-gray-500">{{ formatTime(alert.created_at) }}</div>
              </div>
            </td>

            <!-- Acciones -->
            <td class="px-6 py-4 text-center">
              <button
                v-if="!alert.is_resolved"
                @click="markAsResolved(alert)"
                class="inline-flex items-center px-3 py-1 rounded-md text-xs font-medium bg-green-600 text-white hover:bg-green-700 transition-colors"
                title="Marcar como resuelta"
              >
                <CheckIcon class="w-3 h-3 mr-1" />
                Resolver
              </button>
              <span v-else class="text-xs text-gray-500">
                Resuelta
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </BaseCard>
</template>

<script setup>
import { computed } from 'vue'
import { useToastNotifications } from '~/composables/useToastNotifications'
import { 
  AlertsIcon, 
  UserIcon,
  ThermometerIcon,
  DeviceIcon,
  PlantIcon,
  WateringIcon,
  CheckIcon
} from '~/assets/icons'
import BaseCard from '../Cards/BaseCard.vue'

const props = defineProps({
  alerts: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['alert-resolved'])

const { toast } = useToastNotifications()

// Computed
const unreadCount = computed(() => {
  return props.alerts.filter(alert => !alert.is_resolved).length
})

// Métodos
const getSeverityColor = (severity) => {
  const colors = {
    info: 'bg-blue-500',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    error: 'bg-red-500'
  }
  return colors[severity] || 'bg-gray-500'
}

const getSeverityBadgeColor = (severity) => {
  const colors = {
    info: 'bg-blue-900/30 text-blue-400 border border-blue-500/30',
    success: 'bg-green-900/30 text-green-400 border border-green-500/30',
    warning: 'bg-yellow-900/30 text-yellow-400 border border-yellow-500/30',
    error: 'bg-red-900/30 text-red-400 border border-red-500/30'
  }
  return colors[severity] || 'bg-gray-700 text-gray-400 border border-gray-600'
}

const getSeverityDotColor = (severity) => {
  const colors = {
    info: 'bg-blue-400',
    success: 'bg-green-400',
    warning: 'bg-yellow-400',
    error: 'bg-red-400'
  }
  return colors[severity] || 'bg-gray-500'
}

const getSeverityLabel = (severity) => {
  const labels = {
    info: 'Info',
    success: 'Éxito',
    warning: 'Advertencia',
    error: 'Error'
  }
  return labels[severity] || 'Desconocido'
}

const getCategoryColor = (category) => {
  const colors = {
    user: 'bg-purple-900/30 text-purple-300 border border-purple-500/30',
    environmental: 'bg-orange-900/30 text-orange-300 border border-orange-500/30',
    device: 'bg-blue-900/30 text-blue-300 border border-blue-500/30',
    crop: 'bg-green-900/30 text-green-300 border border-green-500/30',
    irrigation: 'bg-cyan-900/30 text-cyan-300 border border-cyan-500/30'
  }
  return colors[category] || 'bg-gray-700 text-gray-300 border border-gray-600'
}

const getCategoryLabel = (category) => {
  const labels = {
    user: 'Usuario',
    environmental: 'Ambiental',
    device: 'Dispositivo',
    crop: 'Cultivo',
    irrigation: 'Riego'
  }
  return labels[category] || 'Desconocido'
}

const getSubcategoryColor = (subcategory) => {
  const colors = {
    temperature: 'bg-red-900/30 text-red-300 border border-red-500/30',
    humidity: 'bg-blue-900/30 text-blue-300 border border-blue-500/30',
    moisture: 'bg-green-900/30 text-green-300 border border-green-500/30',
    water_level: 'bg-purple-900/30 text-purple-300 border border-purple-500/30',
    pressure: 'bg-orange-900/30 text-orange-300 border border-orange-500/30'
  }
  return colors[subcategory] || 'bg-gray-700 text-gray-300 border border-gray-600'
}

const getSubcategoryLabel = (subcategory) => {
  const labels = {
    temperature: 'Temperatura',
    humidity: 'Humedad',
    moisture: 'Humedad del Suelo',
    water_level: 'Nivel de Agua',
    pressure: 'Presión'
  }
  return labels[subcategory] || 'Desconocido'
}

const getAlertIcon = (category) => {
  const icons = {
    user: UserIcon,
    environmental: ThermometerIcon,
    device: DeviceIcon,
    crop: PlantIcon,
    irrigation: WateringIcon
  }
  return icons[category] || AlertsIcon
}

const getStatusColor = (alert) => {
  if (alert.is_resolved) {
    return 'bg-gray-700 text-gray-300 border border-gray-600'
  } else {
    return 'bg-orange-900/30 text-orange-400 border border-orange-500/30'
  }
}

const getStatusDotColor = (alert) => {
  if (alert.is_resolved) {
    return 'bg-gray-400'
  } else {
    return 'bg-orange-400'
  }
}

const getStatusLabel = (alert) => {
  if (alert.is_resolved) {
    return 'Resuelta'
  } else {
    return 'Nueva'
  }
}

const getMetadataText = (metadata) => {
  if (metadata.crop_name) {
    return `Cultivo: ${metadata.crop_name}`
  } else if (metadata.device_name) {
    return `Dispositivo: ${metadata.device_name}`
  } else if (metadata.temperature) {
    return `Temp: ${metadata.temperature}°C`
  } else if (metadata.humidity) {
    return `Humedad: ${metadata.humidity}%`
  } else if (metadata.scheduled_time) {
    return `Programado: ${metadata.scheduled_time}`
  }
  return ''
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

const formatTime = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Event handlers
const markAsResolved = async (alert) => {
  try {
    emit('alert-resolved', alert.id)
    toast.success('Alerta marcada como resuelta')
  } catch (error) {
    console.error('Error al marcar alerta como resuelta:', error)
    toast.error('Error al marcar alerta como resuelta')
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
  
  .hidden-mobile {
    display: none;
  }
}

/* Animación para el punto parpadeante */
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
</style> 