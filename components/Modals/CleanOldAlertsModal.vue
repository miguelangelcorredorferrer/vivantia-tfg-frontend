<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto">
    <!-- Overlay -->
    <div class="fixed inset-0 bg-black bg-opacity-75 transition-opacity" @click="cancel"></div>
    
    <!-- Modal -->
    <div class="flex min-h-screen items-center justify-center p-4">
      <div class="relative bg-gray-800 rounded-xl shadow-2xl border border-gray-700 max-w-lg w-full mx-auto transform transition-all">
        <!-- Header -->
        <div class="px-6 py-4 border-b border-gray-700">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-yellow-600 rounded-full flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.664-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"/>
              </svg>
            </div>
                         <h3 class="text-lg font-semibold text-white">{{ isAdmin ? 'Limpiar Alertas Antiguas' : 'Eliminar Todas las Alertas' }}</h3>
          </div>
        </div>
        
        <!-- Body -->
        <div class="px-6 py-4 space-y-4">
                     <p class="text-gray-300">
             {{ isAdmin ? 
               'Esto eliminará todas las alertas resueltas de todos los usuarios con más de los días especificados.' :
               'Esto eliminará TODAS tus alertas (resueltas y no resueltas).'
             }}
           </p>
          
                     <!-- Configuración de días (solo para admin) -->
           <div v-if="isAdmin">
             <label class="block text-sm font-medium text-gray-300 mb-2">
               Eliminar alertas resueltas con más de:
             </label>
             <div class="flex items-center space-x-3">
               <input
                 v-model.number="days"
                 type="number"
                 min="1"
                 max="365"
                 class="w-20 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-white text-center"
               >
               <span class="text-gray-300">días</span>
             </div>
           </div>
          
          <!-- Advertencia -->
          <div class="p-3 bg-yellow-900/30 border border-yellow-600 rounded-lg">
            <div class="flex items-start space-x-2">
              <svg class="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.664-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"/>
              </svg>
                             <div>
                 <p class="text-yellow-300 text-sm font-medium">Advertencia</p>
                 <p class="text-yellow-200 text-sm">{{ isAdmin ? 'Esta acción no se puede deshacer. Solo se eliminarán alertas que ya estén marcadas como resueltas.' : 'Esta acción no se puede deshacer. Se eliminarán TODAS tus alertas.' }}</p>
               </div>
            </div>
          </div>
          
          <!-- Vista previa (opcional) -->
          <div v-if="previewCount !== null" class="p-3 bg-blue-900/30 border border-blue-600 rounded-lg">
            <p class="text-blue-300 text-sm">
              Se eliminarán aproximadamente <strong>{{ previewCount }}</strong> alertas.
            </p>
          </div>
        </div>
        
        <!-- Footer -->
        <div class="px-6 py-4 border-t border-gray-700 flex justify-end space-x-3">
          <button
            @click="cancel"
            class="px-4 py-2 bg-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
            :disabled="isLoading"
          >
            Cancelar
          </button>
          <button
            @click="confirm"
            class="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
            :class="{ 'animate-pulse': isLoading }"
            :disabled="isLoading"
          >
            {{ isLoading ? 'Limpiando...' : 'Sí, limpiar' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  defaultDays: {
    type: Number,
    default: 30
  }
})

const emit = defineEmits(['confirm', 'cancel'])

const isLoading = ref(false)
const days = ref(props.defaultDays)
const previewCount = ref(null)

// Resetear días cuando se abre el modal
watch(() => props.isOpen, (newValue) => {
  if (newValue) {
    days.value = props.defaultDays
    previewCount.value = null
  }
})

const confirm = async () => {
  isLoading.value = true
  try {
    // Si es admin, pasar los días. Si no, no pasar parámetros
    if (props.isAdmin) {
      await emit('confirm', days.value)
    } else {
      await emit('confirm')
    }
  } finally {
    isLoading.value = false
  }
}

const cancel = () => {
  if (!isLoading.value) {
    emit('cancel')
  }
}
</script>

<style scoped>
.transition-all {
  transition: all 0.3s ease-in-out;
}
</style>
