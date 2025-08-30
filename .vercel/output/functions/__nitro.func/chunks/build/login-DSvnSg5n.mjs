import { _ as __nuxt_component_0 } from './nuxt-link-rSZMKS1E.mjs';
import { ref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderClass, ssrInterpolate, ssrRenderComponent, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { useRouter } from 'vue-router';
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
import '@iconify/vue';

const _sfc_main = {
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    useUserStore();
    const { toast } = useToastNotifications();
    const formData = ref({
      email: "",
      password: ""
    });
    const errors = ref({});
    const isSubmitting = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="text-center mb-6"><h2 class="text-2xl font-bold text-gray-800 mb-2">Iniciar Sesi\xF3n</h2><p class="text-gray-600">Accede a tu cuenta de Vivantia IoT</p></div><form class="space-y-4"><div><label for="email" class="block text-sm font-medium text-gray-700 mb-1"> Correo electr\xF3nico </label><input id="email"${ssrRenderAttr("value", formData.value.email)} type="email" placeholder="tu@email.com" class="${ssrRenderClass([{ "border-red-500": errors.value.email }, "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"])}">`);
      if (errors.value.email) {
        _push(`<p class="text-red-500 text-sm mt-1">${ssrInterpolate(errors.value.email)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div><label for="password" class="block text-sm font-medium text-gray-700 mb-1"> Contrase\xF1a </label><input id="password"${ssrRenderAttr("value", formData.value.password)} type="password" placeholder="Tu contrase\xF1a" class="${ssrRenderClass([{ "border-red-500": errors.value.password }, "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"])}">`);
      if (errors.value.password) {
        _push(`<p class="text-red-500 text-sm mt-1">${ssrInterpolate(errors.value.password)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="text-right">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/auth/forgot-password",
        class: "text-sm text-green-600 hover:text-green-700 transition-colors duration-200"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` \xBFOlvidaste tu contrase\xF1a? `);
          } else {
            return [
              createTextVNode(" \xBFOlvidaste tu contrase\xF1a? ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><button type="submit"${ssrIncludeBooleanAttr(isSubmitting.value) ? " disabled" : ""} class="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed">`);
      if (!isSubmitting.value) {
        _push(`<span>Iniciar Sesi\xF3n</span>`);
      } else {
        _push(`<span class="flex items-center justify-center"><svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Iniciando sesi\xF3n... </span>`);
      }
      _push(`</button><div class="relative my-6"><div class="absolute inset-0 flex items-center"><div class="w-full border-t border-gray-300"></div></div><div class="relative flex justify-center text-sm"><span class="px-2 bg-white text-gray-500">o</span></div></div><button type="button" class="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200 border border-gray-300"><span class="flex items-center justify-center"><svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg> Vista Previa </span></button></form><div class="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg"><div class="flex"><div class="flex-shrink-0"><svg class="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg></div><div class="ml-3"><p class="text-sm text-blue-700"><strong>Vista Previa:</strong> Explora las funcionalidades de Vivantia con datos de demostraci\xF3n antes de registrarte. </p></div></div></div><div class="mt-6 text-center"><p class="text-sm text-gray-600"> \xBFNo tienes cuenta? `);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/auth/register",
        class: "text-green-600 hover:text-green-700 font-medium transition-colors duration-200"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Reg\xEDstrate aqu\xED `);
          } else {
            return [
              createTextVNode(" Reg\xEDstrate aqu\xED ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/auth/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=login-DSvnSg5n.mjs.map
