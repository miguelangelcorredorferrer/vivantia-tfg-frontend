import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import CropAPI from '../api/CropAPI'
import { useUserStore } from './user'

export const useCropStore = defineStore('crop', () => {
  // Estado
  const crops = ref([])
  const currentCrop = ref(null) // Cultivo actual del usuario (solo uno)
  const categories = ref([])
  const isLoading = ref(false)
  const isInitialized = ref(false)

  // Estado para filtros
  const filters = ref({
    search: '',
    category: '',
    session: '',
    selectedOnly: false
  })

  // Getters (computed)
  const filteredCrops = computed(() => {
    let filtered = [...crops.value]

    // Filtro por búsqueda (nombre)
    if (filters.value.search) {
      const searchTerm = filters.value.search.toLowerCase()
      filtered = filtered.filter(crop => 
        crop.name.toLowerCase().includes(searchTerm) ||
        crop.description?.toLowerCase().includes(searchTerm)
      )
    }

    // Filtro por categoría
    if (filters.value.category) {
      filtered = filtered.filter(crop => crop.category === filters.value.category)
    }

    // Filtro por temporada
    if (filters.value.session) {
      filtered = filtered.filter(crop => crop.session === filters.value.session)
    }

    // Filtro por seleccionados
    if (filters.value.selectedOnly) {
      filtered = filtered.filter(crop => crop.selected)
    }

    return filtered
  })

  const hasCrops = computed(() => crops.value.length > 0)
  const hasCurrentCrop = computed(() => !!currentCrop.value)
  const cropsCount = computed(() => crops.value.length)
  const currentCropName = computed(() => currentCrop.value?.name || '')
  const isCurrentCropSelected = computed(() => currentCrop.value?.selected || false)

  // El cultivo del usuario es el currentCrop
  const userCrop = computed(() => currentCrop.value)

  // Actions
  const fetchAllCrops = async () => {
    try {
      isLoading.value = true
      console.log('🔄 CropStore: Obteniendo todos los cultivos...')
      
      const response = await CropAPI.getAll()
      crops.value = response.data || []
      
      console.log('✅ CropStore: Cultivos obtenidos:', crops.value.length)
      return { success: true, data: crops.value }
    } catch (error) {
      console.error('❌ CropStore: Error obteniendo cultivos:', error)
      throw error
    } finally {
      isLoading.value = false
    }
  }

  const fetchCropCategories = async () => {
    try {
      console.log('🔄 CropStore: Obteniendo categorías...')
      
      const response = await CropAPI.getCategories()
      categories.value = response.data || []
      
      console.log('✅ CropStore: Categorías obtenidas:', categories.value.length)
      return { success: true, data: categories.value }
    } catch (error) {
      console.error('❌ CropStore: Error obteniendo categorías:', error)
      throw error
    }
  }

  const fetchCropById = async (id) => {
    try {
      isLoading.value = true
      console.log('🔄 CropStore: Obteniendo cultivo por ID:', id)
      
      const response = await CropAPI.getById(id)
      const crop = response.data
      
      // Actualizar en el array local si existe
      const index = crops.value.findIndex(c => c.id === id)
      if (index !== -1) {
        crops.value[index] = crop
      } else {
        crops.value.push(crop)
      }
      
      console.log('✅ CropStore: Cultivo obtenido:', crop.name)
      return { success: true, data: crop }
    } catch (error) {
      console.error('❌ CropStore: Error obteniendo cultivo:', error)
      throw error
    } finally {
      isLoading.value = false
    }
  }

  const fetchUserCrop = async (userId) => {
    try {
      console.log('🔄 CropStore: Obteniendo cultivo del usuario:', userId)
      
      const response = await CropAPI.getCropByUserId(userId)
      const crop = response.data
      
      // Establecer como cultivo actual del usuario
      currentCrop.value = crop
      
      // Actualizar en el array
      const index = crops.value.findIndex(c => c.user_id === userId)
      if (index !== -1) {
        crops.value[index] = crop
      } else {
        crops.value.push(crop)
      }
      
      console.log('✅ CropStore: Cultivo del usuario obtenido:', crop.name)
      return { success: true, data: crop }
    } catch (error) {
      console.error('❌ CropStore: Error obteniendo cultivo del usuario:', error)
      currentCrop.value = null
      throw error
    }
  }

  const fetchSelectedCrop = async (userId) => {
    try {
      console.log('🔄 CropStore: Obteniendo cultivo seleccionado del usuario:', userId)
      
      const response = await CropAPI.getSelectedCropByUserId(userId)
      currentCrop.value = response.data
      
      console.log('✅ CropStore: Cultivo seleccionado obtenido:', currentCrop.value.name)
      return { success: true, data: currentCrop.value }
    } catch (error) {
      console.error('❌ CropStore: Error obteniendo cultivo seleccionado:', error)
      currentCrop.value = null
      throw error
    }
  }

  const createCrop = async (cropData) => {
    try {
      isLoading.value = true
      console.log('🔄 CropStore: Creando cultivo:', cropData.name)
      
      const response = await CropAPI.create(cropData)
      const newCrop = response.data
      
      crops.value.push(newCrop)
      
      // El nuevo cultivo se convierte en el cultivo actual del usuario
      currentCrop.value = newCrop
      
      console.log('✅ CropStore: Cultivo creado:', newCrop.name)
      return { success: true, data: newCrop }
    } catch (error) {
      console.error('❌ CropStore: Error creando cultivo:', error)
      throw error
    } finally {
      isLoading.value = false
    }
  }

  const updateCrop = async (id, updateData) => {
    try {
      isLoading.value = true
      console.log('🔄 CropStore: Actualizando cultivo:', id)
      
      const response = await CropAPI.update(id, updateData)
      const updatedCrop = response.data
      
      // Actualizar en el array
      const index = crops.value.findIndex(c => c.id === id)
      if (index !== -1) {
        crops.value[index] = updatedCrop
      }
      
      // Actualizar currentCrop si es el mismo
      if (currentCrop.value?.id === id) {
        currentCrop.value = updatedCrop
      }
      
      console.log('✅ CropStore: Cultivo actualizado:', updatedCrop.name)
      return { success: true, data: updatedCrop }
    } catch (error) {
      console.error('❌ CropStore: Error actualizando cultivo:', error)
      throw error
    } finally {
      isLoading.value = false
    }
  }

  const selectCrop = async (id) => {
    try {
      isLoading.value = true
      console.log('🔄 CropStore: Seleccionando cultivo:', id)
      
      const response = await CropAPI.selectCrop(id)
      const selectedCropData = response.data
      
      // Deseleccionar todos los otros cultivos del mismo usuario
      crops.value.forEach(crop => {
        if (crop.user_id === selectedCropData.user_id) {
          crop.selected = crop.id === id
        }
      })
      
      currentCrop.value = selectedCropData
      
      console.log('✅ CropStore: Cultivo seleccionado:', selectedCropData.name)
      return { success: true, data: selectedCropData }
    } catch (error) {
      console.error('❌ CropStore: Error seleccionando cultivo:', error)
      throw error
    } finally {
      isLoading.value = false
    }
  }

  const deselectCrop = async (id) => {
    try {
      isLoading.value = true
      console.log('🔄 CropStore: Deseleccionando cultivo:', id)
      
      const response = await CropAPI.deselectCrop(id)
      const deselectedCrop = response.data
      
      // Actualizar en el array
      const index = crops.value.findIndex(c => c.id === id)
      if (index !== -1) {
        crops.value[index] = deselectedCrop
      }
      
      // Limpiar currentCrop si era el seleccionado
      if (currentCrop.value?.id === id) {
        currentCrop.value = { ...currentCrop.value, selected: false }
      }
      
      console.log('✅ CropStore: Cultivo deseleccionado:', deselectedCrop.name)
      return { success: true, data: deselectedCrop }
    } catch (error) {
      console.error('❌ CropStore: Error deseleccionando cultivo:', error)
      throw error
    } finally {
      isLoading.value = false
    }
  }

  const deleteCrop = async (id) => {
    try {
      isLoading.value = true
      console.log('🔄 CropStore: Eliminando cultivo:', id)
      
      const cropToDelete = crops.value.find(c => c.id === id)
      await CropAPI.delete(id)
      
      // Remover del array
      const index = crops.value.findIndex(c => c.id === id)
      if (index !== -1) {
        crops.value.splice(index, 1)
      }
      
      // Limpiar currentCrop si era el eliminado
      if (currentCrop.value?.id === id) {
        currentCrop.value = null
      }
      
      console.log('✅ CropStore: Cultivo eliminado:', cropToDelete?.name)
      return { success: true }
    } catch (error) {
      console.error('❌ CropStore: Error eliminando cultivo:', error)
      throw error
    } finally {
      isLoading.value = false
    }
  }

  // Métodos de filtros
  const setSearchFilter = (search) => {
    filters.value.search = search
  }

  const setCategoryFilter = (category) => {
    filters.value.category = category
  }

  const setSessionFilter = (session) => {
    filters.value.session = session
  }

  const setSelectedOnlyFilter = (selectedOnly) => {
    filters.value.selectedOnly = selectedOnly
  }

  const clearFilters = () => {
    filters.value = {
      search: '',
      category: '',
      session: '',
      selectedOnly: false
    }
  }

  // Método de inicialización
  const init = async () => {
    try {
      console.log('🔄 CropStore: Inicializando...')
      
      await Promise.all([
        fetchAllCrops(),
        fetchCropCategories()
      ])
      
      isInitialized.value = true
      console.log('✅ CropStore: Inicializado correctamente')
    } catch (error) {
      console.error('❌ CropStore: Error inicializando:', error)
      isInitialized.value = true // Marcar como inicializado para evitar bucles
    }
  }

  // Reset del store
  const reset = () => {
    crops.value = []
    currentCrop.value = null
    categories.value = []
    isLoading.value = false
    isInitialized.value = false
    clearFilters()
  }

  return {
    // Estado
    crops,
    currentCrop,
    categories,
    isLoading,
    isInitialized,
    filters,

    // Getters
    filteredCrops,
    hasCrops,
    hasCurrentCrop,
    cropsCount,
    currentCropName,
    isCurrentCropSelected,
    userCrop,

    // Actions
    fetchAllCrops,
    fetchCropCategories,
    fetchCropById,
    fetchUserCrop,
    fetchSelectedCrop,
    createCrop,
    updateCrop,
    selectCrop,
    deselectCrop,
    deleteCrop,

    // Filtros
    setSearchFilter,
    setCategoryFilter,
    setSessionFilter,
    setSelectedOnlyFilter,
    clearFilters,

    // Utilidades
    init,
    reset
  }
}) 