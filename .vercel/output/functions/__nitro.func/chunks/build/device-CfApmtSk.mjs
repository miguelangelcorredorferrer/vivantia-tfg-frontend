import { defineStore } from 'pinia';
import DeviceAPI from './DeviceAPI-r0WuORwH.mjs';
import { ref, computed } from 'vue';

const useDeviceStore = defineStore("device", () => {
  const devices = ref([]);
  const device = ref(null);
  const isLoading = ref(false);
  const error = ref(null);
  const mapDeviceFromBackend = (backendDevice) => {
    if (!backendDevice) return null;
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
    };
  };
  const mappedDevices = computed(() => {
    return devices.value.map((device2) => mapDeviceFromBackend(device2));
  });
  const hasDevice = computed(() => devices.value.length > 0);
  const isDeviceActive = computed(() => {
    var _a;
    return ((_a = device.value) == null ? void 0 : _a.is_active_communication) || false;
  });
  const deviceName = computed(() => {
    var _a;
    return ((_a = device.value) == null ? void 0 : _a.device_name) || "";
  });
  const enddeviceId = computed(() => {
    var _a;
    return ((_a = device.value) == null ? void 0 : _a.enddevice_id) || "";
  });
  const deviceCount = computed(() => devices.value.length);
  const activeDevices = computed(() => mappedDevices.value.filter((device2) => device2.isActive));
  const activeDeviceCount = computed(() => activeDevices.value.length);
  const deviceNames = computed(() => {
    return mappedDevices.value.map((device2) => device2.deviceName).filter(Boolean);
  });
  const enddeviceIds = computed(() => {
    return mappedDevices.value.map((device2) => device2.enddeviceId).filter(Boolean);
  });
  const fetchUserDevice = async (userId) => {
    var _a;
    try {
      isLoading.value = true;
      error.value = null;
      const response = await DeviceAPI.getDevicesByUserId(userId);
      devices.value = response.data || [];
      device.value = devices.value.length > 0 ? devices.value[0] : null;
      console.log("\u{1F4F1} Dispositivos del usuario cargados:", devices.value.length);
      console.log("\u{1F4CA} Dispositivo actual:", ((_a = device.value) == null ? void 0 : _a.device_name) || "ninguno");
      return response;
    } catch (err) {
      error.value = err.message || "Error al cargar dispositivos del usuario";
      console.error("\u274C Error cargando dispositivos del usuario:", err);
      throw err;
    } finally {
      isLoading.value = false;
    }
  };
  const createDevice = async (deviceData) => {
    var _a;
    try {
      isLoading.value = true;
      error.value = null;
      const response = await DeviceAPI.create(deviceData);
      if (response.data) {
        devices.value.push(response.data);
        if (devices.value.length === 1) {
          device.value = response.data;
        }
      }
      console.log("\u2705 Dispositivo creado:", (_a = response.data) == null ? void 0 : _a.device_name);
      return response;
    } catch (err) {
      error.value = err.message || "Error al crear dispositivo";
      console.error("\u274C Error creando dispositivo:", err);
      throw err;
    } finally {
      isLoading.value = false;
    }
  };
  const updateDevice = async (deviceId, updateData) => {
    var _a, _b;
    try {
      isLoading.value = true;
      error.value = null;
      const deviceIndex = devices.value.findIndex((d) => d.id === deviceId);
      if (deviceIndex === -1) {
        throw new Error("No tienes permisos para actualizar este dispositivo");
      }
      const response = await DeviceAPI.update(deviceId, updateData);
      if (response.data) {
        devices.value[deviceIndex] = response.data;
        if (((_a = device.value) == null ? void 0 : _a.id) === deviceId) {
          device.value = response.data;
        }
      }
      console.log("\u2705 Dispositivo actualizado:", (_b = response.data) == null ? void 0 : _b.device_name);
      return response;
    } catch (err) {
      error.value = err.message || "Error al actualizar dispositivo";
      console.error("\u274C Error actualizando dispositivo:", err);
      throw err;
    } finally {
      isLoading.value = false;
    }
  };
  const deleteDevice = async (deviceId) => {
    var _a;
    try {
      isLoading.value = true;
      error.value = null;
      const deviceIndex = devices.value.findIndex((d) => d.id === deviceId);
      if (deviceIndex === -1) {
        throw new Error("No tienes permisos para eliminar este dispositivo");
      }
      await DeviceAPI.delete(deviceId);
      devices.value.splice(deviceIndex, 1);
      if (((_a = device.value) == null ? void 0 : _a.id) === deviceId) {
        device.value = devices.value.length > 0 ? devices.value[0] : null;
      }
      console.log("\u2705 Dispositivo eliminado");
      return true;
    } catch (err) {
      error.value = err.message || "Error al eliminar dispositivo";
      console.error("\u274C Error eliminando dispositivo:", err);
      throw err;
    } finally {
      isLoading.value = false;
    }
  };
  const toggleDeviceActive = async (deviceId, isActive) => {
    var _a, _b;
    try {
      isLoading.value = true;
      error.value = null;
      const deviceIndex = devices.value.findIndex((d) => d.id === deviceId);
      if (deviceIndex === -1) {
        throw new Error("No tienes permisos para cambiar el estado de este dispositivo");
      }
      let response;
      if (isActive) {
        try {
          response = await DeviceAPI.activateDevice(deviceId, false);
        } catch (error2) {
          if (error2.status === 409) {
            response = await DeviceAPI.activateDevice(deviceId, true);
          } else {
            throw error2;
          }
        }
      } else {
        response = await DeviceAPI.deactivateDevice(deviceId);
      }
      if (response.data) {
        if (isActive) {
          devices.value.forEach((device2, index) => {
            if (device2.id === deviceId) {
              devices.value[index].is_active_communication = true;
            } else {
              devices.value[index].is_active_communication = false;
            }
          });
          if (((_a = device.value) == null ? void 0 : _a.id) === deviceId) {
            device.value.is_active_communication = true;
          }
        } else {
          devices.value[deviceIndex].is_active_communication = false;
          if (((_b = device.value) == null ? void 0 : _b.id) === deviceId) {
            device.value.is_active_communication = false;
          }
        }
        devices.value = [...devices.value];
      }
      console.log(`\u2705 Dispositivo ${isActive ? "activado" : "desactivado"}`);
      return response;
    } catch (err) {
      error.value = err.message || "Error al cambiar estado del dispositivo";
      console.error("\u274C Error cambiando estado del dispositivo:", err);
      throw err;
    } finally {
      isLoading.value = false;
    }
  };
  const getDeviceById = async (deviceId) => {
    var _a;
    try {
      const response = await DeviceAPI.getById(deviceId);
      if (response.data && ((_a = device.value) == null ? void 0 : _a.id) === deviceId) {
        device.value = response.data;
      }
      return response;
    } catch (err) {
      error.value = err.message || "Error al obtener dispositivo";
      console.error("\u274C Error obteniendo dispositivo:", err);
      throw err;
    }
  };
  const getDeviceByEndDeviceId = async (endDeviceId) => {
    try {
      const response = await DeviceAPI.getDeviceByEndDeviceId(endDeviceId);
      return response;
    } catch (err) {
      error.value = err.message || "Error al obtener dispositivo por EndDeviceId";
      console.error("\u274C Error obteniendo dispositivo por EndDeviceId:", err);
      throw err;
    }
  };
  const filterDevicesSuggestions = (searchTerm, field) => {
    if (!searchTerm || mappedDevices.value.length === 0) return [];
    return mappedDevices.value.map((device2) => field === "deviceName" ? device2.deviceName : device2.enddeviceId).filter((value) => value && value.toLowerCase().includes(searchTerm.toLowerCase()));
  };
  const filterDevices = (filters) => {
    if (mappedDevices.value.length === 0) return [];
    if (!filters.deviceName && !filters.enddeviceId) {
      return mappedDevices.value;
    }
    return mappedDevices.value.filter((device2) => {
      var _a, _b;
      let matches = true;
      if (filters.deviceName) {
        matches = matches && ((_a = device2.deviceName) == null ? void 0 : _a.toLowerCase().includes(filters.deviceName.toLowerCase()));
      }
      if (filters.enddeviceId) {
        matches = matches && ((_b = device2.enddeviceId) == null ? void 0 : _b.toLowerCase().includes(filters.enddeviceId.toLowerCase()));
      }
      return matches;
    });
  };
  const clearError = () => {
    error.value = null;
  };
  const reset = () => {
    devices.value = [];
    device.value = null;
    error.value = null;
    isLoading.value = false;
  };
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
  };
});

export { useDeviceStore as u };
//# sourceMappingURL=device-CfApmtSk.mjs.map
