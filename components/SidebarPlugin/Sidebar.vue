<script setup>
import SidebarItem from './SidebarItem.vue'
</script>

<template>
  <aside class="bg-gradient-blue-dark h-full rounded-lg shadow-xl overflow-hidden">
    <!-- Header de la sidebar con logo y nombre de empresa -->
    <div class="p-6 border-b border-blue-500/20">
      <div class="flex items-center space-x-3">
        <div class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
          <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </div>
        <div>
          <h2 class="text-white font-bold text-lg">VIVANTIA</h2>
          <p class="text-blue-200 text-xs">IoT Solutions</p>
        </div>
      </div>
    </div>

    <!-- Separador -->
    <div class="px-6 py-4">
      <div class="h-px bg-gradient-to-r from-transparent via-blue-300/30 to-transparent"></div>
    </div>
    
    <!-- Navegación principal -->
    <nav class="px-3">
      <div class="space-y-2">
        <SidebarItem 
          icon="dashboard" 
          label="Dashboard" 
          to="/dashboard" 
          :active="$route.path === '/dashboard'"
        />
        
        <SidebarItem 
          icon="devices" 
          label="Devices" 
          to="/devices" 
          :active="$route.path === '/devices'"
        />
        
        <SidebarItem 
          icon="plant" 
          label="Cultivos" 
          to="/cultivos" 
          :active="$route.path.startsWith('/cultivos')"
        />
        
        <SidebarItem 
          icon="watering" 
          label="Modos de Riego" 
          to="/modo" 
          :active="$route.path.startsWith('/modo')"
        />
        
        <SidebarItem 
          icon="settings" 
          label="Settings" 
          to="/settings" 
          :active="$route.path === '/settings'"
        />
      </div>
    </nav>

    <!-- Sección de estado en la parte inferior -->
    <div class="absolute bottom-4 left-6 right-6">
      <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
        <div class="flex items-center space-x-2 mb-2">
          <div class="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          <span class="text-sm font-medium text-white">Sistema Online</span>
        </div>
        <p class="text-xs text-blue-200">Todos los dispositivos conectados</p>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.bg-gradient-blue-dark {
  background: linear-gradient(180deg, #4A5DB8 0%, #2A3B7A 100%);
}

/* Animación para el indicador de estado */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>