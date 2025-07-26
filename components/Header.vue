<script setup>
import { useUserStore } from '~/stores/user'

// Definir los eventos que puede emitir el componente
defineEmits(['toggle-sidebar'])

const userStore = useUserStore()

// Función para ir al perfil
const goToProfile = () => {
  navigateTo('/perfil')
}
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
            <h1 class="text-xl font-bold text-white">
              {{ userStore.isAdmin ? 'PANEL DE ADMINISTRACIÓN' : 'DASHBOARD' }}
            </h1>
            <p class="text-xs text-gray-400">
              {{ userStore.isAdmin ? 'Centro de Control' : 'Performance' }}
            </p>
          </div>
        </div>
      </div>

      <!-- Sección derecha con información de usuario -->
      <div class="flex items-center space-x-4">
        
        <!-- Información del usuario logueado -->
        <div v-if="userStore.isAuthenticated" class="flex items-center space-x-3">
          <!-- Saludo personalizado -->
          <div class="hidden sm:block text-right">
            <p class="text-sm font-medium text-white">
              ¡Bienvenido {{ userStore.userName }} a Vivantia!
            </p>
            <p class="text-xs text-gray-300">{{ userStore.userEmail }}</p>
          </div>
          
          <!-- Botón de perfil de usuario -->
          <button 
            @click="goToProfile"
            class="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg"
            title="Ir a mi perfil"
          >
            <span class="text-white font-semibold text-sm">
              {{ userStore.userName.charAt(0).toUpperCase() }}
            </span>
          </button>
        </div>

        <!-- Estado no autenticado - No mostrar nada ya que se redirige automáticamente -->
        <div v-else class="flex items-center space-x-2">
          <!-- Usuario no autenticado será redirigido automáticamente -->
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