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
        return $fetch('/alerts', {
            method: 'POST',
            body: data,
            baseURL: getApiUrl(),
            headers: getAuthHeaders()
        })
    },
    getById(id) {
        return $fetch(`/alerts/${id}`, {
            method: 'GET',
            baseURL: getApiUrl(),
            headers: getAuthHeaders()
        })
    },
    delete(id) {
        return $fetch(`/alerts/${id}`, {
            method: 'DELETE',
            baseURL: getApiUrl(),
            headers: getAuthHeaders()
        })
    },
    
    // Obtener alertas del usuario autenticado
    getMyAlerts(params = {}) {
        return $fetch('/alerts/my-alerts', {
            method: 'GET',
            query: params,
            baseURL: getApiUrl(),
            headers: getAuthHeaders()
        })
    },
    
    // Rutas por usuario
    getAlertsByUserId(userId) {
        return $fetch(`/alerts/user/${userId}`, {
            method: 'GET',
            baseURL: getApiUrl(),
            headers: getAuthHeaders()
        })
    },
    getUnresolvedAlertsByUserId(userId) {
        return $fetch(`/alerts/user/${userId}/unresolved`, {
            method: 'GET',
            baseURL: getApiUrl(),
            headers: getAuthHeaders()
        })
    },
    resolveAllAlertsByUserId() {
        return $fetch('/alerts/resolve-all', {
            method: 'PUT',
            baseURL: getApiUrl(),
            headers: getAuthHeaders()
        })
    },
    deleteOldAlerts(userId, days = 30) {
        return $fetch(`/alerts/user/${userId}/old`, {
            method: 'DELETE',
            query: { days },
            baseURL: getApiUrl(),
            headers: getAuthHeaders()
        })
    },
    
    // Eliminar todas las alertas del usuario autenticado
    deleteMyOldAlerts() {
        return $fetch('/alerts/old', {
            method: 'DELETE',
            baseURL: getApiUrl(),
            headers: getAuthHeaders()
        })
    },
    
    // Rutas para administrador
    getAllAlertsWithUsers(params = {}) {
        return $fetch('/alerts/admin/all', {
            method: 'GET',
            query: params,
            baseURL: getApiUrl(),
            headers: getAuthHeaders()
        })
    },
    
    deleteAllSystemAlerts() {
        return $fetch('/alerts/admin/all', {
            method: 'DELETE',
            baseURL: getApiUrl(),
            headers: getAuthHeaders()
        })
    },
    
    // Rutas por filtros
    getAlertsByType(alertType) {
        return $fetch(`/alerts/type/${alertType}`, {
            method: 'GET',
            baseURL: getApiUrl(),
            headers: getAuthHeaders()
        })
    },
    getAlertsBySeverity(severity) {
        return $fetch(`/alerts/severity/${severity}`, {
            method: 'GET',
            baseURL: getApiUrl(),
            headers: getAuthHeaders()
        })
    },
    
    // Rutas de acciones
    resolveAlert(id) {
        return $fetch(`/alerts/${id}/resolve`, {
            method: 'PUT',
            baseURL: getApiUrl(),
            headers: getAuthHeaders()
        })
    },
    unresolveAlert(id) {
        return $fetch(`/alerts/${id}/unresolve`, {
            method: 'PUT',
            baseURL: getApiUrl(),
            headers: getAuthHeaders()
        })
    },
    
    // Rutas de estadísticas
    getAlertCountByType() {
        return $fetch('/alerts/stats/type', {
            method: 'GET',
            baseURL: getApiUrl(),
            headers: getAuthHeaders()
        })
    },
    getAlertCountBySeverity() {
        return $fetch('/alerts/stats/severity', {
            method: 'GET',
            baseURL: getApiUrl(),
            headers: getAuthHeaders()
        })
    },
    
    // Rutas para crear alertas específicas
    createUserRegisteredAlert(data) {
        return $fetch('/alerts/user-registered', {
            method: 'POST',
            body: data,
            baseURL: getApiUrl(),
            headers: getAuthHeaders()
        })
    },
    createDeviceOfflineAlert(data) {
        return $fetch('/alerts/device-offline', {
            method: 'POST',
            body: data,
            baseURL: getApiUrl(),
            headers: getAuthHeaders()
        })
    },
    createHumidityThresholdAlert(data) {
        return $fetch('/alerts/humidity-threshold', {
            method: 'POST',
            body: data,
            baseURL: getApiUrl(),
            headers: getAuthHeaders()
        })
    },
    createIrrigationStartedAlert(data) {
        return $fetch('/alerts/irrigation-started', {
            method: 'POST',
            body: data,
            baseURL: getApiUrl(),
            headers: getAuthHeaders()
        })
    },
    createApiKeyCopiedAlert() {
        return $fetch('/alerts/device/api-key-copied', {
            method: 'POST',
            baseURL: getApiUrl(),
            headers: getAuthHeaders()
        })
    }
} 