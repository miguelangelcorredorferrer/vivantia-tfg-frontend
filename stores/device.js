import { defineStore } from 'pinia'
import DeviceAPI from '~/api/DeviceAPI.js'

export const useDeviceStore = defineStore('device', () => {
  // Estado reactivo - Solo un dispositivo por usuario
  const device = ref(null)
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
      createdAt: backendDevice.created_at
    }
  }

  // Getters computados
  const hasDevice = computed(() => device.value !== null)
  const isDeviceActive = computed(() => device.value?.is_active_communication || false)
  const deviceName = computed(() => device.value?.device_name || '')
  const enddeviceId = computed(() => device.value?.enddevice_id || '')
  
  // Para compatibilidad con componentes existentes que esperan arrays
  const devices = computed(() => {
    const mappedDevice = mapDeviceFromBackend(device.value)
    console.log('🔄 Computed devices ejecutado:', mappedDevice)
    return mappedDevice ? [mappedDevice] : []
  })
  const deviceCount = computed(() => device.value ? 1 : 0)
  const activeDevices = computed(() => isDeviceActive.value ? devices.value : [])
  const activeDeviceCount = computed(() => isDeviceActive.value ? 1 : 0)
  
  // Para el filtro con sugerencias (aunque sea un solo dispositivo)
  const deviceNames = computed(() => {
    const mappedDevice = devices.value[0]
    return mappedDevice?.deviceName ? [mappedDevice.deviceName] : []
  })
  const enddeviceIds = computed(() => {
    const mappedDevice = devices.value[0]
    return mappedDevice?.enddeviceId ? [mappedDevice.enddeviceId] : []
  })

  // Actions para operaciones CRUD
  const fetchUserDevice = async (userId) => {
    try {
      isLoading.value = true
      error.value = null
      
      const response = await DeviceAPI.getDevicesByUserId(userId)
      // Como solo hay un dispositivo por usuario, tomar el primero
      device.value = response.data?.[0] || null
      
      console.log('📱 Dispositivo del usuario cargado:', device.value?.device_name || 'ninguno')
      console.log('📊 Datos del dispositivo desde backend:', device.value)
      console.log('📋 Dispositivo mapeado para frontend:', mapDeviceFromBackend(device.value))
      return response
    } catch (err) {
      error.value = err.message || 'Error al cargar dispositivo del usuario'
      console.error('❌ Error cargando dispositivo del usuario:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const createDevice = async (deviceData) => {
    try {
      isLoading.value = true
      error.value = null
      
      // Si ya hay un dispositivo, no permitir crear otro
      if (device.value) {
        throw new Error('Ya tienes un dispositivo registrado. Solo se permite uno por usuario.')
      }
      
      const response = await DeviceAPI.create(deviceData)
      
      // Establecer el nuevo dispositivo como el dispositivo del usuario
      if (response.data) {
        device.value = response.data
      }
      
      console.log('✅ Dispositivo creado:', response.data?.deviceName)
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
      
      // Verificar que estamos actualizando el dispositivo correcto
      if (device.value?.id !== deviceId) {
        throw new Error('No tienes permisos para actualizar este dispositivo')
      }
      
      const response = await DeviceAPI.update(deviceId, updateData)
      
      // Actualizar el dispositivo en el estado
      if (response.data) {
        device.value = { ...device.value, ...response.data }
      }
      
      console.log('✅ Dispositivo actualizado:', response.data?.deviceName)
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
      
      // Verificar que estamos eliminando el dispositivo correcto
      if (device.value?.id !== deviceId) {
        throw new Error('No tienes permisos para eliminar este dispositivo')
      }
      
      await DeviceAPI.delete(deviceId)
      
      // Limpiar el dispositivo del estado
      device.value = null
      
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
      
      // Verificar que estamos cambiando el estado del dispositivo correcto
      if (device.value?.id !== deviceId) {
        throw new Error('No tienes permisos para cambiar el estado de este dispositivo')
      }
      
      const response = isActive 
        ? await DeviceAPI.activateDevice(deviceId)
        : await DeviceAPI.deactivateDevice(deviceId)
      
      // Actualizar el estado del dispositivo
      if (response.data && device.value) {
        device.value.is_active_communication = isActive
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

  // Utilidades para filtros (simplificadas para un solo dispositivo)
  const filterDevicesSuggestions = (searchTerm, field) => {
    if (!searchTerm || devices.value.length === 0) return []
    
    const mappedDevice = devices.value[0]
    const value = field === 'deviceName' ? mappedDevice.deviceName : mappedDevice.enddeviceId
    
    if (value && value.toLowerCase().includes(searchTerm.toLowerCase())) {
      return [value]
    }
    
    return []
  }

  const filterDevices = (filters) => {
    if (devices.value.length === 0) return []
    
    const mappedDevice = devices.value[0]
    
    // Si no hay filtros, devolver el dispositivo mapeado
    if (!filters.deviceName && !filters.enddeviceId) {
      return devices.value
    }
    
    let matches = true
    
    if (filters.deviceName) {
      matches = matches && mappedDevice.deviceName?.toLowerCase().includes(filters.deviceName.toLowerCase())
    }
    
    if (filters.enddeviceId) {
      matches = matches && mappedDevice.enddeviceId?.toLowerCase().includes(filters.enddeviceId.toLowerCase())
    }
    
    return matches ? devices.value : []
  }

  // Limpiar errores
  const clearError = () => {
    error.value = null
  }

  // Reset del store
  const reset = () => {
    device.value = null
    error.value = null
    isLoading.value = false
  }

  return {
    // Estado principal
    device,
    isLoading,
    error,
    
    // Getters
    hasDevice,
    isDeviceActive,
    deviceName,
    enddeviceId,
    
    // Compatibilidad con arrays para componentes existentes
    devices,
    deviceCount,
    activeDevices,
    activeDeviceCount,
    deviceNames,
    enddeviceIds,
    
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