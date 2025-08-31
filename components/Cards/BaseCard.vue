<template>
  <div class="bg-dark-card rounded-lg shadow-lg border border-gray-600" :class="customClass">
    <!-- Header opcional -->
    <div v-if="title || $slots.header" class="px-6 py-4 border-b border-gray-600">
      <slot name="header">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold text-white">{{ title }}</h3>
          <slot name="header-actions"></slot>
        </div>
      </slot>
    </div>
    
    <!-- Contenido principal -->
    <div class="p-6">
      <slot></slot>
    </div>
    
    <!-- Footer opcional -->
    <div v-if="$slots.footer" class="px-6 py-4 border-t border-gray-600 bg-gray-800/50 rounded-b-lg">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: ''
  },
  customClass: {
    type: String,
    default: ''
  }
})
</script>

<style scoped>
.bg-dark-card {
  background-color: #3a3a3a;
}
</style> 