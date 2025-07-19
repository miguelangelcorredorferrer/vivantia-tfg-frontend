<template>
  <nav class="flex items-center space-x-2 text-sm" aria-label="Breadcrumb">
    <ol class="flex items-center space-x-2">
      <li v-for="(item, index) in breadcrumbItems" :key="index" class="flex items-center">
        <!-- Separador -->
        <svg 
          v-if="index > 0" 
          class="w-4 h-4 text-gray-500 mx-2" 
          fill="currentColor" 
          viewBox="0 0 20 20"
        >
          <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
        </svg>
        
        <!-- Elemento del breadcrumb -->
        <div class="flex items-center">
          <component 
            :is="item.clickable ? 'NuxtLink' : 'span'"
            :to="item.clickable ? item.to : undefined"
            class="flex items-center space-x-1 transition-colors duration-200"
            :class="[
              item.clickable 
                ? 'text-gray-400 hover:text-white cursor-pointer' 
                : 'text-white font-medium'
            ]"
          >
            <!-- Icono -->
            <component 
              :is="item.icon" 
              class="w-4 h-4 flex-shrink-0"
              v-if="item.icon"
            />
            
            <!-- Texto -->
            <span>{{ item.label }}</span>
          </component>
        </div>
      </li>
    </ol>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { getIcon } from '~/assets/icons'

const route = useRoute()

const breadcrumbItems = computed(() => {
  const items = []
  
  // Mapear nombres de rutas a etiquetas legibles
  const routeLabels = {
    'dashboard': 'Dashboard',
    'devices': 'Dispositivos',
    'widgets': 'Widgets',
    'cultivos': 'Cultivos',
    'analytics': 'Analytics',
    'settings': 'Configuración'
  }
  
  // Obtener la ruta actual sin el '/' inicial
  const currentRoute = route.path.substring(1)
  
  // Si estamos en la página principal (dashboard), solo mostrar Dashboard
  if (currentRoute === 'dashboard') {
    items.push({
      label: routeLabels['dashboard'],
      to: '/dashboard',
      icon: getIcon('dashboard'),
      clickable: false
    })
  } else {
    
    // Agregar la página actual (no clickeable)
    items.push({
      label: routeLabels[currentRoute] || currentRoute.charAt(0).toUpperCase() + currentRoute.slice(1),
      to: `/${currentRoute}`,
      icon: getIcon(currentRoute),
      clickable: true
    })
  }
  
  return items
})
</script>

<style scoped>
/* Estilos adicionales si son necesarios */
</style> 