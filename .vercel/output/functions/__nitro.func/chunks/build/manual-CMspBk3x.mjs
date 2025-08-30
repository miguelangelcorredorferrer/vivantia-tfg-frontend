import { ref, watch, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderList, ssrLooseContain } from 'vue/server-renderer';
import { u as useToastNotifications } from './useToastNotifications-DaJGJiXK.mjs';
import { u as useIrrigationStore, s as setInterval } from './irrigation-EKMz8LaT.mjs';
import { u as useUserStore } from './user-BEdD-0tD.mjs';
import { u as useCropStore } from './crop-CoogIRpZ.mjs';
import { P as PauseIcon, W as WaterDropIcon } from './WaterDropIcon-Cj5g3qH2.mjs';
import { W as WarningIcon } from './WarningIcon-CqMZlVzn.mjs';
import { u as useRouter, _ as _export_sfc } from './server.mjs';
import { u as useHead } from './v3-DHK4yxVL.mjs';
import 'pinia';
import './CropAPI-Cg4msNVy.mjs';
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
    fill: "currentColor",
    viewBox: "0 0 24 24"
  }, _attrs))}><path fill-rule="evenodd" clip-rule="evenodd" d="M13.5 3C13.2239 3 13 3.22386 13 3.5V12C13 12.5523 12.5523 13 12 13C11.4477 13 11 12.5523 11 12V5.5C11 5.22386 10.7761 5 10.5 5C10.2239 5 9.99999 5.22386 9.99999 5.5V13.9677C9.99999 15.0757 8.62655 15.5918 7.8969 14.7579L5.34951 11.8466C5.19167 11.6662 4.95459 11.576 4.71675 11.6057C4.15329 11.6761 3.88804 12.3395 4.24762 12.779L8.93807 18.5118C10.2266 20.0867 12.154 21 14.1888 21C17.3982 21 20 18.3982 20 15.1888V7.5C20 7.22386 19.7761 7 19.5 7C19.2239 7 19 7.22386 19 7.5V12C19 12.5523 18.5523 13 18 13C17.4477 13 17 12.5523 17 12V5.5C17 5.22386 16.7761 5 16.5 5C16.2239 5 16 5.22386 16 5.5V12C16 12.5523 15.5523 13 15 13C14.4477 13 14 12.5523 14 12V3.5C14 3.22386 13.7761 3 13.5 3ZM15.9611 3.05823C15.7525 1.88823 14.73 1 13.5 1C12.27 1 11.2475 1.88823 11.0389 3.05823C10.8653 3.0201 10.685 3 10.5 3C9.11928 3 7.99999 4.11929 7.99999 5.5V11.8386L6.85467 10.5296C6.2595 9.84942 5.36551 9.50903 4.46868 9.62113C2.34401 9.88672 1.34381 12.3883 2.6997 14.0455L7.39016 19.7783C9.05854 21.8174 11.5541 23 14.1888 23C18.5028 23 22 19.5028 22 15.1888V7.5C22 6.11929 20.8807 5 19.5 5C19.315 5 19.1347 5.0201 18.9611 5.05823C18.7525 3.88823 17.73 3 16.5 3C16.315 3 16.1347 3.0201 15.9611 3.05823Z"></path></svg>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("assets/icons/ManualIcon.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const ManualIcon = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender$1]]);
const _sfc_main$1 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<svg${ssrRenderAttrs(mergeProps({
    class: "w-8 h-8 text-blue-400",
    fill: "currentColor",
    viewBox: "0 0 20 20"
  }, _attrs))}><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("assets/icons/ManualConfirmIcon.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const ManualConfirmIcon = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main = {
  __name: "manual",
  __ssrInlineRender: true,
  setup(__props) {
    const irrigationStore = useIrrigationStore();
    useUserStore();
    useCropStore();
    const duration = ref({
      minutes: 5,
      seconds: 0
    });
    const options = ref({
      notifyStart: true,
      notifyEnd: true
    });
    const showConfirmModal = ref(false);
    const showCancelModal = ref(false);
    const quickOptions = [
      { label: "2 min", minutes: 2, seconds: 0 },
      { label: "5 min", minutes: 5, seconds: 0 },
      { label: "10 min", minutes: 10, seconds: 0 },
      { label: "15 min", minutes: 15, seconds: 0 }
    ];
    const { toast } = useToastNotifications();
    useRouter();
    const formatTotalDuration = () => {
      const totalMinutes = duration.value.minutes || 0;
      const totalSeconds = duration.value.seconds || 0;
      if (totalMinutes === 0 && totalSeconds === 0) {
        return "No configurado";
      }
      let result = "";
      if (totalMinutes > 0) {
        result += `${totalMinutes} min`;
      }
      if (totalSeconds > 0) {
        result += `${result ? " " : ""}${totalSeconds} seg`;
      }
      return result;
    };
    const calculateVolume = () => {
      const totalMinutes = (duration.value.minutes || 0) + (duration.value.seconds || 0) / 60;
      const flowRate = 2.5;
      return (totalMinutes * flowRate).toFixed(1);
    };
    const isValidDuration = () => {
      return duration.value.minutes > 0 || duration.value.seconds > 0;
    };
    let statusInterval = null;
    const startStatusMonitoring = () => {
      if (statusInterval) {
        clearInterval(statusInterval);
      }
      const updateStatus = async () => {
        try {
          await irrigationStore.loadActiveConfiguration();
        } catch (error) {
          console.error("\u{1F504} [MANUAL] Error actualizando estado:", error);
        }
      };
      updateStatus();
      statusInterval = setInterval();
    };
    const stopStatusMonitoring = () => {
      if (statusInterval) {
        clearInterval(statusInterval);
        statusInterval = null;
      }
    };
    watch(() => irrigationStore.hasActiveMode, (newValue) => {
      console.log("\u{1F504} [MANUAL] hasActiveMode cambi\xF3 a:", newValue);
    });
    watch(() => irrigationStore.isManualActive, (newValue) => {
      console.log("\u{1F504} [MANUAL] isManualActive cambi\xF3 a:", newValue);
      if (newValue || irrigationStore.isWatering) {
        startStatusMonitoring();
      } else if (!newValue) {
        stopStatusMonitoring();
      }
    }, { immediate: true });
    watch(() => irrigationStore.isWatering, (newValue) => {
      console.log("\u{1F504} [MANUAL] isWatering cambi\xF3 a:", newValue);
      if (newValue || irrigationStore.isManualActive) {
        startStatusMonitoring();
      } else if (!newValue) {
        stopStatusMonitoring();
      }
    }, { immediate: true });
    watch(() => irrigationStore.activeMode, (newValue) => {
      console.log("\u{1F504} [MANUAL] activeMode cambi\xF3 a:", newValue);
      if (newValue === "manual") {
        startStatusMonitoring();
      } else if (newValue !== "manual") {
        stopStatusMonitoring();
      }
    }, { immediate: true });
    useHead({
      title: "Modo Manual - VIVANTIA",
      meta: [
        { name: "description", content: "Configuraci\xF3n del modo manual de riego" }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-8" }, _attrs))}><div class="max-w-2xl mx-auto"><div class="bg-gray-900/60 border border-gray-600/30 rounded-xl shadow-lg p-6 mb-8 hover:bg-gray-900/80 transition-colors"><div class="flex items-center mb-4"><div class="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-4 shadow-lg">`);
      _push(ssrRenderComponent(unref(ManualIcon), null, null, _parent));
      _push(`</div><div><h1 class="text-2xl font-bold text-white">Modo Manual</h1><p class="text-gray-300">Control directo del sistema de riego</p></div></div><div class="bg-blue-900/30 border border-blue-500/30 rounded-lg p-4"><h3 class="font-semibold text-blue-400 mb-2">\xBFC\xF3mo funciona el modo manual?</h3><ul class="text-sm text-blue-300 space-y-1"><li>\u2022 Activa la bomba inmediatamente al confirmar</li><li>\u2022 Configura la duraci\xF3n exacta del riego</li><li>\u2022 Ideal para riegos puntuales o de emergencia</li></ul></div><div class="bg-yellow-900/30 border border-yellow-500/30 rounded-lg p-4 mt-4"><h3 class="font-semibold text-yellow-400 mb-2">\u26A0\uFE0F Advertencia Importante</h3><p class="text-sm text-yellow-300"><strong>Tiempo de respuesta del sistema:</strong> La bomba puede tardar entre 2-15 segundos en activarse al iniciar el riego y entre 2-15 segundos en detenerse al cancelar o pausar. Este tiempo es normal debido a la comunicaci\xF3n LoRaWAN con el dispositivo IoT. </p></div></div>`);
      if (unref(irrigationStore).isManualActive && (unref(irrigationStore).isWatering || unref(irrigationStore).isPaused)) {
        _push(`<div class="bg-gray-900/60 border border-gray-600/30 rounded-xl shadow-lg p-6 hover:bg-gray-900/80 transition-colors mb-6"><h2 class="text-xl font-bold text-white mb-6">Riego Manual ${ssrInterpolate(unref(irrigationStore).isPaused ? "Pausado" : "Activo")}</h2><div class="text-center space-y-6"><div class="flex justify-center"><div class="${ssrRenderClass([
          "w-24 h-24 rounded-full flex items-center justify-center shadow-lg",
          unref(irrigationStore).isPaused ? "bg-yellow-500" : "bg-blue-500 animate-pulse"
        ])}">`);
        if (unref(irrigationStore).isPaused) {
          _push(ssrRenderComponent(unref(PauseIcon), null, null, _parent));
        } else {
          _push(ssrRenderComponent(unref(WaterDropIcon), null, null, _parent));
        }
        _push(`</div></div><div class="bg-blue-900/30 border border-blue-500/30 rounded-lg p-4"><h3 class="font-semibold text-blue-400 mb-3">Informaci\xF3n del Riego</h3><div class="grid grid-cols-2 gap-4 text-sm"><div><p class="text-gray-400">Estado:</p><p class="font-bold text-white">${ssrInterpolate(unref(irrigationStore).isPaused ? "Pausado" : "Bomba Activa")}</p></div><div><p class="text-gray-400">Tiempo Restante:</p><p class="font-bold text-white">${ssrInterpolate(unref(irrigationStore).remainingTime || "Calculando...")}</p></div></div></div><div class="space-y-3">`);
        if (!unref(irrigationStore).isPaused) {
          _push(`<button class="w-full px-6 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-bold text-lg rounded-lg hover:from-yellow-600 hover:to-yellow-700 transform hover:scale-105 transition-all duration-200 shadow-lg"> \u23F8\uFE0F Parada de Emergencia </button>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(irrigationStore).isPaused) {
          _push(`<button class="w-full px-6 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold text-lg rounded-lg hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all duration-200 shadow-lg"> \u25B6\uFE0F Reanudar Riego </button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<button class="w-full px-6 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold text-lg rounded-lg hover:from-red-600 hover:to-red-700 transform hover:scale-105 transition-all duration-200 shadow-lg"> \u{1F6D1} Cancelar Riego Manual </button></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (!unref(irrigationStore).hasActiveMode) {
        _push(`<div class="bg-gray-900/60 border border-gray-600/30 rounded-xl shadow-lg p-6 hover:bg-gray-900/80 transition-colors"><h2 class="text-xl font-bold text-white mb-6">Configurar Riego Manual</h2><div class="bg-blue-900/30 border border-blue-500/30 rounded-lg p-4 mb-6"><h3 class="font-semibold text-blue-400 mb-2">\u{1F4A1} Informaci\xF3n Importante</h3><p class="text-sm text-blue-300"> Si ya has configurado un riego manual para este cultivo, la configuraci\xF3n se actualizar\xE1 con los nuevos valores. Esto te permite hacer m\xFAltiples riegos con diferentes duraciones sin crear configuraciones duplicadas. </p></div><form class="space-y-6"><div><label class="block text-sm font-medium text-gray-300 mb-2"> Duraci\xF3n del Riego </label><div class="grid grid-cols-2 gap-4"><div><label class="block text-xs text-gray-400 mb-1">Minutos</label><input${ssrRenderAttr("value", unref(duration).minutes)} type="number" min="0" max="59"${ssrIncludeBooleanAttr(unref(irrigationStore).isLoading) ? " disabled" : ""} class="w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50" placeholder="0"></div><div><label class="block text-xs text-gray-400 mb-1">Segundos</label><input${ssrRenderAttr("value", unref(duration).seconds)} type="number" min="0" max="59"${ssrIncludeBooleanAttr(unref(irrigationStore).isLoading) ? " disabled" : ""} class="w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50" placeholder="0"></div></div><p class="text-sm text-gray-400 mt-2"> Duraci\xF3n total: <span class="font-semibold text-white">${ssrInterpolate(formatTotalDuration())}</span></p></div><div><label class="block text-sm font-medium text-gray-300 mb-3"> Opciones R\xE1pidas </label><div class="grid grid-cols-2 md:grid-cols-4 gap-3"><!--[-->`);
        ssrRenderList(quickOptions, (option) => {
          _push(`<button type="button"${ssrIncludeBooleanAttr(unref(irrigationStore).isLoading) ? " disabled" : ""} class="p-3 text-sm font-medium text-blue-300 bg-blue-900/30 border border-blue-500/30 rounded-lg hover:bg-blue-900/50 transition-colors disabled:opacity-50">${ssrInterpolate(option.label)}</button>`);
        });
        _push(`<!--]--></div></div><div class="bg-gray-800/60 border border-gray-600/30 rounded-lg p-4"><h3 class="font-medium text-gray-300 mb-3">Configuraci\xF3n Adicional</h3><div class="space-y-3"><label class="flex items-center"><input${ssrIncludeBooleanAttr(Array.isArray(unref(options).notifyStart) ? ssrLooseContain(unref(options).notifyStart, null) : unref(options).notifyStart) ? " checked" : ""} type="checkbox"${ssrIncludeBooleanAttr(unref(irrigationStore).isLoading) ? " disabled" : ""} class="rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-blue-500 disabled:opacity-50"><span class="ml-2 text-sm text-gray-300">Notificar al iniciar el riego</span></label><label class="flex items-center"><input${ssrIncludeBooleanAttr(Array.isArray(unref(options).notifyEnd) ? ssrLooseContain(unref(options).notifyEnd, null) : unref(options).notifyEnd) ? " checked" : ""} type="checkbox"${ssrIncludeBooleanAttr(unref(irrigationStore).isLoading) ? " disabled" : ""} class="rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-blue-500 disabled:opacity-50"><span class="ml-2 text-sm text-gray-300">Notificar al finalizar el riego</span></label></div></div><div class="bg-yellow-900/30 border border-yellow-500/30 rounded-lg p-4"><h3 class="font-medium text-yellow-400 mb-2">Vista Previa</h3><div class="text-sm text-yellow-300 space-y-1"><p><strong>Duraci\xF3n:</strong> ${ssrInterpolate(formatTotalDuration())}</p><p><strong>Inicio:</strong> Inmediato al confirmar</p><p><strong>Caudal estimado:</strong> 2.5 L/min</p><p><strong>Volumen total:</strong> ${ssrInterpolate(calculateVolume())} L</p></div></div><div class="flex space-x-4"><button type="submit"${ssrIncludeBooleanAttr(!isValidDuration() || unref(irrigationStore).isLoading) ? " disabled" : ""} class="flex-1 px-6 py-4 bg-gradient-to-r from-[#4A5DB8] to-[#2A3B7A] text-white font-bold text-lg rounded-lg hover:from-[#5A6DC8] hover:to-[#3A4B8A] disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-200 shadow-lg">${ssrInterpolate(unref(irrigationStore).isLoading ? "\u{1F504} Iniciando..." : "\u{1F680} Iniciar Riego Manual")}</button><button type="button"${ssrIncludeBooleanAttr(unref(irrigationStore).isLoading) ? " disabled" : ""} class="px-6 py-3 bg-gray-600 text-gray-200 font-medium rounded-lg hover:bg-gray-500 transition-colors disabled:opacity-50"> Cancelar </button></div></form></div>`);
      } else {
        _push(`<div class="bg-orange-900/60 border border-orange-500/30 rounded-xl shadow-lg p-6"><div class="text-center"><div class="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">`);
        _push(ssrRenderComponent(unref(WarningIcon), null, null, _parent));
        _push(`</div><h3 class="text-lg font-bold text-white mb-2">Modo ${ssrInterpolate(unref(irrigationStore).activeMode)} Activo</h3><p class="text-orange-300 mb-4"> Ya tienes un modo de riego activo. Debes cancelar la configuraci\xF3n actual antes de poder configurar el modo manual. </p><div class="bg-orange-800/40 border border-orange-500/40 rounded-lg p-3 mb-4"><p class="text-sm text-orange-200"><strong>\xDAltimo riego:</strong> ${ssrInterpolate(unref(irrigationStore).lastIrrigation)}</p></div><button class="px-6 py-3 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-700 transition-colors"> Volver a Modos de Riego </button></div></div>`);
      }
      _push(`</div>`);
      if (unref(showConfirmModal)) {
        _push(`<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"><div class="bg-gray-800 border border-gray-600/30 p-6 rounded-xl max-w-md w-full mx-4"><div class="text-center"><div class="w-16 h-16 bg-blue-900/60 border border-blue-500/30 rounded-full flex items-center justify-center mx-auto mb-4">`);
        _push(ssrRenderComponent(unref(ManualConfirmIcon), null, null, _parent));
        _push(`</div><h3 class="text-lg font-bold text-white mb-2">Confirmar Riego Manual</h3><p class="text-gray-300 mb-6"> \xBFEst\xE1s seguro de que quieres iniciar el riego manual por ${ssrInterpolate(formatTotalDuration())}? <br><br><strong>La bomba se activar\xE1 inmediatamente.</strong></p><div class="flex space-x-4"><button class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"> Confirmar e Iniciar </button><button class="flex-1 px-4 py-2 bg-gray-600 text-gray-200 rounded-lg hover:bg-gray-500 transition-colors"> Cancelar </button></div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(showCancelModal)) {
        _push(`<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"><div class="bg-gray-800 border border-gray-600/30 p-6 rounded-xl max-w-md w-full mx-4"><div class="text-center"><div class="w-16 h-16 bg-red-900/60 border border-red-500/30 rounded-full flex items-center justify-center mx-auto mb-4">`);
        _push(ssrRenderComponent(unref(WarningIcon), null, null, _parent));
        _push(`</div><h3 class="text-lg font-bold text-white mb-2">Cancelar Riego Manual</h3><p class="text-gray-300 mb-6"> \xBFEst\xE1s seguro de que quieres cancelar el riego manual? <br><br><strong class="text-red-400">La bomba se detendr\xE1 inmediatamente.</strong></p><div class="flex space-x-4"><button class="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"> S\xED, Cancelar Riego </button><button class="flex-1 px-4 py-2 bg-gray-600 text-gray-200 rounded-lg hover:bg-gray-500 transition-colors"> No, Continuar </button></div></div></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/modo/manual.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=manual-CMspBk3x.mjs.map
