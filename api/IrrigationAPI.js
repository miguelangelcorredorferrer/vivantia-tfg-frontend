const getApiUrl = () => {
  const config = useRuntimeConfig()
  return config.public.apiUrl || 'http://localhost:3001/api'
}

const getAuthHeaders = () => {
  const token = process.client ? localStorage.getItem('AUTH_TOKEN') : null
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export default {
    // Rutas básicas de configuración de riego
    createIrrigationConfig(data) {
        return $fetch('/irrigation', {
            method: 'POST',
            body: data,
            baseURL: getApiUrl(),
            headers: getAuthHeaders()
        })
    },
    getIrrigationConfigById(id) {
        return $fetch(`/irrigation/${id}`, {
            method: 'GET',
            baseURL: getApiUrl(),
            headers: getAuthHeaders()
        })
    },
    deleteIrrigationConfig(id) {
        return $fetch(`/irrigation/${id}`, {
            method: 'DELETE',
            baseURL: getApiUrl(),
            headers: getAuthHeaders()
        })
    },
    
    // Rutas por usuario
    getActiveIrrigationConfigsByUser(userId) {
        return $fetch(`/irrigation/user/${userId}/active`, {
            method: 'GET',
            baseURL: getApiUrl(),
            headers: getAuthHeaders()
        })
    },
    getIrrigationConfigsByUser(userId) {
        return $fetch(`/irrigation/user/${userId}/all`, {
            method: 'GET',
            baseURL: getApiUrl(),
            headers: getAuthHeaders()
        })
    },
    getIrrigationConfigsByUserAndType(userId, modeType) {
        return $fetch(`/irrigation/user/${userId}/type/${modeType}`, {
            method: 'GET',
            baseURL: getApiUrl(),
            headers: getAuthHeaders()
        })
    },
    
    // Rutas de acciones
    activateIrrigationConfig(id) {
        return $fetch(`/irrigation/${id}/activate`, {
            method: 'PUT',
            baseURL: getApiUrl(),
            headers: getAuthHeaders()
        })
    },
    deactivateIrrigationConfig(id) {
        return $fetch(`/irrigation/${id}/deactivate`, {
            method: 'PUT',
            baseURL: getApiUrl(),
            headers: getAuthHeaders()
        })
    },
    updateLastIrrigation(id, data) {
        return $fetch(`/irrigation/${id}/update-last-irrigation`, {
            method: 'PUT',
            body: data,
            baseURL: getApiUrl(),
            headers: getAuthHeaders()
        })
    },
    
    // Rutas de configuración específica
    getSpecificConfig(id) {
        return $fetch(`/irrigation/${id}/specific-config`, {
            method: 'GET',
            baseURL: getApiUrl(),
            headers: getAuthHeaders()
        })
    },
    
    // Rutas para configuraciones manuales (ahora integradas en irrigation_configs)
    updateManualConfig(id, data) {
        return $fetch(`/irrigation/manual/${id}`, {
            method: 'PUT',
            body: data,
            baseURL: getApiUrl(),
            headers: getAuthHeaders()
        })
    },
    
    // Rutas para configuraciones automáticas
    createAutomaticConfig(data) {
        return $fetch('/irrigation/automatic', {
            method: 'POST',
            body: data,
            baseURL: getApiUrl(),
            headers: getAuthHeaders()
        })
    },
    
    // ===== FUNCIONES ESPECÍFICAS PARA MODO AUTOMÁTICO =====
    
    // Crear configuración automática simplificada (sin duración)
    createSimpleAutomaticConfig(data) {
        return $fetch('/irrigation/automatic/simple', {
            method: 'POST',
            body: data,
            baseURL: getApiUrl(),
            headers: getAuthHeaders()
        })
    },

    // Obtener estado del modo automático
    async getAutomaticConfigStatus(userId) {
        try {
            return await $fetch(`/irrigation/automatic/status/${userId}`, {
                method: 'GET',
                baseURL: getApiUrl(),
                headers: getAuthHeaders()
            })
        } catch (error) {
            // Si es 404, devolver respuesta indicando que no hay configuración
            if (error.status === 404 || error.statusCode === 404) {
                return {
                    success: false,
                    message: 'No hay configuración automática activa',
                    data: null,
                    isNotFound: true
                }
            }
            // Para otros errores, relanzar
            throw error
        }
    },

    // Cancelar configuración automática
    async cancelAutomaticConfig(userId) {
        try {
            return await $fetch(`/irrigation/automatic/cancel/${userId}`, {
                method: 'DELETE',
                baseURL: getApiUrl(),
                headers: getAuthHeaders()
            })
        } catch (error) {
            // Si es 404, significa que no hay configuración para cancelar
            if (error.status === 404 || error.statusCode === 404) {
                return {
                    success: false,
                    message: 'No hay configuración automática activa para cancelar',
                    data: null,
                    isNotFound: true
                }
            }
            // Para otros errores, relanzar
            throw error
        }
    },

    // Evaluar riego automático
    async evaluateAutomaticIrrigation(userId) {
        return await $fetch(`/irrigation/automatic/evaluate/${userId}`, {
            method: 'POST',
            baseURL: getApiUrl(),
            headers: getAuthHeaders()
        })
    },

    // ===== FUNCIONES PARA MODO PROGRAMADO =====
    
    // Rutas para configuraciones programadas
    createProgrammedConfig(data) {
        return $fetch('/irrigation/programmed', {
            method: 'POST',
            body: data,
            baseURL: getApiUrl(),
            headers: getAuthHeaders()
        })
    },
    cancelProgrammedConfig(irrigationConfigId) {
        return $fetch(`/irrigation/programmed/${irrigationConfigId}/cancel`, {
            method: 'DELETE',
            baseURL: getApiUrl(),
            headers: getAuthHeaders()
        })
    },
    deleteProgrammedSettings(irrigationConfigId) {
        return $fetch(`/irrigation/programmed/${irrigationConfigId}/settings`, {
            method: 'DELETE',
            baseURL: getApiUrl(),
            headers: getAuthHeaders()
        })
    },
    cancelProgrammedIrrigation(irrigationConfigId) {
        return $fetch(`/irrigation/programmed/${irrigationConfigId}/cancel-irrigation`, {
            method: 'DELETE',
            baseURL: getApiUrl(),
            headers: getAuthHeaders()
        })
    },
    updateNextExecution(id, data) {
        return $fetch(`/irrigation/programmed/${id}/next-execution`, {
            method: 'PUT',
            body: data,
            baseURL: getApiUrl(),
            headers: getAuthHeaders()
        })
    },
    updateProgrammedExecution(id, data) {
        return $fetch(`/irrigation/programmed/${id}/execution`, {
            method: 'PUT',
            body: data,
            baseURL: getApiUrl(),
            headers: getAuthHeaders()
        })
    },

    // Rutas para activaciones de bomba
    createPumpActivation(data) {
        return $fetch('/irrigation/pump-activation', {
            method: 'POST',
            body: data,
            baseURL: getApiUrl(),
            headers: getAuthHeaders()
        })
    },
    getActivePumpActivation(irrigationConfigId) {
        return $fetch(`/irrigation/pump-activation/config/${irrigationConfigId}/active`, {
            method: 'GET',
            baseURL: getApiUrl(),
            headers: getAuthHeaders()
        })
    },
    getLatestPumpActivationByConfig(irrigationConfigId) {
        return $fetch(`/irrigation/pump-activation/config/${irrigationConfigId}/latest`, {
            method: 'GET',
            baseURL: getApiUrl(),
            headers: getAuthHeaders()
        })
    },
    updatePumpActivationStatus(id, data) {
        return $fetch(`/irrigation/pump-activation/${id}/status`, {
            method: 'PUT',
            body: data,
            baseURL: getApiUrl(),
            headers: getAuthHeaders()
        })
    },
    pausePumpActivation(id) {
        return $fetch(`/irrigation/pump-activation/${id}/pause`, {
            method: 'PUT',
            baseURL: getApiUrl(),
            headers: getAuthHeaders()
        })
    },
    resumePumpActivation(id) {
        return $fetch(`/irrigation/pump-activation/${id}/resume`, {
            method: 'PUT',
            baseURL: getApiUrl(),
            headers: getAuthHeaders()
        })
    },
    completePumpActivation(id) {
        return $fetch(`/irrigation/pump-activation/${id}/complete`, {
            method: 'PUT',
            baseURL: getApiUrl(),
            headers: getAuthHeaders()
        })
    },
    getPumpActivationsByUser(userId, limit = 10) {
        return $fetch(`/irrigation/pump-activation/user/${userId}/history?limit=${limit}`, {
            method: 'GET',
            baseURL: getApiUrl(),
            headers: getAuthHeaders()
        })
    },

    // Obtener última fecha de riego del usuario
    getLastIrrigationDate(userId) {
        return $fetch(`/irrigation/user/${userId}/last-irrigation`, {
            method: 'GET',
            baseURL: getApiUrl(),
            headers: getAuthHeaders()
        })
    },

    // Evaluar automáticamente después de insertar datos
    evaluateAutomaticIrrigation(userId) {
        return $fetch(`/irrigation/automatic/evaluate/${userId}`, {
            method: 'POST',
            baseURL: getApiUrl(),
            headers: getAuthHeaders()
        })
    },

    // Activar/desactivar bomba automática (método simple)
    toggleAutomaticPump(userId, action) {
        return $fetch(`/irrigation/automatic/toggle/${userId}`, {
            method: 'POST',
            body: { action },
            baseURL: getApiUrl(),
            headers: getAuthHeaders()
        })
    }
} 