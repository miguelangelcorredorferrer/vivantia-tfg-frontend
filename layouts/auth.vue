<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()

const authRoutes = [
  { path: '/auth/register', name: 'register', text: 'Crear una cuenta' },
  { path: '/auth/login', name: 'login', text: 'Iniciar Sesión' },
  { path: '/auth/forgot-password', name: 'forgot-password', text: 'Recuperar contraseña' },
]
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-green-600 via-green-700 to-green-800 flex items-center justify-center p-4">
    <div class="w-full max-w-md">
      <!-- Logo y título principal -->
      <div class="text-center mb-8">
        <div class="flex justify-center mb-4">
          <div class="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
            <svg class="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
            </svg>
          </div>
        </div>
        <h1 class="text-3xl font-bold text-white mb-2">Vivantia IoT</h1>
        <p class="text-green-100">Sistema de Automatización de Riego</p>
      </div>

      <!-- Contenido de las páginas -->
      <div class="bg-white rounded-2xl shadow-2xl p-8">
        <slot />
      </div>

      <!-- Navegación entre páginas de auth -->
      <nav class="mt-6 flex flex-col items-center space-y-3 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-6">
        <NuxtLink
          v-for="authRoute in authRoutes"
          :key="authRoute.name"
          class="text-white hover:text-green-200 transition-colors duration-200 font-medium"
          :to="authRoute.path"
          :class="{ 'hidden': route.path === authRoute.path }"
        >
          {{ authRoute.text }}
        </NuxtLink>
      </nav>
    </div>
  </div>
</template> 