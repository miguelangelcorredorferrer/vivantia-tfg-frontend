<template>
  <BaseCard class="sensor-card">
    <template #header>
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center space-x-3">
          <div 
            class="flex items-center justify-center w-12 h-12 rounded-xl shadow-lg"
            :class="iconBgClass"
          >
            <Icon :name="icon" class="w-6 h-6" :class="iconColorClass" />
          </div>
          <div>
            <h3 class="text-xl font-bold text-white">{{ title }}</h3>
            <p class="text-sm text-gray-400">{{ subtitle }}</p>
          </div>
        </div>
        
        <div class="text-right">
          <div class="flex items-center space-x-2 mb-1">
            <div class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span class="text-xs text-gray-400">En tiempo real</span>
          </div>
          <div class="text-3xl font-bold text-white mb-1">{{ currentValue }}</div>
          <div class="flex items-center space-x-1" :class="trendClass">
            <Icon :name="trendIcon" class="w-3 h-3" />
            <span class="text-sm font-medium">{{ trendText }}</span>
          </div>
        </div>
      </div>
    </template>

    <template #content>
      <div class="chart-section">
        <!-- Información de umbrales -->
        <div class="flex items-center justify-between mb-4 text-sm">
          <div class="flex items-center space-x-4">
            <div v-if="type === 'temperature'" class="flex items-center space-x-2">
              <div class="w-3 h-0.5 bg-red-500 rounded"></div>
              <span class="text-gray-400">Umbral máximo: {{ thresholds.max }}°C</span>
            </div>
            <div v-if="type === 'humidity'" class="flex items-center space-x-6">
              <div class="flex items-center space-x-2">
                <div class="w-3 h-0.5 bg-red-500 rounded"></div>
                <span class="text-gray-400">Mín: {{ thresholds.min }}%</span>
              </div>
              <div class="flex items-center space-x-2">
                <div class="w-3 h-0.5 bg-green-500 rounded"></div>
                <span class="text-gray-400">Máx: {{ thresholds.max }}%</span>
              </div>
            </div>
          </div>
          
          <!-- Estado del riego -->
          <div class="flex items-center space-x-2">
            <div 
              class="w-2 h-2 rounded-full" 
              :class="irrigationStatusClass"
            ></div>
            <span class="text-xs font-medium" :class="irrigationTextClass">
              {{ irrigationStatus }}
            </span>
          </div>
        </div>

        <!-- Gráfica -->
        <div class="chart-container">
          <slot name="chart" />
        </div>
      </div>
    </template>
  </BaseCard>
</template>

<script setup>
import { computed } from 'vue'
import BaseCard from './BaseCard.vue'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    required: true
  },
  currentValue: {
    type: String,
    required: true
  },
  trend: {
    type: Object,
    default: () => ({ value: 0, direction: 'neutral' })
  },
  type: {
    type: String,
    required: true,
    validator: (value) => ['temperature', 'humidity'].includes(value)
  },
  thresholds: {
    type: Object,
    required: true
  },
  currentNumericValue: {
    type: Number,
    required: true
  }
})

// Clases de estilo para iconos
const iconBgClass = computed(() => {
  return props.type === 'temperature' 
    ? 'bg-gradient-to-br from-red-500 to-red-600' 
    : 'bg-gradient-to-br from-blue-500 to-blue-600'
})

const iconColorClass = computed(() => {
  return 'text-white'
})

// Clases de estilo para tendencias
const trendClass = computed(() => {
  if (props.trend.direction === 'up') return 'text-red-400'
  if (props.trend.direction === 'down') return 'text-green-400'
  return 'text-gray-400'
})

const trendIcon = computed(() => {
  if (props.trend.direction === 'up') return 'heroicons:arrow-trending-up'
  if (props.trend.direction === 'down') return 'heroicons:arrow-trending-down'
  return 'heroicons:minus'
})

const trendText = computed(() => {
  if (props.trend.value === 0 || props.trend.direction === 'neutral') {
    return 'Sin cambios'
  }
  const prefix = props.trend.direction === 'up' ? '+' : '-'
  return `${prefix}${props.trend.value}%`
})

// Estado del riego
const irrigationStatus = computed(() => {
  if (props.type === 'temperature') {
    return props.currentNumericValue > props.thresholds.max ? 'Riego necesario' : 'Óptimo'
  } else {
    const value = props.currentNumericValue
    if (value < props.thresholds.min || value > props.thresholds.max) {
      return 'Riego necesario'
    }
    return 'Óptimo'
  }
})

const irrigationStatusClass = computed(() => {
  return irrigationStatus.value === 'Riego necesario' ? 'bg-red-500' : 'bg-green-500'
})

const irrigationTextClass = computed(() => {
  return irrigationStatus.value === 'Riego necesario' ? 'text-red-400' : 'text-green-400'
})
</script>

<style scoped>
.sensor-card {
  height: 100%;
  min-height: 500px;
}

.chart-section {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.chart-container {
  width: 100%;
  height: 350px;
  display: flex;
  flex-direction: column;
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
</style> 