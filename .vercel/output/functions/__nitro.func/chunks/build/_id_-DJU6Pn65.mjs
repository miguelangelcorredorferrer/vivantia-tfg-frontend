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
      device_name: "",
      enddevice_id: "",
      app_eui: "",
      dev_eui: "",
      app_key: "",
      is_active_communication: false,
      ttn_region: "",
      ttn_app_id: "",
      ttn_access_key: ""
    });
    const deviceOwner = ref({
      name: "",
      email: ""
    });
    const isLoading = ref(false);
    const isSaving = ref(false);
    const error = ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-8" }, _attrs))}><div class="mb-8"><div class="flex items-center space-x-3 mb-2"><div class="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center"><svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg></div><div><h1 class="text-3xl font-bold text-white">Panel de Administraci\xF3n</h1><p class="text-gray-400">Bienvenido al centro de control del sistema Vivantia</p></div></div><div class="mt-4"><h2 class="text-xl font-semibold text-white">Editar Dispositivo</h2><p class="text-gray-400 mt-1">Modificar configuraci\xF3n del dispositivo</p></div></div>`);
      if (unref(isLoading)) {
        _push(`<div class="flex items-center justify-center py-12"><div class="text-center"><div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-4"></div><p class="text-gray-400">Cargando dispositivo...</p></div></div>`);
      } else if (unref(error)) {
        _push(`<div class="bg-red-500/20 border border-red-500/30 rounded-lg p-6"><div class="flex items-center"><svg class="w-6 h-6 text-red-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><div><h3 class="text-lg font-medium text-red-400">Error</h3><p class="text-red-300 mt-1">${ssrInterpolate(unref(error))}</p></div></div><button class="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"> Reintentar </button></div>`);
      } else {
        _push(`<div class="bg-gray-800/50 border border-gray-700 rounded-lg p-6"><form class="space-y-6"><div class="bg-gray-700/30 rounded-lg p-4"><h3 class="text-lg font-medium text-white mb-4">Usuario Propietario</h3><div class="flex items-center space-x-4"><div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center"><span class="text-white text-lg font-semibold">${ssrInterpolate(unref(deviceOwner).name.charAt(0).toUpperCase())}</span></div><div><p class="text-white font-medium">${ssrInterpolate(unref(deviceOwner).name)}</p><p class="text-gray-400 text-sm">${ssrInterpolate(unref(deviceOwner).email)}</p></div></div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div><label class="block text-sm font-medium text-gray-300 mb-2"> Nombre del Dispositivo * </label><input${ssrRenderAttr("value", unref(formData).device_name)} type="text" required class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Ej: Sensor Riego Principal"></div><div><label class="block text-sm font-medium text-gray-300 mb-2"> EndDevice ID * </label><input${ssrRenderAttr("value", unref(formData).enddevice_id)} type="text" required class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Ej: sensor-riego-01"></div><div><label class="block text-sm font-medium text-gray-300 mb-2"> AppEUI * </label><input${ssrRenderAttr("value", unref(formData).app_eui)} type="text" required class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Ej: 0000000000000000"></div><div><label class="block text-sm font-medium text-gray-300 mb-2"> DevEUI * </label><input${ssrRenderAttr("value", unref(formData).dev_eui)} type="text" required class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Ej: 0000000000000000"></div><div><label class="block text-sm font-medium text-gray-300 mb-2"> AppKey (No editable) </label><input${ssrRenderAttr("value", unref(formData).app_key ? unref(formData).app_key.substring(0, 8) + "****" + unref(formData).app_key.substring(unref(formData).app_key.length - 8) : "N/A")} type="text" disabled class="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-md text-gray-400 cursor-not-allowed"><p class="text-xs text-gray-500 mt-1">Por seguridad, la AppKey no puede ser modificada</p></div><div><label class="block text-sm font-medium text-gray-300 mb-2"> Estado de Comunicaci\xF3n </label><div class="flex items-center space-x-3"><input${ssrIncludeBooleanAttr(Array.isArray(unref(formData).is_active_communication) ? ssrLooseContain(unref(formData).is_active_communication, null) : unref(formData).is_active_communication) ? " checked" : ""} type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"><span class="text-white">Activar comunicaci\xF3n</span></div><p class="text-xs text-gray-500 mt-1">Controla si el dispositivo puede enviar datos</p></div></div><div class="border-t border-gray-600 pt-6"><h3 class="text-lg font-medium text-white mb-4 flex items-center"><svg class="w-5 h-5 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"></path></svg> Configuraci\xF3n TTN (The Things Network) </h3><div class="grid grid-cols-1 md:grid-cols-3 gap-6"><div><label class="block text-sm font-medium text-gray-300 mb-2"> TTN Region </label><select class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(formData).ttn_region) ? ssrLooseContain(unref(formData).ttn_region, "") : ssrLooseEqual(unref(formData).ttn_region, "")) ? " selected" : ""}>Seleccionar regi\xF3n</option><option value="eu1"${ssrIncludeBooleanAttr(Array.isArray(unref(formData).ttn_region) ? ssrLooseContain(unref(formData).ttn_region, "eu1") : ssrLooseEqual(unref(formData).ttn_region, "eu1")) ? " selected" : ""}>Europe 1 (eu1)</option><option value="nam1"${ssrIncludeBooleanAttr(Array.isArray(unref(formData).ttn_region) ? ssrLooseContain(unref(formData).ttn_region, "nam1") : ssrLooseEqual(unref(formData).ttn_region, "nam1")) ? " selected" : ""}>North America 1 (nam1)</option><option value="au1"${ssrIncludeBooleanAttr(Array.isArray(unref(formData).ttn_region) ? ssrLooseContain(unref(formData).ttn_region, "au1") : ssrLooseEqual(unref(formData).ttn_region, "au1")) ? " selected" : ""}>Australia 1 (au1)</option><option value="as1"${ssrIncludeBooleanAttr(Array.isArray(unref(formData).ttn_region) ? ssrLooseContain(unref(formData).ttn_region, "as1") : ssrLooseEqual(unref(formData).ttn_region, "as1")) ? " selected" : ""}>Asia 1 (as1)</option></select><p class="text-xs text-gray-500 mt-1">Regi\xF3n del servidor TTN</p></div><div><label class="block text-sm font-medium text-gray-300 mb-2"> TTN Application ID </label><input${ssrRenderAttr("value", unref(formData).ttn_app_id)} type="text" class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="my-ttn-application"><p class="text-xs text-gray-500 mt-1">ID de la aplicaci\xF3n en TTN</p></div><div><label class="block text-sm font-medium text-gray-300 mb-2"> TTN Access Key </label><input${ssrRenderAttr("value", unref(formData).ttn_access_key)} type="password" class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono" placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"><p class="text-xs text-gray-500 mt-1">Clave de acceso para la API TTN</p></div></div><div class="mt-4 p-3 bg-blue-900/20 border border-blue-500/30 rounded-lg"><div class="flex items-start"><svg class="w-5 h-5 text-blue-400 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><div class="text-sm text-blue-300"><p class="font-medium mb-1">Configuraci\xF3n TTN</p><p>Los campos TTN son necesarios para el control remoto de la bomba de riego a trav\xE9s de The Things Network.</p></div></div></div></div><div class="flex items-center justify-end space-x-4 pt-6 border-t border-gray-700"><button type="button" class="px-6 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-md transition-colors"> Cancelar </button><button type="submit"${ssrIncludeBooleanAttr(unref(isSaving)) ? " disabled" : ""} class="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white rounded-md transition-colors flex items-center">`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/dispositivos/editar/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_id_-DJU6Pn65.mjs.map
