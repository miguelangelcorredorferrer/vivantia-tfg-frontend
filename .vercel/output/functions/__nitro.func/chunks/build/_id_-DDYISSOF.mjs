import { ref, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderClass } from 'vue/server-renderer';
import { useRoute, useRouter } from 'vue-router';
import { u as useToastNotifications } from './useToastNotifications-DaJGJiXK.mjs';
import { u as useCropStore } from './crop-CoogIRpZ.mjs';
import { u as useUserStore } from './user-BEdD-0tD.mjs';
import { T as ThermometerIcon, C as CheckIcon } from './ThermometerIcon-CWsbcdy6.mjs';
import { C as ChevronLeftIcon } from './ChevronLeftIcon-D8BDUlIz.mjs';
import { W as WarningIcon } from './WarningIcon-CqMZlVzn.mjs';
import { H as HumidityIcon } from './HumidityIcon-UKpSAva3.mjs';
import { P as PlantIcon } from './PlantIcon-DoN4-AKe.mjs';
import { E as EditIcon } from './EditIcon-bduVuxtD.mjs';
import { u as useHead } from './v3-DHK4yxVL.mjs';
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
import 'pinia';
import '@iconify/vue';
import './CropAPI-Cg4msNVy.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';

const _sfc_main = {
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Ver Cultivo - VIVANTIA",
      meta: [
        { name: "description", content: "Informaci\xF3n detallada del cultivo seleccionado" }
      ]
    });
    useRoute();
    useRouter();
    const { toast } = useToastNotifications();
    useCropStore();
    const userStore = useUserStore();
    const crop = ref(null);
    const loading = ref(true);
    const error = ref(null);
    const isUserCrop = computed(() => {
      return crop.value && userStore.user && crop.value.user_id === userStore.user.id;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-8" }, _attrs))}><div class="max-w-4xl mx-auto">`);
      if (loading.value) {
        _push(`<div class="flex items-center justify-center py-12"><div class="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div><span class="ml-3 text-gray-300">Cargando informaci\xF3n del cultivo...</span></div>`);
      } else if (error.value) {
        _push(`<div class="text-center py-12"><div class="w-16 h-16 bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">`);
        _push(ssrRenderComponent(unref(WarningIcon), null, null, _parent));
        _push(`</div><h3 class="text-lg font-medium text-white mb-2">Error al cargar el cultivo</h3><p class="text-gray-400 mb-4">${ssrInterpolate(error.value)}</p><button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"> Intentar de nuevo </button></div>`);
      } else if (crop.value) {
        _push(`<div class="space-y-6"><div class="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700"><div class="flex items-start justify-between"><div class="flex items-center space-x-6"><div class="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg">`);
        _push(ssrRenderComponent(unref(PlantIcon), null, null, _parent));
        _push(`</div><div><h1 class="text-2xl font-bold text-white mb-2">${ssrInterpolate(crop.value.name)}</h1><p class="text-gray-300 mb-3">${ssrInterpolate(crop.value.description)}</p><div class="flex items-center space-x-4"><span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-700 text-gray-300">${ssrInterpolate(crop.value.category)}</span><div class="flex items-center space-x-2"><div class="${ssrRenderClass([crop.value.selected ? "bg-green-500 animate-pulse" : "bg-gray-500", "w-3 h-3 rounded-full"])}"></div><span class="text-sm text-gray-400">${ssrInterpolate(crop.value.selected ? "Seleccionado" : "No seleccionado")}</span></div></div></div></div><div class="flex items-center space-x-3"><button class="px-4 py-2 bg-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2">`);
        _push(ssrRenderComponent(unref(ChevronLeftIcon), null, null, _parent));
        _push(`<span>Volver</span></button><button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">`);
        _push(ssrRenderComponent(unref(EditIcon), null, null, _parent));
        _push(`<span>Editar</span></button></div></div></div><div class="grid grid-cols-1 lg:grid-cols-2 gap-6"><div class="space-y-6"><div class="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700"><h2 class="text-xl font-bold text-white mb-6 flex items-center">`);
        _push(ssrRenderComponent(unref(ThermometerIcon), null, null, _parent));
        _push(`<span class="ml-3">Requerimientos Ambientales</span></h2><div class="space-y-4"><div class="relative overflow-hidden bg-gradient-to-r from-blue-600/20 via-blue-700/15 to-blue-800/20 p-6 rounded-xl border border-blue-500/30 hover:border-blue-400/50 transition-all duration-300 group"><div class="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div><div class="relative z-10"><div class="flex items-center justify-between"><div class="flex items-center space-x-4"><div class="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center group-hover:bg-blue-500/30 transition-colors duration-300">`);
        _push(ssrRenderComponent(unref(HumidityIcon), { class: "w-6 h-6 text-blue-300" }, null, _parent));
        _push(`</div><div><h3 class="font-semibold text-blue-200 text-xl">Humedad del Suelo</h3><p class="text-sm text-blue-300/80">Rango \xF3ptimo del suelo</p></div></div><div class="text-right"><div class="text-4xl font-bold text-blue-100">${ssrInterpolate(crop.value.soil_humidity_min)}% - ${ssrInterpolate(crop.value.soil_humidity_max)}%</div></div></div></div></div><div class="relative overflow-hidden bg-gradient-to-r from-cyan-600/20 via-cyan-700/15 to-teal-800/20 p-6 rounded-xl border border-cyan-500/30 hover:border-cyan-400/50 transition-all duration-300 group"><div class="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div><div class="relative z-10"><div class="flex items-center justify-between"><div class="flex items-center space-x-4"><div class="w-12 h-12 bg-cyan-500/20 rounded-full flex items-center justify-center group-hover:bg-cyan-500/30 transition-colors duration-300">`);
        _push(ssrRenderComponent(unref(HumidityIcon), { class: "w-6 h-6 text-cyan-300" }, null, _parent));
        _push(`</div><div><h3 class="font-semibold text-cyan-200 text-xl">Humedad del Aire</h3><p class="text-sm text-cyan-300/80">Rango \xF3ptimo ambiental</p></div></div><div class="text-right"><div class="text-4xl font-bold text-cyan-100">${ssrInterpolate(crop.value.air_humidity_min)}% - ${ssrInterpolate(crop.value.air_humidity_max)}%</div></div></div></div></div><div class="relative overflow-hidden bg-gradient-to-r from-red-600/20 via-red-700/15 to-orange-800/20 p-6 rounded-xl border border-red-500/30 hover:border-red-400/50 transition-all duration-300 group"><div class="absolute inset-0 bg-gradient-to-r from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div><div class="relative z-10"><div class="flex items-center justify-between"><div class="flex items-center space-x-4"><div class="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center group-hover:bg-red-500/30 transition-colors duration-300">`);
        _push(ssrRenderComponent(unref(ThermometerIcon), { class: "w-6 h-6 text-red-300" }, null, _parent));
        _push(`</div><div><h3 class="font-semibold text-red-200 text-xl">Temperatura M\xE1xima</h3><p class="text-sm text-red-300/80">Temperatura m\xE1xima tolerada</p></div></div><div class="text-right"><div class="text-4xl font-bold text-red-100">${ssrInterpolate(crop.value.temperature_max)}\xB0C</div></div></div></div></div></div></div><div class="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700"><h2 class="text-xl font-bold text-white mb-6 flex items-center">`);
        _push(ssrRenderComponent(unref(PlantIcon), null, null, _parent));
        _push(`<span class="ml-3">Informaci\xF3n de Crecimiento</span></h2><div class="flex justify-center"><div class="text-center"><div class="w-16 h-16 bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-3"><span class="text-2xl font-bold text-green-400">${ssrInterpolate(crop.value.growth_days || "N/A")}</span></div><h4 class="font-medium text-white mb-1">D\xEDas de Crecimiento</h4><p class="text-sm text-gray-400">D\xEDas hasta cosecha</p></div></div></div></div><div class="space-y-6"><div class="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700"><h2 class="text-xl font-bold text-white mb-6">Estado Actual</h2><div class="space-y-4"><div class="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg"><div class="flex items-center space-x-3"><div class="${ssrRenderClass([crop.value.selected ? "bg-green-500 animate-pulse" : "bg-gray-500", "w-4 h-4 rounded-full"])}"></div><span class="text-gray-300">Seleccionado</span></div><span class="${ssrRenderClass([crop.value.selected ? "text-green-400" : "text-gray-500", "text-sm font-medium"])}">${ssrInterpolate(crop.value.selected ? "S\xED" : "No")}</span></div><div class="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg"><div class="flex items-center space-x-3"><div class="${ssrRenderClass([crop.value.waterPumpActive ? "bg-blue-500 animate-pulse" : "bg-gray-500", "w-4 h-4 rounded-full"])}"></div><span class="text-gray-300">Bomba de Agua</span></div><span class="${ssrRenderClass([crop.value.waterPumpActive ? "text-blue-400" : "text-gray-500", "text-sm font-medium"])}">${ssrInterpolate(crop.value.waterPumpActive ? "Activa" : "Inactiva")}</span></div><div class="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg"><span class="text-gray-300">Categor\xEDa</span><span class="text-sm font-medium text-gray-400">${ssrInterpolate(crop.value.category)}</span></div><div class="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg"><span class="text-gray-300">Temporada</span><span class="text-sm font-medium text-gray-400">${ssrInterpolate(crop.value.session || "No especificada")}</span></div></div></div><div class="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700"><h2 class="text-xl font-bold text-white mb-6">Acciones R\xE1pidas</h2><div class="space-y-3">`);
        if (isUserCrop.value) {
          _push(`<button class="w-full px-4 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-medium rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 flex items-center justify-center space-x-2">`);
          _push(ssrRenderComponent(unref(CheckIcon), null, null, _parent));
          _push(`<span>${ssrInterpolate(crop.value.selected ? "Deseleccionar" : "Seleccionar")} Cultivo</span></button>`);
        } else {
          _push(`<!---->`);
        }
        if (isUserCrop.value) {
          _push(`<button class="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center justify-center space-x-2">`);
          _push(ssrRenderComponent(unref(EditIcon), null, null, _parent));
          _push(`<span>Editar Informaci\xF3n</span></button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<button class="w-full px-4 py-3 bg-gray-600 text-gray-300 font-medium rounded-lg hover:bg-gray-700 transition-all duration-200 flex items-center justify-center space-x-2">`);
        _push(ssrRenderComponent(unref(ChevronLeftIcon), null, null, _parent));
        _push(`<span>Volver a Cultivos</span></button></div></div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/cultivos/ver/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_id_-DDYISSOF.mjs.map
