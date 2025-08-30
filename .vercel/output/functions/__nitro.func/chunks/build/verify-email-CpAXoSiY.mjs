import { _ as __nuxt_component_0 } from './nuxt-link-rSZMKS1E.mjs';
import { mergeProps, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { u as useRouter } from './server.mjs';
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

const _sfc_main = {
  __name: "verify-email",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900" }, _attrs))}><div class="max-w-md w-full mx-4"><div class="bg-white rounded-2xl shadow-2xl p-8"><div class="text-center mb-8"><div class="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4"><svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg></div><h1 class="text-2xl font-bold text-gray-900 mb-2">Verifica tu cuenta</h1><p class="text-gray-600">Revisa tu correo electr\xF3nico</p></div><div class="text-center mb-8"><div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6"><div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4"><svg class="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg></div><h3 class="text-lg font-semibold text-gray-900 mb-2">\xA1Revisa tu email!</h3><p class="text-gray-600 text-sm leading-relaxed"> Hemos enviado un enlace de verificaci\xF3n a tu correo electr\xF3nico. Haz clic en el enlace para verificar tu cuenta y poder acceder a Vivantia. </p></div></div><div class="space-y-4"><button class="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-green-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg"> Volver al inicio de sesi\xF3n </button></div><div class="mt-6 text-center"><p class="text-xs text-gray-500"> \xBFNo recibiste el email? Revisa tu carpeta de spam o `);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/auth/register",
        class: "text-blue-600 hover:text-blue-700 font-medium"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` reg\xEDstrate nuevamente `);
          } else {
            return [
              createTextVNode(" reg\xEDstrate nuevamente ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</p></div></div><div class="text-center mt-8"><p class="text-sm text-gray-400"> \xA9 2025 Vivantia - Sistema IoT para la gesti\xF3n inteligente de riego. </p></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/auth/verify-email.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=verify-email-CpAXoSiY.mjs.map
