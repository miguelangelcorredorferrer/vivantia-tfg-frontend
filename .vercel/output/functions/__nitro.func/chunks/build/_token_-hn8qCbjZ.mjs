import { ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate } from 'vue/server-renderer';
import { useRoute, useRouter } from 'vue-router';
import { u as useUserStore } from './user-BEdD-0tD.mjs';
import { u as useToastNotifications } from './useToastNotifications-DaJGJiXK.mjs';
import 'pinia';
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
import '@iconify/vue';

const _sfc_main = {
  __name: "[token]",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    useRouter();
    useUserStore();
    const { toast } = useToastNotifications();
    route.params.token;
    const isVerifying = ref(true);
    const isSuccess = ref(false);
    const errorMessage = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900" }, _attrs))}><div class="max-w-md w-full mx-4"><div class="bg-white rounded-2xl shadow-2xl p-8"><div class="text-center mb-8"><div class="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">`);
      if (isVerifying.value) {
        _push(`<svg class="w-8 h-8 text-white animate-spin" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd"></path></svg>`);
      } else if (isSuccess.value) {
        _push(`<svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>`);
      } else {
        _push(`<svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>`);
      }
      _push(`</div><h1 class="text-2xl font-bold text-gray-900 mb-2">${ssrInterpolate(isVerifying.value ? "Verificando cuenta..." : isSuccess.value ? "\xA1Cuenta verificada!" : "Error de verificaci\xF3n")}</h1><p class="text-gray-600">${ssrInterpolate(isVerifying.value ? "Procesando tu verificaci\xF3n" : isSuccess.value ? "Tu cuenta ha sido verificada exitosamente" : "No se pudo verificar tu cuenta")}</p></div><div class="text-center mb-8">`);
      if (isVerifying.value) {
        _push(`<div class="bg-blue-50 border border-blue-200 rounded-lg p-6"><div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div><p class="text-gray-600 text-sm">Verificando tu cuenta, por favor espera...</p></div>`);
      } else if (isSuccess.value) {
        _push(`<div class="bg-green-50 border border-green-200 rounded-lg p-6"><div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"><svg class="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg></div><h3 class="text-lg font-semibold text-gray-900 mb-2">\xA1Verificaci\xF3n exitosa!</h3><p class="text-gray-600 text-sm leading-relaxed"> Tu cuenta ha sido verificada correctamente. Ya puedes iniciar sesi\xF3n y acceder a todas las funcionalidades de Vivantia IoT Solutions. </p></div>`);
      } else {
        _push(`<div class="bg-red-50 border border-red-200 rounded-lg p-6"><div class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"><svg class="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg></div><h3 class="text-lg font-semibold text-gray-900 mb-2">Error de verificaci\xF3n</h3><p class="text-gray-600 text-sm leading-relaxed">${ssrInterpolate(errorMessage.value)}</p></div>`);
      }
      _push(`</div><div class="space-y-4">`);
      if (isSuccess.value) {
        _push(`<button class="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-green-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg"> Ir al inicio de sesi\xF3n </button>`);
      } else if (!isVerifying.value) {
        _push(`<div class="space-y-3"><button class="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg"> Ir al inicio de sesi\xF3n </button><button class="w-full bg-gray-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-gray-600 transition-all duration-200 transform hover:scale-105 shadow-lg"> Crear nueva cuenta </button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="mt-6 text-center"><p class="text-xs text-gray-500"> \xBFNecesitas ayuda? Contacta con nuestro soporte t\xE9cnico. </p></div></div><div class="text-center mt-8"><p class="text-sm text-gray-400"> \xA9 2024 Vivantia IoT Solutions. Todos los derechos reservados. </p></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/auth/confirm/[token].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_token_-hn8qCbjZ.mjs.map
