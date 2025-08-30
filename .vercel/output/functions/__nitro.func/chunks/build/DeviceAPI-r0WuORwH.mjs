import { b as useRuntimeConfig } from './server.mjs';
import 'vue';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import '@iconify/utils';
import 'node:crypto';
import 'consola';
import 'node:url';
import 'ipx';
import 'node:fs';
import 'node:path';
import 'pinia';
import 'vue-router';
import '@iconify/vue';
import 'vue/server-renderer';

const getApiUrl = () => {
  const config = useRuntimeConfig();
  return config.public.apiUrl || "http://localhost:3001/api";
};
const getAuthHeaders = () => {
  return {};
};
const DeviceAPI = {
  // Rutas básicas CRUD
  create(data) {
    return $fetch("/devices", {
      method: "POST",
      body: data,
      baseURL: getApiUrl(),
      headers: getAuthHeaders()
    });
  },
  getAll() {
    return $fetch("/devices", {
      method: "GET",
      baseURL: getApiUrl(),
      headers: getAuthHeaders()
    });
  },
  getAllWithUsers() {
    return $fetch("/devices/with-users", {
      method: "GET",
      baseURL: getApiUrl(),
      headers: getAuthHeaders()
    });
  },
  getById(id) {
    return $fetch(`/devices/${id}`, {
      method: "GET",
      baseURL: getApiUrl(),
      headers: getAuthHeaders()
    });
  },
  update(id, data) {
    return $fetch(`/devices/${id}`, {
      method: "PUT",
      body: data,
      baseURL: getApiUrl(),
      headers: getAuthHeaders()
    });
  },
  delete(id) {
    return $fetch(`/devices/${id}`, {
      method: "DELETE",
      baseURL: getApiUrl(),
      headers: getAuthHeaders()
    });
  },
  // Rutas por usuario
  getDevicesByUserId(userId) {
    return $fetch(`/devices/user/${userId}`, {
      method: "GET",
      baseURL: getApiUrl(),
      headers: getAuthHeaders()
    });
  },
  // Verificar dispositivos activos de un usuario
  checkActiveDevicesForUser(userId) {
    return $fetch(`/devices/user/${userId}/active`, {
      method: "GET",
      baseURL: getApiUrl(),
      headers: getAuthHeaders()
    });
  },
  // Rutas por filtros
  getActiveDevices() {
    return $fetch("/devices/active/all", {
      method: "GET",
      baseURL: getApiUrl(),
      headers: getAuthHeaders()
    });
  },
  getDeviceByEndDeviceId(endDeviceId) {
    return $fetch(`/devices/enddevice/${endDeviceId}`, {
      method: "GET",
      baseURL: getApiUrl(),
      headers: getAuthHeaders()
    });
  },
  // Rutas de acciones
  activateDevice(id, force = false) {
    return $fetch(`/devices/${id}/activate`, {
      method: "PUT",
      body: { force },
      baseURL: getApiUrl(),
      headers: getAuthHeaders()
    });
  },
  deactivateDevice(id) {
    return $fetch(`/devices/${id}/deactivate`, {
      method: "PUT",
      baseURL: getApiUrl(),
      headers: getAuthHeaders()
    });
  },
  // Rutas relacionadas con sensores
  getDeviceSensorReadings(id) {
    return $fetch(`/devices/${id}/sensor-readings`, {
      method: "GET",
      baseURL: getApiUrl(),
      headers: getAuthHeaders()
    });
  },
  getDeviceLatestReading(id) {
    return $fetch(`/devices/${id}/latest-reading`, {
      method: "GET",
      baseURL: getApiUrl(),
      headers: getAuthHeaders()
    });
  },
  // Crear alerta de API key copiada
  createApiKeyCopiedAlert() {
    return $fetch("/devices/api-key-copied", {
      method: "POST",
      baseURL: getApiUrl(),
      headers: getAuthHeaders()
    });
  }
};

export { DeviceAPI as default };
//# sourceMappingURL=DeviceAPI-r0WuORwH.mjs.map
