<template>
  <div class="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700">
    <h2 class="text-xl font-bold text-white mb-6">Acciones Rápidas</h2>
    
    <div class="space-y-3">
      <button
        v-if="isUserCrop"
        @click="$emit('toggleSelection')"
        class="w-full px-4 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-medium rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 flex items-center justify-center space-x-2"
      >
        <CheckIcon />
        <span>{{ crop.selected ? 'Deseleccionar' : 'Seleccionar' }} Cultivo</span>
      </button>
      
      <button
        v-if="isUserCrop"
        @click="$emit('edit')"
        class="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center justify-center space-x-2"
      >
        <EditIcon />
        <span>Editar Información</span>
      </button>
      
      <button
        @click="$emit('goBack')"
        class="w-full px-4 py-3 bg-gray-600 text-gray-300 font-medium rounded-lg hover:bg-gray-700 transition-all duration-200 flex items-center justify-center space-x-2"
      >
        <ChevronLeftIcon />
        <span>Volver a Cultivos</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import {
  CheckIcon,
  EditIcon,
  ChevronLeftIcon
} from '~/assets/icons'

const props = defineProps({
  crop: {
    type: Object,
    required: true
  },
  isUserCrop: {
    type: Boolean,
    default: false
  }
})

defineEmits(['toggleSelection', 'edit', 'goBack'])
</script> 