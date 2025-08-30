import { watch, mergeProps, unref, withCtx, createBlock, createTextVNode, openBlock, createVNode, computed, reactive, resolveDynamicComponent, withDirectives, vModelText, Fragment, renderList, toDisplayString, vModelSelect, createCommentVNode, ref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderSlot, ssrRenderVNode, ssrRenderAttr, ssrRenderList, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderClass } from 'vue/server-renderer';
import { u as useToastNotifications } from './useToastNotifications-DaJGJiXK.mjs';
import { u as useCropStore } from './crop-CoogIRpZ.mjs';
import { u as useUserStore } from './user-BEdD-0tD.mjs';
import { debounce } from 'lodash-es';
import { g as getIcon } from './index-0YkbgJTu.mjs';
import { B as BaseCard } from './BaseCard-BGENKLa5.mjs';
import { _ as _export_sfc } from './server.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-rSZMKS1E.mjs';
import { useRouter } from 'vue-router';
import 'pinia';
import './CropAPI-Cg4msNVy.mjs';
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

const _sfc_main$6 = {
  __name: "CropsFilter",
  __ssrInlineRender: true,
  props: {
    resultsCount: {
      type: Number,
      default: 0
    },
    categories: {
      type: Array,
      default: () => []
    }
  },
  emits: ["filters-changed"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const categories = computed(() => {
      return ["Todas", ...props.categories];
    });
    const localFilters = reactive({
      name: "",
      category: "Todas",
      session: "",
      minSoilHumidity: "",
      maxSoilHumidity: "",
      minAirHumidity: "",
      maxAirHumidity: "",
      maxTemperature: ""
    });
    const hasActiveFilters = computed(() => {
      return localFilters.name !== "" || localFilters.category !== "Todas" || localFilters.session !== "" || localFilters.minSoilHumidity !== "" || localFilters.maxSoilHumidity !== "" || localFilters.minAirHumidity !== "" || localFilters.maxAirHumidity !== "" || localFilters.maxTemperature !== "";
    });
    const updateFilters = () => {
      emit("filters-changed", { ...localFilters });
    };
    const debouncedUpdate = debounce(updateFilters, 300);
    const clearFilters = () => {
      localFilters.name = "";
      localFilters.category = "Todas";
      localFilters.session = "";
      localFilters.minSoilHumidity = "";
      localFilters.maxSoilHumidity = "";
      localFilters.minAirHumidity = "";
      localFilters.maxAirHumidity = "";
      localFilters.maxTemperature = "";
      updateFilters();
    };
    watch(() => localFilters.category, updateFilters);
    watch(() => localFilters.session, updateFilters);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(BaseCard, mergeProps({ title: "Filtros de Cultivos" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="space-y-4" data-v-bbb9ca77${_scopeId}><div data-v-bbb9ca77${_scopeId}><label for="name-filter" class="block text-sm font-medium text-white mb-2" data-v-bbb9ca77${_scopeId}> Buscar por nombre </label><div class="relative" data-v-bbb9ca77${_scopeId}><div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none" data-v-bbb9ca77${_scopeId}>`);
            ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(unref(getIcon)("search")), { class: "h-5 w-5 text-gray-400" }, null), _parent2, _scopeId);
            _push2(`</div><input id="name-filter"${ssrRenderAttr("value", localFilters.name)} type="text" class="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors" placeholder="Ej: Tomate, Lechuga..." data-v-bbb9ca77${_scopeId}></div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-4" data-v-bbb9ca77${_scopeId}><div data-v-bbb9ca77${_scopeId}><label for="category-filter" class="block text-sm font-medium text-white mb-2" data-v-bbb9ca77${_scopeId}> Categor\xEDa </label><select id="category-filter" class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors" data-v-bbb9ca77${_scopeId}><!--[-->`);
            ssrRenderList(categories.value, (category) => {
              _push2(`<option${ssrRenderAttr("value", category)} data-v-bbb9ca77${ssrIncludeBooleanAttr(Array.isArray(localFilters.category) ? ssrLooseContain(localFilters.category, category) : ssrLooseEqual(localFilters.category, category)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(category)}</option>`);
            });
            _push2(`<!--]--></select></div><div data-v-bbb9ca77${_scopeId}><label for="session-filter" class="block text-sm font-medium text-white mb-2" data-v-bbb9ca77${_scopeId}> Temporada </label><select id="session-filter" class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors" data-v-bbb9ca77${_scopeId}><option value="" data-v-bbb9ca77${ssrIncludeBooleanAttr(Array.isArray(localFilters.session) ? ssrLooseContain(localFilters.session, "") : ssrLooseEqual(localFilters.session, "")) ? " selected" : ""}${_scopeId}>Todas</option><option value="Primavera" data-v-bbb9ca77${ssrIncludeBooleanAttr(Array.isArray(localFilters.session) ? ssrLooseContain(localFilters.session, "Primavera") : ssrLooseEqual(localFilters.session, "Primavera")) ? " selected" : ""}${_scopeId}>Primavera</option><option value="Verano" data-v-bbb9ca77${ssrIncludeBooleanAttr(Array.isArray(localFilters.session) ? ssrLooseContain(localFilters.session, "Verano") : ssrLooseEqual(localFilters.session, "Verano")) ? " selected" : ""}${_scopeId}>Verano</option><option value="Oto\xF1o" data-v-bbb9ca77${ssrIncludeBooleanAttr(Array.isArray(localFilters.session) ? ssrLooseContain(localFilters.session, "Oto\xF1o") : ssrLooseEqual(localFilters.session, "Oto\xF1o")) ? " selected" : ""}${_scopeId}>Oto\xF1o</option><option value="Invierno" data-v-bbb9ca77${ssrIncludeBooleanAttr(Array.isArray(localFilters.session) ? ssrLooseContain(localFilters.session, "Invierno") : ssrLooseEqual(localFilters.session, "Invierno")) ? " selected" : ""}${_scopeId}>Invierno</option><option value="Primavera/Verano" data-v-bbb9ca77${ssrIncludeBooleanAttr(Array.isArray(localFilters.session) ? ssrLooseContain(localFilters.session, "Primavera/Verano") : ssrLooseEqual(localFilters.session, "Primavera/Verano")) ? " selected" : ""}${_scopeId}>Primavera/Verano</option><option value="Verano/Oto\xF1o" data-v-bbb9ca77${ssrIncludeBooleanAttr(Array.isArray(localFilters.session) ? ssrLooseContain(localFilters.session, "Verano/Oto\xF1o") : ssrLooseEqual(localFilters.session, "Verano/Oto\xF1o")) ? " selected" : ""}${_scopeId}>Verano/Oto\xF1o</option><option value="Oto\xF1o/Invierno" data-v-bbb9ca77${ssrIncludeBooleanAttr(Array.isArray(localFilters.session) ? ssrLooseContain(localFilters.session, "Oto\xF1o/Invierno") : ssrLooseEqual(localFilters.session, "Oto\xF1o/Invierno")) ? " selected" : ""}${_scopeId}>Oto\xF1o/Invierno</option><option value="Invierno/Primavera" data-v-bbb9ca77${ssrIncludeBooleanAttr(Array.isArray(localFilters.session) ? ssrLooseContain(localFilters.session, "Invierno/Primavera") : ssrLooseEqual(localFilters.session, "Invierno/Primavera")) ? " selected" : ""}${_scopeId}>Invierno/Primavera</option><option value="Todo el a\xF1o" data-v-bbb9ca77${ssrIncludeBooleanAttr(Array.isArray(localFilters.session) ? ssrLooseContain(localFilters.session, "Todo el a\xF1o") : ssrLooseEqual(localFilters.session, "Todo el a\xF1o")) ? " selected" : ""}${_scopeId}>Todo el a\xF1o</option></select></div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-4" data-v-bbb9ca77${_scopeId}><div data-v-bbb9ca77${_scopeId}><label for="min-soil-humidity-filter" class="block text-sm font-medium text-blue-300 mb-2" data-v-bbb9ca77${_scopeId}> \u{1F331} Humedad Suelo M\xEDn. (%) </label><input id="min-soil-humidity-filter"${ssrRenderAttr("value", localFilters.minSoilHumidity)} type="number" min="0" max="100" class="w-full px-4 py-3 bg-gray-700 border border-blue-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors" placeholder="Ej: 40" data-v-bbb9ca77${_scopeId}></div><div data-v-bbb9ca77${_scopeId}><label for="max-soil-humidity-filter" class="block text-sm font-medium text-blue-300 mb-2" data-v-bbb9ca77${_scopeId}> \u{1F331} Humedad Suelo M\xE1x. (%) </label><input id="max-soil-humidity-filter"${ssrRenderAttr("value", localFilters.maxSoilHumidity)} type="number" min="0" max="100" class="w-full px-4 py-3 bg-gray-700 border border-blue-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors" placeholder="Ej: 80" data-v-bbb9ca77${_scopeId}></div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-4" data-v-bbb9ca77${_scopeId}><div data-v-bbb9ca77${_scopeId}><label for="min-air-humidity-filter" class="block text-sm font-medium text-cyan-300 mb-2" data-v-bbb9ca77${_scopeId}> \u{1F4A8} Humedad Aire M\xEDn. (%) </label><input id="min-air-humidity-filter"${ssrRenderAttr("value", localFilters.minAirHumidity)} type="number" min="0" max="100" class="w-full px-4 py-3 bg-gray-700 border border-cyan-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-colors" placeholder="Ej: 50" data-v-bbb9ca77${_scopeId}></div><div data-v-bbb9ca77${_scopeId}><label for="max-air-humidity-filter" class="block text-sm font-medium text-cyan-300 mb-2" data-v-bbb9ca77${_scopeId}> \u{1F4A8} Humedad Aire M\xE1x. (%) </label><input id="max-air-humidity-filter"${ssrRenderAttr("value", localFilters.maxAirHumidity)} type="number" min="0" max="100" class="w-full px-4 py-3 bg-gray-700 border border-cyan-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-colors" placeholder="Ej: 85" data-v-bbb9ca77${_scopeId}></div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-4" data-v-bbb9ca77${_scopeId}><div data-v-bbb9ca77${_scopeId}><label for="max-temp-filter" class="block text-sm font-medium text-red-300 mb-2" data-v-bbb9ca77${_scopeId}> \u{1F321}\uFE0F Temp. M\xE1x. (\xB0C) </label><input id="max-temp-filter"${ssrRenderAttr("value", localFilters.maxTemperature)} type="number" min="0" max="50" class="w-full px-4 py-3 bg-gray-700 border border-red-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors" placeholder="Ej: 30" data-v-bbb9ca77${_scopeId}></div><div data-v-bbb9ca77${_scopeId}></div></div><div class="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0 pt-4 border-t border-gray-600" data-v-bbb9ca77${_scopeId}><div class="flex items-center space-x-4" data-v-bbb9ca77${_scopeId}><span class="text-sm text-gray-300" data-v-bbb9ca77${_scopeId}>${ssrInterpolate(__props.resultsCount)} cultivo${ssrInterpolate(__props.resultsCount !== 1 ? "s" : "")} encontrado${ssrInterpolate(__props.resultsCount !== 1 ? "s" : "")}</span>`);
            if (hasActiveFilters.value) {
              _push2(`<div class="flex items-center space-x-2" data-v-bbb9ca77${_scopeId}>`);
              ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(unref(getIcon)("filter")), null, null), _parent2, _scopeId);
              _push2(`<span class="text-xs text-green-500 font-medium" data-v-bbb9ca77${_scopeId}>Filtros activos</span></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><button${ssrIncludeBooleanAttr(!hasActiveFilters.value) ? " disabled" : ""} class="${ssrRenderClass([{ "opacity-50 cursor-not-allowed": !hasActiveFilters.value }, "px-4 py-2 text-sm font-medium text-gray-400 hover:text-white border border-gray-600 hover:border-gray-500 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"])}" data-v-bbb9ca77${_scopeId}><div class="flex items-center space-x-2" data-v-bbb9ca77${_scopeId}>`);
            ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(unref(getIcon)("clearFilters")), null, null), _parent2, _scopeId);
            _push2(`<span data-v-bbb9ca77${_scopeId}>Limpiar filtros</span></div></button></div></div>`);
          } else {
            return [
              createVNode("div", { class: "space-y-4" }, [
                createVNode("div", null, [
                  createVNode("label", {
                    for: "name-filter",
                    class: "block text-sm font-medium text-white mb-2"
                  }, " Buscar por nombre "),
                  createVNode("div", { class: "relative" }, [
                    createVNode("div", { class: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none" }, [
                      (openBlock(), createBlock(resolveDynamicComponent(unref(getIcon)("search")), { class: "h-5 w-5 text-gray-400" }))
                    ]),
                    withDirectives(createVNode("input", {
                      id: "name-filter",
                      "onUpdate:modelValue": ($event) => localFilters.name = $event,
                      type: "text",
                      class: "w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors",
                      placeholder: "Ej: Tomate, Lechuga...",
                      onInput: unref(debouncedUpdate)
                    }, null, 40, ["onUpdate:modelValue", "onInput"]), [
                      [vModelText, localFilters.name]
                    ])
                  ])
                ]),
                createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                  createVNode("div", null, [
                    createVNode("label", {
                      for: "category-filter",
                      class: "block text-sm font-medium text-white mb-2"
                    }, " Categor\xEDa "),
                    withDirectives(createVNode("select", {
                      id: "category-filter",
                      "onUpdate:modelValue": ($event) => localFilters.category = $event,
                      class: "w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors",
                      onChange: updateFilters
                    }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(categories.value, (category) => {
                        return openBlock(), createBlock("option", {
                          key: category,
                          value: category
                        }, toDisplayString(category), 9, ["value"]);
                      }), 128))
                    ], 40, ["onUpdate:modelValue"]), [
                      [vModelSelect, localFilters.category]
                    ])
                  ]),
                  createVNode("div", null, [
                    createVNode("label", {
                      for: "session-filter",
                      class: "block text-sm font-medium text-white mb-2"
                    }, " Temporada "),
                    withDirectives(createVNode("select", {
                      id: "session-filter",
                      "onUpdate:modelValue": ($event) => localFilters.session = $event,
                      class: "w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors",
                      onChange: updateFilters
                    }, [
                      createVNode("option", { value: "" }, "Todas"),
                      createVNode("option", { value: "Primavera" }, "Primavera"),
                      createVNode("option", { value: "Verano" }, "Verano"),
                      createVNode("option", { value: "Oto\xF1o" }, "Oto\xF1o"),
                      createVNode("option", { value: "Invierno" }, "Invierno"),
                      createVNode("option", { value: "Primavera/Verano" }, "Primavera/Verano"),
                      createVNode("option", { value: "Verano/Oto\xF1o" }, "Verano/Oto\xF1o"),
                      createVNode("option", { value: "Oto\xF1o/Invierno" }, "Oto\xF1o/Invierno"),
                      createVNode("option", { value: "Invierno/Primavera" }, "Invierno/Primavera"),
                      createVNode("option", { value: "Todo el a\xF1o" }, "Todo el a\xF1o")
                    ], 40, ["onUpdate:modelValue"]), [
                      [vModelSelect, localFilters.session]
                    ])
                  ])
                ]),
                createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                  createVNode("div", null, [
                    createVNode("label", {
                      for: "min-soil-humidity-filter",
                      class: "block text-sm font-medium text-blue-300 mb-2"
                    }, " \u{1F331} Humedad Suelo M\xEDn. (%) "),
                    withDirectives(createVNode("input", {
                      id: "min-soil-humidity-filter",
                      "onUpdate:modelValue": ($event) => localFilters.minSoilHumidity = $event,
                      type: "number",
                      min: "0",
                      max: "100",
                      class: "w-full px-4 py-3 bg-gray-700 border border-blue-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors",
                      placeholder: "Ej: 40",
                      onInput: unref(debouncedUpdate)
                    }, null, 40, ["onUpdate:modelValue", "onInput"]), [
                      [vModelText, localFilters.minSoilHumidity]
                    ])
                  ]),
                  createVNode("div", null, [
                    createVNode("label", {
                      for: "max-soil-humidity-filter",
                      class: "block text-sm font-medium text-blue-300 mb-2"
                    }, " \u{1F331} Humedad Suelo M\xE1x. (%) "),
                    withDirectives(createVNode("input", {
                      id: "max-soil-humidity-filter",
                      "onUpdate:modelValue": ($event) => localFilters.maxSoilHumidity = $event,
                      type: "number",
                      min: "0",
                      max: "100",
                      class: "w-full px-4 py-3 bg-gray-700 border border-blue-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors",
                      placeholder: "Ej: 80",
                      onInput: unref(debouncedUpdate)
                    }, null, 40, ["onUpdate:modelValue", "onInput"]), [
                      [vModelText, localFilters.maxSoilHumidity]
                    ])
                  ])
                ]),
                createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                  createVNode("div", null, [
                    createVNode("label", {
                      for: "min-air-humidity-filter",
                      class: "block text-sm font-medium text-cyan-300 mb-2"
                    }, " \u{1F4A8} Humedad Aire M\xEDn. (%) "),
                    withDirectives(createVNode("input", {
                      id: "min-air-humidity-filter",
                      "onUpdate:modelValue": ($event) => localFilters.minAirHumidity = $event,
                      type: "number",
                      min: "0",
                      max: "100",
                      class: "w-full px-4 py-3 bg-gray-700 border border-cyan-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-colors",
                      placeholder: "Ej: 50",
                      onInput: unref(debouncedUpdate)
                    }, null, 40, ["onUpdate:modelValue", "onInput"]), [
                      [vModelText, localFilters.minAirHumidity]
                    ])
                  ]),
                  createVNode("div", null, [
                    createVNode("label", {
                      for: "max-air-humidity-filter",
                      class: "block text-sm font-medium text-cyan-300 mb-2"
                    }, " \u{1F4A8} Humedad Aire M\xE1x. (%) "),
                    withDirectives(createVNode("input", {
                      id: "max-air-humidity-filter",
                      "onUpdate:modelValue": ($event) => localFilters.maxAirHumidity = $event,
                      type: "number",
                      min: "0",
                      max: "100",
                      class: "w-full px-4 py-3 bg-gray-700 border border-cyan-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-colors",
                      placeholder: "Ej: 85",
                      onInput: unref(debouncedUpdate)
                    }, null, 40, ["onUpdate:modelValue", "onInput"]), [
                      [vModelText, localFilters.maxAirHumidity]
                    ])
                  ])
                ]),
                createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                  createVNode("div", null, [
                    createVNode("label", {
                      for: "max-temp-filter",
                      class: "block text-sm font-medium text-red-300 mb-2"
                    }, " \u{1F321}\uFE0F Temp. M\xE1x. (\xB0C) "),
                    withDirectives(createVNode("input", {
                      id: "max-temp-filter",
                      "onUpdate:modelValue": ($event) => localFilters.maxTemperature = $event,
                      type: "number",
                      min: "0",
                      max: "50",
                      class: "w-full px-4 py-3 bg-gray-700 border border-red-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors",
                      placeholder: "Ej: 30",
                      onInput: unref(debouncedUpdate)
                    }, null, 40, ["onUpdate:modelValue", "onInput"]), [
                      [vModelText, localFilters.maxTemperature]
                    ])
                  ]),
                  createVNode("div")
                ]),
                createVNode("div", { class: "flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0 pt-4 border-t border-gray-600" }, [
                  createVNode("div", { class: "flex items-center space-x-4" }, [
                    createVNode("span", { class: "text-sm text-gray-300" }, toDisplayString(__props.resultsCount) + " cultivo" + toDisplayString(__props.resultsCount !== 1 ? "s" : "") + " encontrado" + toDisplayString(__props.resultsCount !== 1 ? "s" : ""), 1),
                    hasActiveFilters.value ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "flex items-center space-x-2"
                    }, [
                      (openBlock(), createBlock(resolveDynamicComponent(unref(getIcon)("filter")))),
                      createVNode("span", { class: "text-xs text-green-500 font-medium" }, "Filtros activos")
                    ])) : createCommentVNode("", true)
                  ]),
                  createVNode("button", {
                    onClick: clearFilters,
                    class: ["px-4 py-2 text-sm font-medium text-gray-400 hover:text-white border border-gray-600 hover:border-gray-500 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500", { "opacity-50 cursor-not-allowed": !hasActiveFilters.value }],
                    disabled: !hasActiveFilters.value
                  }, [
                    createVNode("div", { class: "flex items-center space-x-2" }, [
                      (openBlock(), createBlock(resolveDynamicComponent(unref(getIcon)("clearFilters")))),
                      createVNode("span", null, "Limpiar filtros")
                    ])
                  ], 10, ["disabled"])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Crops/CropsFilter.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const CropsFilter = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-bbb9ca77"]]);
const _sfc_main$5 = {
  __name: "CropSwitch",
  __ssrInlineRender: true,
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ""
    }
  },
  emits: ["update:modelValue", "change"],
  setup(__props, { emit: __emit }) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative inline-flex items-center" }, _attrs))} data-v-77809bd2><button type="button" class="${ssrRenderClass([
        "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-800",
        __props.modelValue ? "bg-green-600 hover:bg-green-700" : "bg-gray-600 hover:bg-gray-500",
        __props.disabled ? "opacity-50 cursor-not-allowed" : ""
      ])}"${ssrIncludeBooleanAttr(__props.disabled) ? " disabled" : ""}${ssrRenderAttr("aria-checked", __props.modelValue)}${ssrRenderAttr("aria-label", __props.label)} role="switch" data-v-77809bd2><span class="${ssrRenderClass([
        "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out",
        __props.modelValue ? "translate-x-5" : "translate-x-0"
      ])}" data-v-77809bd2><span class="${ssrRenderClass([
        "absolute inset-0 flex h-full w-full items-center justify-center transition-opacity duration-200 ease-in-out",
        __props.modelValue ? "opacity-0" : "opacity-100"
      ])}" data-v-77809bd2>`);
      ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(getIcon)("close")), null, null), _parent);
      _push(`</span><span class="${ssrRenderClass([
        "absolute inset-0 flex h-full w-full items-center justify-center transition-opacity duration-200 ease-in-out",
        __props.modelValue ? "opacity-100" : "opacity-0"
      ])}" data-v-77809bd2>`);
      ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(getIcon)("check")), null, null), _parent);
      _push(`</span></span></button></div>`);
    };
  }
};
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Crops/CropSwitch.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const CropSwitch = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-77809bd2"]]);
const _sfc_main$4 = {
  __name: "ConfirmDeleteModal",
  __ssrInlineRender: true,
  props: {
    isVisible: {
      type: Boolean,
      default: false
    },
    cropName: {
      type: String,
      default: ""
    }
  },
  emits: ["confirm", "cancel"],
  setup(__props, { emit: __emit }) {
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.isVisible) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed inset-0 z-50 overflow-y-auto" }, _attrs))} data-v-dafd716f><div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity" data-v-dafd716f></div><div class="flex min-h-full items-center justify-center p-4" data-v-dafd716f><div class="relative transform overflow-hidden rounded-lg bg-gray-800 border border-gray-600 shadow-xl transition-all w-full max-w-md" data-v-dafd716f><div class="bg-red-900/20 border-b border-red-500/30 px-6 py-4" data-v-dafd716f><div class="flex items-center" data-v-dafd716f><div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100" data-v-dafd716f>`);
        ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(getIcon)("danger")), null, null), _parent);
        _push(`</div></div></div><div class="px-6 py-4" data-v-dafd716f><h3 class="text-lg font-medium text-white text-center mb-2" data-v-dafd716f> Confirmar Eliminaci\xF3n </h3><p class="text-sm text-gray-300 text-center mb-4" data-v-dafd716f> \xBFEst\xE1s seguro de que quieres eliminar el cultivo <span class="font-semibold text-white" data-v-dafd716f>&quot;${ssrInterpolate(__props.cropName)}&quot;</span>? </p><div class="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-3 mb-4" data-v-dafd716f><div class="flex items-start" data-v-dafd716f>`);
        ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(getIcon)("warning")), null, null), _parent);
        _push(`<p class="text-xs text-yellow-300" data-v-dafd716f> Esta acci\xF3n no se puede deshacer. Se eliminar\xE1 permanentemente el cultivo y toda su configuraci\xF3n. </p></div></div></div><div class="bg-gray-700/30 px-6 py-4 flex flex-col sm:flex-row-reverse gap-3" data-v-dafd716f><button class="w-full sm:w-auto inline-flex justify-center items-center px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-800 rounded-lg transition-colors" data-v-dafd716f>`);
        ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(getIcon)("delete")), { class: "w-4 h-4 mr-2" }, null), _parent);
        _push(` S\xED, eliminar </button><button class="w-full sm:w-auto inline-flex justify-center items-center px-4 py-2 text-sm font-medium text-gray-300 hover:text-white bg-gray-600 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-800 rounded-lg transition-colors" data-v-dafd716f>`);
        ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(getIcon)("cancel")), null, null), _parent);
        _push(` Cancelar </button></div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Crops/ConfirmDeleteModal.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const ConfirmDeleteModal = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-dafd716f"]]);
const _sfc_main$3 = {
  __name: "CropsTable",
  __ssrInlineRender: true,
  props: {
    crops: {
      type: Array,
      default: () => []
    }
  },
  emits: ["toggle-selection", "delete-crop"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const router = useRouter();
    const toast = useToastNotifications();
    const showDeleteModal = ref(false);
    const cropToDelete = ref(null);
    const selectedCrop = computed(() => {
      return props.crops.find((crop) => crop.selected);
    });
    computed(() => {
      return !!selectedCrop.value;
    });
    const handleToggleSelection = (cropId, value) => {
      emit("toggle-selection", { cropId, isSelected: value });
    };
    const handleView = (crop) => {
      router.push(`/cultivos/ver/${crop.id}`);
    };
    const handleEdit = (crop) => {
      router.push(`/cultivos/editar/${crop.id}`);
    };
    const handleDelete = (crop) => {
      if (crop.selected) {
        toast.warning("No puedes eliminar un cultivo que est\xE1 seleccionado");
        return;
      }
      cropToDelete.value = crop;
      showDeleteModal.value = true;
    };
    const confirmDelete = () => {
      if (cropToDelete.value) {
        const cropName = cropToDelete.value.name;
        showDeleteModal.value = false;
        emit("delete-crop", cropToDelete.value.id);
        toast.cropDeleted(cropName);
        cropToDelete.value = null;
      }
    };
    const cancelDelete = () => {
      showDeleteModal.value = false;
      cropToDelete.value = null;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(ssrRenderComponent(BaseCard, mergeProps({ title: "Cultivos Disponibles" }, _attrs), {
        "header-actions": withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center space-x-4" data-v-f76062f5${_scopeId}><div class="flex items-center space-x-2" data-v-f76062f5${_scopeId}><span class="text-sm text-gray-300 font-bold" data-v-f76062f5${_scopeId}>Total: ${ssrInterpolate(__props.crops.length)}</span>`);
            if (selectedCrop.value) {
              _push2(`<span class="text-xs text-green-500 bg-green-900/30 px-2 py-1 rounded-full" data-v-f76062f5${_scopeId}>${ssrInterpolate(selectedCrop.value.name)} seleccionado </span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="flex items-center space-x-1 text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded" data-v-f76062f5${_scopeId}>`);
            ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(unref(getIcon)("info")), null, null), _parent2, _scopeId);
            _push2(`<span data-v-f76062f5${_scopeId}>Selecci\xF3n autom\xE1tica: al seleccionar un cultivo se deseleccionan los dem\xE1s</span></div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center space-x-4" }, [
                createVNode("div", { class: "flex items-center space-x-2" }, [
                  createVNode("span", { class: "text-sm text-gray-300 font-bold" }, "Total: " + toDisplayString(__props.crops.length), 1),
                  selectedCrop.value ? (openBlock(), createBlock("span", {
                    key: 0,
                    class: "text-xs text-green-500 bg-green-900/30 px-2 py-1 rounded-full"
                  }, toDisplayString(selectedCrop.value.name) + " seleccionado ", 1)) : createCommentVNode("", true)
                ]),
                createVNode("div", { class: "flex items-center space-x-1 text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded" }, [
                  (openBlock(), createBlock(resolveDynamicComponent(unref(getIcon)("info")))),
                  createVNode("span", null, "Selecci\xF3n autom\xE1tica: al seleccionar un cultivo se deseleccionan los dem\xE1s")
                ])
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b;
          if (_push2) {
            _push2(`<div class="overflow-x-auto" data-v-f76062f5${_scopeId}>`);
            if (__props.crops.length === 0) {
              _push2(`<div class="text-center py-12" data-v-f76062f5${_scopeId}>`);
              ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(unref(getIcon)("plantConfig")), { class: "mx-auto mb-4 opacity-50" }, null), _parent2, _scopeId);
              _push2(`<h3 class="text-lg font-medium text-white mb-2" data-v-f76062f5${_scopeId}>No tienes cultivos registrados</h3><p class="text-gray-400" data-v-f76062f5${_scopeId}>Crea tu primer cultivo para comenzar a usar el sistema de riego</p>`);
              _push2(ssrRenderComponent(_component_NuxtLink, {
                to: "/cultivos/agregar",
                class: "inline-flex items-center px-4 py-2 mt-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-200"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-f76062f5${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" data-v-f76062f5${_scopeId2}></path></svg> Crear Primer Cultivo `);
                  } else {
                    return [
                      (openBlock(), createBlock("svg", {
                        class: "w-4 h-4 mr-2",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24"
                      }, [
                        createVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          "stroke-width": "2",
                          d: "M12 6v6m0 0v6m0-6h6m-6 0H6"
                        })
                      ])),
                      createTextVNode(" Crear Primer Cultivo ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<table class="w-full text-sm text-left" data-v-f76062f5${_scopeId}><thead class="text-xs text-gray-300 uppercase bg-gray-800/50 border-b border-gray-600" data-v-f76062f5${_scopeId}><tr data-v-f76062f5${_scopeId}><th scope="col" class="px-6 py-4 font-medium" data-v-f76062f5${_scopeId}>Cultivo</th><th scope="col" class="px-6 py-4 font-medium" data-v-f76062f5${_scopeId}>Categor\xEDa</th><th scope="col" class="px-6 py-4 font-medium text-center" data-v-f76062f5${_scopeId}>Temporada</th><th scope="col" class="px-6 py-4 font-medium text-center" data-v-f76062f5${_scopeId}>Hum. Suelo (%)</th><th scope="col" class="px-6 py-4 font-medium text-center" data-v-f76062f5${_scopeId}>Hum. Aire (%)</th><th scope="col" class="px-6 py-4 font-medium text-center" data-v-f76062f5${_scopeId}>Temp. M\xE1x. (\xB0C)</th><th scope="col" class="px-6 py-4 font-medium text-center" data-v-f76062f5${_scopeId}>Crecimiento (d\xEDas)</th><th scope="col" class="px-6 py-4 font-medium text-center" data-v-f76062f5${_scopeId}>Estado Bomba</th><th scope="col" class="px-6 py-4 font-medium text-center" data-v-f76062f5${_scopeId}>Seleccionado</th><th scope="col" class="px-6 py-4 font-medium text-center" data-v-f76062f5${_scopeId}>Acciones</th></tr></thead><tbody class="divide-y divide-gray-600" data-v-f76062f5${_scopeId}><!--[-->`);
              ssrRenderList(__props.crops, (crop) => {
                _push2(`<tr class="${ssrRenderClass([{ "bg-green-900/20 border-green-500/30": crop.selected }, "hover:bg-gray-800/30 transition-colors duration-150"])}" data-v-f76062f5${_scopeId}><td class="px-6 py-4" data-v-f76062f5${_scopeId}><div class="flex items-center" data-v-f76062f5${_scopeId}><div class="flex-shrink-0 w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-4" data-v-f76062f5${_scopeId}>`);
                ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(unref(getIcon)("plant")), { class: "w-6 h-6 text-green-600" }, null), _parent2, _scopeId);
                _push2(`</div><div data-v-f76062f5${_scopeId}><div class="font-medium text-white" data-v-f76062f5${_scopeId}>${ssrInterpolate(crop.name)}</div><div class="text-sm text-gray-400" data-v-f76062f5${_scopeId}>${ssrInterpolate(crop.description)}</div></div></div></td><td class="px-6 py-4 text-gray-300" data-v-f76062f5${_scopeId}><span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-700 text-gray-300" data-v-f76062f5${_scopeId}>${ssrInterpolate(crop.category)}</span></td><td class="px-6 py-4 text-center" data-v-f76062f5${_scopeId}><div class="text-gray-300" data-v-f76062f5${_scopeId}><div class="text-sm font-medium" data-v-f76062f5${_scopeId}>${ssrInterpolate(crop.session || "N/A")}</div><div class="text-xs text-gray-500" data-v-f76062f5${_scopeId}>Temporada</div></div></td><td class="px-6 py-4 text-center" data-v-f76062f5${_scopeId}><div class="text-gray-300" data-v-f76062f5${_scopeId}><div class="text-sm font-medium" data-v-f76062f5${_scopeId}>${ssrInterpolate(crop.soil_humidity_min)}% - ${ssrInterpolate(crop.soil_humidity_max)}%</div><div class="text-xs text-gray-500" data-v-f76062f5${_scopeId}>Suelo</div></div></td><td class="px-6 py-4 text-center" data-v-f76062f5${_scopeId}><div class="text-gray-300" data-v-f76062f5${_scopeId}><div class="text-sm font-medium" data-v-f76062f5${_scopeId}>${ssrInterpolate(crop.air_humidity_min)}% - ${ssrInterpolate(crop.air_humidity_max)}%</div><div class="text-xs text-gray-500" data-v-f76062f5${_scopeId}>Aire</div></div></td><td class="px-6 py-4 text-center" data-v-f76062f5${_scopeId}><div class="text-gray-300" data-v-f76062f5${_scopeId}><div class="text-sm font-medium" data-v-f76062f5${_scopeId}>${ssrInterpolate(crop.temperature_max)}\xB0C</div><div class="text-xs text-gray-500" data-v-f76062f5${_scopeId}>M\xE1ximo</div></div></td><td class="px-6 py-4 text-center" data-v-f76062f5${_scopeId}><div class="text-gray-300" data-v-f76062f5${_scopeId}><div class="text-sm font-medium" data-v-f76062f5${_scopeId}>${ssrInterpolate(crop.growth_days || "N/A")}</div><div class="text-xs text-gray-500" data-v-f76062f5${_scopeId}>d\xEDas</div></div></td><td class="px-6 py-4 text-center" data-v-f76062f5${_scopeId}><div class="flex items-center justify-center" data-v-f76062f5${_scopeId}><div class="${ssrRenderClass([crop.waterPumpActive ? "bg-blue-900/30 text-blue-400 border border-blue-500/30" : "bg-gray-700 text-gray-400 border border-gray-600", "flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium"])}" data-v-f76062f5${_scopeId}><div class="${ssrRenderClass([crop.waterPumpActive ? "bg-blue-400 animate-pulse" : "bg-gray-500", "w-2 h-2 rounded-full"])}" data-v-f76062f5${_scopeId}></div><span data-v-f76062f5${_scopeId}>${ssrInterpolate(crop.waterPumpActive ? "Activa" : "Inactiva")}</span></div></div></td><td class="px-6 py-4 text-center" data-v-f76062f5${_scopeId}><div class="flex flex-col items-center space-y-2" data-v-f76062f5${_scopeId}>`);
                _push2(ssrRenderComponent(CropSwitch, {
                  "model-value": crop.selected,
                  label: `Seleccionar ${crop.name}`,
                  onChange: (value) => handleToggleSelection(crop.id, value)
                }, null, _parent2, _scopeId));
                _push2(`<span class="${ssrRenderClass([crop.selected ? "text-green-400" : "text-gray-500", "text-xs font-medium"])}" data-v-f76062f5${_scopeId}>${ssrInterpolate(crop.selected ? "Seleccionado" : "No seleccionado")}</span></div></td><td class="px-6 py-4" data-v-f76062f5${_scopeId}><div class="flex items-center justify-center space-x-4" data-v-f76062f5${_scopeId}><div class="flex flex-col items-center space-y-1" data-v-f76062f5${_scopeId}><button class="p-2 text-gray-400 hover:text-purple-400 hover:bg-purple-900/20 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500" title="Ver detalles del cultivo" data-v-f76062f5${_scopeId}>`);
                ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(unref(getIcon)("notes")), null, null), _parent2, _scopeId);
                _push2(`</button><span class="text-xs text-gray-400" data-v-f76062f5${_scopeId}>Ver</span></div><div class="flex flex-col items-center space-y-1" data-v-f76062f5${_scopeId}><button class="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-900/20 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500" title="Editar cultivo" data-v-f76062f5${_scopeId}>`);
                ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(unref(getIcon)("edit")), null, null), _parent2, _scopeId);
                _push2(`</button><span class="text-xs text-gray-400" data-v-f76062f5${_scopeId}>Editar</span></div><div class="flex flex-col items-center space-y-1" data-v-f76062f5${_scopeId}><button title="Eliminar cultivo"${ssrIncludeBooleanAttr(crop.isSelected) ? " disabled" : ""} class="${ssrRenderClass([{ "opacity-50 cursor-not-allowed": crop.isSelected }, "p-2 text-gray-400 hover:text-red-400 hover:bg-red-900/20 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500"])}" data-v-f76062f5${_scopeId}>`);
                ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(unref(getIcon)("delete")), null, null), _parent2, _scopeId);
                _push2(`</button><span class="${ssrRenderClass([{ "opacity-50": crop.isSelected }, "text-xs text-gray-400"])}" data-v-f76062f5${_scopeId}>Borrar</span></div></div></td></tr>`);
              });
              _push2(`<!--]--></tbody></table>`);
            }
            _push2(`</div>`);
            _push2(ssrRenderComponent(ConfirmDeleteModal, {
              "is-visible": showDeleteModal.value,
              "crop-name": ((_a = cropToDelete.value) == null ? void 0 : _a.name) || "",
              onConfirm: confirmDelete,
              onCancel: cancelDelete
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "overflow-x-auto" }, [
                __props.crops.length === 0 ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "text-center py-12"
                }, [
                  (openBlock(), createBlock(resolveDynamicComponent(unref(getIcon)("plantConfig")), { class: "mx-auto mb-4 opacity-50" })),
                  createVNode("h3", { class: "text-lg font-medium text-white mb-2" }, "No tienes cultivos registrados"),
                  createVNode("p", { class: "text-gray-400" }, "Crea tu primer cultivo para comenzar a usar el sistema de riego"),
                  createVNode(_component_NuxtLink, {
                    to: "/cultivos/agregar",
                    class: "inline-flex items-center px-4 py-2 mt-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-200"
                  }, {
                    default: withCtx(() => [
                      (openBlock(), createBlock("svg", {
                        class: "w-4 h-4 mr-2",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24"
                      }, [
                        createVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          "stroke-width": "2",
                          d: "M12 6v6m0 0v6m0-6h6m-6 0H6"
                        })
                      ])),
                      createTextVNode(" Crear Primer Cultivo ")
                    ]),
                    _: 1
                  })
                ])) : (openBlock(), createBlock("table", {
                  key: 1,
                  class: "w-full text-sm text-left"
                }, [
                  createVNode("thead", { class: "text-xs text-gray-300 uppercase bg-gray-800/50 border-b border-gray-600" }, [
                    createVNode("tr", null, [
                      createVNode("th", {
                        scope: "col",
                        class: "px-6 py-4 font-medium"
                      }, "Cultivo"),
                      createVNode("th", {
                        scope: "col",
                        class: "px-6 py-4 font-medium"
                      }, "Categor\xEDa"),
                      createVNode("th", {
                        scope: "col",
                        class: "px-6 py-4 font-medium text-center"
                      }, "Temporada"),
                      createVNode("th", {
                        scope: "col",
                        class: "px-6 py-4 font-medium text-center"
                      }, "Hum. Suelo (%)"),
                      createVNode("th", {
                        scope: "col",
                        class: "px-6 py-4 font-medium text-center"
                      }, "Hum. Aire (%)"),
                      createVNode("th", {
                        scope: "col",
                        class: "px-6 py-4 font-medium text-center"
                      }, "Temp. M\xE1x. (\xB0C)"),
                      createVNode("th", {
                        scope: "col",
                        class: "px-6 py-4 font-medium text-center"
                      }, "Crecimiento (d\xEDas)"),
                      createVNode("th", {
                        scope: "col",
                        class: "px-6 py-4 font-medium text-center"
                      }, "Estado Bomba"),
                      createVNode("th", {
                        scope: "col",
                        class: "px-6 py-4 font-medium text-center"
                      }, "Seleccionado"),
                      createVNode("th", {
                        scope: "col",
                        class: "px-6 py-4 font-medium text-center"
                      }, "Acciones")
                    ])
                  ]),
                  createVNode("tbody", { class: "divide-y divide-gray-600" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.crops, (crop) => {
                      return openBlock(), createBlock("tr", {
                        key: crop.id,
                        class: ["hover:bg-gray-800/30 transition-colors duration-150", { "bg-green-900/20 border-green-500/30": crop.selected }]
                      }, [
                        createVNode("td", { class: "px-6 py-4" }, [
                          createVNode("div", { class: "flex items-center" }, [
                            createVNode("div", { class: "flex-shrink-0 w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-4" }, [
                              (openBlock(), createBlock(resolveDynamicComponent(unref(getIcon)("plant")), { class: "w-6 h-6 text-green-600" }))
                            ]),
                            createVNode("div", null, [
                              createVNode("div", { class: "font-medium text-white" }, toDisplayString(crop.name), 1),
                              createVNode("div", { class: "text-sm text-gray-400" }, toDisplayString(crop.description), 1)
                            ])
                          ])
                        ]),
                        createVNode("td", { class: "px-6 py-4 text-gray-300" }, [
                          createVNode("span", { class: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-700 text-gray-300" }, toDisplayString(crop.category), 1)
                        ]),
                        createVNode("td", { class: "px-6 py-4 text-center" }, [
                          createVNode("div", { class: "text-gray-300" }, [
                            createVNode("div", { class: "text-sm font-medium" }, toDisplayString(crop.session || "N/A"), 1),
                            createVNode("div", { class: "text-xs text-gray-500" }, "Temporada")
                          ])
                        ]),
                        createVNode("td", { class: "px-6 py-4 text-center" }, [
                          createVNode("div", { class: "text-gray-300" }, [
                            createVNode("div", { class: "text-sm font-medium" }, toDisplayString(crop.soil_humidity_min) + "% - " + toDisplayString(crop.soil_humidity_max) + "%", 1),
                            createVNode("div", { class: "text-xs text-gray-500" }, "Suelo")
                          ])
                        ]),
                        createVNode("td", { class: "px-6 py-4 text-center" }, [
                          createVNode("div", { class: "text-gray-300" }, [
                            createVNode("div", { class: "text-sm font-medium" }, toDisplayString(crop.air_humidity_min) + "% - " + toDisplayString(crop.air_humidity_max) + "%", 1),
                            createVNode("div", { class: "text-xs text-gray-500" }, "Aire")
                          ])
                        ]),
                        createVNode("td", { class: "px-6 py-4 text-center" }, [
                          createVNode("div", { class: "text-gray-300" }, [
                            createVNode("div", { class: "text-sm font-medium" }, toDisplayString(crop.temperature_max) + "\xB0C", 1),
                            createVNode("div", { class: "text-xs text-gray-500" }, "M\xE1ximo")
                          ])
                        ]),
                        createVNode("td", { class: "px-6 py-4 text-center" }, [
                          createVNode("div", { class: "text-gray-300" }, [
                            createVNode("div", { class: "text-sm font-medium" }, toDisplayString(crop.growth_days || "N/A"), 1),
                            createVNode("div", { class: "text-xs text-gray-500" }, "d\xEDas")
                          ])
                        ]),
                        createVNode("td", { class: "px-6 py-4 text-center" }, [
                          createVNode("div", { class: "flex items-center justify-center" }, [
                            createVNode("div", {
                              class: ["flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium", crop.waterPumpActive ? "bg-blue-900/30 text-blue-400 border border-blue-500/30" : "bg-gray-700 text-gray-400 border border-gray-600"]
                            }, [
                              createVNode("div", {
                                class: ["w-2 h-2 rounded-full", crop.waterPumpActive ? "bg-blue-400 animate-pulse" : "bg-gray-500"]
                              }, null, 2),
                              createVNode("span", null, toDisplayString(crop.waterPumpActive ? "Activa" : "Inactiva"), 1)
                            ], 2)
                          ])
                        ]),
                        createVNode("td", { class: "px-6 py-4 text-center" }, [
                          createVNode("div", { class: "flex flex-col items-center space-y-2" }, [
                            createVNode(CropSwitch, {
                              "model-value": crop.selected,
                              label: `Seleccionar ${crop.name}`,
                              onChange: (value) => handleToggleSelection(crop.id, value)
                            }, null, 8, ["model-value", "label", "onChange"]),
                            createVNode("span", {
                              class: ["text-xs font-medium", crop.selected ? "text-green-400" : "text-gray-500"]
                            }, toDisplayString(crop.selected ? "Seleccionado" : "No seleccionado"), 3)
                          ])
                        ]),
                        createVNode("td", { class: "px-6 py-4" }, [
                          createVNode("div", { class: "flex items-center justify-center space-x-4" }, [
                            createVNode("div", { class: "flex flex-col items-center space-y-1" }, [
                              createVNode("button", {
                                onClick: ($event) => handleView(crop),
                                class: "p-2 text-gray-400 hover:text-purple-400 hover:bg-purple-900/20 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500",
                                title: "Ver detalles del cultivo"
                              }, [
                                (openBlock(), createBlock(resolveDynamicComponent(unref(getIcon)("notes"))))
                              ], 8, ["onClick"]),
                              createVNode("span", { class: "text-xs text-gray-400" }, "Ver")
                            ]),
                            createVNode("div", { class: "flex flex-col items-center space-y-1" }, [
                              createVNode("button", {
                                onClick: ($event) => handleEdit(crop),
                                class: "p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-900/20 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500",
                                title: "Editar cultivo"
                              }, [
                                (openBlock(), createBlock(resolveDynamicComponent(unref(getIcon)("edit"))))
                              ], 8, ["onClick"]),
                              createVNode("span", { class: "text-xs text-gray-400" }, "Editar")
                            ]),
                            createVNode("div", { class: "flex flex-col items-center space-y-1" }, [
                              createVNode("button", {
                                onClick: ($event) => handleDelete(crop),
                                class: ["p-2 text-gray-400 hover:text-red-400 hover:bg-red-900/20 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500", { "opacity-50 cursor-not-allowed": crop.isSelected }],
                                title: "Eliminar cultivo",
                                disabled: crop.isSelected
                              }, [
                                (openBlock(), createBlock(resolveDynamicComponent(unref(getIcon)("delete"))))
                              ], 10, ["onClick", "disabled"]),
                              createVNode("span", {
                                class: ["text-xs text-gray-400", { "opacity-50": crop.isSelected }]
                              }, "Borrar", 2)
                            ])
                          ])
                        ])
                      ], 2);
                    }), 128))
                  ])
                ]))
              ]),
              createVNode(ConfirmDeleteModal, {
                "is-visible": showDeleteModal.value,
                "crop-name": ((_b = cropToDelete.value) == null ? void 0 : _b.name) || "",
                onConfirm: confirmDelete,
                onCancel: cancelDelete
              }, null, 8, ["is-visible", "crop-name"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Crops/CropsTable.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const CropsTable = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-f76062f5"]]);
const _sfc_main$2 = {
  __name: "CropPageHeader",
  __ssrInlineRender: true,
  props: {
    title: {
      type: String,
      default: "Cultivos"
    },
    description: {
      type: String,
      default: "Gestiona y configura tus cultivos para el sistema de riego automatizado"
    },
    showAddButton: {
      type: Boolean,
      default: true
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mb-8" }, _attrs))}><div class="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0"><div><h1 class="text-3xl font-bold text-white">${ssrInterpolate(__props.title)}</h1><p class="text-gray-400 mt-2">${ssrInterpolate(__props.description)}</p></div>`);
      ssrRenderSlot(_ctx.$slots, "actions", {}, () => {
        if (__props.showAddButton) {
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: "/cultivos/agregar",
            class: "group inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200 transform hover:scale-105"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<svg class="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"${_scopeId}></path></svg> A\xF1adir Cultivo `);
              } else {
                return [
                  (openBlock(), createBlock("svg", {
                    class: "w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-200",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24"
                  }, [
                    createVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M12 6v6m0 0v6m0-6h6m-6 0H6"
                    })
                  ])),
                  createTextVNode(" A\xF1adir Cultivo ")
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
      }, _push, _parent);
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Crops/Layout/CropPageHeader.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex justify-center items-center py-12" }, _attrs))}><div class="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div></div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Crops/Layout/CropLoadingState.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const CropLoadingState = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { toast } = useToastNotifications();
    const cropStore = useCropStore();
    const userStore = useUserStore();
    const handleFiltersChanged = (filters) => {
      cropStore.setSearchFilter(filters.name || "");
      cropStore.setCategoryFilter(filters.category === "Todas" ? "" : filters.category || "");
      cropStore.setSessionFilter(filters.session || "");
      console.log("Filtros aplicados:", {
        name: filters.name,
        category: filters.category,
        session: filters.session,
        soilHumidity: { min: filters.minSoilHumidity, max: filters.maxSoilHumidity },
        airHumidity: { min: filters.minAirHumidity, max: filters.maxAirHumidity },
        temperature: { max: filters.maxTemperature }
      });
    };
    const handleToggleSelection = async ({ cropId, isSelected }) => {
      var _a, _b;
      try {
        if (isSelected) {
          const result = await cropStore.selectCrop(cropId);
          toast.success(`Cultivo "${result.data.name}" seleccionado exitosamente`);
        } else {
          const result = await cropStore.deselectCrop(cropId);
          toast.success(`Cultivo "${result.data.name}" deseleccionado exitosamente`);
        }
      } catch (error) {
        console.error("Error al cambiar selecci\xF3n de cultivo:", error);
        toast.error(((_b = (_a = error.response) == null ? void 0 : _a.data) == null ? void 0 : _b.message) || "Error al cambiar selecci\xF3n del cultivo");
      }
    };
    const handleDeleteCrop = async (cropId) => {
      var _a, _b;
      try {
        const cropToDelete = cropStore.crops.find((c) => c.id === cropId);
        if (cropToDelete == null ? void 0 : cropToDelete.selected) {
          toast.warning("No puedes eliminar un cultivo que est\xE1 seleccionado");
          return;
        }
        await cropStore.deleteCrop(cropId);
        toast.success(`Cultivo "${cropToDelete == null ? void 0 : cropToDelete.name}" eliminado exitosamente`);
      } catch (error) {
        console.error("Error al eliminar cultivo:", error);
        toast.error(((_b = (_a = error.response) == null ? void 0 : _a.data) == null ? void 0 : _b.message) || "Error al eliminar el cultivo");
      }
    };
    watch(() => {
      var _a;
      return (_a = userStore.user) == null ? void 0 : _a.id;
    }, async (userId) => {
      if (userId && cropStore.isInitialized) {
        try {
          const result = await cropStore.fetchAllUserCrops(userId);
          if (result.success && result.data.length === 0) {
            console.log("Usuario sin cultivos registrados");
          }
        } catch (error) {
          console.error("Error cargando cultivos del usuario:", error);
        }
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$2, null, null, _parent));
      if (unref(cropStore).isLoading) {
        _push(ssrRenderComponent(CropLoadingState, null, null, _parent));
      } else {
        _push(`<!--[-->`);
        _push(ssrRenderComponent(CropsFilter, {
          "results-count": unref(cropStore).filteredCrops.length,
          categories: unref(cropStore).categories,
          onFiltersChanged: handleFiltersChanged
        }, null, _parent));
        _push(ssrRenderComponent(CropsTable, {
          crops: unref(cropStore).filteredCrops,
          onToggleSelection: handleToggleSelection,
          onDeleteCrop: handleDeleteCrop
        }, null, _parent));
        _push(`<!--]-->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/cultivos/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-C8aDwc2E.mjs.map
