<template>
  <div v-if="isDemoMode" class="bg-gradient-to-r from-orange-500/20 to-yellow-500/20 border border-orange-500/30 rounded-xl p-4 shadow-lg">
    <div class="flex items-center space-x-3">
      <div class="flex-shrink-0">
        <svg class="w-8 h-8 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
        </svg>
      </div>
      <div class="flex-1">
        <h3 class="text-lg font-medium text-orange-300">🎭 Modo Vista Previa</h3>
        <p class="text-sm text-orange-200">
          Estás viendo una demostración con datos simulados. 
          <span class="font-medium">Las funcionalidades están limitadas.</span> 
          Para acceder a todas las características, 
          <button @click="handleExitDemo" class="underline hover:text-white transition-colors">
            inicia sesión aquí
          </button>.
        </p>
      </div>
      <div class="flex items-center space-x-2">
        <div class="w-3 h-3 bg-orange-400 rounded-full animate-pulse"></div>
        <span class="text-sm text-orange-300 font-medium">DEMO</span>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  isDemoMode: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['exit-demo'])

const handleExitDemo = () => {
  emit('exit-demo')
}
</script> 