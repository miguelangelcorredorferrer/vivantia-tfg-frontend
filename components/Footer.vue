<script setup>
import { computed } from 'vue'

const currentDate = computed(() => {
  return new Date().toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
})
</script>

<style scoped>
.bg-dark-footer {
  background-color: #2d2d2d;
}
</style>

<template>
  <footer class="bg-dark-footer text-gray-300 py-3 border-t border-gray-700">
    <div class="container mx-auto px-6">
      <div class="flex flex-col md:flex-row justify-between items-center">
        <!-- Información del desarrollador -->
        <div class="mb-2 md:mb-0">
          <p class="text-xs">
            Desarrollado por <span class="font-semibold text-white">Tu Nombre</span>
            <span class="text-gray-500 ml-2">© 2024 IoT Dashboard</span>
          </p>
        </div>

        <!-- Información técnica -->
        <div class="flex items-center space-x-4 text-xs text-gray-400">
          <span>v1.0.0</span>
          <span>|</span>
          <span>Vue 3 + Nuxt 3</span>
          <span>|</span>
          <span>{{ currentDate }}</span>
        </div>
      </div>
    </div>
  </footer>
</template>

