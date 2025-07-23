const getApiUrl = () => {
  const config = useRuntimeConfig()
  return config.public.apiUrl || 'http://localhost:3001/api'
}

const getAuthHeaders = () => {
  const token = process.client ? localStorage.getItem('AUTH_TOKEN') : null
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export default {
    // Rutas básicas CRUD
    create(data) {
        return $fetch('/sensor-readings', {
            method: 'POST',
            body: data,
            baseURL: getApiUrl(),
            headers: getAuthHeaders()
        })
    },
    getById(id) {
        return $fetch(`/sensor-readings/${id}`, {
            method: 'GET',
            baseURL: getApiUrl(),
            headers: getAuthHeaders()
        })
    },
    update(id, data) {
        return $fetch(`/sensor-readings/${id}`, {
            method: 'PUT',
            body: data,
            baseURL: getApiUrl(),
            headers: getAuthHeaders()
        })
    },
    delete(id) {
        return $fetch(`/sensor-readings/${id}`, {
            method: 'DELETE',
            baseURL: getApiUrl(),
            headers: getAuthHeaders()
        })
    },
    
    // Rutas por dispositivo
    getSensorReadingsByDeviceId(deviceId) {
        return $fetch(`/sensor-readings/device/${deviceId}`, {
            method: 'GET',
            baseURL: getApiUrl(),
            headers: getAuthHeaders()
        })
    },
    getLatestSensorReadingByDeviceId(deviceId) {
        return $fetch(`/sensor-readings/device/${deviceId}/latest`, {
            method: 'GET',
            baseURL: getApiUrl(),
            headers: getAuthHeaders()
        })
    },
    getDeviceSensorStats(deviceId) {
        return $fetch(`/sensor-readings/device/${deviceId}/stats`, {
            method: 'GET',
            baseURL: getApiUrl(),
            headers: getAuthHeaders()
        })
    },
    
    // Rutas por filtros y rangos
    getSensorReadingsByDateRange(startDate, endDate) {
        return $fetch(`/sensor-readings/date-range/${startDate}/${endDate}`, {
            method: 'GET',
            baseURL: getApiUrl(),
            headers: getAuthHeaders()
        })
    },
    getSensorReadingsOutOfThreshold() {
        return $fetch('/sensor-readings/threshold/out-of-range', {
            method: 'GET',
            baseURL: getApiUrl(),
            headers: getAuthHeaders()
        })
    },
    
    // Rutas de estadísticas
    getAverageSensorReadingsByPeriod(period) {
        return $fetch(`/sensor-readings/stats/average/${period}`, {
            method: 'GET',
            baseURL: getApiUrl(),
            headers: getAuthHeaders()
        })
    },
    getHourlyAverageSensorReadings() {
        return $fetch('/sensor-readings/stats/hourly-average', {
            method: 'GET',
            baseURL: getApiUrl(),
            headers: getAuthHeaders()
        })
    },
    
    // Rutas de mantenimiento
    deleteOldSensorReadings() {
        return $fetch('/sensor-readings/maintenance/old-readings', {
            method: 'DELETE',
            baseURL: getApiUrl(),
            headers: getAuthHeaders()
        })
    }
} 