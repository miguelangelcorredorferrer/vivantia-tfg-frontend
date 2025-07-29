import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import SensorAPI from '~/api/SensorAPI.js'
import { useDeviceStore } from '~/stores/device'
import { useUserStore } from '~/stores/user'

export function useSensorData() {
  // Stores
  const deviceStore = useDeviceStore()
  const userStore = useUserStore()

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

  // Datos reales para usuarios autenticados
  const realDataPoints = ref([])
  
  // Función para obtener dispositivo activo
  const getActiveDevice = () => {
    return deviceStore.activeDevices?.find(device => device.isActive) || 
           deviceStore.devices?.find(device => device.is_active_communication) ||
           null
  }

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

  // Formatear fecha desde string de la BD
  const formatTimeFromString = (dateString) => {
    const date = new Date(dateString)
    return formatTime(date)
  }

  // Actualizar líneas de umbral
  const updateThresholdLines = (labelsLength) => {
    // Umbral de temperatura - crear nuevo array
    temperatureData.value.datasets[1].data = new Array(labelsLength).fill(cropThresholds.value.temperatureMax)
    
    // Umbrales de humedad - crear nuevos arrays
    humidityData.value.datasets[1].data = new Array(labelsLength).fill(cropThresholds.value.humidityMin)
    humidityData.value.datasets[2].data = new Array(labelsLength).fill(cropThresholds.value.humidityMax)
  }

  // Inicializar tendencias cuando no hay datos previos
  const initializeTrends = () => {
    temperatureTrend.value = {
      value: '0.0',
      direction: 'neutral'
    }
    humidityTrend.value = {
      value: '0.0',
      direction: 'neutral'
    }
    console.log('🔄 Trends initialized to neutral')
  }

  // Calcular tendencias de manera simplificada y precisa
  const calculateTrends = (currentTemp, previousTemp, currentHumidity, previousHumidity) => {
    console.log('🔄 Calculating trends with:', {
      currentTemp,
      previousTemp,
      currentHumidity,
      previousHumidity
    })
    
    // Umbral mínimo para considerar un cambio significativo
    const MIN_TEMP_CHANGE = 0.1 // 0.1°C para temperatura
    const MIN_HUMIDITY_CHANGE = 0.5 // 0.5% para humedad (diferencia absoluta)
    
    // Calcular tendencia de temperatura (diferencia absoluta en grados)
    if (previousTemp !== null && !isNaN(previousTemp) && !isNaN(currentTemp)) {
      const tempChange = currentTemp - previousTemp
      
      console.log('🌡️ Temperature calculation:', {
        current: currentTemp,
        previous: previousTemp,
        change: tempChange,
        absChange: Math.abs(tempChange),
        threshold: MIN_TEMP_CHANGE
      })
      
      // Solo actualizar si hay un cambio significativo
      if (Math.abs(tempChange) >= MIN_TEMP_CHANGE) {
        temperatureTrend.value = {
          value: Math.abs(tempChange).toFixed(1), // Mostrar diferencia en grados
          direction: tempChange > 0 ? 'up' : 'down'
        }
      } else {
        // Si el cambio es muy pequeño, mantener neutral
        temperatureTrend.value = {
          value: '0.0',
          direction: 'neutral'
        }
      }
      
      console.log('🌡️ Temperature trend result:', temperatureTrend.value)
    } else {
      // Si no hay datos previos válidos, inicializar como neutral
      temperatureTrend.value = {
        value: '0.0',
        direction: 'neutral'
      }
      console.log('🌡️ Temperature trend: No valid previous data, set to neutral')
    }

    // Calcular tendencia de humedad (diferencia absoluta, no porcentaje)
    if (previousHumidity !== null && !isNaN(previousHumidity) && !isNaN(currentHumidity)) {
      const humidityChange = currentHumidity - previousHumidity
      
      console.log('💧 Humidity calculation:', {
        current: currentHumidity,
        previous: previousHumidity,
        change: humidityChange,
        absChange: Math.abs(humidityChange),
        threshold: MIN_HUMIDITY_CHANGE
      })
      
      // Solo actualizar si hay un cambio significativo
      if (Math.abs(humidityChange) >= MIN_HUMIDITY_CHANGE) {
        humidityTrend.value = {
          value: Math.abs(humidityChange).toFixed(1), // Mostrar diferencia absoluta
          direction: humidityChange > 0 ? 'up' : 'down'
        }
      } else {
        // Si el cambio es muy pequeño, mantener neutral
        humidityTrend.value = {
          value: '0.0',
          direction: 'neutral'
        }
      }
      
      console.log('💧 Humidity trend result:', humidityTrend.value)
    } else {
      // Si no hay datos previos válidos, inicializar como neutral
      humidityTrend.value = {
        value: '0.0',
        direction: 'neutral'
      }
      console.log('💧 Humidity trend: No valid previous data, set to neutral')
    }
  }

  // Cargar datos reales desde la API
  const loadRealData = async () => {
    if (userStore.isDemoMode) return

    const activeDevice = getActiveDevice()
    if (!activeDevice) {
      console.log('⚠️ No hay dispositivo activo para cargar datos')
      return
    }

    try {
      console.log('🔄 Cargando datos reales del dispositivo:', activeDevice.id)
      
      // Obtener las últimas 20 lecturas
      const response = await SensorAPI.getSensorReadingsByDeviceId(activeDevice.id)
      
      if (response.success && response.data && response.data.length > 0) {
        // Ordenar por fecha y tomar solo los últimos 20
        const sortedData = response.data
          .sort((a, b) => new Date(a.received_at) - new Date(b.received_at))
          .slice(-maxDataPoints)
        
        realDataPoints.value = sortedData
        updateChartsWithRealData(sortedData)
        
        console.log('✅ Datos reales cargados:', sortedData.length, 'puntos')
      } else {
        console.log('⚠️ No hay datos de sensores para este dispositivo')
        // Mantener las gráficas vacías
        realDataPoints.value = []
      }
    } catch (error) {
      console.error('❌ Error cargando datos reales:', error)
    }
  }

  // Verificar nuevos datos reales
  const checkForNewRealData = async () => {
    if (userStore.isDemoMode) return

    const activeDevice = getActiveDevice()
    if (!activeDevice) return

    try {
      const response = await SensorAPI.getLatestSensorReadingByDeviceId(activeDevice.id)
      
      if (response.success && response.data) {
        const newReading = response.data
        const lastPoint = realDataPoints.value[realDataPoints.value.length - 1]
        
        // Verificar si es un dato nuevo
        const isNewData = !lastPoint || 
          new Date(newReading.received_at) > new Date(lastPoint.received_at)

        if (isNewData) {
          console.log('📊 Nuevo dato encontrado:', newReading)
          
          // Agregar nuevo punto
          realDataPoints.value.push(newReading)
          
          // Mantener solo los últimos 20 puntos
          if (realDataPoints.value.length > maxDataPoints) {
            realDataPoints.value.shift()
          }
          
          updateChartsWithRealData(realDataPoints.value)
        }
      }
    } catch (error) {
      console.error('❌ Error verificando nuevos datos:', error)
    }
  }

  // Actualizar gráficas con datos reales
  const updateChartsWithRealData = (dataPoints) => {
    if (dataPoints.length === 0) return

    // Extraer datos para las gráficas
    const labels = dataPoints.map(point => formatTimeFromString(point.received_at))
    const temperatureValues = dataPoints.map(point => Number(point.temperature || 0))
    const humidityValues = dataPoints.map(point => Number(point.humidity || 0))

    // Calcular rangos dinámicos para los ejes Y
    const tempMin = Math.min(...temperatureValues, cropThresholds.value.temperatureMax)
    const tempMax = Math.max(...temperatureValues, cropThresholds.value.temperatureMax)
    const humidityMin = Math.min(...humidityValues, cropThresholds.value.humidityMin, cropThresholds.value.humidityMax)
    const humidityMax = Math.max(...humidityValues, cropThresholds.value.humidityMin, cropThresholds.value.humidityMax)

    // Añadir margen del 10% para mejor visualización
    const tempRange = tempMax - tempMin
    const humidityRange = humidityMax - humidityMin
    const tempMargin = tempRange * 0.1
    const humidityMargin = humidityRange * 0.1

    // Actualizar valores actuales
    const lastPoint = dataPoints[dataPoints.length - 1]
    const oldTemp = currentTemperature.value
    const oldHumidity = currentHumidity.value
    
    currentTemperature.value = Number(lastPoint.temperature || 0)
    currentHumidity.value = Number(lastPoint.humidity || 0)

    // Calcular tendencias
    if (dataPoints.length > 1) {
      const prevPoint = dataPoints[dataPoints.length - 2]
      
      console.log('📊 Data points for trend calculation:', {
        currentPoint: {
          temperature: lastPoint.temperature,
          humidity: lastPoint.humidity,
          received_at: lastPoint.received_at
        },
        previousPoint: {
          temperature: prevPoint.temperature,
          humidity: prevPoint.humidity,
          received_at: prevPoint.received_at
        }
      })
      
      calculateTrends(
        Number(lastPoint.temperature || 0), 
        Number(prevPoint.temperature || 0),
        Number(lastPoint.humidity || 0), 
        Number(prevPoint.humidity || 0)
      )
    } else {
      // Si es el primer punto, inicializar tendencias
      console.log('📊 First data point, initializing trends')
      initializeTrends()
    }

    // Actualizar gráfica de temperatura con rangos dinámicos
    temperatureData.value = {
      ...temperatureData.value,
      labels: [...labels],
      datasets: [
        {
          ...temperatureData.value.datasets[0],
          data: [...temperatureValues]
        },
        {
          ...temperatureData.value.datasets[1],
          data: new Array(labels.length).fill(cropThresholds.value.temperatureMax)
        }
      ],
      // Agregar configuración de rangos dinámicos
      yAxisConfig: {
        min: Math.max(0, tempMin - tempMargin),
        max: tempMax + tempMargin
      }
    }

    // Actualizar gráfica de humedad con rangos dinámicos
    humidityData.value = {
      ...humidityData.value,
      labels: [...labels],
      datasets: [
        {
          ...humidityData.value.datasets[0],
          data: [...humidityValues]
        },
        {
          ...humidityData.value.datasets[1],
          data: new Array(labels.length).fill(cropThresholds.value.humidityMin)
        },
        {
          ...humidityData.value.datasets[2],
          data: new Array(labels.length).fill(cropThresholds.value.humidityMax)
        }
      ],
      // Agregar configuración de rangos dinámicos
      yAxisConfig: {
        min: Math.max(0, humidityMin - humidityMargin),
        max: Math.min(100, humidityMax + humidityMargin)
      }
    }

    console.log('✅ Humidity data updated:', {
      labels: labels.length,
      humidityValues: humidityValues.length,
      latestHumidity: humidityValues[humidityValues.length - 1],
      thresholds: { min: cropThresholds.value.humidityMin, max: cropThresholds.value.humidityMax },
      yAxisRange: { min: Math.max(0, humidityMin - humidityMargin), max: Math.min(100, humidityMax + humidityMargin) }
    })

    console.log('✅ Gráficas actualizadas con datos reales')
  }

  // Añadir nuevo punto de datos simulados (para mantener funcionalidad original)
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

    calculateTrends(newTemp, oldTemp, newHumidity, oldHumidity)

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
  const startSimulation = async () => {
    if (userStore.isDemoMode) {
      // Modo demo: usar simulación original
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
    } else {
      // Modo real: cargar datos reales
      console.log('🚀 Starting real data monitoring...')
      
      // Cargar datos iniciales
      await loadRealData()
      
      // Verificar nuevos datos cada 5 segundos
      interval = setInterval(() => {
        checkForNewRealData()
      }, 5000)
      
      console.log('⏰ Real data monitoring started')
    }
  }

  // Detener simulación
  const stopSimulation = () => {
    if (interval) {
      clearInterval(interval)
      interval = null
      console.log('⏹️ Simulation stopped')
    }
  }

  // Watcher para reiniciar cuando cambie el dispositivo activo
  watch(() => deviceStore.devices, async () => {
    if (!userStore.isDemoMode) {
      console.log('🔄 Dispositivos cambiaron, recargando datos...')
      stopSimulation()
      await startSimulation()
    }
  }, { deep: true })

  // Formatear valores para mostrar
  const formattedTemperature = computed(() => {
    return `${currentTemperature.value}°C`
  })

  const formattedHumidity = computed(() => {
    return `${currentHumidity.value}%`
  })

  // Lifecycle hooks
  onMounted(async () => {
    console.log('🎯 Composable mounted, starting simulation...')
    await startSimulation()
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
    realDataPoints,
    startSimulation,
    stopSimulation
  }
} 