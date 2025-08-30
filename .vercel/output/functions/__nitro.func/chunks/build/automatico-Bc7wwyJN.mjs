import { ref, computed, watch, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderAttr, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { u as useToastNotifications } from './useToastNotifications-DaJGJiXK.mjs';
import { u as useCropStore } from './crop-CoogIRpZ.mjs';
import { u as useDeviceStore } from './device-CfApmtSk.mjs';
import { u as useUserStore } from './user-BEdD-0tD.mjs';
import { u as useIrrigationStore, s as setInterval } from './irrigation-EKMz8LaT.mjs';
import { u as useSensorData } from './useSensorData-DJj3AL8_.mjs';
import { T as ThermometerIcon, C as CheckIcon } from './ThermometerIcon-CWsbcdy6.mjs';
import { W as WaterDropIcon, P as PauseIcon } from './WaterDropIcon-Cj5g3qH2.mjs';
import { W as WarningIcon } from './WarningIcon-CqMZlVzn.mjs';
import { u as useRouter, _ as _export_sfc } from './server.mjs';
import { H as HumidityIcon } from './HumidityIcon-UKpSAva3.mjs';
import { u as useHead } from './v3-DHK4yxVL.mjs';
import 'pinia';
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
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';

const _sfc_main$2 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  _push(`<svg${ssrRenderAttrs(mergeProps({
    class: "w-6 h-6 text-white",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24"
  }, _attrs))}><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.5"></circle><path d="M3.66122 10.6392C4.13377 10.9361 4.43782 11.4419 4.43782 11.9999C4.43781 12.558 4.13376 13.0638 3.66122 13.3607C3.33966 13.5627 3.13248 13.7242 2.98508 13.9163C2.66217 14.3372 2.51966 14.869 2.5889 15.3949C2.64082 15.7893 2.87379 16.1928 3.33973 16.9999C3.80568 17.8069 4.03865 18.2104 4.35426 18.4526C4.77508 18.7755 5.30694 18.918 5.83284 18.8488C6.07287 18.8172 6.31628 18.7185 6.65196 18.5411C7.14544 18.2803 7.73558 18.2699 8.21895 18.549C8.70227 18.8281 8.98827 19.3443 9.00912 19.902C9.02332 20.2815 9.05958 20.5417 9.15224 20.7654C9.35523 21.2554 9.74458 21.6448 10.2346 21.8478C10.6022 22 11.0681 22 12 22C12.9319 22 13.3978 22 13.7654 21.8478C14.2554 21.6448 14.6448 21.2554 14.8478 20.7654C14.9404 20.5417 14.9767 20.2815 14.9909 19.9021C15.0117 19.3443 15.2977 18.8281 15.7811 18.549C16.2644 18.27 16.8545 18.2804 17.3479 18.5412C17.6837 18.7186 17.9271 18.8173 18.1671 18.8489C18.693 18.9182 19.2249 18.7756 19.6457 18.4527C19.9613 18.2106 20.1943 17.807 20.6603 17C20.8677 16.6407 21.029 16.3614 21.1486 16.1272M20.3387 13.3608C19.8662 13.0639 19.5622 12.5581 19.5621 12.0001C19.5621 11.442 19.8662 10.9361 20.3387 10.6392C20.6603 10.4372 20.8674 10.2757 21.0148 10.0836C21.3377 9.66278 21.4802 9.13092 21.411 8.60502C21.3591 8.2106 21.1261 7.80708 20.6601 7.00005C20.1942 6.19301 19.9612 5.7895 19.6456 5.54732C19.2248 5.22441 18.6929 5.0819 18.167 5.15113C17.927 5.18274 17.6836 5.2814 17.3479 5.45883C16.8544 5.71964 16.2643 5.73004 15.781 5.45096C15.2977 5.1719 15.0117 4.6557 14.9909 4.09803C14.9767 3.71852 14.9404 3.45835 14.8478 3.23463C14.6448 2.74458 14.2554 2.35523 13.7654 2.15224C13.3978 2 12.9319 2 12 2C11.0681 2 10.6022 2 10.2346 2.15224C9.74458 2.35523 9.35523 2.74458 9.15224 3.23463C9.05958 3.45833 9.02332 3.71848 9.00912 4.09794C8.98826 4.65566 8.70225 5.17191 8.21891 5.45096C7.73557 5.73002 7.14548 5.71959 6.65205 5.4588C6.31633 5.28136 6.0729 5.18269 5.83285 5.15108C5.30695 5.08185 4.77509 5.22436 4.35427 5.54727C4.03866 5.78945 3.80569 6.19297 3.33974 7C3.13231 7.35929 2.97105 7.63859 2.85138 7.87273" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path></svg>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("assets/icons/AutomaticIcon.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const AutomaticIcon = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender$1]]);
const _sfc_main$1 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<svg${ssrRenderAttrs(mergeProps({
    class: "w-8 h-8 text-purple-600",
    fill: "currentColor",
    viewBox: "0 0 20 20"
  }, _attrs))}><path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"></path></svg>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("assets/icons/AutomaticConfirmIcon.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const AutomaticConfirmIcon = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main = {
  __name: "automatico",
  __ssrInlineRender: true,
  setup(__props) {
    const cropStore = useCropStore();
    const deviceStore = useDeviceStore();
    useUserStore();
    const irrigationStore = useIrrigationStore();
    const {
      currentTemperature,
      currentSoilHumidity,
      currentAirHumidity,
      realDataPoints
    } = useSensorData();
    const { showSuccess, showError, showWarning } = useToastNotifications();
    useRouter();
    const automaticConfig = ref(null);
    const isWatering = ref(false);
    const isPaused = ref(false);
    ref(false);
    const showCancelModal = ref(false);
    const showConfirmModal = ref(false);
    const selectedCrop = computed(() => {
      return cropStore.crops.find((crop) => crop.selected) || null;
    });
    const activeDevice = computed(() => {
      return deviceStore.devices.find((device) => device.is_active_communication) || null;
    });
    const thresholds = ref({
      maxTemperature: 28,
      minSoilHumidity: 30,
      maxSoilHumidity: 70,
      minAirHumidity: 40,
      maxAirHumidity: 80
    });
    const lastSensorUpdate = computed(() => {
      if (realDataPoints.value && realDataPoints.value.length > 0) {
        const lastPoint = realDataPoints.value[realDataPoints.value.length - 1];
        return lastPoint.received_at;
      }
      return null;
    });
    const getTemperatureStatus = () => {
      if (currentTemperature.value >= thresholds.value.maxTemperature) {
        return "Temperatura alta - Riego recomendado";
      } else if (currentTemperature.value >= thresholds.value.maxTemperature - 2) {
        return "Temperatura en aumento";
      }
      return "Temperatura normal";
    };
    const getSoilHumidityStatus = () => {
      if (currentSoilHumidity.value <= thresholds.value.minSoilHumidity) {
        return "Humedad suelo baja - Riego recomendado";
      } else if (currentSoilHumidity.value >= thresholds.value.maxSoilHumidity) {
        return "Humedad suelo alta - Riego no necesario";
      }
      return "Humedad suelo en rango \xF3ptimo";
    };
    const getAirHumidityStatus = () => {
      if (currentAirHumidity.value <= thresholds.value.minAirHumidity) {
        return "Humedad aire baja";
      } else if (currentAirHumidity.value >= thresholds.value.maxAirHumidity) {
        return "Humedad aire alta";
      }
      return "Humedad aire en rango \xF3ptimo";
    };
    const getCurrentConditionStatus = () => {
      const tempNeedsWater = currentTemperature.value >= thresholds.value.maxTemperature;
      const soilHumidityNeedsWater = currentSoilHumidity.value <= thresholds.value.minSoilHumidity;
      const airHumidityNeedsWater = currentAirHumidity.value <= thresholds.value.minAirHumidity;
      if (tempNeedsWater && (soilHumidityNeedsWater || airHumidityNeedsWater)) {
        return "Se activar\xEDa el riego ahora";
      } else if (tempNeedsWater || soilHumidityNeedsWater || airHumidityNeedsWater) {
        return "Condiciones cercanas al umbral";
      }
      return "Condiciones estables - Sin riego necesario";
    };
    const loadCropThresholds = () => {
      if (selectedCrop.value) {
        thresholds.value = {
          maxTemperature: selectedCrop.value.temperature_max || 28,
          minSoilHumidity: selectedCrop.value.soil_humidity_min || 30,
          maxSoilHumidity: selectedCrop.value.soil_humidity_max || 70,
          minAirHumidity: selectedCrop.value.air_humidity_min || 40,
          maxAirHumidity: selectedCrop.value.air_humidity_max || 80
        };
        console.log("\u{1F331} Umbrales cargados desde cultivo:", thresholds.value);
      }
    };
    const isValidConfiguration = () => {
      return thresholds.value.maxTemperature > 0 && thresholds.value.minSoilHumidity >= 0 && thresholds.value.maxSoilHumidity > thresholds.value.minSoilHumidity && thresholds.value.minAirHumidity >= 0 && thresholds.value.maxAirHumidity > thresholds.value.minAirHumidity && selectedCrop.value && activeDevice.value;
    };
    const getThresholdsFromConfig = () => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
      if (!automaticConfig.value) {
        return {
          maxTemperature: ((_a = selectedCrop.value) == null ? void 0 : _a.temperature_max) || 0,
          minSoilHumidity: ((_b = selectedCrop.value) == null ? void 0 : _b.soil_humidity_min) || 0,
          maxSoilHumidity: ((_c = selectedCrop.value) == null ? void 0 : _c.soil_humidity_max) || 0,
          minAirHumidity: ((_d = selectedCrop.value) == null ? void 0 : _d.air_humidity_min) || 0,
          maxAirHumidity: ((_e = selectedCrop.value) == null ? void 0 : _e.air_humidity_max) || 0
        };
      }
      return {
        maxTemperature: automaticConfig.value.temperature_max || ((_f = selectedCrop.value) == null ? void 0 : _f.temperature_max) || 0,
        minSoilHumidity: automaticConfig.value.soil_humidity_min || ((_g = selectedCrop.value) == null ? void 0 : _g.soil_humidity_min) || 0,
        maxSoilHumidity: automaticConfig.value.soil_humidity_max || ((_h = selectedCrop.value) == null ? void 0 : _h.soil_humidity_max) || 0,
        minAirHumidity: automaticConfig.value.air_humidity_min || ((_i = selectedCrop.value) == null ? void 0 : _i.air_humidity_min) || 0,
        maxAirHumidity: automaticConfig.value.air_humidity_max || ((_j = selectedCrop.value) == null ? void 0 : _j.air_humidity_max) || 0
      };
    };
    const getDurationFromConfig = () => {
      return "Autom\xE1tico (basado en sensores)";
    };
    watch(selectedCrop, (newCrop) => {
      if (newCrop) {
        loadCropThresholds();
      }
    }, { immediate: true });
    watch(automaticConfig, (newConfig) => {
      console.log("automaticConfig cambi\xF3:", !!newConfig);
      if (newConfig) {
        console.log("\u2705 Configuraci\xF3n autom\xE1tica activa detectada");
      }
    }, { deep: true });
    watch(() => irrigationStore.isWatering, (newValue, oldValue) => {
      if (!oldValue && newValue && irrigationStore.activeMode === "automatic") {
        console.log("\u{1F916} [AUTO] Riego activado autom\xE1ticamente detectado");
        showInfo("\u{1F916} Riego autom\xE1tico activado por condiciones ambientales");
      } else if (oldValue && !newValue && irrigationStore.activeMode === "automatic") {
        console.log("\u{1F916} [AUTO] Riego desactivado autom\xE1ticamente detectado");
        showSuccess("\u2705 Riego autom\xE1tico desactivado - condiciones \xF3ptimas alcanzadas");
      }
    }, { immediate: false });
    let statusMonitoringInterval = null;
    const startStatusMonitoring = () => {
      if (statusMonitoringInterval) {
        clearInterval(statusMonitoringInterval);
      }
      irrigationStore.loadActiveConfiguration();
      statusMonitoringInterval = setInterval();
      console.log("\u2705 [AUTO] Monitoreo de estado iniciado");
    };
    const stopStatusMonitoring = () => {
      if (statusMonitoringInterval) {
        clearInterval(statusMonitoringInterval);
        statusMonitoringInterval = null;
        console.log("\u{1F6D1} [AUTO] Monitoreo de estado detenido");
      }
    };
    watch(isWatering, (newValue) => {
      console.log("isWatering cambi\xF3 a:", newValue);
      if (newValue) {
        startStatusMonitoring();
      } else {
        stopStatusMonitoring();
      }
    }, { immediate: true });
    watch(isPaused, (newValue) => {
      console.log("isPaused cambi\xF3 a:", newValue);
    });
    watch(() => irrigationStore.activeMode, (newMode) => {
      if (newMode === "automatic" && isWatering.value) {
        startStatusMonitoring();
      } else if (newMode !== "automatic") {
        stopStatusMonitoring();
      }
    }, { immediate: true });
    useHead({
      title: "Modo Autom\xE1tico - VIVANTIA",
      meta: [
        { name: "description", content: "Configuraci\xF3n del modo autom\xE1tico de riego basado en sensores" }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-8" }, _attrs))}><div class="max-w-2xl mx-auto">`);
      if (unref(automaticConfig) && !unref(automaticConfig).is_active) {
        _push(`<div class="bg-gray-800 rounded-xl shadow-lg p-6 mb-8 border border-gray-700"><h2 class="text-xl font-bold text-white mb-6">Modo Autom\xE1tico Configurado</h2><div class="text-center space-y-6"><div class="flex justify-center"><div class="w-24 h-24 bg-purple-500 rounded-full flex items-center justify-center shadow-lg">`);
        _push(ssrRenderComponent(unref(AutomaticIcon), null, null, _parent));
        _push(`</div></div><div class="bg-purple-900/30 border border-purple-700/50 rounded-lg p-4"><h3 class="font-semibold text-purple-300 mb-3">Configuraci\xF3n del Modo Autom\xE1tico</h3><div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm"><div><p class="text-gray-400">Temperatura M\xE1xima:</p><p class="font-bold text-white">${ssrInterpolate(((_a = getThresholdsFromConfig()) == null ? void 0 : _a.maxTemperature) || 0)}\xB0C</p></div><div><p class="text-gray-400">Hum. Suelo Min:</p><p class="font-bold text-white">${ssrInterpolate(((_b = getThresholdsFromConfig()) == null ? void 0 : _b.minSoilHumidity) || 0)}%</p></div><div><p class="text-gray-400">Hum. Suelo Max:</p><p class="font-bold text-white">${ssrInterpolate(((_c = getThresholdsFromConfig()) == null ? void 0 : _c.maxSoilHumidity) || 0)}%</p></div><div><p class="text-gray-400">Hum. Aire Min:</p><p class="font-bold text-white">${ssrInterpolate(((_d = getThresholdsFromConfig()) == null ? void 0 : _d.minAirHumidity) || 0)}%</p></div><div><p class="text-gray-400">Hum. Aire Max:</p><p class="font-bold text-white">${ssrInterpolate(((_e = getThresholdsFromConfig()) == null ? void 0 : _e.maxAirHumidity) || 0)}%</p></div><div><p class="text-gray-400">Duraci\xF3n M\xE1xima:</p><p class="font-bold text-white">${ssrInterpolate(getDurationFromConfig())}</p></div><div><p class="text-gray-400">Estado de la Configuraci\xF3n:</p><p class="${ssrRenderClass([((_f = unref(automaticConfig)) == null ? void 0 : _f.is_active) ? "text-green-400" : "text-orange-400", "font-bold"])}">${ssrInterpolate(((_g = unref(automaticConfig)) == null ? void 0 : _g.is_active) ? "Activa (Riego iniciado)" : "Preparada (Esperando condiciones)")}</p></div></div></div><button class="w-full px-6 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold text-lg rounded-lg hover:from-red-600 hover:to-red-700 transform hover:scale-105 transition-all duration-200 shadow-lg"> \u{1F5D1}\uFE0F Deshacer Configuraci\xF3n </button></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (((_h = unref(automaticConfig)) == null ? void 0 : _h.is_active) && unref(isWatering) && !unref(isPaused)) {
        _push(`<div class="bg-gray-800 rounded-xl shadow-lg p-6 mb-8 border border-gray-700"><h2 class="text-xl font-bold text-white mb-6">Riego Autom\xE1tico Activo</h2><div class="text-center space-y-6"><div class="flex justify-center"><div class="w-24 h-24 bg-purple-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">`);
        _push(ssrRenderComponent(unref(WaterDropIcon), null, null, _parent));
        _push(`</div></div><div class="bg-purple-900/30 border border-purple-700/50 rounded-lg p-4"><h3 class="font-semibold text-purple-300 mb-3">Informaci\xF3n del Riego</h3><div class="grid grid-cols-2 gap-4 text-sm"><div><p class="text-gray-400">Estado:</p><p class="font-bold text-white">Bomba Activa</p></div><div><p class="text-gray-400">Estado:</p><p class="font-bold text-white">Riego Activo</p></div></div></div><div class="space-y-3"><button class="w-full px-6 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-bold text-lg rounded-lg hover:from-yellow-600 hover:to-yellow-700 transform hover:scale-105 transition-all duration-200 shadow-lg"> \u23F8\uFE0F Parada de Emergencia </button><button class="w-full px-6 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold text-lg rounded-lg hover:from-red-600 hover:to-red-700 transform hover:scale-105 transition-all duration-200 shadow-lg"> \u{1F6D1} Cancelar Riego Autom\xE1tico </button></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (((_i = unref(automaticConfig)) == null ? void 0 : _i.is_active) && unref(isPaused)) {
        _push(`<div class="bg-gray-800 rounded-xl shadow-lg p-6 mb-8 border border-gray-700"><div class="text-xs text-gray-500 mb-2"> Debug: isAutomaticActive=${ssrInterpolate(_ctx.isAutomaticActive)}, isWatering=${ssrInterpolate(unref(isWatering))}, isPaused=${ssrInterpolate(unref(isPaused))}, modeConfig=${ssrInterpolate(!!_ctx.modeConfig)}</div><h2 class="text-xl font-bold text-white mb-6">Riego Autom\xE1tico Pausado</h2><div class="text-center space-y-6"><div class="flex justify-center"><div class="w-24 h-24 bg-yellow-500 rounded-full flex items-center justify-center shadow-lg">`);
        _push(ssrRenderComponent(unref(PauseIcon), null, null, _parent));
        _push(`</div></div><div class="bg-purple-900/30 border border-purple-700/50 rounded-lg p-4"><h3 class="font-semibold text-purple-300 mb-3">Informaci\xF3n del Riego</h3><div class="grid grid-cols-2 gap-4 text-sm"><div><p class="text-gray-400">Estado:</p><p class="font-bold text-white">Pausado</p></div><div><p class="text-gray-400">Estado:</p><p class="font-bold text-white">Riego Activo</p></div></div></div><div class="space-y-3"><button class="w-full px-6 py-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-bold text-lg rounded-lg hover:from-purple-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg"> \u25B6\uFE0F Reanudar Riego </button><button class="w-full px-6 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold text-lg rounded-lg hover:from-red-600 hover:to-red-700 transform hover:scale-105 transition-all duration-200 shadow-lg"> \u{1F6D1} Cancelar Riego Autom\xE1tico </button></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="bg-gray-800 rounded-xl shadow-lg p-6 mb-8 border border-gray-700"><div class="flex items-center mb-4"><div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mr-4 shadow-lg">`);
      _push(ssrRenderComponent(unref(AutomaticIcon), null, null, _parent));
      _push(`</div><div><h1 class="text-2xl font-bold text-white">Modo Autom\xE1tico</h1><p class="text-gray-300">Riego inteligente basado en sensores</p></div></div><div class="bg-purple-900/30 border border-purple-700/50 rounded-lg p-4"><h3 class="font-semibold text-purple-300 mb-2">\xBFC\xF3mo funciona el modo autom\xE1tico?</h3><ul class="text-sm text-purple-200 space-y-1"><li>\u2022 Monitorea par\xE1metros de temperatura y humedad en tiempo real</li><li>\u2022 Activa el riego cuando se cumplen los umbrales configurados</li><li>\u2022 Evita el desperdicio de agua</li><li>\u2022 Ideal para una gesti\xF3n inteligente del cultivo</li></ul></div><div class="bg-yellow-900/30 border border-yellow-500/30 rounded-lg p-4 mt-4"><h3 class="font-semibold text-yellow-400 mb-2">\u26A0\uFE0F Advertencia Importante</h3><p class="text-sm text-yellow-300"><strong>Tiempo de respuesta del sistema:</strong> La bomba puede tardar entre 2-15 segundos en activarse al iniciar el riego y entre 2-15 segundos en detenerse al cancelar o pausar. Este tiempo es normal debido a la comunicaci\xF3n LoRaWAN con el dispositivo IoT. </p></div></div><div class="bg-gray-800 rounded-xl shadow-lg p-6 mb-8 border border-gray-700"><h2 class="text-xl font-bold text-white mb-4">Estado Actual de Sensores</h2>`);
      if (unref(lastSensorUpdate)) {
        _push(`<div class="text-xs text-gray-400 mb-4"> \xDAltima actualizaci\xF3n: ${ssrInterpolate(new Date(unref(lastSensorUpdate)).toLocaleString("es-ES"))}</div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(lastSensorUpdate)) {
        _push(`<div class="grid grid-cols-1 md:grid-cols-3 gap-6"><div class="bg-gradient-to-br from-red-900/30 to-orange-900/30 p-4 rounded-lg border border-red-700/50"><div class="flex items-center justify-between mb-2"><h3 class="font-medium text-red-300">Temperatura</h3>`);
        _push(ssrRenderComponent(unref(ThermometerIcon), { class: "text-gray-300" }, null, _parent));
        _push(`</div><p class="text-3xl font-bold text-red-200">${ssrInterpolate(unref(currentTemperature).toFixed(1))}\xB0C</p><p class="text-sm text-red-300 mt-1">${ssrInterpolate(getTemperatureStatus())}</p></div><div class="bg-gradient-to-br from-blue-900/30 to-blue-800/30 p-4 rounded-lg border border-blue-700/50"><div class="flex items-center justify-between mb-2"><h3 class="font-medium text-blue-300">Humedad Suelo</h3>`);
        _push(ssrRenderComponent(unref(HumidityIcon), { class: "text-gray-300" }, null, _parent));
        _push(`</div><p class="text-3xl font-bold text-blue-200">${ssrInterpolate(unref(currentSoilHumidity).toFixed(1))}%</p><p class="text-sm text-blue-300 mt-1">${ssrInterpolate(getSoilHumidityStatus())}</p></div><div class="bg-gradient-to-br from-cyan-900/30 to-teal-900/30 p-4 rounded-lg border border-cyan-700/50"><div class="flex items-center justify-between mb-2"><h3 class="font-medium text-cyan-300">Humedad Aire</h3>`);
        _push(ssrRenderComponent(unref(HumidityIcon), { class: "text-gray-300" }, null, _parent));
        _push(`</div><p class="text-3xl font-bold text-cyan-200">${ssrInterpolate(unref(currentAirHumidity).toFixed(1))}%</p><p class="text-sm text-cyan-300 mt-1">${ssrInterpolate(getAirHumidityStatus())}</p></div></div>`);
      } else {
        _push(`<div class="text-center text-gray-400 py-8"><p>\u{1F4E1} Cargando datos de sensores...</p><p class="text-sm mt-2">Aseg\xFArate de que tu dispositivo IoT est\xE9 enviando datos.</p></div>`);
      }
      _push(`</div><div class="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700"><h2 class="text-xl font-bold text-white mb-6">Configurar Umbrales Autom\xE1ticos</h2><form class="space-y-6"><div><label class="block text-sm font-medium text-gray-300 mb-4"> Umbrales de Temperatura </label><div class="bg-red-900/30 border border-red-700/50 rounded-lg p-4 mb-4"><h4 class="font-medium text-red-300 mb-3">Temperatura M\xE1xima</h4><div class="flex items-center space-x-4"><input${ssrRenderAttr("value", unref(thresholds).maxTemperature)} type="number" min="15" max="45" step="0.5" class="w-24 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"><span class="text-sm text-gray-300">\xB0C</span><div class="flex-1"><input${ssrRenderAttr("value", unref(thresholds).maxTemperature)} type="range" min="15" max="45" step="0.5" class="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"></div></div><p class="text-xs text-red-300 mt-2">Se activar\xE1 el riego cuando la temperatura supere este valor</p></div></div><div><label class="block text-sm font-medium text-gray-300 mb-4"> Umbrales de Humedad del Suelo </label><div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div class="bg-blue-900/30 border border-blue-700/50 rounded-lg p-4"><h4 class="font-medium text-blue-300 mb-3">Humedad Suelo M\xEDnima</h4><div class="flex items-center space-x-4"><input${ssrRenderAttr("value", unref(thresholds).minSoilHumidity)} type="number" min="0" max="100" class="w-20 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"><span class="text-sm text-gray-300">%</span></div><input${ssrRenderAttr("value", unref(thresholds).minSoilHumidity)} type="range" min="0" max="100" class="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider mt-2"><p class="text-xs text-blue-300 mt-2">Se activar\xE1 el riego cuando baje de este valor</p></div><div class="bg-cyan-900/30 border border-cyan-700/50 rounded-lg p-4"><h4 class="font-medium text-cyan-300 mb-3">Humedad Suelo M\xE1xima</h4><div class="flex items-center space-x-4"><input${ssrRenderAttr("value", unref(thresholds).maxSoilHumidity)} type="number" min="0" max="100" class="w-20 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"><span class="text-sm text-gray-300">%</span></div><input${ssrRenderAttr("value", unref(thresholds).maxSoilHumidity)} type="range" min="0" max="100" class="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider mt-2"><p class="text-xs text-cyan-300 mt-2">Se detendr\xE1 el riego al alcanzar este valor</p></div></div></div><div><label class="block text-sm font-medium text-gray-300 mb-4"> Umbrales de Humedad del Aire </label><div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div class="bg-teal-900/30 border border-teal-700/50 rounded-lg p-4"><h4 class="font-medium text-teal-300 mb-3">Humedad Aire M\xEDnima</h4><div class="flex items-center space-x-4"><input${ssrRenderAttr("value", unref(thresholds).minAirHumidity)} type="number" min="0" max="100" class="w-20 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"><span class="text-sm text-gray-300">%</span></div><input${ssrRenderAttr("value", unref(thresholds).minAirHumidity)} type="range" min="0" max="100" class="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider mt-2"><p class="text-xs text-teal-300 mt-2">Se activar\xE1 el riego cuando baje de este valor</p></div><div class="bg-emerald-900/30 border border-emerald-700/50 rounded-lg p-4"><h4 class="font-medium text-emerald-300 mb-3">Humedad Aire M\xE1xima</h4><div class="flex items-center space-x-4"><input${ssrRenderAttr("value", unref(thresholds).maxAirHumidity)} type="number" min="0" max="100" class="w-20 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"><span class="text-sm text-gray-300">%</span></div><input${ssrRenderAttr("value", unref(thresholds).maxAirHumidity)} type="range" min="0" max="100" class="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider mt-2"><p class="text-xs text-emerald-300 mt-2">\xDAtil para control adicional basado en humedad ambiental</p></div></div></div><div><label class="block text-sm font-medium text-gray-300 mb-2"> Funcionamiento Autom\xE1tico </label><div class="bg-green-900/30 border border-green-700/50 rounded-lg p-4"><div class="flex items-center space-x-3 mb-3"><div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">`);
      _push(ssrRenderComponent(unref(CheckIcon), { class: "w-5 h-5 text-white" }, null, _parent));
      _push(`</div><h4 class="font-medium text-green-300">Riego Inteligente</h4></div><p class="text-sm text-green-200 mb-2"> El sistema activar\xE1 y desactivar\xE1 el riego autom\xE1ticamente bas\xE1ndose en: </p><ul class="text-xs text-green-300 space-y-1"><li>\u2022 <strong>Activaci\xF3n:</strong> Temperatura alta + (Humedad suelo baja O Humedad aire baja)</li><li>\u2022 <strong>Desactivaci\xF3n:</strong> Humedad del suelo alcanza el nivel \xF3ptimo</li><li>\u2022 <strong>Sin duraci\xF3n fija:</strong> El riego se ajusta a las condiciones reales</li></ul></div></div><div class="bg-purple-900/30 border border-purple-700/50 rounded-lg p-4"><h3 class="font-medium text-purple-300 mb-2">Vista Previa de Configuraci\xF3n</h3><div class="text-sm text-purple-200 space-y-1"><p><strong>Temperatura m\xE1xima:</strong> ${ssrInterpolate(unref(thresholds).maxTemperature)}\xB0C</p><p><strong>Humedad suelo objetivo:</strong> ${ssrInterpolate(unref(thresholds).minSoilHumidity)}% - ${ssrInterpolate(unref(thresholds).maxSoilHumidity)}%</p><p><strong>Humedad aire objetivo:</strong> ${ssrInterpolate(unref(thresholds).minAirHumidity)}% - ${ssrInterpolate(unref(thresholds).maxAirHumidity)}%</p><p><strong>Cultivo seleccionado:</strong> ${ssrInterpolate(((_j = unref(selectedCrop)) == null ? void 0 : _j.name) || "Ninguno")}</p><p><strong>Dispositivo activo:</strong> ${ssrInterpolate(((_k = unref(activeDevice)) == null ? void 0 : _k.device_name) || "Ninguno")}</p><p><strong>Estado actual:</strong> ${ssrInterpolate(getCurrentConditionStatus())}</p></div></div><div class="flex space-x-4"><button type="submit"${ssrIncludeBooleanAttr(!isValidConfiguration()) ? " disabled" : ""} class="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-medium rounded-lg hover:from-purple-700 hover:to-purple-800 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed transition-all duration-200 shadow-lg"> Guardar Configuraci\xF3n </button><button type="button" class="px-6 py-3 bg-gray-600 text-gray-300 font-medium rounded-lg hover:bg-gray-700 transition-colors"> Cancelar </button></div></form></div></div>`);
      if (unref(showConfirmModal)) {
        _push(`<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"><div class="bg-gray-800 p-6 rounded-xl max-w-md w-full mx-4 border border-gray-700"><div class="text-center"><div class="w-16 h-16 bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4 border border-purple-700/50">`);
        _push(ssrRenderComponent(unref(AutomaticConfirmIcon), null, null, _parent));
        _push(`</div><h3 class="text-lg font-bold text-white mb-2">Confirmar Configuraci\xF3n Autom\xE1tica</h3><p class="text-gray-300 mb-6"> \xBFEst\xE1s seguro de que quieres configurar el modo autom\xE1tico con estos par\xE1metros? <br><br><strong>Temperatura m\xE1xima:</strong> ${ssrInterpolate(unref(thresholds).maxTemperature)}\xB0C<br><strong>Humedad suelo:</strong> ${ssrInterpolate(unref(thresholds).minSoilHumidity)}% - ${ssrInterpolate(unref(thresholds).maxSoilHumidity)}%<br><strong>Humedad aire:</strong> ${ssrInterpolate(unref(thresholds).minAirHumidity)}% - ${ssrInterpolate(unref(thresholds).maxAirHumidity)}%<br><strong>Funcionamiento:</strong> Autom\xE1tico (basado en sensores) </p><div class="flex space-x-4"><button class="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-200"> Confirmar Configuraci\xF3n </button><button class="flex-1 px-4 py-2 bg-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"> Cancelar </button></div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(showCancelModal)) {
        _push(`<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"><div class="bg-gray-800 border border-gray-600/30 p-6 rounded-xl max-w-md w-full mx-4"><div class="text-center"><div class="w-16 h-16 bg-red-900/60 border border-red-500/30 rounded-full flex items-center justify-center mx-auto mb-4">`);
        _push(ssrRenderComponent(unref(WarningIcon), null, null, _parent));
        _push(`</div><h3 class="text-lg font-bold text-white mb-2">Cancelar Configuraci\xF3n Autom\xE1tica</h3><p class="text-gray-300 mb-6"> \xBFEst\xE1s seguro de que quieres cancelar la configuraci\xF3n autom\xE1tica? <br><br><strong class="text-red-400">El sistema dejar\xE1 de monitorear los sensores autom\xE1ticamente.</strong></p><div class="flex space-x-4"><button class="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"> S\xED, Cancelar Configuraci\xF3n </button><button class="flex-1 px-4 py-2 bg-gray-600 text-gray-200 rounded-lg hover:bg-gray-500 transition-colors"> No, Mantener </button></div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/modo/automatico.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=automatico-Bc7wwyJN.mjs.map
