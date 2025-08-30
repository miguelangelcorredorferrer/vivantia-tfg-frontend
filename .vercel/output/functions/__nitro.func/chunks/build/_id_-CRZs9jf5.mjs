import { ref, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from 'vue/server-renderer';
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
    const isSaving = ref(false);
    const form = ref({
      name: "",
      description: "",
      category: "",
      growth_days: "",
      soil_humidity_min: "",
      soil_humidity_max: "",
      air_humidity_min: "",
      air_humidity_max: "",
      temperature_max: "",
      session: "",
      selected: false
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-8" }, _attrs))}><div class="mb-8"><div class="flex items-center justify-between"><div class="flex items-center space-x-3"><button class="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"><svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg></button><div class="w-10 h-10 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center"><svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg></div><div><h1 class="text-3xl font-bold text-white">Editar Cultivo</h1><p class="text-gray-400">Modificar informaci\xF3n del cultivo seleccionado</p></div></div></div></div>`);
      if (unref(isLoading)) {
        _push(`<div class="flex items-center justify-center py-12"><div class="flex items-center space-x-2"><div class="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div><span class="text-gray-400">Cargando cultivo...</span></div></div>`);
      } else if (unref(crop)) {
        _push(`<div class="space-y-6"><div class="bg-gray-800/50 border border-gray-600/30 rounded-lg p-6"><h2 class="text-xl font-semibold text-white mb-4">Usuario Propietario</h2><div class="flex items-center space-x-4"><div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center"><span class="text-white font-semibold">${ssrInterpolate(((_b = (_a = unref(crop).user) == null ? void 0 : _a.name) == null ? void 0 : _b.charAt(0).toUpperCase()) || "?")}</span></div><div><h3 class="text-lg font-medium text-white">${ssrInterpolate(((_c = unref(crop).user) == null ? void 0 : _c.name) || "Usuario no encontrado")}</h3><p class="text-gray-400">${ssrInterpolate(((_d = unref(crop).user) == null ? void 0 : _d.email) || "Sin email")}</p></div></div></div><div class="bg-gray-800/50 border border-gray-600/30 rounded-lg p-6"><h2 class="text-xl font-semibold text-white mb-6">Informaci\xF3n del Cultivo</h2><form class="space-y-6"><div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div><label for="name" class="block text-sm font-medium text-gray-300 mb-2"> Nombre del Cultivo <span class="text-red-400">*</span></label><input id="name"${ssrRenderAttr("value", unref(form).name)} type="text" required class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" placeholder="Nombre del cultivo"></div><div><label for="category" class="block text-sm font-medium text-gray-300 mb-2"> Categor\xEDa </label><input id="category"${ssrRenderAttr("value", unref(form).category)} type="text" class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" placeholder="Categor\xEDa del cultivo"></div></div><div><label for="description" class="block text-sm font-medium text-gray-300 mb-2"> Descripci\xF3n </label><textarea id="description" rows="3" class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" placeholder="Descripci\xF3n del cultivo">${ssrInterpolate(unref(form).description)}</textarea></div><div class="grid grid-cols-1 md:grid-cols-6 gap-6"><div><label for="growth_days" class="block text-sm font-medium text-gray-300 mb-2"> D\xEDas de Crecimiento </label><input id="growth_days"${ssrRenderAttr("value", unref(form).growth_days)} type="number" min="0" class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" placeholder="D\xEDas"></div><div><label for="soil_humidity_min" class="block text-sm font-medium text-gray-300 mb-2"> Humedad del Suelo M\xEDnima (%) </label><input id="soil_humidity_min"${ssrRenderAttr("value", unref(form).soil_humidity_min)} type="number" min="0" max="100" step="0.1" class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" placeholder="0-100"></div><div><label for="soil_humidity_max" class="block text-sm font-medium text-gray-300 mb-2"> Humedad del Suelo M\xE1xima (%) </label><input id="soil_humidity_max"${ssrRenderAttr("value", unref(form).soil_humidity_max)} type="number" min="0" max="100" step="0.1" class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" placeholder="0-100"></div><div><label for="air_humidity_min" class="block text-sm font-medium text-gray-300 mb-2"> Humedad del Aire M\xEDnima (%) </label><input id="air_humidity_min"${ssrRenderAttr("value", unref(form).air_humidity_min)} type="number" min="0" max="100" step="0.1" class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" placeholder="0-100"></div><div><label for="air_humidity_max" class="block text-sm font-medium text-gray-300 mb-2"> Humedad del Aire M\xE1xima (%) </label><input id="air_humidity_max"${ssrRenderAttr("value", unref(form).air_humidity_max)} type="number" min="0" max="100" step="0.1" class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" placeholder="0-100"></div><div><label for="temperature_max" class="block text-sm font-medium text-gray-300 mb-2"> Temperatura M\xE1xima (\xB0C) </label><input id="temperature_max"${ssrRenderAttr("value", unref(form).temperature_max)} type="number" min="-50" max="100" step="0.1" class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" placeholder="Temperatura"></div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div><label for="session" class="block text-sm font-medium text-gray-300 mb-2"> Sesi\xF3n de Cultivo </label><select id="session" class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(form).session) ? ssrLooseContain(unref(form).session, "") : ssrLooseEqual(unref(form).session, "")) ? " selected" : ""}>Seleccionar temporada...</option><option value="Primavera"${ssrIncludeBooleanAttr(Array.isArray(unref(form).session) ? ssrLooseContain(unref(form).session, "Primavera") : ssrLooseEqual(unref(form).session, "Primavera")) ? " selected" : ""}>Primavera</option><option value="Verano"${ssrIncludeBooleanAttr(Array.isArray(unref(form).session) ? ssrLooseContain(unref(form).session, "Verano") : ssrLooseEqual(unref(form).session, "Verano")) ? " selected" : ""}>Verano</option><option value="Oto\xF1o"${ssrIncludeBooleanAttr(Array.isArray(unref(form).session) ? ssrLooseContain(unref(form).session, "Oto\xF1o") : ssrLooseEqual(unref(form).session, "Oto\xF1o")) ? " selected" : ""}>Oto\xF1o</option><option value="Invierno"${ssrIncludeBooleanAttr(Array.isArray(unref(form).session) ? ssrLooseContain(unref(form).session, "Invierno") : ssrLooseEqual(unref(form).session, "Invierno")) ? " selected" : ""}>Invierno</option><option value="Primavera/Verano"${ssrIncludeBooleanAttr(Array.isArray(unref(form).session) ? ssrLooseContain(unref(form).session, "Primavera/Verano") : ssrLooseEqual(unref(form).session, "Primavera/Verano")) ? " selected" : ""}>Primavera/Verano</option><option value="Verano/Oto\xF1o"${ssrIncludeBooleanAttr(Array.isArray(unref(form).session) ? ssrLooseContain(unref(form).session, "Verano/Oto\xF1o") : ssrLooseEqual(unref(form).session, "Verano/Oto\xF1o")) ? " selected" : ""}>Verano/Oto\xF1o</option><option value="Oto\xF1o/Invierno"${ssrIncludeBooleanAttr(Array.isArray(unref(form).session) ? ssrLooseContain(unref(form).session, "Oto\xF1o/Invierno") : ssrLooseEqual(unref(form).session, "Oto\xF1o/Invierno")) ? " selected" : ""}>Oto\xF1o/Invierno</option><option value="Invierno/Primavera"${ssrIncludeBooleanAttr(Array.isArray(unref(form).session) ? ssrLooseContain(unref(form).session, "Invierno/Primavera") : ssrLooseEqual(unref(form).session, "Invierno/Primavera")) ? " selected" : ""}>Invierno/Primavera</option><option value="Todo el a\xF1o"${ssrIncludeBooleanAttr(Array.isArray(unref(form).session) ? ssrLooseContain(unref(form).session, "Todo el a\xF1o") : ssrLooseEqual(unref(form).session, "Todo el a\xF1o")) ? " selected" : ""}>Todo el a\xF1o</option></select></div><div><label class="block text-sm font-medium text-gray-300 mb-2"> Estado de Selecci\xF3n </label><div class="flex items-center space-x-4"><label class="flex items-center"><input${ssrIncludeBooleanAttr(Array.isArray(unref(form).selected) ? ssrLooseContain(unref(form).selected, null) : unref(form).selected) ? " checked" : ""} type="checkbox" class="w-4 h-4 text-green-600 bg-gray-700 border-gray-600 rounded focus:ring-green-500 focus:ring-2"><span class="ml-2 text-white">Cultivo seleccionado</span></label></div></div></div><div class="flex items-center justify-end space-x-4 pt-6 border-t border-gray-600"><button type="button" class="px-6 py-2 bg-gray-600 hover:bg-gray-500 text-white font-medium rounded-lg transition-colors"> Restaurar </button><button type="button" class="px-6 py-2 bg-gray-600 hover:bg-gray-500 text-white font-medium rounded-lg transition-colors"> Cancelar </button><button type="submit"${ssrIncludeBooleanAttr(unref(isSaving)) ? " disabled" : ""} class="px-6 py-2 bg-green-600 hover:bg-green-700 disabled:bg-green-800 text-white font-medium rounded-lg transition-colors flex items-center space-x-2">`);
        if (unref(isSaving)) {
          _push(`<div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<span>${ssrInterpolate(unref(isSaving) ? "Guardando..." : "Guardar Cambios")}</span></button></div></form></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/cultivos/editar/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_id_-CRZs9jf5.mjs.map
