<script setup>
import { computed } from 'vue'
import { getIcon } from '@/assets/icons'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  value: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  trend: {
    type: String,
    required: true
  }
})

const trendClass = computed(() => {
  if (props.trend.startsWith('+')) {
    return 'text-green-400'
  } else if (props.trend.startsWith('-')) {
    return 'text-red-400'
  }
  return 'text-gray-400'
})

const iconComponent = computed(() => {
  return getIcon(props.icon)
})
</script>

<template>
  <div class="bg-dark-card rounded-lg shadow-lg p-6 border border-gray-600">
    <div class="flex items-center justify-between">
      <div>
        <p class="text-sm font-medium text-gray-400">{{ title }}</p>
        <p class="text-2xl font-bold text-white mt-1">{{ value }}</p>
        <p class="text-sm mt-1" :class="trendClass">{{ trend }}</p>
      </div>
      <div class="p-3 rounded-full" :class="color">
        <component :is="iconComponent" class="w-6 h-6 text-white" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-dark-card {
  background-color: #3a3a3a;
}
</style>

