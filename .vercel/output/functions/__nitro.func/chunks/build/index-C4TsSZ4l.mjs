import { _ as __nuxt_component_0 } from './nuxt-link-rSZMKS1E.mjs';
import { ref, reactive, computed, mergeProps, withCtx, createVNode, resolveDynamicComponent, unref, createBlock, openBlock, withModifiers, createCommentVNode, withDirectives, createTextVNode, vModelText, Fragment, renderList, toDisplayString, vModelSelect, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderClass, ssrRenderVNode } from 'vue/server-renderer';
import { useRouter } from 'vue-router';
import { u as useToastNotifications } from './useToastNotifications-DaJGJiXK.mjs';
import { u as useCropStore } from './crop-CoogIRpZ.mjs';
import { u as useUserStore } from './user-BEdD-0tD.mjs';
import { g as getIcon } from './index-0YkbgJTu.mjs';
import { B as BaseCard } from './BaseCard-BGENKLa5.mjs';
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
import './CropAPI-Cg4msNVy.mjs';

const _sfc_main$2 = {
  __name: "CropPageTitle",
  __ssrInlineRender: true,
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><h1 class="text-3xl font-bold text-white">${ssrInterpolate(__props.title)}</h1><p class="text-gray-400 text-lg">${ssrInterpolate(__props.description)}</p></div>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Crops/Layout/CropPageTitle.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "CropInfoSidebar",
  __ssrInlineRender: true,
  props: {
    availableCategories: {
      type: Array,
      default: () => []
    },
    availableSeasons: {
      type: Array,
      default: () => []
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(BaseCard, mergeProps({ title: "Informaci\xF3n de Ayuda" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="space-y-4"${_scopeId}><div${_scopeId}><h4 class="text-sm font-medium text-white mb-3"${_scopeId}>Consejos para el Formulario</h4><div class="space-y-3"${_scopeId}><div class="bg-blue-900/20 border border-blue-500/30 rounded-lg p-3"${_scopeId}><p class="text-xs text-blue-300"${_scopeId}><strong${_scopeId}>Humedad:</strong> Tenga en cuenta que hay 2 tipos de humedad, la humedad del suelo y la humedad del aire o ambiental. </p></div><div class="bg-green-900/20 border border-green-500/30 rounded-lg p-3"${_scopeId}><p class="text-xs text-green-300"${_scopeId}><strong${_scopeId}>Temperatura:</strong> Indica la temperatura m\xE1xima que puede tolerar el cultivo. </p></div><div class="bg-purple-900/20 border border-purple-500/30 rounded-lg p-3"${_scopeId}><p class="text-xs text-purple-300"${_scopeId}><strong${_scopeId}>Imagen:</strong> Usa una foto clara y representativa del cultivo para mejor identificaci\xF3n. </p></div></div></div><div class="border-t border-gray-600 pt-4"${_scopeId}><h4 class="text-sm font-medium text-white mb-3"${_scopeId}>Categor\xEDas actualmente registradas en el sistema</h4><div class="space-y-1"${_scopeId}><!--[-->`);
            ssrRenderList(__props.availableCategories, (category) => {
              _push2(`<div class="text-xs text-gray-400"${_scopeId}> \u2022 ${ssrInterpolate(category)}</div>`);
            });
            _push2(`<!--]--></div></div><div class="border-t border-gray-600 pt-4"${_scopeId}><h4 class="text-sm font-medium text-white mb-3"${_scopeId}>Temporadas</h4><div class="space-y-1"${_scopeId}><!--[-->`);
            ssrRenderList(__props.availableSeasons, (season) => {
              _push2(`<div class="text-xs text-gray-400"${_scopeId}> \u2022 ${ssrInterpolate(season)}</div>`);
            });
            _push2(`<!--]--></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "space-y-4" }, [
                createVNode("div", null, [
                  createVNode("h4", { class: "text-sm font-medium text-white mb-3" }, "Consejos para el Formulario"),
                  createVNode("div", { class: "space-y-3" }, [
                    createVNode("div", { class: "bg-blue-900/20 border border-blue-500/30 rounded-lg p-3" }, [
                      createVNode("p", { class: "text-xs text-blue-300" }, [
                        createVNode("strong", null, "Humedad:"),
                        createTextVNode(" Tenga en cuenta que hay 2 tipos de humedad, la humedad del suelo y la humedad del aire o ambiental. ")
                      ])
                    ]),
                    createVNode("div", { class: "bg-green-900/20 border border-green-500/30 rounded-lg p-3" }, [
                      createVNode("p", { class: "text-xs text-green-300" }, [
                        createVNode("strong", null, "Temperatura:"),
                        createTextVNode(" Indica la temperatura m\xE1xima que puede tolerar el cultivo. ")
                      ])
                    ]),
                    createVNode("div", { class: "bg-purple-900/20 border border-purple-500/30 rounded-lg p-3" }, [
                      createVNode("p", { class: "text-xs text-purple-300" }, [
                        createVNode("strong", null, "Imagen:"),
                        createTextVNode(" Usa una foto clara y representativa del cultivo para mejor identificaci\xF3n. ")
                      ])
                    ])
                  ])
                ]),
                createVNode("div", { class: "border-t border-gray-600 pt-4" }, [
                  createVNode("h4", { class: "text-sm font-medium text-white mb-3" }, "Categor\xEDas actualmente registradas en el sistema"),
                  createVNode("div", { class: "space-y-1" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.availableCategories, (category) => {
                      return openBlock(), createBlock("div", {
                        key: category,
                        class: "text-xs text-gray-400"
                      }, " \u2022 " + toDisplayString(category), 1);
                    }), 128))
                  ])
                ]),
                createVNode("div", { class: "border-t border-gray-600 pt-4" }, [
                  createVNode("h4", { class: "text-sm font-medium text-white mb-3" }, "Temporadas"),
                  createVNode("div", { class: "space-y-1" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.availableSeasons, (season) => {
                      return openBlock(), createBlock("div", {
                        key: season,
                        class: "text-xs text-gray-400"
                      }, " \u2022 " + toDisplayString(season), 1);
                    }), 128))
                  ])
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
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Crops/Layout/CropInfoSidebar.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const router = useRouter();
    const { toast } = useToastNotifications();
    const cropStore = useCropStore();
    const userStore = useUserStore();
    const isSubmitting = ref(false);
    const isDragOver = ref(false);
    const imagePreview = ref("");
    const selectedImage = ref(null);
    const imageInput = ref(null);
    const formData = reactive({
      name: "",
      description: "",
      category: "",
      // (antiguos humidity_min/max eliminados)
      soil_humidity_min: null,
      soil_humidity_max: null,
      air_humidity_min: null,
      air_humidity_max: null,
      temperature_max: null,
      growth_days: null,
      session: "",
      image: null
    });
    const availableCategories = computed(
      () => cropStore.categories.length > 0 ? cropStore.categories : [
        "Hortalizas",
        "Frutas",
        "Hierbas",
        "Cereales",
        "Legumbres"
      ]
    );
    const availableSeasons = [
      "Primavera",
      "Verano",
      "Oto\xF1o",
      "Invierno",
      "Primavera/Verano",
      "Verano/Oto\xF1o",
      "Oto\xF1o/Invierno",
      "Invierno/Primavera",
      "Todo el a\xF1o"
    ];
    const validationErrors = computed(() => {
      const errors = [];
      if (formData.soil_humidity_min && formData.soil_humidity_max) {
        if (formData.soil_humidity_min >= formData.soil_humidity_max) {
          errors.push("La humedad del suelo m\xEDnima debe ser menor que la m\xE1xima");
        }
      }
      if (formData.soil_humidity_min && (formData.soil_humidity_min < 0 || formData.soil_humidity_min > 100)) {
        errors.push("La humedad del suelo m\xEDnima debe estar entre 0 y 100%");
      }
      if (formData.soil_humidity_max && (formData.soil_humidity_max < 0 || formData.soil_humidity_max > 100)) {
        errors.push("La humedad del suelo m\xE1xima debe estar entre 0 y 100%");
      }
      if (formData.air_humidity_min && formData.air_humidity_max) {
        if (formData.air_humidity_min >= formData.air_humidity_max) {
          errors.push("La humedad del aire m\xEDnima debe ser menor que la m\xE1xima");
        }
      }
      if (formData.air_humidity_min && (formData.air_humidity_min < 0 || formData.air_humidity_min > 100)) {
        errors.push("La humedad del aire m\xEDnima debe estar entre 0 y 100%");
      }
      if (formData.air_humidity_max && (formData.air_humidity_max < 0 || formData.air_humidity_max > 100)) {
        errors.push("La humedad del aire m\xE1xima debe estar entre 0 y 100%");
      }
      if (formData.temperature_max && (formData.temperature_max < 0 || formData.temperature_max > 50)) {
        errors.push("La temperatura m\xE1xima debe estar entre 0 y 50\xB0C");
      }
      if (formData.growth_days && (formData.growth_days < 1 || formData.growth_days > 365)) {
        errors.push("Los d\xEDas de crecimiento deben estar entre 1 y 365");
      }
      return errors;
    });
    const handleImageSelect = (event) => {
      const file = event.target.files[0];
      if (file) {
        processImageFile(file);
      }
    };
    const handleImageDrop = (event) => {
      event.preventDefault();
      isDragOver.value = false;
      const file = event.dataTransfer.files[0];
      if (file && file.type.startsWith("image/")) {
        processImageFile(file);
      }
    };
    const processImageFile = (file) => {
      if (file.size > 10 * 1024 * 1024) {
        alert("La imagen es demasiado grande. M\xE1ximo 10MB.");
        return;
      }
      selectedImage.value = file;
      formData.image = file;
      const reader = new FileReader();
      reader.onload = (e) => {
        imagePreview.value = e.target.result;
      };
      reader.readAsDataURL(file);
    };
    const removeImage = () => {
      imagePreview.value = "";
      selectedImage.value = null;
      formData.image = null;
      if (imageInput.value) {
        imageInput.value.value = "";
      }
    };
    const resetForm = () => {
      Object.keys(formData).forEach((key) => {
        if (typeof formData[key] === "string") {
          formData[key] = "";
        } else {
          formData[key] = null;
        }
      });
      removeImage();
    };
    const handleSubmit = async () => {
      var _a, _b;
      if (validationErrors.value.length > 0) {
        return;
      }
      isSubmitting.value = true;
      try {
        const cropData = {
          user_id: userStore.user.id,
          name: formData.name,
          description: formData.description,
          category: formData.category,
          growth_days: formData.growth_days,
          soil_humidity_min: formData.soil_humidity_min,
          soil_humidity_max: formData.soil_humidity_max,
          air_humidity_min: formData.air_humidity_min,
          air_humidity_max: formData.air_humidity_max,
          temperature_max: formData.temperature_max,
          session: formData.session,
          image: formData.image || null,
          // Por ahora null, se puede implementar upload después
          selected: false
          // Por defecto no seleccionado
        };
        console.log("\u{1F50D} Frontend - Datos a enviar:", cropData);
        const result = await cropStore.createCrop(cropData);
        toast.success(`\xA1Cultivo "${result.data.name}" agregado exitosamente!`);
        if (!cropStore.categories.includes(formData.category)) {
          await cropStore.fetchCropCategories();
        }
        setTimeout(() => {
          router.push("/cultivos");
        }, 1500);
      } catch (error) {
        console.error("Error al agregar cultivo:", error);
        toast.error(((_b = (_a = error.response) == null ? void 0 : _a.data) == null ? void 0 : _b.message) || "Error al agregar el cultivo");
      } finally {
        isSubmitting.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_link = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-8" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$2, {
        title: "Agregar Cultivo",
        description: "Configura un nuevo cultivo para el sistema de riego automatizado"
      }, null, _parent));
      _push(`<div class="grid grid-cols-1 lg:grid-cols-3 gap-6"><div class="lg:col-span-2">`);
      _push(ssrRenderComponent(BaseCard, { title: "Informaci\xF3n del Cultivo" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<form class="space-y-6"${_scopeId}><div class="space-y-4"${_scopeId}><h3 class="text-lg font-medium text-white border-b border-gray-600 pb-2"${_scopeId}> Informaci\xF3n B\xE1sica </h3><div class="grid grid-cols-1 md:grid-cols-2 gap-4"${_scopeId}><div${_scopeId}><label for="name" class="block text-sm font-medium text-white mb-2"${_scopeId}> Nombre del Cultivo <span class="text-red-400"${_scopeId}>*</span></label><input id="name"${ssrRenderAttr("value", formData.name)} type="text" required class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors" placeholder="Ej: Tomate Cherry"${_scopeId}></div><div${_scopeId}><label for="category" class="block text-sm font-medium text-white mb-2"${_scopeId}> Categor\xEDa <span class="text-red-400"${_scopeId}>*</span></label><input id="category"${ssrRenderAttr("value", formData.category)} type="text" required class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors" placeholder="Ej: Hortalizas, Frutas, Hierbas..."${_scopeId}></div></div><div${_scopeId}><label for="description" class="block text-sm font-medium text-white mb-2"${_scopeId}> Descripci\xF3n <span class="text-red-400"${_scopeId}>*</span></label><textarea id="description" rows="3" required class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors resize-none" placeholder="Descripci\xF3n detallada del cultivo..."${_scopeId}>${ssrInterpolate(formData.description)}</textarea></div></div><div class="space-y-4"${_scopeId}><h3 class="text-lg font-medium text-white border-b border-gray-600 pb-2"${_scopeId}> Par\xE1metros de Cultivo </h3><div class="grid grid-cols-1 md:grid-cols-3 gap-4"${_scopeId}><div${_scopeId}><label for="minHumidity" class="block text-sm font-medium text-white mb-2"${_scopeId}> Humedad M\xEDnima (%) <span class="text-red-400"${_scopeId}>*</span></label><input id="minHumidity"${ssrRenderAttr("value", formData.soil_humidity_min)} type="number" min="0" max="100" required class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors" placeholder="50"${_scopeId}><p class="mt-1 text-xs text-gray-400"${_scopeId}>Valor m\xEDnimo recomendado</p></div><div${_scopeId}><label for="maxHumidity" class="block text-sm font-medium text-white mb-2"${_scopeId}> Humedad M\xE1xima (%) <span class="text-red-400"${_scopeId}>*</span></label><input id="maxHumidity"${ssrRenderAttr("value", formData.soil_humidity_max)} type="number" min="0" max="100" required class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors" placeholder="80"${_scopeId}><p class="mt-1 text-xs text-gray-400"${_scopeId}>Valor m\xE1ximo recomendado</p></div><div${_scopeId}><label for="minAirHum" class="block text-sm font-medium text-white mb-2"${_scopeId}> Humedad Aire Min (%) <span class="text-red-400"${_scopeId}>*</span></label><input id="minAirHum"${ssrRenderAttr("value", formData.air_humidity_min)} type="number" min="0" max="100" required class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors" placeholder="50"${_scopeId}><p class="mt-1 text-xs text-gray-400"${_scopeId}>M\xEDnimo humedad ambiental</p></div><div${_scopeId}><label for="maxAirHum" class="block text-sm font-medium text-white mb-2"${_scopeId}> Humedad Aire M\xE1x (%) <span class="text-red-400"${_scopeId}>*</span></label><input id="maxAirHum"${ssrRenderAttr("value", formData.air_humidity_max)} type="number" min="0" max="100" required class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors" placeholder="85"${_scopeId}><p class="mt-1 text-xs text-gray-400"${_scopeId}>M\xE1ximo humedad ambiental</p></div><div${_scopeId}><label for="maxTemperature" class="block text-sm font-medium text-white mb-2"${_scopeId}> Temperatura M\xE1xima (\xB0C) <span class="text-red-400"${_scopeId}>*</span></label><input id="maxTemperature"${ssrRenderAttr("value", formData.temperature_max)} type="number" min="0" max="50" required class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors" placeholder="30"${_scopeId}><p class="mt-1 text-xs text-gray-400"${_scopeId}>Temperatura m\xE1xima tolerable</p></div></div></div><div class="space-y-4"${_scopeId}><h3 class="text-lg font-medium text-white border-b border-gray-600 pb-2"${_scopeId}> Informaci\xF3n Adicional </h3><div class="grid grid-cols-1 md:grid-cols-2 gap-4"${_scopeId}><div${_scopeId}><label for="growthDays" class="block text-sm font-medium text-white mb-2"${_scopeId}> D\xEDas de Crecimiento <span class="text-red-400"${_scopeId}>*</span></label><input id="growthDays"${ssrRenderAttr("value", formData.growth_days)} type="number" min="1" max="365" required class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors" placeholder="90"${_scopeId}><p class="mt-1 text-xs text-gray-400"${_scopeId}>D\xEDas desde siembra hasta cosecha</p></div><div${_scopeId}><label for="session" class="block text-sm font-medium text-white mb-2"${_scopeId}> Temporada de Cosecha <span class="text-red-400"${_scopeId}>*</span></label><select id="session" required class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(formData.session) ? ssrLooseContain(formData.session, "") : ssrLooseEqual(formData.session, "")) ? " selected" : ""}${_scopeId}>Selecciona una temporada</option><!--[-->`);
            ssrRenderList(availableSeasons, (season) => {
              _push2(`<option${ssrRenderAttr("value", season)}${ssrIncludeBooleanAttr(Array.isArray(formData.session) ? ssrLooseContain(formData.session, season) : ssrLooseEqual(formData.session, season)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(season)}</option>`);
            });
            _push2(`<!--]--></select></div></div></div><div class="space-y-4"${_scopeId}><h3 class="text-lg font-medium text-white border-b border-gray-600 pb-2"${_scopeId}> Imagen del Cultivo </h3><div${_scopeId}><label for="image" class="block text-sm font-medium text-white mb-2"${_scopeId}> Foto del Cultivo </label><div class="mt-2"${_scopeId}><div class="${ssrRenderClass([{ "border-green-500 bg-green-900/20": isDragOver.value }, "w-full h-40 border-2 border-dashed border-gray-600 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors cursor-pointer group"])}"${_scopeId}><input type="file" accept="image/*" class="hidden"${_scopeId}>`);
            if (imagePreview.value) {
              _push2(`<div class="w-full h-full relative"${_scopeId}><img${ssrRenderAttr("src", imagePreview.value)} alt="Preview" class="w-full h-full object-cover rounded-lg"${_scopeId}><button type="button" class="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white rounded-full p-1 transition-colors"${_scopeId}>`);
              ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(unref(getIcon)("close")), { class: "w-4 h-4" }, null), _parent2, _scopeId);
              _push2(`</button></div>`);
            } else {
              _push2(`<div class="flex flex-col items-center justify-center h-full"${_scopeId}><svg class="w-12 h-12 text-gray-400 group-hover:text-gray-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"${_scopeId}></path></svg><p class="mt-2 text-sm text-gray-400 group-hover:text-gray-300 transition-colors"${_scopeId}><span class="font-medium"${_scopeId}>Haz clic para subir</span> o arrastra y suelta </p><p class="text-xs text-gray-500"${_scopeId}>PNG, JPG, GIF hasta 10MB</p></div>`);
            }
            _push2(`</div></div><p class="mt-2 text-xs text-gray-400"${_scopeId}> Selecciona una imagen representativa del cultivo (opcional) </p></div></div>`);
            if (validationErrors.value.length > 0) {
              _push2(`<div class="bg-red-900/20 border border-red-500/30 rounded-lg p-4"${_scopeId}><div class="flex items-start"${_scopeId}>`);
              ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(unref(getIcon)("warning")), { class: "w-5 h-5 text-red-400 mt-0.5 mr-2 flex-shrink-0" }, null), _parent2, _scopeId);
              _push2(`<div${_scopeId}><p class="text-sm font-medium text-red-400"${_scopeId}>Errores de validaci\xF3n:</p><ul class="mt-1 text-sm text-red-300 list-disc list-inside"${_scopeId}><!--[-->`);
              ssrRenderList(validationErrors.value, (error) => {
                _push2(`<li${_scopeId}>${ssrInterpolate(error)}</li>`);
              });
              _push2(`<!--]--></ul></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0 pt-6 border-t border-gray-600"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_nuxt_link, {
              to: "/cultivos",
              class: "px-6 py-3 text-gray-400 hover:text-white border border-gray-600 hover:border-gray-500 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex items-center space-x-2"${_scopeId2}>`);
                  ssrRenderVNode(_push3, createVNode(resolveDynamicComponent(unref(getIcon)("back")), { class: "w-4 h-4" }, null), _parent3, _scopeId2);
                  _push3(`<span${_scopeId2}>Volver</span></div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex items-center space-x-2" }, [
                      (openBlock(), createBlock(resolveDynamicComponent(unref(getIcon)("back")), { class: "w-4 h-4" })),
                      createVNode("span", null, "Volver")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="flex space-x-3"${_scopeId}><button type="button" class="px-6 py-3 text-yellow-400 hover:text-yellow-300 border border-yellow-500/30 hover:border-yellow-400/50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-500"${_scopeId}> Limpiar Form </button><button type="submit"${ssrIncludeBooleanAttr(isSubmitting.value || validationErrors.value.length > 0) ? " disabled" : ""} class="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"${_scopeId}>`);
            if (isSubmitting.value) {
              _push2(`<span class="flex items-center"${_scopeId}>`);
              ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(unref(getIcon)("spinner")), { class: "animate-spin w-5 h-5 mr-2" }, null), _parent2, _scopeId);
              _push2(` Agregando... </span>`);
            } else {
              _push2(`<span class="flex items-center"${_scopeId}><svg class="w-5 h-5 mr-2 text-white" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"${_scopeId}><path d="M20 6L9 17l-5-5"${_scopeId}></path></svg> Agregar Cultivo </span>`);
            }
            _push2(`</button></div></div></form>`);
          } else {
            return [
              createVNode("form", {
                onSubmit: withModifiers(handleSubmit, ["prevent"]),
                class: "space-y-6"
              }, [
                createVNode("div", { class: "space-y-4" }, [
                  createVNode("h3", { class: "text-lg font-medium text-white border-b border-gray-600 pb-2" }, " Informaci\xF3n B\xE1sica "),
                  createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                    createVNode("div", null, [
                      createVNode("label", {
                        for: "name",
                        class: "block text-sm font-medium text-white mb-2"
                      }, [
                        createTextVNode(" Nombre del Cultivo "),
                        createVNode("span", { class: "text-red-400" }, "*")
                      ]),
                      withDirectives(createVNode("input", {
                        id: "name",
                        "onUpdate:modelValue": ($event) => formData.name = $event,
                        type: "text",
                        required: "",
                        class: "w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors",
                        placeholder: "Ej: Tomate Cherry"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, formData.name]
                      ])
                    ]),
                    createVNode("div", null, [
                      createVNode("label", {
                        for: "category",
                        class: "block text-sm font-medium text-white mb-2"
                      }, [
                        createTextVNode(" Categor\xEDa "),
                        createVNode("span", { class: "text-red-400" }, "*")
                      ]),
                      withDirectives(createVNode("input", {
                        id: "category",
                        "onUpdate:modelValue": ($event) => formData.category = $event,
                        type: "text",
                        required: "",
                        class: "w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors",
                        placeholder: "Ej: Hortalizas, Frutas, Hierbas..."
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, formData.category]
                      ])
                    ])
                  ]),
                  createVNode("div", null, [
                    createVNode("label", {
                      for: "description",
                      class: "block text-sm font-medium text-white mb-2"
                    }, [
                      createTextVNode(" Descripci\xF3n "),
                      createVNode("span", { class: "text-red-400" }, "*")
                    ]),
                    withDirectives(createVNode("textarea", {
                      id: "description",
                      "onUpdate:modelValue": ($event) => formData.description = $event,
                      rows: "3",
                      required: "",
                      class: "w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors resize-none",
                      placeholder: "Descripci\xF3n detallada del cultivo..."
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vModelText, formData.description]
                    ])
                  ])
                ]),
                createVNode("div", { class: "space-y-4" }, [
                  createVNode("h3", { class: "text-lg font-medium text-white border-b border-gray-600 pb-2" }, " Par\xE1metros de Cultivo "),
                  createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-4" }, [
                    createVNode("div", null, [
                      createVNode("label", {
                        for: "minHumidity",
                        class: "block text-sm font-medium text-white mb-2"
                      }, [
                        createTextVNode(" Humedad M\xEDnima (%) "),
                        createVNode("span", { class: "text-red-400" }, "*")
                      ]),
                      withDirectives(createVNode("input", {
                        id: "minHumidity",
                        "onUpdate:modelValue": ($event) => formData.soil_humidity_min = $event,
                        type: "number",
                        min: "0",
                        max: "100",
                        required: "",
                        class: "w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors",
                        placeholder: "50"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [
                          vModelText,
                          formData.soil_humidity_min,
                          void 0,
                          { number: true }
                        ]
                      ]),
                      createVNode("p", { class: "mt-1 text-xs text-gray-400" }, "Valor m\xEDnimo recomendado")
                    ]),
                    createVNode("div", null, [
                      createVNode("label", {
                        for: "maxHumidity",
                        class: "block text-sm font-medium text-white mb-2"
                      }, [
                        createTextVNode(" Humedad M\xE1xima (%) "),
                        createVNode("span", { class: "text-red-400" }, "*")
                      ]),
                      withDirectives(createVNode("input", {
                        id: "maxHumidity",
                        "onUpdate:modelValue": ($event) => formData.soil_humidity_max = $event,
                        type: "number",
                        min: "0",
                        max: "100",
                        required: "",
                        class: "w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors",
                        placeholder: "80"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [
                          vModelText,
                          formData.soil_humidity_max,
                          void 0,
                          { number: true }
                        ]
                      ]),
                      createVNode("p", { class: "mt-1 text-xs text-gray-400" }, "Valor m\xE1ximo recomendado")
                    ]),
                    createVNode("div", null, [
                      createVNode("label", {
                        for: "minAirHum",
                        class: "block text-sm font-medium text-white mb-2"
                      }, [
                        createTextVNode(" Humedad Aire Min (%) "),
                        createVNode("span", { class: "text-red-400" }, "*")
                      ]),
                      withDirectives(createVNode("input", {
                        id: "minAirHum",
                        "onUpdate:modelValue": ($event) => formData.air_humidity_min = $event,
                        type: "number",
                        min: "0",
                        max: "100",
                        required: "",
                        class: "w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors",
                        placeholder: "50"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [
                          vModelText,
                          formData.air_humidity_min,
                          void 0,
                          { number: true }
                        ]
                      ]),
                      createVNode("p", { class: "mt-1 text-xs text-gray-400" }, "M\xEDnimo humedad ambiental")
                    ]),
                    createVNode("div", null, [
                      createVNode("label", {
                        for: "maxAirHum",
                        class: "block text-sm font-medium text-white mb-2"
                      }, [
                        createTextVNode(" Humedad Aire M\xE1x (%) "),
                        createVNode("span", { class: "text-red-400" }, "*")
                      ]),
                      withDirectives(createVNode("input", {
                        id: "maxAirHum",
                        "onUpdate:modelValue": ($event) => formData.air_humidity_max = $event,
                        type: "number",
                        min: "0",
                        max: "100",
                        required: "",
                        class: "w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors",
                        placeholder: "85"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [
                          vModelText,
                          formData.air_humidity_max,
                          void 0,
                          { number: true }
                        ]
                      ]),
                      createVNode("p", { class: "mt-1 text-xs text-gray-400" }, "M\xE1ximo humedad ambiental")
                    ]),
                    createVNode("div", null, [
                      createVNode("label", {
                        for: "maxTemperature",
                        class: "block text-sm font-medium text-white mb-2"
                      }, [
                        createTextVNode(" Temperatura M\xE1xima (\xB0C) "),
                        createVNode("span", { class: "text-red-400" }, "*")
                      ]),
                      withDirectives(createVNode("input", {
                        id: "maxTemperature",
                        "onUpdate:modelValue": ($event) => formData.temperature_max = $event,
                        type: "number",
                        min: "0",
                        max: "50",
                        required: "",
                        class: "w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors",
                        placeholder: "30"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [
                          vModelText,
                          formData.temperature_max,
                          void 0,
                          { number: true }
                        ]
                      ]),
                      createVNode("p", { class: "mt-1 text-xs text-gray-400" }, "Temperatura m\xE1xima tolerable")
                    ])
                  ])
                ]),
                createVNode("div", { class: "space-y-4" }, [
                  createVNode("h3", { class: "text-lg font-medium text-white border-b border-gray-600 pb-2" }, " Informaci\xF3n Adicional "),
                  createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                    createVNode("div", null, [
                      createVNode("label", {
                        for: "growthDays",
                        class: "block text-sm font-medium text-white mb-2"
                      }, [
                        createTextVNode(" D\xEDas de Crecimiento "),
                        createVNode("span", { class: "text-red-400" }, "*")
                      ]),
                      withDirectives(createVNode("input", {
                        id: "growthDays",
                        "onUpdate:modelValue": ($event) => formData.growth_days = $event,
                        type: "number",
                        min: "1",
                        max: "365",
                        required: "",
                        class: "w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors",
                        placeholder: "90"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [
                          vModelText,
                          formData.growth_days,
                          void 0,
                          { number: true }
                        ]
                      ]),
                      createVNode("p", { class: "mt-1 text-xs text-gray-400" }, "D\xEDas desde siembra hasta cosecha")
                    ]),
                    createVNode("div", null, [
                      createVNode("label", {
                        for: "session",
                        class: "block text-sm font-medium text-white mb-2"
                      }, [
                        createTextVNode(" Temporada de Cosecha "),
                        createVNode("span", { class: "text-red-400" }, "*")
                      ]),
                      withDirectives(createVNode("select", {
                        id: "session",
                        "onUpdate:modelValue": ($event) => formData.session = $event,
                        required: "",
                        class: "w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                      }, [
                        createVNode("option", { value: "" }, "Selecciona una temporada"),
                        (openBlock(), createBlock(Fragment, null, renderList(availableSeasons, (season) => {
                          return createVNode("option", {
                            key: season,
                            value: season
                          }, toDisplayString(season), 9, ["value"]);
                        }), 64))
                      ], 8, ["onUpdate:modelValue"]), [
                        [vModelSelect, formData.session]
                      ])
                    ])
                  ])
                ]),
                createVNode("div", { class: "space-y-4" }, [
                  createVNode("h3", { class: "text-lg font-medium text-white border-b border-gray-600 pb-2" }, " Imagen del Cultivo "),
                  createVNode("div", null, [
                    createVNode("label", {
                      for: "image",
                      class: "block text-sm font-medium text-white mb-2"
                    }, " Foto del Cultivo "),
                    createVNode("div", { class: "mt-2" }, [
                      createVNode("div", {
                        onDrop: handleImageDrop,
                        onDragover: withModifiers(() => {
                        }, ["prevent"]),
                        onDragenter: withModifiers(() => {
                        }, ["prevent"]),
                        class: ["w-full h-40 border-2 border-dashed border-gray-600 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors cursor-pointer group", { "border-green-500 bg-green-900/20": isDragOver.value }]
                      }, [
                        createVNode("input", {
                          ref_key: "imageInput",
                          ref: imageInput,
                          type: "file",
                          accept: "image/*",
                          onChange: handleImageSelect,
                          class: "hidden"
                        }, null, 544),
                        imagePreview.value ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "w-full h-full relative"
                        }, [
                          createVNode("img", {
                            src: imagePreview.value,
                            alt: "Preview",
                            class: "w-full h-full object-cover rounded-lg"
                          }, null, 8, ["src"]),
                          createVNode("button", {
                            type: "button",
                            onClick: removeImage,
                            class: "absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white rounded-full p-1 transition-colors"
                          }, [
                            (openBlock(), createBlock(resolveDynamicComponent(unref(getIcon)("close")), { class: "w-4 h-4" }))
                          ])
                        ])) : (openBlock(), createBlock("div", {
                          key: 1,
                          onClick: ($event) => _ctx.$refs.imageInput.click(),
                          class: "flex flex-col items-center justify-center h-full"
                        }, [
                          (openBlock(), createBlock("svg", {
                            class: "w-12 h-12 text-gray-400 group-hover:text-gray-300 transition-colors",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24"
                          }, [
                            createVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              "stroke-width": "2",
                              d: "M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            })
                          ])),
                          createVNode("p", { class: "mt-2 text-sm text-gray-400 group-hover:text-gray-300 transition-colors" }, [
                            createVNode("span", { class: "font-medium" }, "Haz clic para subir"),
                            createTextVNode(" o arrastra y suelta ")
                          ]),
                          createVNode("p", { class: "text-xs text-gray-500" }, "PNG, JPG, GIF hasta 10MB")
                        ], 8, ["onClick"]))
                      ], 42, ["onDragover", "onDragenter"])
                    ]),
                    createVNode("p", { class: "mt-2 text-xs text-gray-400" }, " Selecciona una imagen representativa del cultivo (opcional) ")
                  ])
                ]),
                validationErrors.value.length > 0 ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "bg-red-900/20 border border-red-500/30 rounded-lg p-4"
                }, [
                  createVNode("div", { class: "flex items-start" }, [
                    (openBlock(), createBlock(resolveDynamicComponent(unref(getIcon)("warning")), { class: "w-5 h-5 text-red-400 mt-0.5 mr-2 flex-shrink-0" })),
                    createVNode("div", null, [
                      createVNode("p", { class: "text-sm font-medium text-red-400" }, "Errores de validaci\xF3n:"),
                      createVNode("ul", { class: "mt-1 text-sm text-red-300 list-disc list-inside" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(validationErrors.value, (error) => {
                          return openBlock(), createBlock("li", { key: error }, toDisplayString(error), 1);
                        }), 128))
                      ])
                    ])
                  ])
                ])) : createCommentVNode("", true),
                createVNode("div", { class: "flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0 pt-6 border-t border-gray-600" }, [
                  createVNode(_component_nuxt_link, {
                    to: "/cultivos",
                    class: "px-6 py-3 text-gray-400 hover:text-white border border-gray-600 hover:border-gray-500 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
                  }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "flex items-center space-x-2" }, [
                        (openBlock(), createBlock(resolveDynamicComponent(unref(getIcon)("back")), { class: "w-4 h-4" })),
                        createVNode("span", null, "Volver")
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode("div", { class: "flex space-x-3" }, [
                    createVNode("button", {
                      type: "button",
                      onClick: resetForm,
                      class: "px-6 py-3 text-yellow-400 hover:text-yellow-300 border border-yellow-500/30 hover:border-yellow-400/50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    }, " Limpiar Form "),
                    createVNode("button", {
                      type: "submit",
                      disabled: isSubmitting.value || validationErrors.value.length > 0,
                      class: "px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
                    }, [
                      isSubmitting.value ? (openBlock(), createBlock("span", {
                        key: 0,
                        class: "flex items-center"
                      }, [
                        (openBlock(), createBlock(resolveDynamicComponent(unref(getIcon)("spinner")), { class: "animate-spin w-5 h-5 mr-2" })),
                        createTextVNode(" Agregando... ")
                      ])) : (openBlock(), createBlock("span", {
                        key: 1,
                        class: "flex items-center"
                      }, [
                        (openBlock(), createBlock("svg", {
                          class: "w-5 h-5 mr-2 text-white",
                          fill: "none",
                          stroke: "currentColor",
                          "stroke-width": "2",
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          viewBox: "0 0 24 24"
                        }, [
                          createVNode("path", { d: "M20 6L9 17l-5-5" })
                        ])),
                        createTextVNode(" Agregar Cultivo ")
                      ]))
                    ], 8, ["disabled"])
                  ])
                ])
              ], 32)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="lg:col-span-1">`);
      _push(ssrRenderComponent(_sfc_main$1, {
        "available-categories": availableCategories.value,
        "available-seasons": availableSeasons
      }, null, _parent));
      _push(`</div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/cultivos/agregar/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-C4TsSZ4l.mjs.map
