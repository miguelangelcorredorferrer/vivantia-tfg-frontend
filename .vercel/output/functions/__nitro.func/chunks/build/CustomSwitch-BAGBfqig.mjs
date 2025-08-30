import { computed, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrInterpolate, ssrRenderStyle, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';

const _sfc_main = {
  __name: "CustomSwitch",
  __ssrInlineRender: true,
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: "Toggle"
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ["update:modelValue", "change"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const isOn = computed(() => props.modelValue);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative inline-flex items-center" }, _attrs))} data-v-7d8940d8><button type="button" class="${ssrRenderClass([
        "relative inline-flex h-8 w-16 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800",
        isOn.value ? "bg-gradient-to-r from-blue-500 to-purple-600" : "bg-gray-600"
      ])}"${ssrIncludeBooleanAttr(__props.disabled) ? " disabled" : ""} data-v-7d8940d8><span class="sr-only" data-v-7d8940d8>${ssrInterpolate(__props.label)}</span><div class="absolute inset-0 flex items-center justify-between px-2 text-xs font-semibold pointer-events-none select-none" data-v-7d8940d8><span class="${ssrRenderClass([
        "transition-opacity duration-200",
        isOn.value ? "opacity-100 text-white" : "opacity-0"
      ])}" data-v-7d8940d8> ON </span><span class="${ssrRenderClass([
        "transition-opacity duration-200",
        !isOn.value ? "opacity-100 text-gray-300" : "opacity-0"
      ])}" data-v-7d8940d8> OFF </span></div><div class="${ssrRenderClass([
        "inline-block h-6 w-6 transform rounded-full bg-white shadow-lg ring-0 transition-transform duration-200 ease-in-out",
        isOn.value ? "translate-x-8" : "translate-x-1"
      ])}" style="${ssrRenderStyle({ "margin-top": "2px" })}" data-v-7d8940d8><div class="flex items-center justify-center h-full w-full" data-v-7d8940d8>`);
      if (!isOn.value) {
        _push(`<svg class="h-3 w-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-7d8940d8><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" data-v-7d8940d8></path></svg>`);
      } else {
        _push(`<svg class="h-3 w-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-7d8940d8><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" data-v-7d8940d8></path></svg>`);
      }
      _push(`</div></div></button></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/SwitchPlugin/CustomSwitch.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const CustomSwitch = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-7d8940d8"]]);

export { CustomSwitch as C };
//# sourceMappingURL=CustomSwitch-BAGBfqig.mjs.map
