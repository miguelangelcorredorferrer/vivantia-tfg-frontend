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
        return $fetch('/crops', {
            method: 'POST',
            body: data,
            baseURL: getApiUrl(),
            headers: getAuthHeaders()
        })
    },
    getAll() {
        return $fetch('/crops', {
            method: 'GET',
            baseURL: getApiUrl(),
            headers: getAuthHeaders()
        })
    },
    getById(id) {
        return $fetch(`/crops/${id}`, {
            method: 'GET',
            baseURL: getApiUrl(),
            headers: getAuthHeaders()
        })
    },
    update(id, data) {
        return $fetch(`/crops/${id}`, {
            method: 'PUT',
            body: data,
            baseURL: getApiUrl(),
            headers: getAuthHeaders()
        })
    },
    delete(id) {
        return $fetch(`/crops/${id}`, {
            method: 'DELETE',
            baseURL: getApiUrl(),
            headers: getAuthHeaders()
        })
    },
    
    // Rutas por usuario
    getCropByUserId(userId) {
        return $fetch(`/crops/user/${userId}`, {
            method: 'GET',
            baseURL: getApiUrl(),
            headers: getAuthHeaders()
        })
    },
    getSelectedCropByUserId(userId) {
        return $fetch(`/crops/user/${userId}/selected`, {
            method: 'GET',
            baseURL: getApiUrl(),
            headers: getAuthHeaders()
        })
    },
    
    // Rutas de acciones
    selectCrop(id) {
        return $fetch(`/crops/${id}/select`, {
            method: 'PUT',
            baseURL: getApiUrl(),
            headers: getAuthHeaders()
        })
    },
    deselectCrop(id) {
        return $fetch(`/crops/${id}/deselect`, {
            method: 'PUT',
            baseURL: getApiUrl(),
            headers: getAuthHeaders()
        })
    },
    
    // Rutas relacionadas
    getCropIrrigationConfigs(id) {
        return $fetch(`/crops/${id}/irrigation-configs`, {
            method: 'GET',
            baseURL: getApiUrl(),
            headers: getAuthHeaders()
        })
    }
} 