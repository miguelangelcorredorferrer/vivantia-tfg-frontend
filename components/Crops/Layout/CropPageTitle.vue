<template>
  <div>
    <h1 class="text-3xl font-bold text-white">
      {{ title }}
    </h1>
    <p class="text-gray-400 text-lg">
      {{ description }}
    </p>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
})
</script> 