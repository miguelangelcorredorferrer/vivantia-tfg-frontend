import api from '../lib/axios'

export default {
    // Rutas básicas CRUD
    create(data) {
        return api.post('/alerts', data)
    },
    getById(id) {
        return api.get(`/alerts/${id}`)
    },
    delete(id) {
        return api.delete(`/alerts/${id}`)
    },
    
    // Rutas por usuario
    getAlertsByUserId(userId) {
        return api.get(`/alerts/user/${userId}`)
    },
    getUnresolvedAlertsByUserId(userId) {
        return api.get(`/alerts/user/${userId}/unresolved`)
    },
    resolveAllAlertsByUserId(userId) {
        return api.put(`/alerts/user/${userId}/resolve-all`)
    },
    deleteOldAlerts(userId) {
        return api.delete(`/alerts/user/${userId}/old`)
    },
    
    // Rutas por filtros
    getAlertsByType(alertType) {
        return api.get(`/alerts/type/${alertType}`)
    },
    getAlertsBySeverity(severity) {
        return api.get(`/alerts/severity/${severity}`)
    },
    
    // Rutas de acciones
    resolveAlert(id) {
        return api.put(`/alerts/${id}/resolve`)
    },
    unresolveAlert(id) {
        return api.put(`/alerts/${id}/unresolve`)
    },
    
    // Rutas de estadísticas
    getAlertCountByType() {
        return api.get('/alerts/stats/type')
    },
    getAlertCountBySeverity() {
        return api.get('/alerts/stats/severity')
    },
    
    // Rutas para crear alertas específicas
    createUserRegisteredAlert(data) {
        return api.post('/alerts/user-registered', data)
    },
    createDeviceOfflineAlert(data) {
        return api.post('/alerts/device-offline', data)
    },
    createHumidityThresholdAlert(data) {
        return api.post('/alerts/humidity-threshold', data)
    },
    createIrrigationStartedAlert(data) {
        return api.post('/alerts/irrigation-started', data)
    }
} 