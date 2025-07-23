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
        return $fetch('/devices', {
            method: 'POST',
            body: data,
            baseURL: getApiUrl(),
            headers: getAuthHeaders()
        })
    },
    getAll() {
        return $fetch('/devices', {
            method: 'GET',
            baseURL: getApiUrl(),
            headers: getAuthHeaders()
        })
    },
    getById(id) {
        return $fetch(`/devices/${id}`, {
            method: 'GET',
            baseURL: getApiUrl(),
            headers: getAuthHeaders()
        })
    },
    update(id, data) {
        return $fetch(`/devices/${id}`, {
            method: 'PUT',
            body: data,
            baseURL: getApiUrl(),
            headers: getAuthHeaders()
        })
    },
    delete(id) {
        return $fetch(`/devices/${id}`, {
            method: 'DELETE',
            baseURL: getApiUrl(),
            headers: getAuthHeaders()
        })
    },
    
    // Rutas por usuario
    getDevicesByUserId(userId) {
        return $fetch(`/devices/user/${userId}`, {
            method: 'GET',
            baseURL: getApiUrl(),
            headers: getAuthHeaders()
        })
    },
    
    // Rutas por filtros
    getActiveDevices() {
        return $fetch('/devices/active/all', {
            method: 'GET',
            baseURL: getApiUrl(),
            headers: getAuthHeaders()
        })
    },
    getDeviceByEndDeviceId(endDeviceId) {
        return $fetch(`/devices/enddevice/${endDeviceId}`, {
            method: 'GET',
            baseURL: getApiUrl(),
            headers: getAuthHeaders()
        })
    },
    
    // Rutas de acciones
    activateDevice(id) {
        return $fetch(`/devices/${id}/activate`, {
            method: 'PUT',
            baseURL: getApiUrl(),
            headers: getAuthHeaders()
        })
    },
    deactivateDevice(id) {
        return $fetch(`/devices/${id}/deactivate`, {
            method: 'PUT',
            baseURL: getApiUrl(),
            headers: getAuthHeaders()
        })
    },
    
    // Rutas relacionadas con sensores
    getDeviceSensorReadings(id) {
        return $fetch(`/devices/${id}/sensor-readings`, {
            method: 'GET',
            baseURL: getApiUrl(),
            headers: getAuthHeaders()
        })
    },
    getDeviceLatestReading(id) {
        return $fetch(`/devices/${id}/latest-reading`, {
            method: 'GET',
            baseURL: getApiUrl(),
            headers: getAuthHeaders()
        })
    }
} 