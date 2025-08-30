import { ref, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderAttr } from 'vue/server-renderer';
import { u as useAdminStore } from './admin-B92VYRsh.mjs';
import { u as useToastNotifications } from './useToastNotifications-DaJGJiXK.mjs';
import 'pinia';
import './UserAPI-Cd4tUvk3.mjs';
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
import 'vue-router';
import '@iconify/vue';
import './CropAPI-Cg4msNVy.mjs';
import './DeviceAPI-r0WuORwH.mjs';

const _sfc_main = {
  __name: "agregar",
  __ssrInlineRender: true,
  setup(__props) {
    useAdminStore();
    const { toast } = useToastNotifications();
    const formData = ref({
      user_id: "",
      name: "",
      description: "",
      image: "",
      category: "",
      soil_humidity_min: "",
      soil_humidity_max: "",
      air_humidity_min: "",
      air_humidity_max: "",
      temperature_max: "",
      growth_days: "",
      session: "",
      selected: false
    });
    const users = ref([]);
    const isLoading = ref(false);
    const isSaving = ref(false);
    const error = ref(null);
    const selectedImageName = ref("");
    ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-8" }, _attrs))}><div class="mb-8"><div class="flex items-center space-x-3 mb-2"><div class="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center"><svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg></div><div><h1 class="text-3xl font-bold text-white">Panel de Administraci\xF3n</h1><p class="text-gray-400">Bienvenido al centro de control del sistema Vivantia</p></div></div><div class="mt-4"><h2 class="text-xl font-semibold text-white">A\xF1adir Cultivo</h2><p class="text-gray-400 mt-1">Crear un nuevo cultivo para un usuario</p></div></div>`);
      if (unref(isLoading)) {
        _push(`<div class="flex items-center justify-center py-12"><div class="text-center"><div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 mb-4"></div><p class="text-gray-400">Cargando usuarios...</p></div></div>`);
      } else if (unref(error)) {
        _push(`<div class="bg-red-500/20 border border-red-500/30 rounded-lg p-6"><div class="flex items-center"><svg class="w-6 h-6 text-red-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><div><h3 class="text-lg font-medium text-red-400">Error</h3><p class="text-red-300 mt-1">${ssrInterpolate(unref(error))}</p></div></div><button class="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"> Reintentar </button></div>`);
      } else {
        _push(`<div class="bg-gray-800/50 border border-gray-700 rounded-lg p-6"><form class="space-y-6"><div><label class="block text-sm font-medium text-gray-300 mb-2"> Usuario Propietario * </label><select required class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(formData).user_id) ? ssrLooseContain(unref(formData).user_id, "") : ssrLooseEqual(unref(formData).user_id, "")) ? " selected" : ""}>Seleccionar usuario...</option><!--[-->`);
        ssrRenderList(unref(users), (user) => {
          _push(`<option${ssrRenderAttr("value", user.id)} class="bg-gray-700 text-white"${ssrIncludeBooleanAttr(Array.isArray(unref(formData).user_id) ? ssrLooseContain(unref(formData).user_id, user.id) : ssrLooseEqual(unref(formData).user_id, user.id)) ? " selected" : ""}>${ssrInterpolate(user.name)} (${ssrInterpolate(user.email)}) </option>`);
        });
        _push(`<!--]--></select></div><div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div><label class="block text-sm font-medium text-gray-300 mb-2"> Nombre del Cultivo * </label><input${ssrRenderAttr("value", unref(formData).name)} type="text" required class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" placeholder="Ej: Tomates Cherry"></div><div><label class="block text-sm font-medium text-gray-300 mb-2"> Categor\xEDa * </label><input${ssrRenderAttr("value", unref(formData).category)} type="text" required class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" placeholder="Ej: Hortalizas"></div><div class="md:col-span-2"><label class="block text-sm font-medium text-gray-300 mb-2"> Descripci\xF3n * </label><textarea rows="3" required class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none" placeholder="Descripci\xF3n del cultivo, caracter\xEDsticas especiales, cuidados necesarios...">${ssrInterpolate(unref(formData).description)}</textarea></div><div class="md:col-span-2"><label class="block text-sm font-medium text-gray-300 mb-2"> Imagen del Cultivo </label><div class="flex items-center space-x-4"><input type="file" accept="image/*" class="hidden"><button type="button" class="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-md transition-colors flex items-center space-x-2"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg><span>Seleccionar Imagen</span></button>`);
        if (unref(selectedImageName)) {
          _push(`<div class="flex items-center space-x-2 flex-1"><span class="text-green-400 text-sm">${ssrInterpolate(unref(selectedImageName))}</span><button type="button" class="px-2 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-xs transition-colors"> Limpiar </button></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><p class="text-xs text-gray-500 mt-1">Selecciona una imagen del cultivo (opcional, m\xE1ximo 5MB)</p></div><div><label class="block text-sm font-medium text-gray-300 mb-2"> Humedad del Suelo M\xEDnima (%) * </label><input${ssrRenderAttr("value", unref(formData).soil_humidity_min)} type="number" min="0" max="100" step="0.1" required class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" placeholder="Ej: 60"></div><div><label class="block text-sm font-medium text-gray-300 mb-2"> Humedad del Suelo M\xE1xima (%) * </label><input${ssrRenderAttr("value", unref(formData).soil_humidity_max)} type="number" min="0" max="100" step="0.1" required class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" placeholder="Ej: 80"></div><div><label class="block text-sm font-medium text-gray-300 mb-2"> Humedad del Aire M\xEDnima (%) * </label><input${ssrRenderAttr("value", unref(formData).air_humidity_min)} type="number" min="0" max="100" step="0.1" required class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" placeholder="Ej: 40"></div><div><label class="block text-sm font-medium text-gray-300 mb-2"> Humedad del Aire M\xE1xima (%) * </label><input${ssrRenderAttr("value", unref(formData).air_humidity_max)} type="number" min="0" max="100" step="0.1" required class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" placeholder="Ej: 70"></div><div><label class="block text-sm font-medium text-gray-300 mb-2"> Temperatura M\xE1xima (\xB0C) * </label><input${ssrRenderAttr("value", unref(formData).temperature_max)} type="number" min="0" max="50" required class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" placeholder="Ej: 30"></div><div><label class="block text-sm font-medium text-gray-300 mb-2"> D\xEDas de Crecimiento * </label><input${ssrRenderAttr("value", unref(formData).growth_days)} type="number" min="1" required class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" placeholder="Ej: 90"></div><div><label class="block text-sm font-medium text-gray-300 mb-2"> Temporada de Cosecha * </label><select required class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(formData).session) ? ssrLooseContain(unref(formData).session, "") : ssrLooseEqual(unref(formData).session, "")) ? " selected" : ""}>Seleccionar temporada...</option><option value="Primavera"${ssrIncludeBooleanAttr(Array.isArray(unref(formData).session) ? ssrLooseContain(unref(formData).session, "Primavera") : ssrLooseEqual(unref(formData).session, "Primavera")) ? " selected" : ""}>Primavera</option><option value="Verano"${ssrIncludeBooleanAttr(Array.isArray(unref(formData).session) ? ssrLooseContain(unref(formData).session, "Verano") : ssrLooseEqual(unref(formData).session, "Verano")) ? " selected" : ""}>Verano</option><option value="Oto\xF1o"${ssrIncludeBooleanAttr(Array.isArray(unref(formData).session) ? ssrLooseContain(unref(formData).session, "Oto\xF1o") : ssrLooseEqual(unref(formData).session, "Oto\xF1o")) ? " selected" : ""}>Oto\xF1o</option><option value="Invierno"${ssrIncludeBooleanAttr(Array.isArray(unref(formData).session) ? ssrLooseContain(unref(formData).session, "Invierno") : ssrLooseEqual(unref(formData).session, "Invierno")) ? " selected" : ""}>Invierno</option><option value="Primavera/Verano"${ssrIncludeBooleanAttr(Array.isArray(unref(formData).session) ? ssrLooseContain(unref(formData).session, "Primavera/Verano") : ssrLooseEqual(unref(formData).session, "Primavera/Verano")) ? " selected" : ""}>Primavera/Verano</option><option value="Verano/Oto\xF1o"${ssrIncludeBooleanAttr(Array.isArray(unref(formData).session) ? ssrLooseContain(unref(formData).session, "Verano/Oto\xF1o") : ssrLooseEqual(unref(formData).session, "Verano/Oto\xF1o")) ? " selected" : ""}>Verano/Oto\xF1o</option><option value="Oto\xF1o/Invierno"${ssrIncludeBooleanAttr(Array.isArray(unref(formData).session) ? ssrLooseContain(unref(formData).session, "Oto\xF1o/Invierno") : ssrLooseEqual(unref(formData).session, "Oto\xF1o/Invierno")) ? " selected" : ""}>Oto\xF1o/Invierno</option><option value="Invierno/Primavera"${ssrIncludeBooleanAttr(Array.isArray(unref(formData).session) ? ssrLooseContain(unref(formData).session, "Invierno/Primavera") : ssrLooseEqual(unref(formData).session, "Invierno/Primavera")) ? " selected" : ""}>Invierno/Primavera</option><option value="Todo el a\xF1o"${ssrIncludeBooleanAttr(Array.isArray(unref(formData).session) ? ssrLooseContain(unref(formData).session, "Todo el a\xF1o") : ssrLooseEqual(unref(formData).session, "Todo el a\xF1o")) ? " selected" : ""}>Todo el a\xF1o</option></select></div><div class="md:col-span-2"><label class="block text-sm font-medium text-gray-300 mb-2"> Estado de Selecci\xF3n </label><div class="flex items-center space-x-3"><input${ssrIncludeBooleanAttr(Array.isArray(unref(formData).selected) ? ssrLooseContain(unref(formData).selected, null) : unref(formData).selected) ? " checked" : ""} type="checkbox" class="w-4 h-4 text-green-600 bg-gray-700 border-gray-600 rounded focus:ring-green-500 focus:ring-2"><span class="text-white">Marcar como seleccionado</span></div><p class="text-xs text-gray-500 mt-1">Indica si este cultivo est\xE1 seleccionado para el usuario</p></div></div><div class="flex items-center justify-end space-x-4 pt-6 border-t border-gray-700"><button type="button" class="px-6 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-md transition-colors"> Cancelar </button><button type="submit"${ssrIncludeBooleanAttr(unref(isSaving)) ? " disabled" : ""} class="px-6 py-2 bg-green-600 hover:bg-green-700 disabled:bg-green-800 disabled:cursor-not-allowed text-white rounded-md transition-colors flex items-center">`);
        if (unref(isSaving)) {
          _push(`<div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(` ${ssrInterpolate(unref(isSaving) ? "Creando..." : "Crear Cultivo")}</button></div></form></div>`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/cultivos/agregar.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=agregar-DsQwcflS.mjs.map
