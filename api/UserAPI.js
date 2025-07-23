import api from '../lib/axios'

export default {
    // Rutas básicas CRUD
    create(data) {
        return api.post('/users', data)
    },
    getAllUsers() {
        return api.get('/users')
    },
    getById(id) {
        return api.get(`/users/${id}`)
    },
    update(id, data) {
        return api.put(`/users/${id}`, data)
    },
    delete(id) {
        return api.delete(`/users/${id}`)
    },
    
    // Rutas específicas
    getUserByEmail(email) {
        return api.get(`/users/email/${email}`)
    },
    getCurrentUserProfile() {
        return api.get('/users/profile/current')
    }
} 