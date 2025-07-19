import { ref, computed, onMounted, onUnmounted } from 'vue'

export function useSensorData() {
  // Configuración de umbrales por cultivo
  const cropThresholds = ref({
    temperatureMax: 28, // °C
    humidityMin: 40,    // %
    humidityMax: 80     // %
  })

  // Datos reactivos para las gráficas
  const temperatureData = ref({
    labels: [],
    datasets: [
      {
        label: 'Temperatura',
        data: [],
        borderColor: '#ef4444', // Rojo para temperatura
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        borderWidth: 3,
        tension: 0.6, // Curva suave
        fill: true,
        pointBackgroundColor: '#ef4444',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 3,
        pointRadius: 5,
        pointHoverRadius: 8
      },
      {
        label: 'Umbral Máximo',
        data: [],
        borderColor: '#fbbf24', // Amarillo para umbral
        backgroundColor: 'transparent',
        borderWidth: 3,
        borderDash: [10, 5],
        pointRadius: 0,
        fill: false,
        tension: 0
      }
    ]
  })

  const humidityData = ref({
    labels: [],
    datasets: [
      {
        label: 'Humedad',
        data: [],
        borderColor: '#3b82f6', // Azul para humedad
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderWidth: 3,
        tension: 0.6, // Curva suave
        fill: true,
        pointBackgroundColor: '#3b82f6',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 3,
        pointRadius: 5,
        pointHoverRadius: 8
      },
      {
        label: 'Umbral Mínimo',
        data: [],
        borderColor: '#60a5fa', // Azul claro para umbral mínimo
        backgroundColor: 'transparent',
        borderWidth: 3,
        borderDash: [10, 5],
        pointRadius: 0,
        fill: false,
        tension: 0
      },
      {
        label: 'Umbral Máximo',
        data: [],
        borderColor: '#1d4ed8', // Azul oscuro para umbral máximo
        backgroundColor: 'transparent',
        borderWidth: 3,
        borderDash: [5, 10],
        pointRadius: 0,
        fill: false,
        tension: 0
      }
    ]
  })

  // Valores actuales
  const currentTemperature = ref(25.0)
  const currentHumidity = ref(65.0)
  const temperatureTrend = ref({ value: 0, direction: 'neutral' })
  const humidityTrend = ref({ value: 0, direction: 'neutral' })

  let interval = null
  const maxDataPoints = 20

  // Función para generar temperatura realista
  const generateRandomTemperature = () => {
    const baseTemp = 25
    const timeOfDay = new Date().getHours()
    const dailyCycle = Math.sin((timeOfDay - 6) * Math.PI / 12) * 5 // Ciclo diario
    const randomVariation = (Math.random() - 0.5) * 3
    const temperature = baseTemp + dailyCycle + randomVariation
    return Math.max(18, Math.min(35, temperature))
  }

  // Función para generar humedad realista
  const generateRandomHumidity = () => {
    const baseHumidity = 65
    const timeOfDay = new Date().getHours()
    const dailyCycle = Math.cos((timeOfDay - 6) * Math.PI / 12) * 10 // Ciclo diario inverso
    const randomVariation = (Math.random() - 0.5) * 8
    const humidity = baseHumidity + dailyCycle + randomVariation
    return Math.max(30, Math.min(90, humidity))
  }

  // Formatear tiempo
  const formatTime = (date) => {
    return date.toLocaleTimeString('es-ES', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    })
  }

  // Actualizar líneas de umbral
  const updateThresholdLines = (labelsLength) => {
    // Umbral de temperatura - crear nuevo array
    temperatureData.value.datasets[1].data = new Array(labelsLength).fill(cropThresholds.value.temperatureMax)
    
    // Umbrales de humedad - crear nuevos arrays
    humidityData.value.datasets[1].data = new Array(labelsLength).fill(cropThresholds.value.humidityMin)
    humidityData.value.datasets[2].data = new Array(labelsLength).fill(cropThresholds.value.humidityMax)
  }

  // Calcular tendencias
  const updateTrends = (newTemp, oldTemp, newHumidity, oldHumidity) => {
    if (oldTemp !== null && oldTemp !== 0) {
      const tempChange = ((newTemp - oldTemp) / oldTemp) * 100
      temperatureTrend.value = {
        value: Math.abs(tempChange).toFixed(1),
        direction: tempChange > 0.1 ? 'up' : tempChange < -0.1 ? 'down' : 'neutral'
      }
    }

    if (oldHumidity !== null && oldHumidity !== 0) {
      const humidityChange = ((newHumidity - oldHumidity) / oldHumidity) * 100
      humidityTrend.value = {
        value: Math.abs(humidityChange).toFixed(1),
        direction: humidityChange > 0.1 ? 'up' : humidityChange < -0.1 ? 'down' : 'neutral'
      }
    }
  }

  // Añadir nuevo punto de datos con forzado de reactividad
  const addDataPoint = () => {
    console.log('🔄 Adding new data point at:', new Date().toLocaleTimeString())
    
    const now = new Date()
    const timeLabel = formatTime(now)

    const oldTemp = currentTemperature.value
    const oldHumidity = currentHumidity.value

    const newTemp = generateRandomTemperature()
    const newHumidity = generateRandomHumidity()

    console.log(`📊 New values - Temp: ${newTemp.toFixed(1)}°C, Humidity: ${newHumidity.toFixed(1)}%`)

    currentTemperature.value = Number(newTemp.toFixed(1))
    currentHumidity.value = Number(newHumidity.toFixed(1))

    updateTrends(newTemp, oldTemp, newHumidity, oldHumidity)

    // CRÍTICO: Crear nuevos arrays para forzar reactividad
    const newTempLabels = [...temperatureData.value.labels, timeLabel]
    const newTempData = [...temperatureData.value.datasets[0].data, newTemp]
    
    const newHumidityLabels = [...humidityData.value.labels, timeLabel]
    const newHumidityData = [...humidityData.value.datasets[0].data, newHumidity]

    // Mantener solo los últimos N puntos
    if (newTempLabels.length > maxDataPoints) {
      newTempLabels.shift()
      newTempData.shift()
    }

    if (newHumidityLabels.length > maxDataPoints) {
      newHumidityLabels.shift()
      newHumidityData.shift()
    }

    // Actualizar con nuevas referencias de arrays para forzar reactividad
    temperatureData.value = {
      ...temperatureData.value,
      labels: newTempLabels,
      datasets: [
        {
          ...temperatureData.value.datasets[0],
          data: newTempData
        },
        {
          ...temperatureData.value.datasets[1],
          data: new Array(newTempLabels.length).fill(cropThresholds.value.temperatureMax)
        }
      ]
    }

    humidityData.value = {
      ...humidityData.value,
      labels: newHumidityLabels,
      datasets: [
        {
          ...humidityData.value.datasets[0],
          data: newHumidityData
        },
        {
          ...humidityData.value.datasets[1],
          data: new Array(newHumidityLabels.length).fill(cropThresholds.value.humidityMin)
        },
        {
          ...humidityData.value.datasets[2],
          data: new Array(newHumidityLabels.length).fill(cropThresholds.value.humidityMax)
        }
      ]
    }

    console.log('✅ Data updated - Temp points:', newTempData.length, 'Humidity points:', newHumidityData.length)
  }

  // Inicializar simulación
  const startSimulation = () => {
    console.log('🚀 Starting IoT simulation...')
    
    // Generar algunos datos iniciales rápidamente
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        addDataPoint()
      }, i * 300)
    }

    // Actualizar cada 3 segundos
    interval = setInterval(() => {
      addDataPoint()
    }, 3000)
    
    console.log('⏰ Interval set for every 3 seconds')
  }

  // Detener simulación
  const stopSimulation = () => {
    if (interval) {
      clearInterval(interval)
      interval = null
      console.log('⏹️ Simulation stopped')
    }
  }

  // Formatear valores para mostrar
  const formattedTemperature = computed(() => {
    return `${currentTemperature.value}°C`
  })

  const formattedHumidity = computed(() => {
    return `${currentHumidity.value}%`
  })

  // Lifecycle hooks
  onMounted(() => {
    console.log('🎯 Composable mounted, starting simulation...')
    startSimulation()
  })

  onUnmounted(() => {
    console.log('🎯 Composable unmounted, stopping simulation...')
    stopSimulation()
  })

  return {
    temperatureData,
    humidityData,
    currentTemperature,
    currentHumidity,
    temperatureTrend,
    humidityTrend,
    cropThresholds,
    formattedTemperature,
    formattedHumidity,
    startSimulation,
    stopSimulation
  }
} 