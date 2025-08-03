<template>
  <div class="bg-gray-800 rounded-lg p-6 border border-gray-700">
    <h3 class="text-lg font-semibold text-white mb-4">Acciones de cuenta</h3>
    
    <div class="space-y-4">
      <!-- Cerrar sesión -->
      <div class="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
        <div>
          <p class="text-white font-medium">Cerrar sesión</p>
          <p class="text-gray-400 text-sm">Salir de tu cuenta en este dispositivo</p>
        </div>
        <button
          @click="handleLogout"
          class="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors"
        >
          Cerrar sesión
        </button>
      </div>

      <!-- Eliminar cuenta -->
      <div class="flex items-center justify-between p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
        <div>
          <p class="text-red-400 font-medium">Eliminar cuenta</p>
          <p class="text-gray-400 text-sm">Esta acción es irreversible y eliminará todos tus datos</p>
        </div>
        <button
          @click="confirmDelete"
          class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
        >
          Eliminar cuenta
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['logout', 'confirm-delete'])

const handleLogout = () => {
  emit('logout')
}

const confirmDelete = () => {
  emit('confirm-delete')
}
</script> 