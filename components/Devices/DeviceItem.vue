<script setup>
import { computed } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
    validator: (value) => ['online', 'offline', 'warning'].includes(value)
  },
  value: {
    type: String,
    required: true
  },
  lastUpdate: {
    type: String,
    required: true
  }
})

const statusColor = computed(() => {
  const colors = {
    online: 'bg-green-500',
    offline: 'bg-red-500',
    warning: 'bg-yellow-500'
  }
  return colors[props.status] || 'bg-gray-500'
})

const statusTextColor = computed(() => {
  const colors = {
    online: 'text-green-600',
    offline: 'text-red-600',
    warning: 'text-yellow-600'
  }
  return colors[props.status] || 'text-gray-600'
})

const statusText = computed(() => {
  const texts = {
    online: 'En línea',
    offline: 'Desconectado',
    warning: 'Advertencia'
  }
  return texts[props.status] || 'Desconocido'
})
</script> 

<template>
  <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
    <div class="flex items-center space-x-3">
      <div class="flex-shrink-0">
        <div class="w-3 h-3 rounded-full" :class="statusColor"></div>
      </div>
      <div>
        <p class="text-sm font-medium text-gray-900">{{ name }}</p>
        <p class="text-xs text-gray-500">{{ lastUpdate }}</p>
      </div>
    </div>
    <div class="text-right">
      <p class="text-sm font-medium text-gray-900">{{ value }}</p>
      <p class="text-xs" :class="statusTextColor">{{ statusText }}</p>
    </div>
  </div>
</template>

