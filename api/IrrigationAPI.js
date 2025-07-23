const getApiUrl = () => {
  const config = useRuntimeConfig()
  return config.public.apiUrl || 'http://localhost:3001/api'
}

const getAuthHeaders = () => {
  const token = process.client ? localStorage.getItem('AUTH_TOKEN') : null
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export default {
    // Rutas básicas de configuración de riego
    createIrrigationConfig(data) {
        return $fetch('/irrigation', {
            method: 'POST',
            body: data,
            baseURL: getApiUrl(),
            headers: getAuthHeaders()
        })
    },
    getIrrigationConfigById(id) {
        return $fetch(`/irrigation/${id}`, {
            method: 'GET',
            baseURL: getApiUrl(),
            headers: getAuthHeaders()
        })
    },
    deleteIrrigationConfig(id) {
        return $fetch(`/irrigation/${id}`, {
            method: 'DELETE',
            baseURL: getApiUrl(),
            headers: getAuthHeaders()
        })
    },
    
    // Rutas por usuario
    getActiveIrrigationConfigsByUser(userId) {
        return $fetch(`/irrigation/user/${userId}/active`, {
            method: 'GET',
            baseURL: getApiUrl(),
            headers: getAuthHeaders()
        })
    },
    getIrrigationConfigsByUserAndType(userId, modeType) {
        return $fetch(`/irrigation/user/${userId}/type/${modeType}`, {
            method: 'GET',
            baseURL: getApiUrl(),
            headers: getAuthHeaders()
        })
    },
    
    // Rutas de acciones
    activateIrrigationConfig(id) {
        return $fetch(`/irrigation/${id}/activate`, {
            method: 'PUT',
            baseURL: getApiUrl(),
            headers: getAuthHeaders()
        })
    },
    updateLastIrrigation(id, data) {
        return $fetch(`/irrigation/${id}/update-last-irrigation`, {
            method: 'PUT',
            body: data,
            baseURL: getApiUrl(),
            headers: getAuthHeaders()
        })
    },
    
    // Rutas de configuración específica
    getSpecificConfig(id) {
        return $fetch(`/irrigation/${id}/specific-config`, {
            method: 'GET',
            baseURL: getApiUrl(),
            headers: getAuthHeaders()
        })
    },
    
    // Rutas para configuraciones manuales
    createManualConfig(data) {
        return $fetch('/irrigation/manual', {
            method: 'POST',
            body: data,
            baseURL: getApiUrl(),
            headers: getAuthHeaders()
        })
    },
    
    // Rutas para configuraciones automáticas
    createAutomaticConfig(data) {
        return $fetch('/irrigation/automatic', {
            method: 'POST',
            body: data,
            baseURL: getApiUrl(),
            headers: getAuthHeaders()
        })
    },
    
    // Rutas para configuraciones programadas
    createProgrammedConfig(data) {
        return $fetch('/irrigation/programmed', {
            method: 'POST',
            body: data,
            baseURL: getApiUrl(),
            headers: getAuthHeaders()
        })
    },
    updateNextExecution(id, data) {
        return $fetch(`/irrigation/programmed/${id}/next-execution`, {
            method: 'PUT',
            body: data,
            baseURL: getApiUrl(),
            headers: getAuthHeaders()
        })
    }
} 