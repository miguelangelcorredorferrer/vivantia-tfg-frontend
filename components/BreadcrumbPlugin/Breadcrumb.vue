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
          <NuxtLink
            v-if="item.clickable"
            :to="item.to"
            class="flex items-center space-x-1 transition-colors duration-200 text-gray-400 hover:text-white cursor-pointer"
          >
            <!-- Icono -->
            <component 
              :is="item.icon" 
              class="w-4 h-4 flex-shrink-0"
              v-if="item.icon"
            />
            
            <!-- Texto -->
            <span>{{ item.label }}</span>
          </NuxtLink>
          
          <span
            v-else
            class="flex items-center space-x-1 text-white font-medium"
          >
            <!-- Icono -->
            <component 
              :is="item.icon" 
              class="w-4 h-4 flex-shrink-0"
              v-if="item.icon"
            />
            
            <!-- Texto -->
            <span>{{ item.label }}</span>
          </span>
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
  const pathSegments = route.path.split('/').filter(segment => segment)
  
  // Mapear nombres de rutas a etiquetas legibles
  const routeLabels = {
    'dashboard': 'Dashboard',
    'dispositivos': 'Dispositivos',
    'devices': 'Dispositivos',
    'cultivos': 'Cultivos',
    'crops': 'Cultivos',
    'modo': 'Modos de Riego',
    'modos': 'Modos de Riego',
    'automatico': 'Modo Automático',
    'manual': 'Modo Manual',
    'programado': 'Modo Programado',
    'alertas': 'Alertas',
    'alerts': 'Alertas',
    'perfil': 'Perfil',
    'profile': 'Perfil',
    'admin': 'Administración',
    'usuarios': 'Usuarios',
    'users': 'Usuarios',
    'agregar': 'Agregar',
    'add': 'Agregar',
    'editar': 'Editar',
    'edit': 'Editar',
    'ver': 'Ver',
    'view': 'Ver',
    'analytics': 'Analytics',
    'widgets': 'Widgets',
    'settings': 'Configuración'
  }
  
  // Mapear rutas a iconos
  const routeIcons = {
    'dashboard': 'home',
    'dispositivos': 'device',
    'devices': 'device',
    'cultivos': 'plant',
    'crops': 'plant',
    'modo': 'watering',
    'modos': 'watering',
    'automatico': 'automatic',
    'manual': 'manual',
    'programado': 'programmed',
    'alertas': 'warning',
    'alerts': 'warning',
    'perfil': 'user',
    'profile': 'user',
    'admin': 'dashboard',
    'usuarios': 'user',
    'users': 'user',
    'agregar': 'edit',
    'add': 'edit',
    'editar': 'edit',
    'edit': 'edit',
    'ver': 'home',
    'view': 'home',
    'analytics': 'dashboard',
    'widgets': 'dashboard',
    'settings': 'dashboard'
  }
  
  // Construir breadcrumb jerárquico
  let currentPath = ''
  
  for (let i = 0; i < pathSegments.length; i++) {
    const segment = pathSegments[i]
    currentPath += `/${segment}`
    
    // Determinar si es clickeable (todos excepto el último)
    const isClickable = i < pathSegments.length - 1
    
    // Obtener etiqueta
    let label = routeLabels[segment] || segment.charAt(0).toUpperCase() + segment.slice(1)
    
    // Si es un ID (número), mostrar la acción correspondiente
    if (!isNaN(segment) && i > 0) {
      const parentSegment = pathSegments[i - 1]
      if (parentSegment === 'editar' || parentSegment === 'edit') {
        label = 'Editar Cultivo'
      } else if (parentSegment === 'ver' || parentSegment === 'view') {
        label = 'Ver Cultivo'
      } else if (parentSegment === 'usuarios' || parentSegment === 'users') {
        label = 'Editar Usuario'
      } else if (parentSegment === 'dispositivos' || parentSegment === 'devices') {
        label = 'Editar Dispositivo'
      } else {
        label = 'Detalles'
      }
    }
    
    // Obtener icono
    let iconName = routeIcons[segment] || 'home'
    
    // Si es un ID, usar el icono de la acción correspondiente
    if (!isNaN(segment) && i > 0) {
      const parentSegment = pathSegments[i - 1]
      if (parentSegment === 'editar' || parentSegment === 'edit') {
        iconName = 'edit'
      } else if (parentSegment === 'ver' || parentSegment === 'view') {
        iconName = 'home'
      } else {
        iconName = 'edit'
      }
    }
    
    // Solo agregar si no es un segmento de acción (editar, ver) cuando va seguido de un ID
    const nextSegment = pathSegments[i + 1]
    const isActionSegment = (segment === 'editar' || segment === 'edit' || segment === 'ver' || segment === 'view')
    const nextIsId = nextSegment && !isNaN(nextSegment)
    
    if (!(isActionSegment && nextIsId)) {
      items.push({
        label,
        to: currentPath,
        icon: getIcon(iconName),
        clickable: isClickable
      })
    }
  }
  
  // Si no hay elementos, agregar Dashboard como inicio
  if (items.length === 0) {
    items.push({
      label: 'Dashboard',
      to: '/dashboard',
      icon: getIcon('home'),
      clickable: false
    })
  }
  
  return items
})
</script>

<style scoped>
/* Estilos adicionales si son necesarios */
</style> 