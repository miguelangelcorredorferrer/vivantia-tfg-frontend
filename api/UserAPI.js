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
        return $fetch('/users', {
            method: 'POST',
            body: data,
            baseURL: getApiUrl(),
            headers: getAuthHeaders()
        })
    },
    getAllUsers() {
        return $fetch('/users', {
            method: 'GET',
            baseURL: getApiUrl(),
            headers: getAuthHeaders()
        })
    },
    getById(id) {
        return $fetch(`/users/${id}`, {
            method: 'GET',
            baseURL: getApiUrl(),
            headers: getAuthHeaders()
        })
    },
    update(id, data) {
        return $fetch(`/users/${id}`, {
            method: 'PUT',
            body: data,
            baseURL: getApiUrl(),
            headers: getAuthHeaders()
        })
    },
    delete(id) {
        return $fetch(`/users/${id}`, {
            method: 'DELETE',
            baseURL: getApiUrl(),
            headers: getAuthHeaders()
        })
    },
    
    // Rutas específicas
    getUserByEmail(email) {
        return $fetch(`/users/email/${email}`, {
            method: 'GET',
            baseURL: getApiUrl(),
            headers: getAuthHeaders()
        })
    },
    getCurrentUserProfile() {
        return $fetch('/users/profile/current', {
            method: 'GET',
            baseURL: getApiUrl(),
            headers: getAuthHeaders()
        })
    }
} 