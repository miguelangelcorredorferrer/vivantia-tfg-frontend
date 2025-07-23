import api from '../lib/axios'

export default {
    // Rutas básicas CRUD
    create(data) {
        return api.post('/crops', data)
    },
    getAll() {
        return api.get('/crops')
    },
    getById(id) {
        return api.get(`/crops/${id}`)
    },
    update(id, data) {
        return api.put(`/crops/${id}`, data)
    },
    delete(id) {
        return api.delete(`/crops/${id}`)
    },
    
    // Rutas por usuario
    getCropByUserId(userId) {
        return api.get(`/crops/user/${userId}`)
    },
    getSelectedCropByUserId(userId) {
        return api.get(`/crops/user/${userId}/selected`)
    },
    
    // Rutas de acciones
    selectCrop(id) {
        return api.put(`/crops/${id}/select`)
    },
    deselectCrop(id) {
        return api.put(`/crops/${id}/deselect`)
    },
    
    // Rutas relacionadas
    getCropIrrigationConfigs(id) {
        return api.get(`/crops/${id}/irrigation-configs`)
    }
} 