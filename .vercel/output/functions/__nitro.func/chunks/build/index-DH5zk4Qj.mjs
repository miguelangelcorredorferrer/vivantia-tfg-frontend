import { ref, mergeProps, unref, watch, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderAttr, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
import { u as useAdminStore } from './admin-B92VYRsh.mjs';
import { u as useToastNotifications } from './useToastNotifications-DaJGJiXK.mjs';
import { _ as _sfc_main$4 } from './DeleteConfirmModal-w-LSssTG.mjs';
import { C as CustomSwitch } from './CustomSwitch-BAGBfqig.mjs';
import { n as navigateTo } from './server.mjs';
import 'pinia';
import './UserAPI-Cd4tUvk3.mjs';
import './CropAPI-Cg4msNVy.mjs';
import './DeviceAPI-r0WuORwH.mjs';
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
import 'vue-router';
import '@iconify/vue';

const _sfc_main$3 = {
  __name: "DevicesFilter",
  __ssrInlineRender: true,
  props: {
    nameFilter: {
      type: String,
      default: ""
    },
    userFilter: {
      type: String,
      default: ""
    },
    emailFilter: {
      type: String,
      default: ""
    },
    endDeviceFilter: {
      type: String,
      default: ""
    }
  },
  emits: ["filter-change", "clear-filters"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const localNameFilter = ref(props.nameFilter);
    const localUserFilter = ref(props.userFilter);
    const localEmailFilter = ref(props.emailFilter);
    const localEndDeviceFilter = ref(props.endDeviceFilter);
    let debounceTimer;
    const emitFilterChange = () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        emit("filter-change", {
          name: localNameFilter.value,
          user: localUserFilter.value,
          email: localEmailFilter.value,
          endDevice: localEndDeviceFilter.value
        });
      }, 300);
    };
    watch(() => props.nameFilter, (newValue) => {
      localNameFilter.value = newValue;
    });
    watch(() => props.userFilter, (newValue) => {
      localUserFilter.value = newValue;
    });
    watch(() => props.emailFilter, (newValue) => {
      localEmailFilter.value = newValue;
    });
    watch(() => props.endDeviceFilter, (newValue) => {
      localEndDeviceFilter.value = newValue;
    });
    watch(localNameFilter, emitFilterChange);
    watch(localUserFilter, emitFilterChange);
    watch(localEmailFilter, emitFilterChange);
    watch(localEndDeviceFilter, emitFilterChange);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-gray-800/50 border border-gray-700 rounded-lg p-6 mb-6" }, _attrs))}><div class="flex items-center justify-between mb-4"><h3 class="text-lg font-semibold text-white">Filtros de Dispositivos</h3><button class="px-3 py-1 text-sm bg-gray-600 hover:bg-gray-500 text-white rounded-md transition-colors"> Limpiar Filtros </button></div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"><div><label class="block text-sm font-medium text-gray-300 mb-2"> Nombre del Dispositivo </label><input${ssrRenderAttr("value", localNameFilter.value)} type="text" placeholder="Buscar por nombre..." class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"></div><div><label class="block text-sm font-medium text-gray-300 mb-2"> Nombre de Usuario </label><input${ssrRenderAttr("value", localUserFilter.value)} type="text" placeholder="Buscar por usuario..." class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"></div><div><label class="block text-sm font-medium text-gray-300 mb-2"> Email del Usuario </label><input${ssrRenderAttr("value", localEmailFilter.value)} type="text" placeholder="Buscar por email..." class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"></div><div><label class="block text-sm font-medium text-gray-300 mb-2"> EndDevice ID </label><input${ssrRenderAttr("value", localEndDeviceFilter.value)} type="text" placeholder="Buscar por EndDevice ID..." class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"></div></div></div>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Admin/Devices/DevicesFilter.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = {
  __name: "DeviceActivationModal",
  __ssrInlineRender: true,
  props: {
    isVisible: {
      type: Boolean,
      default: false
    },
    activeDevices: {
      type: Array,
      default: () => []
    },
    targetDevice: {
      type: Object,
      default: null
    },
    targetUser: {
      type: Object,
      default: null
    }
  },
  emits: ["close", "confirm"],
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b;
      if (__props.isVisible) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" }, _attrs))}><div class="bg-white rounded-lg p-6 max-w-md w-full mx-4"><div class="flex items-center justify-between mb-4"><h3 class="text-lg font-semibold text-gray-900"> Confirmar Cambio de Dispositivo Activo </h3><button class="text-gray-400 hover:text-gray-600 transition-colors"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div><div class="mb-6"><div class="flex items-center mb-4"><div class="flex-shrink-0"><svg class="w-12 h-12 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path></svg></div><div class="ml-4"><h4 class="text-lg font-medium text-gray-900">Dispositivo Activo Detectado</h4><p class="mt-1 text-sm text-gray-600"> El usuario <strong>${ssrInterpolate((_a = __props.targetUser) == null ? void 0 : _a.name)}</strong> (${ssrInterpolate((_b = __props.targetUser) == null ? void 0 : _b.email)}) ya tiene un dispositivo activo. </p></div></div>`);
        if (__props.activeDevices && __props.activeDevices.length > 0) {
          _push(`<div class="bg-gray-50 rounded-lg p-4 mb-4"><h5 class="font-medium text-gray-900 mb-2">Dispositivo(s) Actualmente Activo(s):</h5><!--[-->`);
          ssrRenderList(__props.activeDevices, (device) => {
            _push(`<div class="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0"><div><p class="font-medium text-gray-900">${ssrInterpolate(device.device_name)}</p><p class="text-sm text-gray-600">ID: ${ssrInterpolate(device.enddevice_id)}</p></div><span class="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full"> Activo </span></div>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        if (__props.targetDevice) {
          _push(`<div class="bg-blue-50 rounded-lg p-4 mb-4"><h5 class="font-medium text-gray-900 mb-2">Dispositivo a Activar:</h5><div class="flex justify-between items-center"><div><p class="font-medium text-gray-900">${ssrInterpolate(__props.targetDevice.device_name)}</p><p class="text-sm text-gray-600">ID: ${ssrInterpolate(__props.targetDevice.enddevice_id)}</p></div><span class="px-2 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-full"> Inactivo </span></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="bg-yellow-50 border border-yellow-200 rounded-lg p-3"><p class="text-sm text-yellow-800"><strong>\u26A0\uFE0F Advertencia:</strong> Al confirmar esta acci\xF3n, el dispositivo actualmente activo ser\xE1 desactivado autom\xE1ticamente y solo el nuevo dispositivo estar\xE1 activo. </p></div></div><div class="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 space-y-2 space-y-reverse sm:space-y-0"><button class="w-full sm:w-auto px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"> Cancelar </button><button class="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-yellow-600 border border-transparent rounded-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors"> S\xED, Cambiar Dispositivo Activo </button></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Admin/Devices/DeviceActivationModal.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "DevicesTable",
  __ssrInlineRender: true,
  props: {
    devices: {
      type: Array,
      default: () => []
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  emits: ["delete-device", "edit-device", "activate-device", "deactivate-device"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const emit = __emit;
    const { toast } = useToastNotifications();
    const showDeleteModal = ref(false);
    const deviceToDelete = ref(null);
    const showActivationModal = ref(false);
    const activationModalData = ref({
      activeDevices: [],
      targetDevice: null,
      targetUser: null
    });
    const formatDate = (dateString) => {
      if (!dateString) return "N/A";
      return new Date(dateString).toLocaleDateString("es-ES", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    };
    const maskAppKey = (appKey) => {
      if (!appKey) return "N/A";
      return appKey.substring(0, 8) + "****" + appKey.substring(appKey.length - 8);
    };
    const confirmDelete = () => {
      if (deviceToDelete.value) {
        emit("delete-device", deviceToDelete.value.id);
      }
      showDeleteModal.value = false;
      deviceToDelete.value = null;
    };
    const cancelDelete = () => {
      showDeleteModal.value = false;
      deviceToDelete.value = null;
    };
    const handleSwitchChange = async (device, newValue) => {
      if (newValue) {
        emit("activate-device", device, false);
      } else {
        emit("deactivate-device", device);
      }
    };
    const showActivationConfirmation = (activeDevices, targetDevice, targetUser) => {
      activationModalData.value = {
        activeDevices,
        targetDevice,
        targetUser
      };
      showActivationModal.value = true;
    };
    const confirmActivation = () => {
      if (activationModalData.value.targetDevice) {
        emit("activate-device", activationModalData.value.targetDevice, true);
      }
      showActivationModal.value = false;
      activationModalData.value = {
        activeDevices: [],
        targetDevice: null,
        targetUser: null
      };
    };
    const cancelActivation = () => {
      showActivationModal.value = false;
      activationModalData.value = {
        activeDevices: [],
        targetDevice: null,
        targetUser: null
      };
    };
    __expose({
      showActivationConfirmation
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b;
      _push(`<!--[--><div class="bg-gray-800/50 border border-gray-700 rounded-lg overflow-hidden"><div class="px-6 py-4 border-b border-gray-700"><div class="flex items-center justify-between"><div><h3 class="text-lg font-semibold text-white">Dispositivos Disponibles</h3><p class="text-sm text-gray-400 mt-1">${ssrInterpolate(__props.devices.length)} dispositivo${ssrInterpolate(__props.devices.length !== 1 ? "s" : "")} encontrado${ssrInterpolate(__props.devices.length !== 1 ? "s" : "")}</p></div><button class="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors"><svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg> A\xF1adir Dispositivo </button></div></div>`);
      if (__props.isLoading) {
        _push(`<div class="p-8 text-center"><div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div><p class="text-gray-400 mt-2">Cargando dispositivos...</p></div>`);
      } else if (__props.devices.length === 0) {
        _push(`<div class="p-8 text-center"><div class="w-16 h-16 mx-auto mb-4 bg-gray-700 rounded-full flex items-center justify-center"><svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path></svg></div><h3 class="text-lg font-medium text-white mb-2">No hay dispositivos</h3><p class="text-gray-400">No se encontraron dispositivos registrados en el sistema.</p></div>`);
      } else {
        _push(`<div class="overflow-x-auto"><table class="w-full"><thead class="bg-gray-700/50"><tr><th class="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider"> Usuario </th><th class="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider"> Dispositivo </th><th class="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider"> EndDevice ID </th><th class="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider"> AppEUI </th><th class="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider"> DevEUI </th><th class="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider"> AppKey </th><th class="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider"> TTN Region </th><th class="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider"> TTN App ID </th><th class="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider"> TTN Access Key </th><th class="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider"> Estado Comunicaci\xF3n </th><th class="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider"> Fecha Creaci\xF3n </th><th class="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider"> Acciones </th></tr></thead><tbody class="divide-y divide-gray-700"><!--[-->`);
        ssrRenderList(__props.devices, (device) => {
          var _a2, _b2, _c, _d;
          _push(`<tr class="hover:bg-gray-700/30 transition-colors"><td class="px-6 py-4 whitespace-nowrap text-center"><div class="flex flex-col items-center"><div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-2"><span class="text-white text-sm font-semibold">${ssrInterpolate(((_b2 = (_a2 = device.user) == null ? void 0 : _a2.name) == null ? void 0 : _b2.charAt(0).toUpperCase()) || "?")}</span></div><div class="text-center"><div class="text-sm font-medium text-white">${ssrInterpolate(((_c = device.user) == null ? void 0 : _c.name) || "Usuario no encontrado")}</div><div class="text-xs text-gray-400">${ssrInterpolate(((_d = device.user) == null ? void 0 : _d.email) || "Sin email")}</div></div></div></td><td class="px-6 py-4 whitespace-nowrap text-center"><div class="text-sm text-white">${ssrInterpolate(device.device_name)}</div></td><td class="px-6 py-4 whitespace-nowrap text-center"><div class="text-sm text-gray-300 font-mono">${ssrInterpolate(device.enddevice_id)}</div></td><td class="px-6 py-4 whitespace-nowrap text-center"><div class="text-sm text-gray-300 font-mono">${ssrInterpolate(device.app_eui)}</div></td><td class="px-6 py-4 whitespace-nowrap text-center"><div class="text-sm text-gray-300 font-mono">${ssrInterpolate(device.dev_eui)}</div></td><td class="px-6 py-4 whitespace-nowrap text-center"><div class="text-sm text-gray-400 font-mono">${ssrInterpolate(maskAppKey(device.app_key))}</div></td><td class="px-6 py-4 whitespace-nowrap text-center"><div class="text-sm text-gray-300 font-mono">${ssrInterpolate(device.ttn_region)}</div></td><td class="px-6 py-4 whitespace-nowrap text-center"><div class="text-sm text-gray-300 font-mono">${ssrInterpolate(device.ttn_app_id)}</div></td><td class="px-6 py-4 whitespace-nowrap text-center"><div class="text-sm text-gray-400 font-mono">${ssrInterpolate(maskAppKey(device.ttn_access_key))}</div></td><td class="px-6 py-4 whitespace-nowrap text-center"><div class="flex flex-col items-center space-y-1">`);
          _push(ssrRenderComponent(CustomSwitch, {
            "model-value": device.is_active_communication,
            "onUpdate:modelValue": (newValue) => handleSwitchChange(device, newValue),
            disabled: __props.isLoading,
            label: "Estado de comunicaci\xF3n",
            class: "scale-90"
          }, null, _parent));
          _push(`<span class="${ssrRenderClass([
            "text-xs font-medium",
            device.is_active_communication ? "text-green-400" : "text-red-400"
          ])}">${ssrInterpolate(device.is_active_communication ? "Activo" : "Inactivo")}</span></div></td><td class="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-300">${ssrInterpolate(formatDate(device.created_at))}</td><td class="px-6 py-4 whitespace-nowrap text-center"><div class="flex items-center justify-center space-x-2"><button class="inline-flex items-center px-2 py-1 text-yellow-400 border border-yellow-400 rounded-md hover:bg-yellow-400/10 transition-colors" title="Editar dispositivo"><svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg><span class="text-xs font-medium">Editar</span></button><button class="inline-flex items-center px-2 py-1 text-red-400 border border-red-400 rounded-md hover:bg-red-400/10 transition-colors" title="Eliminar dispositivo"><svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg><span class="text-xs font-medium">Eliminar</span></button></div></td></tr>`);
        });
        _push(`<!--]--></tbody></table></div>`);
      }
      _push(`</div>`);
      _push(ssrRenderComponent(_sfc_main$4, {
        "is-open": showDeleteModal.value,
        title: `Eliminar Dispositivo`,
        message: `\xBFEst\xE1s seguro de que quieres eliminar el dispositivo '${(_a = deviceToDelete.value) == null ? void 0 : _a.device_name}'? Esta acci\xF3n no se puede deshacer.`,
        "item-name": (_b = deviceToDelete.value) == null ? void 0 : _b.device_name,
        "item-type": "dispositivo",
        onConfirm: confirmDelete,
        onCancel: cancelDelete
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2, {
        "is-visible": showActivationModal.value,
        "active-devices": activationModalData.value.activeDevices,
        "target-device": activationModalData.value.targetDevice,
        "target-user": activationModalData.value.targetUser,
        onConfirm: confirmActivation,
        onClose: cancelActivation
      }, null, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Admin/Devices/DevicesTable.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const adminStore = useAdminStore();
    const { toast } = useToastNotifications();
    const handleFilterChange = (filters) => {
      adminStore.updateDeviceFilters(filters.name, filters.user, filters.email, filters.endDevice);
    };
    const handleClearFilters = () => {
      adminStore.clearDeviceFilters();
    };
    const handleDeleteDevice = async (deviceId) => {
      try {
        await adminStore.deleteDevice(deviceId);
        toast.success("Dispositivo eliminado exitosamente");
      } catch (error) {
        toast.error("Error al eliminar dispositivo");
      }
    };
    const handleEditDevice = (device) => {
      navigateTo(`/admin/dispositivos/editar/${device.id}`);
    };
    const devicesTableRef = ref(null);
    const handleActivateDevice = async (device, force = false) => {
      try {
        const result = await adminStore.activateDeviceWithValidation(device.id, force);
        if (result.success) {
          toast.success(result.message || "Dispositivo activado exitosamente");
        } else if (result.requiresConfirmation) {
          if (devicesTableRef.value) {
            devicesTableRef.value.showActivationConfirmation(
              result.activeDevices,
              device,
              device.user
            );
          }
        }
      } catch (error) {
        console.error("Error al activar dispositivo:", error);
        toast.error("Error al activar dispositivo");
      }
    };
    const handleDeactivateDevice = async (device) => {
      try {
        const result = await adminStore.deactivateDevice(device.id);
        if (result.success) {
          toast.success(result.message || "Dispositivo desactivado exitosamente");
        }
      } catch (error) {
        console.error("Error al desactivar dispositivo:", error);
        toast.error("Error al desactivar dispositivo");
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-8" }, _attrs))}><div class="mb-8"><div class="flex items-center space-x-3 mb-2"><div class="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center"><svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path></svg></div><div><h1 class="text-3xl font-bold text-white">Panel de Administraci\xF3n</h1><p class="text-gray-400">Bienvenido al centro de control del sistema Vivantia</p></div></div><div class="mt-4"><h2 class="text-xl font-semibold text-white">Gesti\xF3n de Dispositivos</h2><p class="text-gray-400 mt-1">Administraci\xF3n y supervisi\xF3n de todos los dispositivos del sistema</p></div></div><div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6"><div class="bg-gradient-to-r from-blue-500/20 to-blue-600/20 border border-blue-500/30 rounded-lg p-6"><div class="flex items-center"><div class="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mr-4"><svg class="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path></svg></div><div><p class="text-2xl font-bold text-white">${ssrInterpolate(unref(adminStore).totalDevices)}</p><p class="text-sm text-blue-300">Total de Dispositivos</p></div></div></div><div class="bg-gradient-to-r from-green-500/20 to-green-600/20 border border-green-500/30 rounded-lg p-6"><div class="flex items-center"><div class="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mr-4"><svg class="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div><div><p class="text-2xl font-bold text-white">${ssrInterpolate(unref(adminStore).filteredDevicesCount)}</p><p class="text-sm text-green-300">Dispositivos Filtrados</p></div></div></div><div class="bg-gradient-to-r from-purple-500/20 to-purple-600/20 border border-purple-500/30 rounded-lg p-6"><div class="flex items-center"><div class="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mr-4"><svg class="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg></div><div><p class="text-2xl font-bold text-white">${ssrInterpolate(unref(adminStore).devices.filter((d) => d.is_active_communication).length)}</p><p class="text-sm text-purple-300">Dispositivos Activos</p></div></div></div></div>`);
      _push(ssrRenderComponent(_sfc_main$3, {
        "name-filter": unref(adminStore).deviceNameFilter,
        "user-filter": unref(adminStore).deviceUserFilter,
        "email-filter": unref(adminStore).deviceEmailFilter,
        "end-device-filter": unref(adminStore).deviceEndDeviceFilter,
        onFilterChange: handleFilterChange,
        onClearFilters: handleClearFilters
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, {
        ref_key: "devicesTableRef",
        ref: devicesTableRef,
        devices: unref(adminStore).filteredDevices,
        "is-loading": unref(adminStore).isLoading,
        onDeleteDevice: handleDeleteDevice,
        onEditDevice: handleEditDevice,
        onActivateDevice: handleActivateDevice,
        onDeactivateDevice: handleDeactivateDevice
      }, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/dispositivos/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-DH5zk4Qj.mjs.map
