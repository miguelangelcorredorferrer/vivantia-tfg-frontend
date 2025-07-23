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
        return $fetch('/pump-activations', {
            method: 'POST',
            body: data,
            baseURL: getApiUrl(),
            headers: getAuthHeaders()
        })
    },
    getById(id) {
        return $fetch(`/pump-activations/${id}`, {
            method: 'GET',
            baseURL: getApiUrl(),
            headers: getAuthHeaders()
        })
    },
    
    // Rutas por filtros
    getActivePumpActivations() {
        return $fetch('/pump-activations/active/all', {
            method: 'GET',
            baseURL: getApiUrl(),
            headers: getAuthHeaders()
        })
    },
    getPumpActivationsByUserId(userId) {
        return $fetch(`/pump-activations/user/${userId}`, {
            method: 'GET',
            baseURL: getApiUrl(),
            headers: getAuthHeaders()
        })
    },
    
    // Rutas de acciones
    completePumpActivation(id) {
        return $fetch(`/pump-activations/${id}/complete`, {
            method: 'PUT',
            baseURL: getApiUrl(),
            headers: getAuthHeaders()
        })
    },
    cancelPumpActivation(id) {
        return $fetch(`/pump-activations/${id}/cancel`, {
            method: 'PUT',
            baseURL: getApiUrl(),
            headers: getAuthHeaders()
        })
    },
    
    // Rutas de estadísticas
    getPumpActivationStats() {
        return $fetch('/pump-activations/stats/all', {
            method: 'GET',
            baseURL: getApiUrl(),
            headers: getAuthHeaders()
        })
    }
} 