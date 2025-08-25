import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import SensorAPI from '~/api/SensorAPI.js'
import IrrigationAPI from '~/api/IrrigationAPI.js'
import { useDeviceStore } from '~/stores/device'
import { useUserStore } from '~/stores/user'
import { useCropStore } from '~/stores/crop'
import { useIrrigationStore } from '~/stores/irrigation'

export function useSensorData() {
  // Stores
  const deviceStore = useDeviceStore()
  const userStore = useUserStore()
  const cropStore = useCropStore()
  const irrigationStore = useIrrigationStore()

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

  // Gráfica de humedad del suelo
  const soilHumidityData = ref({
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

  // Gráfica de humedad ambiental
  const airHumidityData = ref({
    labels: [],
    datasets: [
      {
        label: 'Humedad Ambiental',
        data: [],
        borderColor: '#22d3ee', // Cyan para aire
        backgroundColor: 'rgba(34,211,238,0.1)',
        borderWidth: 3,
        tension: 0.6,
        fill: true,
        pointBackgroundColor: '#22d3ee',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 3,
        pointRadius: 5,
        pointHoverRadius: 8
      }
    ]
  })

  // Valores actuales
  const currentTemperature = ref(25.0)
  // Gráfica de humedad ambiental
  const currentSoilHumidity = ref(65.0)
  const currentAirHumidity = ref(70.0)
  const temperatureTrend = ref({ value: 0, direction: 'neutral' })
  const soilHumidityTrend = ref({ value: 0, direction: 'neutral' })
  const airHumidityTrend = ref({ value: 0, direction: 'neutral' })

  let interval = null
  const maxDataPoints = 20

  // Datos reales para usuarios autenticados
  const realDataPoints = ref([])
  
  // Bandera para evitar ejecuciones múltiples de evaluación automática
  const isEvaluatingAutomatic = ref(false)
  
  // Función para obtener dispositivo activo
  const getActiveDevice = () => {
    return deviceStore.activeDevices?.find(device => device.isActive) || 
           deviceStore.devices?.find(device => device.is_active_communication) ||
           null
  }

  // Función para evaluar automáticamente las condiciones de riego
  const evaluateAutomaticConditions = async () => {
    if (userStore.isDemoMode) return
    
    // Solo evaluar si hay modo automático activo
    if (irrigationStore.activeMode !== 'automatic') return
    
    // Evitar ejecuciones múltiples
    if (isEvaluatingAutomatic.value) {
      console.log('⏸️ [AUTO] Evaluación ya en progreso, saltando...')
      return
    }
    
    const selectedCrop = cropStore.crops.find(crop => crop.selected)
    if (!selectedCrop) return
    
    const activeDevice = getActiveDevice()
    if (!activeDevice) return
    
    // Bloquear evaluaciones múltiples
    isEvaluatingAutomatic.value = true
    
    try {
      // 🔍 Verificar si hay configuración automática preparada
      let automaticConfig = null
      try {
        const configResponse = await IrrigationAPI.getAutomaticConfigStatus(userStore.user.id)
        if (configResponse.success) {
          automaticConfig = configResponse.data
        }
      } catch (configError) {
        console.log('ℹ️ [AUTO] No hay configuración automática preparada')
        isEvaluatingAutomatic.value = false // Desbloquear inmediatamente
        return
      }
      
      // Solo continuar si hay configuración
      if (!automaticConfig) {
        console.log('ℹ️ [AUTO] No hay configuración preparada')
        isEvaluatingAutomatic.value = false // Desbloquear inmediatamente
        return
      }
      
      // Si ya está activa, solo evaluar para desactivar
      const isCurrentlyActive = automaticConfig.is_active && automaticConfig.pump_status === 'active'
      
      // Obtener umbrales del cultivo seleccionado
      const thresholds = {
        maxTemperature: selectedCrop.temperature_max,
        minSoilHumidity: selectedCrop.soil_humidity_min,
        maxSoilHumidity: selectedCrop.soil_humidity_max,
        minAirHumidity: selectedCrop.air_humidity_min,
        maxAirHumidity: selectedCrop.air_humidity_max
      }
      
      if (!isCurrentlyActive) {
        // 🟢 EVALUAR ACTIVACIÓN (solo si NO está activo)
        const tempHigh = currentTemperature.value > thresholds.maxTemperature
        const soilLow = currentSoilHumidity.value <= thresholds.minSoilHumidity
        const airLow = currentAirHumidity.value < thresholds.minAirHumidity
        
        const shouldActivate = tempHigh || soilLow || airLow
        
        console.log('🤖 [AUTO] Evaluando ACTIVACIÓN:', {
          temp: `${currentTemperature.value}°C > ${thresholds.maxTemperature}°C = ${tempHigh}`,
          soil: `${currentSoilHumidity.value}% <= ${thresholds.minSoilHumidity}% = ${soilLow}`,
          air: `${currentAirHumidity.value}% < ${thresholds.minAirHumidity}% = ${airLow}`,
          shouldActivate,
          currentlyActive: false
        })
        
        if (shouldActivate) {
          console.log('🚨 [AUTO] ¡Condiciones de riego cumplidas detectadas!')
          console.log('ℹ️ [AUTO] La activación será manejada por el backend automático vía TTN webhook')
          // NOTA: No enviamos comando desde frontend para evitar duplicados
          // El backend automático se encarga de ambos ON y OFF cuando llegan datos via webhook
        }
        
      } else {
        // 🔴 EVALUAR DESACTIVACIÓN (solo si SÍ está activo)
        // Condiciones para desactivar: todas las condiciones deben estar en rango seguro
        const temperatureOk = currentTemperature.value <= thresholds.maxTemperature
        const soilHumidityOk = currentSoilHumidity.value >= thresholds.minSoilHumidity && 
                              currentSoilHumidity.value <= thresholds.maxSoilHumidity
        const airHumidityOk = currentAirHumidity.value >= thresholds.minAirHumidity
        
        // Desactivar cuando TODAS las condiciones estén OK (o al menos el suelo esté en rango aceptable)
        const shouldDeactivate = temperatureOk && soilHumidityOk && airHumidityOk
        
        console.log('🤖 [AUTO] Evaluando DESACTIVACIÓN:', {
          temperature: `${currentTemperature.value}°C <= ${thresholds.maxTemperature}°C = ${temperatureOk}`,
          soil: `${currentSoilHumidity.value}% (${thresholds.minSoilHumidity}%-${thresholds.maxSoilHumidity}%) = ${soilHumidityOk}`,
          air: `${currentAirHumidity.value}% >= ${thresholds.minAirHumidity}% = ${airHumidityOk}`,
          shouldDeactivate: shouldDeactivate,
          currentlyActive: true
        })
        
        if (shouldDeactivate) {
          console.log('🔴 [AUTO] ¡Todas las condiciones son óptimas detectadas!')
          console.log('ℹ️ [AUTO] La desactivación será manejada por el backend automático vía TTN webhook')
          // NOTA: El backend automático se encarga de la desactivación cuando llegan datos via webhook
          // Solo mantenemos la cancelación de configuración como respaldo si fuera necesario
        }
      }
      
    } catch (error) {
      console.error('❌ Error evaluando condiciones automáticas:', error)
    } finally {
      // Desbloquear evaluaciones después de un tiempo más corto
      setTimeout(() => {
        isEvaluatingAutomatic.value = false
      }, 2000) // Esperar 2 segundos antes de permitir otra evaluación
    }
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
  const generateRandomSoilHumidity = () => {
    const baseHumidity = 65
    const timeOfDay = new Date().getHours()
    const dailyCycle = Math.cos((timeOfDay - 6) * Math.PI / 12) * 10 // Ciclo diario inverso
    const randomVariation = (Math.random() - 0.5) * 8
    const humidity = baseHumidity + dailyCycle + randomVariation
    return Math.max(30, Math.min(90, humidity))
  }

  const generateRandomAirHumidity = () => {
    const baseHumidity = 70
    const randomVariation = (Math.random() - 0.5) * 10
    const humidity = baseHumidity + randomVariation
    return Math.max(20, Math.min(100, humidity))
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
    soilHumidityData.value.datasets[1].data = new Array(labelsLength).fill(cropThresholds.value.humidityMin)
    soilHumidityData.value.datasets[2].data = new Array(labelsLength).fill(cropThresholds.value.humidityMax)
  }

  // Inicializar tendencias cuando no hay datos previos
  const initializeTrends = () => {
    temperatureTrend.value = {
      value: '0.0',
      direction: 'neutral'
    }
    soilHumidityTrend.value = {
      value: '0.0',
      direction: 'neutral'
    }
    airHumidityTrend.value = {
      value: '0.0',
      direction: 'neutral'
    }
    console.log('🔄 Trends initialized to neutral')
  }

  // Calcular tendencias de manera simplificada y precisa
  const calculateTrends = (currentTemp, previousTemp, currentSoilHum, previousSoilHum, currentAirHum, previousAirHum) => {
    console.log('🔄 Calculating trends with:', {
      currentTemp,
      previousTemp,
      currentSoilHum,
      previousSoilHum,
      currentAirHum,
      previousAirHum
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

    // Tendencia de humedad del suelo
    if (previousSoilHum !== null && !isNaN(previousSoilHum) && !isNaN(currentSoilHum)) {
      const soilChange = currentSoilHum - previousSoilHum
      
      console.log('💧 Soil Humidity calculation:', {
        current: currentSoilHum,
        previous: previousSoilHum,
        change: soilChange,
        absChange: Math.abs(soilChange),
        threshold: MIN_HUMIDITY_CHANGE
      })
      
      // Solo actualizar si hay un cambio significativo
      if (Math.abs(soilChange) >= MIN_HUMIDITY_CHANGE) {
        soilHumidityTrend.value = {
          value: Math.abs(soilChange).toFixed(1), // Mostrar diferencia absoluta
          direction: soilChange > 0 ? 'up' : 'down'
        }
      } else {
        // Si el cambio es muy pequeño, mantener neutral
        soilHumidityTrend.value = {
          value: '0.0',
          direction: 'neutral'
        }
      }
      
      console.log('💧 Soil Humidity trend result:', soilHumidityTrend.value)
    } else {
      // Si no hay datos previos válidos, inicializar como neutral
      soilHumidityTrend.value = {
        value: '0.0',
        direction: 'neutral'
      }
      console.log('💧 Soil Humidity trend: No valid previous data, set to neutral')
    }

    // Tendencia de humedad ambiental
    if (previousAirHum !== null && !isNaN(previousAirHum) && !isNaN(currentAirHum)) {
      const airChange = currentAirHum - previousAirHum
      const MIN_HUMIDITY_CHANGE = 0.5

      if (Math.abs(airChange) >= MIN_HUMIDITY_CHANGE) {
        airHumidityTrend.value = {
          value: Math.abs(airChange).toFixed(1),
          direction: airChange > 0 ? 'up' : 'down'
        }
      } else {
        airHumidityTrend.value = { value: '0.0', direction: 'neutral' }
      }
    } else {
      airHumidityTrend.value = { value: '0.0', direction: 'neutral' }
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
          
          // 🤖 EVALUAR CONDICIONES AUTOMÁTICAS después de actualizar datos
          await evaluateAutomaticConditions()
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
    const soilHumidityValues = dataPoints.map(point => Number(point.soil_humidity || 0))
    const airHumidityValues = dataPoints.map(point => Number(point.air_humidity || 0))

    // Calcular rangos dinámicos para los ejes Y
    const tempMin = Math.min(...temperatureValues, cropThresholds.value.temperatureMax)
    const tempMax = Math.max(...temperatureValues, cropThresholds.value.temperatureMax)
    const humidityMin = Math.min(...soilHumidityValues, cropThresholds.value.humidityMin, cropThresholds.value.humidityMax)
    const humidityMax = Math.max(...soilHumidityValues, cropThresholds.value.humidityMin, cropThresholds.value.humidityMax)

    // Añadir margen del 10% para mejor visualización
    const tempRange = tempMax - tempMin
    const humidityRange = humidityMax - humidityMin
    const tempMargin = tempRange * 0.1
    const humidityMargin = humidityRange * 0.1

    // Actualizar valores actuales
    const lastPoint = dataPoints[dataPoints.length - 1]
    const oldTemp = currentTemperature.value
    const oldSoilHum = currentSoilHumidity.value
    const oldAirHum = currentAirHumidity.value
    
    currentTemperature.value = Number(lastPoint.temperature || 0)
    currentSoilHumidity.value = Number(lastPoint.soil_humidity || 0)
    currentAirHumidity.value = Number(lastPoint.air_humidity || 0)

    // Calcular tendencias
    if (dataPoints.length > 1) {
      const prevPoint = dataPoints[dataPoints.length - 2]
      
      console.log('📊 Data points for trend calculation:', {
        currentPoint: {
          temperature: lastPoint.temperature,
          soil_humidity: lastPoint.soil_humidity,
          air_humidity: lastPoint.air_humidity,
          received_at: lastPoint.received_at
        },
        previousPoint: {
          temperature: prevPoint.temperature,
          soil_humidity: prevPoint.soil_humidity,
          air_humidity: prevPoint.air_humidity,
          received_at: prevPoint.received_at
        }
      })
      
      calculateTrends(
        Number(lastPoint.temperature || 0),
        Number(prevPoint.temperature || 0),
        Number(lastPoint.soil_humidity || 0),
        Number(prevPoint.soil_humidity || 0),
        Number(lastPoint.air_humidity || 0),
        Number(prevPoint.air_humidity || 0)
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

    // Actualizar gráfica de humedad del suelo
    soilHumidityData.value = {
      ...soilHumidityData.value,
      labels: [...labels],
      datasets: [
        {
          ...soilHumidityData.value.datasets[0],
          data: [...soilHumidityValues]
        },
        {
          ...soilHumidityData.value.datasets[1],
          data: new Array(labels.length).fill(cropThresholds.value.humidityMin)
        },
        {
          ...soilHumidityData.value.datasets[2],
          data: new Array(labels.length).fill(cropThresholds.value.humidityMax)
        }
      ],
      // Agregar configuración de rangos dinámicos
      yAxisConfig: {
        min: Math.max(0, humidityMin - humidityMargin),
        max: Math.min(100, humidityMax + humidityMargin)
      }
    }

    // Actualizar gráfica de humedad ambiental (sin umbrales por ahora)
    airHumidityData.value = {
      ...airHumidityData.value,
      labels: [...labels],
      datasets: [
        {
          ...airHumidityData.value.datasets[0],
          data: [...airHumidityValues]
        }
      ]
    }

    console.log('✅ Humidity data updated:', {
      labels: labels.length,
      soilHumidityValues: soilHumidityValues.length,
      latestSoilHumidity: soilHumidityValues[soilHumidityValues.length - 1],
      airHumidityValues: airHumidityValues.length,
      latestAirHumidity: airHumidityValues[airHumidityValues.length - 1],
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
    const oldSoilHum = currentSoilHumidity.value
    const oldAirHum = currentAirHumidity.value

    const newTemp = generateRandomTemperature()
    const newSoilHumidity = generateRandomSoilHumidity()
    const newAirHumidity = generateRandomAirHumidity()

    console.log(`📊 New values - Temp: ${newTemp.toFixed(1)}°C, SoilHum: ${newSoilHumidity.toFixed(1)}%, AirHum: ${newAirHumidity.toFixed(1)}%`)

    currentTemperature.value = Number(newTemp.toFixed(1))
    currentSoilHumidity.value = Number(newSoilHumidity.toFixed(1))
    currentAirHumidity.value = Number(newAirHumidity.toFixed(1))

    calculateTrends(newTemp, oldTemp, newSoilHumidity, oldSoilHum, newAirHumidity, oldAirHum)

    // CRÍTICO: Crear nuevos arrays para forzar reactividad
    const newTempLabels = [...temperatureData.value.labels, timeLabel]
    const newTempData = [...temperatureData.value.datasets[0].data, newTemp]
    
    const newSoilHumidityLabels = [...soilHumidityData.value.labels, timeLabel]
    const newSoilHumidityData = [...soilHumidityData.value.datasets[0].data, newSoilHumidity]

    const newAirHumidityLabels = [...airHumidityData.value.labels, timeLabel]
    const newAirHumidityData = [...airHumidityData.value.datasets[0].data, newAirHumidity]

    // Mantener solo los últimos N puntos
    if (newTempLabels.length > maxDataPoints) {
      newTempLabels.shift()
      newTempData.shift()
    }

    if (newSoilHumidityLabels.length > maxDataPoints) {
      newSoilHumidityLabels.shift()
      newSoilHumidityData.shift()
      newAirHumidityData.shift()
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

    soilHumidityData.value = {
      ...soilHumidityData.value,
      labels: newSoilHumidityLabels,
      datasets: [
        {
          ...soilHumidityData.value.datasets[0],
          data: newSoilHumidityData
        },
        {
          ...soilHumidityData.value.datasets[1],
          data: new Array(newSoilHumidityLabels.length).fill(cropThresholds.value.humidityMin)
        },
        {
          ...soilHumidityData.value.datasets[2],
          data: new Array(newSoilHumidityLabels.length).fill(cropThresholds.value.humidityMax)
        }
      ]
    }

    airHumidityData.value = {
      ...airHumidityData.value,
      labels: newAirHumidityLabels,
      datasets: [
        {
          ...airHumidityData.value.datasets[0],
          data: newAirHumidityData
        }
      ]
    }

    console.log('✅ Data updated - Temp points:', newTempData.length, 'SoilHum points:', newSoilHumidityData.length, 'AirHum points:', newAirHumidityData.length)
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

  const formattedSoilHumidity = computed(() => `${currentSoilHumidity.value}%`)
  const formattedAirHumidity = computed(() => `${currentAirHumidity.value}%`)

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
    soilHumidityData,
    airHumidityData,
    currentTemperature,
    currentSoilHumidity,
    currentAirHumidity,
    temperatureTrend,
    soilHumidityTrend,
    airHumidityTrend,
    cropThresholds,
    formattedTemperature,
    formattedSoilHumidity,
    formattedAirHumidity,
    realDataPoints,
    startSimulation,
    stopSimulation
  }
} 