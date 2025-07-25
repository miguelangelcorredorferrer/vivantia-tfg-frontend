<script setup>
const userStore = useUserStore()

  // Esperar a que el store se inicialice en el cliente
  if (process.client) {
    await nextTick()
    
    if (!userStore.isInitialized) {
      await userStore.init()
    }
    
    // Redirigir según estado de autenticación y rol
    if (userStore.isAuthenticated && userStore.user?.verified) {
      // Si es admin, redirigir directamente a gestión de usuarios
      if (userStore.isAdmin) {
        await navigateTo('/admin/users')
      } else {
        // Si es usuario normal, redirigir al dashboard
        await navigateTo('/dashboard')
      }
    } else {
      await navigateTo('/auth/login')
    }
  } else {
    // En el servidor, redirigir al login por defecto
    await navigateTo('/auth/login')
  }
</script>

<template>
  <div class="flex items-center justify-center min-h-screen">
    <div class="text-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
      <p class="text-gray-400">Redirigiendo...</p>
    </div>
  </div>
</template>

<style scoped>
.bg-dark-card {
  background-color: #3a3a3a;
}
</style>


