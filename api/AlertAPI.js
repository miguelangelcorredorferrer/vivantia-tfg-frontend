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
        return $fetch('/alerts', {
            method: 'GET',
            query: params,
            baseURL: getApiUrl(),
            headers: getAuthHeaders()
        })
    },
    
    // Rutas para resolver alertas
    resolveAllAlertsByUserId() {
        return $fetch('/alerts/resolve-all', {
            method: 'PUT',
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
    

    
    // Rutas de acciones
    resolveAlert(id) {
        return $fetch(`/alerts/${id}/resolve`, {
            method: 'PUT',
            baseURL: getApiUrl(),
            headers: getAuthHeaders()
        })
    },
    

    

} 