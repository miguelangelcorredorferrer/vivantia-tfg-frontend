<template>
  <div class="relative inline-flex items-center">
    <button
      type="button"
      :class="[
        'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-800',
        modelValue 
          ? 'bg-green-600 hover:bg-green-700' 
          : 'bg-gray-600 hover:bg-gray-500',
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      ]"
      :disabled="disabled"
      @click="toggle"
      :aria-checked="modelValue"
      :aria-label="label"
      role="switch"
    >
      <!-- Switch slider -->
      <span
        :class="[
          'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out',
          modelValue ? 'translate-x-5' : 'translate-x-0'
        ]"
      >
        <!-- Icon inside the slider -->
        <span
          :class="[
            'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity duration-200 ease-in-out',
            modelValue ? 'opacity-0' : 'opacity-100'
          ]"
        >
          <!-- X icon when OFF -->
          <component :is="getIcon('close')" />
        </span>
        <span
          :class="[
            'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity duration-200 ease-in-out',
            modelValue ? 'opacity-100' : 'opacity-0'
          ]"
        >
          <!-- Check icon when ON -->
          <component :is="getIcon('check')" />
        </span>
      </span>
    </button>
  </div>
</template>

<script setup>
import { getIcon } from '~/assets/icons'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  label: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue', 'change'])

const toggle = () => {
  if (props.disabled) return
  
  const newValue = !props.modelValue
  emit('update:modelValue', newValue)
  emit('change', newValue)
}
</script>

<style scoped>
/* Ensure smooth transitions */
.transition {
  transition-property: transform, background-color, opacity;
}

/* Focus ring styling */
button:focus {
  outline: none;
}

/* Disabled state */
button:disabled {
  cursor: not-allowed;
}

button:disabled:hover {
  background-color: inherit;
}
</style> 