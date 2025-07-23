import api from '../lib/axios'

export default {
    // Rutas básicas CRUD
    create(data) {
        return api.post('/sensor-readings', data)
    },
    getById(id) {
        return api.get(`/sensor-readings/${id}`)
    },
    update(id, data) {
        return api.put(`/sensor-readings/${id}`, data)
    },
    delete(id) {
        return api.delete(`/sensor-readings/${id}`)
    },
    
    // Rutas por dispositivo
    getSensorReadingsByDeviceId(deviceId) {
        return api.get(`/sensor-readings/device/${deviceId}`)
    },
    getLatestSensorReadingByDeviceId(deviceId) {
        return api.get(`/sensor-readings/device/${deviceId}/latest`)
    },
    getDeviceSensorStats(deviceId) {
        return api.get(`/sensor-readings/device/${deviceId}/stats`)
    },
    
    // Rutas por filtros y rangos
    getSensorReadingsByDateRange(startDate, endDate) {
        return api.get(`/sensor-readings/date-range/${startDate}/${endDate}`)
    },
    getSensorReadingsOutOfThreshold() {
        return api.get('/sensor-readings/threshold/out-of-range')
    },
    
    // Rutas de estadísticas
    getAverageSensorReadingsByPeriod(period) {
        return api.get(`/sensor-readings/stats/average/${period}`)
    },
    getHourlyAverageSensorReadings() {
        return api.get('/sensor-readings/stats/hourly-average')
    },
    
    // Rutas de mantenimiento
    deleteOldSensorReadings() {
        return api.delete('/sensor-readings/maintenance/old-readings')
    }
} 