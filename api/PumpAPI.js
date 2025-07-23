import api from '../lib/axios'

export default {
    // Rutas básicas CRUD
    create(data) {
        return api.post('/pump-activations', data)
    },
    getById(id) {
        return api.get(`/pump-activations/${id}`)
    },
    
    // Rutas por filtros
    getActivePumpActivations() {
        return api.get('/pump-activations/active/all')
    },
    getPumpActivationsByUserId(userId) {
        return api.get(`/pump-activations/user/${userId}`)
    },
    
    // Rutas de acciones
    completePumpActivation(id) {
        return api.put(`/pump-activations/${id}/complete`)
    },
    cancelPumpActivation(id) {
        return api.put(`/pump-activations/${id}/cancel`)
    },
    
    // Rutas de estadísticas
    getPumpActivationStats() {
        return api.get('/pump-activations/stats/all')
    }
} 