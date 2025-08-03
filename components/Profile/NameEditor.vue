<template>
  <div class="bg-gray-800 rounded-lg p-6 border border-gray-700">
    <h3 class="text-lg font-semibold text-white mb-4">Nombre de perfil</h3>
    
    <div v-if="!isEditing" class="flex items-center justify-between">
      <div>
        <p class="text-white font-medium">{{ currentName }}</p>
        <p class="text-gray-400 text-sm">Este es tu nombre de visualización en la aplicación</p>
      </div>
      <button
        @click="startEditing"
        class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
      >
        Cambiar nombre
      </button>
    </div>

    <div v-else class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-white mb-2">Nuevo nombre</label>
        <input
          v-model="nameForm.name"
          type="text"
          class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Tu nuevo nombre"
        />
      </div>
      <div class="flex space-x-3">
        <button
          @click="saveName"
          :disabled="isLoading"
          class="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white rounded-lg transition-colors"
        >
          {{ isLoading ? 'Guardando...' : 'Guardar' }}
        </button>
        <button
          @click="cancelEditing"
          class="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
        >
          Cancelar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const props = defineProps({
  currentName: {
    type: String,
    required: true
  },
  isLoading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['save-name', 'cancel'])

const isEditing = ref(false)
const nameForm = reactive({
  name: props.currentName || ''
})

const startEditing = () => {
  nameForm.name = props.currentName || ''
  isEditing.value = true
}

const cancelEditing = () => {
  nameForm.name = props.currentName || ''
  isEditing.value = false
  emit('cancel')
}

const saveName = () => {
  if (!nameForm.name.trim()) {
    return
  }
  emit('save-name', nameForm.name)
  isEditing.value = false
}
</script> 