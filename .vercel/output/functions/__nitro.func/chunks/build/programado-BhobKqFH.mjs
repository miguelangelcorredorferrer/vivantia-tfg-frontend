import { ref, computed, watch, resolveComponent, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from 'vue/server-renderer';
import { u as useToastNotifications } from './useToastNotifications-DaJGJiXK.mjs';
import { u as useIrrigationStore, s as setInterval } from './irrigation-EKMz8LaT.mjs';
import { u as useUserStore } from './user-BEdD-0tD.mjs';
import { u as useCropStore } from './crop-CoogIRpZ.mjs';
import { u as useRouter, _ as _export_sfc } from './server.mjs';
import { W as WaterDropIcon, P as PauseIcon } from './WaterDropIcon-Cj5g3qH2.mjs';
import { C as ChevronLeftIcon } from './ChevronLeftIcon-D8BDUlIz.mjs';
import { W as WarningIcon } from './WarningIcon-CqMZlVzn.mjs';
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

const _sfc_main$4 = {};
function _sfc_ssrRender$3(_ctx, _push, _parent, _attrs) {
  _push(`<svg${ssrRenderAttrs(mergeProps({
    class: "w-12 h-12 text-white",
    fill: "currentColor",
    viewBox: "0 0 20 20"
  }, _attrs))}><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"></path></svg>`);
}
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("assets/icons/ClockIcon.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const ClockIcon = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["ssrRender", _sfc_ssrRender$3]]);
const _sfc_main$3 = {};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs) {
  _push(`<svg${ssrRenderAttrs(mergeProps({
    class: "w-6 h-6 text-white",
    fill: "currentColor",
    viewBox: "0 0 20 20"
  }, _attrs))}><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>`);
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("assets/icons/CalendarIcon.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const CalendarIcon = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["ssrRender", _sfc_ssrRender$2]]);
const _sfc_main$2 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  _push(`<svg${ssrRenderAttrs(mergeProps({
    class: "w-5 h-5",
    fill: "currentColor",
    viewBox: "0 0 20 20"
  }, _attrs))}><path fill-rule="evenodd" d="7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("assets/icons/ChevronRightSmallIcon.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const ChevronRightSmallIcon = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender$1]]);
const _sfc_main$1 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<svg${ssrRenderAttrs(mergeProps({
    class: "w-8 h-8 text-green-400",
    fill: "currentColor",
    viewBox: "0 0 20 20"
  }, _attrs))}><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"></path></svg>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("assets/icons/ConfirmIcon.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const ConfirmIcon = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main = {
  __name: "programado",
  __ssrInlineRender: true,
  setup(__props) {
    const irrigationStore = useIrrigationStore();
    useUserStore();
    useCropStore();
    ref(/* @__PURE__ */ new Date());
    const scheduledTime = ref({
      hour: 7,
      minute: 0
    });
    const duration = ref({
      minutes: 5
    });
    const frequency = ref("once");
    const selectedDays = ref([]);
    const options = ref({
      notifyBeforeStart: true,
      notifyStart: true,
      notifyEnd: true
    });
    const showConfirmModal = ref(false);
    const showCancelModal = ref(false);
    const showCancelActiveModal = ref(false);
    const currentDate = ref(/* @__PURE__ */ new Date());
    const selectedDate = ref(/* @__PURE__ */ new Date());
    const weekDays = ["Lun", "Mar", "Mi\xE9", "Juv", "Vie", "S\xE1b", "Dom"];
    const timeOptions = [
      { label: "06:00", hour: 6, minute: 0 },
      { label: "07:00", hour: 7, minute: 0 },
      { label: "08:30", hour: 8, minute: 30 },
      { label: "18:00", hour: 18, minute: 0 }
    ];
    const { toast } = useToastNotifications();
    useRouter();
    const currentMonthYear = computed(() => {
      return currentDate.value.toLocaleDateString("es-ES", {
        month: "long",
        year: "numeric"
      });
    });
    const calendarDays = computed(() => {
      const year = currentDate.value.getFullYear();
      const month = currentDate.value.getMonth();
      const firstDay = new Date(year, month, 1);
      const startDate = new Date(firstDay);
      startDate.setDate(startDate.getDate() - (firstDay.getDay() || 7) + 1);
      const days = [];
      const today = /* @__PURE__ */ new Date();
      for (let i = 0; i < 42; i++) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + i);
        const isCurrentMonth = date.getMonth() === month;
        const isToday = date.toDateString() === today.toDateString();
        const isSelected = date.toDateString() === selectedDate.value.toDateString();
        days.push({
          date: date.toISOString(),
          dayNumber: date.getDate(),
          isCurrentMonth,
          isToday,
          isSelected
        });
      }
      return days;
    });
    const formatScheduledDateTime = () => {
      const date = selectedDate.value.toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
      });
      const time = formatScheduledTime();
      return `${date} a las ${time}`;
    };
    const formatScheduledTime = () => {
      const hour = String(scheduledTime.value.hour).padStart(2, "0");
      const minute = String(scheduledTime.value.minute).padStart(2, "0");
      return `${hour}:${minute}`;
    };
    const formatDuration = () => {
      const totalMinutes = duration.value.minutes || 0;
      if (totalMinutes === 0) {
        return "No configurado";
      }
      return `${totalMinutes} min`;
    };
    const calculateVolume = () => {
      const totalMinutes = duration.value.minutes || 0;
      const flowRate = 2.5;
      return (totalMinutes * flowRate).toFixed(1);
    };
    const getTimeUntilScheduled = () => {
      const now = /* @__PURE__ */ new Date();
      const scheduled = new Date(selectedDate.value);
      scheduled.setHours(scheduledTime.value.hour, scheduledTime.value.minute, 0, 0);
      const diffMs = scheduled - now;
      if (diffMs <= 0) {
        return "La fecha/hora ya ha pasado";
      }
      const diffMinutes = Math.floor(diffMs / (1e3 * 60));
      if (diffMinutes < 60) {
        return `Faltan ${diffMinutes} minutos`;
      } else {
        const diffHours = Math.floor(diffMinutes / 60);
        return `Faltan ${diffHours}h ${diffMinutes % 60}min`;
      }
    };
    const canNotifyBefore = computed(() => {
      const now = /* @__PURE__ */ new Date();
      const scheduled = new Date(selectedDate.value);
      scheduled.setHours(scheduledTime.value.hour, scheduledTime.value.minute, 0, 0);
      const diffMs = scheduled - now;
      const diffMinutes = Math.floor(diffMs / (1e3 * 60));
      return diffMinutes >= 10;
    });
    const isValidConfiguration = () => {
      const now = /* @__PURE__ */ new Date();
      const scheduled = new Date(selectedDate.value);
      scheduled.setHours(scheduledTime.value.hour, scheduledTime.value.minute, 0, 0);
      const hasValidDuration = duration.value.minutes > 0;
      const hasValidDateTime = scheduled > now;
      if (frequency.value === "custom" && selectedDays.value.length === 0) {
        return false;
      }
      return hasValidDuration && hasValidDateTime;
    };
    const getSelectedDaysText = () => {
      if (selectedDays.value.length === 0) return "Ning\xFAn d\xEDa seleccionado";
      const dayNames = ["Lunes", "Martes", "Mi\xE9rcoles", "Jueves", "Viernes", "S\xE1bado", "Domingo"];
      const selectedDayNames = selectedDays.value.map((index) => dayNames[index]);
      if (selectedDayNames.length === 1) {
        return selectedDayNames[0];
      } else if (selectedDayNames.length === 2) {
        return `${selectedDayNames[0]} y ${selectedDayNames[1]}`;
      } else {
        const last = selectedDayNames.pop();
        return `${selectedDayNames.join(", ")} y ${last}`;
      }
    };
    const getFrequencyText = () => {
      switch (frequency.value) {
        case "once":
          return "Solo una vez";
        case "daily":
          return "Diariamente a la misma hora";
        case "custom":
          return `D\xEDas espec\xEDficos: ${getSelectedDaysText()}`;
        default:
          return "No configurado";
      }
    };
    const getScheduledDateFromConfig = () => {
      var _a;
      if (!((_a = irrigationStore.specificConfig) == null ? void 0 : _a.start_datetime)) {
        return "No configurado";
      }
      const date = new Date(irrigationStore.specificConfig.start_datetime);
      return date.toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
      });
    };
    const getScheduledTimeFromConfig = () => {
      var _a;
      if (!((_a = irrigationStore.specificConfig) == null ? void 0 : _a.start_datetime)) {
        return "No configurado";
      }
      const date = new Date(irrigationStore.specificConfig.start_datetime);
      return date.toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit"
      });
    };
    const getDurationFromConfig = () => {
      var _a;
      const minutes = ((_a = irrigationStore.irrigationConfig) == null ? void 0 : _a.duration_minutes) || 0;
      if (minutes === 0) {
        return "No configurado";
      }
      return `${minutes} min`;
    };
    watch(() => irrigationStore.hasActiveMode, (newValue) => {
      console.log("\u{1F504} hasActiveMode cambi\xF3 a:", newValue);
    });
    watch(() => irrigationStore.isProgrammedActive, (newValue) => {
      console.log("\u{1F504} isProgrammedActive cambi\xF3 a:", newValue);
    });
    watch(() => irrigationStore.isProgrammedWaiting, (newValue) => {
      console.log("\u{1F504} isProgrammedWaiting cambi\xF3 a:", newValue);
    });
    watch(() => irrigationStore.activeMode, (newValue) => {
      console.log("\u{1F504} activeMode cambi\xF3 a:", newValue);
    });
    watch(() => irrigationStore.activePumpActivation, (newValue) => {
      console.log("\u{1F504} activePumpActivation cambi\xF3 a:", newValue);
    });
    watch(() => irrigationStore.isWatering, (newValue) => {
      console.log("\u{1F504} isWatering cambi\xF3 a:", newValue);
    });
    let statusMonitoringInterval = null;
    const startStatusMonitoring = () => {
      if (statusMonitoringInterval) {
        clearInterval(statusMonitoringInterval);
      }
      irrigationStore.loadActiveConfiguration();
      statusMonitoringInterval = setInterval();
      console.log("\u2705 [PROGRAMMED] Monitoreo de estado iniciado");
    };
    const stopStatusMonitoring = () => {
      if (statusMonitoringInterval) {
        clearInterval(statusMonitoringInterval);
        statusMonitoringInterval = null;
        console.log("\u{1F6D1} [PROGRAMMED] Monitoreo de estado detenido");
      }
    };
    watch(() => irrigationStore.isProgrammedActive, (newValue, oldValue) => {
      console.log("\u{1F504} isProgrammedActive cambi\xF3:", { oldValue, newValue, activeMode: irrigationStore.activeMode });
      if (newValue) {
        console.log("\u{1F680} [WATCHER] Iniciando monitoreo por isProgrammedActive");
        startStatusMonitoring();
      } else {
        console.log("\u{1F6D1} [WATCHER] Deteniendo monitoreo por isProgrammedActive");
        stopStatusMonitoring();
      }
    }, { immediate: true });
    watch(() => irrigationStore.activeMode, (newMode, oldMode) => {
      console.log("\u{1F504} activeMode cambi\xF3:", { oldMode, newMode });
      if (newMode === "programmed") {
        console.log("\u{1F680} [WATCHER] Iniciando monitoreo por activeMode programmed");
        startStatusMonitoring();
      } else if (oldMode === "programmed" && newMode !== "programmed") {
        console.log("\u{1F6D1} [WATCHER] Deteniendo monitoreo por activeMode ya no programmed");
        stopStatusMonitoring();
      }
    }, { immediate: true });
    watch(() => irrigationStore.isWatering, (newValue) => {
      console.log("\u{1F504} isWatering cambi\xF3 a:", newValue);
      if (newValue || irrigationStore.isPaused) {
        startStatusMonitoring();
      }
    }, { immediate: true });
    useHead({
      title: "Modo Programado - VIVANTIA",
      meta: [
        { name: "description", content: "Configuraci\xF3n del modo programado de riego" }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_WateringIcon = resolveComponent("WateringIcon");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-8" }, _attrs))}><div class="max-w-2xl mx-auto">`);
      if (unref(irrigationStore).isProgrammedWatering) {
        _push(`<div class="bg-gray-800 rounded-xl shadow-lg p-6 mb-8 border border-gray-700"><h2 class="text-xl font-bold text-white mb-6">Riego Programado Activo</h2><div class="text-center space-y-6"><div class="flex justify-center"><div class="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">`);
        _push(ssrRenderComponent(_component_WateringIcon, null, null, _parent));
        _push(`</div></div><div class="bg-blue-900/30 border border-blue-700/50 rounded-lg p-4"><h3 class="font-semibold text-blue-300 mb-3">Estado del Riego</h3><div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm"><div><p class="text-gray-400">Estado:</p><p class="font-bold text-white">${ssrInterpolate(unref(irrigationStore).isPaused ? "Pausado" : "Regando")}</p></div><div><p class="text-gray-400">Tiempo Restante:</p><p class="font-bold text-blue-400">${ssrInterpolate(unref(irrigationStore).remainingTime || "Calculando...")}</p></div><div><p class="text-gray-400">Duraci\xF3n Total:</p><p class="font-bold text-white">${ssrInterpolate(getDurationFromConfig())}</p></div><div><p class="text-gray-400">Modo:</p><p class="font-bold text-white">Programado</p></div></div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-4">`);
        if (!unref(irrigationStore).isPaused) {
          _push(`<button class="px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-bold rounded-lg hover:from-yellow-600 hover:to-yellow-700 transform hover:scale-105 transition-all duration-200 shadow-lg"> \u23F8\uFE0F Pausar Riego </button>`);
        } else {
          _push(`<button class="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-lg hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all duration-200 shadow-lg"> \u25B6\uFE0F Reanudar Riego </button>`);
        }
        _push(`<button class="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold rounded-lg hover:from-red-600 hover:to-red-700 transform hover:scale-105 transition-all duration-200 shadow-lg"> \u{1F6D1} Cancelar Riego </button></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(irrigationStore).isProgrammedActive && !unref(irrigationStore).isWatering && !unref(irrigationStore).isPaused) {
        _push(`<div class="bg-gray-800 rounded-xl shadow-lg p-6 mb-8 border border-gray-700"><h2 class="text-xl font-bold text-white mb-6">Riego Programado Configurado</h2><div class="text-center space-y-6"><div class="flex justify-center"><div class="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center shadow-lg">`);
        _push(ssrRenderComponent(unref(ClockIcon), null, null, _parent));
        _push(`</div></div><div class="bg-green-900/30 border border-green-700/50 rounded-lg p-4"><h3 class="font-semibold text-green-300 mb-3">Informaci\xF3n del Riego Programado</h3><div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm"><div><p class="text-gray-400">Fecha Programada:</p><p class="font-bold text-white">${ssrInterpolate(getScheduledDateFromConfig())}</p></div><div><p class="text-gray-400">Hora Programada:</p><p class="font-bold text-white">${ssrInterpolate(getScheduledTimeFromConfig())}</p></div><div><p class="text-gray-400">Duraci\xF3n:</p><p class="font-bold text-white">${ssrInterpolate(getDurationFromConfig())}</p></div><div><p class="text-gray-400">Tiempo Restante:</p><p class="font-bold text-green-400">${ssrInterpolate(unref(irrigationStore).remainingTime || "Calculando...")}</p></div></div></div><button class="w-full px-6 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold text-lg rounded-lg hover:from-red-600 hover:to-red-700 transform hover:scale-105 transition-all duration-200 shadow-lg"> \u{1F5D1}\uFE0F Deshacer Configuraci\xF3n </button></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(irrigationStore).isProgrammedActive && unref(irrigationStore).isWatering && !unref(irrigationStore).isPaused) {
        _push(`<div class="bg-gray-800 rounded-xl shadow-lg p-6 mb-8 border border-gray-700"><h2 class="text-xl font-bold text-white mb-6">Riego Programado Activo</h2><div class="text-center space-y-6"><div class="flex justify-center"><div class="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">`);
        _push(ssrRenderComponent(unref(WaterDropIcon), null, null, _parent));
        _push(`</div></div><div class="bg-green-900/30 border border-green-700/50 rounded-lg p-4"><h3 class="font-semibold text-green-300 mb-3">Informaci\xF3n del Riego</h3><div class="grid grid-cols-2 gap-4 text-sm"><div><p class="text-gray-400">Estado:</p><p class="font-bold text-white">Bomba Activa</p></div><div><p class="text-gray-400">Tiempo Restante:</p><p class="font-bold text-white">${ssrInterpolate(unref(irrigationStore).remainingTime || "Calculando...")}</p></div></div></div><div class="space-y-3"><button class="w-full px-6 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-bold text-lg rounded-lg hover:from-yellow-600 hover:to-yellow-700 transform hover:scale-105 transition-all duration-200 shadow-lg"> \u23F8\uFE0F Parada de Emergencia </button><button class="w-full px-6 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold text-lg rounded-lg hover:from-red-600 hover:to-red-700 transform hover:scale-105 transition-all duration-200 shadow-lg"> \u{1F6D1} Cancelar Riego Programado </button></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(irrigationStore).isProgrammedActive && unref(irrigationStore).isPaused) {
        _push(`<div class="bg-gray-800 rounded-xl shadow-lg p-6 mb-8 border border-gray-700"><h2 class="text-xl font-bold text-white mb-6">Riego Programado Pausado</h2><div class="text-center space-y-6"><div class="flex justify-center"><div class="w-24 h-24 bg-yellow-500 rounded-full flex items-center justify-center shadow-lg">`);
        _push(ssrRenderComponent(unref(PauseIcon), null, null, _parent));
        _push(`</div></div><div class="bg-green-900/30 border border-green-700/50 rounded-lg p-4"><h3 class="font-semibold text-green-300 mb-3">Informaci\xF3n del Riego</h3><div class="grid grid-cols-2 gap-4 text-sm"><div><p class="text-gray-400">Estado:</p><p class="font-bold text-white">Pausado</p></div><div><p class="text-gray-400">Tiempo Restante:</p><p class="font-bold text-white">${ssrInterpolate(unref(irrigationStore).remainingTime || "Calculando...")}</p></div></div></div><div class="space-y-3"><button class="w-full px-6 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold text-lg rounded-lg hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all duration-200 shadow-lg"> \u25B6\uFE0F Reanudar Riego </button><button class="w-full px-6 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold text-lg rounded-lg hover:from-red-600 hover:to-red-700 transform hover:scale-105 transition-all duration-200 shadow-lg"> \u{1F6D1} Cancelar Riego Programado </button></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="bg-gray-800 rounded-xl shadow-lg p-6 mb-8 border border-gray-700"><div class="flex items-center mb-4"><div class="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mr-4 shadow-lg">`);
      _push(ssrRenderComponent(unref(CalendarIcon), null, null, _parent));
      _push(`</div><div><h1 class="text-2xl font-bold text-white">Modo Programado</h1><p class="text-gray-300">Programa el riego para fechas y horas espec\xEDficas</p></div></div><div class="bg-green-900/30 border border-green-700/50 rounded-lg p-4"><h3 class="font-semibold text-green-300 mb-2">\xBFC\xF3mo funciona el modo programado?</h3><ul class="text-sm text-green-200 space-y-1"><li>\u2022 Selecciona la fecha y hora espec\xEDfica para activar el riego</li><li>\u2022 La bomba se activar\xE1 autom\xE1ticamente en el momento programado</li><li>\u2022 Configura la duraci\xF3n del riego</li><li>\u2022 Ideal para establecer rutinas de riego regulares</li></ul></div><div class="bg-yellow-900/30 border border-yellow-500/30 rounded-lg p-4 mt-4"><h3 class="font-semibold text-yellow-400 mb-2">\u26A0\uFE0F Advertencia Importante</h3><p class="text-sm text-yellow-300"><strong>Tiempo de respuesta del sistema:</strong> La bomba puede tardar entre 2-15 segundos en activarse al iniciar el riego y entre 2-15 segundos en detenerse al cancelar o pausar. Este tiempo es normal debido a la comunicaci\xF3n LoRaWAN con el dispositivo IoT. </p></div></div>`);
      if (!unref(irrigationStore).isProgrammedWaiting && !unref(irrigationStore).isWatering && !unref(irrigationStore).isPaused) {
        _push(`<div class="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700"><h2 class="text-xl font-bold text-white mb-6">Configurar Riego Programado</h2><form class="space-y-6"><div class="grid grid-cols-1 lg:grid-cols-2 gap-6"><div><label class="block text-sm font-medium text-gray-300 mb-2"> Fecha de Activaci\xF3n </label><div class="bg-gray-700 rounded-lg p-4 border border-gray-600"><div class="flex items-center justify-between mb-3"><button type="button" class="p-2 text-gray-400 hover:text-white transition-colors">`);
        _push(ssrRenderComponent(unref(ChevronLeftIcon), null, null, _parent));
        _push(`</button><h3 class="text-white font-semibold">${ssrInterpolate(unref(currentMonthYear))}</h3><button type="button" class="p-2 text-gray-400 hover:text-white transition-colors">`);
        _push(ssrRenderComponent(unref(ChevronRightSmallIcon), null, null, _parent));
        _push(`</button></div><div class="grid grid-cols-7 gap-1 mb-2"><!--[-->`);
        ssrRenderList(weekDays, (day) => {
          _push(`<div class="text-center text-xs text-gray-400 py-1">${ssrInterpolate(day)}</div>`);
        });
        _push(`<!--]--></div><div class="grid grid-cols-7 gap-1"><!--[-->`);
        ssrRenderList(unref(calendarDays), (day) => {
          _push(`<div class="${ssrRenderClass([
            "text-center py-2 text-sm cursor-pointer rounded transition-colors",
            day.isCurrentMonth ? day.isSelected ? "bg-green-600 text-white" : day.isToday ? "bg-blue-600 text-white" : "text-white hover:bg-gray-600" : "text-gray-600 cursor-not-allowed"
          ])}">${ssrInterpolate(day.dayNumber)}</div>`);
        });
        _push(`<!--]--></div></div></div><div><label class="block text-sm font-medium text-gray-300 mb-2"> Hora de Activaci\xF3n </label><div class="bg-gray-700 rounded-lg p-4 border border-gray-600"><div class="grid grid-cols-2 gap-4"><div><label class="block text-xs text-gray-400 mb-1">Hora</label><select class="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-white"><!--[-->`);
        ssrRenderList(24, (hour) => {
          _push(`<option${ssrRenderAttr("value", hour - 1)}${ssrIncludeBooleanAttr(Array.isArray(unref(scheduledTime).hour) ? ssrLooseContain(unref(scheduledTime).hour, hour - 1) : ssrLooseEqual(unref(scheduledTime).hour, hour - 1)) ? " selected" : ""}>${ssrInterpolate(String(hour - 1).padStart(2, "0"))}</option>`);
        });
        _push(`<!--]--></select></div><div><label class="block text-xs text-gray-400 mb-1">Minutos</label><select class="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-white"><!--[-->`);
        ssrRenderList(60, (minute) => {
          _push(`<option${ssrRenderAttr("value", minute - 1)}${ssrIncludeBooleanAttr(Array.isArray(unref(scheduledTime).minute) ? ssrLooseContain(unref(scheduledTime).minute, minute - 1) : ssrLooseEqual(unref(scheduledTime).minute, minute - 1)) ? " selected" : ""}>${ssrInterpolate(String(minute - 1).padStart(2, "0"))}</option>`);
        });
        _push(`<!--]--></select></div></div><p class="text-sm text-gray-300 mt-3"> Hora programada: <span class="font-semibold text-green-400">${ssrInterpolate(formatScheduledDateTime())}</span></p>`);
        if (getTimeUntilScheduled()) {
          _push(`<p class="text-sm text-green-400 mt-1">${ssrInterpolate(getTimeUntilScheduled())}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></div><div><label class="block text-sm font-medium text-gray-300 mb-2"> Duraci\xF3n del Riego </label><div><label class="block text-xs text-gray-400 mb-1">Minutos</label><input${ssrRenderAttr("value", unref(duration).minutes)} type="number" min="1" max="1440" class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-white" placeholder="5"></div></div><div><label class="block text-sm font-medium text-gray-300 mb-3"> Horarios Sugeridos </label><div class="grid grid-cols-2 md:grid-cols-4 gap-3"><!--[-->`);
        ssrRenderList(timeOptions, (timeOption) => {
          _push(`<button type="button" class="p-3 text-sm font-medium text-green-300 bg-green-900/30 border border-green-700/50 rounded-lg hover:bg-green-800/50 transition-colors">${ssrInterpolate(timeOption.label)}</button>`);
        });
        _push(`<!--]--></div></div><div><label class="block text-sm font-medium text-gray-300 mb-4"> Frecuencia de Riego </label><div class="grid grid-cols-1 md:grid-cols-3 gap-4"><div class="relative cursor-pointer group"><div class="${ssrRenderClass([unref(frequency) === "once" ? "border-green-500 bg-green-900/20 shadow-lg shadow-green-500/20" : "border-gray-600 bg-gray-700/50 hover:border-gray-500 hover:bg-gray-700", "p-4 rounded-xl border-2 transition-all duration-200"])}"><div class="text-center"><div class="${ssrRenderClass([unref(frequency) === "once" ? "bg-green-500" : "bg-gray-600", "w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center"])}"><span class="text-xl">1\uFE0F\u20E3</span></div><h3 class="font-semibold text-white mb-2">Solo una vez</h3><p class="text-sm text-gray-400">Riego \xFAnico en la fecha y hora seleccionada</p></div>`);
        if (unref(frequency) === "once") {
          _push(`<div class="absolute top-2 right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"><span class="text-white text-sm">\u2713</span></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div><div class="relative cursor-pointer group"><div class="${ssrRenderClass([unref(frequency) === "daily" ? "border-green-500 bg-green-900/20 shadow-lg shadow-green-500/20" : "border-gray-600 bg-gray-700/50 hover:border-gray-500 hover:bg-gray-700", "p-4 rounded-xl border-2 transition-all duration-200"])}"><div class="text-center"><div class="${ssrRenderClass([unref(frequency) === "daily" ? "bg-green-500" : "bg-gray-600", "w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center"])}"><span class="text-xl">\u{1F504}</span></div><h3 class="font-semibold text-white mb-2">Diariamente</h3><p class="text-sm text-gray-400">Riego autom\xE1tico todos los d\xEDas a la misma hora</p></div>`);
        if (unref(frequency) === "daily") {
          _push(`<div class="absolute top-2 right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"><span class="text-white text-sm">\u2713</span></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div><div class="relative cursor-pointer group"><div class="${ssrRenderClass([unref(frequency) === "custom" ? "border-green-500 bg-green-900/20 shadow-lg shadow-green-500/20" : "border-gray-600 bg-gray-700/50 hover:border-gray-500 hover:bg-gray-700", "p-4 rounded-xl border-2 transition-all duration-200"])}"><div class="text-center"><div class="${ssrRenderClass([unref(frequency) === "custom" ? "bg-green-500" : "bg-gray-600", "w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center"])}"><span class="text-xl">\u{1F4C5}</span></div><h3 class="font-semibold text-white mb-2">D\xEDas espec\xEDficos</h3><p class="text-sm text-gray-400">Elegir los d\xEDas de la semana para el riego</p></div>`);
        if (unref(frequency) === "custom") {
          _push(`<div class="absolute top-2 right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"><span class="text-white text-sm">\u2713</span></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></div>`);
        if (unref(frequency) === "custom") {
          _push(`<div class="mt-6"><label class="block text-sm font-medium text-gray-300 mb-3"> Seleccionar d\xEDas de la semana </label><div class="grid grid-cols-7 gap-2"><!--[-->`);
          ssrRenderList(weekDays, (day, index) => {
            _push(`<div class="relative cursor-pointer group"><div class="${ssrRenderClass([unref(selectedDays).includes(index) ? "border-green-500 bg-green-900/30 text-green-300" : "border-gray-600 bg-gray-700/50 text-gray-400 hover:border-gray-500 hover:bg-gray-700", "p-3 rounded-lg border-2 text-center transition-all duration-200"])}"><div class="text-sm font-medium">${ssrInterpolate(day)}</div>`);
            if (unref(selectedDays).includes(index)) {
              _push(`<div class="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center"><span class="text-white text-xs">\u2713</span></div>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div></div>`);
          });
          _push(`<!--]--></div>`);
          if (unref(selectedDays).length > 0) {
            _push(`<div class="mt-3 p-3 bg-green-900/20 border border-green-700/50 rounded-lg"><p class="text-sm text-green-300"><strong>D\xEDas seleccionados:</strong> ${ssrInterpolate(getSelectedDaysText())}</p></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="bg-gray-700 rounded-lg p-4 border border-gray-600"><h3 class="font-medium text-white mb-3">Configuraci\xF3n Adicional</h3><div class="space-y-3"><label class="flex items-center"><input${ssrIncludeBooleanAttr(Array.isArray(unref(options).notifyBeforeStart) ? ssrLooseContain(unref(options).notifyBeforeStart, null) : unref(options).notifyBeforeStart) ? " checked" : ""} type="checkbox"${ssrIncludeBooleanAttr(!unref(canNotifyBefore)) ? " disabled" : ""} class="rounded border-gray-600 text-green-600 focus:ring-green-500 bg-gray-700 disabled:opacity-50"><span class="ml-2 text-sm text-gray-300"> Notificar 5 minutos antes `);
        if (!unref(canNotifyBefore)) {
          _push(`<span class="text-gray-500 text-xs ml-1">(requiere programaci\xF3n con al menos 10 min de anticipaci\xF3n)</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</span></label><label class="flex items-center"><input${ssrIncludeBooleanAttr(Array.isArray(unref(options).notifyStart) ? ssrLooseContain(unref(options).notifyStart, null) : unref(options).notifyStart) ? " checked" : ""} type="checkbox" class="rounded border-gray-600 text-green-600 focus:ring-green-500 bg-gray-700"><span class="ml-2 text-sm text-gray-300">Notificar al iniciar el riego</span></label><label class="flex items-center"><input${ssrIncludeBooleanAttr(Array.isArray(unref(options).notifyEnd) ? ssrLooseContain(unref(options).notifyEnd, null) : unref(options).notifyEnd) ? " checked" : ""} type="checkbox" class="rounded border-gray-600 text-green-600 focus:ring-green-500 bg-gray-700"><span class="ml-2 text-sm text-gray-300">Notificar al finalizar el riego</span></label></div></div><div class="bg-blue-900/30 border border-blue-700/50 rounded-lg p-4"><h3 class="font-medium text-blue-300 mb-2">Vista Previa</h3><div class="text-sm text-blue-200 space-y-1"><p><strong>Fecha y hora programada:</strong> ${ssrInterpolate(formatScheduledDateTime())}</p><p><strong>Duraci\xF3n:</strong> ${ssrInterpolate(formatDuration())}</p><p><strong>Frecuencia:</strong> ${ssrInterpolate(getFrequencyText())}</p><p><strong>Caudal estimado:</strong> 2.5 L/min</p><p><strong>Volumen total:</strong> ${ssrInterpolate(calculateVolume())} L</p></div></div><div class="flex space-x-4"><button type="submit"${ssrIncludeBooleanAttr(!isValidConfiguration()) ? " disabled" : ""} class="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-medium rounded-lg hover:from-green-700 hover:to-green-800 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed transition-all duration-200 shadow-lg"> Guardar Configuraci\xF3n </button><button type="button" class="px-6 py-3 bg-gray-600 text-gray-300 font-medium rounded-lg hover:bg-gray-700 transition-colors"> Cancelar </button></div></form></div>`);
      } else {
        _push(`<div class="bg-orange-900/60 border border-orange-500/30 rounded-xl shadow-lg p-6"><div class="text-center"><div class="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">`);
        _push(ssrRenderComponent(unref(WarningIcon), null, null, _parent));
        _push(`</div><h3 class="text-lg font-bold text-white mb-2">Modo ${ssrInterpolate(unref(irrigationStore).activeMode)} Activo</h3><p class="text-orange-300 mb-4"> Ya tienes un modo de riego activo. Debes cancelar la configuraci\xF3n actual antes de poder configurar el modo programado. </p><div class="bg-orange-800/40 border border-orange-500/40 rounded-lg p-3 mb-4"><p class="text-sm text-orange-200"><strong>\xDAltimo riego:</strong> ${ssrInterpolate(unref(irrigationStore).lastIrrigation)}</p></div><button class="px-6 py-3 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-700 transition-colors"> Volver a Modos de Riego </button></div></div>`);
      }
      _push(`</div>`);
      if (unref(irrigationStore).hasActiveMode && !unref(irrigationStore).isProgrammedActive) {
        _push(`<div class="max-w-2xl mx-auto"><div class="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700"><div class="text-center space-y-4"><div class="text-4xl">\u26A0\uFE0F</div><h3 class="text-xl font-bold text-white">Otro Modo de Riego Activo</h3><p class="text-gray-300"> Actualmente tienes el modo <strong class="text-blue-400">${ssrInterpolate(unref(irrigationStore).getModeDescription(unref(irrigationStore).activeMode))}</strong> activo. <br><br> Para configurar el modo programado, primero debes cancelar el modo activo desde su p\xE1gina correspondiente. </p><button class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"> Ir al Modo Activo </button></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(showConfirmModal)) {
        _push(`<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"><div class="bg-gray-800 p-6 rounded-xl max-w-md w-full mx-4 border border-gray-700"><div class="text-center"><div class="w-16 h-16 bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-700/50">`);
        _push(ssrRenderComponent(unref(ConfirmIcon), null, null, _parent));
        _push(`</div><h3 class="text-lg font-bold text-white mb-2">Confirmar Programaci\xF3n</h3><p class="text-gray-300 mb-6"> \xBFEst\xE1s seguro de que quieres programar el riego para el ${ssrInterpolate(formatScheduledDateTime())}? <br><br><strong>Duraci\xF3n:</strong> ${ssrInterpolate(formatDuration())}<br><strong>${ssrInterpolate(getTimeUntilScheduled())}</strong></p><div class="flex space-x-4"><button class="flex-1 px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200"> Confirmar Programaci\xF3n </button><button class="flex-1 px-4 py-2 bg-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"> Cancelar </button></div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(showCancelModal)) {
        _push(`<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"><div class="bg-gray-800 border border-gray-600/30 p-6 rounded-xl max-w-md w-full mx-4"><div class="text-center"><div class="w-16 h-16 bg-red-900/60 border border-red-500/30 rounded-full flex items-center justify-center mx-auto mb-4">`);
        _push(ssrRenderComponent(unref(WarningIcon), null, null, _parent));
        _push(`</div><h3 class="text-lg font-bold text-white mb-2">Cancelar Configuraci\xF3n Programada</h3><p class="text-gray-300 mb-6"> \xBFEst\xE1s seguro de que quieres cancelar la configuraci\xF3n programada? <br><br><strong class="text-red-400">El riego no se ejecutar\xE1 en la fecha programada.</strong></p><div class="flex space-x-4"><button class="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"> S\xED, Cancelar Configuraci\xF3n </button><button class="flex-1 px-4 py-2 bg-gray-600 text-gray-200 rounded-lg hover:bg-gray-500 transition-colors"> No, Mantener </button></div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(showCancelActiveModal)) {
        _push(`<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"><div class="bg-gray-800 border border-gray-600/30 p-6 rounded-xl max-w-md w-full mx-4"><div class="text-center"><div class="w-16 h-16 bg-red-900/60 border border-red-500/30 rounded-full flex items-center justify-center mx-auto mb-4">`);
        _push(ssrRenderComponent(unref(WarningIcon), null, null, _parent));
        _push(`</div><h3 class="text-lg font-bold text-white mb-2">Cancelar Riego Activo</h3><p class="text-gray-300 mb-6"> \xBFEst\xE1s seguro de que quieres cancelar el riego que est\xE1 en curso? <br><br><strong class="text-yellow-400">El riego se detendr\xE1 inmediatamente.</strong><br><span class="text-blue-400">Si tienes configuraci\xF3n daily o d\xEDas m\xFAltiples, se reprogramar\xE1 autom\xE1ticamente.</span></p><div class="flex space-x-4"><button class="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"> S\xED, Cancelar Riego </button><button class="flex-1 px-4 py-2 bg-gray-600 text-gray-200 rounded-lg hover:bg-gray-500 transition-colors"> No, Continuar </button></div></div></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/modo/programado.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=programado-BhobKqFH.mjs.map
