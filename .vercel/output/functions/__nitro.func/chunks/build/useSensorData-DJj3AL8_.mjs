import { ref, watch, computed } from 'vue';
import { b as useRuntimeConfig } from './server.mjs';
import { u as useDeviceStore } from './device-CfApmtSk.mjs';
import { u as useUserStore } from './user-BEdD-0tD.mjs';
import { u as useCropStore } from './crop-CoogIRpZ.mjs';
import { u as useIrrigationStore, s as setInterval } from './irrigation-EKMz8LaT.mjs';

const getApiUrl = () => {
  const config = useRuntimeConfig();
  return config.public.apiUrl || "http://localhost:3001/api";
};
const getAuthHeaders = () => {
  return {};
};
const SensorAPI = {
  // Rutas básicas CRUD
  create(data) {
    return $fetch("/sensor-readings", {
      method: "POST",
      body: data,
      baseURL: getApiUrl(),
      headers: getAuthHeaders()
    });
  },
  delete(id) {
    return $fetch(`/sensor-readings/${id}`, {
      method: "DELETE",
      baseURL: getApiUrl(),
      headers: getAuthHeaders()
    });
  },
  // Rutas por dispositivo
  getSensorReadingsByDeviceId(deviceId) {
    return $fetch(`/sensor-readings/device/${deviceId}`, {
      method: "GET",
      baseURL: getApiUrl(),
      headers: getAuthHeaders()
    });
  },
  getLatestSensorReadingByDeviceId(deviceId) {
    return $fetch(`/sensor-readings/device/${deviceId}/latest`, {
      method: "GET",
      baseURL: getApiUrl(),
      headers: getAuthHeaders()
    });
  },
  // Función específica para obtener último dato del dispositivo activo del usuario
  getLatestSensorReadingForActiveDevice(userId) {
    return $fetch(`/sensor-readings/user/${userId}/active-device/latest`, {
      method: "GET",
      baseURL: getApiUrl(),
      headers: getAuthHeaders()
    });
  },
  // Rutas por filtros y rangos
  getSensorReadingsByDateRange(startDate, endDate) {
    return $fetch(`/sensor-readings/date-range/${startDate}/${endDate}`, {
      method: "GET",
      baseURL: getApiUrl(),
      headers: getAuthHeaders()
    });
  },
  getSensorReadingsOutOfThreshold() {
    return $fetch("/sensor-readings/threshold/out-of-range", {
      method: "GET",
      baseURL: getApiUrl(),
      headers: getAuthHeaders()
    });
  }
};
function useSensorData() {
  const deviceStore = useDeviceStore();
  const userStore = useUserStore();
  useCropStore();
  useIrrigationStore();
  const cropThresholds = ref({
    temperatureMax: 28,
    // °C
    humidityMin: 40,
    // %
    humidityMax: 80
    // %
  });
  const temperatureData = ref({
    labels: [],
    datasets: [
      {
        label: "Temperatura",
        data: [],
        borderColor: "#ef4444",
        // Rojo para temperatura
        backgroundColor: "rgba(239, 68, 68, 0.1)",
        borderWidth: 3,
        tension: 0.6,
        // Curva suave
        fill: true,
        pointBackgroundColor: "#ef4444",
        pointBorderColor: "#ffffff",
        pointBorderWidth: 3,
        pointRadius: 5,
        pointHoverRadius: 8
      },
      {
        label: "Umbral M\xE1ximo",
        data: [],
        borderColor: "#fbbf24",
        // Amarillo para umbral
        backgroundColor: "transparent",
        borderWidth: 3,
        borderDash: [10, 5],
        pointRadius: 0,
        fill: false,
        tension: 0
      }
    ]
  });
  const soilHumidityData = ref({
    labels: [],
    datasets: [
      {
        label: "Humedad",
        data: [],
        borderColor: "#3b82f6",
        // Azul para humedad
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        borderWidth: 3,
        tension: 0.6,
        // Curva suave
        fill: true,
        pointBackgroundColor: "#3b82f6",
        pointBorderColor: "#ffffff",
        pointBorderWidth: 3,
        pointRadius: 5,
        pointHoverRadius: 8
      },
      {
        label: "Umbral M\xEDnimo",
        data: [],
        borderColor: "#60a5fa",
        // Azul claro para umbral mínimo
        backgroundColor: "transparent",
        borderWidth: 3,
        borderDash: [10, 5],
        pointRadius: 0,
        fill: false,
        tension: 0
      },
      {
        label: "Umbral M\xE1ximo",
        data: [],
        borderColor: "#1d4ed8",
        // Azul oscuro para umbral máximo
        backgroundColor: "transparent",
        borderWidth: 3,
        borderDash: [5, 10],
        pointRadius: 0,
        fill: false,
        tension: 0
      }
    ]
  });
  const airHumidityData = ref({
    labels: [],
    datasets: [
      {
        label: "Humedad Ambiental",
        data: [],
        borderColor: "#22d3ee",
        // Cyan para aire
        backgroundColor: "rgba(34,211,238,0.1)",
        borderWidth: 3,
        tension: 0.6,
        fill: true,
        pointBackgroundColor: "#22d3ee",
        pointBorderColor: "#ffffff",
        pointBorderWidth: 3,
        pointRadius: 5,
        pointHoverRadius: 8
      }
    ]
  });
  const currentTemperature = ref(25);
  const currentSoilHumidity = ref(65);
  const currentAirHumidity = ref(70);
  const temperatureTrend = ref({ value: 0, direction: "neutral" });
  const soilHumidityTrend = ref({ value: 0, direction: "neutral" });
  const airHumidityTrend = ref({ value: 0, direction: "neutral" });
  let interval = null;
  const maxDataPoints = 20;
  const realDataPoints = ref([]);
  ref(false);
  const getActiveDevice = () => {
    var _a, _b;
    return ((_a = deviceStore.activeDevices) == null ? void 0 : _a.find((device) => device.isActive)) || ((_b = deviceStore.devices) == null ? void 0 : _b.find((device) => device.is_active_communication)) || null;
  };
  const generateRandomTemperature = () => {
    const baseTemp = 25;
    const timeOfDay = (/* @__PURE__ */ new Date()).getHours();
    const dailyCycle = Math.sin((timeOfDay - 6) * Math.PI / 12) * 5;
    const randomVariation = (Math.random() - 0.5) * 3;
    const temperature = baseTemp + dailyCycle + randomVariation;
    return Math.max(18, Math.min(35, temperature));
  };
  const generateRandomSoilHumidity = () => {
    const baseHumidity = 65;
    const timeOfDay = (/* @__PURE__ */ new Date()).getHours();
    const dailyCycle = Math.cos((timeOfDay - 6) * Math.PI / 12) * 10;
    const randomVariation = (Math.random() - 0.5) * 8;
    const humidity = baseHumidity + dailyCycle + randomVariation;
    return Math.max(30, Math.min(90, humidity));
  };
  const generateRandomAirHumidity = () => {
    const baseHumidity = 70;
    const randomVariation = (Math.random() - 0.5) * 10;
    const humidity = baseHumidity + randomVariation;
    return Math.max(20, Math.min(100, humidity));
  };
  const formatTime = (date) => {
    return date.toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });
  };
  const formatTimeFromString = (dateString) => {
    const date = new Date(dateString);
    return formatTime(date);
  };
  const initializeTrends = () => {
    temperatureTrend.value = {
      value: "0.0",
      direction: "neutral"
    };
    soilHumidityTrend.value = {
      value: "0.0",
      direction: "neutral"
    };
    airHumidityTrend.value = {
      value: "0.0",
      direction: "neutral"
    };
    console.log("\u{1F504} Trends initialized to neutral");
  };
  const calculateTrends = (currentTemp, previousTemp, currentSoilHum, previousSoilHum, currentAirHum, previousAirHum) => {
    console.log("\u{1F504} Calculating trends with:", {
      currentTemp,
      previousTemp,
      currentSoilHum,
      previousSoilHum,
      currentAirHum,
      previousAirHum
    });
    const MIN_TEMP_CHANGE = 0.1;
    const MIN_HUMIDITY_CHANGE = 0.5;
    if (previousTemp !== null && !isNaN(previousTemp) && !isNaN(currentTemp)) {
      const tempChange = currentTemp - previousTemp;
      console.log("\u{1F321}\uFE0F Temperature calculation:", {
        current: currentTemp,
        previous: previousTemp,
        change: tempChange,
        absChange: Math.abs(tempChange),
        threshold: MIN_TEMP_CHANGE
      });
      if (Math.abs(tempChange) >= MIN_TEMP_CHANGE) {
        temperatureTrend.value = {
          value: Math.abs(tempChange).toFixed(1),
          // Mostrar diferencia en grados
          direction: tempChange > 0 ? "up" : "down"
        };
      } else {
        temperatureTrend.value = {
          value: "0.0",
          direction: "neutral"
        };
      }
      console.log("\u{1F321}\uFE0F Temperature trend result:", temperatureTrend.value);
    } else {
      temperatureTrend.value = {
        value: "0.0",
        direction: "neutral"
      };
      console.log("\u{1F321}\uFE0F Temperature trend: No valid previous data, set to neutral");
    }
    if (previousSoilHum !== null && !isNaN(previousSoilHum) && !isNaN(currentSoilHum)) {
      const soilChange = currentSoilHum - previousSoilHum;
      console.log("\u{1F4A7} Soil Humidity calculation:", {
        current: currentSoilHum,
        previous: previousSoilHum,
        change: soilChange,
        absChange: Math.abs(soilChange),
        threshold: MIN_HUMIDITY_CHANGE
      });
      if (Math.abs(soilChange) >= MIN_HUMIDITY_CHANGE) {
        soilHumidityTrend.value = {
          value: Math.abs(soilChange).toFixed(1),
          // Mostrar diferencia absoluta
          direction: soilChange > 0 ? "up" : "down"
        };
      } else {
        soilHumidityTrend.value = {
          value: "0.0",
          direction: "neutral"
        };
      }
      console.log("\u{1F4A7} Soil Humidity trend result:", soilHumidityTrend.value);
    } else {
      soilHumidityTrend.value = {
        value: "0.0",
        direction: "neutral"
      };
      console.log("\u{1F4A7} Soil Humidity trend: No valid previous data, set to neutral");
    }
    if (previousAirHum !== null && !isNaN(previousAirHum) && !isNaN(currentAirHum)) {
      const airChange = currentAirHum - previousAirHum;
      const MIN_HUMIDITY_CHANGE2 = 0.5;
      if (Math.abs(airChange) >= MIN_HUMIDITY_CHANGE2) {
        airHumidityTrend.value = {
          value: Math.abs(airChange).toFixed(1),
          direction: airChange > 0 ? "up" : "down"
        };
      } else {
        airHumidityTrend.value = { value: "0.0", direction: "neutral" };
      }
    } else {
      airHumidityTrend.value = { value: "0.0", direction: "neutral" };
    }
  };
  const loadRealData = async () => {
    if (userStore.isDemoMode) return;
    const activeDevice = getActiveDevice();
    if (!activeDevice) {
      console.log("\u26A0\uFE0F No hay dispositivo activo para cargar datos");
      return;
    }
    try {
      console.log("\u{1F504} Cargando datos reales del dispositivo:", activeDevice.id);
      const response = await SensorAPI.getSensorReadingsByDeviceId(activeDevice.id);
      if (response.success && response.data && response.data.length > 0) {
        const sortedData = response.data.sort((a, b) => new Date(a.received_at) - new Date(b.received_at)).slice(-maxDataPoints);
        realDataPoints.value = sortedData;
        updateChartsWithRealData(sortedData);
        console.log("\u2705 Datos reales cargados:", sortedData.length, "puntos");
      } else {
        console.log("\u26A0\uFE0F No hay datos de sensores para este dispositivo");
        realDataPoints.value = [];
      }
    } catch (error) {
      console.error("\u274C Error cargando datos reales:", error);
    }
  };
  const updateChartsWithRealData = (dataPoints) => {
    if (dataPoints.length === 0) return;
    const labels = dataPoints.map((point) => formatTimeFromString(point.received_at));
    const temperatureValues = dataPoints.map((point) => Number(point.temperature || 0));
    const soilHumidityValues = dataPoints.map((point) => Number(point.soil_humidity || 0));
    const airHumidityValues = dataPoints.map((point) => Number(point.air_humidity || 0));
    const tempMin = Math.min(...temperatureValues, cropThresholds.value.temperatureMax);
    const tempMax = Math.max(...temperatureValues, cropThresholds.value.temperatureMax);
    const humidityMin = Math.min(...soilHumidityValues, cropThresholds.value.humidityMin, cropThresholds.value.humidityMax);
    const humidityMax = Math.max(...soilHumidityValues, cropThresholds.value.humidityMin, cropThresholds.value.humidityMax);
    const tempRange = tempMax - tempMin;
    const humidityRange = humidityMax - humidityMin;
    const tempMargin = tempRange * 0.1;
    const humidityMargin = humidityRange * 0.1;
    const lastPoint = dataPoints[dataPoints.length - 1];
    currentTemperature.value;
    currentSoilHumidity.value;
    currentAirHumidity.value;
    currentTemperature.value = Number(lastPoint.temperature || 0);
    currentSoilHumidity.value = Number(lastPoint.soil_humidity || 0);
    currentAirHumidity.value = Number(lastPoint.air_humidity || 0);
    if (dataPoints.length > 1) {
      const prevPoint = dataPoints[dataPoints.length - 2];
      console.log("\u{1F4CA} Data points for trend calculation:", {
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
      });
      calculateTrends(
        Number(lastPoint.temperature || 0),
        Number(prevPoint.temperature || 0),
        Number(lastPoint.soil_humidity || 0),
        Number(prevPoint.soil_humidity || 0),
        Number(lastPoint.air_humidity || 0),
        Number(prevPoint.air_humidity || 0)
      );
    } else {
      console.log("\u{1F4CA} First data point, initializing trends");
      initializeTrends();
    }
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
    };
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
    };
    airHumidityData.value = {
      ...airHumidityData.value,
      labels: [...labels],
      datasets: [
        {
          ...airHumidityData.value.datasets[0],
          data: [...airHumidityValues]
        }
      ]
    };
    console.log("\u2705 Humidity data updated:", {
      labels: labels.length,
      soilHumidityValues: soilHumidityValues.length,
      latestSoilHumidity: soilHumidityValues[soilHumidityValues.length - 1],
      airHumidityValues: airHumidityValues.length,
      latestAirHumidity: airHumidityValues[airHumidityValues.length - 1],
      thresholds: { min: cropThresholds.value.humidityMin, max: cropThresholds.value.humidityMax },
      yAxisRange: { min: Math.max(0, humidityMin - humidityMargin), max: Math.min(100, humidityMax + humidityMargin) }
    });
    console.log("\u2705 Gr\xE1ficas actualizadas con datos reales");
  };
  const addDataPoint = () => {
    console.log("\u{1F504} Adding new data point at:", (/* @__PURE__ */ new Date()).toLocaleTimeString());
    const now = /* @__PURE__ */ new Date();
    const timeLabel = formatTime(now);
    const oldTemp = currentTemperature.value;
    const oldSoilHum = currentSoilHumidity.value;
    const oldAirHum = currentAirHumidity.value;
    const newTemp = generateRandomTemperature();
    const newSoilHumidity = generateRandomSoilHumidity();
    const newAirHumidity = generateRandomAirHumidity();
    console.log(`\u{1F4CA} New values - Temp: ${newTemp.toFixed(1)}\xB0C, SoilHum: ${newSoilHumidity.toFixed(1)}%, AirHum: ${newAirHumidity.toFixed(1)}%`);
    currentTemperature.value = Number(newTemp.toFixed(1));
    currentSoilHumidity.value = Number(newSoilHumidity.toFixed(1));
    currentAirHumidity.value = Number(newAirHumidity.toFixed(1));
    calculateTrends(newTemp, oldTemp, newSoilHumidity, oldSoilHum, newAirHumidity, oldAirHum);
    const newTempLabels = [...temperatureData.value.labels, timeLabel];
    const newTempData = [...temperatureData.value.datasets[0].data, newTemp];
    const newSoilHumidityLabels = [...soilHumidityData.value.labels, timeLabel];
    const newSoilHumidityData = [...soilHumidityData.value.datasets[0].data, newSoilHumidity];
    const newAirHumidityLabels = [...airHumidityData.value.labels, timeLabel];
    const newAirHumidityData = [...airHumidityData.value.datasets[0].data, newAirHumidity];
    if (newTempLabels.length > maxDataPoints) {
      newTempLabels.shift();
      newTempData.shift();
    }
    if (newSoilHumidityLabels.length > maxDataPoints) {
      newSoilHumidityLabels.shift();
      newSoilHumidityData.shift();
      newAirHumidityData.shift();
    }
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
    };
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
    };
    airHumidityData.value = {
      ...airHumidityData.value,
      labels: newAirHumidityLabels,
      datasets: [
        {
          ...airHumidityData.value.datasets[0],
          data: newAirHumidityData
        }
      ]
    };
    console.log("\u2705 Data updated - Temp points:", newTempData.length, "SoilHum points:", newSoilHumidityData.length, "AirHum points:", newAirHumidityData.length);
  };
  const startSimulation = async () => {
    if (userStore.isDemoMode) {
      console.log("\u{1F680} Starting IoT simulation...");
      for (let i = 0; i < 5; i++) {
        setTimeout(() => {
          addDataPoint();
        }, i * 300);
      }
      interval = setInterval();
      console.log("\u23F0 Interval set for every 3 seconds");
    } else {
      console.log("\u{1F680} Starting real data monitoring...");
      await loadRealData();
      interval = setInterval();
      console.log("\u23F0 Real data monitoring started");
    }
  };
  const stopSimulation = () => {
    if (interval) {
      clearInterval(interval);
      interval = null;
      console.log("\u23F9\uFE0F Simulation stopped");
    }
  };
  watch(() => deviceStore.devices, async () => {
    if (!userStore.isDemoMode) {
      console.log("\u{1F504} Dispositivos cambiaron, recargando datos...");
      stopSimulation();
      await startSimulation();
    }
  }, { deep: true });
  const formattedTemperature = computed(() => {
    return `${currentTemperature.value}\xB0C`;
  });
  const formattedSoilHumidity = computed(() => `${currentSoilHumidity.value}%`);
  const formattedAirHumidity = computed(() => `${currentAirHumidity.value}%`);
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
  };
}

export { useSensorData as u };
//# sourceMappingURL=useSensorData-DJj3AL8_.mjs.map
