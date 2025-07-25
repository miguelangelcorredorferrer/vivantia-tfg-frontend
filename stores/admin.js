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

  const deleteUser = async (userId) => {
    try {
      isLoading.value = true
      error.value = null
      
      await UserAPI.delete(userId)
      
      // Remover usuario de la lista local
      const index = users.value.findIndex(user => user.id === userId)
      if (index !== -1) {
        users.value.splice(index, 1)
      }
      
      console.log('✅ AdminStore: Usuario eliminado exitosamente')
      return true
    } catch (err) {
      console.error('❌ AdminStore: Error eliminando usuario:', err)
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
      error.value = null
      
      await DeviceAPI.delete(deviceId)
      
      // Remover dispositivo de la lista local
      const index = devices.value.findIndex(device => device.id === deviceId)
      if (index !== -1) {
        devices.value.splice(index, 1)
      }
      
      console.log('✅ AdminStore: Dispositivo eliminado exitosamente')
      return true
    } catch (err) {
      console.error('❌ AdminStore: Error eliminando dispositivo:', err)
      error.value = 'Error al eliminar dispositivo'
      throw err
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
    updateFilters,
    updateCropFilters,
    updateDeviceFilters,
    clearFilters,
    clearCropFilters,
    clearDeviceFilters,
    reset
  }
}) 