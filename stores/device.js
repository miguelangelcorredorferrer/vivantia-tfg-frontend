import { defineStore } from 'pinia'
import DeviceAPI from '~/api/DeviceAPI.js'

export const useDeviceStore = defineStore('device', () => {
  // Estado reactivo - Múltiples dispositivos por usuario + dispositivo actual
  const devices = ref([])
  const device = ref(null) // Dispositivo actual en uso
  const isLoading = ref(false)
  const error = ref(null)

  // Helper para mapear dispositivo del backend al frontend
  const mapDeviceFromBackend = (backendDevice) => {
    if (!backendDevice) return null
    return {
      id: backendDevice.id,
      deviceName: backendDevice.device_name,
      enddeviceId: backendDevice.enddevice_id,
      appEui: backendDevice.app_eui,
      devEui: backendDevice.dev_eui,
      appKey: backendDevice.app_key,
      isActive: backendDevice.is_active_communication,
      userId: backendDevice.user_id,
      ttnRegion: backendDevice.ttn_region,
      ttnAppId: backendDevice.ttn_app_id,
      ttnAccessKey: backendDevice.ttn_access_key,
      createdAt: backendDevice.created_at
    }
  }

  // Mapear dispositivos del backend al frontend
  const mappedDevices = computed(() => {
    return devices.value.map(device => mapDeviceFromBackend(device))
  })

  // Getters computados
  const hasDevice = computed(() => devices.value.length > 0)
  const isDeviceActive = computed(() => device.value?.is_active_communication || false)
  const deviceName = computed(() => device.value?.device_name || '')
  const enddeviceId = computed(() => device.value?.enddevice_id || '')
  const deviceCount = computed(() => devices.value.length)
  const activeDevices = computed(() => mappedDevices.value.filter(device => device.isActive))
  const activeDeviceCount = computed(() => activeDevices.value.length)
  
  // Para el filtro con sugerencias
  const deviceNames = computed(() => {
    return mappedDevices.value.map(device => device.deviceName).filter(Boolean)
  })
  const enddeviceIds = computed(() => {
    return mappedDevices.value.map(device => device.enddeviceId).filter(Boolean)
  })

  // Actions para operaciones CRUD
  const fetchUserDevice = async (userId) => {
    try {
      isLoading.value = true
      error.value = null
      
      const response = await DeviceAPI.getDevicesByUserId(userId)
      // Cargar todos los dispositivos del usuario
      devices.value = response.data || []
      
      // Establecer el primer dispositivo como dispositivo actual (si existe)
      device.value = devices.value.length > 0 ? devices.value[0] : null
      
      console.log('📱 Dispositivos del usuario cargados:', devices.value.length)
      console.log('📊 Dispositivo actual:', device.value?.device_name || 'ninguno')
      return response
    } catch (err) {
      error.value = err.message || 'Error al cargar dispositivos del usuario'
      console.error('❌ Error cargando dispositivos del usuario:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const createDevice = async (deviceData) => {
    try {
      isLoading.value = true
      error.value = null
      
      const response = await DeviceAPI.create(deviceData)
      
      // Agregar el nuevo dispositivo al array
      if (response.data) {
        devices.value.push(response.data)
        // Si es el primer dispositivo, establecerlo como dispositivo actual
        if (devices.value.length === 1) {
          device.value = response.data
        }
      }
      
      console.log('✅ Dispositivo creado:', response.data?.device_name)
      return response
    } catch (err) {
      error.value = err.message || 'Error al crear dispositivo'
      console.error('❌ Error creando dispositivo:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const updateDevice = async (deviceId, updateData) => {
    try {
      isLoading.value = true
      error.value = null
      
      // Verificar que el dispositivo existe en la lista del usuario
      const deviceIndex = devices.value.findIndex(d => d.id === deviceId)
      if (deviceIndex === -1) {
        throw new Error('No tienes permisos para actualizar este dispositivo')
      }
      
      const response = await DeviceAPI.update(deviceId, updateData)
      
      // Actualizar el dispositivo en el array y en device si es el actual
      if (response.data) {
        devices.value[deviceIndex] = response.data
        if (device.value?.id === deviceId) {
          device.value = response.data
        }
      }
      
      console.log('✅ Dispositivo actualizado:', response.data?.device_name)
      return response
    } catch (err) {
      error.value = err.message || 'Error al actualizar dispositivo'
      console.error('❌ Error actualizando dispositivo:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const deleteDevice = async (deviceId) => {
    try {
      isLoading.value = true
      error.value = null
      
      // Verificar que el dispositivo existe en la lista del usuario
      const deviceIndex = devices.value.findIndex(d => d.id === deviceId)
      if (deviceIndex === -1) {
        throw new Error('No tienes permisos para eliminar este dispositivo')
      }
      
      await DeviceAPI.delete(deviceId)
      
      // Remover el dispositivo del array
      devices.value.splice(deviceIndex, 1)
      
      // Si era el dispositivo actual, limpiarlo
      if (device.value?.id === deviceId) {
        device.value = devices.value.length > 0 ? devices.value[0] : null
      }
      
      console.log('✅ Dispositivo eliminado')
      return true
    } catch (err) {
      error.value = err.message || 'Error al eliminar dispositivo'
      console.error('❌ Error eliminando dispositivo:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const toggleDeviceActive = async (deviceId, isActive) => {
    try {
      isLoading.value = true
      error.value = null
      
      // Verificar que el dispositivo existe en la lista del usuario
      const deviceIndex = devices.value.findIndex(d => d.id === deviceId)
      if (deviceIndex === -1) {
        throw new Error('No tienes permisos para cambiar el estado de este dispositivo')
      }
      
      let response
      
      if (isActive) {
        // Si se está activando, usar la lógica de activación con validación
        try {
          response = await DeviceAPI.activateDevice(deviceId, false) // force = false para validación
        } catch (error) {
          // Si hay un error 409 (conflicto), significa que hay otro dispositivo activo
          if (error.status === 409) {
            // Activar con force = true para desactivar automáticamente los demás
            response = await DeviceAPI.activateDevice(deviceId, true)
          } else {
            throw error
          }
        }
      } else {
        // Si se está desactivando, proceder normalmente
        response = await DeviceAPI.deactivateDevice(deviceId)
      }
      
      // Actualizar el estado de todos los dispositivos en el array
      if (response.data) {
        // Si se activó un dispositivo, desactivar todos los demás
        if (isActive) {
          devices.value.forEach((device, index) => {
            if (device.id === deviceId) {
              devices.value[index].is_active_communication = true
            } else {
              devices.value[index].is_active_communication = false
            }
          })
          
          // Si es el dispositivo actual, actualizarlo también
          if (device.value?.id === deviceId) {
            device.value.is_active_communication = true
          }
        } else {
          // Si se desactivó, solo actualizar el dispositivo específico
          devices.value[deviceIndex].is_active_communication = false
          if (device.value?.id === deviceId) {
            device.value.is_active_communication = false
          }
        }
        
        // Forzar la reactividad de Vue
        devices.value = [...devices.value]
      }
      
      console.log(`✅ Dispositivo ${isActive ? 'activado' : 'desactivado'}`)
      return response
    } catch (err) {
      error.value = err.message || 'Error al cambiar estado del dispositivo'
      console.error('❌ Error cambiando estado del dispositivo:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const getDeviceById = async (deviceId) => {
    try {
      const response = await DeviceAPI.getById(deviceId)
      
      // Solo actualizar si es el dispositivo del usuario
      if (response.data && device.value?.id === deviceId) {
        device.value = response.data
      }
      
      return response
    } catch (err) {
      error.value = err.message || 'Error al obtener dispositivo'
      console.error('❌ Error obteniendo dispositivo:', err)
      throw err
    }
  }

  const getDeviceByEndDeviceId = async (endDeviceId) => {
    try {
      const response = await DeviceAPI.getDeviceByEndDeviceId(endDeviceId)
      return response
    } catch (err) {
      error.value = err.message || 'Error al obtener dispositivo por EndDeviceId'
      console.error('❌ Error obteniendo dispositivo por EndDeviceId:', err)
      throw err
    }
  }

  // Utilidades para filtros
  const filterDevicesSuggestions = (searchTerm, field) => {
    if (!searchTerm || mappedDevices.value.length === 0) return []
    
    return mappedDevices.value
      .map(device => field === 'deviceName' ? device.deviceName : device.enddeviceId)
      .filter(value => value && value.toLowerCase().includes(searchTerm.toLowerCase()))
  }

  const filterDevices = (filters) => {
    if (mappedDevices.value.length === 0) return []
    
    // Si no hay filtros, devolver todos los dispositivos mapeados
    if (!filters.deviceName && !filters.enddeviceId) {
      return mappedDevices.value
    }
    
    return mappedDevices.value.filter(device => {
      let matches = true
      
      if (filters.deviceName) {
        matches = matches && device.deviceName?.toLowerCase().includes(filters.deviceName.toLowerCase())
      }
      
      if (filters.enddeviceId) {
        matches = matches && device.enddeviceId?.toLowerCase().includes(filters.enddeviceId.toLowerCase())
      }
      
      return matches
    })
  }

  // Limpiar errores
  const clearError = () => {
    error.value = null
  }

  // Reset del store
  const reset = () => {
    devices.value = []
    device.value = null
    error.value = null
    isLoading.value = false
  }

  return {
    // Estado principal
    devices,
    device,
    isLoading,
    error,
    
    // Getters
    hasDevice,
    isDeviceActive,
    deviceName,
    enddeviceId,
    deviceCount,
    activeDevices,
    activeDeviceCount,
    deviceNames,
    enddeviceIds,
    mappedDevices,
    
    // Actions
    fetchUserDevice,
    createDevice,
    updateDevice,
    deleteDevice,
    toggleDeviceActive,
    getDeviceById,
    getDeviceByEndDeviceId,
    filterDevicesSuggestions,
    filterDevices,
    clearError,
    reset
  }
}) 