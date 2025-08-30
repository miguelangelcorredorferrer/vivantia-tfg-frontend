import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { C as CropAPI } from './CropAPI-Cg4msNVy.mjs';

const useCropStore = defineStore("crop", () => {
  const crops = ref([]);
  const currentCrop = ref(null);
  const categories = ref([]);
  const isLoading = ref(false);
  const isInitialized = ref(false);
  const filters = ref({
    search: "",
    category: "",
    session: "",
    selectedOnly: false
  });
  const filteredCrops = computed(() => {
    let filtered = crops.value || [];
    if (filters.value.search) {
      const searchTerm = filters.value.search.toLowerCase();
      filtered = filtered.filter(
        (crop) => {
          var _a;
          return crop.name.toLowerCase().includes(searchTerm) || ((_a = crop.description) == null ? void 0 : _a.toLowerCase().includes(searchTerm));
        }
      );
    }
    if (filters.value.category) {
      filtered = filtered.filter((crop) => crop.category === filters.value.category);
    }
    if (filters.value.session) {
      filtered = filtered.filter((crop) => crop.session === filters.value.session);
    }
    if (filters.value.selectedOnly) {
      filtered = filtered.filter((crop) => crop.selected);
    }
    return filtered;
  });
  const hasCrops = computed(() => crops.value.length > 0);
  const hasCurrentCrop = computed(() => !!currentCrop.value);
  const cropsCount = computed(() => crops.value.length);
  const currentCropName = computed(() => {
    var _a;
    return ((_a = currentCrop.value) == null ? void 0 : _a.name) || "";
  });
  const isCurrentCropSelected = computed(() => {
    var _a;
    return ((_a = currentCrop.value) == null ? void 0 : _a.selected) || false;
  });
  const userCrop = computed(() => currentCrop.value);
  const fetchAllCrops = async () => {
    try {
      isLoading.value = true;
      console.log("\u{1F504} CropStore: Obteniendo todos los cultivos (solo para admin)...");
      const response = await CropAPI.getAll();
      crops.value = response.data || [];
      console.log("\u2705 CropStore: Todos los cultivos obtenidos:", crops.value.length);
      return { success: true, data: crops.value };
    } catch (error) {
      console.error("\u274C CropStore: Error obteniendo todos los cultivos:", error);
      throw error;
    } finally {
      isLoading.value = false;
    }
  };
  const fetchCropCategories = async () => {
    try {
      console.log("\u{1F504} CropStore: Obteniendo categor\xEDas...");
      const response = await CropAPI.getCategories();
      categories.value = response.data || [];
      console.log("\u2705 CropStore: Categor\xEDas obtenidas:", categories.value.length);
      return { success: true, data: categories.value };
    } catch (error) {
      console.error("\u274C CropStore: Error obteniendo categor\xEDas:", error);
      throw error;
    }
  };
  const fetchCropById = async (id) => {
    try {
      isLoading.value = true;
      console.log("\u{1F504} CropStore: Obteniendo cultivo por ID:", id);
      const response = await CropAPI.getById(id);
      const crop = response.data;
      const index = crops.value.findIndex((c) => c.id === id);
      if (index !== -1) {
        crops.value[index] = crop;
      } else {
        crops.value.push(crop);
      }
      console.log("\u2705 CropStore: Cultivo obtenido:", crop.name);
      return { success: true, data: crop };
    } catch (error) {
      console.error("\u274C CropStore: Error obteniendo cultivo:", error);
      throw error;
    } finally {
      isLoading.value = false;
    }
  };
  const fetchUserCrop = async (userId) => {
    var _a;
    try {
      console.log("\u{1F504} CropStore: Obteniendo cultivo del usuario:", userId);
      const response = await CropAPI.getCropByUserId(userId);
      const crop = response.data;
      currentCrop.value = crop;
      console.log("\u2705 CropStore: Cultivo del usuario obtenido:", crop.name);
      return { success: true, data: crop };
    } catch (error) {
      console.error("\u274C CropStore: Error obteniendo cultivo del usuario:", error);
      currentCrop.value = null;
      if (((_a = error.response) == null ? void 0 : _a.status) === 404) {
        console.log("\u2705 CropStore: Usuario sin cultivo registrado (normal)");
        return { success: true, data: null };
      }
      throw error;
    }
  };
  const fetchAllUserCrops = async (userId) => {
    var _a;
    try {
      console.log("\u{1F504} CropStore: Obteniendo todos los cultivos del usuario:", userId);
      const response = await CropAPI.getAllCropsByUserId(userId);
      const userCrops = response.data || [];
      crops.value = userCrops;
      const selectedCrop = userCrops.find((crop) => crop.selected);
      currentCrop.value = selectedCrop || (userCrops.length > 0 ? userCrops[0] : null);
      console.log("\u2705 CropStore: Todos los cultivos del usuario obtenidos:", userCrops.length);
      return { success: true, data: userCrops };
    } catch (error) {
      console.error("\u274C CropStore: Error obteniendo todos los cultivos del usuario:", error);
      crops.value = [];
      currentCrop.value = null;
      if (((_a = error.response) == null ? void 0 : _a.status) === 404) {
        console.log("\u2705 CropStore: Usuario sin cultivos registrados (normal)");
        return { success: true, data: [] };
      }
      throw error;
    }
  };
  const fetchSelectedCrop = async (userId) => {
    try {
      console.log("\u{1F504} CropStore: Obteniendo cultivo seleccionado del usuario:", userId);
      const response = await CropAPI.getSelectedCropByUserId(userId);
      currentCrop.value = response.data;
      console.log("\u2705 CropStore: Cultivo seleccionado obtenido:", currentCrop.value.name);
      return { success: true, data: currentCrop.value };
    } catch (error) {
      console.error("\u274C CropStore: Error obteniendo cultivo seleccionado:", error);
      currentCrop.value = null;
      throw error;
    }
  };
  const createCrop = async (cropData) => {
    try {
      isLoading.value = true;
      console.log("\u{1F504} CropStore: Creando cultivo:", cropData.name);
      const response = await CropAPI.create(cropData);
      const newCrop = response.data;
      crops.value.push(newCrop);
      if (!currentCrop.value || newCrop.selected) {
        currentCrop.value = newCrop;
      }
      console.log("\u2705 CropStore: Cultivo creado:", newCrop.name);
      return { success: true, data: newCrop };
    } catch (error) {
      console.error("\u274C CropStore: Error creando cultivo:", error);
      throw error;
    } finally {
      isLoading.value = false;
    }
  };
  const updateCrop = async (id, updateData) => {
    var _a;
    try {
      isLoading.value = true;
      console.log("\u{1F504} CropStore: Actualizando cultivo:", id);
      const response = await CropAPI.update(id, updateData);
      const updatedCrop = response.data;
      const index = crops.value.findIndex((c) => c.id === id);
      if (index !== -1) {
        crops.value[index] = updatedCrop;
      }
      if (((_a = currentCrop.value) == null ? void 0 : _a.id) === id) {
        currentCrop.value = updatedCrop;
      }
      console.log("\u2705 CropStore: Cultivo actualizado:", updatedCrop.name);
      return { success: true, data: updatedCrop };
    } catch (error) {
      console.error("\u274C CropStore: Error actualizando cultivo:", error);
      throw error;
    } finally {
      isLoading.value = false;
    }
  };
  const selectCrop = async (id) => {
    try {
      isLoading.value = true;
      console.log("\u{1F504} CropStore: Seleccionando cultivo:", id);
      const response = await CropAPI.selectCrop(id);
      const selectedCropData = response.data;
      crops.value.forEach((crop) => {
        if (crop.user_id === selectedCropData.user_id) {
          crop.selected = crop.id === id;
        }
      });
      currentCrop.value = selectedCropData;
      crops.value = [...crops.value];
      console.log("\u2705 CropStore: Cultivo seleccionado:", selectedCropData.name);
      return { success: true, data: selectedCropData };
    } catch (error) {
      console.error("\u274C CropStore: Error seleccionando cultivo:", error);
      throw error;
    } finally {
      isLoading.value = false;
    }
  };
  const deselectCrop = async (id) => {
    var _a;
    try {
      isLoading.value = true;
      console.log("\u{1F504} CropStore: Deseleccionando cultivo:", id);
      const response = await CropAPI.deselectCrop(id);
      const deselectedCrop = response.data;
      const index = crops.value.findIndex((c) => c.id === id);
      if (index !== -1) {
        crops.value[index] = deselectedCrop;
      }
      if (((_a = currentCrop.value) == null ? void 0 : _a.id) === id) {
        currentCrop.value = { ...currentCrop.value, selected: false };
      }
      crops.value = [...crops.value];
      console.log("\u2705 CropStore: Cultivo deseleccionado:", deselectedCrop.name);
      return { success: true, data: deselectedCrop };
    } catch (error) {
      console.error("\u274C CropStore: Error deseleccionando cultivo:", error);
      throw error;
    } finally {
      isLoading.value = false;
    }
  };
  const deleteCrop = async (id) => {
    var _a;
    try {
      isLoading.value = true;
      console.log("\u{1F504} CropStore: Eliminando cultivo:", id);
      const cropToDelete = crops.value.find((c) => c.id === id);
      await CropAPI.delete(id);
      const index = crops.value.findIndex((c) => c.id === id);
      if (index !== -1) {
        crops.value.splice(index, 1);
      }
      if (((_a = currentCrop.value) == null ? void 0 : _a.id) === id) {
        currentCrop.value = null;
      }
      console.log("\u2705 CropStore: Cultivo eliminado:", cropToDelete == null ? void 0 : cropToDelete.name);
      return { success: true };
    } catch (error) {
      console.error("\u274C CropStore: Error eliminando cultivo:", error);
      throw error;
    } finally {
      isLoading.value = false;
    }
  };
  const setSearchFilter = (search) => {
    filters.value.search = search;
  };
  const setCategoryFilter = (category) => {
    filters.value.category = category;
  };
  const setSessionFilter = (session) => {
    filters.value.session = session;
  };
  const setSelectedOnlyFilter = (selectedOnly) => {
    filters.value.selectedOnly = selectedOnly;
  };
  const clearFilters = () => {
    filters.value = {
      search: "",
      category: "",
      session: "",
      selectedOnly: false
    };
  };
  const init = async () => {
    try {
      console.log("\u{1F504} CropStore: Inicializando...");
      await fetchCropCategories();
      isInitialized.value = true;
      console.log("\u2705 CropStore: Inicializado correctamente");
    } catch (error) {
      console.error("\u274C CropStore: Error inicializando:", error);
      isInitialized.value = true;
    }
  };
  const reset = () => {
    crops.value = [];
    currentCrop.value = null;
    categories.value = [];
    isLoading.value = false;
    isInitialized.value = false;
    clearFilters();
  };
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
    fetchAllUserCrops,
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
  };
});

export { useCropStore as u };
//# sourceMappingURL=crop-CoogIRpZ.mjs.map
