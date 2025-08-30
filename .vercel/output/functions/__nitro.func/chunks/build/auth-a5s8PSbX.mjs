import { _ as __nuxt_component_0 } from './nuxt-link-rSZMKS1E.mjs';
import { mergeProps, unref, withCtx, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderSlot, ssrRenderList, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { useRoute } from 'vue-router';
import { l as logoUrl } from './logovivantia-B51o3jSh.mjs';
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
  __name: "auth",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const authRoutes = [
      { path: "/auth/register", name: "register", text: "Crear una cuenta" },
      { path: "/auth/login", name: "login", text: "Iniciar Sesi\xF3n" },
      { path: "/auth/forgot-password", name: "forgot-password", text: "Recuperar contrase\xF1a" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex flex-col" }, _attrs))}><div class="text-center py-8 animate-fade-in"><div class="flex items-center justify-center space-x-4 lg:space-x-6 mb-4"><img${ssrRenderAttr("src", unref(logoUrl))} alt="Vivantia IoT Logo" class="w-12 h-12 lg:w-16 lg:h-16 object-contain rounded-full shadow-lg"><h1 class="text-4xl lg:text-6xl font-bold text-white bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent"> Vivantia IoT </h1></div><p class="text-lg lg:text-2xl text-gray-300">Sistema IoT para la gesti\xF3n inteligente de riego</p></div><div class="flex-1 flex items-center justify-center p-4"><div class="w-full max-w-6xl flex gap-8"><div class="hidden lg:flex flex-col flex-1 max-w-xl"><div class="flex items-center justify-center space-x-8 text-gray-400 text-lg mb-12"><div class="flex items-center space-x-3"><div class="w-4 h-4 bg-green-400 rounded-full animate-pulse"></div><span>Sensores IoT</span></div><div class="flex items-center space-x-3"><div class="w-4 h-4 bg-blue-400 rounded-full animate-pulse"></div><span>Riego Autom\xE1tico</span></div><div class="flex items-center space-x-3"><div class="w-4 h-4 bg-purple-400 rounded-full animate-pulse"></div><span>An\xE1lisis en Tiempo Real</span></div></div><div class="grid grid-cols-2 gap-6 w-full max-w-lg"><div class="feature-widget bg-gradient-to-br from-green-500/20 to-green-600/20 backdrop-blur-sm rounded-xl border border-green-400/30 p-6 hover:scale-105 transition-all duration-300"><div class="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-green-400 to-green-500 rounded-full mb-4 mx-auto"><svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg></div><h3 class="text-white font-bold text-lg mb-2 text-center">Monitoreo 24/7</h3><p class="text-gray-300 text-sm text-center">Sensores de temperatura y humedad en tiempo real para un control preciso del cultivo</p></div><div class="feature-widget bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-sm rounded-xl border border-blue-400/30 p-6 hover:scale-105 transition-all duration-300"><div class="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full mb-4 mx-auto"><svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg></div><h3 class="text-white font-bold text-lg mb-2 text-center">Automatizaci\xF3n</h3><p class="text-gray-300 text-sm text-center"> Gesti\xF3n del riego inteligente basado en datos del cultivo y condiciones ambientales</p></div><div class="feature-widget bg-gradient-to-br from-purple-500/20 to-purple-600/20 backdrop-blur-sm rounded-xl border border-purple-400/30 p-6 hover:scale-105 transition-all duration-300"><div class="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-400 to-purple-500 rounded-full mb-4 mx-auto"><svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg></div><h3 class="text-white font-bold text-lg mb-2 text-center">Eficiencia</h3><p class="text-gray-300 text-sm text-center">Optimiza el uso del agua y mejora el rendimiento de tus cultivos</p></div><div class="feature-widget bg-gradient-to-br from-orange-500/20 to-orange-600/20 backdrop-blur-sm rounded-xl border border-orange-400/30 p-6 hover:scale-105 transition-all duration-300"><div class="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full mb-4 mx-auto"><svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path></svg></div><h3 class="text-white font-bold text-lg mb-2 text-center">IoT Avanzado</h3><p class="text-gray-300 text-sm text-center">Conectividad LoRaWAN y comunicaci\xF3n bidireccional con dispositivos IoT hacia TTN</p></div></div></div><div class="w-full max-w-md flex flex-col"><div class="text-center mb-8 lg:hidden"><div class="flex justify-center mb-4"><img${ssrRenderAttr("src", unref(logoUrl))} alt="Vivantia IoT Logo" class="w-12 h-12 object-contain rounded-full shadow-lg"></div><h1 class="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent"> Vivantia IoT </h1><p class="text-gray-300">Sistema de Automatizaci\xF3n de Riego</p></div><div class="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/20">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div><nav class="mt-6 flex flex-col items-center space-y-3 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-6"><!--[-->`);
      ssrRenderList(authRoutes, (authRoute) => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          key: authRoute.name,
          class: ["text-white/80 hover:text-white transition-colors duration-200 font-medium", { "hidden": unref(route).path === authRoute.path }],
          to: authRoute.path
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(authRoute.text)}`);
            } else {
              return [
                createTextVNode(toDisplayString(authRoute.text), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></nav></div></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/auth.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=auth-a5s8PSbX.mjs.map
