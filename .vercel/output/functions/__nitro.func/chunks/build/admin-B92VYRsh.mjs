import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { U as UserAPI } from './UserAPI-Cd4tUvk3.mjs';
import { C as CropAPI } from './CropAPI-Cg4msNVy.mjs';
import DeviceAPI from './DeviceAPI-r0WuORwH.mjs';

const useAdminStore = defineStore("admin", () => {
  const users = ref([]);
  const crops = ref([]);
  const devices = ref([]);
  const isLoading = ref(false);
  const error = ref(null);
  const nameFilter = ref("");
  const emailFilter = ref("");
  const cropNameFilter = ref("");
  const cropCategoryFilter = ref("");
  const cropUserFilter = ref("");
  const cropEmailFilter = ref("");
  const cropSessionFilter = ref("");
  const deviceNameFilter = ref("");
  const deviceUserFilter = ref("");
  const deviceEmailFilter = ref("");
  const deviceEndDeviceFilter = ref("");
  const filteredUsers = computed(() => {
    return users.value.filter((user) => {
      const nameMatch = !nameFilter.value || user.name.toLowerCase().includes(nameFilter.value.toLowerCase());
      const emailMatch = !emailFilter.value || user.email.toLowerCase().includes(emailFilter.value.toLowerCase());
      return nameMatch && emailMatch;
    });
  });
  const totalUsers = computed(() => users.value.length);
  const filteredUsersCount = computed(() => filteredUsers.value.length);
  const filteredCrops = computed(() => {
    return crops.value.filter((crop) => {
      const nameMatch = !cropNameFilter.value || crop.name.toLowerCase().includes(cropNameFilter.value.toLowerCase());
      const categoryMatch = !cropCategoryFilter.value || crop.category && crop.category.toLowerCase().includes(cropCategoryFilter.value.toLowerCase());
      const userMatch = !cropUserFilter.value || crop.user && crop.user.name.toLowerCase().includes(cropUserFilter.value.toLowerCase());
      const emailMatch = !cropEmailFilter.value || crop.user && crop.user.email.toLowerCase().includes(cropEmailFilter.value.toLowerCase());
      const sessionMatch = !cropSessionFilter.value || crop.session && crop.session.toLowerCase().includes(cropSessionFilter.value.toLowerCase());
      return nameMatch && categoryMatch && userMatch && emailMatch && sessionMatch;
    });
  });
  const totalCrops = computed(() => crops.value.length);
  const filteredCropsCount = computed(() => filteredCrops.value.length);
  const filteredDevices = computed(() => {
    return devices.value.filter((device) => {
      const nameMatch = !deviceNameFilter.value || device.device_name.toLowerCase().includes(deviceNameFilter.value.toLowerCase());
      const userMatch = !deviceUserFilter.value || device.user && device.user.name.toLowerCase().includes(deviceUserFilter.value.toLowerCase());
      const emailMatch = !deviceEmailFilter.value || device.user && device.user.email.toLowerCase().includes(deviceEmailFilter.value.toLowerCase());
      const endDeviceMatch = !deviceEndDeviceFilter.value || device.enddevice_id.toLowerCase().includes(deviceEndDeviceFilter.value.toLowerCase());
      return nameMatch && userMatch && emailMatch && endDeviceMatch;
    });
  });
  const totalDevices = computed(() => devices.value.length);
  const filteredDevicesCount = computed(() => filteredDevices.value.length);
  const fetchAllUsers = async () => {
    try {
      isLoading.value = true;
      error.value = null;
      const response = await UserAPI.getAllUsers();
      users.value = response.data || [];
      console.log("\u2705 AdminStore: Usuarios cargados exitosamente");
    } catch (err) {
      console.error("\u274C AdminStore: Error cargando usuarios:", err);
      error.value = "Error al cargar usuarios";
      throw err;
    } finally {
      isLoading.value = false;
    }
  };
  const deleteUser = async (userId) => {
    try {
      isLoading.value = true;
      error.value = null;
      await UserAPI.delete(userId, true);
      const index = users.value.findIndex((user) => user.id === userId);
      if (index !== -1) {
        users.value.splice(index, 1);
      }
      console.log("\u2705 AdminStore: Usuario eliminado exitosamente");
      return true;
    } catch (err) {
      console.error("\u274C AdminStore: Error eliminando usuario:", err);
      error.value = "Error al eliminar usuario";
      throw err;
    } finally {
      isLoading.value = false;
    }
  };
  const fetchAllCrops = async () => {
    var _a, _b, _c;
    try {
      isLoading.value = true;
      error.value = null;
      console.log("\u{1F504} AdminStore: Iniciando carga de cultivos...");
      const response = await CropAPI.getAllWithUsers();
      if (response && response.success) {
        crops.value = response.data || [];
        console.log("\u2705 AdminStore: Cultivos cargados exitosamente:", crops.value.length);
      } else {
        crops.value = [];
        console.log("\u26A0\uFE0F AdminStore: Respuesta sin datos de cultivos");
      }
    } catch (err) {
      console.error("\u274C AdminStore: Error cargando cultivos:", err);
      console.error("\u274C Error details:", {
        message: err.message,
        status: err.status,
        statusCode: err.statusCode,
        response: (_a = err.response) == null ? void 0 : _a.data
      });
      crops.value = [];
      error.value = err.message || "Error al cargar cultivos";
      if (!((_b = err.message) == null ? void 0 : _b.includes("404")) && !((_c = err.message) == null ? void 0 : _c.includes("No se encontraron"))) {
        throw err;
      }
    } finally {
      isLoading.value = false;
    }
  };
  const deleteCrop = async (cropId) => {
    try {
      isLoading.value = true;
      error.value = null;
      await CropAPI.delete(cropId);
      const index = crops.value.findIndex((crop) => crop.id === cropId);
      if (index !== -1) {
        crops.value.splice(index, 1);
      }
      console.log("\u2705 AdminStore: Cultivo eliminado exitosamente");
      return true;
    } catch (err) {
      console.error("\u274C AdminStore: Error eliminando cultivo:", err);
      error.value = "Error al eliminar cultivo";
      throw err;
    } finally {
      isLoading.value = false;
    }
  };
  const fetchAllDevices = async () => {
    try {
      isLoading.value = true;
      error.value = null;
      const response = await DeviceAPI.getAllWithUsers();
      devices.value = response.data || [];
      console.log("\u2705 AdminStore: Dispositivos cargados exitosamente");
    } catch (err) {
      console.error("\u274C AdminStore: Error cargando dispositivos:", err);
      error.value = "Error al cargar dispositivos";
      throw err;
    } finally {
      isLoading.value = false;
    }
  };
  const deleteDevice = async (deviceId) => {
    try {
      isLoading.value = true;
      const response = await DeviceAPI.delete(deviceId);
      if (response.success) {
        devices.value = devices.value.filter((device) => device.id !== deviceId);
        return { success: true };
      }
      throw new Error(response.message || "Error al eliminar dispositivo");
    } catch (error2) {
      console.error("Error al eliminar dispositivo:", error2);
      throw error2;
    } finally {
      isLoading.value = false;
    }
  };
  const checkActiveDevicesForUser = async (userId) => {
    try {
      const response = await DeviceAPI.checkActiveDevicesForUser(userId);
      return response;
    } catch (error2) {
      console.error("Error al verificar dispositivos activos:", error2);
      throw error2;
    }
  };
  const activateDeviceWithValidation = async (deviceId, force = false) => {
    var _a, _b, _c;
    try {
      isLoading.value = true;
      const response = await DeviceAPI.activateDevice(deviceId, force);
      if (response.success) {
        const deviceIndex = devices.value.findIndex((device) => device.id === deviceId);
        if (deviceIndex !== -1) {
          devices.value[deviceIndex].is_active_communication = true;
          if (force && devices.value[deviceIndex].user_id) {
            const userId = devices.value[deviceIndex].user_id;
            devices.value.forEach((device) => {
              if (device.user_id === userId && device.id !== deviceId) {
                device.is_active_communication = false;
              }
            });
          }
        }
        return { success: true, data: response.data, message: response.message };
      }
      throw new Error(response.message || "Error al activar dispositivo");
    } catch (error2) {
      console.error("Error al activar dispositivo:", error2);
      if (error2.status === 409 || error2.statusCode === 409) {
        return {
          success: false,
          requiresConfirmation: true,
          activeDevices: ((_a = error2.data) == null ? void 0 : _a.activeDevices) || [],
          targetDevice: ((_b = error2.data) == null ? void 0 : _b.targetDevice) || null,
          message: ((_c = error2.data) == null ? void 0 : _c.message) || "El usuario ya tiene un dispositivo activo"
        };
      }
      throw error2;
    } finally {
      isLoading.value = false;
    }
  };
  const deactivateDevice = async (deviceId) => {
    try {
      isLoading.value = true;
      const response = await DeviceAPI.deactivateDevice(deviceId);
      if (response.success) {
        const deviceIndex = devices.value.findIndex((device) => device.id === deviceId);
        if (deviceIndex !== -1) {
          devices.value[deviceIndex].is_active_communication = false;
        }
        return { success: true, data: response.data, message: response.message };
      }
      throw new Error(response.message || "Error al desactivar dispositivo");
    } catch (error2) {
      console.error("Error al desactivar dispositivo:", error2);
      throw error2;
    } finally {
      isLoading.value = false;
    }
  };
  const updateFilters = (name = "", email = "") => {
    nameFilter.value = name;
    emailFilter.value = email;
  };
  const updateCropFilters = (name = "", category = "", user = "", email = "", session = "") => {
    cropNameFilter.value = name;
    cropCategoryFilter.value = category;
    cropUserFilter.value = user;
    cropEmailFilter.value = email;
    cropSessionFilter.value = session;
  };
  const updateDeviceFilters = (name = "", user = "", email = "", endDevice = "") => {
    deviceNameFilter.value = name;
    deviceUserFilter.value = user;
    deviceEmailFilter.value = email;
    deviceEndDeviceFilter.value = endDevice;
  };
  const clearFilters = () => {
    nameFilter.value = "";
    emailFilter.value = "";
  };
  const clearCropFilters = () => {
    cropNameFilter.value = "";
    cropCategoryFilter.value = "";
    cropUserFilter.value = "";
    cropEmailFilter.value = "";
    cropSessionFilter.value = "";
  };
  const clearDeviceFilters = () => {
    deviceNameFilter.value = "";
    deviceUserFilter.value = "";
    deviceEmailFilter.value = "";
    deviceEndDeviceFilter.value = "";
  };
  const reset = () => {
    users.value = [];
    crops.value = [];
    devices.value = [];
    isLoading.value = false;
    error.value = null;
    clearFilters();
    clearCropFilters();
    clearDeviceFilters();
  };
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
  };
});

export { useAdminStore as u };
//# sourceMappingURL=admin-B92VYRsh.mjs.map
