import { ref, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderClass } from 'vue/server-renderer';
import { u as useAdminStore } from './admin-B92VYRsh.mjs';
import { u as useToastNotifications } from './useToastNotifications-DaJGJiXK.mjs';
import { g as useRoute, u as useRouter } from './server.mjs';
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

const _sfc_main = {
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    useRouter();
    useAdminStore();
    const { toast } = useToastNotifications();
    route.params.id;
    const crop = ref(null);
    const isLoading = ref(true);
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
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
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-8" }, _attrs))}><div class="mb-8"><div class="flex items-center justify-between"><div class="flex items-center space-x-3"><button class="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"><svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg></button><div class="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center"><svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg></div><div><h1 class="text-3xl font-bold text-white">Detalles del Cultivo</h1><p class="text-gray-400">Informaci\xF3n completa del cultivo seleccionado</p></div></div></div></div>`);
      if (unref(isLoading)) {
        _push(`<div class="flex items-center justify-center py-12"><div class="flex items-center space-x-2"><div class="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div><span class="text-gray-400">Cargando cultivo...</span></div></div>`);
      } else if (unref(crop)) {
        _push(`<div class="space-y-6"><div class="bg-gray-800/50 border border-gray-600/30 rounded-lg p-6"><h2 class="text-xl font-semibold text-white mb-4">Informaci\xF3n B\xE1sica</h2><div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div><label class="block text-sm font-medium text-gray-300 mb-2">Nombre del Cultivo</label><p class="text-white font-medium">${ssrInterpolate(unref(crop).name)}</p></div><div><label class="block text-sm font-medium text-gray-300 mb-2">Categor\xEDa</label><p class="text-white">${ssrInterpolate(unref(crop).category || "Sin categor\xEDa")}</p></div><div><label class="block text-sm font-medium text-gray-300 mb-2">Sesi\xF3n de Cultivo</label><p class="text-white">${ssrInterpolate(unref(crop).session || "Sin sesi\xF3n")}</p></div><div><label class="block text-sm font-medium text-gray-300 mb-2">Estado</label><span class="${ssrRenderClass([getSelectedBadgeClass(unref(crop).selected).class, "inline-flex px-2 py-1 text-xs font-semibold rounded-full border"])}">${ssrInterpolate(getSelectedBadgeClass(unref(crop).selected).label)}</span></div></div></div><div class="bg-gray-800/50 border border-gray-600/30 rounded-lg p-6"><h2 class="text-xl font-semibold text-white mb-4">Usuario Propietario</h2><div class="flex items-center space-x-4"><div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center"><span class="text-white text-xl font-semibold">${ssrInterpolate(((_b = (_a = unref(crop).user) == null ? void 0 : _a.name) == null ? void 0 : _b.charAt(0).toUpperCase()) || "?")}</span></div><div><h3 class="text-lg font-medium text-white">${ssrInterpolate(((_c = unref(crop).user) == null ? void 0 : _c.name) || "Usuario no encontrado")}</h3><p class="text-gray-400">${ssrInterpolate(((_d = unref(crop).user) == null ? void 0 : _d.email) || "Sin email")}</p><p class="text-sm text-gray-500">ID: ${ssrInterpolate(((_e = unref(crop).user) == null ? void 0 : _e.id) || "N/A")}</p></div></div></div><div class="bg-gray-800/50 border border-gray-600/30 rounded-lg p-6"><h2 class="text-xl font-semibold text-white mb-4">Informaci\xF3n de Crecimiento</h2><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"><div><label class="block text-sm font-medium text-gray-300 mb-2">D\xEDas de Crecimiento</label><p class="text-white">${ssrInterpolate(unref(crop).growth_days || "No especificado")}</p></div><div><label class="block text-sm font-medium text-gray-300 mb-2">Humedad del Suelo (%)</label><p class="text-white">${ssrInterpolate(unref(crop).soil_humidity_min || "N/A")} - ${ssrInterpolate(unref(crop).soil_humidity_max || "N/A")}</p></div><div><label class="block text-sm font-medium text-gray-300 mb-2">Humedad del Aire (%)</label><p class="text-white">${ssrInterpolate(unref(crop).air_humidity_min || "N/A")} - ${ssrInterpolate(unref(crop).air_humidity_max || "N/A")}</p></div><div><label class="block text-sm font-medium text-gray-300 mb-2">Temperatura M\xE1xima (\xB0C)</label><p class="text-white">${ssrInterpolate(unref(crop).temperature_max || "No especificado")}</p></div></div></div><div class="bg-gray-800/50 border border-gray-600/30 rounded-lg p-6"><h2 class="text-xl font-semibold text-white mb-4">Informaci\xF3n Adicional</h2><div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div><label class="block text-sm font-medium text-gray-300 mb-2">Descripci\xF3n</label><p class="text-white">${ssrInterpolate(unref(crop).description || "Sin descripci\xF3n")}</p></div><div><label class="block text-sm font-medium text-gray-300 mb-2">Fecha de Creaci\xF3n</label><p class="text-white">${ssrInterpolate(formatDate(unref(crop).created_at))}</p></div><div><label class="block text-sm font-medium text-gray-300 mb-2">ID del Cultivo</label><p class="text-white">${ssrInterpolate(unref(crop).id)}</p></div><div><label class="block text-sm font-medium text-gray-300 mb-2">ID del Usuario</label><p class="text-white">${ssrInterpolate(unref(crop).user_id)}</p></div></div></div><div class="flex items-center justify-center space-x-4 pt-6"><button class="px-6 py-2 bg-gray-600 hover:bg-gray-500 text-white font-medium rounded-lg transition-colors"> Volver a la lista </button></div></div>`);
      } else {
        _push(`<div class="text-center py-12"><div class="text-gray-400"><svg class="w-16 h-16 mx-auto mb-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg><p class="text-lg font-medium">Cultivo no encontrado</p><p class="text-sm">El cultivo que buscas no existe o ha sido eliminado</p><button class="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"> Volver a la lista </button></div></div>`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/cultivos/ver/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_id_-CyNRQuVr.mjs.map
