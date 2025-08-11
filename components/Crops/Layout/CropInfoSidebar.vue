<template>
  <BaseCard title="Información de Ayuda">
    <div class="space-y-4">
      <!-- Consejos -->
      <div>
        <h4 class="text-sm font-medium text-white mb-3">Consejos para el Formulario</h4>
        <div class="space-y-3">
          <div class="bg-blue-900/20 border border-blue-500/30 rounded-lg p-3">
            <p class="text-xs text-blue-300">
              <strong>Humedad:</strong> La humedad mínima debe ser menor que la máxima. Valores típicos entre 40-90%.
            </p>
          </div>
          <div class="bg-green-900/20 border border-green-500/30 rounded-lg p-3">
            <p class="text-xs text-green-300">
              <strong>Temperatura:</strong> Indica la temperatura máxima que puede tolerar el cultivo.
            </p>
          </div>
          <div class="bg-purple-900/20 border border-purple-500/30 rounded-lg p-3">
            <p class="text-xs text-purple-300">
              <strong>Imagen:</strong> Usa una foto clara y representativa del cultivo para mejor identificación.
            </p>
          </div>
        </div>
      </div>

      <!-- Categorías disponibles -->
      <div class="border-t border-gray-600 pt-4">
        <h4 class="text-sm font-medium text-white mb-3">Categorías Disponibles</h4>
        <div class="space-y-1">
          <div v-for="category in availableCategories" :key="category" class="text-xs text-gray-400">
            • {{ category }}
          </div>
        </div>
      </div>

      <!-- Temporadas -->
      <div class="border-t border-gray-600 pt-4">
        <h4 class="text-sm font-medium text-white mb-3">Temporadas</h4>
        <div class="space-y-1">
          <div v-for="season in availableSeasons" :key="season" class="text-xs text-gray-400">
            • {{ season }}
          </div>
        </div>
      </div>
    </div>
  </BaseCard>
</template>

<script setup>
import BaseCard from '~/components/Cards/BaseCard.vue'

defineProps({
  availableCategories: {
    type: Array,
    default: () => []
  },
  availableSeasons: {
    type: Array,
    default: () => []
  }
})
</script> 