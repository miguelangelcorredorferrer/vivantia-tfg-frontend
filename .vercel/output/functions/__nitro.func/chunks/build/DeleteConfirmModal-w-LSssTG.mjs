import { mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate } from 'vue/server-renderer';

const _sfc_main = {
  __name: "DeleteConfirmModal",
  __ssrInlineRender: true,
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: "Confirmar eliminaci\xF3n"
    },
    message: {
      type: String,
      default: "\xBFEst\xE1s seguro de que quieres eliminar este elemento?"
    },
    itemName: {
      type: String,
      default: ""
    },
    itemType: {
      type: String,
      default: "elemento"
    }
  },
  emits: ["confirm", "cancel"],
  setup(__props, { emit: __emit }) {
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.isOpen) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed inset-0 z-50 overflow-y-auto" }, _attrs))}><div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity"></div><div class="flex min-h-full items-center justify-center p-4"><div class="relative bg-gray-800 border border-gray-600 rounded-lg shadow-xl max-w-md w-full"><div class="flex items-center justify-between p-6 border-b border-gray-600"><div class="flex items-center space-x-3"><div class="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center"><svg class="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path></svg></div><h3 class="text-lg font-semibold text-white">${ssrInterpolate(__props.title)}</h3></div><button class="text-gray-400 hover:text-white transition-colors"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div><div class="p-6"><p class="text-gray-300 mb-4">${ssrInterpolate(__props.message)}</p>`);
        if (__props.itemName) {
          _push(`<div class="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-4"><p class="text-red-400 font-medium"><span class="font-semibold">${ssrInterpolate(__props.itemName)}</span></p><p class="text-red-300 text-sm mt-1"> Esta acci\xF3n no se puede deshacer. </p></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="flex items-center justify-end space-x-3 p-6 border-t border-gray-600"><button class="px-4 py-2 text-sm font-medium text-gray-300 bg-gray-600 hover:bg-gray-500 rounded-md transition-colors"> Cancelar </button><button class="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors"> Eliminar ${ssrInterpolate(__props.itemType)}</button></div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Admin/DeleteConfirmModal.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=DeleteConfirmModal-w-LSssTG.mjs.map
