<script setup>
import { computed } from 'vue'
import { getIcon } from '~/assets/icons'

const props = defineProps({
  icon: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  to: {
    type: String,
    required: true
  },
  active: {
    type: Boolean,
    default: false
  }
})

const iconComponent = computed(() => {
  return getIcon(props.icon)
})
</script>

<template>
  <NuxtLink 
    :to="to" 
    class="flex items-center px-4 py-3 mx-2 text-sm font-medium transition-all duration-200 rounded-lg group"
    :class="[
      active 
        ? 'bg-white/20 text-white shadow-lg backdrop-blur-sm border border-white/30' 
        : 'text-blue-100 hover:bg-white/10 hover:text-white'
    ]"
  >
    <component :is="iconComponent" class="w-5 h-5 mr-3 flex-shrink-0" />
    <span class="truncate">{{ label }}</span>
  </NuxtLink>
</template>

<style scoped>
/* Estilos adicionales si son necesarios */
</style>
