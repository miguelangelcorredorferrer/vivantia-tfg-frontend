export const useApi = () => {
  const config = useRuntimeConfig()
  const apiUrl = config.public.apiUrl || 'http://localhost:3001/api'
  
  const getAuthHeaders = () => {
    const token = process.client ? localStorage.getItem('AUTH_TOKEN') : null
    return token ? { Authorization: `Bearer ${token}` } : {}
  }

  const apiCall = async (endpoint, options = {}) => {
    const headers = {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
      ...options.headers
    }

    try {
      const response = await $fetch(endpoint, {
        baseURL: apiUrl,
        headers,
        ...options
      })
      
      return response
    } catch (error) {
      // Manejar errores de autenticación
      if (error.status === 401 && process.client) {
        localStorage.removeItem('AUTH_TOKEN')
        await navigateTo('/auth/login')
      }
      
      throw error
    }
  }

  return {
    get: (endpoint, options = {}) => apiCall(endpoint, { method: 'GET', ...options }),
    post: (endpoint, body, options = {}) => apiCall(endpoint, { method: 'POST', body, ...options }),
    put: (endpoint, body, options = {}) => apiCall(endpoint, { method: 'PUT', body, ...options }),
    delete: (endpoint, options = {}) => apiCall(endpoint, { method: 'DELETE', ...options })
  }
} 