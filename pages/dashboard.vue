<script setup>
import { useSensorData } from '~/composables/useSensorData.js'
import { useCropStore } from '~/stores/crop'
import { useDeviceStore } from '~/stores/device'
import { useUserStore } from '~/stores/user'
import { thermometerIcon, humidityIcon } from '~/assets/icons'
import { getIcon } from '~/assets/icons'
import BaseCard from '~/components/Cards/BaseCard.vue'
import WorkingTemperatureChart from '~/components/Charts/WorkingTemperatureChart.vue'
import WorkingHumidityChart from '~/components/Charts/WorkingHumidityChart.vue'

// Configurar middleware de autenticación
definePageMeta({
  middleware: 'auth'
})

// Obtener stores
const cropStore = useCropStore()
const deviceStore = useDeviceStore()
const userStore = useUserStore()

// Obtener datos de sensores
const {
  temperatureData,
  humidityData,
  currentTemperature,
  currentHumidity,
  temperatureTrend,
  humidityTrend,
  cropThresholds,
  formattedTemperature,
  formattedHumidity
} = useSensorData()

// Cargar datos al montar el componente
onMounted(async () => {
  try {
    // Cargar cultivo del usuario si no está cargado
    if (userStore.user?.id && !cropStore.currentCrop) {
      await cropStore.fetchUserCrop(userStore.user.id)
    }
    
    // Cargar dispositivo del usuario si no está cargado
    if (userStore.user?.id && !deviceStore.device) {
      await deviceStore.fetchUserDevice(userStore.user.id)
    }
  } catch (error) {
    console.error('Error cargando datos del dashboard:', error)
  }
})




</script>

<template>
  <div class="dashboard-container space-y-8">
    <!-- Título de la página -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-4xl font-bold text-white mb-2">Dashboard de Sensores IoT</h1>
        <p class="text-gray-400 text-lg">Monitoreo en tiempo real de temperatura y humedad para sistemas de riego automatizado</p>
      </div>
    </div>

    <!-- Gráficas principales mejoradas -->
    <div class="grid grid-cols-1 xl:grid-cols-2 gap-8">
      <!-- Información de temperatura -->
      <div class="enhanced-sensor-card">
        <div class="sensor-header">
          <div class="flex items-center space-x-3">
            <div class="sensor-icon bg-gradient-to-br from-red-500 to-red-600">
              <component :is="thermometerIcon" />
            </div>
            <div>
              <h3 class="text-xl font-bold text-white">Temperatura Ambiental</h3>
              <p class="text-gray-400">Sensor DHT22 - Actualización cada 3s</p>
            </div>
          </div>
          <div class="sensor-display">
            <div class="main-value text-red-400">{{ formattedTemperature }}</div>
            <div class="trend-badge" :class="temperatureTrend.direction === 'up' ? 'trend-up' : temperatureTrend.direction === 'down' ? 'trend-down' : 'trend-neutral'">
              <span class="trend-arrow">{{ temperatureTrend.direction === 'up' ? '↗' : temperatureTrend.direction === 'down' ? '↘' : '→' }}</span>
              <span class="trend-percent">{{ temperatureTrend.value }}%</span>
            </div>
          </div>
        </div>
        <WorkingTemperatureChart :data="temperatureData" />
      </div>

      <!-- Información de humedad -->
      <div class="enhanced-sensor-card">
        <div class="sensor-header">
          <div class="flex items-center space-x-3">
            <div class="sensor-icon bg-gradient-to-br from-blue-500 to-blue-600">
              <component :is="humidityIcon" />
            </div>
            <div>
              <h3 class="text-xl font-bold text-white">Humedad Relativa</h3>
              <p class="text-gray-400">Sensor DHT22 - Actualización cada 3s</p>
            </div>
          </div>
          <div class="sensor-display">
            <div class="main-value text-blue-400">{{ formattedHumidity }}</div>
            <div class="trend-badge" :class="humidityTrend.direction === 'up' ? 'trend-up' : humidityTrend.direction === 'down' ? 'trend-down' : 'trend-neutral'">
              <span class="trend-arrow">{{ humidityTrend.direction === 'up' ? '↗' : humidityTrend.direction === 'down' ? '↘' : '→' }}</span>
              <span class="trend-percent">{{ humidityTrend.value }}%</span>
            </div>
          </div>
        </div>
        <WorkingHumidityChart :data="humidityData" />
      </div>
    </div>
    

    <!-- Panel de información adicional -->
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      <!-- Última actualización -->
      <BaseCard class="info-card">
        <div class="flex items-center space-x-3">
          <div class="flex items-center justify-center w-10 h-10 bg-blue-500/20 rounded-lg">
            <Icon name="heroicons:clock" class="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <p class="text-sm text-gray-400">Última actualización</p>
            <ClientOnly>
              <p class="text-white font-semibold">
                {{ new Date().toLocaleTimeString('es-ES') }}
              </p>
              <template #fallback>
                <p class="text-white font-semibold">--:--:--</p>
              </template>
            </ClientOnly>
          </div>
        </div>
      </BaseCard>

      <!-- Estado de conexión -->
      <BaseCard class="info-card">
        <div class="flex items-center space-x-3">
          <div class="flex items-center justify-center w-10 h-10 bg-green-500/20 rounded-lg">
            <Icon name="heroicons:signal" class="w-5 h-5 text-green-400" />
          </div>
          <div>
            <p class="text-sm text-gray-400">Estado TTN</p>
            <p class="text-green-400 font-semibold">Conectado</p>
          </div>
        </div>
      </BaseCard>

      <!-- Configuración del cultivo -->
      <BaseCard class="info-card">
        <div class="flex items-center space-x-3">
          <div class="flex items-center justify-center w-10 h-10 bg-purple-500/20 rounded-lg">
            <Icon name="heroicons:cog-6-tooth" class="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <p class="text-sm text-gray-400">Cultivo actual</p>
            <p class="text-white font-semibold">{{ cropStore.currentCrop?.name || '-' }}</p>
          </div>
        </div>
      </BaseCard>

      <!-- Estado de la bomba -->
      <BaseCard class="info-card">
        <div class="flex items-center space-x-3">
          <div class="flex items-center justify-center w-10 h-10 bg-blue-500/20 rounded-lg">
            <Icon name="heroicons:beaker" class="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <p class="text-sm text-gray-400">Bomba de riego</p>
            <p class="text-blue-400 font-semibold">Activa</p>
          </div>
        </div>
      </BaseCard>
    </div>

    

    <!-- Panel de Información del Sistema -->
    <div class="bg-gray-800/50 border border-blue-500/30 rounded-xl p-6 shadow-lg">
      <!-- Header -->
      <div class="mb-6 border-b border-gray-600/50 pb-4">
        <div class="flex items-center space-x-3">
          <div class="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
          <h3 class="text-2xl font-bold text-white">Información del Sistema</h3>
        </div>
        <p class="text-gray-400 mt-2">Detalles del cultivo activo y dispositivo IoT en funcionamiento</p>
      </div>
      
      <!-- Content -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- INFORMACIÓN DEL CULTIVO -->
          <div class="space-y-4">
            <div class="flex items-center space-x-3 mb-4">
              <component :is="getIcon('plant')" class="w-6 h-6 text-green-400" />
              <h4 class="text-lg font-bold text-white">Cultivo Seleccionado</h4>
            </div>
            
            <div class="space-y-3">
               <div class="flex justify-between items-center p-4 bg-gray-900/60 border border-gray-600/30 rounded-lg hover:bg-gray-900/80 transition-colors">
                 <span class="text-gray-300 font-medium">Nombre:</span>
                 <span class="text-white font-bold text-lg">{{ cropStore.currentCrop?.name || 'No seleccionado' }}</span>
               </div>
               
               <div class="flex justify-between items-center p-4 bg-gray-900/60 border border-gray-600/30 rounded-lg hover:bg-gray-900/80 transition-colors">
                 <span class="text-gray-300 font-medium">Categoría:</span>
                 <span class="text-green-400 font-bold text-lg">{{ cropStore.currentCrop?.category || 'N/A' }}</span>
               </div>
               
               <div class="flex justify-between items-center p-4 bg-gray-900/60 border border-gray-600/30 rounded-lg hover:bg-gray-900/80 transition-colors">
                 <span class="text-gray-300 font-medium">Humedad Mínima:</span>
                 <span class="text-blue-400 font-bold text-lg">{{ cropStore.currentCrop?.humidity_min || 'N/A' }}%</span>
               </div>
               
               <div class="flex justify-between items-center p-4 bg-gray-900/60 border border-gray-600/30 rounded-lg hover:bg-gray-900/80 transition-colors">
                 <span class="text-gray-300 font-medium">Humedad Máxima:</span>
                 <span class="text-blue-400 font-bold text-lg">{{ cropStore.currentCrop?.humidity_max || 'N/A' }}%</span>
               </div>
               
               <div class="flex justify-between items-center p-4 bg-gray-900/60 border border-gray-600/30 rounded-lg hover:bg-gray-900/80 transition-colors">
                 <span class="text-gray-300 font-medium">Temperatura Máxima:</span>
                 <span class="text-red-400 font-bold text-lg">{{ cropStore.currentCrop?.temperature_max || 'N/A' }}°C</span>
               </div>
              
                             <div class="flex justify-between items-center p-4 bg-gray-900/60 border border-gray-600/30 rounded-lg hover:bg-gray-900/80 transition-colors">
                 <div class="flex items-center space-x-2">
                   <Icon name="heroicons:beaker" class="w-5 h-5 text-blue-400" />
                   <span class="text-gray-300 font-medium">Estado de la Bomba:</span>
                 </div>
                 <div class="flex items-center space-x-2">
                   <div class="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                   <span class="text-blue-400 font-bold text-lg">ACTIVA</span>
                 </div>
               </div>
               
               <div class="flex justify-between items-center p-4 bg-gray-900/60 border border-gray-600/30 rounded-lg hover:bg-gray-900/80 transition-colors">
                 <span class="text-gray-300 font-medium">Días de Crecimiento:</span>
                 <span class="text-white font-bold text-lg">{{ cropStore.currentCrop?.growth_days || 'N/A' }} días</span>
               </div>
               
               <div class="flex justify-between items-center p-4 bg-gray-900/60 border border-gray-600/30 rounded-lg hover:bg-gray-900/80 transition-colors">
                 <span class="text-gray-300 font-medium">Temporada:</span>
                 <span class="text-purple-400 font-bold text-lg">{{ cropStore.currentCrop?.session || 'N/A' }}</span>
               </div>
            </div>
          </div>

          <!-- INFORMACIÓN DEL DISPOSITIVO -->
          <div class="space-y-4">
            <div class="flex items-center space-x-3 mb-4">
              <Icon name="heroicons:cpu-chip" class="w-6 h-6 text-blue-400" />
              <h4 class="text-lg font-bold text-white">Dispositivo Activo</h4>
            </div>
            
            <div class="space-y-3">
              <div class="flex justify-between items-center p-4 bg-gray-900/60 border border-gray-600/30 rounded-lg hover:bg-gray-900/80 transition-colors">
                <span class="text-gray-300 font-medium">Nombre:</span>
                <span class="text-white font-bold text-lg">{{ deviceStore.device?.device_name || 'No registrado' }}</span>
              </div>
              
              <div class="flex justify-between items-center p-4 bg-gray-900/60 border border-gray-600/30 rounded-lg hover:bg-gray-900/80 transition-colors">
                <span class="text-gray-300 font-medium">ID del Dispositivo:</span>
                <span class="text-gray-300 font-mono font-bold text-lg">{{ deviceStore.device?.enddevice_id || 'N/A' }}</span>
              </div>
              
              <div class="flex justify-between items-center p-4 bg-gray-900/60 border border-gray-600/30 rounded-lg hover:bg-gray-900/80 transition-colors">
                <div class="flex items-center space-x-2">
                  <Icon name="heroicons:wifi" class="w-5 h-5" :class="deviceStore.device?.is_active_communication ? 'text-green-400' : 'text-red-400'" />
                  <span class="text-gray-300 font-medium">Estado:</span>
                </div>
                <div class="flex items-center space-x-2">
                  <div class="w-3 h-3 rounded-full animate-pulse" :class="deviceStore.device?.is_active_communication ? 'bg-green-400' : 'bg-red-400'"></div>
                  <span class="font-bold text-lg" :class="deviceStore.device?.is_active_communication ? 'text-green-400' : 'text-red-400'">
                    {{ deviceStore.device?.is_active_communication ? 'CONECTADO' : 'DESCONECTADO' }}
                  </span>
                </div>
              </div>
              
              <div class="flex justify-between items-center p-4 bg-gray-900/60 border border-gray-600/30 rounded-lg hover:bg-gray-900/80 transition-colors">
                <span class="text-gray-300 font-medium">Frecuencia de Datos:</span>
                <span class="text-white font-bold text-lg">Cada 3 segundos</span>
              </div>
              
              <div class="flex justify-between items-center p-4 bg-gray-900/60 border border-gray-600/30 rounded-lg hover:bg-gray-900/80 transition-colors">
                <span class="text-gray-300 font-medium">Última Comunicación:</span>
                <span class="text-green-400 font-bold text-lg">Ahora mismo</span>
              </div>
            </div>
                     </div>
         </div>
      </div>
  </div>
</template>

<style scoped>
.dashboard-container {
  padding: 0.5rem;
}

.info-card {
  padding: 1.5rem;
  transition: transform 0.2s ease-in-out;
}

.info-card:hover {
  transform: translateY(-2px);
}

.threshold-config {
  background: linear-gradient(135deg, rgba(74, 93, 184, 0.1) 0%, rgba(42, 59, 122, 0.1) 100%);
  border: 1px solid rgba(74, 93, 184, 0.2);
}

.threshold-item {
  padding: 1.5rem;
  background: rgba(17, 24, 39, 0.5);
  border-radius: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.2s ease-in-out;
}

.threshold-item:hover {
  background: rgba(17, 24, 39, 0.7);
  border-color: rgba(74, 93, 184, 0.3);
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.enhanced-sensor-card {
  background: rgba(17, 24, 39, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 1.5rem;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.enhanced-sensor-card:hover {
  background: rgba(17, 24, 39, 0.4);
  transform: translateY(-4px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2);
}

.sensor-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
}

.sensor-icon {
  width: 3rem;
  height: 3rem;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.sensor-display {
  text-align: right;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5rem;
}

.main-value {
  font-size: 2.25rem;
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.025em;
}

.trend-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  font-weight: 600;
  transition: all 0.2s ease;
}

.trend-up {
  background: rgba(34, 197, 94, 0.15);
  color: #22c55e;
  border: 1px solid rgba(34, 197, 94, 0.3);
}

.trend-down {
  background: rgba(239, 68, 68, 0.15);
  color: #ef4444;
  border: 1px solid rgba(239, 68, 68, 0.3);
}

.trend-neutral {
  background: rgba(156, 163, 175, 0.15);
  color: #9ca3af;
  border: 1px solid rgba(156, 163, 175, 0.3);
}

.trend-arrow {
  font-size: 0.875rem;
  font-weight: 700;
}

.trend-percent {
  font-size: 0.75rem;
  font-weight: 600;
}

.system-panel {
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.05) 0%, rgba(59, 130, 246, 0.05) 100%);
  border: 1px solid rgba(74, 93, 184, 0.2);
}
</style> 