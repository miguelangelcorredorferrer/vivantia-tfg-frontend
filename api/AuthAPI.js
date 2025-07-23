const getApiUrl = () => {
  const config = useRuntimeConfig()
  return config.public.apiUrl || 'http://localhost:3001/api'
}

const getAuthHeaders = () => {
  const token = process.client ? localStorage.getItem('AUTH_TOKEN') : null
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export default {
    register(data) {
        return $fetch('/auth/register', {
            method: 'POST',
            body: data,
            baseURL: getApiUrl()
        })
    },
    login(data) {
        return $fetch('/auth/login', {
            method: 'POST',
            body: data,
            baseURL: getApiUrl()
        })
    },
    forgotPassword(data) {
        return $fetch('/auth/forgot-password', {
            method: 'POST',
            body: data,
            baseURL: getApiUrl()
        })
    },
    verifyPasswordResetToken(token) {
        return $fetch(`/auth/verify-token/${token}`, {
            method: 'GET',
            baseURL: getApiUrl()
        })
    },
    updatePassword(token, data) {
        return $fetch(`/auth/update-password/${token}`, {
            method: 'PUT',
            body: data,
            baseURL: getApiUrl()
        })
    },
    changePassword(data) {
        return $fetch('/auth/change-password', {
            method: 'PUT',
            body: data,
            baseURL: getApiUrl(),
            headers: getAuthHeaders()
        })
    },
    verifyAccount(token) {
        return $fetch(`/auth/verify/${token}`, {
            method: 'GET',
            baseURL: getApiUrl()
        })
    },
    getUser() {
        return $fetch('/auth/user', {
            method: 'GET',
            baseURL: getApiUrl(),
            headers: getAuthHeaders()
        })
    },
    getAdmin() {
        return $fetch('/auth/admin', {
            method: 'GET',
            baseURL: getApiUrl(),
            headers: getAuthHeaders()
        })
    }
} 