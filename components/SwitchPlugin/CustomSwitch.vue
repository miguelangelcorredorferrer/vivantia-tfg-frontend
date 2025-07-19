<template>
  <div class="relative inline-flex items-center">
    <button
      type="button"
      :class="[
        'relative inline-flex h-8 w-16 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800',
        isOn ? 'bg-gradient-to-r from-blue-500 to-purple-600' : 'bg-gray-600'
      ]"
      @click="toggle"
      :disabled="disabled"
    >
      <span class="sr-only">{{ label }}</span>
      
      <!-- Texto ON/OFF en el fondo del switch -->
      <div class="absolute inset-0 flex items-center justify-between px-2 text-xs font-semibold pointer-events-none select-none">
        <span 
          :class="[
            'transition-opacity duration-200',
            isOn ? 'opacity-100 text-white' : 'opacity-0'
          ]"
        >
          ON
        </span>
        <span 
          :class="[
            'transition-opacity duration-200',
            !isOn ? 'opacity-100 text-gray-300' : 'opacity-0'
          ]"
        >
          OFF
        </span>
      </div>
      
      <!-- Botón deslizante -->
      <div
        :class="[
          'inline-block h-6 w-6 transform rounded-full bg-white shadow-lg ring-0 transition-transform duration-200 ease-in-out',
          isOn ? 'translate-x-8' : 'translate-x-1'
        ]"
        style="margin-top: 2px;"
      >
        <!-- Ícono interno del botón -->
        <div class="flex items-center justify-center h-full w-full">
          <svg 
            v-if="!isOn" 
            class="h-3 w-3 text-gray-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
          <svg 
            v-else 
            class="h-3 w-3 text-green-600" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
          </svg>
        </div>
      </div>
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  label: {
    type: String,
    default: 'Toggle'
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'change'])

const isOn = computed(() => props.modelValue)

const toggle = () => {
  if (!props.disabled) {
    const newValue = !props.modelValue
    emit('update:modelValue', newValue)
    emit('change', newValue)
  }
}
</script>

<style scoped>
/* Mejoras para el switch */
button {
  position: relative;
}

/* Animación suave para el texto */
span {
  transition: opacity 0.2s ease-in-out;
}
</style> 