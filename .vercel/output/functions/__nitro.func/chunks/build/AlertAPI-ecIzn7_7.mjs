import { computed, mergeProps, withCtx, unref, createVNode, resolveDynamicComponent, createBlock, openBlock, createCommentVNode, Fragment, renderList, toDisplayString, createTextVNode, ref, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrRenderVNode, ssrInterpolate, ssrRenderAttrs, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { u as useToastNotifications } from './useToastNotifications-DaJGJiXK.mjs';
import { a as alertsIcon } from './index-0YkbgJTu.mjs';
import { B as BaseCard } from './BaseCard-BGENKLa5.mjs';
import { _ as _export_sfc, b as useRuntimeConfig } from './server.mjs';
import { C as CheckIcon, T as ThermometerIcon } from './ThermometerIcon-CWsbcdy6.mjs';
import { P as PlantIcon } from './PlantIcon-DoN4-AKe.mjs';

const _sfc_main$4 = {};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs) {
  _push(`<svg${ssrRenderAttrs(mergeProps({
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    viewBox: "0 0 24 24",
    class: "w-4 h-4"
  }, _attrs))}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`);
}
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("assets/icons/UserIcon.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const UserIcon = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["ssrRender", _sfc_ssrRender$2]]);
const _sfc_main$3 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  _push(`<svg${ssrRenderAttrs(mergeProps({
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    viewBox: "0 0 24 24",
    class: "w-4 h-4"
  }, _attrs))}><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>`);
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("assets/icons/DeviceIcon.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const DeviceIcon = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["ssrRender", _sfc_ssrRender$1]]);
const _sfc_main$2 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<svg${ssrRenderAttrs(mergeProps({
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    viewBox: "0 0 24 24",
    class: "w-4 h-4"
  }, _attrs))}><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path></svg>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("assets/icons/WateringIcon.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const WateringIcon = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main$1 = {
  __name: "AlertsTable",
  __ssrInlineRender: true,
  props: {
    alerts: {
      type: Array,
      default: () => []
    },
    showDeleteButton: {
      type: Boolean,
      default: false
    },
    showUserInfo: {
      type: Boolean,
      default: false
    }
  },
  emits: ["alert-resolved", "alert-deleted"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { toast } = useToastNotifications();
    const unreadCount = computed(() => {
      return props.alerts.filter((alert) => !alert.is_resolved).length;
    });
    const getSeverityColor = (severity) => {
      const colors = {
        info: "bg-blue-500",
        success: "bg-green-500",
        warning: "bg-yellow-500",
        error: "bg-red-500"
      };
      return colors[severity] || "bg-gray-500";
    };
    const getSeverityBadgeColor = (severity) => {
      const colors = {
        info: "bg-blue-900/30 text-blue-400 border border-blue-500/30",
        success: "bg-green-900/30 text-green-400 border border-green-500/30",
        warning: "bg-yellow-900/30 text-yellow-400 border border-yellow-500/30",
        error: "bg-red-900/30 text-red-400 border border-red-500/30"
      };
      return colors[severity] || "bg-gray-700 text-gray-400 border border-gray-600";
    };
    const getSeverityDotColor = (severity) => {
      const colors = {
        info: "bg-blue-400",
        success: "bg-green-400",
        warning: "bg-yellow-400",
        error: "bg-red-400"
      };
      return colors[severity] || "bg-gray-500";
    };
    const getSeverityLabel = (severity) => {
      const labels = {
        info: "Info",
        success: "\xC9xito",
        warning: "Advertencia",
        error: "Error"
      };
      return labels[severity] || "Desconocido";
    };
    const getCategoryColor = (category) => {
      const colors = {
        user: "bg-purple-900/30 text-purple-300 border border-purple-500/30",
        environmental: "bg-orange-900/30 text-orange-300 border border-orange-500/30",
        device: "bg-blue-900/30 text-blue-300 border border-blue-500/30",
        crop: "bg-green-900/30 text-green-300 border border-green-500/30",
        irrigation: "bg-cyan-900/30 text-cyan-300 border border-cyan-500/30"
      };
      return colors[category] || "bg-gray-700 text-gray-300 border border-gray-600";
    };
    const getCategoryLabel = (category) => {
      const labels = {
        user: "Usuario",
        environmental: "Ambiental",
        device: "Dispositivo",
        crop: "Cultivo",
        irrigation: "Riego"
      };
      return labels[category] || "Desconocido";
    };
    const getSubcategoryColor = (subcategory) => {
      const colors = {
        temperature: "bg-red-900/30 text-red-300 border border-red-500/30",
        humidity: "bg-blue-900/30 text-blue-300 border border-blue-500/30",
        moisture: "bg-green-900/30 text-green-300 border border-green-500/30",
        water_level: "bg-purple-900/30 text-purple-300 border border-purple-500/30",
        pressure: "bg-orange-900/30 text-orange-300 border border-orange-500/30"
      };
      return colors[subcategory] || "bg-gray-700 text-gray-300 border border-gray-600";
    };
    const getAlertIcon = (category) => {
      const icons = {
        user: UserIcon,
        environmental: ThermometerIcon,
        device: DeviceIcon,
        crop: PlantIcon,
        irrigation: WateringIcon
      };
      return icons[category] || alertsIcon;
    };
    const getStatusColor = (alert) => {
      if (alert.is_resolved) {
        return "bg-gray-700 text-gray-300 border border-gray-600";
      } else {
        return "bg-orange-900/30 text-orange-400 border border-orange-500/30";
      }
    };
    const getStatusDotColor = (alert) => {
      if (alert.is_resolved) {
        return "bg-gray-400";
      } else {
        return "bg-orange-400";
      }
    };
    const getStatusLabel = (alert) => {
      if (alert.is_resolved) {
        return "Resuelta";
      } else {
        return "Nueva";
      }
    };
    const getMetadataText = (metadata) => {
      if (metadata.crop_name) {
        return `Cultivo: ${metadata.crop_name}`;
      } else if (metadata.device_name) {
        return `Dispositivo: ${metadata.device_name}`;
      } else if (metadata.temperature) {
        return `Temp: ${metadata.temperature}\xB0C`;
      } else if (metadata.humidity) {
        return `Humedad: ${metadata.humidity}%`;
      } else if (metadata.scheduled_time) {
        return `Programado: ${metadata.scheduled_time}`;
      }
      return "";
    };
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
      });
    };
    const formatTime = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit"
      });
    };
    const getUserRoleLabel = (role) => {
      const labels = {
        admin: "Administrador",
        usuario: "Usuario",
        visitante: "Visitante"
      };
      return labels[role] || role;
    };
    const markAsResolved = async (alert) => {
      try {
        emit("alert-resolved", alert.id);
      } catch (error) {
        console.error("Error al marcar alerta como resuelta:", error);
        toast.error("Error al marcar alerta como resuelta");
      }
    };
    const deleteAlert = async (alert) => {
      emit("alert-deleted", alert.id);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(BaseCard, mergeProps({ title: "Alertas del Sistema" }, _attrs), {
        "header-actions": withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center space-x-4" data-v-a19bb525${_scopeId}><div class="flex items-center space-x-2" data-v-a19bb525${_scopeId}><span class="text-sm text-gray-300 font-bold" data-v-a19bb525${_scopeId}>Total: ${ssrInterpolate(__props.alerts.length)}</span>`);
            if (unreadCount.value > 0) {
              _push2(`<span class="text-xs text-orange-500 bg-orange-900/30 px-2 py-1 rounded-full" data-v-a19bb525${_scopeId}>${ssrInterpolate(unreadCount.value)} nuevas </span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center space-x-4" }, [
                createVNode("div", { class: "flex items-center space-x-2" }, [
                  createVNode("span", { class: "text-sm text-gray-300 font-bold" }, "Total: " + toDisplayString(__props.alerts.length), 1),
                  unreadCount.value > 0 ? (openBlock(), createBlock("span", {
                    key: 0,
                    class: "text-xs text-orange-500 bg-orange-900/30 px-2 py-1 rounded-full"
                  }, toDisplayString(unreadCount.value) + " nuevas ", 1)) : createCommentVNode("", true)
                ])
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="overflow-x-auto" data-v-a19bb525${_scopeId}>`);
            if (__props.alerts.length === 0) {
              _push2(`<div class="text-center py-12" data-v-a19bb525${_scopeId}>`);
              _push2(ssrRenderComponent(unref(alertsIcon), { class: "mx-auto mb-4 opacity-50" }, null, _parent2, _scopeId));
              _push2(`<h3 class="text-lg font-medium text-white mb-2" data-v-a19bb525${_scopeId}>No se encontraron alertas</h3><p class="text-gray-400" data-v-a19bb525${_scopeId}>Intenta ajustar los filtros para encontrar alertas</p></div>`);
            } else {
              _push2(`<table class="w-full text-sm text-left" data-v-a19bb525${_scopeId}><thead class="text-xs text-gray-300 uppercase bg-gray-800/50 border-b border-gray-600" data-v-a19bb525${_scopeId}><tr data-v-a19bb525${_scopeId}><th scope="col" class="px-6 py-4 font-medium" data-v-a19bb525${_scopeId}>Alerta</th>`);
              if (__props.showUserInfo) {
                _push2(`<th scope="col" class="px-6 py-4 font-medium" data-v-a19bb525${_scopeId}>Usuario</th>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<th scope="col" class="px-6 py-4 font-medium" data-v-a19bb525${_scopeId}>Categor\xEDa</th><th scope="col" class="px-6 py-4 font-medium" data-v-a19bb525${_scopeId}>Subcategor\xEDa</th><th scope="col" class="px-6 py-4 font-medium text-center" data-v-a19bb525${_scopeId}>Severidad</th><th scope="col" class="px-6 py-4 font-medium text-center" data-v-a19bb525${_scopeId}>Estado</th><th scope="col" class="px-6 py-4 font-medium text-center" data-v-a19bb525${_scopeId}>Fecha</th><th scope="col" class="px-6 py-4 font-medium text-center" data-v-a19bb525${_scopeId}>Acciones</th></tr></thead><tbody class="divide-y divide-gray-600" data-v-a19bb525${_scopeId}><!--[-->`);
              ssrRenderList(__props.alerts, (alert) => {
                _push2(`<tr class="hover:bg-gray-800/30 transition-colors duration-150" data-v-a19bb525${_scopeId}><td class="px-6 py-4" data-v-a19bb525${_scopeId}><div class="flex items-start" data-v-a19bb525${_scopeId}><div class="${ssrRenderClass([getSeverityColor(alert.severity), "flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center mr-4 relative"])}" data-v-a19bb525${_scopeId}>`);
                ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(getAlertIcon(alert.alert_type)), { class: "w-5 h-5 text-white" }, null), _parent2, _scopeId);
                if (!alert.is_resolved) {
                  _push2(`<div class="absolute -top-1 -left-1 w-3 h-3 bg-orange-400 rounded-full animate-pulse" data-v-a19bb525${_scopeId}></div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div><div class="flex-1" data-v-a19bb525${_scopeId}><div class="font-medium text-white mb-1" data-v-a19bb525${_scopeId}>${ssrInterpolate(alert.title)}</div><div class="text-sm text-gray-400" data-v-a19bb525${_scopeId}>${ssrInterpolate(alert.message)}</div>`);
                if (alert.metadata) {
                  _push2(`<div class="text-xs text-gray-500 mt-1" data-v-a19bb525${_scopeId}>${ssrInterpolate(getMetadataText(alert.metadata))}</div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div></div></td>`);
                if (__props.showUserInfo) {
                  _push2(`<td class="px-6 py-4" data-v-a19bb525${_scopeId}><div class="flex items-center" data-v-a19bb525${_scopeId}>`);
                  _push2(ssrRenderComponent(unref(UserIcon), { class: "w-4 h-4 text-gray-400 mr-2" }, null, _parent2, _scopeId));
                  _push2(`<div data-v-a19bb525${_scopeId}><div class="text-sm font-medium text-white" data-v-a19bb525${_scopeId}>${ssrInterpolate(alert.user_name || "Usuario eliminado")}</div><div class="text-xs text-gray-400" data-v-a19bb525${_scopeId}>${ssrInterpolate(alert.user_email || "N/A")}</div>`);
                  if (alert.user_role) {
                    _push2(`<div class="text-xs text-blue-400" data-v-a19bb525${_scopeId}>${ssrInterpolate(getUserRoleLabel(alert.user_role))}</div>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`</div></div></td>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<td class="px-6 py-4" data-v-a19bb525${_scopeId}><span class="${ssrRenderClass([getCategoryColor(alert.alert_type), "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"])}" data-v-a19bb525${_scopeId}>${ssrInterpolate(getCategoryLabel(alert.alert_type))}</span></td><td class="px-6 py-4" data-v-a19bb525${_scopeId}>`);
                if (alert.formatted_subtype) {
                  _push2(`<span class="${ssrRenderClass([getSubcategoryColor(alert.alert_subtype), "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"])}" data-v-a19bb525${_scopeId}>${ssrInterpolate(alert.formatted_subtype)}</span>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</td><td class="px-6 py-4 text-center" data-v-a19bb525${_scopeId}><div class="flex items-center justify-center" data-v-a19bb525${_scopeId}><div class="${ssrRenderClass([getSeverityBadgeColor(alert.severity), "flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium"])}" data-v-a19bb525${_scopeId}><div class="${ssrRenderClass([getSeverityDotColor(alert.severity), "w-2 h-2 rounded-full"])}" data-v-a19bb525${_scopeId}></div><span data-v-a19bb525${_scopeId}>${ssrInterpolate(getSeverityLabel(alert.severity))}</span></div></div></td><td class="px-6 py-4 text-center" data-v-a19bb525${_scopeId}><div class="flex flex-col items-center space-y-1" data-v-a19bb525${_scopeId}><div class="${ssrRenderClass([getStatusColor(alert), "flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium"])}" data-v-a19bb525${_scopeId}><div class="${ssrRenderClass([getStatusDotColor(alert), "w-2 h-2 rounded-full"])}" data-v-a19bb525${_scopeId}></div><span data-v-a19bb525${_scopeId}>${ssrInterpolate(getStatusLabel(alert))}</span></div>`);
                if (!alert.is_resolved) {
                  _push2(`<span class="text-xs text-orange-400 font-medium" data-v-a19bb525${_scopeId}> Nueva </span>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div></td><td class="px-6 py-4 text-center" data-v-a19bb525${_scopeId}><div class="text-gray-300" data-v-a19bb525${_scopeId}><div class="text-sm font-medium" data-v-a19bb525${_scopeId}>${ssrInterpolate(formatDate(alert.created_at))}</div><div class="text-xs text-gray-500" data-v-a19bb525${_scopeId}>${ssrInterpolate(formatTime(alert.created_at))}</div></div></td><td class="px-6 py-4 text-center" data-v-a19bb525${_scopeId}><div class="flex items-center justify-center space-x-2" data-v-a19bb525${_scopeId}>`);
                if (!alert.is_resolved) {
                  _push2(`<button class="inline-flex items-center px-3 py-1 rounded-md text-xs font-medium bg-green-600 text-white hover:bg-green-700 transition-colors" title="Marcar como resuelta" data-v-a19bb525${_scopeId}>`);
                  _push2(ssrRenderComponent(unref(CheckIcon), { class: "w-3 h-3 mr-1" }, null, _parent2, _scopeId));
                  _push2(` Resolver </button>`);
                } else {
                  _push2(`<span class="text-xs text-gray-500 mr-2" data-v-a19bb525${_scopeId}> Resuelta </span>`);
                }
                if (__props.showDeleteButton) {
                  _push2(`<button class="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-red-600 text-white hover:bg-red-700 transition-colors" title="Eliminar alerta" data-v-a19bb525${_scopeId}><svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-a19bb525${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" data-v-a19bb525${_scopeId}></path></svg></button>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div></td></tr>`);
              });
              _push2(`<!--]--></tbody></table>`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "overflow-x-auto" }, [
                __props.alerts.length === 0 ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "text-center py-12"
                }, [
                  createVNode(unref(alertsIcon), { class: "mx-auto mb-4 opacity-50" }),
                  createVNode("h3", { class: "text-lg font-medium text-white mb-2" }, "No se encontraron alertas"),
                  createVNode("p", { class: "text-gray-400" }, "Intenta ajustar los filtros para encontrar alertas")
                ])) : (openBlock(), createBlock("table", {
                  key: 1,
                  class: "w-full text-sm text-left"
                }, [
                  createVNode("thead", { class: "text-xs text-gray-300 uppercase bg-gray-800/50 border-b border-gray-600" }, [
                    createVNode("tr", null, [
                      createVNode("th", {
                        scope: "col",
                        class: "px-6 py-4 font-medium"
                      }, "Alerta"),
                      __props.showUserInfo ? (openBlock(), createBlock("th", {
                        key: 0,
                        scope: "col",
                        class: "px-6 py-4 font-medium"
                      }, "Usuario")) : createCommentVNode("", true),
                      createVNode("th", {
                        scope: "col",
                        class: "px-6 py-4 font-medium"
                      }, "Categor\xEDa"),
                      createVNode("th", {
                        scope: "col",
                        class: "px-6 py-4 font-medium"
                      }, "Subcategor\xEDa"),
                      createVNode("th", {
                        scope: "col",
                        class: "px-6 py-4 font-medium text-center"
                      }, "Severidad"),
                      createVNode("th", {
                        scope: "col",
                        class: "px-6 py-4 font-medium text-center"
                      }, "Estado"),
                      createVNode("th", {
                        scope: "col",
                        class: "px-6 py-4 font-medium text-center"
                      }, "Fecha"),
                      createVNode("th", {
                        scope: "col",
                        class: "px-6 py-4 font-medium text-center"
                      }, "Acciones")
                    ])
                  ]),
                  createVNode("tbody", { class: "divide-y divide-gray-600" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.alerts, (alert) => {
                      return openBlock(), createBlock("tr", {
                        key: alert.id,
                        class: "hover:bg-gray-800/30 transition-colors duration-150"
                      }, [
                        createVNode("td", { class: "px-6 py-4" }, [
                          createVNode("div", { class: "flex items-start" }, [
                            createVNode("div", {
                              class: ["flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center mr-4 relative", getSeverityColor(alert.severity)]
                            }, [
                              (openBlock(), createBlock(resolveDynamicComponent(getAlertIcon(alert.alert_type)), { class: "w-5 h-5 text-white" })),
                              !alert.is_resolved ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "absolute -top-1 -left-1 w-3 h-3 bg-orange-400 rounded-full animate-pulse"
                              })) : createCommentVNode("", true)
                            ], 2),
                            createVNode("div", { class: "flex-1" }, [
                              createVNode("div", { class: "font-medium text-white mb-1" }, toDisplayString(alert.title), 1),
                              createVNode("div", { class: "text-sm text-gray-400" }, toDisplayString(alert.message), 1),
                              alert.metadata ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "text-xs text-gray-500 mt-1"
                              }, toDisplayString(getMetadataText(alert.metadata)), 1)) : createCommentVNode("", true)
                            ])
                          ])
                        ]),
                        __props.showUserInfo ? (openBlock(), createBlock("td", {
                          key: 0,
                          class: "px-6 py-4"
                        }, [
                          createVNode("div", { class: "flex items-center" }, [
                            createVNode(unref(UserIcon), { class: "w-4 h-4 text-gray-400 mr-2" }),
                            createVNode("div", null, [
                              createVNode("div", { class: "text-sm font-medium text-white" }, toDisplayString(alert.user_name || "Usuario eliminado"), 1),
                              createVNode("div", { class: "text-xs text-gray-400" }, toDisplayString(alert.user_email || "N/A"), 1),
                              alert.user_role ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "text-xs text-blue-400"
                              }, toDisplayString(getUserRoleLabel(alert.user_role)), 1)) : createCommentVNode("", true)
                            ])
                          ])
                        ])) : createCommentVNode("", true),
                        createVNode("td", { class: "px-6 py-4" }, [
                          createVNode("span", {
                            class: ["inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium", getCategoryColor(alert.alert_type)]
                          }, toDisplayString(getCategoryLabel(alert.alert_type)), 3)
                        ]),
                        createVNode("td", { class: "px-6 py-4" }, [
                          alert.formatted_subtype ? (openBlock(), createBlock("span", {
                            key: 0,
                            class: ["inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium", getSubcategoryColor(alert.alert_subtype)]
                          }, toDisplayString(alert.formatted_subtype), 3)) : createCommentVNode("", true)
                        ]),
                        createVNode("td", { class: "px-6 py-4 text-center" }, [
                          createVNode("div", { class: "flex items-center justify-center" }, [
                            createVNode("div", {
                              class: ["flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium", getSeverityBadgeColor(alert.severity)]
                            }, [
                              createVNode("div", {
                                class: ["w-2 h-2 rounded-full", getSeverityDotColor(alert.severity)]
                              }, null, 2),
                              createVNode("span", null, toDisplayString(getSeverityLabel(alert.severity)), 1)
                            ], 2)
                          ])
                        ]),
                        createVNode("td", { class: "px-6 py-4 text-center" }, [
                          createVNode("div", { class: "flex flex-col items-center space-y-1" }, [
                            createVNode("div", {
                              class: ["flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium", getStatusColor(alert)]
                            }, [
                              createVNode("div", {
                                class: ["w-2 h-2 rounded-full", getStatusDotColor(alert)]
                              }, null, 2),
                              createVNode("span", null, toDisplayString(getStatusLabel(alert)), 1)
                            ], 2),
                            !alert.is_resolved ? (openBlock(), createBlock("span", {
                              key: 0,
                              class: "text-xs text-orange-400 font-medium"
                            }, " Nueva ")) : createCommentVNode("", true)
                          ])
                        ]),
                        createVNode("td", { class: "px-6 py-4 text-center" }, [
                          createVNode("div", { class: "text-gray-300" }, [
                            createVNode("div", { class: "text-sm font-medium" }, toDisplayString(formatDate(alert.created_at)), 1),
                            createVNode("div", { class: "text-xs text-gray-500" }, toDisplayString(formatTime(alert.created_at)), 1)
                          ])
                        ]),
                        createVNode("td", { class: "px-6 py-4 text-center" }, [
                          createVNode("div", { class: "flex items-center justify-center space-x-2" }, [
                            !alert.is_resolved ? (openBlock(), createBlock("button", {
                              key: 0,
                              onClick: ($event) => markAsResolved(alert),
                              class: "inline-flex items-center px-3 py-1 rounded-md text-xs font-medium bg-green-600 text-white hover:bg-green-700 transition-colors",
                              title: "Marcar como resuelta"
                            }, [
                              createVNode(unref(CheckIcon), { class: "w-3 h-3 mr-1" }),
                              createTextVNode(" Resolver ")
                            ], 8, ["onClick"])) : (openBlock(), createBlock("span", {
                              key: 1,
                              class: "text-xs text-gray-500 mr-2"
                            }, " Resuelta ")),
                            __props.showDeleteButton ? (openBlock(), createBlock("button", {
                              key: 2,
                              onClick: ($event) => deleteAlert(alert),
                              class: "inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-red-600 text-white hover:bg-red-700 transition-colors",
                              title: "Eliminar alerta"
                            }, [
                              (openBlock(), createBlock("svg", {
                                class: "w-3 h-3",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24"
                              }, [
                                createVNode("path", {
                                  "stroke-linecap": "round",
                                  "stroke-linejoin": "round",
                                  "stroke-width": "2",
                                  d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                })
                              ]))
                            ], 8, ["onClick"])) : createCommentVNode("", true)
                          ])
                        ])
                      ]);
                    }), 128))
                  ])
                ]))
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Alerts/AlertsTable.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const AlertsTable = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-a19bb525"]]);
const _sfc_main = {
  __name: "ConfirmDeleteModal",
  __ssrInlineRender: true,
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: "Confirmar eliminaci\xF3n"
    },
    message: {
      type: String,
      default: "\xBFEst\xE1s seguro de que deseas eliminar este elemento?"
    },
    warningMessage: {
      type: String,
      default: ""
    },
    confirmText: {
      type: String,
      default: "S\xED, eliminar"
    }
  },
  emits: ["confirm", "cancel"],
  setup(__props, { emit: __emit }) {
    const isLoading = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.isOpen) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed inset-0 z-50 overflow-y-auto" }, _attrs))} data-v-84d6748b><div class="fixed inset-0 bg-black bg-opacity-75 transition-opacity" data-v-84d6748b></div><div class="flex min-h-screen items-center justify-center p-4" data-v-84d6748b><div class="relative bg-gray-800 rounded-xl shadow-2xl border border-gray-700 max-w-md w-full mx-auto transform transition-all" data-v-84d6748b><div class="px-6 py-4 border-b border-gray-700" data-v-84d6748b><div class="flex items-center space-x-3" data-v-84d6748b><div class="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center" data-v-84d6748b><svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-84d6748b><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" data-v-84d6748b></path></svg></div><h3 class="text-lg font-semibold text-white" data-v-84d6748b>${ssrInterpolate(__props.title)}</h3></div></div><div class="px-6 py-4" data-v-84d6748b><p class="text-gray-300" data-v-84d6748b>${ssrInterpolate(__props.message)}</p>`);
        if (__props.warningMessage) {
          _push(`<div class="mt-3 p-3 bg-yellow-900/30 border border-yellow-600 rounded-lg" data-v-84d6748b><p class="text-yellow-300 text-sm" data-v-84d6748b>${ssrInterpolate(__props.warningMessage)}</p></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="px-6 py-4 border-t border-gray-700 flex justify-end space-x-3" data-v-84d6748b><button class="px-4 py-2 bg-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors" data-v-84d6748b> Cancelar </button><button class="${ssrRenderClass([{ "animate-pulse": isLoading.value }, "px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"])}"${ssrIncludeBooleanAttr(isLoading.value) ? " disabled" : ""} data-v-84d6748b>${ssrInterpolate(isLoading.value ? "Eliminando..." : __props.confirmText)}</button></div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Modals/ConfirmDeleteModal.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ConfirmDeleteModal = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-84d6748b"]]);
const getApiUrl = () => {
  const config = useRuntimeConfig();
  return config.public.apiUrl || "http://localhost:3001/api";
};
const getAuthHeaders = () => {
  return {};
};
const AlertAPI = {
  // Rutas básicas CRUD
  getById(id) {
    return $fetch(`/alerts/${id}`, {
      method: "GET",
      baseURL: getApiUrl(),
      headers: getAuthHeaders()
    });
  },
  delete(id) {
    return $fetch(`/alerts/${id}`, {
      method: "DELETE",
      baseURL: getApiUrl(),
      headers: getAuthHeaders()
    });
  },
  // Obtener alertas del usuario autenticado
  getMyAlerts(params = {}) {
    return $fetch("/alerts", {
      method: "GET",
      query: params,
      baseURL: getApiUrl(),
      headers: getAuthHeaders()
    });
  },
  // Rutas para resolver alertas
  resolveAllAlertsByUserId() {
    return $fetch("/alerts/resolve-all", {
      method: "PUT",
      baseURL: getApiUrl(),
      headers: getAuthHeaders()
    });
  },
  // Eliminar todas las alertas del usuario autenticado
  deleteMyOldAlerts() {
    return $fetch("/alerts/old", {
      method: "DELETE",
      baseURL: getApiUrl(),
      headers: getAuthHeaders()
    });
  },
  // Rutas para administrador
  getAllAlertsWithUsers(params = {}) {
    return $fetch("/alerts/admin/all", {
      method: "GET",
      query: params,
      baseURL: getApiUrl(),
      headers: getAuthHeaders()
    });
  },
  deleteAllSystemAlerts() {
    return $fetch("/alerts/admin/all", {
      method: "DELETE",
      baseURL: getApiUrl(),
      headers: getAuthHeaders()
    });
  },
  // Rutas de acciones
  resolveAlert(id) {
    return $fetch(`/alerts/${id}/resolve`, {
      method: "PUT",
      baseURL: getApiUrl(),
      headers: getAuthHeaders()
    });
  }
};

export { AlertsTable as A, ConfirmDeleteModal as C, AlertAPI as a };
//# sourceMappingURL=AlertAPI-ecIzn7_7.mjs.map
