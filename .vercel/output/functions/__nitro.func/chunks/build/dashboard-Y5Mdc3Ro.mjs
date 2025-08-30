import { ref, computed, watch, mergeProps, unref, createVNode, resolveDynamicComponent, withCtx, toDisplayString, nextTick, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrRenderVNode, ssrInterpolate } from 'vue/server-renderer';
import { u as useSensorData } from './useSensorData-DJj3AL8_.mjs';
import { u as useCropStore } from './crop-CoogIRpZ.mjs';
import { u as useDeviceStore } from './device-CfApmtSk.mjs';
import { u as useUserStore, d as demoData } from './user-BEdD-0tD.mjs';
import { u as useIrrigationStore } from './irrigation-EKMz8LaT.mjs';
import { t as thermometerIcon, h as humidityIcon, g as getIcon } from './index-0YkbgJTu.mjs';
import { _ as _export_sfc, n as navigateTo } from './server.mjs';
import __nuxt_component_0 from './index-ByGkq2OH.mjs';
import { B as BaseCard } from './BaseCard-BGENKLa5.mjs';
import 'pinia';
import './CropAPI-Cg4msNVy.mjs';
import './DeviceAPI-r0WuORwH.mjs';
import './useToastNotifications-DaJGJiXK.mjs';
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
import '@iconify/utils/lib/css/icon';
import './v3-DHK4yxVL.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';

const _sfc_main$9 = {
  __name: "WorkingTemperatureChart",
  __ssrInlineRender: true,
  props: {
    data: {
      type: Object,
      required: true
    },
    temperatureMax: {
      type: Number,
      default: 28
    }
  },
  setup(__props) {
    const props = __props;
    ref(null);
    watch(() => props.data, (newData) => {
      if (newData && newData.labels && newData.datasets) {
        console.log("\u{1F4CA} Temperature data changed, triggering update");
        nextTick(() => {
        });
      }
    }, {
      deep: true,
      immediate: false
    });
    watch(() => props.temperatureMax, (newThreshold) => {
      console.log("\u{1F321}\uFE0F Temperature threshold changed:", newThreshold);
      nextTick(() => {
      });
    }, { immediate: false });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "improved-chart" }, _attrs))} data-v-6ec53e96><div class="chart-wrapper" data-v-6ec53e96><canvas data-v-6ec53e96></canvas></div></div>`);
    };
  }
};
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Charts/WorkingTemperatureChart.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const WorkingTemperatureChart = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["__scopeId", "data-v-6ec53e96"]]);
const _sfc_main$8 = {
  __name: "WorkingHumidityChart",
  __ssrInlineRender: true,
  props: {
    data: {
      type: Object,
      required: true
    },
    humidityMin: {
      type: Number,
      default: 40
    },
    humidityMax: {
      type: Number,
      default: 80
    }
  },
  setup(__props) {
    const props = __props;
    ref(null);
    watch(() => props.data, (newData) => {
      if (newData && newData.labels && newData.datasets) {
        console.log("\u{1F4CA} Humidity data changed, triggering update");
        nextTick(() => {
        });
      }
    }, {
      deep: true,
      immediate: false
    });
    watch([() => props.humidityMin, () => props.humidityMax], ([newMin, newMax]) => {
      console.log("\u{1F4A7} Humidity thresholds changed:", { min: newMin, max: newMax });
      nextTick(() => {
      });
    }, { immediate: false });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "improved-chart" }, _attrs))} data-v-52fdcc9f><div class="chart-wrapper" data-v-52fdcc9f><canvas data-v-52fdcc9f></canvas></div></div>`);
    };
  }
};
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Charts/WorkingHumidityChart.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const WorkingHumidityChart = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["__scopeId", "data-v-52fdcc9f"]]);
const _sfc_main$7 = {
  __name: "WorkingAirHumidityChart",
  __ssrInlineRender: true,
  props: {
    data: {
      type: Object,
      required: true
    },
    airHumidityMin: {
      type: Number,
      default: 30
    },
    airHumidityMax: {
      type: Number,
      default: 85
    }
  },
  setup(__props) {
    const props = __props;
    ref(null);
    watch(() => props.data, (newData) => {
      if (newData && newData.labels && newData.datasets) {
        console.log("\u{1F4CA} Air humidity data changed, triggering update");
        nextTick(() => {
        });
      }
    }, {
      deep: true,
      immediate: false
    });
    watch([() => props.airHumidityMin, () => props.airHumidityMax], ([newMin, newMax]) => {
      console.log("\u{1F4A7} Air humidity thresholds changed:", { min: newMin, max: newMax });
      nextTick(() => {
      });
    }, { immediate: false });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "improved-chart" }, _attrs))} data-v-9081e993><div class="chart-wrapper" data-v-9081e993><canvas data-v-9081e993></canvas></div></div>`);
    };
  }
};
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Charts/WorkingAirHumidityChart.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const WorkingAirHumidityChart = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__scopeId", "data-v-9081e993"]]);
const _sfc_main$6 = {
  __name: "DemoBanner",
  __ssrInlineRender: true,
  props: {
    isDemoMode: {
      type: Boolean,
      default: false
    }
  },
  emits: ["exit-demo"],
  setup(__props, { emit: __emit }) {
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.isDemoMode) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-gradient-to-r from-orange-500/20 to-yellow-500/20 border border-orange-500/30 rounded-xl p-4 shadow-lg" }, _attrs))}><div class="flex items-center space-x-3"><div class="flex-shrink-0"><svg class="w-8 h-8 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg></div><div class="flex-1"><h3 class="text-lg font-medium text-orange-300">\u{1F3AD} Modo Vista Previa</h3><p class="text-sm text-orange-200"> Est\xE1s viendo una demostraci\xF3n con datos simulados. <span class="font-medium">Las funcionalidades est\xE1n limitadas.</span> Para acceder a todas las caracter\xEDsticas, <button class="underline hover:text-white transition-colors"> inicia sesi\xF3n aqu\xED </button>. </p></div><div class="flex items-center space-x-2"><div class="w-3 h-3 bg-orange-400 rounded-full animate-pulse"></div><span class="text-sm text-orange-300 font-medium">DEMO</span></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Dashboard/DemoBanner.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const _sfc_main$5 = {
  __name: "SensorCard",
  __ssrInlineRender: true,
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    icon: {
      type: Object,
      required: true
    },
    iconBgClass: {
      type: String,
      required: true
    },
    valueColorClass: {
      type: String,
      required: true
    },
    formattedValue: {
      type: String,
      required: true
    },
    trend: {
      type: Object,
      required: true
    },
    chartComponent: {
      type: Object,
      required: true
    },
    chartData: {
      type: Object,
      required: true
    },
    chartProps: {
      type: Object,
      default: () => ({})
    }
  },
  setup(__props) {
    const props = __props;
    const trendClass = computed(() => {
      if (props.trend.direction === "up") return "trend-up";
      if (props.trend.direction === "down") return "trend-down";
      return "trend-neutral";
    });
    const trendArrow = computed(() => {
      if (props.trend.direction === "up") return "\u2197";
      if (props.trend.direction === "down") return "\u2198";
      return "\u2192";
    });
    const trendValue = computed(() => {
      return props.trend.value;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "enhanced-sensor-card" }, _attrs))}><div class="sensor-header"><div class="flex items-center space-x-3"><div class="${ssrRenderClass([__props.iconBgClass, "sensor-icon"])}">`);
      ssrRenderVNode(_push, createVNode(resolveDynamicComponent(__props.icon), null, null), _parent);
      _push(`</div><div><h3 class="text-xl font-bold text-white">${ssrInterpolate(__props.title)}</h3><p class="text-gray-400">${ssrInterpolate(__props.description)}</p></div></div><div class="sensor-display"><div class="${ssrRenderClass([__props.valueColorClass, "main-value"])}">${ssrInterpolate(__props.formattedValue)}</div><div class="${ssrRenderClass([trendClass.value, "trend-badge"])}"><span class="trend-arrow">${ssrInterpolate(trendArrow.value)}</span><span class="trend-percent">${ssrInterpolate(trendValue.value)}</span></div></div></div>`);
      ssrRenderVNode(_push, createVNode(resolveDynamicComponent(__props.chartComponent), mergeProps({ data: __props.chartData }, __props.chartProps), null), _parent);
      _push(`</div>`);
    };
  }
};
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Dashboard/SensorCard.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = {
  __name: "InfoCard",
  __ssrInlineRender: true,
  props: {
    iconName: {
      type: String,
      required: true
    },
    iconBgClass: {
      type: String,
      required: true
    },
    iconColorClass: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: true
    },
    valueColorClass: {
      type: String,
      required: true
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_0;
      _push(ssrRenderComponent(BaseCard, mergeProps({ class: "info-card" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center space-x-3"${_scopeId}><div class="${ssrRenderClass([__props.iconBgClass, "flex items-center justify-center w-10 h-10 rounded-lg"])}"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: __props.iconName,
              class: ["w-5 h-5", __props.iconColorClass]
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}><p class="text-sm text-gray-400"${_scopeId}>${ssrInterpolate(__props.label)}</p><p class="${ssrRenderClass([__props.valueColorClass, "font-semibold"])}"${_scopeId}>${ssrInterpolate(__props.value)}</p></div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center space-x-3" }, [
                createVNode("div", {
                  class: ["flex items-center justify-center w-10 h-10 rounded-lg", __props.iconBgClass]
                }, [
                  createVNode(_component_Icon, {
                    name: __props.iconName,
                    class: ["w-5 h-5", __props.iconColorClass]
                  }, null, 8, ["name", "class"])
                ], 2),
                createVNode("div", null, [
                  createVNode("p", { class: "text-sm text-gray-400" }, toDisplayString(__props.label), 1),
                  createVNode("p", {
                    class: ["font-semibold", __props.valueColorClass]
                  }, toDisplayString(__props.value), 3)
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
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Dashboard/InfoCard.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = {
  __name: "CropInfo",
  __ssrInlineRender: true,
  props: {
    currentCrop: {
      type: Object,
      default: null
    },
    hasSelectedCrop: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    const plantIcon = getIcon("plant");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-4" }, _attrs))}><div class="flex items-center space-x-3 mb-4">`);
      ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(plantIcon)), { class: "w-6 h-6 text-green-400" }, null), _parent);
      _push(`<h4 class="text-lg font-bold text-white">Cultivo Seleccionado</h4></div>`);
      if (__props.hasSelectedCrop) {
        _push(`<div class="space-y-3"><div class="flex justify-between items-center p-4 bg-gray-900/60 border border-gray-600/30 rounded-lg hover:bg-gray-900/80 transition-colors"><span class="text-gray-300 font-medium">Nombre:</span><span class="text-white font-bold text-lg">${ssrInterpolate(__props.currentCrop.name)}</span></div><div class="flex justify-between items-center p-4 bg-gray-900/60 border border-gray-600/30 rounded-lg hover:bg-gray-900/80 transition-colors"><span class="text-gray-300 font-medium">Categor\xEDa:</span><span class="text-green-400 font-bold text-lg">${ssrInterpolate(__props.currentCrop.category)}</span></div><div class="flex justify-between items-center p-4 bg-gray-900/60 border border-gray-600/30 rounded-lg hover:bg-gray-900/80 transition-colors"><span class="text-gray-300 font-medium">Hum. Suelo Min:</span><span class="text-blue-400 font-bold text-lg">${ssrInterpolate(__props.currentCrop.soil_humidity_min)}%</span></div><div class="flex justify-between items-center p-4 bg-gray-900/60 border border-gray-600/30 rounded-lg hover:bg-gray-900/80 transition-colors"><span class="text-gray-300 font-medium">Hum. Suelo Max:</span><span class="text-blue-400 font-bold text-lg">${ssrInterpolate(__props.currentCrop.soil_humidity_max)}%</span></div><div class="flex justify-between items-center p-4 bg-gray-900/60 border border-gray-600/30 rounded-lg hover:bg-gray-900/80 transition-colors"><span class="text-gray-300 font-medium">Hum. Aire Min:</span><span class="text-cyan-400 font-bold text-lg">${ssrInterpolate(__props.currentCrop.air_humidity_min)}%</span></div><div class="flex justify-between items-center p-4 bg-gray-900/60 border border-gray-600/30 rounded-lg hover:bg-gray-900/80 transition-colors"><span class="text-gray-300 font-medium">Hum. Aire Max:</span><span class="text-cyan-400 font-bold text-lg">${ssrInterpolate(__props.currentCrop.air_humidity_max)}%</span></div><div class="flex justify-between items-center p-4 bg-gray-900/60 border border-gray-600/30 rounded-lg hover:bg-gray-900/80 transition-colors"><span class="text-gray-300 font-medium">Temperatura M\xE1xima:</span><span class="text-red-400 font-bold text-lg">${ssrInterpolate(__props.currentCrop.temperature_max)}\xB0C</span></div><div class="flex justify-between items-center p-4 bg-gray-900/60 border border-gray-600/30 rounded-lg hover:bg-gray-900/80 transition-colors"><div class="flex items-center space-x-2">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:beaker",
          class: "w-5 h-5 text-blue-400"
        }, null, _parent));
        _push(`<span class="text-gray-300 font-medium">Estado de la Bomba:</span></div><div class="flex items-center space-x-2"><div class="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div><span class="text-blue-400 font-bold text-lg">ACTIVA</span></div></div><div class="flex justify-between items-center p-4 bg-gray-900/60 border border-gray-600/30 rounded-lg hover:bg-gray-900/80 transition-colors"><span class="text-gray-300 font-medium">D\xEDas de Crecimiento:</span><span class="text-white font-bold text-lg">${ssrInterpolate(__props.currentCrop.growth_days)} d\xEDas</span></div><div class="flex justify-between items-center p-4 bg-gray-900/60 border border-gray-600/30 rounded-lg hover:bg-gray-900/80 transition-colors"><span class="text-gray-300 font-medium">Temporada:</span><span class="text-purple-400 font-bold text-lg">${ssrInterpolate(__props.currentCrop.session)}</span></div></div>`);
      } else {
        _push(`<div class="space-y-3"><div class="flex justify-between items-center p-4 bg-gray-900/60 border border-gray-600/30 rounded-lg"><span class="text-gray-300 font-medium">Nombre:</span><span class="text-red-400 font-bold text-lg">No se ha seleccionado</span></div><div class="flex justify-between items-center p-4 bg-gray-900/60 border border-gray-600/30 rounded-lg"><span class="text-gray-300 font-medium">Categor\xEDa:</span><span class="text-red-400 font-bold text-lg">No se ha seleccionado</span></div><div class="flex justify-between items-center p-4 bg-gray-900/60 border border-gray-600/30 rounded-lg"><span class="text-gray-300 font-medium">Hum. Suelo Min:</span><span class="text-red-400 font-bold text-lg">No disponible</span></div><div class="flex justify-between items-center p-4 bg-gray-900/60 border border-gray-600/30 rounded-lg"><span class="text-gray-300 font-medium">Hum. Suelo Max:</span><span class="text-red-400 font-bold text-lg">No disponible</span></div><div class="flex justify-between items-center p-4 bg-gray-900/60 border border-gray-600/30 rounded-lg"><span class="text-gray-300 font-medium">Hum. Aire Min:</span><span class="text-red-400 font-bold text-lg">No disponible</span></div><div class="flex justify-between items-center p-4 bg-gray-900/60 border border-gray-600/30 rounded-lg"><span class="text-gray-300 font-medium">Hum. Aire Max:</span><span class="text-red-400 font-bold text-lg">No disponible</span></div><div class="flex justify-between items-center p-4 bg-gray-900/60 border border-gray-600/30 rounded-lg"><span class="text-gray-300 font-medium">Temperatura M\xE1xima:</span><span class="text-red-400 font-bold text-lg">No disponible</span></div><div class="flex justify-between items-center p-4 bg-gray-900/60 border border-gray-600/30 rounded-lg"><div class="flex items-center space-x-2">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:beaker",
          class: "w-5 h-5 text-red-400"
        }, null, _parent));
        _push(`<span class="text-gray-300 font-medium">Estado de la Bomba:</span></div><div class="flex items-center space-x-2"><div class="w-3 h-3 bg-red-400 rounded-full"></div><span class="text-red-400 font-bold text-lg">NO SELECCIONADO</span></div></div><div class="flex justify-between items-center p-4 bg-gray-900/60 border border-gray-600/30 rounded-lg"><span class="text-gray-300 font-medium">D\xEDas de Crecimiento:</span><span class="text-red-400 font-bold text-lg">No disponible</span></div><div class="flex justify-between items-center p-4 bg-gray-900/60 border border-gray-600/30 rounded-lg"><span class="text-gray-300 font-medium">Temporada:</span><span class="text-red-400 font-bold text-lg">No disponible</span></div></div>`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Dashboard/CropInfo.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = {
  __name: "DeviceInfo",
  __ssrInlineRender: true,
  props: {
    currentDevice: {
      type: Object,
      default: null
    },
    hasActiveDevice: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b;
      const _component_Icon = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-4" }, _attrs))}><div class="flex items-center space-x-3 mb-4">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:cpu-chip",
        class: "w-6 h-6 text-blue-400"
      }, null, _parent));
      _push(`<h4 class="text-lg font-bold text-white">Dispositivo Registrado</h4></div>`);
      if (__props.hasActiveDevice) {
        _push(`<div class="space-y-3"><div class="flex justify-between items-center p-4 bg-gray-900/60 border border-gray-600/30 rounded-lg hover:bg-gray-900/80 transition-colors"><span class="text-gray-300 font-medium">Nombre:</span><span class="text-white font-bold text-lg">${ssrInterpolate((_a = __props.currentDevice) == null ? void 0 : _a.deviceName)}</span></div><div class="flex justify-between items-center p-4 bg-gray-900/60 border border-gray-600/30 rounded-lg hover:bg-gray-900/80 transition-colors"><span class="text-gray-300 font-medium">ID del Dispositivo:</span><span class="text-gray-300 font-mono font-bold text-lg">${ssrInterpolate((_b = __props.currentDevice) == null ? void 0 : _b.enddeviceId)}</span></div><div class="flex justify-between items-center p-4 bg-gray-900/60 border border-gray-600/30 rounded-lg hover:bg-gray-900/80 transition-colors"><div class="flex items-center space-x-2">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:wifi",
          class: "w-5 h-5 text-green-400"
        }, null, _parent));
        _push(`<span class="text-gray-300 font-medium">Estado:</span></div><div class="flex items-center space-x-2"><div class="w-3 h-3 rounded-full animate-pulse bg-green-400"></div><span class="font-bold text-lg text-green-400">CONECTADO</span></div></div><div class="flex justify-between items-center p-4 bg-gray-900/60 border border-gray-600/30 rounded-lg hover:bg-gray-900/80 transition-colors"><span class="text-gray-300 font-medium">Frecuencia de Datos:</span><span class="text-white font-bold text-lg">Cada 3 segundos</span></div><div class="flex justify-between items-center p-4 bg-gray-900/60 border border-gray-600/30 rounded-lg hover:bg-gray-900/80 transition-colors"><span class="text-gray-300 font-medium">\xDAltima Comunicaci\xF3n:</span><span class="text-green-400 font-bold text-lg">Ahora mismo</span></div></div>`);
      } else {
        _push(`<div class="space-y-3"><div class="flex justify-between items-center p-4 bg-gray-900/60 border border-gray-600/30 rounded-lg"><span class="text-gray-300 font-medium">Nombre:</span><span class="text-red-400 font-bold text-lg">No se ha registrado</span></div><div class="flex justify-between items-center p-4 bg-gray-900/60 border border-gray-600/30 rounded-lg"><span class="text-gray-300 font-medium">ID del Dispositivo:</span><span class="text-red-400 font-bold text-lg">No se ha registrado</span></div><div class="flex justify-between items-center p-4 bg-gray-900/60 border border-gray-600/30 rounded-lg"><div class="flex items-center space-x-2">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:wifi",
          class: "w-5 h-5 text-red-400"
        }, null, _parent));
        _push(`<span class="text-gray-300 font-medium">Estado:</span></div><div class="flex items-center space-x-2"><div class="w-3 h-3 rounded-full bg-red-400"></div><span class="font-bold text-lg text-red-400">NO REGISTRADO</span></div></div><div class="flex justify-between items-center p-4 bg-gray-900/60 border border-gray-600/30 rounded-lg"><span class="text-gray-300 font-medium">Frecuencia de Datos:</span><span class="text-red-400 font-bold text-lg">No disponible</span></div><div class="flex justify-between items-center p-4 bg-gray-900/60 border border-gray-600/30 rounded-lg"><span class="text-gray-300 font-medium">\xDAltima Comunicaci\xF3n:</span><span class="text-red-400 font-bold text-lg">No disponible</span></div></div>`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Dashboard/DeviceInfo.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "SystemInfoPanel",
  __ssrInlineRender: true,
  props: {
    currentCrop: {
      type: Object,
      default: null
    },
    hasSelectedCrop: {
      type: Boolean,
      default: false
    },
    currentDevice: {
      type: Object,
      default: null
    },
    hasActiveDevice: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-gray-800/50 border border-blue-500/30 rounded-xl p-6 shadow-lg" }, _attrs))}><div class="mb-6 border-b border-gray-600/50 pb-4"><div class="flex items-center space-x-3"><div class="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div><h3 class="text-2xl font-bold text-white">Informaci\xF3n del Sistema</h3></div><p class="text-gray-400 mt-2">Detalles del cultivo activo y dispositivo IoT en funcionamiento</p></div><div class="grid grid-cols-1 lg:grid-cols-2 gap-8">`);
      _push(ssrRenderComponent(_sfc_main$3, {
        "current-crop": __props.currentCrop,
        "has-selected-crop": __props.hasSelectedCrop
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2, {
        "current-device": __props.currentDevice,
        "has-active-device": __props.hasActiveDevice
      }, null, _parent));
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Dashboard/SystemInfoPanel.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "dashboard",
  __ssrInlineRender: true,
  setup(__props) {
    const cropStore = useCropStore();
    const deviceStore = useDeviceStore();
    const userStore = useUserStore();
    const irrigationStore = useIrrigationStore();
    const demoCurrentReading = ref(null);
    ref(null);
    const demoDataPoints = ref([]);
    const sensorDataComposable = useSensorData();
    const {
      temperatureData: realTemperatureData,
      soilHumidityData: realSoilHumidityData,
      airHumidityData: realAirHumidityData,
      currentTemperature: realCurrentTemperature,
      currentSoilHumidity: realCurrentSoilHumidity,
      currentAirHumidity: realCurrentAirHumidity,
      temperatureTrend: realTemperatureTrend,
      soilHumidityTrend: realSoilHumidityTrend,
      airHumidityTrend: realAirHumidityTrend,
      cropThresholds: realCropThresholds,
      formattedTemperature: realFormattedTemperature,
      formattedSoilHumidity: realFormattedSoilHumidity,
      formattedAirHumidity: realFormattedAirHumidity
    } = sensorDataComposable;
    const temperatureData = computed(() => {
      if (userStore.isDemoMode) {
        const demoHistory = demoDataPoints.value;
        return {
          labels: demoHistory.map((item) => item.time),
          datasets: [
            {
              label: "Temperatura (\xB0C)",
              data: demoHistory.map((item) => item.temperature),
              borderColor: "#ef4444",
              backgroundColor: "transparent",
              borderWidth: 3,
              tension: 0.6,
              fill: false,
              pointBackgroundColor: "#ef4444",
              pointBorderColor: "#ffffff",
              pointBorderWidth: 3,
              pointRadius: 5,
              pointHoverRadius: 8
            }
          ]
        };
      }
      return realTemperatureData.value;
    });
    const soilHumidityData = computed(() => {
      if (userStore.isDemoMode) {
        const demoHistory = demoDataPoints.value;
        return {
          labels: demoHistory.map((item) => item.time),
          datasets: [
            {
              label: "Humedad del Suelo (%)",
              data: demoHistory.map((item) => item.soilHumidity),
              borderColor: "#3b82f6",
              backgroundColor: "transparent",
              borderWidth: 3,
              tension: 0.6,
              fill: false,
              pointBackgroundColor: "#3b82f6",
              pointBorderColor: "#ffffff",
              pointBorderWidth: 3,
              pointRadius: 5,
              pointHoverRadius: 8
            }
          ]
        };
      }
      return realSoilHumidityData.value;
    });
    const airHumidityData = computed(() => {
      if (userStore.isDemoMode) {
        const demoHistory = demoDataPoints.value;
        return {
          labels: demoHistory.map((item) => item.time),
          datasets: [
            {
              label: "Humedad Ambiental (%)",
              data: demoHistory.map((item) => item.airHumidity),
              borderColor: "#22d3ee",
              backgroundColor: "transparent",
              borderWidth: 3,
              tension: 0.6,
              fill: false,
              pointBackgroundColor: "#22d3ee",
              pointBorderColor: "#ffffff",
              pointBorderWidth: 3,
              pointRadius: 5,
              pointHoverRadius: 8
            }
          ]
        };
      }
      return realAirHumidityData.value;
    });
    const currentTemperature = computed(() => {
      var _a, _b;
      if (userStore.isDemoMode) {
        return ((_a = demoCurrentReading.value) == null ? void 0 : _a.temperature) || ((_b = demoDataPoints.value[demoDataPoints.value.length - 1]) == null ? void 0 : _b.temperature) || demoData.sensorData.current.temperature;
      }
      return realCurrentTemperature.value;
    });
    const currentSoilHumidity = computed(() => {
      var _a, _b;
      if (userStore.isDemoMode) {
        return ((_a = demoCurrentReading.value) == null ? void 0 : _a.soilHumidity) || ((_b = demoDataPoints.value[demoDataPoints.value.length - 1]) == null ? void 0 : _b.soilHumidity) || demoData.sensorData.current.soilHumidity;
      }
      return realCurrentSoilHumidity.value;
    });
    const currentAirHumidity = computed(() => {
      var _a, _b;
      if (userStore.isDemoMode) {
        return ((_a = demoCurrentReading.value) == null ? void 0 : _a.airHumidity) || ((_b = demoDataPoints.value[demoDataPoints.value.length - 1]) == null ? void 0 : _b.airHumidity) || 75;
      }
      return realCurrentAirHumidity.value;
    });
    const temperatureTrend = computed(() => {
      if (userStore.isDemoMode) {
        const demoHistory = demoDataPoints.value;
        if (demoHistory.length >= 2) {
          const current = demoHistory[demoHistory.length - 1].temperature;
          const previous = demoHistory[demoHistory.length - 2].temperature;
          const tempChange = current - previous;
          const MIN_TEMP_CHANGE = 0.1;
          if (Math.abs(tempChange) >= MIN_TEMP_CHANGE) {
            return {
              direction: tempChange > 0 ? "up" : "down",
              value: Math.abs(tempChange).toFixed(1)
              // Diferencia absoluta en grados
            };
          } else {
            return {
              direction: "neutral",
              value: "0.0"
            };
          }
        }
        return { direction: "neutral", value: "0.0" };
      }
      return realTemperatureTrend.value;
    });
    const soilHumidityTrend = computed(() => {
      if (userStore.isDemoMode) {
        const demoHistory = demoDataPoints.value;
        if (demoHistory.length >= 2) {
          const current = demoHistory[demoHistory.length - 1].soilHumidity;
          const previous = demoHistory[demoHistory.length - 2].soilHumidity;
          const soilChange = current - previous;
          const MIN_HUMIDITY_CHANGE = 0.5;
          if (Math.abs(soilChange) >= MIN_HUMIDITY_CHANGE) {
            return {
              direction: soilChange > 0 ? "up" : "down",
              value: Math.abs(soilChange).toFixed(1)
              // Diferencia absoluta
            };
          } else {
            return {
              direction: "neutral",
              value: "0.0"
            };
          }
        }
        return { direction: "neutral", value: "0.0" };
      }
      return realSoilHumidityTrend.value;
    });
    const airHumidityTrend = computed(() => {
      if (userStore.isDemoMode) {
        const demoHistory = demoDataPoints.value;
        if (demoHistory.length >= 2) {
          const current = demoHistory[demoHistory.length - 1].airHumidity;
          const previous = demoHistory[demoHistory.length - 2].airHumidity;
          const airChange = current - previous;
          const MIN_HUMIDITY_CHANGE = 0.5;
          if (Math.abs(airChange) >= MIN_HUMIDITY_CHANGE) {
            return {
              direction: airChange > 0 ? "up" : "down",
              value: Math.abs(airChange).toFixed(1)
              // Diferencia absoluta
            };
          } else {
            return {
              direction: "neutral",
              value: "0.0"
            };
          }
        }
        return { direction: "neutral", value: "0.0" };
      }
      return realAirHumidityTrend.value;
    });
    computed(() => {
      if (userStore.isDemoMode) {
        return {
          soilHumidityMin: demoData.crop.soil_humidity_min,
          soilHumidityMax: demoData.crop.soil_humidity_max,
          airHumidityMin: demoData.crop.air_humidity_min,
          airHumidityMax: demoData.crop.air_humidity_max,
          temperatureMax: demoData.crop.temperature_max
        };
      }
      return realCropThresholds.value;
    });
    const formattedTemperature = computed(() => {
      if (userStore.isDemoMode) {
        return `${currentTemperature.value.toFixed(1)}\xB0C`;
      }
      return realFormattedTemperature.value;
    });
    const formattedSoilHumidity = computed(() => {
      if (userStore.isDemoMode) {
        return `${currentSoilHumidity.value.toFixed(1)}%`;
      }
      return realFormattedSoilHumidity.value;
    });
    const formattedAirHumidity = computed(() => {
      if (userStore.isDemoMode) {
        return `${currentAirHumidity.value.toFixed(1)}%`;
      }
      return realFormattedAirHumidity.value;
    });
    const pumpStatus = computed(() => {
      if (userStore.isDemoMode) {
        return {
          status: "Inactiva",
          iconBg: "bg-gray-500/20",
          iconColor: "text-gray-400",
          valueColor: "text-gray-400"
        };
      }
      if (irrigationStore.isWatering) {
        return {
          status: irrigationStore.isPaused ? "Pausada" : "Activa",
          iconBg: irrigationStore.isPaused ? "bg-yellow-500/20" : "bg-green-500/20",
          iconColor: irrigationStore.isPaused ? "text-yellow-400" : "text-green-400",
          valueColor: irrigationStore.isPaused ? "text-yellow-400" : "text-green-400"
        };
      } else {
        return {
          status: "Inactiva",
          iconBg: "bg-gray-500/20",
          iconColor: "text-gray-400",
          valueColor: "text-gray-400"
        };
      }
    });
    const currentDevice = computed(() => {
      if (userStore.isDemoMode) {
        return demoData.device;
      }
      return deviceStore.activeDevices.length > 0 ? deviceStore.activeDevices[0] : null;
    });
    const currentCrop = computed(() => {
      if (userStore.isDemoMode) {
        return demoData.crop;
      }
      const selectedCrop = cropStore.crops.find((crop) => crop.selected);
      return selectedCrop || null;
    });
    const hasActiveDevice = computed(() => {
      if (userStore.isDemoMode) {
        return true;
      }
      return deviceStore.activeDevices.length > 0;
    });
    const hasSelectedCrop = computed(() => {
      if (userStore.isDemoMode) {
        return true;
      }
      return cropStore.crops.some((crop) => crop.selected);
    });
    watch(() => cropStore.crops, (newCrops) => {
      if (!userStore.isDemoMode) {
        console.log("\u{1F504} Dashboard: Array de cultivos actualizado, cultivos:", newCrops.length);
        const selectedCrop = newCrops.find((crop) => crop.selected);
        if (selectedCrop) {
          console.log("\u2705 Dashboard: Cultivo seleccionado detectado:", selectedCrop.name);
        }
      }
    }, { deep: true });
    const handleExitDemo = () => {
      userStore.exitDemoMode();
      navigateTo("/auth/login");
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "dashboard-container space-y-8" }, _attrs))}>`);
      _push(ssrRenderComponent(unref(_sfc_main$6), {
        "is-demo-mode": unref(userStore).isDemoMode,
        onExitDemo: handleExitDemo
      }, null, _parent));
      _push(`<div class="flex items-center justify-between"><div><h1 class="text-4xl font-bold text-white mb-2">Dashboard de Sensores IoT</h1><p class="text-gray-400 text-lg">Monitoreo en tiempo real de temperatura y humedad para sistemas de riego automatizado</p></div></div><div class="grid grid-cols-1 lg:grid-cols-2 gap-8">`);
      _push(ssrRenderComponent(unref(_sfc_main$5), {
        title: "Temperatura Ambiental",
        description: "Sensor DHT11 - Actualizaci\xF3n cada 2 minutos",
        icon: unref(thermometerIcon),
        "icon-bg-class": "bg-gradient-to-br from-red-500 to-red-600",
        "value-color-class": "text-red-400",
        "formatted-value": unref(formattedTemperature),
        trend: unref(temperatureTrend),
        "chart-component": WorkingTemperatureChart,
        "chart-data": unref(temperatureData),
        "chart-props": { temperatureMax: ((_a = unref(currentCrop)) == null ? void 0 : _a.temperature_max) || 28 }
      }, null, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$5), {
        title: "Humedad del Suelo",
        description: "Sensor Capacitive Soil Moisture - Actualizaci\xF3n cada 2 minutos",
        icon: unref(humidityIcon),
        "icon-bg-class": "bg-gradient-to-br from-blue-500 to-blue-600",
        "value-color-class": "text-blue-400",
        "formatted-value": unref(formattedSoilHumidity),
        trend: unref(soilHumidityTrend),
        "chart-component": WorkingHumidityChart,
        "chart-data": unref(soilHumidityData),
        "chart-props": {
          humidityMin: ((_b = unref(currentCrop)) == null ? void 0 : _b.soil_humidity_min) || 40,
          humidityMax: ((_c = unref(currentCrop)) == null ? void 0 : _c.soil_humidity_max) || 80
        }
      }, null, _parent));
      _push(`</div><div class="mt-8">`);
      _push(ssrRenderComponent(unref(_sfc_main$5), {
        title: "Humedad Ambiental",
        description: "Sensor DHT11 - Actualizaci\xF3n cada 2 minutos",
        icon: unref(humidityIcon),
        "icon-bg-class": "bg-gradient-to-br from-cyan-500 to-cyan-600",
        "value-color-class": "text-cyan-400",
        "formatted-value": unref(formattedAirHumidity),
        trend: unref(airHumidityTrend),
        "chart-component": WorkingAirHumidityChart,
        "chart-data": unref(airHumidityData),
        "chart-props": {
          airHumidityMin: ((_d = unref(currentCrop)) == null ? void 0 : _d.air_humidity_min) || 30,
          airHumidityMax: ((_e = unref(currentCrop)) == null ? void 0 : _e.air_humidity_max) || 85
        }
      }, null, _parent));
      _push(`</div><div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">`);
      _push(ssrRenderComponent(unref(_sfc_main$4), {
        "icon-name": "heroicons:clock",
        "icon-bg-class": "bg-blue-500/20",
        "icon-color-class": "text-blue-400",
        label: "\xDAltima actualizaci\xF3n",
        value: (/* @__PURE__ */ new Date()).toLocaleTimeString("es-ES"),
        "value-color-class": "text-white"
      }, null, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$4), {
        "icon-name": "heroicons:signal",
        "icon-bg-class": "bg-green-500/20",
        "icon-color-class": "text-green-400",
        label: "Estado TTN",
        value: "Conectado",
        "value-color-class": "text-green-400"
      }, null, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$4), {
        "icon-name": "heroicons:cog-6-tooth",
        "icon-bg-class": "bg-purple-500/20",
        "icon-color-class": "text-purple-400",
        label: "Cultivo actual",
        value: ((_f = unref(currentCrop)) == null ? void 0 : _f.name) || "-",
        "value-color-class": "text-white"
      }, null, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$4), {
        "icon-name": "heroicons:beaker",
        "icon-bg-class": unref(pumpStatus).iconBg,
        "icon-color-class": unref(pumpStatus).iconColor,
        label: "Bomba de riego",
        value: unref(pumpStatus).status,
        "value-color-class": unref(pumpStatus).valueColor
      }, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(unref(_sfc_main$1), {
        "current-crop": unref(currentCrop),
        "has-selected-crop": unref(hasSelectedCrop),
        "current-device": unref(currentDevice),
        "has-active-device": unref(hasActiveDevice)
      }, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=dashboard-Y5Mdc3Ro.mjs.map
