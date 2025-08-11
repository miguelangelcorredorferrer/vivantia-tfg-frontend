<template>
  <BaseCard class="info-card">
    <div class="flex items-center space-x-3">
      <div class="flex items-center justify-center w-10 h-10 rounded-lg" :class="iconBgClass">
        <Icon :name="iconName" class="w-5 h-5" :class="iconColorClass" />
      </div>
      <div>
        <p class="text-sm text-gray-400">{{ label }}</p>
        <p class="font-semibold" :class="valueColorClass">{{ value }}</p>
      </div>
    </div>
  </BaseCard>
</template>

<script setup>
import BaseCard from '~/components/Cards/BaseCard.vue'

defineProps({
  iconName: {
    type: String,
    required: true
  },
  iconBgClass: {
    type: String,
    required: true
  },
  iconColorClass: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  value: {
    type: String,
    required: true
  },
  valueColorClass: {
    type: String,
    required: true
  }
})
</script> 