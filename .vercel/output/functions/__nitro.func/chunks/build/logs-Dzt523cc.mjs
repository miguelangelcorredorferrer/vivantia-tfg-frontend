import { ref, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from 'vue/server-renderer';
import { u as useToastNotifications } from './useToastNotifications-DaJGJiXK.mjs';
import { a as alertsIcon } from './index-0YkbgJTu.mjs';
import { A as AlertsTable, C as ConfirmDeleteModal, a as AlertAPI } from './AlertAPI-ecIzn7_7.mjs';
import { u as useHead } from './v3-DHK4yxVL.mjs';
import './server.mjs';
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
import './BaseCard-BGENKLa5.mjs';
import './ThermometerIcon-CWsbcdy6.mjs';
import './PlantIcon-DoN4-AKe.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';

const _sfc_main = {
  __name: "logs",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Logs del Sistema - Admin - VIVANTIA",
      meta: [
        { name: "description", content: "Panel de administraci\xF3n para gestionar logs y alertas del sistema" }
      ]
    });
    const { toast } = useToastNotifications();
    const filters = ref({
      category: "",
      severity: "",
      user: "",
      status: "",
      period: "all"
    });
    const loading = ref(false);
    const alerts = ref([]);
    const totalSystemAlerts = ref(0);
    const showDeleteModal = ref(false);
    const showDeleteAllModal = ref(false);
    const alertToDelete = ref(null);
    const loadSystemAlerts = async () => {
      try {
        loading.value = true;
        const response = await AlertAPI.getAllAlertsWithUsers();
        alerts.value = response.data || [];
        totalSystemAlerts.value = alerts.value.length;
      } catch (error) {
        console.error("Error al cargar alertas del sistema:", error);
        toast.error("Error al cargar las alertas del sistema");
        alerts.value = [];
      } finally {
        loading.value = false;
      }
    };
    const filteredAlerts = computed(() => {
      let filtered = alerts.value;
      if (filters.value.category) {
        filtered = filtered.filter((alert) => alert.alert_type === filters.value.category);
      }
      if (filters.value.severity) {
        filtered = filtered.filter((alert) => alert.severity === filters.value.severity);
      }
      if (filters.value.user) {
        filtered = filtered.filter(
          (alert) => {
            var _a, _b;
            return ((_a = alert.user_name) == null ? void 0 : _a.toLowerCase().includes(filters.value.user.toLowerCase())) || ((_b = alert.user_email) == null ? void 0 : _b.toLowerCase().includes(filters.value.user.toLowerCase()));
          }
        );
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
    const unreadAlertsCount = computed(() => alerts.value.filter((alert) => !alert.is_resolved).length);
    const criticalAlertsCount = computed(() => alerts.value.filter((alert) => alert.severity === "error" || alert.severity === "warning").length);
    const usersWithAlerts = computed(() => {
      const uniqueUsers = /* @__PURE__ */ new Set();
      alerts.value.forEach((alert) => {
        if (alert.user_email) {
          uniqueUsers.add(alert.user_email);
        }
      });
      return uniqueUsers.size;
    });
    const confirmDeleteAllAlerts = async () => {
      try {
        const response = await AlertAPI.deleteAllSystemAlerts();
        await loadSystemAlerts();
        toast.success(`${response.count || 0} alertas eliminadas del sistema`);
      } catch (error) {
        console.error("Error al eliminar todas las alertas:", error);
        toast.error("Error al eliminar todas las alertas del sistema");
      } finally {
        showDeleteAllModal.value = false;
      }
    };
    const cancelDeleteAllAlerts = () => {
      showDeleteAllModal.value = false;
    };
    const handleAlertResolved = async (alertId) => {
      try {
        await AlertAPI.resolveAlert(alertId);
        await loadSystemAlerts();
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
          await loadSystemAlerts();
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
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-8" }, _attrs))}><div class="max-w-7xl mx-auto"><div class="bg-gradient-to-r from-red-800 to-red-900 rounded-xl shadow-lg p-6 mb-8 border border-red-700"><div class="flex items-center justify-between"><div class="flex items-center space-x-4"><div class="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg">`);
      _push(ssrRenderComponent(unref(alertsIcon), null, null, _parent));
      _push(`</div><div><h1 class="text-2xl font-bold text-white">Logs del Sistema</h1><p class="text-red-100">Panel de administraci\xF3n - Gesti\xF3n completa de alertas del sistema</p></div></div><div class="flex items-center space-x-6"><div class="text-center"><div class="text-2xl font-bold text-white">${ssrInterpolate(totalSystemAlerts.value)}</div><div class="text-sm text-red-200">Total Sistema</div></div><div class="text-center"><div class="text-2xl font-bold text-orange-400">${ssrInterpolate(unreadAlertsCount.value)}</div><div class="text-sm text-red-200">Sin Resolver</div></div><div class="text-center"><div class="text-2xl font-bold text-red-300">${ssrInterpolate(criticalAlertsCount.value)}</div><div class="text-sm text-red-200">Cr\xEDticas</div></div><div class="text-center"><div class="text-2xl font-bold text-blue-300">${ssrInterpolate(usersWithAlerts.value)}</div><div class="text-sm text-red-200">Usuarios</div></div></div></div></div><div class="bg-gray-800 rounded-xl shadow-lg p-6 mb-8 border border-gray-700"><div class="flex items-center justify-between mb-4"><h2 class="text-lg font-semibold text-white">Filtros Avanzados</h2><div class="flex items-center space-x-2"><div class="w-3 h-3 bg-red-500 rounded-full"></div><span class="text-sm text-gray-400">Panel de Administrador</span></div></div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4"><div><label class="block text-sm font-medium text-gray-300 mb-2">Categor\xEDa</label><select class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-white"><option value=""${ssrIncludeBooleanAttr(Array.isArray(filters.value.category) ? ssrLooseContain(filters.value.category, "") : ssrLooseEqual(filters.value.category, "")) ? " selected" : ""}>Todas las categor\xEDas</option><option value="user"${ssrIncludeBooleanAttr(Array.isArray(filters.value.category) ? ssrLooseContain(filters.value.category, "user") : ssrLooseEqual(filters.value.category, "user")) ? " selected" : ""}>Usuario</option><option value="environmental"${ssrIncludeBooleanAttr(Array.isArray(filters.value.category) ? ssrLooseContain(filters.value.category, "environmental") : ssrLooseEqual(filters.value.category, "environmental")) ? " selected" : ""}>Ambiental</option><option value="device"${ssrIncludeBooleanAttr(Array.isArray(filters.value.category) ? ssrLooseContain(filters.value.category, "device") : ssrLooseEqual(filters.value.category, "device")) ? " selected" : ""}>Dispositivo</option><option value="crop"${ssrIncludeBooleanAttr(Array.isArray(filters.value.category) ? ssrLooseContain(filters.value.category, "crop") : ssrLooseEqual(filters.value.category, "crop")) ? " selected" : ""}>Cultivo</option><option value="irrigation"${ssrIncludeBooleanAttr(Array.isArray(filters.value.category) ? ssrLooseContain(filters.value.category, "irrigation") : ssrLooseEqual(filters.value.category, "irrigation")) ? " selected" : ""}>Riego</option></select></div><div><label class="block text-sm font-medium text-gray-300 mb-2">Severidad</label><select class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-white"><option value=""${ssrIncludeBooleanAttr(Array.isArray(filters.value.severity) ? ssrLooseContain(filters.value.severity, "") : ssrLooseEqual(filters.value.severity, "")) ? " selected" : ""}>Todas las severidades</option><option value="info"${ssrIncludeBooleanAttr(Array.isArray(filters.value.severity) ? ssrLooseContain(filters.value.severity, "info") : ssrLooseEqual(filters.value.severity, "info")) ? " selected" : ""}>Informaci\xF3n</option><option value="success"${ssrIncludeBooleanAttr(Array.isArray(filters.value.severity) ? ssrLooseContain(filters.value.severity, "success") : ssrLooseEqual(filters.value.severity, "success")) ? " selected" : ""}>\xC9xito</option><option value="warning"${ssrIncludeBooleanAttr(Array.isArray(filters.value.severity) ? ssrLooseContain(filters.value.severity, "warning") : ssrLooseEqual(filters.value.severity, "warning")) ? " selected" : ""}>Advertencia</option><option value="error"${ssrIncludeBooleanAttr(Array.isArray(filters.value.severity) ? ssrLooseContain(filters.value.severity, "error") : ssrLooseEqual(filters.value.severity, "error")) ? " selected" : ""}>Error</option></select></div><div><label class="block text-sm font-medium text-gray-300 mb-2">Usuario</label><input${ssrRenderAttr("value", filters.value.user)} type="text" placeholder="Buscar por nombre o email..." class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-white placeholder-gray-400"></div><div><label class="block text-sm font-medium text-gray-300 mb-2">Estado</label><select class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-white"><option value=""${ssrIncludeBooleanAttr(Array.isArray(filters.value.status) ? ssrLooseContain(filters.value.status, "") : ssrLooseEqual(filters.value.status, "")) ? " selected" : ""}>Todos los estados</option><option value="unread"${ssrIncludeBooleanAttr(Array.isArray(filters.value.status) ? ssrLooseContain(filters.value.status, "unread") : ssrLooseEqual(filters.value.status, "unread")) ? " selected" : ""}>Sin Resolver</option><option value="read"${ssrIncludeBooleanAttr(Array.isArray(filters.value.status) ? ssrLooseContain(filters.value.status, "read") : ssrLooseEqual(filters.value.status, "read")) ? " selected" : ""}>Resueltas</option></select></div><div><label class="block text-sm font-medium text-gray-300 mb-2">Per\xEDodo</label><select class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-white"><option value="all"${ssrIncludeBooleanAttr(Array.isArray(filters.value.period) ? ssrLooseContain(filters.value.period, "all") : ssrLooseEqual(filters.value.period, "all")) ? " selected" : ""}>Todo el tiempo</option><option value="today"${ssrIncludeBooleanAttr(Array.isArray(filters.value.period) ? ssrLooseContain(filters.value.period, "today") : ssrLooseEqual(filters.value.period, "today")) ? " selected" : ""}>Hoy</option><option value="week"${ssrIncludeBooleanAttr(Array.isArray(filters.value.period) ? ssrLooseContain(filters.value.period, "week") : ssrLooseEqual(filters.value.period, "week")) ? " selected" : ""}>Esta semana</option><option value="month"${ssrIncludeBooleanAttr(Array.isArray(filters.value.period) ? ssrLooseContain(filters.value.period, "month") : ssrLooseEqual(filters.value.period, "month")) ? " selected" : ""}>Este mes</option></select></div></div><div class="flex items-center justify-between mt-6"><div class="flex items-center space-x-3"><button class="px-4 py-2 bg-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"> Limpiar Filtros </button><button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"> Actualizar </button><button class="px-4 py-2 bg-red-700 text-white rounded-lg hover:bg-red-800 transition-colors border-2 border-red-600" title="\u26A0\uFE0F PELIGRO: Elimina TODAS las alertas del sistema"> \u{1F5D1}\uFE0F Eliminar TODAS </button></div><div class="text-sm text-gray-400">${ssrInterpolate(filteredAlerts.value.length)} de ${ssrInterpolate(totalSystemAlerts.value)} alertas mostradas </div></div></div>`);
      if (loading.value) {
        _push(`<div class="text-center py-12"><div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div><p class="text-gray-400 mt-2">Cargando logs del sistema...</p></div>`);
      } else {
        _push(ssrRenderComponent(AlertsTable, {
          alerts: filteredAlerts.value,
          showDeleteButton: true,
          showUserInfo: true,
          onAlertResolved: handleAlertResolved,
          onAlertDeleted: handleAlertDeleted
        }, null, _parent));
      }
      _push(`</div>`);
      _push(ssrRenderComponent(ConfirmDeleteModal, {
        isOpen: showDeleteModal.value,
        title: "Eliminar Alerta",
        message: alertToDelete.value ? `\xBFEst\xE1s seguro de que deseas eliminar la alerta '${alertToDelete.value.title}' del usuario ${alertToDelete.value.user_name || "N/A"}?` : "",
        warningMessage: "Esta acci\xF3n no se puede deshacer.",
        confirmText: "S\xED, eliminar",
        onConfirm: confirmDeleteAlert,
        onCancel: cancelDeleteAlert
      }, null, _parent));
      _push(ssrRenderComponent(ConfirmDeleteModal, {
        isOpen: showDeleteAllModal.value,
        title: "\u26A0\uFE0F ELIMINAR TODAS LAS ALERTAS",
        message: "Esto eliminar\xE1 PERMANENTEMENTE todas las alertas del sistema de TODOS los usuarios.",
        warningMessage: "Esta es una acci\xF3n IRREVERSIBLE que afectar\xE1 a todo el sistema. Solo procede si est\xE1s completamente seguro.",
        confirmText: "S\xED, eliminar TODAS",
        onConfirm: confirmDeleteAllAlerts,
        onCancel: cancelDeleteAllAlerts
      }, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/logs.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=logs-Dzt523cc.mjs.map
