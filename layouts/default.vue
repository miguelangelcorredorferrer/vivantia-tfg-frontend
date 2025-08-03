<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Header from '~/components/Header.vue'
import Sidebar from '~/components/SidebarPlugin/Sidebar.vue'
import Footer from '~/components/Footer.vue'
import Breadcrumb from '~/components/BreadcrumbPlugin/Breadcrumb.vue'

const sidebarOpen = ref(false)

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
}

const closeSidebar = () => {
  sidebarOpen.value = false
}

const handleResize = () => {
  if (window.innerWidth >= 1024) {
    sidebarOpen.value = false
  }
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <div class="min-h-screen bg-dark-secondary">
    <!-- Header fijo -->
    <Header 
      @toggle-sidebar="toggleSidebar" 
      class="fixed top-0 left-0 right-0 z-40"
    />
    
    <!-- Contenedor principal -->
    <div class="flex pt-16 pb-10">
      <!-- Sidebar flotante -->
      <div 
        class="fixed left-4 top-24 bottom-16 z-50 w-64 transform transition-transform duration-300 ease-in-out lg:translate-x-0"
        :class="sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'"
      >
        <Sidebar />
      </div>
      
      <!-- Overlay para móvil -->
      <div 
        v-if="sidebarOpen"
        class="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
        @click="closeSidebar"
      ></div>
      
      <!-- Área de contenido principal -->
      <main class="flex-1 lg:ml-72 ml-4 mr-4 overflow-x-hidden">
        <div class="bg-dark-secondary rounded-lg shadow-lg min-h-[calc(100vh-8rem)] p-6">
          <!-- Breadcrumb -->
          <Breadcrumb class="mb-6" />
          <slot />
        </div>
      </main>
    </div>
    
    <!-- Footer fijo -->
    <Footer class="fixed bottom-0 left-0 right-0 z-40" />
  </div>
</template>



