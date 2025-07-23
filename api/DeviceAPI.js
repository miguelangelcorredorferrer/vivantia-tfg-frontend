import api from '../lib/axios'

export default {
    // Rutas básicas CRUD
    create(data) {
        return api.post('/devices', data)
    },
    getAll() {
        return api.get('/devices')
    },
    getById(id) {
        return api.get(`/devices/${id}`)
    },
    update(id, data) {
        return api.put(`/devices/${id}`, data)
    },
    delete(id) {
        return api.delete(`/devices/${id}`)
    },
    
    // Rutas por usuario
    getDevicesByUserId(userId) {
        return api.get(`/devices/user/${userId}`)
    },
    
    // Rutas por filtros
    getActiveDevices() {
        return api.get('/devices/active/all')
    },
    getDeviceByEndDeviceId(endDeviceId) {
        return api.get(`/devices/enddevice/${endDeviceId}`)
    },
    
    // Rutas de acciones
    activateDevice(id) {
        return api.put(`/devices/${id}/activate`)
    },
    deactivateDevice(id) {
        return api.put(`/devices/${id}/deactivate`)
    },
    
    // Rutas relacionadas con sensores
    getDeviceSensorReadings(id) {
        return api.get(`/devices/${id}/sensor-readings`)
    },
    getDeviceLatestReading(id) {
        return api.get(`/devices/${id}/latest-reading`)
    }
} 