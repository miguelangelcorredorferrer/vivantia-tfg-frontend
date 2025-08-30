import { mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderSlot, ssrInterpolate } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';

const _sfc_main = {
  __name: "BaseCard",
  __ssrInlineRender: true,
  props: {
    title: {
      type: String,
      default: ""
    },
    customClass: {
      type: String,
      default: ""
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["bg-dark-card rounded-lg shadow-lg border border-gray-600", __props.customClass]
      }, _attrs))} data-v-1edcf570>`);
      if (__props.title || _ctx.$slots.header) {
        _push(`<div class="px-6 py-4 border-b border-gray-600" data-v-1edcf570>`);
        ssrRenderSlot(_ctx.$slots, "header", {}, () => {
          _push(`<div class="flex items-center justify-between" data-v-1edcf570><h3 class="text-lg font-semibold text-white" data-v-1edcf570>${ssrInterpolate(__props.title)}</h3>`);
          ssrRenderSlot(_ctx.$slots, "header-actions", {}, null, _push, _parent);
          _push(`</div>`);
        }, _push, _parent);
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="p-6" data-v-1edcf570>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
      if (_ctx.$slots.footer) {
        _push(`<div class="px-6 py-4 border-t border-gray-600 bg-gray-800/50 rounded-b-lg" data-v-1edcf570>`);
        ssrRenderSlot(_ctx.$slots, "footer", {}, null, _push, _parent);
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Cards/BaseCard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const BaseCard = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-1edcf570"]]);

export { BaseCard as B };
//# sourceMappingURL=BaseCard-BGENKLa5.mjs.map
