import api from '../lib/axios'

export default {
    // Rutas básicas de configuración de riego
    createIrrigationConfig(data) {
        return api.post('/irrigation', data)
    },
    getIrrigationConfigById(id) {
        return api.get(`/irrigation/${id}`)
    },
    deleteIrrigationConfig(id) {
        return api.delete(`/irrigation/${id}`)
    },
    
    // Rutas por usuario
    getActiveIrrigationConfigsByUser(userId) {
        return api.get(`/irrigation/user/${userId}/active`)
    },
    getIrrigationConfigsByUserAndType(userId, modeType) {
        return api.get(`/irrigation/user/${userId}/type/${modeType}`)
    },
    
    // Rutas de acciones
    activateIrrigationConfig(id) {
        return api.put(`/irrigation/${id}/activate`)
    },
    updateLastIrrigation(id, data) {
        return api.put(`/irrigation/${id}/update-last-irrigation`, data)
    },
    
    // Rutas de configuración específica
    getSpecificConfig(id) {
        return api.get(`/irrigation/${id}/specific-config`)
    },
    
    // Rutas para configuraciones manuales
    createManualConfig(data) {
        return api.post('/irrigation/manual', data)
    },
    
    // Rutas para configuraciones automáticas
    createAutomaticConfig(data) {
        return api.post('/irrigation/automatic', data)
    },
    
    // Rutas para configuraciones programadas
    createProgrammedConfig(data) {
        return api.post('/irrigation/programmed', data)
    },
    updateNextExecution(id, data) {
        return api.put(`/irrigation/programmed/${id}/next-execution`, data)
    }
} 