<template>
  <div class="bg-gray-800 rounded-lg p-6 border border-gray-700">
    <div class="flex items-center space-x-4 mb-6">
      <div class="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
        <span class="text-white font-bold text-2xl">
          {{ userName?.charAt(0)?.toUpperCase() || 'U' }}
        </span>
      </div>
      <div>
        <h2 class="text-xl font-semibold text-white">{{ userName }}</h2>
        <p class="text-gray-400">{{ userEmail }}</p>
        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-2">
          <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
          </svg>
          Cuenta verificada
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  userName: {
    type: String,
    required: true
  },
  userEmail: {
    type: String,
    required: true
  }
})
</script> 