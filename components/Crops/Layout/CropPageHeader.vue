<template>
  <div class="mb-8">
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
      <div>
        <h1 class="text-3xl font-bold text-white">{{ title }}</h1>
        <p class="text-gray-400 mt-2">{{ description }}</p>
      </div>
      <slot name="actions">
        <NuxtLink 
          v-if="showAddButton"
          to="/cultivos/agregar"
          class="group inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200 transform hover:scale-105"
        >
          <svg class="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
          </svg>
          Añadir Cultivo
        </NuxtLink>
      </slot>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: 'Cultivos'
  },
  description: {
    type: String,
    default: 'Gestiona y configura tus cultivos para el sistema de riego automatizado'
  },
  showAddButton: {
    type: Boolean,
    default: true
  }
})
</script> 