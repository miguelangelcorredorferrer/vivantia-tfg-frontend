<template>
  <div class="enhanced-sensor-card">
    <div class="sensor-header">
      <div class="flex items-center space-x-3">
        <div class="sensor-icon" :class="iconBgClass">
          <component :is="icon" />
        </div>
        <div>
          <h3 class="text-xl font-bold text-white">{{ title }}</h3>
          <p class="text-gray-400">{{ description }}</p>
        </div>
      </div>
      <div class="sensor-display">
        <div class="main-value" :class="valueColorClass">{{ formattedValue }}</div>
        <div class="trend-badge" :class="trendClass">
          <span class="trend-arrow">{{ trendArrow }}</span>
          <span class="trend-percent">{{ trendValue }}</span>
        </div>
      </div>
    </div>
    <component :is="chartComponent" 
      :data="chartData" 
      v-bind="chartProps"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  icon: {
    type: Object,
    required: true
  },
  iconBgClass: {
    type: String,
    required: true
  },
  valueColorClass: {
    type: String,
    required: true
  },
  formattedValue: {
    type: String,
    required: true
  },
  trend: {
    type: Object,
    required: true
  },
  chartComponent: {
    type: Object,
    required: true
  },
  chartData: {
    type: Object,
    required: true
  },
  chartProps: {
    type: Object,
    default: () => ({})
  }
})

const trendClass = computed(() => {
  if (props.trend.direction === 'up') return 'trend-up'
  if (props.trend.direction === 'down') return 'trend-down'
  return 'trend-neutral'
})

const trendArrow = computed(() => {
  if (props.trend.direction === 'up') return '↗'
  if (props.trend.direction === 'down') return '↘'
  return '→'
})

const trendValue = computed(() => {
  return props.trend.value
})
</script> 