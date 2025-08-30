import { ref, mergeProps, unref, computed, withCtx, createVNode, resolveDynamicComponent, createBlock, createCommentVNode, openBlock, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrRenderSlot, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrRenderVNode } from 'vue/server-renderer';
import { u as useUserStore } from './user-BEdD-0tD.mjs';
import { _ as _export_sfc, g as useRoute } from './server.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-rSZMKS1E.mjs';
import { g as getIcon } from './index-0YkbgJTu.mjs';
import { l as logoUrl } from './logovivantia-B51o3jSh.mjs';
import 'pinia';
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

const _sfc_main$5 = {
  __name: "Header",
  __ssrInlineRender: true,
  emits: ["toggle-sidebar"],
  setup(__props) {
    const userStore = useUserStore();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<header${ssrRenderAttrs(mergeProps({ class: "bg-dark-header text-white shadow-lg border-b border-gray-700" }, _attrs))} data-v-5aa61b0b><div class="flex items-center justify-between px-6 py-4" data-v-5aa61b0b><div class="flex items-center space-x-3" data-v-5aa61b0b><button class="p-2 rounded-md hover:bg-gray-600 transition-colors lg:hidden" data-v-5aa61b0b><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-5aa61b0b><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" data-v-5aa61b0b></path></svg></button><div class="flex items-center space-x-3" data-v-5aa61b0b><div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center" data-v-5aa61b0b><svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20" data-v-5aa61b0b><path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" data-v-5aa61b0b></path></svg></div><div class="hidden sm:block" data-v-5aa61b0b><h1 class="text-xl font-bold text-white" data-v-5aa61b0b>${ssrInterpolate(unref(userStore).isAdmin ? "PANEL DE ADMINISTRACI\xD3N" : unref(userStore).isDemoMode ? "VISTA PREVIA - VIVANTIA" : "Optimiza cada gota, maximiza cada cosecha")}</h1><p class="text-xs text-gray-400" data-v-5aa61b0b>${ssrInterpolate(unref(userStore).isAdmin ? "Centro de Control" : unref(userStore).isDemoMode ? "Modo Demo" : "Automatizaci\xF3n de riego inteligente")}</p></div></div></div><div class="flex items-center space-x-4" data-v-5aa61b0b>`);
      if (unref(userStore).isAuthenticated && !unref(userStore).isDemoMode) {
        _push(`<div class="flex items-center space-x-3" data-v-5aa61b0b><div class="hidden sm:block text-right" data-v-5aa61b0b><p class="text-sm font-medium text-white" data-v-5aa61b0b> \xA1Bienvenido ${ssrInterpolate(unref(userStore).userName)} a Vivantia! </p><p class="text-xs text-gray-300" data-v-5aa61b0b>${ssrInterpolate(unref(userStore).userEmail)}</p></div><button class="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg" title="Ir a mi perfil" data-v-5aa61b0b><span class="text-white font-semibold text-sm" data-v-5aa61b0b>${ssrInterpolate(unref(userStore).userName.charAt(0).toUpperCase())}</span></button></div>`);
      } else if (unref(userStore).isDemoMode) {
        _push(`<div class="flex items-center space-x-3" data-v-5aa61b0b><div class="hidden sm:block text-right" data-v-5aa61b0b><p class="text-sm font-medium text-orange-300" data-v-5aa61b0b> Vista Previa - Modo Demo </p><p class="text-xs text-gray-300" data-v-5aa61b0b>Funcionalidades limitadas</p></div><button class="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-medium rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg" title="Iniciar sesi\xF3n" data-v-5aa61b0b><svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-5aa61b0b><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" data-v-5aa61b0b></path></svg> Iniciar Sesi\xF3n </button></div>`);
      } else {
        _push(`<div class="flex items-center space-x-2" data-v-5aa61b0b></div>`);
      }
      _push(`</div></div></header>`);
    };
  }
};
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Header.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const Header = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-5aa61b0b"]]);
const _sfc_main$4 = {
  __name: "SidebarItem",
  __ssrInlineRender: true,
  props: {
    icon: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    to: {
      type: String,
      required: true
    },
    active: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    const props = __props;
    const iconComponent = computed(() => {
      return getIcon(props.icon);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(ssrRenderComponent(_component_NuxtLink, mergeProps({
        to: __props.to,
        class: ["flex items-center px-4 py-3 mx-2 text-sm font-medium transition-all duration-200 rounded-lg group", [
          __props.active ? "bg-white/20 text-white shadow-lg backdrop-blur-sm border border-white/30" : "text-blue-100 hover:bg-white/10 hover:text-white"
        ]]
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(iconComponent.value), { class: "w-5 h-5 mr-3 flex-shrink-0" }, null), _parent2, _scopeId);
            _push2(`<span class="truncate" data-v-259bf889${_scopeId}>${ssrInterpolate(__props.label)}</span>`);
          } else {
            return [
              (openBlock(), createBlock(resolveDynamicComponent(iconComponent.value), { class: "w-5 h-5 mr-3 flex-shrink-0" })),
              createVNode("span", { class: "truncate" }, toDisplayString(__props.label), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/SidebarPlugin/SidebarItem.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const SidebarItem = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-259bf889"]]);
const _sfc_main$3 = {
  __name: "Sidebar",
  __ssrInlineRender: true,
  setup(__props) {
    const userStore = useUserStore();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<aside${ssrRenderAttrs(mergeProps({ class: "bg-gradient-blue-dark h-full rounded-lg shadow-xl overflow-hidden" }, _attrs))} data-v-28a3017e><div class="p-6 border-b border-blue-500/20" data-v-28a3017e><div class="flex items-center space-x-3" data-v-28a3017e><div class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm overflow-hidden" data-v-28a3017e><img${ssrRenderAttr("src", unref(logoUrl))} alt="Vivantia Logo" class="w-10 h-10 object-contain rounded-full" data-v-28a3017e></div><div data-v-28a3017e><h2 class="text-white font-bold text-lg" data-v-28a3017e>VIVANTIA</h2><p class="text-blue-200 text-xs" data-v-28a3017e>IoT Solutions</p></div></div></div><div class="px-6 py-4" data-v-28a3017e><div class="h-px bg-gradient-to-r from-transparent via-blue-300/30 to-transparent" data-v-28a3017e></div></div><nav class="px-3" data-v-28a3017e>`);
      if (!unref(userStore).isAdmin) {
        _push(`<div class="space-y-2" data-v-28a3017e>`);
        _push(ssrRenderComponent(SidebarItem, {
          icon: "dashboard",
          label: "Dashboard",
          to: "/dashboard",
          active: _ctx.$route.path === "/dashboard"
        }, null, _parent));
        _push(ssrRenderComponent(SidebarItem, {
          icon: "devices",
          label: "Dispositivos",
          to: "/dispositivos",
          active: _ctx.$route.path === "/dispositivos"
        }, null, _parent));
        _push(ssrRenderComponent(SidebarItem, {
          icon: "plant",
          label: "Cultivos",
          to: "/cultivos",
          active: _ctx.$route.path.startsWith("/cultivos")
        }, null, _parent));
        _push(ssrRenderComponent(SidebarItem, {
          icon: "watering",
          label: "Modos de Riego",
          to: "/modo",
          active: _ctx.$route.path.startsWith("/modo")
        }, null, _parent));
        _push(ssrRenderComponent(SidebarItem, {
          icon: "alerts",
          label: "Alertas",
          to: "/alertas",
          active: _ctx.$route.path === "/alertas"
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<div class="space-y-2" data-v-28a3017e>`);
        _push(ssrRenderComponent(SidebarItem, {
          icon: "users",
          label: "Gesti\xF3n de Usuarios",
          to: "/admin/usuarios",
          active: _ctx.$route.path === "/admin/usuarios"
        }, null, _parent));
        _push(ssrRenderComponent(SidebarItem, {
          icon: "plant",
          label: "Gesti\xF3n de Cultivos",
          to: "/admin/cultivos",
          active: _ctx.$route.path === "/admin/cultivos"
        }, null, _parent));
        _push(ssrRenderComponent(SidebarItem, {
          icon: "devices",
          label: "Gesti\xF3n de Dispositivos",
          to: "/admin/dispositivos",
          active: _ctx.$route.path === "/admin/dispositivos"
        }, null, _parent));
        _push(ssrRenderComponent(SidebarItem, {
          icon: "logs",
          label: "Logs del Sistema",
          to: "/admin/logs",
          active: _ctx.$route.path === "/admin/logs"
        }, null, _parent));
        _push(`</div>`);
      }
      _push(`</nav></aside>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/SidebarPlugin/Sidebar.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const Sidebar = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-28a3017e"]]);
const _sfc_main$2 = {
  __name: "Footer",
  __ssrInlineRender: true,
  setup(__props) {
    const currentDate = computed(() => {
      return (/* @__PURE__ */ new Date()).toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<footer${ssrRenderAttrs(mergeProps({ class: "bg-dark-footer text-gray-300 py-3 border-t border-gray-700" }, _attrs))} data-v-52e197a6><div class="container mx-auto px-6" data-v-52e197a6><div class="flex flex-col md:flex-row justify-between items-center" data-v-52e197a6><div class="mb-2 md:mb-0" data-v-52e197a6><p class="text-xs" data-v-52e197a6> Desarrollado por <span class="font-semibold text-white" data-v-52e197a6>Miguel \xC1ngel Corredor Ferrer (i12cofem@uco.es)</span><span class="text-gray-500 ml-2" data-v-52e197a6>| 2025 Agronom\xEDa Inteligente</span></p></div><div class="flex items-center space-x-4 text-xs text-gray-400" data-v-52e197a6><span data-v-52e197a6>v1.0.0</span><span data-v-52e197a6>|</span><span data-v-52e197a6>Vue 3 + Nuxt 3</span><span data-v-52e197a6>|</span><span data-v-52e197a6>${ssrInterpolate(currentDate.value)}</span></div></div></div></footer>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Footer.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const Footer = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-52e197a6"]]);
const _sfc_main$1 = {
  __name: "Breadcrumb",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const breadcrumbItems = computed(() => {
      const items = [];
      const pathSegments = route.path.split("/").filter((segment) => segment);
      const routeLabels = {
        "dashboard": "Dashboard",
        "dispositivos": "Dispositivos",
        "devices": "Dispositivos",
        "cultivos": "Cultivos",
        "crops": "Cultivos",
        "modo": "Modos de Riego",
        "modos": "Modos de Riego",
        "automatico": "Modo Autom\xE1tico",
        "manual": "Modo Manual",
        "programado": "Modo Programado",
        "alertas": "Alertas",
        "alerts": "Alertas",
        "perfil": "Perfil",
        "profile": "Perfil",
        "admin": "Administraci\xF3n",
        "usuarios": "Usuarios",
        "users": "Usuarios",
        "agregar": "Agregar",
        "add": "Agregar",
        "editar": "Editar",
        "edit": "Editar",
        "ver": "Ver",
        "view": "Ver",
        "analytics": "Analytics",
        "widgets": "Widgets",
        "settings": "Configuraci\xF3n"
      };
      const routeIcons = {
        "dashboard": "home",
        "dispositivos": "device",
        "devices": "device",
        "cultivos": "plant",
        "crops": "plant",
        "modo": "watering",
        "modos": "watering",
        "automatico": "automatic",
        "manual": "manual",
        "programado": "programmed",
        "alertas": "warning",
        "alerts": "warning",
        "perfil": "user",
        "profile": "user",
        "admin": "dashboard",
        "usuarios": "user",
        "users": "user",
        "agregar": "edit",
        "add": "edit",
        "editar": "edit",
        "edit": "edit",
        "ver": "home",
        "view": "home",
        "analytics": "dashboard",
        "widgets": "dashboard",
        "settings": "dashboard"
      };
      let currentPath = "";
      for (let i = 0; i < pathSegments.length; i++) {
        const segment = pathSegments[i];
        currentPath += `/${segment}`;
        const isClickable = i < pathSegments.length - 1;
        let label = routeLabels[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);
        if (!isNaN(segment) && i > 0) {
          const parentSegment = pathSegments[i - 1];
          if (parentSegment === "editar" || parentSegment === "edit") {
            label = "Editar Cultivo";
          } else if (parentSegment === "ver" || parentSegment === "view") {
            label = "Ver Cultivo";
          } else if (parentSegment === "usuarios" || parentSegment === "users") {
            label = "Editar Usuario";
          } else if (parentSegment === "dispositivos" || parentSegment === "devices") {
            label = "Editar Dispositivo";
          } else {
            label = "Detalles";
          }
        }
        let iconName = routeIcons[segment] || "home";
        if (!isNaN(segment) && i > 0) {
          const parentSegment = pathSegments[i - 1];
          if (parentSegment === "editar" || parentSegment === "edit") {
            iconName = "edit";
          } else if (parentSegment === "ver" || parentSegment === "view") {
            iconName = "home";
          } else {
            iconName = "edit";
          }
        }
        const nextSegment = pathSegments[i + 1];
        const isActionSegment = segment === "editar" || segment === "edit" || segment === "ver" || segment === "view";
        const nextIsId = nextSegment && !isNaN(nextSegment);
        if (!(isActionSegment && nextIsId)) {
          items.push({
            label,
            to: currentPath,
            icon: getIcon(iconName),
            clickable: isClickable
          });
        }
      }
      if (items.length === 0) {
        items.push({
          label: "Dashboard",
          to: "/dashboard",
          icon: getIcon("home"),
          clickable: false
        });
      }
      return items;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<nav${ssrRenderAttrs(mergeProps({
        class: "flex items-center space-x-2 text-sm",
        "aria-label": "Breadcrumb"
      }, _attrs))} data-v-04cf378d><ol class="flex items-center space-x-2" data-v-04cf378d><!--[-->`);
      ssrRenderList(breadcrumbItems.value, (item, index) => {
        _push(`<li class="flex items-center" data-v-04cf378d>`);
        if (index > 0) {
          _push(`<svg class="w-4 h-4 text-gray-500 mx-2" fill="currentColor" viewBox="0 0 20 20" data-v-04cf378d><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" data-v-04cf378d></path></svg>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="flex items-center" data-v-04cf378d>`);
        if (item.clickable) {
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: item.to,
            class: "flex items-center space-x-1 transition-colors duration-200 text-gray-400 hover:text-white cursor-pointer"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                if (item.icon) {
                  ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(item.icon), { class: "w-4 h-4 flex-shrink-0" }, null), _parent2, _scopeId);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<span data-v-04cf378d${_scopeId}>${ssrInterpolate(item.label)}</span>`);
              } else {
                return [
                  item.icon ? (openBlock(), createBlock(resolveDynamicComponent(item.icon), {
                    key: 0,
                    class: "w-4 h-4 flex-shrink-0"
                  })) : createCommentVNode("", true),
                  createVNode("span", null, toDisplayString(item.label), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
        } else {
          _push(`<span class="flex items-center space-x-1 text-white font-medium" data-v-04cf378d>`);
          if (item.icon) {
            ssrRenderVNode(_push, createVNode(resolveDynamicComponent(item.icon), { class: "w-4 h-4 flex-shrink-0" }, null), _parent);
          } else {
            _push(`<!---->`);
          }
          _push(`<span data-v-04cf378d>${ssrInterpolate(item.label)}</span></span>`);
        }
        _push(`</div></li>`);
      });
      _push(`<!--]--></ol></nav>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/BreadcrumbPlugin/Breadcrumb.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const Breadcrumb = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-04cf378d"]]);
const _sfc_main = {
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    const sidebarOpen = ref(false);
    const toggleSidebar = () => {
      sidebarOpen.value = !sidebarOpen.value;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-dark-secondary" }, _attrs))}>`);
      _push(ssrRenderComponent(Header, {
        onToggleSidebar: toggleSidebar,
        class: "fixed top-0 left-0 right-0 z-40"
      }, null, _parent));
      _push(`<div class="flex pt-16 pb-10"><div class="${ssrRenderClass([sidebarOpen.value ? "translate-x-0" : "-translate-x-full lg:translate-x-0", "fixed left-4 top-24 bottom-16 z-50 w-64 transform transition-transform duration-300 ease-in-out lg:translate-x-0"])}">`);
      _push(ssrRenderComponent(Sidebar, null, null, _parent));
      _push(`</div>`);
      if (sidebarOpen.value) {
        _push(`<div class="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<main class="flex-1 lg:ml-72 ml-4 mr-4 overflow-x-hidden"><div class="bg-dark-secondary rounded-lg shadow-lg min-h-[calc(100vh-8rem)] p-6">`);
      _push(ssrRenderComponent(Breadcrumb, { class: "mb-6" }, null, _parent));
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></main></div>`);
      _push(ssrRenderComponent(Footer, { class: "fixed bottom-0 left-0 right-0 z-40" }, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=default-APHQ9Uk9.mjs.map
