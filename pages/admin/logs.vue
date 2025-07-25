<script setup>
// Configurar middleware de administrador
definePageMeta({
  middleware: 'admin'
})
</script>

<template>
  <div class="space-y-8">
    <!-- Header de la página -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-white">Logs del Sistema</h1>
      <p class="text-gray-400 mt-2">Monitoreo y análisis de eventos del sistema</p>
    </div>

    <!-- Contenido de la página (vacío por ahora) -->
    <div class="bg-gray-800/50 border border-gray-600/30 rounded-lg p-8 text-center">
      <div class="w-16 h-16 mx-auto mb-4 bg-yellow-500/20 rounded-full flex items-center justify-center">
        <svg class="w-8 h-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
        </svg>
      </div>
      <h3 class="text-lg font-medium text-white mb-2">Panel de Logs del Sistema</h3>
      <p class="text-gray-400">Esta sección estará disponible próximamente</p>
    </div>
  </div>
</template> 