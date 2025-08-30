import { ssrRenderAttrs, ssrRenderAttr, ssrRenderClass, ssrInterpolate, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { ref, useSSRContext } from 'vue';
import { useRouter } from 'vue-router';
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
  __name: "register",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    useUserStore();
    const { toast } = useToastNotifications();
    const formData = ref({
      name: "",
      email: "",
      password: "",
      password_confirm: ""
    });
    const errors = ref({});
    const isSubmitting = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="text-center mb-6"><h2 class="text-2xl font-bold text-gray-800 mb-2">Crear una cuenta</h2><p class="text-gray-600">\xDAnete a Vivantia IoT</p></div><form class="space-y-4"><div><label for="name" class="block text-sm font-medium text-gray-700 mb-1"> Nombre completo </label><input id="name"${ssrRenderAttr("value", formData.value.name)} type="text" placeholder="Tu nombre completo" class="${ssrRenderClass([{ "border-red-500": errors.value.name }, "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"])}">`);
      if (errors.value.name) {
        _push(`<p class="text-red-500 text-sm mt-1">${ssrInterpolate(errors.value.name)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div><label for="email" class="block text-sm font-medium text-gray-700 mb-1"> Correo electr\xF3nico </label><input id="email"${ssrRenderAttr("value", formData.value.email)} type="email" placeholder="tu@email.com" class="${ssrRenderClass([{ "border-red-500": errors.value.email }, "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"])}">`);
      if (errors.value.email) {
        _push(`<p class="text-red-500 text-sm mt-1">${ssrInterpolate(errors.value.email)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div><label for="password" class="block text-sm font-medium text-gray-700 mb-1"> Contrase\xF1a </label><input id="password"${ssrRenderAttr("value", formData.value.password)} type="password" placeholder="M\xEDnimo 8 caracteres" class="${ssrRenderClass([{ "border-red-500": errors.value.password }, "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"])}">`);
      if (errors.value.password) {
        _push(`<p class="text-red-500 text-sm mt-1">${ssrInterpolate(errors.value.password)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div><label for="password_confirm" class="block text-sm font-medium text-gray-700 mb-1"> Confirmar contrase\xF1a </label><input id="password_confirm"${ssrRenderAttr("value", formData.value.password_confirm)} type="password" placeholder="Repite tu contrase\xF1a" class="${ssrRenderClass([{ "border-red-500": errors.value.password_confirm }, "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"])}">`);
      if (errors.value.password_confirm) {
        _push(`<p class="text-red-500 text-sm mt-1">${ssrInterpolate(errors.value.password_confirm)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><button type="submit"${ssrIncludeBooleanAttr(isSubmitting.value) ? " disabled" : ""} class="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed">`);
      if (!isSubmitting.value) {
        _push(`<span>Crear cuenta</span>`);
      } else {
        _push(`<span class="flex items-center justify-center"><svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Creando cuenta... </span>`);
      }
      _push(`</button></form></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/auth/register.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=register-gerIIYk6.mjs.map
