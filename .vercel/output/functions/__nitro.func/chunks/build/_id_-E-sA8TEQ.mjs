import { ref, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from 'vue/server-renderer';
import { u as useAdminStore } from './admin-B92VYRsh.mjs';
import { u as useToastNotifications } from './useToastNotifications-DaJGJiXK.mjs';
import { g as useRoute } from './server.mjs';
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
    route.params.id;
    useAdminStore();
    const { toast } = useToastNotifications();
    const formData = ref({
      name: "",
      email: "",
      role: "visitante",
      verified: false
    });
    const isLoading = ref(false);
    const isSaving = ref(false);
    const error = ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-8" }, _attrs))}><div class="mb-8"><div class="flex items-center space-x-3 mb-2"><div class="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center"><svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg></div><div><h1 class="text-3xl font-bold text-white">Panel de Administraci\xF3n</h1><p class="text-gray-400">Bienvenido al centro de control del sistema Vivantia</p></div></div><div class="mt-4"><h2 class="text-xl font-semibold text-white">Editar Usuario</h2><p class="text-gray-400 mt-1">Modificar informaci\xF3n del usuario</p></div></div>`);
      if (unref(isLoading)) {
        _push(`<div class="flex items-center justify-center py-12"><div class="text-center"><div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mb-4"></div><p class="text-gray-400">Cargando usuario...</p></div></div>`);
      } else if (unref(error)) {
        _push(`<div class="bg-red-500/20 border border-red-500/30 rounded-lg p-6"><div class="flex items-center"><svg class="w-6 h-6 text-red-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><div><h3 class="text-lg font-medium text-red-400">Error</h3><p class="text-red-300 mt-1">${ssrInterpolate(unref(error))}</p></div></div><button class="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"> Reintentar </button></div>`);
      } else {
        _push(`<div class="bg-gray-800/50 border border-gray-700 rounded-lg p-6"><form class="space-y-6"><div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div><label class="block text-sm font-medium text-gray-300 mb-2"> Nombre Completo * </label><input${ssrRenderAttr("value", unref(formData).name)} type="text" required class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" placeholder="Ej: Juan P\xE9rez"></div><div><label class="block text-sm font-medium text-gray-300 mb-2"> Email * </label><input${ssrRenderAttr("value", unref(formData).email)} type="email" required class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" placeholder="Ej: juan.perez@email.com"></div><div><label class="block text-sm font-medium text-gray-300 mb-2"> Rol * </label><select required class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"><option value="visitante"${ssrIncludeBooleanAttr(Array.isArray(unref(formData).role) ? ssrLooseContain(unref(formData).role, "visitante") : ssrLooseEqual(unref(formData).role, "visitante")) ? " selected" : ""}>Visitante</option><option value="usuario"${ssrIncludeBooleanAttr(Array.isArray(unref(formData).role) ? ssrLooseContain(unref(formData).role, "usuario") : ssrLooseEqual(unref(formData).role, "usuario")) ? " selected" : ""}>Usuario</option><option value="admin"${ssrIncludeBooleanAttr(Array.isArray(unref(formData).role) ? ssrLooseContain(unref(formData).role, "admin") : ssrLooseEqual(unref(formData).role, "admin")) ? " selected" : ""}>Administrador</option></select></div><div><label class="block text-sm font-medium text-gray-300 mb-2"> Estado de Verificaci\xF3n </label><select class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"><option${ssrRenderAttr("value", false)}${ssrIncludeBooleanAttr(Array.isArray(unref(formData).verified) ? ssrLooseContain(unref(formData).verified, false) : ssrLooseEqual(unref(formData).verified, false)) ? " selected" : ""}>No verificado</option><option${ssrRenderAttr("value", true)}${ssrIncludeBooleanAttr(Array.isArray(unref(formData).verified) ? ssrLooseContain(unref(formData).verified, true) : ssrLooseEqual(unref(formData).verified, true)) ? " selected" : ""}>Verificado</option></select><p class="text-xs text-gray-500 mt-1">Controla si el usuario puede acceder al sistema</p></div></div><div class="bg-gray-700/30 rounded-lg p-4"><h3 class="text-lg font-medium text-white mb-4">Informaci\xF3n No Editable</h3><div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div><label class="block text-sm font-medium text-gray-400 mb-2"> Contrase\xF1a </label><input value="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" type="password" disabled class="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-md text-gray-400 cursor-not-allowed"><p class="text-xs text-gray-500 mt-1">Por seguridad, la contrase\xF1a no puede ser modificada</p></div><div><label class="block text-sm font-medium text-gray-400 mb-2"> Token de Autenticaci\xF3n </label><input value="No editable" type="text" disabled class="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-md text-gray-400 cursor-not-allowed"><p class="text-xs text-gray-500 mt-1">El token se genera autom\xE1ticamente</p></div></div></div><div class="flex items-center justify-end space-x-4 pt-6 border-t border-gray-700"><button type="button" class="px-6 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-md transition-colors"> Cancelar </button><button type="submit"${ssrIncludeBooleanAttr(unref(isSaving)) ? " disabled" : ""} class="px-6 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800 disabled:cursor-not-allowed text-white rounded-md transition-colors flex items-center">`);
        if (unref(isSaving)) {
          _push(`<div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(` ${ssrInterpolate(unref(isSaving) ? "Guardando..." : "Guardar Cambios")}</button></div></form></div>`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/usuarios/editar/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_id_-E-sA8TEQ.mjs.map
