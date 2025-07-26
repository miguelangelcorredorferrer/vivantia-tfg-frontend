import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import UserAPI from '~/api/UserAPI'
import CropAPI from '~/api/CropAPI'
import DeviceAPI from '~/api/DeviceAPI'

export const useAdminStore = defineStore('admin', () => {
  // Estado
  const users = ref([])
  const crops = ref([])
  const devices = ref([])
  const isLoading = ref(false)
  const error = ref(null)
  
  // Filtros de usuarios
  const nameFilter = ref('')
  const emailFilter = ref('')
  
  // Filtros de cultivos
  const cropNameFilter = ref('')
  const cropCategoryFilter = ref('')
  const cropUserFilter = ref('')
  const cropEmailFilter = ref('')
  const cropSessionFilter = ref('')

  // Filtros de dispositivos
  const deviceNameFilter = ref('')
  const deviceUserFilter = ref('')
  const deviceEmailFilter = ref('')
  const deviceEndDeviceFilter = ref('')

  // Getters
  const filteredUsers = computed(() => {
    return users.value.filter(user => {
      const nameMatch = !nameFilter.value || 
        user.name.toLowerCase().includes(nameFilter.value.toLowerCase())
      const emailMatch = !emailFilter.value || 
        user.email.toLowerCase().includes(emailFilter.value.toLowerCase())
      
      return nameMatch && emailMatch
    })
  })

  const totalUsers = computed(() => users.value.length)
  const filteredUsersCount = computed(() => filteredUsers.value.length)
  
  // Getters para cultivos
  const filteredCrops = computed(() => {
    return crops.value.filter(crop => {
      const nameMatch = !cropNameFilter.value || 
        crop.name.toLowerCase().includes(cropNameFilter.value.toLowerCase())
      const categoryMatch = !cropCategoryFilter.value || 
        (crop.category && crop.category.toLowerCase().includes(cropCategoryFilter.value.toLowerCase()))
      const userMatch = !cropUserFilter.value || 
        (crop.user && crop.user.name.toLowerCase().includes(cropUserFilter.value.toLowerCase()))
      const emailMatch = !cropEmailFilter.value || 
        (crop.user && crop.user.email.toLowerCase().includes(cropEmailFilter.value.toLowerCase()))
      const sessionMatch = !cropSessionFilter.value || 
        (crop.session && crop.session.toLowerCase().includes(cropSessionFilter.value.toLowerCase()))
      
      return nameMatch && categoryMatch && userMatch && emailMatch && sessionMatch
    })
  })

  const totalCrops = computed(() => crops.value.length)
  const filteredCropsCount = computed(() => filteredCrops.value.length)

  // Getters para dispositivos
  const filteredDevices = computed(() => {
    return devices.value.filter(device => {
      const nameMatch = !deviceNameFilter.value || 
        device.device_name.toLowerCase().includes(deviceNameFilter.value.toLowerCase())
      const userMatch = !deviceUserFilter.value || 
        (device.user && device.user.name.toLowerCase().includes(deviceUserFilter.value.toLowerCase()))
      const emailMatch = !deviceEmailFilter.value || 
        (device.user && device.user.email.toLowerCase().includes(deviceEmailFilter.value.toLowerCase()))
      const endDeviceMatch = !deviceEndDeviceFilter.value || 
        device.enddevice_id.toLowerCase().includes(deviceEndDeviceFilter.value.toLowerCase())
      
      return nameMatch && userMatch && emailMatch && endDeviceMatch
    })
  })

  const totalDevices = computed(() => devices.value.length)
  const filteredDevicesCount = computed(() => filteredDevices.value.length)

  // Actions
  const fetchAllUsers = async () => {
    try {
      isLoading.value = true
      error.value = null
      
      const response = await UserAPI.getAllUsers()
      users.value = response.data || []
      
      console.log('✅ AdminStore: Usuarios cargados exitosamente')
    } catch (err) {
      console.error('❌ AdminStore: Error cargando usuarios:', err)
      error.value = 'Error al cargar usuarios'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const deleteUser = async (userId, force = false) => {
    try {
      isLoading.value = true
      error.value = null
      
      const response = await UserAPI.delete(userId, force)
      
      if (response.success) {
        // Remover usuario de la lista local
        const index = users.value.findIndex(user => user.id === userId)
        if (index !== -1) {
          users.value.splice(index, 1)
        }
        
        console.log('✅ AdminStore: Usuario eliminado exitosamente')
        return { success: true, message: response.message }
      }
      
      throw new Error(response.message || 'Error al eliminar usuario')
    } catch (err) {
      console.error('❌ AdminStore: Error eliminando usuario:', err)
      
      // Si el error es un 409 (conflicto), significa que requiere confirmación
      if (err.status === 409 || err.statusCode === 409) {
        return {
          success: false,
          requiresConfirmation: true,
          user: err.data?.user || null,
          stats: err.data?.stats || {},
          totalRelatedData: err.data?.totalRelatedData || 0,
          message: err.data?.message || 'El usuario tiene datos relacionados'
        }
      }
      
      error.value = 'Error al eliminar usuario'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const fetchAllCrops = async () => {
    try {
      isLoading.value = true
      error.value = null
      
      const response = await CropAPI.getAllWithUsers()
      crops.value = response.data || []
      
      console.log('✅ AdminStore: Cultivos cargados exitosamente')
    } catch (err) {
      console.error('❌ AdminStore: Error cargando cultivos:', err)
      error.value = 'Error al cargar cultivos'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const deleteCrop = async (cropId) => {
    try {
      isLoading.value = true
      error.value = null
      
      await CropAPI.delete(cropId)
      
      // Remover cultivo de la lista local
      const index = crops.value.findIndex(crop => crop.id === cropId)
      if (index !== -1) {
        crops.value.splice(index, 1)
      }
      
      console.log('✅ AdminStore: Cultivo eliminado exitosamente')
      return true
    } catch (err) {
      console.error('❌ AdminStore: Error eliminando cultivo:', err)
      error.value = 'Error al eliminar cultivo'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const fetchAllDevices = async () => {
    try {
      isLoading.value = true
      error.value = null
      
      const response = await DeviceAPI.getAllWithUsers()
      devices.value = response.data || []
      
      console.log('✅ AdminStore: Dispositivos cargados exitosamente')
    } catch (err) {
      console.error('❌ AdminStore: Error cargando dispositivos:', err)
      error.value = 'Error al cargar dispositivos'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const deleteDevice = async (deviceId) => {
    try {
      isLoading.value = true
      const response = await DeviceAPI.delete(deviceId)
      
      if (response.success) {
        devices.value = devices.value.filter(device => device.id !== deviceId)
        return { success: true }
      }
      
      throw new Error(response.message || 'Error al eliminar dispositivo')
    } catch (error) {
      console.error('Error al eliminar dispositivo:', error)
      throw error
    } finally {
      isLoading.value = false
    }
  }

  // Verificar dispositivos activos de un usuario
  const checkActiveDevicesForUser = async (userId) => {
    try {
      const response = await DeviceAPI.checkActiveDevicesForUser(userId)
      return response
    } catch (error) {
      console.error('Error al verificar dispositivos activos:', error)
      throw error
    }
  }

  // Activar dispositivo con validación
  const activateDeviceWithValidation = async (deviceId, force = false) => {
    try {
      isLoading.value = true
      const response = await DeviceAPI.activateDevice(deviceId, force)
      
      if (response.success) {
        // Actualizar el estado del dispositivo en el store
        const deviceIndex = devices.value.findIndex(device => device.id === deviceId)
        if (deviceIndex !== -1) {
          devices.value[deviceIndex].is_active_communication = true
          
          // Si fue una activación forzada, desactivar otros dispositivos del mismo usuario
          if (force && devices.value[deviceIndex].user_id) {
            const userId = devices.value[deviceIndex].user_id
            devices.value.forEach(device => {
              if (device.user_id === userId && device.id !== deviceId) {
                device.is_active_communication = false
              }
            })
          }
        }
        return { success: true, data: response.data, message: response.message }
      }
      
      throw new Error(response.message || 'Error al activar dispositivo')
    } catch (error) {
      console.error('Error al activar dispositivo:', error)
      
      // Si el error es un 409 (conflicto), significa que requiere confirmación
      if (error.status === 409 || error.statusCode === 409) {
        return {
          success: false,
          requiresConfirmation: true,
          activeDevices: error.data?.activeDevices || [],
          targetDevice: error.data?.targetDevice || null,
          message: error.data?.message || 'El usuario ya tiene un dispositivo activo'
        }
      }
      
      throw error
    } finally {
      isLoading.value = false
    }
  }

  // Desactivar dispositivo
  const deactivateDevice = async (deviceId) => {
    try {
      isLoading.value = true
      const response = await DeviceAPI.deactivateDevice(deviceId)
      
      if (response.success) {
        // Actualizar el estado del dispositivo en el store
        const deviceIndex = devices.value.findIndex(device => device.id === deviceId)
        if (deviceIndex !== -1) {
          devices.value[deviceIndex].is_active_communication = false
        }
        return { success: true, data: response.data, message: response.message }
      }
      
      throw new Error(response.message || 'Error al desactivar dispositivo')
    } catch (error) {
      console.error('Error al desactivar dispositivo:', error)
      throw error
    } finally {
      isLoading.value = false
    }
  }

  const updateFilters = (name = '', email = '') => {
    nameFilter.value = name
    emailFilter.value = email
  }

  const updateCropFilters = (name = '', category = '', user = '', email = '', session = '') => {
    cropNameFilter.value = name
    cropCategoryFilter.value = category
    cropUserFilter.value = user
    cropEmailFilter.value = email
    cropSessionFilter.value = session
  }

  const updateDeviceFilters = (name = '', user = '', email = '', endDevice = '') => {
    deviceNameFilter.value = name
    deviceUserFilter.value = user
    deviceEmailFilter.value = email
    deviceEndDeviceFilter.value = endDevice
  }

  const clearFilters = () => {
    nameFilter.value = ''
    emailFilter.value = ''
  }

  const clearCropFilters = () => {
    cropNameFilter.value = ''
    cropCategoryFilter.value = ''
    cropUserFilter.value = ''
    cropEmailFilter.value = ''
    cropSessionFilter.value = ''
  }

  const clearDeviceFilters = () => {
    deviceNameFilter.value = ''
    deviceUserFilter.value = ''
    deviceEmailFilter.value = ''
    deviceEndDeviceFilter.value = ''
  }

  const reset = () => {
    users.value = []
    crops.value = []
    devices.value = []
    isLoading.value = false
    error.value = null
    clearFilters()
    clearCropFilters()
    clearDeviceFilters()
  }

  return {
    // Estado
    users,
    crops,
    devices,
    isLoading,
    error,
    
    // Filtros
    nameFilter,
    emailFilter,
    cropNameFilter,
    cropCategoryFilter,
    cropUserFilter,
    cropEmailFilter,
    cropSessionFilter,
    deviceNameFilter,
    deviceUserFilter,
    deviceEmailFilter,
    deviceEndDeviceFilter,
    
    // Getters
    filteredUsers,
    totalUsers,
    filteredUsersCount,
    filteredCrops,
    totalCrops,
    filteredCropsCount,
    filteredDevices,
    totalDevices,
    filteredDevicesCount,
    
    // Actions
    fetchAllUsers,
    deleteUser,
    fetchAllCrops,
    deleteCrop,
    fetchAllDevices,
    deleteDevice,
    checkActiveDevicesForUser,
    activateDeviceWithValidation,
    deactivateDevice,
    updateFilters,
    updateCropFilters,
    updateDeviceFilters,
    clearFilters,
    clearCropFilters,
    clearDeviceFilters,
    reset
  }
}) 