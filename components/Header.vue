<script setup>
// Definir los eventos que puede emitir el componente
defineEmits(['toggle-sidebar'])
</script>

<template>
  <header class="bg-dark-header text-white shadow-lg border-b border-gray-700">
    <div class="flex items-center justify-between px-6 py-4">
      <!-- Sección izquierda con botón de menú y logo -->
      <div class="flex items-center space-x-3">
        <!-- Botón de menú para móvil -->
        <button 
          @click="$emit('toggle-sidebar')"
          class="p-2 rounded-md hover:bg-gray-600 transition-colors lg:hidden"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>
        
        <!-- Logo y nombre de la aplicación -->
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
            </svg>
          </div>
          <div class="hidden sm:block">
            <h1 class="text-xl font-bold text-white">DASHBOARD</h1>
            <p class="text-xs text-gray-400">Performance</p>
          </div>
        </div>
      </div>

      <!-- Sección derecha con botones y perfil -->
      <div class="flex items-center space-x-4">
        
        <!-- Iconos de acción -->
        <div class="flex items-center space-x-2">
          <!-- Búsqueda -->
          <button class="p-2 rounded-lg hover:bg-gray-600 transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </button>
          
          <!-- Actividad -->
          <button class="p-2 rounded-lg hover:bg-gray-600 transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
          </button>
          
          <!-- Perfil de usuario -->
          <button class="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center hover:bg-gray-500 transition-colors">
            <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.bg-dark-header {
  background-color: #2d2d2d;
}
</style> 