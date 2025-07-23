<script setup>
// Redirect automático al login
await navigateTo('/auth/login')
</script>

<template>
  <div class="flex items-center justify-center min-h-screen">
    <div class="text-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
      <p class="text-gray-400">Redirigiendo al login...</p>
    </div>
  </div>
</template>

<style scoped>
.bg-dark-card {
  background-color: #3a3a3a;
}
</style>


