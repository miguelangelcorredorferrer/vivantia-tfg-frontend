import { _ as __nuxt_component_0 } from './nuxt-link-rSZMKS1E.mjs';
import { ref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderClass, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderComponent } from 'vue/server-renderer';
import { useRoute, useRouter } from 'vue-router';
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
  __name: "[token]",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    useRouter();
    useUserStore();
    const { toast } = useToastNotifications();
    const { token } = route.params;
    const validToken = ref(false);
    const isCheckingToken = ref(true);
    const password = ref("");
    const passwordConfirm = ref("");
    const errors = ref({});
    const isSubmitting = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      if (isCheckingToken.value) {
        _push(`<div class="text-center py-8"><div class="flex justify-center mb-4"><svg class="animate-spin h-8 w-8 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg></div><p class="text-gray-600">Verificando token...</p></div>`);
      } else if (validToken.value) {
        _push(`<div><div class="text-center mb-6"><h2 class="text-2xl font-bold text-gray-800 mb-2">Nueva Contrase\xF1a</h2><p class="text-gray-600">Establece una nueva contrase\xF1a para tu cuenta</p></div><form class="space-y-4"><div><label for="password" class="block text-sm font-medium text-gray-700 mb-1"> Nueva contrase\xF1a </label><input id="password"${ssrRenderAttr("value", password.value)} type="password" placeholder="M\xEDnimo 8 caracteres" class="${ssrRenderClass([{ "border-red-500": errors.value.password }, "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"])}">`);
        if (errors.value.password) {
          _push(`<p class="text-red-500 text-sm mt-1">${ssrInterpolate(errors.value.password)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div><label for="passwordConfirm" class="block text-sm font-medium text-gray-700 mb-1"> Confirmar nueva contrase\xF1a </label><input id="passwordConfirm"${ssrRenderAttr("value", passwordConfirm.value)} type="password" placeholder="Repite tu nueva contrase\xF1a" class="${ssrRenderClass([{ "border-red-500": errors.value.passwordConfirm }, "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"])}">`);
        if (errors.value.passwordConfirm) {
          _push(`<p class="text-red-500 text-sm mt-1">${ssrInterpolate(errors.value.passwordConfirm)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><button type="submit"${ssrIncludeBooleanAttr(isSubmitting.value) ? " disabled" : ""} class="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed">`);
        if (!isSubmitting.value) {
          _push(`<span>Guardar nueva contrase\xF1a</span>`);
        } else {
          _push(`<span class="flex items-center justify-center"><svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Guardando... </span>`);
        }
        _push(`</button></form></div>`);
      } else {
        _push(`<div class="text-center py-8"><div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"><svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path></svg></div><h3 class="text-lg font-semibold text-gray-800 mb-2">Token inv\xE1lido</h3><p class="text-gray-600 mb-6"> El enlace de recuperaci\xF3n ha expirado o no es v\xE1lido. </p>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/auth/forgot-password",
          class: "inline-block bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Solicitar nuevo enlace `);
            } else {
              return [
                createTextVNode(" Solicitar nuevo enlace ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/auth/new-password/[token].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_token_-C6DuHw5l.mjs.map
