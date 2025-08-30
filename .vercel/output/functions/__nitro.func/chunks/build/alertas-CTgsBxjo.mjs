import { ref, computed, watch, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderClass, ssrRenderList, ssrRenderAttr } from 'vue/server-renderer';
import { u as useToastNotifications } from './useToastNotifications-DaJGJiXK.mjs';
import { a as alertsIcon } from './index-0YkbgJTu.mjs';
import { A as AlertsTable, C as ConfirmDeleteModal, a as AlertAPI } from './AlertAPI-ecIzn7_7.mjs';
import { _ as _export_sfc } from './server.mjs';
import { u as useHead } from './v3-DHK4yxVL.mjs';
import './BaseCard-BGENKLa5.mjs';
import './ThermometerIcon-CWsbcdy6.mjs';
import './PlantIcon-DoN4-AKe.mjs';
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
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';

const _sfc_main$1 = {
  __name: "CleanOldAlertsModal",
  __ssrInlineRender: true,
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    isAdmin: {
      type: Boolean,
      default: false
    },
    defaultDays: {
      type: Number,
      default: 30
    }
  },
  emits: ["confirm", "cancel"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const isLoading = ref(false);
    const days = ref(props.defaultDays);
    const previewCount = ref(null);
    watch(() => props.isOpen, (newValue) => {
      if (newValue) {
        days.value = props.defaultDays;
        previewCount.value = null;
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.isOpen) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed inset-0 z-50 overflow-y-auto" }, _attrs))} data-v-0df3c950><div class="fixed inset-0 bg-black bg-opacity-75 transition-opacity" data-v-0df3c950></div><div class="flex min-h-screen items-center justify-center p-4" data-v-0df3c950><div class="relative bg-gray-800 rounded-xl shadow-2xl border border-gray-700 max-w-lg w-full mx-auto transform transition-all" data-v-0df3c950><div class="px-6 py-4 border-b border-gray-700" data-v-0df3c950><div class="flex items-center space-x-3" data-v-0df3c950><div class="w-10 h-10 bg-yellow-600 rounded-full flex items-center justify-center" data-v-0df3c950><svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-0df3c950><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.664-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" data-v-0df3c950></path></svg></div><h3 class="text-lg font-semibold text-white" data-v-0df3c950>${ssrInterpolate(__props.isAdmin ? "Limpiar Alertas Antiguas" : "Eliminar Todas las Alertas")}</h3></div></div><div class="px-6 py-4 space-y-4" data-v-0df3c950><p class="text-gray-300" data-v-0df3c950>${ssrInterpolate(__props.isAdmin ? "Esto eliminar\xE1 todas las alertas resueltas de todos los usuarios con m\xE1s de los d\xEDas especificados." : "Esto eliminar\xE1 TODAS tus alertas (resueltas y no resueltas).")}</p>`);
        if (__props.isAdmin) {
          _push(`<div data-v-0df3c950><label class="block text-sm font-medium text-gray-300 mb-2" data-v-0df3c950> Eliminar alertas resueltas con m\xE1s de: </label><div class="flex items-center space-x-3" data-v-0df3c950><input${ssrRenderAttr("value", days.value)} type="number" min="1" max="365" class="w-20 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-white text-center" data-v-0df3c950><span class="text-gray-300" data-v-0df3c950>d\xEDas</span></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="p-3 bg-yellow-900/30 border border-yellow-600 rounded-lg" data-v-0df3c950><div class="flex items-start space-x-2" data-v-0df3c950><svg class="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-0df3c950><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.664-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" data-v-0df3c950></path></svg><div data-v-0df3c950><p class="text-yellow-300 text-sm font-medium" data-v-0df3c950>Advertencia</p><p class="text-yellow-200 text-sm" data-v-0df3c950>${ssrInterpolate(__props.isAdmin ? "Esta acci\xF3n no se puede deshacer. Solo se eliminar\xE1n alertas que ya est\xE9n marcadas como resueltas." : "Esta acci\xF3n no se puede deshacer. Se eliminar\xE1n TODAS tus alertas.")}</p></div></div></div>`);
        if (previewCount.value !== null) {
          _push(`<div class="p-3 bg-blue-900/30 border border-blue-600 rounded-lg" data-v-0df3c950><p class="text-blue-300 text-sm" data-v-0df3c950> Se eliminar\xE1n aproximadamente <strong data-v-0df3c950>${ssrInterpolate(previewCount.value)}</strong> alertas. </p></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="px-6 py-4 border-t border-gray-700 flex justify-end space-x-3" data-v-0df3c950><button class="px-4 py-2 bg-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"${ssrIncludeBooleanAttr(isLoading.value) ? " disabled" : ""} data-v-0df3c950> Cancelar </button><button class="${ssrRenderClass([{ "animate-pulse": isLoading.value }, "px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"])}"${ssrIncludeBooleanAttr(isLoading.value) ? " disabled" : ""} data-v-0df3c950>${ssrInterpolate(isLoading.value ? "Limpiando..." : "S\xED, limpiar")}</button></div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Modals/CleanOldAlertsModal.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const CleanOldAlertsModal = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-0df3c950"]]);
const _sfc_main = {
  __name: "alertas",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Alertas - VIVANTIA",
      meta: [
        { name: "description", content: "Gestiona y revisa todas las alertas del sistema" }
      ]
    });
    const { toast } = useToastNotifications();
    const filters = ref({
      category: "",
      subcategory: "",
      severity: "",
      status: "",
      period: "all"
    });
    const loading = ref(false);
    const alerts = ref([]);
    const showDeleteModal = ref(false);
    const showCleanModal = ref(false);
    const alertToDelete = ref(null);
    const loadAlerts = async () => {
      try {
        loading.value = true;
        const response = await AlertAPI.getMyAlerts();
        alerts.value = response.data || [];
      } catch (error) {
        console.error("Error al cargar alertas:", error);
        toast.error("Error al cargar las alertas");
        alerts.value = [];
      } finally {
        loading.value = false;
      }
    };
    const availableSubcategories = computed(() => {
      const subcategoryMap = {
        "user": [
          { value: "user_actions", label: "Acciones de Usuario" }
        ],
        "environmental": [
          { value: "temperature", label: "Temperatura" },
          { value: "humidity", label: "Humedad Ambiental" },
          { value: "moisture", label: "Humedad del Suelo" }
        ],
        "device": [
          { value: "device_status", label: "Estado del Dispositivo" }
        ],
        "crop": [
          { value: "crop_management", label: "Gesti\xF3n de Cultivos" }
        ],
        "irrigation": [
          { value: "irrigation_control", label: "Control de Riego" }
        ]
      };
      return subcategoryMap[filters.value.category] || [];
    });
    const filteredAlerts = computed(() => {
      let filtered = alerts.value;
      if (filters.value.category) {
        filtered = filtered.filter((alert) => alert.alert_type === filters.value.category);
      }
      if (filters.value.subcategory) {
        filtered = filtered.filter((alert) => {
          const subcategoryMap = {
            "temperature": ["temperature_max_threshold"],
            "humidity": ["air_humidity_min_threshold", "air_humidity_max_threshold"],
            "moisture": ["soil_humidity_min_threshold", "soil_humidity_max_threshold"],
            "device_status": ["device_offline", "device_online", "device_added", "device_deleted", "device_edited", "system_online", "system_offline"],
            "irrigation_control": ["manual_started", "emergency_stop", "manual_cancelled", "programmed_saved", "programmed_reminder", "programmed_schedule", "programmed_cancelled", "automatic_saved", "automatic_activated_temperature", "automatic_activated_soil_humidity", "automatic_activated_air_humidity", "automatic_deactivated_optimal_conditions", "automatic_deactivated_soil_optimal", "automatic_cancelled", "irrigation_started", "irrigation_ended", "irrigation_cancelled", "irrigation_paused", "irrigation_resumed"],
            "user_actions": ["user_registered", "user_logged_in", "username_changed", "password_changed", "session_closed", "api_key_copied"],
            "crop_management": ["crop_selected", "crop_deselected", "crop_edited", "crop_deleted", "crop_added"]
          };
          const targetSubtypes = subcategoryMap[filters.value.subcategory] || [];
          return targetSubtypes.includes(alert.alert_subtype);
        });
      }
      if (filters.value.severity) {
        filtered = filtered.filter((alert) => {
          return alert.severity && alert.severity.toLowerCase() === filters.value.severity.toLowerCase();
        });
      }
      if (filters.value.status) {
        switch (filters.value.status) {
          case "unread":
            filtered = filtered.filter((alert) => !alert.is_resolved);
            break;
          case "read":
            filtered = filtered.filter((alert) => alert.is_resolved);
            break;
        }
      }
      if (filters.value.period !== "all") {
        const now = /* @__PURE__ */ new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1e3);
        const monthAgo = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
        filtered = filtered.filter((alert) => {
          const alertDate = new Date(alert.created_at);
          switch (filters.value.period) {
            case "today":
              return alertDate >= today;
            case "week":
              return alertDate >= weekAgo;
            case "month":
              return alertDate >= monthAgo;
            default:
              return true;
          }
        });
      }
      return filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    });
    const totalAlerts = computed(() => alerts.value.length);
    const unreadAlerts = computed(() => alerts.value.filter((alert) => !alert.is_resolved).length);
    const criticalAlerts = computed(() => alerts.value.filter((alert) => alert.severity === "error" || alert.severity === "warning").length);
    const handleAlertResolved = async (alertId) => {
      try {
        await AlertAPI.resolveAlert(alertId);
        await loadAlerts();
        toast.success("Alerta marcada como resuelta");
      } catch (error) {
        console.error("Error al marcar alerta como resuelta:", error);
        toast.error("Error al marcar alerta como resuelta");
      }
    };
    const handleAlertDeleted = (alertId) => {
      const alert = alerts.value.find((a) => a.id === alertId);
      alertToDelete.value = alert;
      showDeleteModal.value = true;
    };
    const confirmDeleteAlert = async () => {
      try {
        if (alertToDelete.value) {
          await AlertAPI.delete(alertToDelete.value.id);
          await loadAlerts();
          toast.success("Alerta eliminada exitosamente");
        }
      } catch (error) {
        console.error("Error al eliminar alerta:", error);
        toast.error("Error al eliminar alerta");
      } finally {
        showDeleteModal.value = false;
        alertToDelete.value = null;
      }
    };
    const cancelDeleteAlert = () => {
      showDeleteModal.value = false;
      alertToDelete.value = null;
    };
    const confirmCleanOldAlerts = async (days) => {
      try {
        console.log(`[DEBUG] Intentando eliminar todas las alertas del usuario`);
        const response = await AlertAPI.deleteMyOldAlerts();
        console.log(`[DEBUG] Respuesta del servidor:`, response);
        await loadAlerts();
        toast.success(`${response.count || 0} alertas eliminadas`);
      } catch (error) {
        console.error("[DEBUG] Error completo al eliminar alertas:", error);
        console.error("[DEBUG] Error message:", error.message);
        console.error("[DEBUG] Error data:", error.data);
        toast.error(`Error al eliminar alertas: ${error.message || "Error desconocido"}`);
      } finally {
        showCleanModal.value = false;
      }
    };
    const cancelCleanOldAlerts = () => {
      showCleanModal.value = false;
    };
    watch(() => filters.value.category, () => {
      filters.value.subcategory = "";
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-8" }, _attrs))} data-v-ae54f59c><div class="max-w-7xl mx-auto" data-v-ae54f59c><div class="bg-gray-800 rounded-xl shadow-lg p-6 mb-8 border border-gray-700" data-v-ae54f59c><div class="flex items-center justify-between" data-v-ae54f59c><div class="flex items-center space-x-4" data-v-ae54f59c><div class="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center shadow-lg" data-v-ae54f59c>`);
      _push(ssrRenderComponent(unref(alertsIcon), null, null, _parent));
      _push(`</div><div data-v-ae54f59c><h1 class="text-2xl font-bold text-white" data-v-ae54f59c>Alertas del Sistema</h1><p class="text-gray-300" data-v-ae54f59c>Gestiona y revisa todas las notificaciones del sistema</p></div></div><div class="flex items-center space-x-6" data-v-ae54f59c><div class="text-center" data-v-ae54f59c><div class="text-2xl font-bold text-white" data-v-ae54f59c>${ssrInterpolate(totalAlerts.value)}</div><div class="text-sm text-gray-400" data-v-ae54f59c>Total</div></div><div class="text-center" data-v-ae54f59c><div class="text-2xl font-bold text-orange-400" data-v-ae54f59c>${ssrInterpolate(unreadAlerts.value)}</div><div class="text-sm text-gray-400" data-v-ae54f59c>Nuevas</div></div><div class="text-center" data-v-ae54f59c><div class="text-2xl font-bold text-red-400" data-v-ae54f59c>${ssrInterpolate(criticalAlerts.value)}</div><div class="text-sm text-gray-400" data-v-ae54f59c>Cr\xEDticas</div></div></div></div></div><div class="bg-gray-800 rounded-xl shadow-lg p-6 mb-8 border border-gray-700" data-v-ae54f59c><h2 class="text-lg font-semibold text-white mb-4" data-v-ae54f59c>Filtros</h2><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4" data-v-ae54f59c><div data-v-ae54f59c><label class="block text-sm font-medium text-gray-300 mb-2" data-v-ae54f59c><div class="flex items-center space-x-2" data-v-ae54f59c><span data-v-ae54f59c>Categor\xEDa</span><div class="flex items-center space-x-1" data-v-ae54f59c><div class="w-1.5 h-1.5 bg-blue-400 rounded-full" data-v-ae54f59c></div><span class="text-xs text-blue-400 font-medium" data-v-ae54f59c>Filtro principal</span></div></div></label><div class="relative" data-v-ae54f59c><select class="w-full px-4 py-3 bg-gradient-to-r from-gray-700 to-gray-800 border-2 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-400 text-white transition-all duration-200 appearance-none border-gray-600 hover:border-gray-500 hover:from-gray-600 hover:to-gray-700" data-v-ae54f59c><option value="" class="bg-gray-800 text-white" data-v-ae54f59c${ssrIncludeBooleanAttr(Array.isArray(filters.value.category) ? ssrLooseContain(filters.value.category, "") : ssrLooseEqual(filters.value.category, "")) ? " selected" : ""}>Todas las categor\xEDas</option><option value="user" class="bg-gray-800 text-white hover:bg-gray-700" data-v-ae54f59c${ssrIncludeBooleanAttr(Array.isArray(filters.value.category) ? ssrLooseContain(filters.value.category, "user") : ssrLooseEqual(filters.value.category, "user")) ? " selected" : ""}>Usuario</option><option value="environmental" class="bg-gray-800 text-white hover:bg-gray-700" data-v-ae54f59c${ssrIncludeBooleanAttr(Array.isArray(filters.value.category) ? ssrLooseContain(filters.value.category, "environmental") : ssrLooseEqual(filters.value.category, "environmental")) ? " selected" : ""}>Ambiental</option><option value="device" class="bg-gray-800 text-white hover:bg-gray-700" data-v-ae54f59c${ssrIncludeBooleanAttr(Array.isArray(filters.value.category) ? ssrLooseContain(filters.value.category, "device") : ssrLooseEqual(filters.value.category, "device")) ? " selected" : ""}>Dispositivo</option><option value="crop" class="bg-gray-800 text-white hover:bg-gray-700" data-v-ae54f59c${ssrIncludeBooleanAttr(Array.isArray(filters.value.category) ? ssrLooseContain(filters.value.category, "crop") : ssrLooseEqual(filters.value.category, "crop")) ? " selected" : ""}>Cultivo</option><option value="irrigation" class="bg-gray-800 text-white hover:bg-gray-700" data-v-ae54f59c${ssrIncludeBooleanAttr(Array.isArray(filters.value.category) ? ssrLooseContain(filters.value.category, "irrigation") : ssrLooseEqual(filters.value.category, "irrigation")) ? " selected" : ""}>Riego</option></select><div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none" data-v-ae54f59c><svg class="w-5 h-5 text-gray-400 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-ae54f59c><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-ae54f59c></path></svg></div>`);
      if (filters.value.category) {
        _push(`<div class="absolute -top-1 -right-1" data-v-ae54f59c><div class="w-3 h-3 bg-blue-400 rounded-full border-2 border-gray-800" data-v-ae54f59c></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div data-v-ae54f59c><label class="block text-sm font-medium text-gray-300 mb-2" data-v-ae54f59c><div class="flex items-center space-x-2" data-v-ae54f59c><span data-v-ae54f59c>Subcategor\xEDa</span>`);
      if (!filters.value.category) {
        _push(`<div class="flex items-center space-x-1" data-v-ae54f59c><div class="w-1.5 h-1.5 bg-orange-400 rounded-full animate-pulse" data-v-ae54f59c></div><span class="text-xs text-orange-400 font-medium" data-v-ae54f59c>Selecciona categor\xEDa</span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></label><div class="relative" data-v-ae54f59c><select class="${ssrRenderClass([{
        "opacity-60 cursor-not-allowed border-gray-500": !filters.value.category,
        "border-gray-600 hover:border-gray-500 hover:from-gray-600 hover:to-gray-700": filters.value.category
      }, "w-full px-4 py-3 bg-gradient-to-r from-gray-700 to-gray-800 border-2 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-400 text-white transition-all duration-200 appearance-none"])}"${ssrIncludeBooleanAttr(!filters.value.category) ? " disabled" : ""} data-v-ae54f59c><option value="" class="bg-gray-800 text-white" data-v-ae54f59c${ssrIncludeBooleanAttr(Array.isArray(filters.value.subcategory) ? ssrLooseContain(filters.value.subcategory, "") : ssrLooseEqual(filters.value.subcategory, "")) ? " selected" : ""}>${ssrInterpolate(filters.value.category ? "Todas las subcategor\xEDas" : "Selecciona una categor\xEDa primero")}</option><!--[-->`);
      ssrRenderList(availableSubcategories.value, (subcategory) => {
        _push(`<option${ssrRenderAttr("value", subcategory.value)} class="bg-gray-800 text-white hover:bg-gray-700" data-v-ae54f59c${ssrIncludeBooleanAttr(Array.isArray(filters.value.subcategory) ? ssrLooseContain(filters.value.subcategory, subcategory.value) : ssrLooseEqual(filters.value.subcategory, subcategory.value)) ? " selected" : ""}>${ssrInterpolate(subcategory.label)}</option>`);
      });
      _push(`<!--]--></select><div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none" data-v-ae54f59c><svg class="${ssrRenderClass([{ "rotate-180": filters.value.category }, "w-5 h-5 text-gray-400 transition-transform duration-200"])}" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-ae54f59c><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-ae54f59c></path></svg></div>`);
      if (filters.value.category) {
        _push(`<div class="absolute -top-1 -right-1" data-v-ae54f59c><div class="w-3 h-3 bg-green-400 rounded-full border-2 border-gray-800 animate-pulse" data-v-ae54f59c></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div data-v-ae54f59c><label class="block text-sm font-medium text-gray-300 mb-2" data-v-ae54f59c><div class="flex items-center space-x-2" data-v-ae54f59c><span data-v-ae54f59c>Severidad</span><div class="flex items-center space-x-1" data-v-ae54f59c><div class="w-1.5 h-1.5 bg-red-400 rounded-full" data-v-ae54f59c></div><span class="text-xs text-red-400 font-medium" data-v-ae54f59c>Nivel de urgencia</span></div></div></label><div class="relative" data-v-ae54f59c><select class="w-full px-4 py-3 bg-gradient-to-r from-gray-700 to-gray-800 border-2 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-400 text-white transition-all duration-200 appearance-none border-gray-600 hover:border-gray-500 hover:from-gray-600 hover:to-gray-700" data-v-ae54f59c><option value="" class="bg-gray-800 text-white" data-v-ae54f59c${ssrIncludeBooleanAttr(Array.isArray(filters.value.severity) ? ssrLooseContain(filters.value.severity, "") : ssrLooseEqual(filters.value.severity, "")) ? " selected" : ""}>Todas las severidades</option><option value="info" class="bg-gray-800 text-white hover:bg-gray-700" data-v-ae54f59c${ssrIncludeBooleanAttr(Array.isArray(filters.value.severity) ? ssrLooseContain(filters.value.severity, "info") : ssrLooseEqual(filters.value.severity, "info")) ? " selected" : ""}>Informaci\xF3n</option><option value="success" class="bg-gray-800 text-white hover:bg-gray-700" data-v-ae54f59c${ssrIncludeBooleanAttr(Array.isArray(filters.value.severity) ? ssrLooseContain(filters.value.severity, "success") : ssrLooseEqual(filters.value.severity, "success")) ? " selected" : ""}>\xC9xito</option><option value="warning" class="bg-gray-800 text-white hover:bg-gray-700" data-v-ae54f59c${ssrIncludeBooleanAttr(Array.isArray(filters.value.severity) ? ssrLooseContain(filters.value.severity, "warning") : ssrLooseEqual(filters.value.severity, "warning")) ? " selected" : ""}>Advertencia</option><option value="error" class="bg-gray-800 text-white hover:bg-gray-700" data-v-ae54f59c${ssrIncludeBooleanAttr(Array.isArray(filters.value.severity) ? ssrLooseContain(filters.value.severity, "error") : ssrLooseEqual(filters.value.severity, "error")) ? " selected" : ""}>Error</option></select><div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none" data-v-ae54f59c><svg class="w-5 h-5 text-gray-400 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-ae54f59c><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-ae54f59c></path></svg></div>`);
      if (filters.value.severity) {
        _push(`<div class="absolute -top-1 -right-1" data-v-ae54f59c><div class="w-3 h-3 bg-red-400 rounded-full border-2 border-gray-800" data-v-ae54f59c></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div data-v-ae54f59c><label class="block text-sm font-medium text-gray-300 mb-2" data-v-ae54f59c><div class="flex items-center space-x-2" data-v-ae54f59c><span data-v-ae54f59c>Estado</span><div class="flex items-center space-x-1" data-v-ae54f59c><div class="w-1.5 h-1.5 bg-purple-400 rounded-full" data-v-ae54f59c></div><span class="text-xs text-purple-400 font-medium" data-v-ae54f59c>Estado de lectura</span></div></div></label><div class="relative" data-v-ae54f59c><select class="w-full px-4 py-3 bg-gradient-to-r from-gray-700 to-gray-800 border-2 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-400 text-white transition-all duration-200 appearance-none border-gray-600 hover:border-gray-500 hover:from-gray-600 hover:to-gray-700" data-v-ae54f59c><option value="" class="bg-gray-800 text-white" data-v-ae54f59c${ssrIncludeBooleanAttr(Array.isArray(filters.value.status) ? ssrLooseContain(filters.value.status, "") : ssrLooseEqual(filters.value.status, "")) ? " selected" : ""}>Todos los estados</option><option value="unread" class="bg-gray-800 text-white hover:bg-gray-700" data-v-ae54f59c${ssrIncludeBooleanAttr(Array.isArray(filters.value.status) ? ssrLooseContain(filters.value.status, "unread") : ssrLooseEqual(filters.value.status, "unread")) ? " selected" : ""}>Nuevas</option><option value="read" class="bg-gray-800 text-white hover:bg-gray-700" data-v-ae54f59c${ssrIncludeBooleanAttr(Array.isArray(filters.value.status) ? ssrLooseContain(filters.value.status, "read") : ssrLooseEqual(filters.value.status, "read")) ? " selected" : ""}>Resueltas</option></select><div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none" data-v-ae54f59c><svg class="w-5 h-5 text-gray-400 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-ae54f59c><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-ae54f59c></path></svg></div>`);
      if (filters.value.status) {
        _push(`<div class="absolute -top-1 -right-1" data-v-ae54f59c><div class="w-3 h-3 bg-purple-400 rounded-full border-2 border-gray-800" data-v-ae54f59c></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div data-v-ae54f59c><label class="block text-sm font-medium text-gray-300 mb-2" data-v-ae54f59c><div class="flex items-center space-x-2" data-v-ae54f59c><span data-v-ae54f59c>Per\xEDodo</span><div class="flex items-center space-x-1" data-v-ae54f59c><div class="w-1.5 h-1.5 bg-cyan-400 rounded-full" data-v-ae54f59c></div><span class="text-xs text-cyan-400 font-medium" data-v-ae54f59c>Rango temporal</span></div></div></label><div class="relative" data-v-ae54f59c><select class="w-full px-4 py-3 bg-gradient-to-r from-gray-700 to-gray-800 border-2 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-400 text-white transition-all duration-200 appearance-none border-gray-600 hover:border-gray-500 hover:from-gray-600 hover:to-gray-700" data-v-ae54f59c><option value="all" class="bg-gray-800 text-white" data-v-ae54f59c${ssrIncludeBooleanAttr(Array.isArray(filters.value.period) ? ssrLooseContain(filters.value.period, "all") : ssrLooseEqual(filters.value.period, "all")) ? " selected" : ""}>Todo el tiempo</option><option value="today" class="bg-gray-800 text-white hover:bg-gray-700" data-v-ae54f59c${ssrIncludeBooleanAttr(Array.isArray(filters.value.period) ? ssrLooseContain(filters.value.period, "today") : ssrLooseEqual(filters.value.period, "today")) ? " selected" : ""}>Hoy</option><option value="week" class="bg-gray-800 text-white hover:bg-gray-700" data-v-ae54f59c${ssrIncludeBooleanAttr(Array.isArray(filters.value.period) ? ssrLooseContain(filters.value.period, "week") : ssrLooseEqual(filters.value.period, "week")) ? " selected" : ""}>Esta semana</option><option value="month" class="bg-gray-800 text-white hover:bg-gray-700" data-v-ae54f59c${ssrIncludeBooleanAttr(Array.isArray(filters.value.period) ? ssrLooseContain(filters.value.period, "month") : ssrLooseEqual(filters.value.period, "month")) ? " selected" : ""}>Este mes</option></select><div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none" data-v-ae54f59c><svg class="w-5 h-5 text-gray-400 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-ae54f59c><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-ae54f59c></path></svg></div>`);
      if (filters.value.period !== "all") {
        _push(`<div class="absolute -top-1 -right-1" data-v-ae54f59c><div class="w-3 h-3 bg-cyan-400 rounded-full border-2 border-gray-800" data-v-ae54f59c></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div><div class="flex items-center justify-between mt-6" data-v-ae54f59c><div class="flex items-center space-x-3" data-v-ae54f59c><button class="px-4 py-2 bg-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors" data-v-ae54f59c> Limpiar Filtros </button><button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors" data-v-ae54f59c> Marcar Todo como Resuelto </button><button class="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors" title="Elimina alertas resueltas con m\xE1s de 30 d\xEDas" data-v-ae54f59c> Limpiar Antiguas </button></div><div class="text-sm text-gray-400" data-v-ae54f59c>${ssrInterpolate(filteredAlerts.value.length)} alertas encontradas </div></div></div>`);
      _push(ssrRenderComponent(AlertsTable, {
        alerts: filteredAlerts.value,
        showDeleteButton: true,
        onAlertResolved: handleAlertResolved,
        onAlertDeleted: handleAlertDeleted
      }, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(ConfirmDeleteModal, {
        isOpen: showDeleteModal.value,
        title: "Eliminar Alerta",
        message: alertToDelete.value ? `\xBFEst\xE1s seguro de que deseas eliminar la alerta '${alertToDelete.value.title}'?` : "",
        warningMessage: "Esta acci\xF3n no se puede deshacer.",
        confirmText: "S\xED, eliminar",
        onConfirm: confirmDeleteAlert,
        onCancel: cancelDeleteAlert
      }, null, _parent));
      _push(ssrRenderComponent(CleanOldAlertsModal, {
        isOpen: showCleanModal.value,
        isAdmin: false,
        defaultDays: 30,
        onConfirm: confirmCleanOldAlerts,
        onCancel: cancelCleanOldAlerts
      }, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/alertas.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const alertas = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ae54f59c"]]);

export { alertas as default };
//# sourceMappingURL=alertas-CTgsBxjo.mjs.map
