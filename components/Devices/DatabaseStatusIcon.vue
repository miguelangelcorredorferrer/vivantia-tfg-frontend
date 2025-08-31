<template>
  <div class="inline-flex items-center">
    <div 
      :class="[
        'p-2 rounded-full transition-colors duration-200',
        isActive ? 'bg-green-100' : 'bg-red-100'
      ]"
    >
      <svg 
        class="w-5 h-5 transition-colors duration-200" 
        :class="isActive ? 'text-green-600' : 'text-red-600'"
        fill="currentColor" 
        viewBox="0 0 20 20"
      >
        <path 
          d="M3 12v3c0 1.657 3.134 3 7 3s7-1.343 7-3v-3c0 1.657-3.134 3-7 3s-7-1.343-7-3z"
        />
        <path 
          d="M3 7v3c0 1.657 3.134 3 7 3s7-1.343 7-3V7c0 1.657-3.134 3-7 3S3 8.657 3 7z"
        />
        <path 
          d="M17 5c0 1.657-3.134 3-7 3S3 6.657 3 5s3.134-3 7-3 7 1.343 7 3z"
        />
      </svg>
    </div>
    
    <!-- Indicador de estado opcional -->
    <div 
      v-if="showStatusDot"
      :class="[
        'w-3 h-3 rounded-full ml-2 transition-colors duration-200',
        isActive ? 'bg-green-500' : 'bg-red-500'
      ]"
    ></div>
    
    <!-- Texto de estado opcional -->
    <span 
      v-if="showStatusText" 
      :class="[
        'ml-2 text-sm font-medium transition-colors duration-200',
        isActive ? 'text-green-600' : 'text-red-600'
      ]"
    >
      {{ isActive ? 'Activo' : 'Inactivo' }}
    </span>
  </div>
</template>

<script setup>
defineProps({
  isActive: {
    type: Boolean,
    default: false
  },
  showStatusDot: {
    type: Boolean,
    default: false
  },
  showStatusText: {
    type: Boolean,
    default: false
  }
})
</script>
