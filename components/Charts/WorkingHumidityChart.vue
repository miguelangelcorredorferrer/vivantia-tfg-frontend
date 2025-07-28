<template>
  <div class="improved-chart">
    <div class="chart-wrapper">
      <canvas ref="canvas"></canvas>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, onUnmounted, nextTick } from 'vue'

const props = defineProps({
  data: {
    type: Object,
    required: true
  },
  humidityMin: {
    type: Number,
    default: 40
  },
  humidityMax: {
    type: Number,
    default: 80
  }
})

const canvas = ref(null)
let chart = null

const createChart = async () => {
  if (!canvas.value || !process.client) return
  
  try {
    console.log('💧 Creating humidity chart...')
    const { Chart } = await import('chart.js/auto')
    
    const ctx = canvas.value.getContext('2d')
    
    if (chart) {
      chart.destroy()
    }
    
    chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [],
        datasets: [{
          label: 'Humedad (%)',
          data: [],
          borderColor: '#3b82f6',
          backgroundColor: 'transparent',
          borderWidth: 3,
          tension: 0.6,
          fill: false,
          pointBackgroundColor: '#3b82f6',
          pointBorderColor: '#ffffff',
          pointBorderWidth: 3,
          pointRadius: 5,
          pointHoverRadius: 8
        }, {
          label: `Umbral Mínimo (${props.humidityMin}%)`,
          data: [],
          borderColor: '#60a5fa',
          backgroundColor: 'transparent',
          borderWidth: 3,
          borderDash: [10, 5],
          pointRadius: 0,
          fill: false,
          tension: 0
        }, {
          label: `Umbral Máximo (${props.humidityMax}%)`,
          data: [],
          borderColor: '#1d4ed8',
          backgroundColor: 'transparent',
          borderWidth: 3,
          borderDash: [5, 10],
          pointRadius: 0,
          fill: false,
          tension: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          intersect: false,
          mode: 'index'
        },
        plugins: {
          legend: {
            display: true,
            position: 'top',
            labels: {
              color: '#9ca3af',
              font: { size: 12, weight: '600' },
              usePointStyle: true,
              padding: 20
            }
          },
          tooltip: {
            enabled: true,
            mode: 'index',
            intersect: false,
            backgroundColor: 'rgba(17, 24, 39, 0.9)',
            titleColor: '#ffffff',
            bodyColor: '#ffffff',
            borderColor: 'rgba(59, 130, 246, 0.5)',
            borderWidth: 1,
            callbacks: {
              label: function(context) {
                if (context.datasetIndex === 0) {
                  return `💧 Humedad: ${context.parsed.y.toFixed(1)}%`
                } else if (context.datasetIndex === 1) {
                  return `⚠️ Umbral mínimo: ${context.parsed.y}%`
                } else {
                  return `⚠️ Umbral máximo: ${context.parsed.y}%`
                }
              }
            }
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Tiempo',
              color: '#9ca3af',
              font: { size: 12, weight: '600' }
            },
            ticks: {
              color: '#9ca3af',
              maxTicksLimit: 6,
              font: { size: 11 }
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.08)'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Humedad (%)',
              color: '#3b82f6',
              font: { size: 12, weight: '600' }
            },
            ticks: {
              color: '#9ca3af',
              font: { size: 11 },
              callback: function(value) {
                return value + '%'
              }
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.08)'
            },
            min: 25,
            max: 95
          }
        },
        elements: {
          point: {
            radius: 4,
            hoverRadius: 4
          }
        },
        animation: false // Deshabilitamos animaciones para mejor rendimiento en tiempo real
      }
    })
    
    console.log('✅ Humidity chart created successfully')
    
  } catch (error) {
    console.error('❌ Error creating humidity chart:', error)
  }
}

const updateChart = () => {
  if (!chart || !props.data) return
  
  try {
    const labels = props.data.labels || []
    const humidityData = props.data.datasets?.[0]?.data || []
    
    // Generar datos de los umbrales basados en el cultivo seleccionado
    const minThresholdData = labels.map(() => props.humidityMin)
    const maxThresholdData = labels.map(() => props.humidityMax)
    
    console.log('📊 Updating humidity chart:', {
      labels: labels.length,
      humidityData: humidityData.length,
      latestHumidity: humidityData[humidityData.length - 1],
      latestTime: labels[labels.length - 1],
      humidityMin: props.humidityMin,
      humidityMax: props.humidityMax
    })
    
    // Actualizar datos del chart
    chart.data.labels = [...labels]
    chart.data.datasets[0].data = [...humidityData]
    chart.data.datasets[1].data = [...minThresholdData]
    chart.data.datasets[2].data = [...maxThresholdData]
    
    // Actualizar las etiquetas de los umbrales
    chart.data.datasets[1].label = `Umbral Mínimo (${props.humidityMin}%)`
    chart.data.datasets[2].label = `Umbral Máximo (${props.humidityMax}%)`
    
    // Actualizar sin animación para tiempo real
    chart.update('none')
    
  } catch (error) {
    console.error('❌ Error updating humidity chart:', error)
  }
}

// Watcher principal para detectar cambios en los datos
watch(() => props.data, (newData) => {
  if (newData && newData.labels && newData.datasets) {
    console.log('📊 Humidity data changed, triggering update')
    nextTick(() => {
      updateChart()
    })
  }
}, { 
  deep: true, 
  immediate: false 
})

// Watcher para detectar cambios en los umbrales de humedad
watch([() => props.humidityMin, () => props.humidityMax], ([newMin, newMax]) => {
  console.log('💧 Humidity thresholds changed:', { min: newMin, max: newMax })
  nextTick(() => {
    updateChart()
  })
}, { immediate: false })

onMounted(async () => {
  console.log('🎯 Humidity chart component mounted')
  await nextTick()
  await createChart()
  
  // Actualizar con datos iniciales si están disponibles
  if (props.data && props.data.labels && props.data.labels.length > 0) {
    updateChart()
  }
})

onUnmounted(() => {
  console.log('🎯 Humidity chart component unmounted')
  if (chart) {
    chart.destroy()
    chart = null
  }
})
</script>

<style scoped>
.improved-chart {
  position: relative;
  background: rgba(17, 24, 39, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1rem;
  backdrop-filter: blur(10px);
}

.chart-wrapper {
  position: relative;
  height: 300px;
  width: 100%;
}

canvas {
  border-radius: 8px;
}
</style> 