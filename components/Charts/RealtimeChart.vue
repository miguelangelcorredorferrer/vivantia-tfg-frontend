<template>
  <div class="chart-container">
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, onUnmounted, nextTick } from 'vue'

const props = defineProps({
  data: {
    type: Object,
    required: true
  },
  options: {
    type: Object,
    default: () => ({})
  },
  height: {
    type: String,
    default: '300px'
  }
})

const chartCanvas = ref(null)
let chartInstance = null

const defaultOptions = {
  responsive: true,
  maintainAspectRatio: false,
  animation: {
    duration: 750,
    easing: 'easeInOutQuart'
  },
  plugins: {
    legend: {
      display: true,
      position: 'top',
      labels: {
        color: '#e5e7eb',
        font: {
          size: 12,
          weight: '500'
        },
        usePointStyle: true,
        padding: 20,
        filter: function(item) {
          return !item.text.includes('Umbral') || item.datasetIndex > 0
        }
      }
    },
    tooltip: {
      backgroundColor: 'rgba(17, 24, 39, 0.95)',
      titleColor: '#f9fafb',
      bodyColor: '#f9fafb',
      borderColor: '#4A5DB8',
      borderWidth: 1,
      cornerRadius: 8,
      displayColors: true,
      mode: 'index',
      intersect: false,
      callbacks: {
        label: function(context) {
          const datasetLabel = context.dataset.label
          const value = context.parsed.y.toFixed(1)
          
          if (datasetLabel === 'Temperatura') {
            return `${datasetLabel}: ${value}°C`
          } else if (datasetLabel === 'Humedad') {
            return `${datasetLabel}: ${value}%`
          } else {
            return `${datasetLabel}: ${value}`
          }
        }
      }
    }
  },
  scales: {
    x: {
      display: true,
      title: {
        display: true,
        text: 'Tiempo',
        color: '#9ca3af',
        font: {
          size: 12,
          weight: '500'
        }
      },
      ticks: {
        color: '#9ca3af',
        font: {
          size: 11
        },
        maxTicksLimit: 8
      },
      grid: {
        color: 'rgba(255, 255, 255, 0.1)',
        drawBorder: false
      }
    },
    y: {
      display: true,
      title: {
        display: true,
        text: 'Valor',
        color: '#4A5DB8',
        font: {
          size: 12,
          weight: '500'
        }
      },
      ticks: {
        color: '#9ca3af',
        font: {
          size: 11
        },
        callback: function(value) {
          return value.toFixed(1)
        }
      },
      grid: {
        color: 'rgba(255, 255, 255, 0.1)',
        drawBorder: false
      }
    }
  },
  interaction: {
    intersect: false,
    mode: 'index'
  },
  elements: {
    point: {
      hoverRadius: 8
    }
  }
}

const createChart = async () => {
  if (!chartCanvas.value || !process.client) return

  try {
    // Importar Chart.js dinámicamente
    const { Chart } = await import('chart.js/auto')
    
    await nextTick()

    const ctx = chartCanvas.value.getContext('2d')

    if (chartInstance) {
      chartInstance.destroy()
    }

    // Combinar opciones por defecto con las personalizadas
    const mergedOptions = { 
      ...defaultOptions, 
      ...props.options,
      plugins: {
        ...defaultOptions.plugins,
        ...props.options.plugins
      },
      scales: {
        ...defaultOptions.scales,
        ...props.options.scales
      }
    }

    chartInstance = new Chart(ctx, {
      type: 'line',
      data: props.data,
      options: mergedOptions
    })

  } catch (error) {
    console.error('Error creando gráfica:', error)
  }
}

const updateChart = () => {
  if (!chartInstance || !process.client) return

  try {
    chartInstance.data = props.data
    chartInstance.update('none') // Actualización sin animación para tiempo real
  } catch (error) {
    console.error('Error actualizando gráfica:', error)
  }
}

// Watchers
watch(() => props.data, updateChart, { deep: true })

watch(() => props.options, () => {
  if (chartInstance && process.client) {
    createChart() // Recrear gráfica cuando cambien las opciones
  }
}, { deep: true })

// Lifecycle
onMounted(() => {
  if (process.client) {
    createChart()
  }
})

onUnmounted(() => {
  if (chartInstance) {
    chartInstance.destroy()
  }
})
</script>

<style scoped>
.chart-container {
  position: relative;
  height: v-bind(height);
  width: 100%;
  padding: 10px;
}

canvas {
  max-width: 100%;
  height: 100% !important;
}
</style> 