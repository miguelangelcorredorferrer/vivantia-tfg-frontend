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
  }
})

const canvas = ref(null)
let chart = null

const createChart = async () => {
  if (!canvas.value || !process.client) return
  
  try {
    console.log('🔥 Creating temperature chart...')
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
          label: 'Temperatura (°C)',
          data: [],
          borderColor: '#ef4444',
          backgroundColor: 'transparent',
          borderWidth: 3,
          tension: 0.6,
          fill: false,
          pointBackgroundColor: '#ef4444',
          pointBorderColor: '#ffffff',
          pointBorderWidth: 3,
          pointRadius: 5,
          pointHoverRadius: 8
        }, {
          label: 'Umbral Máximo (28°C)',
          data: [],
          borderColor: '#fbbf24',
          backgroundColor: 'transparent',
          borderWidth: 3,
          borderDash: [10, 5],
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
            borderColor: 'rgba(239, 68, 68, 0.5)',
            borderWidth: 1,
            callbacks: {
              label: function(context) {
                if (context.datasetIndex === 0) {
                  return `🌡️ Temperatura: ${context.parsed.y.toFixed(1)}°C`
                } else {
                  return `⚠️ Umbral máximo: ${context.parsed.y}°C`
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
              text: 'Temperatura (°C)',
              color: '#ef4444',
              font: { size: 12, weight: '600' }
            },
            ticks: {
              color: '#9ca3af',
              font: { size: 11 },
              callback: function(value) {
                return value + '°C'
              }
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.08)'
            },
            min: 15,
            max: 35
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
    
    console.log('✅ Temperature chart created successfully')
    
  } catch (error) {
    console.error('❌ Error creating temperature chart:', error)
  }
}

const updateChart = () => {
  if (!chart || !props.data) return
  
  try {
    const labels = props.data.labels || []
    const tempData = props.data.datasets?.[0]?.data || []
    const thresholdData = props.data.datasets?.[1]?.data || []
    
    console.log('📊 Updating temperature chart:', {
      labels: labels.length,
      tempData: tempData.length,
      latestTemp: tempData[tempData.length - 1],
      latestTime: labels[labels.length - 1]
    })
    
    // Actualizar datos del chart
    chart.data.labels = [...labels]
    chart.data.datasets[0].data = [...tempData]
    chart.data.datasets[1].data = [...thresholdData]
    
    // Actualizar sin animación para tiempo real
    chart.update('none')
    
  } catch (error) {
    console.error('❌ Error updating temperature chart:', error)
  }
}

// Watcher principal para detectar cambios en los datos
watch(() => props.data, (newData) => {
  if (newData && newData.labels && newData.datasets) {
    console.log('📊 Temperature data changed, triggering update')
    nextTick(() => {
      updateChart()
    })
  }
}, { 
  deep: true, 
  immediate: false 
})

onMounted(async () => {
  console.log('🎯 Temperature chart component mounted')
  await nextTick()
  await createChart()
  
  // Actualizar con datos iniciales si están disponibles
  if (props.data && props.data.labels && props.data.labels.length > 0) {
    updateChart()
  }
})

onUnmounted(() => {
  console.log('🎯 Temperature chart component unmounted')
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