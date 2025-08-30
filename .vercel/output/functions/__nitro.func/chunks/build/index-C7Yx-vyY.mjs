import { _ as __nuxt_component_0 } from './nuxt-link-rSZMKS1E.mjs';
import { mergeProps, withCtx, createBlock, createVNode, openBlock, unref, ref, watch, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
import { u as useAdminStore } from './admin-B92VYRsh.mjs';
import { u as useToastNotifications } from './useToastNotifications-DaJGJiXK.mjs';
import { _ as _sfc_main$3 } from './DeleteConfirmModal-w-LSssTG.mjs';
import { n as navigateTo } from './server.mjs';
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
import './UserAPI-Cd4tUvk3.mjs';
import './CropAPI-Cg4msNVy.mjs';
import './DeviceAPI-r0WuORwH.mjs';
import 'vue-router';
import '@iconify/vue';

const _sfc_main$2 = {
  __name: "CropsFilter",
  __ssrInlineRender: true,
  props: {
    nameFilter: {
      type: String,
      default: ""
    },
    categoryFilter: {
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
    sessionFilter: {
      type: String,
      default: ""
    }
  },
  emits: ["filter-change", "clear-filters"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const localNameFilter = ref(props.nameFilter);
    const localCategoryFilter = ref(props.categoryFilter);
    const localUserFilter = ref(props.userFilter);
    const localEmailFilter = ref(props.emailFilter);
    const localSessionFilter = ref(props.sessionFilter);
    watch(localNameFilter, (newValue) => {
      emit("filter-change", {
        name: newValue,
        category: localCategoryFilter.value,
        user: localUserFilter.value,
        email: localEmailFilter.value,
        session: localSessionFilter.value
      });
    });
    watch(localCategoryFilter, (newValue) => {
      emit("filter-change", {
        name: localNameFilter.value,
        category: newValue,
        user: localUserFilter.value,
        email: localEmailFilter.value,
        session: localSessionFilter.value
      });
    });
    watch(localUserFilter, (newValue) => {
      emit("filter-change", {
        name: localNameFilter.value,
        category: localCategoryFilter.value,
        user: newValue,
        email: localEmailFilter.value,
        session: localSessionFilter.value
      });
    });
    watch(localEmailFilter, (newValue) => {
      emit("filter-change", {
        name: localNameFilter.value,
        category: localCategoryFilter.value,
        user: localUserFilter.value,
        email: newValue,
        session: localSessionFilter.value
      });
    });
    watch(localSessionFilter, (newValue) => {
      emit("filter-change", {
        name: localNameFilter.value,
        category: localCategoryFilter.value,
        user: localUserFilter.value,
        email: localEmailFilter.value,
        session: newValue
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-gray-800/50 border border-gray-600/30 rounded-lg p-6 mb-6" }, _attrs))}><div class="flex items-center justify-between mb-4"><h3 class="text-lg font-semibold text-white">Filtros de B\xFAsqueda</h3><button class="px-3 py-1 text-sm bg-gray-600 hover:bg-gray-500 text-white rounded-md transition-colors"> Limpiar Filtros </button></div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4"><div><label for="crop-name-filter" class="block text-sm font-medium text-gray-300 mb-2"> Nombre del cultivo </label><input id="crop-name-filter"${ssrRenderAttr("value", localNameFilter.value)} type="text" placeholder="Buscar por nombre..." class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"></div><div><label for="crop-category-filter" class="block text-sm font-medium text-gray-300 mb-2"> Categor\xEDa </label><input id="crop-category-filter"${ssrRenderAttr("value", localCategoryFilter.value)} type="text" placeholder="Buscar por categor\xEDa..." class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"></div><div><label for="crop-user-filter" class="block text-sm font-medium text-gray-300 mb-2"> Usuario propietario </label><input id="crop-user-filter"${ssrRenderAttr("value", localUserFilter.value)} type="text" placeholder="Buscar por usuario..." class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"></div><div><label for="crop-email-filter" class="block text-sm font-medium text-gray-300 mb-2"> Email del usuario </label><input id="crop-email-filter"${ssrRenderAttr("value", localEmailFilter.value)} type="email" placeholder="Buscar por email..." class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"></div><div><label for="crop-session-filter" class="block text-sm font-medium text-gray-300 mb-2"> Sesi\xF3n de cultivo </label><input id="crop-session-filter"${ssrRenderAttr("value", localSessionFilter.value)} type="text" placeholder="Buscar por sesi\xF3n..." class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"></div></div></div>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Admin/Crops/CropsFilter.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "CropsTable",
  __ssrInlineRender: true,
  props: {
    crops: {
      type: Array,
      default: () => []
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  emits: ["delete-crop", "edit-crop", "view-crop"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const { toast } = useToastNotifications();
    const showDeleteModal = ref(false);
    const cropToDelete = ref(null);
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString("es-ES", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    };
    const getSelectedBadgeClass = (selected) => {
      return selected ? {
        label: "Seleccionado",
        class: "bg-green-500/20 text-green-400 border-green-500/30"
      } : {
        label: "No seleccionado",
        class: "bg-gray-500/20 text-gray-400 border-gray-500/30"
      };
    };
    const confirmDelete = async () => {
      try {
        await emit("delete-crop", cropToDelete.value.id);
        toast.success("Cultivo eliminado exitosamente");
      } catch (error) {
        toast.error("Error al eliminar cultivo");
      } finally {
        showDeleteModal.value = false;
        cropToDelete.value = null;
      }
    };
    const cancelDelete = () => {
      showDeleteModal.value = false;
      cropToDelete.value = null;
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      _push(`<!--[--><div class="bg-gray-800/50 border border-gray-600/30 rounded-lg overflow-hidden"><div class="px-6 py-4 border-b border-gray-600/30"><div class="flex items-center justify-between"><div><h3 class="text-lg font-semibold text-white">Cultivos Disponibles</h3><p class="text-sm text-gray-400 mt-1">${ssrInterpolate(__props.crops.length)} cultivo${ssrInterpolate(__props.crops.length !== 1 ? "s" : "")} encontrado${ssrInterpolate(__props.crops.length !== 1 ? "s" : "")}</p></div><button class="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-md transition-colors"><svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg> A\xF1adir Cultivo </button></div></div><div class="overflow-x-auto"><table class="w-full"><thead class="bg-gray-700/50"><tr><th class="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider"> Usuario </th><th class="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider"> Cultivo </th><th class="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider"> Categor\xEDa </th><th class="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider"> Hum. Suelo (%) </th><th class="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider"> Hum. Aire (%) </th><th class="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider"> Sesi\xF3n </th><th class="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider"> Estado </th><th class="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider"> Fecha Creaci\xF3n </th><th class="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider"> Acciones </th></tr></thead><tbody class="divide-y divide-gray-600/30">`);
      if (__props.isLoading) {
        _push(`<tr><td colspan="9" class="px-6 py-8 text-center"><div class="flex items-center justify-center space-x-2"><div class="animate-spin rounded-full h-6 w-6 border-b-2 border-green-500"></div><span class="text-gray-400">Cargando cultivos...</span></div></td></tr>`);
      } else if (__props.crops.length === 0) {
        _push(`<tr><td colspan="9" class="px-6 py-8 text-center"><div class="text-gray-400"><svg class="w-12 h-12 mx-auto mb-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg><p class="text-lg font-medium">No se encontraron cultivos</p><p class="text-sm">Intenta ajustar los filtros de b\xFAsqueda</p></div></td></tr>`);
      } else {
        _push(`<!--[-->`);
        ssrRenderList(__props.crops, (crop) => {
          var _a2, _b, _c, _d;
          _push(`<tr class="hover:bg-gray-700/30 transition-colors"><td class="px-6 py-4 whitespace-nowrap text-center"><div class="flex flex-col items-center"><div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-2"><span class="text-white text-sm font-semibold">${ssrInterpolate(((_b = (_a2 = crop.user) == null ? void 0 : _a2.name) == null ? void 0 : _b.charAt(0).toUpperCase()) || "?")}</span></div><div class="text-center"><div class="text-sm font-medium text-white">${ssrInterpolate(((_c = crop.user) == null ? void 0 : _c.name) || "Usuario no encontrado")}</div><div class="text-xs text-gray-400">${ssrInterpolate(((_d = crop.user) == null ? void 0 : _d.email) || "Sin email")}</div></div></div></td><td class="px-6 py-4 whitespace-nowrap text-center"><div class="flex flex-col items-center"><div class="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mb-2"><svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg></div><div class="text-center"><div class="text-sm font-medium text-white">${ssrInterpolate(crop.name)}</div><div class="text-xs text-gray-400">ID: ${ssrInterpolate(crop.id)}</div></div></div></td><td class="px-6 py-4 whitespace-nowrap text-center"><div class="text-sm text-white">${ssrInterpolate(crop.category || "Sin categor\xEDa")}</div></td><td class="px-6 py-4 whitespace-nowrap text-center"><div class="text-sm text-blue-400">${ssrInterpolate(crop.soil_humidity_min || "N/A")} - ${ssrInterpolate(crop.soil_humidity_max || "N/A")}</div></td><td class="px-6 py-4 whitespace-nowrap text-center"><div class="text-sm text-cyan-400">${ssrInterpolate(crop.air_humidity_min || "N/A")} - ${ssrInterpolate(crop.air_humidity_max || "N/A")}</div></td><td class="px-6 py-4 whitespace-nowrap text-center"><div class="text-sm text-gray-300">${ssrInterpolate(crop.session || "Sin sesi\xF3n")}</div></td><td class="px-6 py-4 whitespace-nowrap text-center"><span class="${ssrRenderClass([getSelectedBadgeClass(crop.selected).class, "inline-flex px-2 py-1 text-xs font-semibold rounded-full border"])}">${ssrInterpolate(getSelectedBadgeClass(crop.selected).label)}</span></td><td class="px-6 py-4 whitespace-nowrap text-center"><div class="text-sm text-gray-300">${ssrInterpolate(formatDate(crop.created_at))}</div></td><td class="px-6 py-4 whitespace-nowrap text-center"><div class="flex items-center justify-center space-x-2"><button class="inline-flex items-center px-2 py-1 border border-blue-500/30 text-blue-400 text-xs font-medium rounded-md hover:bg-blue-500/20 hover:border-blue-500/50 transition-colors" title="Ver detalles del cultivo"><svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg> Ver </button><button class="inline-flex items-center px-2 py-1 border border-yellow-500/30 text-yellow-400 text-xs font-medium rounded-md hover:bg-yellow-500/20 hover:border-yellow-500/50 transition-colors" title="Editar cultivo"><svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg> Editar </button><button class="inline-flex items-center px-2 py-1 border border-red-500/30 text-red-400 text-xs font-medium rounded-md hover:bg-red-500/20 hover:border-red-500/50 transition-colors" title="Eliminar cultivo"><svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg> Eliminar </button></div></td></tr>`);
        });
        _push(`<!--]-->`);
      }
      _push(`</tbody></table></div></div>`);
      _push(ssrRenderComponent(_sfc_main$3, {
        "is-open": unref(showDeleteModal),
        title: "Eliminar Cultivo",
        message: "\xBFEst\xE1s seguro de que quieres eliminar este cultivo?",
        "item-name": (_a = unref(cropToDelete)) == null ? void 0 : _a.name,
        "item-type": "cultivo",
        onConfirm: confirmDelete,
        onCancel: cancelDelete
      }, null, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Admin/Crops/CropsTable.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const adminStore = useAdminStore();
    const { toast } = useToastNotifications();
    const handleFilterChange = (filters) => {
      adminStore.updateCropFilters(filters.name, filters.category, filters.user, filters.email, filters.session);
    };
    const handleClearFilters = () => {
      adminStore.clearCropFilters();
    };
    const handleDeleteCrop = async (cropId) => {
      try {
        await adminStore.deleteCrop(cropId);
      } catch (error) {
        toast.error("Error al eliminar cultivo");
      }
    };
    const handleEditCrop = (crop) => {
      console.log("Navegar a edici\xF3n de cultivo:", crop.id);
      navigateTo(`/admin/cultivos/editar/${crop.id}`);
    };
    const handleViewCrop = (crop) => {
      console.log("Navegar a visualizaci\xF3n de cultivo:", crop.id);
      navigateTo(`/admin/cultivos/ver/${crop.id}`);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-8" }, _attrs))}><div class="mb-8"><div class="flex items-center space-x-3 mb-2"><div class="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center"><svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg></div><div><h1 class="text-3xl font-bold text-white">Panel de Administraci\xF3n</h1><p class="text-gray-400">Bienvenido al centro de control del sistema Vivantia</p></div></div><div class="mt-4 flex justify-between items-center"><div><h2 class="text-xl font-semibold text-white">Gesti\xF3n de Cultivos</h2><p class="text-gray-400 mt-1">Administraci\xF3n y supervisi\xF3n de todos los cultivos del sistema</p></div>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/cultivos/agregar",
        class: "px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors duration-200 flex items-center space-x-2"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"${_scopeId}></path></svg><span${_scopeId}>Agregar Cultivo</span>`);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                class: "w-5 h-5",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24"
              }, [
                createVNode("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2",
                  d: "M12 6v6m0 0v6m0-6h6m-6 0H6"
                })
              ])),
              createVNode("span", null, "Agregar Cultivo")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6"><div class="bg-gradient-to-r from-green-500/20 to-green-600/20 border border-green-500/30 rounded-lg p-6"><div class="flex items-center"><div class="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mr-4"><svg class="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg></div><div><p class="text-2xl font-bold text-white">${ssrInterpolate(unref(adminStore).totalCrops)}</p><p class="text-sm text-green-300">Total de Cultivos</p></div></div></div><div class="bg-gradient-to-r from-blue-500/20 to-blue-600/20 border border-blue-500/30 rounded-lg p-6"><div class="flex items-center"><div class="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mr-4"><svg class="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div><div><p class="text-2xl font-bold text-white">${ssrInterpolate(unref(adminStore).filteredCropsCount)}</p><p class="text-sm text-blue-300">Cultivos Filtrados</p></div></div></div><div class="bg-gradient-to-r from-purple-500/20 to-purple-600/20 border border-purple-500/30 rounded-lg p-6"><div class="flex items-center"><div class="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mr-4"><svg class="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path></svg></div><div><p class="text-2xl font-bold text-white">${ssrInterpolate(unref(adminStore).crops.filter((c) => c.selected).length)}</p><p class="text-sm text-purple-300">Cultivos Seleccionados</p></div></div></div></div>`);
      _push(ssrRenderComponent(_sfc_main$2, {
        "name-filter": unref(adminStore).cropNameFilter,
        "category-filter": unref(adminStore).cropCategoryFilter,
        "user-filter": unref(adminStore).cropUserFilter,
        "email-filter": unref(adminStore).cropEmailFilter,
        "session-filter": unref(adminStore).cropSessionFilter,
        onFilterChange: handleFilterChange,
        onClearFilters: handleClearFilters
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, {
        crops: unref(adminStore).filteredCrops,
        "is-loading": unref(adminStore).isLoading,
        onDeleteCrop: handleDeleteCrop,
        onEditCrop: handleEditCrop,
        onViewCrop: handleViewCrop
      }, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/cultivos/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-C7Yx-vyY.mjs.map
