import api from '../lib/axios'

export default {
    register(data) {
        return api.post('/auth/register', data)
    },
    login(data) {
        return api.post('/auth/login', data)
    },
    forgotPassword(data) {
        return api.post('/auth/forgot-password', data)
    },
    verifyPasswordResetToken(token) {
        return api.get(`/auth/verify-token/${token}`)
    },
    updatePassword(token, data) {
        return api.put(`/auth/update-password/${token}`, data)
    },
    changePassword(data) {
        return api.put('/auth/change-password', data)
    },
    verifyAccount(token) {
        return api.get(`/auth/verify/${token}`)
    },
    getUser() {
        return api.get('/auth/user')
    },
    getAdmin() {
        return api.get('/auth/admin')
    }
} 