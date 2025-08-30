import { ref, computed, watch, nextTick, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
import { u as useToastNotifications } from './useToastNotifications-DaJGJiXK.mjs';
import { u as useSensorData } from './useSensorData-DJj3AL8_.mjs';
import { u as useDeviceStore } from './device-CfApmtSk.mjs';
import { u as useCropStore } from './crop-CoogIRpZ.mjs';
import { u as useUserStore } from './user-BEdD-0tD.mjs';
import { u as useIrrigationStore, I as IrrigationAPI } from './irrigation-EKMz8LaT.mjs';
import { d as devicesIcon, p as plantIcon, w as wateringIcon, t as thermometerIcon, h as humidityIcon } from './index-0YkbgJTu.mjs';
import { u as useHead } from './v3-DHK4yxVL.mjs';
import { u as useRouter, _ as _export_sfc } from './server.mjs';
import 'pinia';
import './DeviceAPI-r0WuORwH.mjs';
import './CropAPI-Cg4msNVy.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
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
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'vue-router';
import '@iconify/vue';

const _sfc_main$3 = {};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs) {
  _push(`<svg${ssrRenderAttrs(mergeProps({
    class: "w-8 h-8 text-white",
    fill: "currentColor",
    viewBox: "0 0 24 24"
  }, _attrs))}><path fill-rule="evenodd" clip-rule="evenodd" d="M13.5 3C13.2239 3 13 3.22386 13 3.5V12C13 12.5523 12.5523 13 12 13C11.4477 13 11 12.5523 11 12V5.5C11 5.22386 10.7761 5 10.5 5C10.2239 5 9.99999 5.22386 9.99999 5.5V13.9677C9.99999 15.0757 8.62655 15.5918 7.8969 14.7579L5.34951 11.8466C5.19167 11.6662 4.95459 11.576 4.71675 11.6057C4.15329 11.6761 3.88804 12.3395 4.24762 12.779L8.93807 18.5118C10.2266 20.0867 12.154 21 14.1888 21C17.3982 21 20 18.3982 20 15.1888V7.5C20 7.22386 19.7761 7 19.5 7C19.2239 7 19 7.22386 19 7.5V12C19 12.5523 18.5523 13 18 13C17.4477 13 17 12.5523 17 12V5.5C17 5.22386 16.7761 5 16.5 5C16.2239 5 16 5.22386 16 5.5V12C16 12.5523 15.5523 13 15 13C14.4477 13 14 12.5523 14 12V3.5C14 3.22386 13.7761 3 13.5 3ZM15.9611 3.05823C15.7525 1.88823 14.73 1 13.5 1C12.27 1 11.2475 1.88823 11.0389 3.05823C10.8653 3.0201 10.685 3 10.5 3C9.11928 3 7.99999 4.11929 7.99999 5.5V11.8386L6.85467 10.5296C6.2595 9.84942 5.36551 9.50903 4.46868 9.62113C2.34401 9.88672 1.34381 12.3883 2.6997 14.0455L7.39016 19.7783C9.05854 21.8174 11.5541 23 14.1888 23C18.5028 23 22 19.5028 22 15.1888V7.5C22 6.11929 20.8807 5 19.5 5C19.315 5 19.1347 5.0201 18.9611 5.05823C18.7525 3.88823 17.73 3 16.5 3C16.315 3 16.1347 3.0201 15.9611 3.05823Z"></path></svg>`);
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("assets/icons/ManualModeIcon.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const ManualModeIcon = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["ssrRender", _sfc_ssrRender$2]]);
const _sfc_main$2 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  _push(`<svg${ssrRenderAttrs(mergeProps({
    class: "w-8 h-8 text-white",
    fill: "currentColor",
    viewBox: "0 0 20 20"
  }, _attrs))}><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"></path></svg>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("assets/icons/ProgrammedModeIcon.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const ProgrammedModeIcon = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender$1]]);
const _sfc_main$1 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<svg${ssrRenderAttrs(mergeProps({
    class: "w-8 h-8 text-white",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24"
  }, _attrs))}><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.5"></circle><path d="M3.66122 10.6392C4.13377 10.9361 4.43782 11.4419 4.43782 11.9999C4.43781 12.558 4.13376 13.0638 3.66122 13.3607C3.33966 13.5627 3.13248 13.7242 2.98508 13.9163C2.66217 14.3372 2.51966 14.869 2.5889 15.3949C2.64082 15.7893 2.87379 16.1928 3.33973 16.9999C3.80568 17.8069 4.03865 18.2104 4.35426 18.4526C4.77508 18.7755 5.30694 18.918 5.83284 18.8488C6.07287 18.8172 6.31628 18.7185 6.65196 18.5411C7.14544 18.2803 7.73558 18.2699 8.21895 18.549C8.70227 18.8281 8.98827 19.3443 9.00912 19.902C9.02332 20.2815 9.05958 20.5417 9.15224 20.7654C9.35523 21.2554 9.74458 21.6448 10.2346 21.8478C10.6022 22 11.0681 22 12 22C12.9319 22 13.3978 22 13.7654 21.8478C14.2554 21.6448 14.6448 21.2554 14.8478 20.7654C14.9404 20.5417 14.9767 20.2815 14.9909 19.9021C15.0117 19.3443 15.2977 18.8281 15.7811 18.549C16.2644 18.27 16.8545 18.2804 17.3479 18.5412C17.6837 18.7186 17.9271 18.8173 18.1671 18.8489C18.693 18.9182 19.2249 18.7756 19.6457 18.4527C19.9613 18.2106 20.1943 17.807 20.6603 17C20.8677 16.6407 21.029 16.3614 21.1486 16.1272M20.3387 13.3608C19.8662 13.0639 19.5622 12.5581 19.5621 12.0001C19.5621 11.442 19.8662 10.9361 20.3387 10.6392C20.6603 10.4372 20.8674 10.2757 21.0148 10.0836C21.3377 9.66278 21.4802 9.13092 21.411 8.60502C21.3591 8.2106 21.1261 7.80708 20.6601 7.00005C20.1942 6.19301 19.9612 5.7895 19.6456 5.54732C19.2248 5.22441 18.6929 5.0819 18.167 5.15113C17.927 5.18274 17.6836 5.2814 17.3479 5.45883C16.8544 5.71964 16.2643 5.73004 15.781 5.45096C15.2977 5.1719 15.0117 4.6557 14.9909 4.09803C14.9767 3.71852 14.9404 3.45835 14.8478 3.23463C14.6448 2.74458 14.2554 2.35523 13.7654 2.15224C13.3978 2 12.9319 2 12 2C11.0681 2 10.6022 2 10.2346 2.15224C9.74458 2.35523 9.35523 2.74458 9.15224 3.23463C9.05958 3.45833 9.02332 3.71848 9.00912 4.09794C8.98826 4.65566 8.70225 5.17191 8.21891 5.45096C7.73557 5.73002 7.14548 5.71959 6.65205 5.4588C6.31633 5.28136 6.0729 5.18269 5.83285 5.15108C5.30695 5.08185 4.77509 5.22436 4.35427 5.54727C4.03866 5.78945 3.80569 6.19297 3.33974 7C3.13231 7.35929 2.97105 7.63859 2.85138 7.87273" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path></svg>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("assets/icons/AutomaticModeIcon.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const AutomaticModeIcon = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender]]);
ref(null);
ref({});
ref(false);
ref(null);
ref(null);
ref(false);
ref(null);
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Modos de Riego - VIVANTIA",
      meta: [
        { name: "description", content: "Control y configuraci\xF3n de los modos de riego autom\xE1tico" }
      ]
    });
    const irrigationStore = useIrrigationStore();
    const deviceStore = useDeviceStore();
    const cropStore = useCropStore();
    const userStore = useUserStore();
    const { toast } = useToastNotifications();
    useRouter();
    const {
      realDataPoints,
      currentTemperature: sensorTemperature,
      currentSoilHumidity: sensorSoilHumidity,
      currentAirHumidity: sensorAirHumidity
    } = useSensorData();
    const lastIrrigationData = ref(null);
    const isLoadingLastIrrigation = ref(false);
    ref("Tomate Cherry");
    const flowRate = ref(2.5);
    ref("Ayer 15:30");
    const nextWatering = ref(null);
    const loadLastIrrigationDate = async () => {
      var _a;
      if (!((_a = userStore.user) == null ? void 0 : _a.id) || userStore.isDemoMode) return;
      try {
        isLoadingLastIrrigation.value = true;
        console.log("\u{1F4A7} Cargando \xFAltima fecha de riego para usuario:", userStore.user.id);
        const response = await IrrigationAPI.getLastIrrigationDate(userStore.user.id);
        if (response.success && response.data) {
          lastIrrigationData.value = response.data;
          console.log("\u2705 \xDAltima fecha de riego cargada:", response.data);
        } else {
          console.log("\u274C No se encontraron registros de riego");
          lastIrrigationData.value = null;
        }
      } catch (error) {
        console.error("\u274C Error cargando \xFAltima fecha de riego:", error);
        lastIrrigationData.value = null;
      } finally {
        isLoadingLastIrrigation.value = false;
      }
    };
    const activeDeviceName = computed(() => {
      const activeDevice = deviceStore.activeDevices[0];
      return activeDevice ? activeDevice.deviceName : null;
    });
    const selectedCropName = computed(() => {
      const selectedCrop = cropStore.crops.find((crop) => crop.selected);
      return selectedCrop ? selectedCrop.name : null;
    });
    const currentTemperature = computed(() => {
      if (sensorTemperature.value !== null && sensorTemperature.value !== void 0) {
        return Number(sensorTemperature.value).toFixed(1);
      }
      return null;
    });
    const currentSoilHumidity = computed(() => {
      if (sensorSoilHumidity.value !== null && sensorSoilHumidity.value !== void 0) {
        return Number(sensorSoilHumidity.value).toFixed(1);
      }
      return null;
    });
    const currentAirHumidity = computed(() => {
      if (sensorAirHumidity.value !== null && sensorAirHumidity.value !== void 0) {
        return Number(sensorAirHumidity.value).toFixed(1);
      }
      return null;
    });
    const currentModeDisplay = computed(() => {
      return irrigationStore.activeMode ? irrigationStore.activeMode.charAt(0).toUpperCase() + irrigationStore.activeMode.slice(1) : "Apagado";
    });
    const getCurrentModeColor = () => {
      if (!irrigationStore.activeMode) return "bg-gray-400";
      switch (irrigationStore.activeMode) {
        case "manual":
          return "bg-blue-500";
        case "programado":
          return "bg-green-500";
        case "automatico":
          return "bg-purple-500";
        default:
          return "bg-gray-400";
      }
    };
    watch(irrigationStore.remainingTime, (newValue) => {
      console.log("remainingTime cambi\xF3 a:", newValue);
      if (newValue) {
        nextTick(() => {
        });
      }
    });
    watch(() => realDataPoints == null ? void 0 : realDataPoints.value, (newData) => {
      console.log("\u{1F504} Datos de sensores actualizados:", (newData == null ? void 0 : newData.length) || 0);
      if (newData && newData.length > 0) {
        const latestData = newData[newData.length - 1];
        console.log("\u{1F504} \xDAltimo dato de sensores:", latestData);
        console.log("\u{1F321}\uFE0F Temperatura actual:", currentTemperature.value);
        console.log("\u{1F4A7} Humedad suelo actual:", currentSoilHumidity.value);
        console.log("\u{1F4A7} Humedad aire actual:", currentAirHumidity.value);
      }
    }, { deep: true });
    watch(irrigationStore.hasActiveMode, (newValue) => {
      console.log("hasActiveMode cambi\xF3 a:", newValue, "activeMode:", irrigationStore.activeMode);
    });
    watch(irrigationStore.isWatering, (newValue) => {
      console.log("isWatering cambi\xF3 a:", newValue, "activeMode:", irrigationStore.activeMode);
      nextTick(() => {
      });
    });
    watch(irrigationStore.activeMode, (newValue) => {
      console.log("activeMode cambi\xF3 a:", newValue, "isWatering:", irrigationStore.isWatering);
      nextTick(() => {
      });
    });
    watch(irrigationStore.hasActiveMode, (newValue) => {
      console.log("hasActiveMode cambi\xF3 a:", newValue, "activeMode:", irrigationStore.activeMode);
      nextTick(() => {
      });
    });
    watch(irrigationStore.isPaused, (newValue) => {
      console.log("isPaused cambi\xF3 a:", newValue, "isWatering:", irrigationStore.isWatering);
      nextTick(() => {
      });
    });
    watch(irrigationStore.isWatering, async (newValue, oldValue) => {
      if (oldValue === true && newValue === false) {
        console.log("\u{1F4A7} Riego completado, actualizando \xFAltima fecha...");
        await loadLastIrrigationDate();
      }
    });
    watch(irrigationStore.lastIrrigation, async (newValue) => {
      if (newValue) {
        console.log("\u{1F4A7} \xDAltimo riego actualizado en store, actualizando datos...");
        await loadLastIrrigationDate();
      }
    });
    watch(() => cropStore.crops, (newCrops) => {
      if (!userStore.isDemoMode) {
        console.log("\u{1F504} Modo/index: Array de cultivos actualizado, cultivos:", newCrops.length);
        const selectedCrop = newCrops.find((crop) => crop.selected);
        if (selectedCrop) {
          console.log("\u2705 Modo/index: Cultivo seleccionado detectado:", selectedCrop.name);
        }
      }
    }, { deep: true });
    watch(() => deviceStore.devices, (newDevices) => {
      if (!userStore.isDemoMode) {
        console.log("\u{1F504} Modo/index: Array de dispositivos actualizado, dispositivos:", newDevices.length);
        const activeDevice = deviceStore.activeDevices[0];
        if (activeDevice) {
          console.log("\u2705 Modo/index: Dispositivo activo detectado:", activeDevice.deviceName);
        }
      }
    }, { deep: true });
    watch(() => deviceStore.activeDevices, (newDevices) => {
      console.log("\u{1F4F1} Dispositivos activos actualizados:", newDevices.length);
      console.log("\u{1F4F1} Dispositivo activo:", activeDeviceName.value);
    }, { deep: true });
    watch(() => cropStore.crops, (newCrops) => {
      console.log("\u{1F331} Cultivos actualizados:", newCrops.length);
      console.log("\u{1F331} Cultivo seleccionado:", selectedCropName.value);
    }, { deep: true });
    watch(() => realDataPoints == null ? void 0 : realDataPoints.value, (newData) => {
      console.log("\u{1F321}\uFE0F Datos de sensores actualizados:", (newData == null ? void 0 : newData.length) || 0);
      console.log("\u{1F321}\uFE0F Temperatura actual:", currentTemperature.value);
      console.log("\u{1F4A7} Humedad suelo actual:", currentSoilHumidity.value);
      console.log("\u{1F4A7} Humedad aire actual:", currentAirHumidity.value);
    }, { deep: true });
    const lastIrrigationFormatted = computed(() => {
      var _a;
      if (!((_a = lastIrrigationData.value) == null ? void 0 : _a.last_irrigation_at)) return "Nunca";
      try {
        const date = new Date(lastIrrigationData.value.last_irrigation_at);
        const now = /* @__PURE__ */ new Date();
        const diffInHours = Math.floor((now - date) / (1e3 * 60 * 60));
        const diffInDays = Math.floor(diffInHours / 24);
        if (diffInDays > 0) {
          if (diffInDays === 1) {
            return `Ayer ${date.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })}`;
          } else if (diffInDays < 7) {
            return `Hace ${diffInDays} d\xEDas`;
          } else {
            return date.toLocaleDateString("es-ES", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric"
            }) + " " + date.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" });
          }
        } else if (diffInHours > 0) {
          return `Hace ${diffInHours} hora${diffInHours > 1 ? "s" : ""}`;
        } else {
          const diffInMinutes = Math.floor((now - date) / (1e3 * 60));
          if (diffInMinutes > 0) {
            return `Hace ${diffInMinutes} minuto${diffInMinutes > 1 ? "s" : ""}`;
          } else {
            return "Ahora mismo";
          }
        }
      } catch (error) {
        console.error("Error formateando fecha de \xFAltimo riego:", error);
        return "Fecha no disponible";
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-8" }, _attrs))}><div class="bg-gray-900/60 border border-gray-600/30 rounded-xl shadow-lg p-6 mb-8 hover:bg-gray-900/80 transition-colors"><h2 class="text-2xl font-bold text-white mb-6 flex items-center"> Estado del Sistema de Riego </h2><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"><div class="bg-gray-600/60 border border-blue-500/30 p-4 rounded-lg hover:bg-gray-600/80 transition-colors"><div class="flex items-center justify-between mb-2"><h3 class="font-medium text-blue-400">Modo Actual</h3><div class="${ssrRenderClass([getCurrentModeColor(), "w-3 h-3 rounded-full"])}"></div></div><p class="text-2xl font-bold text-white">${ssrInterpolate(unref(currentModeDisplay))}</p></div><div class="bg-gray-600/60 border border-blue-500/30 p-4 rounded-lg hover:bg-gray-600/80 transition-colors"><div class="flex items-center justify-between mb-2"><h3 class="font-medium text-blue-400">Dispositivo Activo</h3>`);
      _push(ssrRenderComponent(unref(devicesIcon), { class: "text-gray-300" }, null, _parent));
      _push(`</div><p class="text-2xl font-bold text-white">${ssrInterpolate(unref(activeDeviceName) || "-")}</p></div><div class="bg-gray-600/60 border border-green-500/30 p-4 rounded-lg hover:bg-gray-600/80 transition-colors"><div class="flex items-center justify-between mb-2"><h3 class="font-medium text-green-400">Cultivo en Riego</h3>`);
      _push(ssrRenderComponent(unref(plantIcon), { class: "text-gray-300" }, null, _parent));
      _push(`</div><p class="text-2xl font-bold text-white">${ssrInterpolate(unref(selectedCropName) || "-")}</p></div><div class="bg-gray-600/60 border border-purple-500/30 p-4 rounded-lg hover:bg-gray-600/80 transition-colors"><div class="flex items-center justify-between mb-2"><h3 class="font-medium text-purple-400">Estado Bomba</h3><div class="${ssrRenderClass([[
        unref(irrigationStore).isPaused ? "bg-yellow-500" : unref(irrigationStore).isWatering ? "bg-green-500 animate-pulse" : "bg-gray-400"
      ], "w-3 h-3 rounded-full"])}"></div></div><p class="text-2xl font-bold text-white">${ssrInterpolate(unref(irrigationStore).isPaused ? "Pausada" : unref(irrigationStore).isWatering ? "Activa" : "Inactiva")}</p></div></div><div class="mt-6">`);
      if (unref(irrigationStore).activeMode !== "programmed") {
        _push(`<div class="grid grid-cols-1 md:grid-cols-3 gap-4"><div class="bg-gray-600/60 border border-gray-600/30 p-3 rounded-lg hover:bg-gray-600/80 transition-colors"><p class="text-sm text-gray-400">\xDAltimo Riego</p><p class="font-semibold text-white">${ssrInterpolate(unref(lastIrrigationFormatted) || "Nunca")}</p></div><div class="bg-gray-600/60 border border-gray-600/30 p-3 rounded-lg hover:bg-gray-600/80 transition-colors"><p class="text-sm text-gray-400">Tiempo Restante</p><p class="font-semibold text-white">${ssrInterpolate(unref(irrigationStore).remainingTime || "-")}</p></div><div class="bg-gray-600/60 border border-gray-600/30 p-3 rounded-lg hover:bg-gray-600/80 transition-colors"><p class="text-sm text-gray-400">Pr\xF3ximo Riego</p><p class="font-semibold text-white">${ssrInterpolate(unref(nextWatering) || "-")}</p></div></div>`);
      } else {
        _push(`<div class="grid grid-cols-1 md:grid-cols-4 gap-4"><div class="bg-gray-600/60 border border-gray-600/30 p-3 rounded-lg hover:bg-gray-600/80 transition-colors"><p class="text-sm text-gray-400">\xDAltimo Riego</p><p class="font-semibold text-white">${ssrInterpolate(unref(lastIrrigationFormatted) || "Nunca")}</p></div><div class="bg-gray-600/60 border border-green-500/30 p-3 rounded-lg hover:bg-gray-600/80 transition-colors"><p class="text-sm text-green-400">${ssrInterpolate(unref(irrigationStore).isWatering ? "Tiempo Restante" : "Hasta Activaci\xF3n")}</p><p class="font-semibold text-white">${ssrInterpolate(unref(irrigationStore).remainingTime || "-")}</p></div><div class="bg-gray-600/60 border border-blue-500/30 p-3 rounded-lg hover:bg-gray-600/80 transition-colors"><p class="text-sm text-blue-400">Pr\xF3xima Ejecuci\xF3n</p><p class="font-semibold text-white text-xs">${ssrInterpolate(unref(irrigationStore).nextExecutionFormatted || "-")}</p></div><div class="bg-gray-600/60 border border-purple-500/30 p-3 rounded-lg hover:bg-gray-600/80 transition-colors"><p class="text-sm text-purple-400">Tiempo Hasta Pr\xF3ximo</p><p class="font-semibold text-white">${ssrInterpolate(unref(irrigationStore).timeUntilNextExecution || "-")}</p></div></div>`);
      }
      _push(`</div><div class="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4"><div class="bg-gray-600/60 border border-cyan-500/30 p-3 rounded-lg hover:bg-gray-600/80 transition-colors"><div class="flex items-center justify-between mb-2"><p class="text-sm text-gray-400">Caudal en Curso</p>`);
      _push(ssrRenderComponent(unref(wateringIcon), { class: "text-gray-300" }, null, _parent));
      _push(`</div><p class="font-semibold text-white">${ssrInterpolate(unref(irrigationStore).isWatering ? unref(flowRate) + " L/min" : "-")}</p></div><div class="bg-gray-600/60 border border-red-500/30 p-3 rounded-lg hover:bg-gray-600/80 transition-colors"><div class="flex items-center justify-between mb-2"><p class="text-sm text-gray-400">Temperatura Actual</p>`);
      _push(ssrRenderComponent(unref(thermometerIcon), { class: "text-gray-300" }, null, _parent));
      _push(`</div><p class="font-semibold text-white">${ssrInterpolate(unref(currentTemperature) || "-")}</p><p class="text-xs text-red-300">${ssrInterpolate(unref(currentTemperature) ? "\xB0C" : "")}</p></div><div class="bg-gray-600/60 border border-blue-500/30 p-3 rounded-lg hover:bg-gray-600/80 transition-colors"><div class="flex items-center justify-between mb-2"><p class="text-sm text-gray-400">Humedad Suelo</p>`);
      _push(ssrRenderComponent(unref(humidityIcon), { class: "text-gray-300" }, null, _parent));
      _push(`</div><p class="font-semibold text-white">${ssrInterpolate(unref(currentSoilHumidity) || "-")}</p><p class="text-xs text-blue-300">${ssrInterpolate(unref(currentSoilHumidity) ? "%" : "")}</p></div><div class="bg-gray-600/60 border border-cyan-500/30 p-3 rounded-lg hover:bg-gray-600/80 transition-colors"><div class="flex items-center justify-between mb-2"><p class="text-sm text-gray-400">Humedad Aire</p>`);
      _push(ssrRenderComponent(unref(humidityIcon), { class: "text-gray-300" }, null, _parent));
      _push(`</div><p class="font-semibold text-white">${ssrInterpolate(unref(currentAirHumidity) || "-")}</p><p class="text-xs text-cyan-300">${ssrInterpolate(unref(currentAirHumidity) ? "%" : "")}</p></div></div></div><div class="bg-gray-900/60 border border-gray-600/30 rounded-xl shadow-lg p-6 hover:bg-gray-900/80 transition-colors"><h2 class="text-2xl font-bold text-white mb-6">Seleccionar Modo de Riego</h2>`);
      if (unref(irrigationStore).hasActiveMode) {
        _push(`<div class="mb-6 p-4 bg-yellow-900/30 border border-yellow-500/30 rounded-lg"><div class="flex items-center justify-between"><div class="flex-1"><h3 class="font-semibold text-yellow-400">Modo ${ssrInterpolate(unref(currentModeDisplay))} Configurado</h3><p class="text-sm text-yellow-300">${ssrInterpolate(unref(irrigationStore).getModeDescription())}</p>`);
        if (unref(irrigationStore).isWatering || unref(irrigationStore).isPaused) {
          _push(`<div class="mt-2"><p class="text-sm text-yellow-200"> Tiempo restante: <span class="font-bold">${ssrInterpolate(unref(irrigationStore).remainingTime)}</span>`);
          if (unref(irrigationStore).isPaused) {
            _push(`<span class="text-yellow-400 ml-2">(Pausado)</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</p></div>`);
        } else if (unref(irrigationStore).activeMode === "programado" && unref(irrigationStore).remainingTime) {
          _push(`<div class="mt-2"><p class="text-sm text-yellow-200"> Tiempo hasta activaci\xF3n: <span class="font-bold">${ssrInterpolate(unref(irrigationStore).remainingTime)}</span></p></div>`);
        } else if (unref(irrigationStore).activeMode === "programado") {
          _push(`<div class="mt-2"><p class="text-sm text-yellow-200"> El riego se activar\xE1 autom\xE1ticamente en la fecha programada </p></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="mt-3 p-3 bg-blue-900/30 border border-blue-500/30 rounded-lg"><div class="flex items-start space-x-2"><svg class="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><div><p class="text-sm text-blue-300 font-medium">Para cancelar o modificar:</p><p class="text-xs text-blue-200 mt-1">`);
        if (unref(irrigationStore).activeMode === "manual") {
          _push(`<span>Accede al <span class="font-semibold">Modo Manual</span> para detener el riego activo.</span>`);
        } else if (unref(irrigationStore).activeMode === "programado") {
          _push(`<span>Accede al <span class="font-semibold">Modo Programado</span> para cancelar la programaci\xF3n.</span>`);
        } else if (unref(irrigationStore).activeMode === "automatico") {
          _push(`<span>Accede al <span class="font-semibold">Modo Autom\xE1tico</span> para modificar la configuraci\xF3n.</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</p></div></div></div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="grid grid-cols-1 md:grid-cols-3 gap-6"><div class="${ssrRenderClass([
        "group p-6 rounded-xl border-2 transition-all duration-300",
        unref(irrigationStore).canAccessManualMode ? "cursor-pointer bg-gray-800/60 border-blue-500/30 hover:border-blue-400 hover:bg-gray-800/80 transform hover:scale-105" : "cursor-not-allowed bg-gray-800/30 border-gray-600/20 opacity-50"
      ])}"><div class="text-center"><div class="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-600 transition-colors shadow-lg">`);
      _push(ssrRenderComponent(unref(ManualModeIcon), null, null, _parent));
      _push(`</div><h3 class="text-xl font-bold text-white mb-2">Manual</h3><p class="text-blue-300 text-sm">Control directo del riego con duraci\xF3n personalizada</p></div></div><div class="${ssrRenderClass([
        "group p-6 rounded-xl border-2 transition-all duration-300",
        unref(irrigationStore).canAccessProgrammedMode ? "cursor-pointer bg-gray-800/60 border-green-500/30 hover:border-green-400 hover:bg-gray-800/80 transform hover:scale-105" : "cursor-not-allowed bg-gray-800/30 border-gray-600/20 opacity-50"
      ])}"><div class="text-center"><div class="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-600 transition-colors shadow-lg">`);
      _push(ssrRenderComponent(unref(ProgrammedModeIcon), null, null, _parent));
      _push(`</div><h3 class="text-xl font-bold text-white mb-2">Programado</h3><p class="text-green-300 text-sm">Riego autom\xE1tico a horas espec\xEDficas del d\xEDa</p></div></div><div class="${ssrRenderClass([
        "group p-6 rounded-xl border-2 transition-all duration-300",
        unref(irrigationStore).canAccessAutomaticMode ? "cursor-pointer bg-gray-800/60 border-purple-500/30 hover:border-purple-400 hover:bg-gray-800/80 transform hover:scale-105" : "cursor-not-allowed bg-gray-800/30 border-gray-600/20 opacity-50"
      ])}"><div class="text-center"><div class="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-600 transition-colors shadow-lg">`);
      _push(ssrRenderComponent(unref(AutomaticModeIcon), null, null, _parent));
      _push(`</div><h3 class="text-xl font-bold text-white mb-2">Autom\xE1tico</h3><p class="text-purple-300 text-sm">Riego basado en sensores de humedad y temperatura</p></div></div></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/modo/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-Cr7bLXsp.mjs.map
