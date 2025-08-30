import { _ as __nuxt_component_0 } from './nuxt-link-rSZMKS1E.mjs';
import { ref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderClass, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderComponent } from 'vue/server-renderer';
import { u as useUserStore } from './user-BEdD-0tD.mjs';
import { u as useToastNotifications } from './useToastNotifications-DaJGJiXK.mjs';
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
import './server.mjs';
import 'pinia';
import 'vue-router';
import '@iconify/vue';

const _sfc_main = {
  __name: "forgot-password",
  __ssrInlineRender: true,
  setup(__props) {
    useUserStore();
    const { toast } = useToastNotifications();
    const email = ref("");
    const errors = ref({});
    const isSubmitting = ref(false);
    const emailSent = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="text-center mb-6"><h2 class="text-2xl font-bold text-gray-800 mb-2">Recuperar Contrase\xF1a</h2><p class="text-gray-600">Te enviaremos instrucciones a tu email</p></div>`);
      if (!emailSent.value) {
        _push(`<div><form class="space-y-4"><div><label for="email" class="block text-sm font-medium text-gray-700 mb-1"> Correo electr\xF3nico </label><input id="email"${ssrRenderAttr("value", email.value)} type="email" placeholder="tu@email.com" class="${ssrRenderClass([{ "border-red-500": errors.value.email }, "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"])}">`);
        if (errors.value.email) {
          _push(`<p class="text-red-500 text-sm mt-1">${ssrInterpolate(errors.value.email)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><button type="submit"${ssrIncludeBooleanAttr(isSubmitting.value) ? " disabled" : ""} class="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed">`);
        if (!isSubmitting.value) {
          _push(`<span>Enviar instrucciones</span>`);
        } else {
          _push(`<span class="flex items-center justify-center"><svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Enviando... </span>`);
        }
        _push(`</button></form></div>`);
      } else {
        _push(`<div class="text-center"><div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"><svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg></div><h3 class="text-lg font-semibold text-gray-800 mb-2">\xA1Email enviado!</h3><p class="text-gray-600 mb-6"> Revisa tu bandeja de entrada y sigue las instrucciones para restablecer tu contrase\xF1a. </p><button class="text-green-600 hover:text-green-700 font-medium transition-colors duration-200"> Enviar a otro email </button></div>`);
      }
      _push(`<div class="mt-6 text-center"><p class="text-sm text-gray-600"> \xBFRecordaste tu contrase\xF1a? `);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/auth/login",
        class: "text-green-600 hover:text-green-700 font-medium transition-colors duration-200"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Iniciar sesi\xF3n `);
          } else {
            return [
              createTextVNode(" Iniciar sesi\xF3n ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</p></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/auth/forgot-password.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=forgot-password-BDb6pwIC.mjs.map
